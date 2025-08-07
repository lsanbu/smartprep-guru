
import { ChatResponse, EnhancedChatMessage } from '@/types/syllabus';

const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  error_code?: string;
  user_message?: string;
  technical_details?: string;
  suggested_action?: string;
  retry_after?: number;
}

// Enhanced cache for common queries
class QueryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttlMinutes: number = 1440) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear() {
    this.cache.clear();
  }
}

class EnhancedFlaskApiService {
  private baseUrl: string;
  private queryCache: QueryCache;
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.queryCache = new QueryCache();
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {},
    useCache: boolean = true
  ): Promise<ApiResponse<T>> {
    const cacheKey = `${endpoint}-${JSON.stringify(options.body)}`;
    
    // Check cache first for GET requests and repeated queries
    if (useCache && (options.method === 'GET' || !options.method)) {
      const cached = this.queryCache.get(cacheKey);
      if (cached) {
        return { data: cached };
      }
    }

    // Prevent duplicate requests
    if (this.requestQueue.has(cacheKey)) {
      return await this.requestQueue.get(cacheKey);
    }

    const requestPromise = this._executeRequest<T>(endpoint, options, cacheKey, useCache);
    this.requestQueue.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      return result;
    } finally {
      this.requestQueue.delete(cacheKey);
    }
  }

  private async _executeRequest<T>(
    endpoint: string,
    options: RequestInit,
    cacheKey: string,
    useCache: boolean
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': Math.random().toString(36).substr(2, 9),
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        return { 
          error: data.error,
          error_code: data.error_code,
          user_message: data.user_message,
          technical_details: data.technical_details,
          suggested_action: data.suggested_action,
          retry_after: data.retry_after
        };
      }
      
      // Cache successful responses
      if (useCache && data) {
        this.queryCache.set(cacheKey, data, 60); // 1 hour cache
      }
      
      return { data };
    } catch (error) {
      console.error('API Request failed:', error);
      
      // Try to return cached response as fallback
      if (useCache) {
        const cached = this.queryCache.get(cacheKey);
        if (cached) {
          console.log('Returning cached response due to API error');
          return { data: cached };
        }
      }
      
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        error_code: 'XP-500',
        user_message: 'I\'m having trouble connecting right now. Please try again in a moment.',
        suggested_action: 'Check your internet connection and try again',
        retry_after: 30
      };
    }
  }

  // Enhanced question processing with language detection and context
  async askQuestion(
    question: string, 
    context?: {
      language?: 'en' | 'ta';
      syllabus_context?: {
        class: "11" | "12";
        chapter?: string;
        topic?: string;
      };
      session_id?: string;
    }
  ): Promise<ApiResponse<ChatResponse>> {
    return this.makeRequest<ChatResponse>('/api/chat/ask', {
      method: 'POST',
      body: JSON.stringify({ 
        question,
        context: context || {},
        timestamp: new Date().toISOString()
      }),
    });
  }

  // Generate question with enhanced parameters
  async generateQuestion(
    type: 'mcq' | 'explanation', 
    subject: string = 'Biology', 
    classLevel: string = 'all',
    chapter?: string,
    topic?: string
  ) {
    return this.makeRequest('/api/chat/generate-question', {
      method: 'POST',
      body: JSON.stringify({ 
        type, 
        subject, 
        class: classLevel,
        chapter,
        topic,
        timestamp: new Date().toISOString()
      }),
    });
  }

  // Enhanced answer validation
  async validateAnswer(userAnswer: string, modelAnswer: string, context?: any) {
    return this.makeRequest('/api/chat/validate-answer', {
      method: 'POST',
      body: JSON.stringify({ 
        userAnswer, 
        modelAnswer,
        context: context || {},
        timestamp: new Date().toISOString()
      }),
    });
  }

  // New: Submit feedback
  async submitFeedback(messageId: string, feedback: 'helpful' | 'not_helpful' | 'reported', details?: string) {
    return this.makeRequest('/api/chat/feedback', {
      method: 'POST',
      body: JSON.stringify({
        messageId,
        feedback,
        details,
        timestamp: new Date().toISOString()
      }),
    }, false); // Don't cache feedback submissions
  }

  // New: Get syllabus structure
  async getSyllabusStructure(classLevel?: "11" | "12") {
    return this.makeRequest(`/api/syllabus/structure${classLevel ? `?class=${classLevel}` : ''}`, {
      method: 'GET',
    });
  }

  // Clear cache manually
  clearCache() {
    this.queryCache.clear();
  }
}

export const enhancedFlaskApi = new EnhancedFlaskApiService(FLASK_API_URL);

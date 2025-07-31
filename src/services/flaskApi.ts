
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

class FlaskApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        return { error: data.error };
      }
      
      return { data };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Chat endpoint - /ask
  async askQuestion(question: string) {
    return this.makeRequest('/api/chat/ask', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });
  }

  // Generate question endpoint - /generate-question
  async generateQuestion(type: 'mcq' | 'explanation', subject: string = 'all', classLevel: string = 'all') {
    return this.makeRequest('/api/chat/generate-question', {
      method: 'POST',
      body: JSON.stringify({ 
        type, 
        subject, 
        class: classLevel 
      }),
    });
  }

  // Validate answer endpoint - /validate-answer
  async validateAnswer(userAnswer: string, modelAnswer: string) {
    return this.makeRequest('/api/chat/validate-answer', {
      method: 'POST',
      body: JSON.stringify({ 
        userAnswer, 
        modelAnswer 
      }),
    });
  }

  // Generate mock test endpoint (new)
  async generateMockTest(testName: string, testType: string = 'full_mock', subjects: string[] = ['Physics', 'Chemistry', 'Biology']) {
    return this.makeRequest('/api/chat/generate-mock-test', {
      method: 'POST',
      body: JSON.stringify({ 
        testName,
        testType,
        subjects
      }),
    });
  }
}

export const flaskApi = new FlaskApiService(FLASK_API_URL);

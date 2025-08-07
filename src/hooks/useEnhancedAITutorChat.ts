
import { useState, useCallback } from 'react';
import { enhancedFlaskApi } from '@/services/enhancedFlaskApi';
import { ChatResponse, EnhancedChatMessage } from '@/types/syllabus';
import { toast } from 'sonner';

export const useEnhancedAITutorChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  const askQuestion = useCallback(async (
    question: string,
    context?: {
      language?: 'en' | 'ta';
      syllabus_context?: {
        class: "11" | "12";
        chapter?: string;
        topic?: string;
      };
      image?: File;
    }
  ) => {
    setIsLoading(true);
    try {
      console.log('Sending enhanced question to AI Tutor:', question, context);
      
      const response = await enhancedFlaskApi.askQuestion(question, {
        ...context,
        session_id: sessionId
      });
      
      if (response.error) {
        toast.error(response.user_message || `Error: ${response.error}`);
        return {
          success: false,
          error: response.error,
          errorCode: response.error_code,
          suggestedAction: response.suggested_action,
          retryAfter: response.retry_after
        };
      }
      
      if (response.data) {
        return {
          success: true,
          data: response.data as ChatResponse
        };
      }
      
      return {
        success: false,
        error: 'No response received from AI tutor'
      };
      
    } catch (error) {
      console.error('Failed to get AI response:', error);
      toast.error('Failed to connect to AI tutor');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const submitFeedback = useCallback(async (
    messageId: string, 
    feedback: 'helpful' | 'not_helpful' | 'reported',
    details?: string
  ) => {
    try {
      const response = await enhancedFlaskApi.submitFeedback(messageId, feedback, details);
      
      if (response.error) {
        toast.error('Failed to submit feedback');
        return false;
      }
      
      toast.success('Feedback submitted successfully');
      return true;
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback');
      return false;
    }
  }, []);

  return {
    askQuestion,
    submitFeedback,
    isLoading,
    sessionId
  };
};

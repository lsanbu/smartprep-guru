
import { useState } from 'react';
import { flaskApi } from '@/services/flaskApi';
import { toast } from 'sonner';

interface ApiResponse {
  answer?: string;
  error?: string;
}

export const useAITutorChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await flaskApi.askQuestion(question) as ApiResponse;
      
      if (response.error) {
        toast.error(`Error: ${response.error}`);
        return null;
      }
      
      return response.answer || 'No response received';
    } catch (error) {
      toast.error('Failed to get response from AI tutor');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    askQuestion,
    isLoading
  };
};

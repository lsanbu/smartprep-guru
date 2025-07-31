
import { useState } from 'react';
import { flaskApi } from '@/services/flaskApi';
import { toast } from 'sonner';

export const useAITutorChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await flaskApi.askQuestion(question);
      
      if (response.error) {
        toast.error(`Error: ${response.error}`);
        return null;
      }
      
      return response.data?.answer || 'No response received';
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

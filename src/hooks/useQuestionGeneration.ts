
import { useState } from 'react';
import { flaskApi } from '@/services/flaskApi';
import { toast } from 'sonner';

interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ExplanationQuestion {
  question: string;
  modelAnswer: string;
  keyPoints: string[];
}

export const useQuestionGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateMCQ = async (subject: string = 'all', classLevel: string = 'all'): Promise<MCQQuestion | null> => {
    setIsLoading(true);
    try {
      const response = await flaskApi.generateQuestion('mcq', subject, classLevel);
      
      if (response.error) {
        toast.error(`Error: ${response.error}`);
        return null;
      }
      
      return response.data as MCQQuestion;
    } catch (error) {
      toast.error('Failed to generate MCQ question');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const generateExplanation = async (subject: string = 'all', classLevel: string = 'all'): Promise<ExplanationQuestion | null> => {
    setIsLoading(true);
    try {
      const response = await flaskApi.generateQuestion('explanation', subject, classLevel);
      
      if (response.error) {
        toast.error(`Error: ${response.error}`);
        return null;
      }
      
      return response.data as ExplanationQuestion;
    } catch (error) {
      toast.error('Failed to generate explanation question');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const validateAnswer = async (userAnswer: string, modelAnswer: string) => {
    setIsLoading(true);
    try {
      const response = await flaskApi.validateAnswer(userAnswer, modelAnswer);
      
      if (response.error) {
        toast.error(`Error: ${response.error}`);
        return null;
      }
      
      return response.data;
    } catch (error) {
      toast.error('Failed to validate answer');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateMCQ,
    generateExplanation,
    validateAnswer,
    isLoading
  };
};

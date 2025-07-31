import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MockTest {
  id: string;
  test_name: string;
  test_type: string;
  total_questions: number;
  physics_questions: number;
  chemistry_questions: number;
  biology_questions: number;
  generated_at: string;
  is_active: boolean;
  metadata?: any;
}

export interface Question {
  id: string;
  mock_test_id: string;
  question_number: number;
  subject: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation?: string;
  difficulty_level?: number;
  source_context?: string;
}

export interface TestAttempt {
  id: string;
  user_id: string;
  mock_test_id: string;
  started_at: string;
  submitted_at?: string;
  total_score?: number;
  physics_score?: number;
  chemistry_score?: number;
  biology_score?: number;
  time_spent_minutes?: number;
  status: string;
}

export const useMockTests = () => {
  const queryClient = useQueryClient();

  // Fetch all active mock tests
  const {
    data: mockTests = [],
    isLoading: isLoadingTests
  } = useQuery({
    queryKey: ['mockTests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .eq('is_active', true)
        .order('generated_at', { ascending: false });
      
      if (error) throw error;
      return data as MockTest[];
    }
  });

  // Fetch questions for a specific test
  const getTestQuestions = async (testId: string): Promise<Question[]> => {
    const { data, error } = await supabase
      .from('generated_questions')
      .select('*')
      .eq('mock_test_id', testId)
      .order('question_number');
    
    if (error) throw error;
    return data as Question[];
  };

  // Generate new mock test using Flask API integration
  const generateMockTest = useMutation({
    mutationFn: async (params: {
      testName: string;
      testType?: string;
      subjects?: string[];
    }) => {
      // Call the updated Supabase edge function
      const { data, error } = await supabase.functions.invoke('generate-mock-test', {
        body: params
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mockTests'] });
      toast.success('Mock test generated successfully using FAISS + AI!');
    },
    onError: (error) => {
      toast.error(`Failed to generate test: ${error.message}`);
    }
  });

  // Start a test attempt
  const startTestAttempt = useMutation({
    mutationFn: async (mockTestId: string) => {
      const { data, error } = await supabase
        .from('test_attempts')
        .insert({
          mock_test_id: mockTestId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          status: 'in_progress'
        })
        .select()
        .single();

      if (error) throw error;
      return data as TestAttempt;
    },
    onSuccess: () => {
      toast.success('Test started successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to start test: ${error.message}`);
    }
  });

  // Submit answer for a question
  const submitAnswer = useMutation({
    mutationFn: async (params: {
      attemptId: string;
      questionId: string;
      selectedAnswer: string;
      timeSpent: number;
    }) => {
      // First get the correct answer to check if response is correct
      const { data: question } = await supabase
        .from('generated_questions')
        .select('correct_answer')
        .eq('id', params.questionId)
        .single();

      const isCorrect = question?.correct_answer === params.selectedAnswer;

      const { data, error } = await supabase
        .from('question_responses')
        .insert({
          attempt_id: params.attemptId,
          question_id: params.questionId,
          selected_answer: params.selectedAnswer,
          is_correct: isCorrect,
          time_spent_seconds: params.timeSpent
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  });

  // Submit complete test
  const submitTest = useMutation({
    mutationFn: async (params: {
      attemptId: string;
      totalScore: number;
      subjectScores: {
        physics: number;
        chemistry: number;
        biology: number;
      };
      timeSpent: number;
    }) => {
      const { data, error } = await supabase
        .from('test_attempts')
        .update({
          submitted_at: new Date().toISOString(),
          total_score: params.totalScore,
          physics_score: params.subjectScores.physics,
          chemistry_score: params.subjectScores.chemistry,
          biology_score: params.subjectScores.biology,
          time_spent_minutes: params.timeSpent,
          status: 'completed'
        })
        .eq('id', params.attemptId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Test submitted successfully!');
    }
  });

  return {
    mockTests,
    isLoadingTests,
    getTestQuestions,
    generateMockTest,
    startTestAttempt,
    submitAnswer,
    submitTest
  };
};

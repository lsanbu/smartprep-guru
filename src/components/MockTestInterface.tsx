
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react";
import { useMockTests, Question, TestAttempt } from "@/hooks/useMockTests";
import { toast } from "sonner";

interface MockTestInterfaceProps {
  mockTestId: string;
  onComplete: (attempt: TestAttempt) => void;
  onExit: () => void;
}

const MockTestInterface: React.FC<MockTestInterfaceProps> = ({
  mockTestId,
  onComplete,
  onExit
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [testAttempt, setTestAttempt] = useState<TestAttempt | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const { getTestQuestions, startTestAttempt, submitAnswer, submitTest } = useMockTests();

  // Load test and start attempt
  useEffect(() => {
    const initializeTest = async () => {
      try {
        const questionsData = await getTestQuestions(mockTestId);
        setQuestions(questionsData);
        
        const attempt = await startTestAttempt.mutateAsync(mockTestId);
        setTestAttempt(attempt);
      } catch (error) {
        toast.error('Failed to load test');
        onExit();
      }
    };

    initializeTest();
  }, [mockTestId]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Track time spent on current question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = async (answer: string) => {
    if (!currentQuestion || !testAttempt) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Update local state
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    // Submit to database
    try {
      await submitAnswer.mutateAsync({
        attemptId: testAttempt.id,
        questionId: currentQuestion.id,
        selectedAnswer: answer,
        timeSpent
      });
    } catch (error) {
      toast.error('Failed to save answer');
    }
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmitTest = async () => {
    if (!testAttempt) return;

    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const totalScore = Object.entries(answers).reduce((score, [questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      return score + (question?.correct_answer === answer ? 1 : 0);
    }, 0);

    // Calculate subject-wise scores
    const subjectScores = questions.reduce((acc, question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correct_answer) {
        acc[question.subject.toLowerCase() as keyof typeof acc]++;
      }
      return acc;
    }, { physics: 0, chemistry: 0, biology: 0 });

    try {
      const completedAttempt = await submitTest.mutateAsync({
        attemptId: testAttempt.id,
        totalScore,
        subjectScores,
        timeSpent: Math.floor((180 * 60 - timeRemaining) / 60)
      });

      onComplete(completedAttempt);
    } catch (error) {
      toast.error('Failed to submit test');
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-100 text-blue-800';
      case 'Chemistry': return 'bg-green-100 text-green-800';
      case 'Biology': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentQuestion || !testAttempt) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading test...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className={getSubjectColor(currentQuestion.subject)}>
                {currentQuestion.subject}
              </Badge>
              <span className="text-lg font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>{answeredCount}/{questions.length}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-orange-600">
                <Flag className="w-5 h-5" />
                <span>{flaggedQuestions.size}</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${timeRemaining < 600 ? 'text-red-600' : 'text-blue-600'}`}>
                <Timer className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              Q{currentQuestion.question_number}. {currentQuestion.question_text}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFlag(currentQuestion.id)}
              className={flaggedQuestions.has(currentQuestion.id) ? 'text-orange-600 border-orange-600' : ''}
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {['A', 'B', 'C', 'D'].map((option) => (
              <div
                key={option}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                    answers[currentQuestion.id] === option
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-gray-400 text-gray-600'
                  }`}>
                    {option}
                  </div>
                  <span className="text-gray-800">
                    {currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={onExit}>
                Exit Test
              </Button>
              <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                Submit Test
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Grid (Optional - for quick navigation) */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((question, index) => (
              <Button
                key={question.id}
                variant="outline"
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`
                  ${index === currentQuestionIndex ? 'border-purple-500 bg-purple-50' : ''}
                  ${answers[question.id] ? 'bg-green-100 border-green-400' : ''}
                  ${flaggedQuestions.has(question.id) ? 'bg-orange-100 border-orange-400' : ''}
                `}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockTestInterface;


import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  PlayCircle,
  GraduationCap,
  FlaskConical,
  Heart,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  class: string;
  type: 'mcq' | 'explanation';
}

interface QuestionGeneratorProps {
  onAddToChat: (message: string, type: 'question' | 'result') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const QuestionGenerator = ({ onAddToChat, isLoading, setIsLoading }: QuestionGeneratorProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [questionType, setQuestionType] = useState<'mcq' | 'explanation'>('mcq');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'physics', name: 'Physics', icon: Lightbulb, color: 'text-purple-600' },
    { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: 'text-blue-600' },
    { id: 'biology', name: 'Biology', icon: Heart, color: 'text-green-600' },
  ];

  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: '11', name: 'Class 11' },
    { id: '12', name: 'Class 12' },
  ];

  const API_BASE_URL = 'http://localhost:5000';
  const GENERATE_QUESTION_ENDPOINT = `${API_BASE_URL}/api/chat/generate-question`;
  const VALIDATE_ANSWER_ENDPOINT = `${API_BASE_URL}/api/chat/validate-answer`;

  const generateQuestion = async () => {
    setIsLoading(true);
    setCurrentQuestion(null);
    setShowResult(false);
    setUserAnswer('');
    setSelectedOption('');

    try {
      const prompt = `Generate a ${questionType} question for NEET preparation.
        Subject: ${selectedSubject === 'all' ? 'any NEET subject (Physics, Chemistry, Biology)' : selectedSubject}
        Class: ${selectedClass === 'all' ? 'Class 11 or 12' : `Class ${selectedClass}`}
        
        ${questionType === 'mcq' 
          ? 'Provide: 1) Question text 2) 4 options (A, B, C, D) 3) Correct option 4) Brief explanation' 
          : 'Provide: 1) Question requiring detailed explanation 2) Expected answer points 3) Detailed explanation'
        }
        
        Format the response as JSON with fields: question, ${questionType === 'mcq' ? 'options (array), correctAnswer,' : 'correctAnswer,'} explanation, subject, class`;

      const response = await fetch(GENERATE_QUESTION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type: questionType })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate question: ${response.status}`);
      }

      const data = await response.json();
      const questionData: Question = {
        question: data.question,
        options: data.options,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation,
        subject: data.subject,
        class: data.class,
        type: questionType
      };

      setCurrentQuestion(questionData);
      setPracticeMode(true);
      
      // Add question to chat
      const questionMessage = `🎯 **Practice Question (${questionData.subject} - Class ${questionData.class})**\n\n${questionData.question}${
        questionData.options ? '\n\n' + questionData.options.map((opt, idx) => `${String.fromCharCode(65 + idx)}) ${opt}`).join('\n') : ''
      }`;
      onAddToChat(questionMessage, 'question');
      
      toast.success("Question generated! Answer below to get feedback.");

    } catch (error) {
      console.error('Error generating question:', error);
      toast.error("Failed to generate question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateAnswer = async () => {
    if (!currentQuestion) return;
    if (questionType === 'mcq' && !selectedOption) {
      toast.error("Please select an option first.");
      return;
    }
    if (questionType === 'explanation' && !userAnswer.trim()) {
      toast.error("Please provide your answer first.");
      return;
    }

    setIsLoading(true);

    try {
      const studentAnswer = questionType === 'mcq' ? selectedOption : userAnswer;
      
      const response = await fetch(VALIDATE_ANSWER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          studentAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
          type: questionType
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to validate answer: ${response.status}`);
      }

      const data = await response.json();
      setIsCorrect(data.isCorrect);
      setShowResult(true);
      
      // Add result to chat
      const resultMessage = `${data.isCorrect ? '✅' : '❌'} **${data.isCorrect ? 'Correct!' : 'Incorrect'}**\n\n**Correct Answer:** ${currentQuestion.correctAnswer}\n\n**Explanation:** ${currentQuestion.explanation}${data.feedback ? `\n\n**Feedback:** ${data.feedback}` : ''}`;
      onAddToChat(resultMessage, 'result');
      
      toast.success(data.isCorrect ? "Correct! Well done!" : "Keep practicing! Check the explanation.");

    } catch (error) {
      console.error('Error validating answer:', error);
      toast.error("Failed to validate answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(null);
    setPracticeMode(false);
    setShowResult(false);
    setUserAnswer('');
    setSelectedOption('');
  };

  if (!practiceMode) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-600">
            <Target className="w-5 h-5" />
            <span>Practice Questions</span>
          </CardTitle>
          <CardDescription>Generate dynamic NEET questions for practice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Choose Subject</label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`flex items-center space-x-2 ${
                    selectedSubject === subject.id 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 border-gray-200 hover:bg-purple-50'
                  }`}
                >
                  <subject.icon className="w-4 h-4" />
                  <span className="text-xs">{subject.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Choose Class</label>
            <div className="flex gap-2">
              {classes.map((cls) => (
                <Button
                  key={cls.id}
                  variant={selectedClass === cls.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedClass(cls.id)}
                  className={`${
                    selectedClass === cls.id 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 border-gray-200 hover:bg-green-50'
                  }`}
                >
                  <span className="text-xs">{cls.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Question Type Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Question Type</label>
            <div className="flex gap-2">
              <Button
                variant={questionType === 'mcq' ? "default" : "outline"}
                size="sm"
                onClick={() => setQuestionType('mcq')}
                className={`flex items-center space-x-2 ${
                  questionType === 'mcq' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 border-gray-200 hover:bg-blue-50'
                }`}
              >
                <Target className="w-4 h-4" />
                <span className="text-xs">MCQ</span>
              </Button>
              <Button
                variant={questionType === 'explanation' ? "default" : "outline"}
                size="sm"
                onClick={() => setQuestionType('explanation')}
                className={`flex items-center space-x-2 ${
                  questionType === 'explanation' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-600 border-gray-200 hover:bg-orange-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-xs">Explanation</span>
              </Button>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateQuestion}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Question...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5 mr-2" />
                Let Me Practice!
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-purple-600">
            <Target className="w-5 h-5" />
            <span>Practice Mode</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetPractice}
            className="text-gray-600"
          >
            New Question
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQuestion && (
          <>
            {/* Question Display */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-purple-100 text-purple-700">
                  {currentQuestion.subject}
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  Class {currentQuestion.class}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  {currentQuestion.type.toUpperCase()}
                </Badge>
              </div>
              <p className="font-medium text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Input */}
            {!showResult && (
              <div className="space-y-3">
                {questionType === 'mcq' && currentQuestion.options ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select your answer:</label>
                    {currentQuestion.options.map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 cursor-pointer">
                        <input
                          type="radio"
                          name="mcq-option"
                          value={String.fromCharCode(65 + index)}
                          checked={selectedOption === String.fromCharCode(65 + index)}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="text-purple-600"
                        />
                        <span className="font-medium text-purple-700">
                          {String.fromCharCode(65 + index)})
                        </span>
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Write your detailed answer:
                    </label>
                    <Textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Provide a detailed explanation..."
                      className="min-h-24 border-gray-300 focus:border-purple-400"
                    />
                  </div>
                )}

                <Button 
                  onClick={validateAnswer}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Checking Answer...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Answer
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className={`p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <h4 className={`font-bold text-lg ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Correct Answer: </span>
                    <span className="text-gray-800">{currentQuestion.correctAnswer}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Explanation: </span>
                    <p className="text-gray-800 mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>

                <Button 
                  onClick={generateQuestion}
                  disabled={isLoading}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Next Question
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionGenerator;

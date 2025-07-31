import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  FileQuestion, 
  CheckCircle, 
  XCircle,
  Loader2,
  BookOpen,
  Target
} from "lucide-react";
import { useQuestionGeneration } from "@/hooks/useQuestionGeneration";

const QuestionGenerator = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [questionType, setQuestionType] = useState<'mcq' | 'explanation'>('mcq');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const { generateMCQ, generateExplanation, validateAnswer, isLoading } = useQuestionGeneration();

  const handleGenerateQuestion = async () => {
    setCurrentQuestion(null);
    setShowResult(false);
    setUserAnswer('');
    setSelectedOption('');
    setValidationResult(null);

    let question;
    if (questionType === 'mcq') {
      question = await generateMCQ(selectedSubject, selectedClass);
    } else {
      question = await generateExplanation(selectedSubject, selectedClass);
    }

    if (question) {
      setCurrentQuestion(question);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;

    if (questionType === 'mcq') {
      setShowResult(true);
    } else if (questionType === 'explanation' && userAnswer.trim()) {
      const result = await validateAnswer(userAnswer, currentQuestion.modelAnswer);
      if (result) {
        setValidationResult(result);
        setShowResult(true);
      }
    }
  };

  const renderMCQOptions = () => {
    if (!currentQuestion || questionType !== 'mcq') return null;

    return (
      <div className="space-y-3">
        {currentQuestion.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedOption === String.fromCharCode(65 + index)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
            onClick={() => setSelectedOption(String.fromCharCode(65 + index))}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                selectedOption === String.fromCharCode(65 + index)
                  ? 'border-purple-500 bg-purple-500 text-white'
                  : 'border-gray-400 text-gray-600'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-gray-800">{option}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderResult = () => {
    if (!showResult || !currentQuestion) return null;

    if (questionType === 'mcq') {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      return (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} border-2`}>
          <div className="flex items-center space-x-2">
            {isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Incorrect.</span>
              </>
            )}
          </div>
          <p className="text-gray-700 mt-2">
            Correct Answer: <Badge variant="secondary">{currentQuestion.correctAnswer}</Badge>
          </p>
          <p className="text-gray-700 mt-2">
            Explanation: {currentQuestion.explanation}
          </p>
        </div>
      );
    } else if (questionType === 'explanation' && validationResult) {
      return (
        <div className="p-4 rounded-lg bg-blue-50 border-blue-500 border-2">
          <h4 className="font-medium text-blue-700">Validation Result</h4>
          <p className="text-gray-700 mt-2">
            Score: <Badge variant="secondary">{validationResult.score}</Badge>
          </p>
          <p className="text-gray-700 mt-2">
            Feedback: {validationResult.feedback}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-600">
          <Brain className="w-6 h-6" />
          <span>AI Question Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select onValueChange={(value) => setSelectedSubject(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" defaultValue={selectedSubject} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={(value) => setSelectedClass(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class" defaultValue={selectedClass} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="11th">11th</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select onValueChange={(value) => setQuestionType(value as 'mcq' | 'explanation')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" defaultValue={questionType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">MCQ</SelectItem>
                <SelectItem value="explanation">Explanation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerateQuestion}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Question...
            </>
          ) : (
            <>
              <FileQuestion className="w-4 h-4 mr-2" />
              Generate Question
            </>
          )}
        </Button>

        {/* Question Display */}
        {currentQuestion && (
          <div className="space-y-4">
            <Card className="bg-gray-50 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  <BookOpen className="w-5 h-5 inline mr-1" />
                  {questionType === 'mcq' ? 'MCQ Question' : 'Explanation Question'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{currentQuestion.question}</p>
                {questionType === 'mcq' ? (
                  renderMCQOptions()
                ) : (
                  <Textarea
                    placeholder="Your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="mt-4"
                  />
                )}
              </CardContent>
            </Card>

            {/* Submit Answer Button */}
            {questionType === 'explanation' && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={isLoading || !userAnswer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating Answer...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Submit Answer
                  </>
                )}
              </Button>
            )}

            {/* Result Display */}
            {renderResult()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionGenerator;

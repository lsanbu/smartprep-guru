
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  FileText, 
  Clock, 
  Target,
  Loader2,
  CheckCircle
} from "lucide-react";
import { useMockTests } from "@/hooks/useMockTests";

const MockTestGenerator = () => {
  const [testName, setTestName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Chemistry', 'Biology']);
  const [testType, setTestType] = useState('full_mock');

  const { generateMockTest } = useMockTests();

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    }
  };

  const handleGenerate = () => {
    if (!testName.trim()) {
      return;
    }

    generateMockTest.mutate({
      testName: testName.trim(),
      testType,
      subjects: selectedSubjects
    });
  };

  const getQuestionDistribution = () => {
    if (testType === 'full_mock') {
      return { Physics: 45, Chemistry: 45, Biology: 90 };
    }
    // For subject-wise tests, adjust distribution
    return selectedSubjects.reduce((acc, subject) => {
      acc[subject] = subject === 'Biology' ? 90 : 45;
      return acc;
    }, {} as Record<string, number>);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-600">
          <Zap className="w-6 h-6" />
          <span>AI Mock Test Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Name Input */}
        <div className="space-y-2">
          <Label htmlFor="testName">Test Name</Label>
          <Input
            id="testName"
            placeholder="e.g., NEET Mock Test 2024 - Week 1"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Test Type Selection */}
        <div className="space-y-3">
          <Label>Test Type</Label>
          <div className="flex gap-3">
            <Button
              variant={testType === 'full_mock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTestType('full_mock')}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Full Mock (180Q)</span>
            </Button>
            <Button
              variant={testType === 'subject_wise' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTestType('subject_wise')}
              className="flex items-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Subject Wise</span>
            </Button>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="space-y-3">
          <Label>Subjects to Include</Label>
          <div className="flex flex-wrap gap-3">
            {['Physics', 'Chemistry', 'Biology'].map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                />
                <Label htmlFor={subject} className="text-sm font-medium">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Question Distribution Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Question Distribution</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(getQuestionDistribution()).map(([subject, count]) => (
              <Badge key={subject} variant="secondary" className="px-3 py-1">
                {subject}: {count} questions
              </Badge>
            ))}
          </div>
        </div>

        {/* Generation Settings */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-700 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">AI Generation Features</span>
          </div>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>• Questions sourced from NCERT textbooks</li>
            <li>• NEET-pattern difficulty distribution</li>
            <li>• No repetition from recent tests</li>
            <li>• Detailed explanations included</li>
          </ul>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!testName.trim() || selectedSubjects.length === 0 || generateMockTest.isPending}
          className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
        >
          {generateMockTest.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Test...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate Mock Test
            </>
          )}
        </Button>

        {/* Estimated Time */}
        <div className="text-center text-sm text-gray-600">
          <Clock className="w-4 h-4 inline mr-1" />
          Generation takes 2-3 minutes
        </div>
      </CardContent>
    </Card>
  );
};

export default MockTestGenerator;

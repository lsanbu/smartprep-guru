
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  BookOpen, 
  Lightbulb, 
  Target, 
  TrendingUp,
  FlaskConical,
  Calculator,
  Atom,
  Heart,
  Eye,
  Dna,
  Activity
} from "lucide-react";

interface QuickQuestion {
  text: string;
  subject: string;
  category: 'concept' | 'mcq' | 'numerical' | 'diagram';
  icon: any;
  color: string;
}

interface QuickQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isLoading: boolean;
}

const QuickQuestions = ({ onQuestionSelect, isLoading }: QuickQuestionsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const quickQuestions: QuickQuestion[] = [
    // Biology Concepts
    { 
      text: "Explain Haversian Canals structure and function", 
      subject: "Biology", 
      category: 'concept',
      icon: BookOpen,
      color: "text-green-600"
    },
    { 
      text: "Describe the process of mitosis in detail", 
      subject: "Biology", 
      category: 'concept',
      icon: Dna,
      color: "text-green-600"
    },
    { 
      text: "Explain the structure and function of nephron", 
      subject: "Biology", 
      category: 'concept',
      icon: Heart,
      color: "text-green-600"
    },

    // Biology MCQs
    { 
      text: "Give me 5 MCQ questions from 11th Biology, Chapter 3: Plant Kingdom", 
      subject: "Biology", 
      category: 'mcq',
      icon: Target,
      color: "text-green-600"
    },
    { 
      text: "Generate 10 MCQs on Human Circulatory System for NEET", 
      subject: "Biology", 
      category: 'mcq',
      icon: Activity,
      color: "text-green-600"
    },
    { 
      text: "Create 8 MCQs from Photosynthesis chapter with explanations", 
      subject: "Biology", 
      category: 'mcq',
      icon: Target,
      color: "text-green-600"
    },

    // Chemistry Concepts
    { 
      text: "Explain SN1 and SN2 reaction mechanisms with examples", 
      subject: "Chemistry", 
      category: 'concept',
      icon: FlaskConical,
      color: "text-blue-600"
    },
    { 
      text: "Describe hybridization in organic compounds", 
      subject: "Chemistry", 
      category: 'concept',
      icon: Atom,
      color: "text-blue-600"
    },

    // Chemistry MCQs & Numericals
    { 
      text: "Generate 7 MCQs on Chemical Bonding from 11th Chemistry", 
      subject: "Chemistry", 
      category: 'mcq',
      icon: Target,
      color: "text-blue-600"
    },
    { 
      text: "Give me 5 numerical problems on Molarity and Molality", 
      subject: "Chemistry", 
      category: 'numerical',
      icon: Calculator,
      color: "text-blue-600"
    },
    { 
      text: "Create 6 numerical problems on Thermodynamics for NEET", 
      subject: "Chemistry", 
      category: 'numerical',
      icon: TrendingUp,
      color: "text-blue-600"
    },

    // Physics Concepts
    { 
      text: "Explain electromagnetic induction and Lenz's law", 
      subject: "Physics", 
      category: 'concept',
      icon: Lightbulb,
      color: "text-purple-600"
    },
    { 
      text: "Describe wave-particle duality of light", 
      subject: "Physics", 
      category: 'concept',
      icon: Eye,
      color: "text-purple-600"
    },

    // Physics MCQs & Numericals
    { 
      text: "Generate 8 MCQs on Rotational Motion from 11th Physics", 
      subject: "Physics", 
      category: 'mcq',
      icon: Target,
      color: "text-purple-600"
    },
    { 
      text: "Give me 6 numerical problems on Simple Harmonic Motion", 
      subject: "Physics", 
      category: 'numerical',
      icon: Calculator,
      color: "text-purple-600"
    },
    { 
      text: "Create 5 numerical problems on Optics for NEET", 
      subject: "Physics", 
      category: 'numerical',
      icon: TrendingUp,
      color: "text-purple-600"
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: Zap },
    { id: 'concept', label: 'Concepts', icon: BookOpen },
    { id: 'mcq', label: 'MCQs', icon: Target },
    { id: 'numerical', label: 'Numericals', icon: Calculator },
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? quickQuestions 
    : quickQuestions.filter(q => q.category === selectedCategory);

  const handleQuestionClick = (questionText: string) => {
    onQuestionSelect(questionText);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-600">
          <Zap className="w-5 h-5" />
          <span>Enhanced Quick Questions</span>
        </CardTitle>
        <CardDescription>Smart prompts for different types of NEET preparation</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-1 ${
                selectedCategory === category.id 
                  ? 'bg-purple-600 text-white' 
                  : 'text-purple-600 border-purple-200 hover:bg-purple-50'
              }`}
              disabled={isLoading}
            >
              <category.icon className="w-3 h-3" />
              <span className="text-xs">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question.text)}
              className="w-full p-3 text-left bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-200"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2 mb-2">
                <question.icon className={`w-4 h-4 ${question.color}`} />
                <Badge 
                  variant="outline" 
                  className={`text-xs ${question.color} border-current`}
                >
                  {question.subject}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-200 text-gray-700"
                >
                  {question.category.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {question.text}
              </div>
            </button>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No questions found for this category</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickQuestions;

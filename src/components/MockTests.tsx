
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Play, 
  Clock, 
  Trophy, 
  Target, 
  BarChart3,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Share,
  Filter,
  Search,
  Eye,
  TrendingUp,
  Users,
  Award,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface MockTest {
  id: string;
  title: string;
  type: 'full' | 'subject' | 'chapter';
  subject?: string;
  chapter?: string;
  duration: number;
  questions: number;
  attempted?: boolean;
  score?: number;
  rank?: number;
  date?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'upcoming' | 'active' | 'completed';
}

const MockTests = () => {
  const [selectedTab, setSelectedTab] = useState<'available' | 'completed' | 'analysis'>('available');

  const mockTests: MockTest[] = [
    {
      id: '1',
      title: 'NEET Mock Test 16',
      type: 'full',
      duration: 180,
      questions: 180,
      difficulty: 'medium',
      status: 'upcoming',
      date: 'Today, 6:00 PM'
    },
    {
      id: '2',
      title: 'Physics - Mechanics',
      type: 'subject',
      subject: 'Physics',
      duration: 60,
      questions: 45,
      difficulty: 'hard',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Chemistry - Organic Reactions',
      type: 'chapter',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      duration: 45,
      questions: 30,
      difficulty: 'medium',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'NEET Mock Test 15',
      type: 'full',
      duration: 180,
      questions: 180,
      difficulty: 'medium',
      status: 'completed',
      attempted: true,
      score: 145,
      rank: 1247,
      date: '2 days ago'
    },
    {
      id: '5',
      title: 'Biology - Cell Structure',
      type: 'chapter',
      subject: 'Biology',
      chapter: 'Cell Biology',
      duration: 30,
      questions: 25,
      difficulty: 'easy',
      status: 'completed',
      attempted: true,
      score: 22,
      rank: 89,
      date: '1 week ago'
    }
  ];

  const testAnalytics = {
    totalAttempted: 42,
    averageScore: 78.5,
    bestRank: 245,
    improvementTrend: '+12%',
    accuracy: 82.3,
    timeManagement: 85
  };

  const recentResults = [
    { test: 'Mock Test 15', score: 145, rank: 1247, percentile: 94.2, date: '2 days ago' },
    { test: 'Physics Mock', score: 38, rank: 456, percentile: 89.5, date: '5 days ago' },
    { test: 'Chemistry Test', score: 42, rank: 234, percentile: 92.1, date: '1 week ago' },
    { test: 'Biology Mock', score: 47, rank: 123, percentile: 95.8, date: '1 week ago' }
  ];

  const upcomingTests = mockTests.filter(test => test.status === 'upcoming');
  const completedTests = mockTests.filter(test => test.status === 'completed');

  const startTest = (testId: string) => {
    toast.success("Starting test... Good luck!");
    // In real app, navigate to test interface
  };

  const viewAnalysis = (testId: string) => {
    toast.info("Opening detailed analysis...");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return Trophy;
      case 'subject': return Target;
      case 'chapter': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mock Tests & Assessments</h2>
            <p className="text-purple-100">Practice with NEET-pattern tests and track your progress</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{testAnalytics.totalAttempted}</div>
            <div className="text-purple-100">Tests Completed</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <BarChart3 className="w-5 h-5" />
              <span>Average Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{testAnalytics.averageScore}%</div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              {testAnalytics.improvementTrend} this month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Trophy className="w-5 h-5" />
              <span>Best Rank</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">#{testAnalytics.bestRank}</div>
            <div className="text-sm text-gray-600">All India Rank</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Target className="w-5 h-5" />
              <span>Accuracy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{testAnalytics.accuracy}%</div>
            <div className="text-sm text-blue-600">Question accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span>Time Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">{testAnalytics.timeManagement}%</div>
            <div className="text-sm text-orange-600">Efficiency score</div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setSelectedTab('available')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'available' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          Available Tests
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'completed' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          Completed Tests
        </button>
        <button
          onClick={() => setSelectedTab('analysis')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'analysis' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          Performance Analysis
        </button>
      </div>

      {/* Available Tests Tab */}
      {selectedTab === 'available' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Available Tests</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTests.map((test) => {
              const IconComponent = getTypeIcon(test.type);
              return (
                <Card key={test.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                      </div>
                      {test.status === 'upcoming' && (
                        <Badge className="bg-orange-100 text-orange-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          Scheduled
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>
                      {test.subject && `Subject: ${test.subject}`}
                      {test.chapter && ` - ${test.chapter}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{test.duration} mins</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{test.questions} questions</span>
                        </div>
                      </div>
                      
                      {test.date && (
                        <div className="text-sm text-orange-600 font-medium">
                          📅 {test.date}
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => startTest(test.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {test.status === 'upcoming' ? 'Start at Scheduled Time' : 'Start Test'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Tests Tab */}
      {selectedTab === 'completed' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Completed Tests</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>

          <div className="space-y-4">
            {completedTests.map((test) => {
              const IconComponent = getTypeIcon(test.type);
              return (
                <Card key={test.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <IconComponent className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{test.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{test.date}</span>
                            <span>•</span>
                            <span>{test.duration} mins</span>
                            <span>•</span>
                            <span>{test.questions} questions</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{test.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">#{test.rank}</div>
                          <div className="text-xs text-gray-500">Rank</div>
                        </div>
                        <Button 
                          onClick={() => viewAnalysis(test.id)}
                          variant="outline"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Analysis
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {selectedTab === 'analysis' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Performance Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Test Results */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Recent Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{result.test}</div>
                        <div className="text-sm text-gray-600">{result.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{result.score}</div>
                            <div className="text-xs text-gray-500">Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">#{result.rank}</div>
                            <div className="text-xs text-gray-500">Rank</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{result.percentile}%</div>
                            <div className="text-xs text-gray-500">%ile</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Strength</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Consistent performance in Biology with 90%+ accuracy
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-yellow-700 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Opportunity</span>
                    </div>
                    <p className="text-sm text-yellow-600">
                      Focus on Physics numerical problems to improve speed
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-700 mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-medium">Trend</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      Your rank has improved by 245 positions in the last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTests;

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
  Zap,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { useMockTests, MockTest, TestAttempt } from "@/hooks/useMockTests";
import MockTestGenerator from "./MockTestGenerator";
import MockTestInterface from "./MockTestInterface";

const MockTests = () => {
  const [selectedTab, setSelectedTab] = useState<'available' | 'completed' | 'analysis' | 'generate'>('available');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showTestInterface, setShowTestInterface] = useState(false);

  const { mockTests, isLoadingTests } = useMockTests();

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

  const startTest = (testId: string) => {
    setSelectedTest(testId);
    setShowTestInterface(true);
  };

  const handleTestComplete = (attempt: TestAttempt) => {
    setShowTestInterface(false);
    setSelectedTest(null);
    toast.success(`Test completed! Score: ${attempt.total_score}`);
    setSelectedTab('completed');
  };

  const handleTestExit = () => {
    setShowTestInterface(false);
    setSelectedTest(null);
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
      case 'full_mock': return Trophy;
      case 'subject_wise': return Target;
      case 'chapter_wise': return FileText;
      default: return FileText;
    }
  };

  // Show test interface if a test is selected
  if (showTestInterface && selectedTest) {
    return (
      <MockTestInterface
        mockTestId={selectedTest}
        onComplete={handleTestComplete}
        onExit={handleTestExit}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mock Tests & Assessments</h2>
            <p className="text-purple-100">Practice with AI-generated NEET-pattern tests</p>
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
          onClick={() => setSelectedTab('generate')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'generate' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate Test
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

          {isLoadingTests ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p>Loading tests...</p>
            </div>
          ) : mockTests.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No Tests Available</h3>
                <p className="text-gray-500 mb-4">Generate your first AI-powered mock test to get started</p>
                <Button 
                  onClick={() => setSelectedTab('generate')}
                  className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Test
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTests.map((test: MockTest) => {
                const IconComponent = getTypeIcon(test.test_type);
                return (
                  <Card key={test.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-purple-600" />
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            <Zap className="w-3 h-3 mr-1" />
                            AI Generated
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{test.test_name}</CardTitle>
                      <CardDescription>
                        {test.test_type === 'full_mock' ? 'Full NEET Mock Test' : 
                         test.test_type === 'subject_wise' ? 'Subject-wise Test' : 'Chapter-wise Test'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>180 mins</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{test.total_questions} questions</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Physics: {test.physics_questions}</span>
                            <span>Chemistry: {test.chemistry_questions}</span>
                            <span>Biology: {test.biology_questions}</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => startTest(test.id)}
                          className="w-full bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Generate Test Tab */}
      {selectedTab === 'generate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Generate New Test</h3>
          </div>
          <MockTestGenerator />
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

          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Completed Tests</h3>
            <p className="text-gray-500">Complete your first test to see results here</p>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {selectedTab === 'analysis' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Performance Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

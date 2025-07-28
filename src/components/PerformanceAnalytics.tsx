
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Users, 
  Trophy, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Award,
  Clock,
  BookOpen,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const overallStats = {
    neetScore: 78,
    rank: 1245,
    percentile: 94.8,
    improvement: 12
  };

  const monthlyPerformance = [
    { month: 'Aug', physics: 65, chemistry: 70, biology: 75 },
    { month: 'Sep', physics: 68, chemistry: 74, biology: 78 },
    { month: 'Oct', physics: 72, chemistry: 76, biology: 80 },
    { month: 'Nov', physics: 75, chemistry: 80, biology: 82 },
    { month: 'Dec', physics: 78, chemistry: 82, biology: 85 },
    { month: 'Jan', physics: 80, chemistry: 84, biology: 87 }
  ];

  const subjectBreakdown = [
    { subject: 'Physics', score: 80, target: 85, color: '#8B5CF6' },
    { subject: 'Chemistry', score: 84, target: 90, color: '#10B981' },
    { subject: 'Biology', score: 87, target: 92, color: '#F59E0B' }
  ];

  const topicAnalysis = [
    { topic: 'Thermodynamics', subject: 'Physics', strength: 92, questions: 45, accuracy: 95 },
    { topic: 'Organic Chemistry', subject: 'Chemistry', strength: 88, questions: 67, accuracy: 91 },
    { topic: 'Cell Biology', subject: 'Biology', strength: 94, questions: 52, accuracy: 96 },
    { topic: 'Optics', subject: 'Physics', strength: 65, questions: 32, accuracy: 78 },
    { topic: 'Coordination Compounds', subject: 'Chemistry', strength: 71, questions: 28, accuracy: 82 },
    { topic: 'Ecology', subject: 'Biology', strength: 89, questions: 41, accuracy: 93 }
  ];

  const radarData = [
    { subject: 'Physics Mechanics', A: 85, fullMark: 100 },
    { subject: 'Physics Modern', A: 72, fullMark: 100 },
    { subject: 'Inorganic Chem', A: 88, fullMark: 100 },
    { subject: 'Organic Chem', A: 91, fullMark: 100 },
    { subject: 'Plant Biology', A: 89, fullMark: 100 },
    { subject: 'Human Biology', A: 94, fullMark: 100 },
  ];

  const weakAreas = [
    { topic: 'Wave Optics', subject: 'Physics', score: 45, trend: 'improving' },
    { topic: 'Coordination Chemistry', subject: 'Chemistry', score: 52, trend: 'stable' },
    { topic: 'Plant Physiology', subject: 'Biology', score: 63, trend: 'declining' }
  ];

  const peerComparison = {
    yourRank: 47,
    totalStudents: 2340,
    regionRank: 12,
    regionTotal: 456,
    improvement: '+23 ranks this month'
  };

  const pieData = [
    { name: 'Correct', value: 78, fill: '#10B981' },
    { name: 'Incorrect', value: 15, fill: '#EF4444' },
    { name: 'Unattempted', value: 7, fill: '#9CA3AF' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Performance Analytics</h2>
            <p className="text-purple-100">Detailed insights into your NEET preparation journey</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{overallStats.percentile}%ile</div>
            <div className="text-purple-100">Overall Percentile</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Target className="w-5 h-5" />
              <span>NEET Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{overallStats.neetScore}%</div>
            <div className="flex items-center text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+{overallStats.improvement}% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Trophy className="w-5 h-5" />
              <span>Predicted Rank</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{overallStats.rank.toLocaleString()}</div>
            <div className="flex items-center text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm">Improved by 245</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Users className="w-5 h-5" />
              <span>Peer Rank</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">#{peerComparison.yourRank}</div>
            <div className="text-sm text-gray-600">out of {peerComparison.totalStudents.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <Star className="w-5 h-5" />
              <span>Percentile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{overallStats.percentile}%</div>
            <div className="text-sm text-orange-600">Top 5% nationwide</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="weak-areas">Weak Areas</TabsTrigger>
          <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>6-Month Performance Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="physics" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="chemistry" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="biology" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">Physics</span>
                    </div>
                    <div className="text-xs text-gray-600">80%</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Chemistry</span>
                    </div>
                    <div className="text-xs text-gray-600">84%</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">Biology</span>
                    </div>
                    <div className="text-xs text-gray-600">87%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Question Accuracy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.fill }}
                        ></div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                      <div className="text-xs text-gray-600">{item.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8B5CF6" />
                    <Bar dataKey="target" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Skill Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Topic-wise Analysis</CardTitle>
              <CardDescription>Your performance across different NEET topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicAnalysis.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-800">{topic.topic}</h4>
                        <Badge variant="outline">{topic.subject}</Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span>{topic.questions} questions attempted</span>
                        <span>{topic.accuracy}% accuracy</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{topic.strength}%</div>
                      <div className="text-xs text-gray-500">Strength</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weak Areas Tab */}
        <TabsContent value="weak-areas" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Areas for Improvement</span>
              </CardTitle>
              <CardDescription>Focus on these topics to boost your overall score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-800">{area.topic}</h4>
                        <Badge variant="outline">{area.subject}</Badge>
                        <Badge className={`text-xs ${
                          area.trend === 'improving' ? 'bg-green-100 text-green-700' :
                          area.trend === 'stable' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {area.trend}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${area.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">{area.score}%</div>
                      <Button size="sm" className="mt-2">Practice</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Peer Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Peer Ranking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-green-100 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">#{peerComparison.yourRank}</div>
                    <div className="text-gray-600">Your Rank</div>
                    <div className="text-sm text-gray-500 mt-1">out of {peerComparison.totalStudents.toLocaleString()} students</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">#{peerComparison.regionRank}</div>
                      <div className="text-sm text-gray-600">Regional Rank</div>
                      <div className="text-xs text-gray-500">Tamil Nadu</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94.8%</div>
                      <div className="text-sm text-gray-600">Percentile</div>
                      <div className="text-xs text-gray-500">National</div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
                    <div className="flex items-center text-green-700">
                      <ArrowUp className="w-4 h-4 mr-2" />
                      <span className="font-medium">{peerComparison.improvement}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Improvement Opportunity</h4>
                    <p className="text-sm text-yellow-700">
                      To reach top 1000 rank, focus on improving Physics by 8% and Chemistry by 6%.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Strength</h4>
                    <p className="text-sm text-green-700">
                      Your Biology score is in the top 3% among all NEET aspirants.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Benchmark</h4>
                    <p className="text-sm text-blue-700">
                      Students with similar scores typically get into top medical colleges.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceAnalytics;

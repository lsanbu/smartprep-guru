
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Star, 
  Trophy, 
  ArrowUp, 
  ArrowDown,
  Play,
  BookOpen,
  Brain,
  Zap,
  Calendar,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StudentDashboard = () => {
  const [neetReadinessScore] = useState(78);
  const [predictedRank] = useState(1245);
  const [currentStreak] = useState(15);

  const subjectProgress = [
    { subject: 'Physics', score: 75, target: 85, improvement: '+8', color: '#8B5CF6' },
    { subject: 'Chemistry', score: 82, target: 90, improvement: '+5', color: '#10B981' },
    { subject: 'Biology', score: 85, target: 92, improvement: '+12', color: '#F59E0B' },
  ];

  const weeklyPerformance = [
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 75 },
    { day: 'Wed', score: 78 },
    { day: 'Thu', score: 76 },
    { day: 'Fri', score: 80 },
    { day: 'Sat', score: 78 },
    { day: 'Sun', score: 82 },
  ];

  const pieData = [
    { name: 'Strengths', value: 65, fill: '#10B981' },
    { name: 'Moderate', value: 25, fill: '#F59E0B' },
    { name: 'Weak Areas', value: 10, fill: '#EF4444' },
  ];

  const recentActivities = [
    { action: 'Completed Mock Test 15', time: '2 hours ago', score: 145, icon: Trophy, color: 'text-yellow-600' },
    { action: 'AI Doubt Cleared - Organic Chemistry', time: '4 hours ago', score: null, icon: Brain, color: 'text-purple-600' },
    { action: 'Study Session - Physics Waves', time: '1 day ago', score: 78, icon: BookOpen, color: 'text-blue-600' },
    { action: 'Achieved 15-day streak!', time: '1 day ago', score: null, icon: Zap, color: 'text-green-600' },
  ];

  const upcomingTasks = [
    { task: 'Mock Test 16', deadline: 'Today, 6:00 PM', priority: 'high' },
    { task: 'Chemistry Practice - Aldehydes', deadline: 'Tomorrow, 2:00 PM', priority: 'medium' },
    { task: 'Physics Revision - Thermodynamics', deadline: 'Jan 30, 4:00 PM', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Good Morning, Arjun! 🌟</h2>
            <p className="text-purple-100 mb-4">You're doing great! Keep up the momentum.</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">{currentStreak} Day Streak</span>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Top 5% in your region
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{neetReadinessScore}%</div>
            <div className="text-purple-100">NEET Ready</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Target className="w-5 h-5" />
              <span>Predicted Rank</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">{predictedRank.toLocaleString()}</div>
            <div className="flex items-center text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Improved by 245 ranks</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Trophy className="w-5 h-5" />
              <span>This Week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">12h 45m</div>
            <div className="flex items-center text-blue-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+2h from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <Users className="w-5 h-5" />
              <span>Peer Ranking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">#47</div>
            <div className="flex items-center text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Out of 2,340 students</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Subject Progress</span>
          </CardTitle>
          <CardDescription>Track your performance across all NEET subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjectProgress.map((subject) => (
              <div key={subject.subject} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-700">{subject.subject}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{subject.score}% / {subject.target}%</span>
                    <div className="flex items-center text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      <span className="text-xs font-medium">{subject.improvement}</span>
                    </div>
                  </div>
                  <Progress 
                    value={subject.score} 
                    className="h-2" 
                    style={{
                      '--progress-foreground': subject.color,
                    } as React.CSSProperties}
                  />
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  Practice
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Weekly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="url(#gradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Strength Analysis */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Strength Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.fill }}
                    ></div>
                    <span className="text-xs font-medium">{item.value}%</span>
                  </div>
                  <div className="text-xs text-gray-600">{item.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                  {activity.score && (
                    <Badge variant="outline" className="text-xs">
                      {activity.score}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100' : 
                    task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    {task.priority === 'high' ? (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{task.task}</div>
                    <div className="text-xs text-gray-500">{task.deadline}</div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;

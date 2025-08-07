
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Activity,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Eye,
  MessageSquare,
  BookOpen,
  Target,
  Zap,
  RefreshCw,
  Download,
  Filter
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface MonitoringDashboardProps {
  className?: string;
}

const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState("realtime");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock real-time data
  const realtimeMetrics = {
    activeUsers: 1247,
    responseTime: 285,
    errorRate: 0.12,
    systemLoad: 67,
    totalQuestions: 15642,
    dailyInteractions: 8934
  };

  // Mock daily reports data
  const dailyUsageData = [
    { hour: '00', users: 45, interactions: 234 },
    { hour: '06', users: 123, interactions: 567 },
    { hour: '12', users: 456, interactions: 1234 },
    { hour: '18', users: 789, interactions: 2134 },
    { hour: '24', users: 234, interactions: 856 }
  ];

  const popularTopics = [
    { topic: 'Organic Chemistry', interactions: 2847, growth: 12.5 },
    { topic: 'Cell Biology', interactions: 2156, growth: 8.3 },
    { topic: 'Mechanics', interactions: 1934, growth: -2.1 },
    { topic: 'Genetics', interactions: 1623, growth: 15.7 },
    { topic: 'Thermodynamics', interactions: 1456, growth: 4.2 }
  ];

  // Mock weekly analysis data
  const weeklyTrends = [
    { week: 'Week 1', users: 4567, satisfaction: 4.2, errors: 23 },
    { week: 'Week 2', users: 4892, satisfaction: 4.3, errors: 18 },
    { week: 'Week 3', users: 5234, satisfaction: 4.1, errors: 31 },
    { week: 'Week 4', users: 5678, satisfaction: 4.4, errors: 15 }
  ];

  // Mock monthly review data
  const featureAdoption = [
    { feature: 'AI Tutor Chat', adoption: 89, trend: 'up' },
    { feature: 'Mock Tests', adoption: 76, trend: 'up' },
    { feature: 'Study Planner', adoption: 62, trend: 'down' },
    { feature: 'Voice Recording', adoption: 34, trend: 'up' },
    { feature: 'Image Upload', adoption: 45, trend: 'stable' }
  ];

  const systemOptimization = [
    { metric: 'Response Time', value: '285ms', target: '< 300ms', status: 'good' },
    { metric: 'Uptime', value: '99.97%', target: '> 99.9%', status: 'excellent' },
    { metric: 'Error Rate', value: '0.12%', target: '< 0.5%', status: 'good' },
    { metric: 'CPU Usage', value: '67%', target: '< 80%', status: 'good' },
    { metric: 'Memory Usage', value: '74%', target: '< 85%', status: 'good' }
  ];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark-gray">Monitoring Dashboard</h2>
          <p className="text-brand-light-gray">Real-time system monitoring and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-brand-light-gray">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Review</TabsTrigger>
        </TabsList>

        {/* Real-time Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-green-600">
                  <Users className="w-5 h-5" />
                  <span>Active Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{realtimeMetrics.activeUsers.toLocaleString()}</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from last hour
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <Clock className="w-5 h-5" />
                  <span>Avg Response Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{realtimeMetrics.responseTime}ms</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -15ms improvement
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Error Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{realtimeMetrics.errorRate}%</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Within normal range
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">{realtimeMetrics.systemLoad}%</span>
                  </div>
                  <Progress value={realtimeMetrics.systemLoad} className="h-2" />
                  <div className="text-xs text-brand-light-gray">
                    Current load is within normal operating parameters
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Total Questions</span>
                    </div>
                    <span className="font-medium">{realtimeMetrics.totalQuestions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Interactions</span>
                    </div>
                    <span className="font-medium">{realtimeMetrics.dailyInteractions.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Daily Reports Tab */}
        <TabsContent value="daily" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Patterns (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dailyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="interactions" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-purple/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-brand-purple" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{topic.topic}</div>
                          <div className="text-xs text-brand-light-gray">{topic.interactions} interactions</div>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${topic.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {topic.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="text-xs font-medium">{Math.abs(topic.growth)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.3</div>
                  <div className="text-sm text-brand-light-gray">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">892</div>
                  <div className="text-sm text-brand-light-gray">Total Feedback</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">23</div>
                  <div className="text-sm text-brand-light-gray">Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95.7%</div>
                  <div className="text-sm text-brand-light-gray">Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Analysis Tab */}
        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8B5CF6" />
                  <Bar dataKey="satisfaction" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Users</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">1,234</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Retention Rate</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">87.3%</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Sessions</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">15,678</span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <Badge className="bg-green-100 text-green-800">99.97%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <Badge className="bg-blue-100 text-blue-800">0.12%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-green-100 text-green-800">285ms</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monthly Review Tab */}
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureAdoption.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                        <span className="text-sm">{feature.feature}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brand-purple h-2 rounded-full" 
                            style={{ width: `${feature.adoption}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{feature.adoption}%</span>
                        {getTrendIcon(feature.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemOptimization.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{item.metric}</div>
                        <div className="text-xs text-brand-light-gray">Target: {item.target}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getStatusColor(item.status)}`}>{item.value}</div>
                        <div className="text-xs text-brand-light-gray capitalize">{item.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-purple">45.2K</div>
                  <div className="text-sm text-brand-light-gray">Total Users</div>
                  <div className="flex items-center justify-center text-green-600 text-xs mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18% MoM
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green">234K</div>
                  <div className="text-sm text-brand-light-gray">Questions Asked</div>
                  <div className="flex items-center justify-center text-green-600 text-xs mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +25% MoM
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.4</div>
                  <div className="text-sm text-brand-light-gray">Avg Satisfaction</div>
                  <div className="flex items-center justify-center text-green-600 text-xs mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.2 MoM
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">99.8%</div>
                  <div className="text-sm text-brand-light-gray">System Uptime</div>
                  <div className="flex items-center justify-center text-green-600 text-xs mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Excellent
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringDashboard;

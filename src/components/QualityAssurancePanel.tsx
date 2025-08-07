
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  Flag,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import UserSatisfactionTracker from './UserSatisfactionTracker';

interface QualityIssue {
  id: string;
  messageId: string;
  type: 'misinformation' | 'inappropriate' | 'spam' | 'bias' | 'other';
  description: string;
  reporter_feedback: string;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  resolved_at?: string;
}

interface QualityAssurancePanelProps {
  className?: string;
}

const QualityAssurancePanel: React.FC<QualityAssurancePanelProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for quality issues
  const [qualityIssues] = useState<QualityIssue[]>([
    {
      id: '1',
      messageId: 'msg-123',
      type: 'misinformation',
      description: 'Incorrect information about photosynthesis process',
      reporter_feedback: 'The response stated that photosynthesis only occurs during daytime, which is partially incorrect.',
      status: 'under_review',
      priority: 'high',
      created_at: '2025-01-07T10:30:00Z'
    },
    {
      id: '2',
      messageId: 'msg-124',
      type: 'inappropriate',
      description: 'Response contained inappropriate language',
      reporter_feedback: 'The AI used casual language that might not be appropriate for academic content.',
      status: 'resolved',
      priority: 'medium',
      created_at: '2025-01-06T15:45:00Z',
      resolved_at: '2025-01-07T09:15:00Z'
    },
    {
      id: '3',
      messageId: 'msg-125',
      type: 'other',
      description: 'Answer was too complex for Class 11 level',
      reporter_feedback: 'The explanation was too advanced and used terminology beyond Class 11 curriculum.',
      status: 'pending',
      priority: 'low',
      created_at: '2025-01-07T08:20:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'misinformation':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'inappropriate':
        return <Flag className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const filteredIssues = qualityIssues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.reporter_feedback.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getOverviewStats = () => {
    const total = qualityIssues.length;
    const pending = qualityIssues.filter(i => i.status === 'pending').length;
    const underReview = qualityIssues.filter(i => i.status === 'under_review').length;
    const resolved = qualityIssues.filter(i => i.status === 'resolved').length;
    const highPriority = qualityIssues.filter(i => i.priority === 'high').length;

    return { total, pending, underReview, resolved, highPriority };
  };

  const stats = getOverviewStats();

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-600">
            <BarChart3 className="w-5 h-5" />
            <span>Quality Assurance Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-blue-700">Total Reports</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.underReview}</div>
                  <div className="text-sm text-orange-700">Under Review</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-sm text-green-700">Resolved</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
                  <div className="text-sm text-red-700">High Priority</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Resolution Rate</div>
                      <div className="text-2xl font-bold">
                        {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 opacity-80" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm opacity-90">Avg Response Time</div>
                      <div className="text-2xl font-bold">4.2h</div>
                    </div>
                    <Clock className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(issue.type)}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{issue.description}</div>
                          <div className="text-sm text-gray-600 mt-1">{issue.reporter_feedback}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(issue.priority)}>
                          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                        </Badge>
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status.replace('_', ' ').charAt(0).toUpperCase() + issue.status.replace('_', ' ').slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Reported: {new Date(issue.created_at).toLocaleDateString()}
                        {issue.resolved_at && (
                          <span className="ml-2">
                            • Resolved: {new Date(issue.resolved_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {issue.status === 'pending' && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredIssues.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <div className="text-lg font-medium mb-2">No issues found</div>
                    <div className="text-sm">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'All reported issues have been resolved or no issues have been reported.'}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="satisfaction" className="space-y-4">
              <UserSatisfactionTracker />
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-700">
                      <TrendingUp className="w-5 h-5" />
                      <span>Positive Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Response accuracy improved</span>
                      <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User satisfaction up</span>
                      <Badge className="bg-green-100 text-green-800">+0.3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fewer reports this week</span>
                      <Badge className="bg-green-100 text-green-800">-40%</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-700">
                      <TrendingDown className="w-5 h-5" />
                      <span>Areas for Improvement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Complex explanations</span>
                      <Badge className="bg-orange-100 text-orange-800">Need Focus</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tamil language responses</span>
                      <Badge className="bg-orange-100 text-orange-800">Improvement</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Image analysis accuracy</span>
                      <Badge className="bg-orange-100 text-orange-800">Monitor</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityAssurancePanel;

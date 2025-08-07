
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Star,
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar
} from "lucide-react";

interface SatisfactionMetrics {
  overall_satisfaction: number;
  response_accuracy: number;
  response_speed: number;
  helpfulness_rating: number;
  total_interactions: number;
  positive_feedback_count: number;
  negative_feedback_count: number;
  reports_count: number;
  last_updated: string;
}

interface UserSatisfactionTrackerProps {
  userId?: string;
  sessionId?: string;
  className?: string;
}

const UserSatisfactionTracker: React.FC<UserSatisfactionTrackerProps> = ({
  userId,
  sessionId,
  className
}) => {
  const [metrics, setMetrics] = useState<SatisfactionMetrics>({
    overall_satisfaction: 4.2,
    response_accuracy: 89,
    response_speed: 95,
    helpfulness_rating: 4.1,
    total_interactions: 156,
    positive_feedback_count: 142,
    negative_feedback_count: 14,
    reports_count: 2,
    last_updated: new Date().toISOString()
  });

  const [isLoading, setIsLoading] = useState(false);

  // Mock function to fetch metrics (replace with actual API call)
  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      // In real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data update
      setMetrics(prev => ({
        ...prev,
        last_updated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to fetch satisfaction metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [userId, sessionId]);

  const getStatusColor = (score: number, isPercentage: boolean = false) => {
    const threshold = isPercentage ? 70 : 3.5;
    if (score >= (isPercentage ? 85 : 4.0)) return 'text-green-600';
    if (score >= threshold) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (score: number, isPercentage: boolean = false) => {
    const threshold = isPercentage ? 70 : 3.5;
    if (score >= (isPercentage ? 85 : 4.0)) {
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    }
    if (score >= threshold) {
      return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600">Satisfaction Metrics</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchMetrics}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Refresh'
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Satisfaction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Overall Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${getStatusColor(metrics.overall_satisfaction)}`}>
                {metrics.overall_satisfaction.toFixed(1)}/5.0
              </span>
              {getStatusBadge(metrics.overall_satisfaction)}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`w-4 h-4 ${
                  metrics.overall_satisfaction >= star 
                    ? 'text-yellow-500 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Response Accuracy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Response Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${getStatusColor(metrics.response_accuracy, true)}`}>
                {metrics.response_accuracy}%
              </span>
              {getStatusBadge(metrics.response_accuracy, true)}
            </div>
          </div>
          <Progress value={metrics.response_accuracy} className="h-2" />
        </div>

        {/* Response Speed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Response Speed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${getStatusColor(metrics.response_speed, true)}`}>
                {metrics.response_speed}%
              </span>
              {getStatusBadge(metrics.response_speed, true)}
            </div>
          </div>
          <Progress value={metrics.response_speed} className="h-2" />
        </div>

        {/* Feedback Summary */}
        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Interactions</span>
                <span className="font-medium">{metrics.total_interactions}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-gray-600">Positive</span>
                </div>
                <span className="font-medium text-green-600">
                  {metrics.positive_feedback_count}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-gray-600">Negative</span>
                </div>
                <span className="font-medium text-red-600">
                  {metrics.negative_feedback_count}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 text-orange-600" />
                  <span className="text-gray-600">Reports</span>
                </div>
                <span className="font-medium text-orange-600">
                  {metrics.reports_count}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Last updated</span>
            </div>
            <span>{formatDate(metrics.last_updated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSatisfactionTracker;

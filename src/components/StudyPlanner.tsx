
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Star,
  TrendingUp,
  Award,
  Zap,
  Brain,
  Users,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  completed: boolean;
  startTime?: string;
  endTime?: string;
  priority: 'high' | 'medium' | 'low';
  type: 'study' | 'practice' | 'revision' | 'test';
}

interface DailyPlan {
  date: string;
  sessions: StudySession[];
  totalDuration: number;
  completedDuration: number;
  target: number;
}

const StudyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [sessionTimer, setSessionTimer] = useState(0);

  const weeklyPlan: DailyPlan[] = [
    {
      date: '2025-01-27',
      sessions: [
        { id: '1', subject: 'Physics', topic: 'Thermodynamics', duration: 90, completed: true, priority: 'high', type: 'study' },
        { id: '2', subject: 'Chemistry', topic: 'Organic Reactions', duration: 60, completed: true, priority: 'medium', type: 'practice' },
        { id: '3', subject: 'Biology', topic: 'Cell Division', duration: 45, completed: false, priority: 'medium', type: 'revision' },
      ],
      totalDuration: 195,
      completedDuration: 150,
      target: 180
    },
    {
      date: '2025-01-28',
      sessions: [
        { id: '4', subject: 'Physics', topic: 'Wave Optics', duration: 75, completed: false, priority: 'high', type: 'study' },
        { id: '5', subject: 'Chemistry', topic: 'Coordination Compounds', duration: 90, completed: false, priority: 'high', type: 'study' },
        { id: '6', subject: 'Biology', topic: 'Ecology', duration: 60, completed: false, priority: 'medium', type: 'practice' },
        { id: '7', subject: 'Mock Test', topic: 'Full Length Test 16', duration: 180, completed: false, priority: 'high', type: 'test' },
      ],
      totalDuration: 405,
      completedDuration: 0,
      target: 240
    }
  ];

  const studyStats = {
    weeklyTarget: 1260, // 3 hours per day * 7 days
    weeklyCompleted: 890,
    dailyAverage: 127,
    currentStreak: 15,
    bestStreak: 23,
    totalStudyTime: 4250
  };

  const subjectAllocation = [
    { subject: 'Physics', planned: 35, completed: 32, color: '#8B5CF6' },
    { subject: 'Chemistry', planned: 35, completed: 38, color: '#10B981' },
    { subject: 'Biology', planned: 30, completed: 30, color: '#F59E0B' }
  ];

  const upcomingTasks = [
    { task: 'Physics - Complete Thermodynamics numericals', deadline: 'Today, 4:00 PM', priority: 'high' },
    { task: 'Chemistry - Revise Organic Name Reactions', deadline: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { task: 'Biology - Practice Genetics diagrams', deadline: 'Tomorrow, 2:00 PM', priority: 'medium' },
    { task: 'Mock Test 16 - Full Length', deadline: 'Tomorrow, 6:00 PM', priority: 'high' }
  ];

  const todaysPlan = weeklyPlan.find(plan => plan.date === selectedDate) || weeklyPlan[1];

  const startSession = (sessionId: string) => {
    setActiveSession(sessionId);
    setSessionTimer(0);
    toast.success("Study session started! Stay focused! 🎯");
  };

  const pauseSession = () => {
    if (activeSession) {
      toast.info("Session paused. Take a quick break!");
      setActiveSession(null);
    }
  };

  const completeSession = (sessionId: string) => {
    toast.success("Great job! Session completed! 🎉");
    setActiveSession(null);
    setSessionTimer(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return BookOpen;
      case 'practice': return Target;
      case 'revision': return RotateCcw;
      case 'test': return Award;
      default: return BookOpen;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Study Planner</h2>
            <p className="text-purple-100">AI-optimized study schedule for maximum efficiency</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{studyStats.currentStreak}</div>
            <div className="text-purple-100">Day Streak 🔥</div>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-purple-600">
              <Target className="w-5 h-5" />
              <span>Weekly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>{formatDuration(studyStats.weeklyCompleted)} / {formatDuration(studyStats.weeklyTarget)}</span>
              </div>
              <Progress value={(studyStats.weeklyCompleted / studyStats.weeklyTarget) * 100} className="h-2" />
              <div className="text-xs text-gray-600">
                {Math.round((studyStats.weeklyCompleted / studyStats.weeklyTarget) * 100)}% of weekly target
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-green-600">
              <Clock className="w-5 h-5" />
              <span>Daily Average</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{formatDuration(studyStats.dailyAverage)}</div>
            <div className="text-sm text-green-600">Above recommended 2h</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <Zap className="w-5 h-5" />
              <span>Current Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{studyStats.currentStreak}</div>
            <div className="text-sm text-orange-600">Best: {studyStats.bestStreak} days</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-blue-600">
              <Award className="w-5 h-5" />
              <span>Total Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-1">{Math.round(studyStats.totalStudyTime / 60)}h</div>
            <div className="text-sm text-blue-600">Lifetime studying</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(selectedDate)}'s Schedule</span>
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Session
              </Button>
            </div>
            <CardDescription>
              Target: {formatDuration(todaysPlan.target)} • Progress: {Math.round((todaysPlan.completedDuration / todaysPlan.target) * 100)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress 
                value={(todaysPlan.completedDuration / todaysPlan.target) * 100} 
                className="h-2 mb-4" 
              />
              
              {todaysPlan.sessions.map((session) => {
                const TypeIcon = getTypeIcon(session.type);
                const isActive = activeSession === session.id;
                
                return (
                  <div key={session.id} className={`p-4 rounded-lg border ${
                    session.completed 
                      ? 'bg-green-50 border-green-200' 
                      : isActive 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          session.completed 
                            ? 'bg-green-100' 
                            : isActive 
                              ? 'bg-blue-100' 
                              : 'bg-gray-100'
                        }`}>
                          <TypeIcon className={`w-4 h-4 ${
                            session.completed 
                              ? 'text-green-600' 
                              : isActive 
                                ? 'text-blue-600' 
                                : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {session.subject} - {session.topic}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{formatDuration(session.duration)}</span>
                            <Badge className={getPriorityColor(session.priority)} size="sm">
                              {session.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {session.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isActive ? (
                          <Button size="sm" variant="outline" onClick={pauseSession}>
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => startSession(session.id)}>
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-800">Session in progress</span>
                          <Button size="sm" onClick={() => completeSession(session.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Subject Allocation & Upcoming Tasks */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Subject Time Allocation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAllocation.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{subject.subject}</span>
                      <span className="text-sm text-gray-600">
                        {subject.completed}% / {subject.planned}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${(subject.completed / subject.planned) * 100}%`,
                          backgroundColor: subject.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Upcoming Tasks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {task.priority === 'high' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{task.task}</div>
                      <div className="text-xs text-gray-500">{task.deadline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-purple-600 to-green-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Study Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">Priority Focus</span>
              </div>
              <p className="text-sm text-purple-100">
                Increase Physics study time by 20% to improve weak areas in Optics and Modern Physics.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="font-medium">Optimal Timing</span>
              </div>
              <p className="text-sm text-purple-100">
                Schedule complex Chemistry topics in morning sessions when your focus is highest.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="font-medium">Peer Insight</span>
              </div>
              <p className="text-sm text-purple-100">
                Top performers spend 30% more time on revision. Consider increasing revision sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanner;

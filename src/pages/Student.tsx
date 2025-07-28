
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  FileText, 
  Award, 
  Clock, 
  MessageCircle, 
  Image, 
  Send, 
  BarChart3, 
  Zap, 
  Star, 
  Trophy, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  Home,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Share
} from "lucide-react";
import { toast } from "sonner";
import StudentDashboard from "@/components/StudentDashboard";
import AITutor from "@/components/AITutor";
import PerformanceAnalytics from "@/components/PerformanceAnalytics";
import MockTests from "@/components/MockTests";
import StudyPlanner from "@/components/StudyPlanner";

const Student = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName] = useState("Arjun Kumar");
  const [currentStreak] = useState(15);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "ai-tutor", label: "AI Tutor", icon: Brain },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "mock-tests", label: "Mock Tests", icon: FileText },
    { id: "study-plan", label: "Study Plan", icon: Calendar },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    toast.success(`Switched to ${tab.replace('-', ' ')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
                  XmPrepNEET Student
                </h1>
                <p className="text-sm text-gray-500">Welcome back, {userName}!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{currentStreak} day streak</span>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-purple-100 min-h-screen p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-purple-100 to-green-100 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Quick Tip</h4>
            <p className="text-sm text-gray-600 mb-3">
              Use the AI tutor to clear doubts instantly with image support!
            </p>
            <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Try Now
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <StudentDashboard />}
          {activeTab === "ai-tutor" && <AITutor />}
          {activeTab === "analytics" && <PerformanceAnalytics />}
          {activeTab === "mock-tests" && <MockTests />}
          {activeTab === "study-plan" && <StudyPlanner />}
        </main>
      </div>
    </div>
  );
};

export default Student;

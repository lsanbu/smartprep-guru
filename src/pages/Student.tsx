
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
import { EnhancedAITutorProvider } from "@/contexts/EnhancedAITutorContext";

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
    <EnhancedAITutorProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 font-poppins">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-brand-purple/20 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-green rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-brand-primary text-brand-dark-gray">
                    XmPrep<sup className="text-sm text-brand-purple">NEET</sup> Student Portal
                  </h1>
                  <p className="text-xs font-brand-tagline text-brand-light-gray">
                    Tasks Digitised. Knowledge Amplified.
                  </p>
                  <p className="text-sm text-brand-light-gray mt-1">Welcome back, {userName}!</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex items-center space-x-2 border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10"
                  onClick={() => window.location.href = '/'}
                >
                  <Home className="w-4 h-4" />
                  <span>Back to XmPrep<sup className="text-xs">NEET</sup></span>
                </Button>
                <div className="hidden md:flex items-center space-x-2 bg-brand-green/20 text-brand-green px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">{currentStreak} day streak</span>
                </div>
                <Button variant="ghost" size="icon" className="relative hover:bg-brand-purple/10">
                  <Bell className="w-5 h-5 text-brand-dark-gray" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-brand-purple/10">
                  <Settings className="w-5 h-5 text-brand-dark-gray" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-brand-purple/20 min-h-screen p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium font-poppins ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-brand-purple to-brand-green text-white shadow-lg'
                      : 'text-brand-dark-gray hover:bg-brand-purple/10 hover:text-brand-purple'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Home Button */}
            <div className="mt-4 md:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center space-x-2 border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10"
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-4 h-4" />
                <span>Back to XmPrep<sup className="text-xs">NEET</sup></span>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-br from-brand-purple/20 to-brand-green/20 rounded-xl">
              <h4 className="font-semibold font-brand-primary text-brand-dark-gray mb-2">Quick Tip</h4>
              <p className="text-sm text-brand-light-gray mb-3 font-poppins">
                Use the AI tutor to clear doubts instantly with image support and syllabus navigation!
              </p>
              <Button size="sm" className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-poppins">
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
    </EnhancedAITutorProvider>
  );
};

export default Student;

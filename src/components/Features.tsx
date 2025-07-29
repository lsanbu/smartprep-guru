import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BookOpen, 
  Target, 
  TrendingUp, 
  MessageCircle, 
  Users, 
  Clock, 
  Award,
  Zap,
  FileText,
  BarChart3,
  Smartphone,
  Gift,
  PlayCircle,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Tutor",
      description: "Get instant answers to your doubts with text, image, and voice input support. Our AI understands NEET concepts deeply.",
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/10"
    },
    {
      icon: BookOpen,
      title: "NCERT RAG Access",
      description: "Query directly from NCERT textbooks with advanced retrieval-augmented generation for accurate, contextual answers.",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10"
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Adaptive study plans based on your strengths, weaknesses, and exam timeline for optimal preparation strategy.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Detailed insights into your progress with subject-wise breakdowns, improvement trends, and readiness scores.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: FileText,
      title: "Mock Tests & Practice",
      description: "Comprehensive mock tests with detailed solutions and performance analysis to simulate real exam conditions.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: MessageCircle,
      title: "Instant Doubt Clearing",
      description: "24/7 AI support for immediate clarification of concepts, formulas, and problem-solving approaches.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Parent Involvement",
      description: "Keep parents informed with progress alerts via Telegram/WhatsApp and detailed performance reports.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: Award,
      title: "College Predictor",
      description: "Advanced college prediction tool based on your performance and historical NEET cutoff data.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Beta Launch Offer */}
        <div className="mb-16">
          <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Gift className="w-8 h-8 text-amber-600" />
                <Badge className="bg-amber-500 text-white px-4 py-2 text-lg">
                  🎉 BETA LAUNCH SPECIAL
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-amber-800">
                Free AI Tutor Access for Early Users!
              </CardTitle>
              <CardDescription className="text-lg text-amber-700 mt-2">
                Be among the first to experience our revolutionary AI tutoring. Just sign up and start learning for FREE!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-medium">Full AI Tutor Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-medium">NCERT Content</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-amber-600" />
                  <span className="text-amber-800 font-medium">Progress Tracking</span>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Link to="/signup">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg shadow-lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up for Free Beta
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/student'}
                  className="border-amber-500 text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Try Student Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
            Powerful Features for NEET Success
          </h2>
          <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
            Everything you need to excel in NEET, powered by cutting-edge AI technology 
            and comprehensive learning analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} mx-auto mb-4 flex items-center justify-center`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className={`text-lg font-bold ${feature.color} font-brand-primary`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center font-poppins leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-brand-purple/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark-gray mb-2 font-brand-primary">Multi-Platform Access</h3>
            <p className="text-gray-600 font-poppins">
              Study anywhere, anytime with seamless cross-device synchronization and offline capability.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-brand-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-6 h-6 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark-gray mb-2 font-brand-primary">Time Management</h3>
            <p className="text-gray-600 font-poppins">
              Smart study scheduling with streak tracking and productivity insights to maximize your preparation time.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-dark-gray mb-2 font-brand-primary">District Benchmarking</h3>
            <p className="text-gray-600 font-poppins">
              Compare your performance with peers in your district and across India for competitive insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

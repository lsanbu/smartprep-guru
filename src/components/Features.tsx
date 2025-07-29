
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Smartphone
} from "lucide-react";

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

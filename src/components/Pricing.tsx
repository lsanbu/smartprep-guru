import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Clock, 
  BookOpen, 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  FileText, 
  MessageCircle, 
  Star,
  Trophy,
  Zap,
  Rocket,
  Crown
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Pricing = () => {
  const handleStudentPortalClick = () => {
    window.location.href = '/student';
  };

  const handleBetaSignup = () => {
    window.location.href = '/signup';
  };

  const pricingTiers = [
    {
      name: "Ignite",
      hours: "30 hours",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: Rocket,
      iconColor: "text-blue-600",
      features: [
        "AI Tutor (text/image/voice input)",
        "NCERT RAG access",
        "Study streak tracker",
        "NEET readiness score",
        "Basic subject-wise performance charts"
      ]
    },
    {
      name: "Accelerate",
      hours: "90 hours",
      color: "text-brand-purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-brand-purple hover:bg-brand-purple/90",
      icon: Zap,
      iconColor: "text-brand-purple",
      popular: true,
      features: [
        "All Ignite features",
        "Upload & query own study materials (PDFs)",
        "Parent Telegram/WhatsApp progress alerts",
        "District-level benchmarking reports",
        "Study planner with progress visual"
      ]
    },
    {
      name: "Achieve",
      hours: "300 hours",
      color: "text-brand-green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonColor: "bg-brand-green hover:bg-brand-green/90",
      icon: Crown,
      iconColor: "text-brand-green",
      features: [
        "All Accelerate features",
        "College Predictor Tool (NEET-based)",
        "Training support & usage analytics",
        "Priority customer support"
      ]
    }
  ];

  const xmPrepHoursFeatures = [
    { icon: Brain, text: "AI chat sessions and doubt clearing" },
    { icon: FileText, text: "Mock tests and practice sessions" },
    { icon: TrendingUp, text: "Analytics and performance tracking" },
    { icon: Target, text: "Study planner interactions" },
    { icon: BookOpen, text: "Interactive learning modules" }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">
            Choose Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Feature-based access with XmPrep hours usage limits. Open to all users and institutions.
          </p>
          <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 text-sm px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            2025 Pricing Model
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={`relative border-2 ${tier.borderColor} ${tier.bgColor} hover:shadow-xl transition-all duration-300`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-brand-purple text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${tier.bgColor} border-2 ${tier.borderColor} flex items-center justify-center`}>
                    <tier.icon className={`w-8 h-8 ${tier.iconColor}`} />
                  </div>
                </div>
                <CardTitle className={`text-2xl font-bold ${tier.color}`}>
                  {tier.name}
                </CardTitle>
                <div className="flex items-center justify-center mt-6">
                  <Clock className={`w-4 h-4 mr-2 ${tier.color}`} />
                  <span className={`font-semibold ${tier.color}`}>{tier.hours}/year</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <Button className={`w-full ${tier.buttonColor} text-white shadow-lg mt-6`}>
                    Choose {tier.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* XmPrep Hours Explanation */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-brand-purple mb-4">
              What Counts as "XmPrep Hours"?
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Total time spent across all interactive features – tracked fairly to optimize learning, not restrict it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {xmPrepHoursFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-brand-purple" />
                </div>
                <span className="text-gray-700 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg border border-brand-green/20">
            <div className="flex items-center space-x-3 mb-3">
              <Trophy className="w-6 h-6 text-brand-green" />
              <h4 className="text-lg font-semibold text-brand-green">Fair Usage Policy</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We track usage to help you optimize your learning time, not to restrict your progress. 
              Time spent on passive activities like reading study materials or viewing analytics dashboards 
              doesn't count toward your XmPrep hours.
            </p>
          </div>
        </div>

        {/* Contact for Institutions */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-purple to-brand-green rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">For Schools & Coaching Institutes</h3>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Special bulk pricing and institutional features available. Contact us for custom solutions.
            </p>
            <Button className="bg-white text-brand-purple hover:bg-gray-50 px-8 py-3 text-lg shadow-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact for Bulk Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

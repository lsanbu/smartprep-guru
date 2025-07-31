
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Calendar,
  Gift,
  Phone,
  Mail
} from "lucide-react";

const AITutorLanding = () => {
  const handleGoogleFormRedirect = () => {
    // Replace with your actual Google Form URL
    window.open('https://forms.google.com/your-form-link', '_blank');
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Instant Answers",
      description: "Get immediate solutions to any NEET doubt with detailed step-by-step explanations",
      screenshot: "🤖 AI analyzing your question and providing detailed chemistry solutions..."
    },
    {
      icon: Target,
      title: "Personalized Practice Questions",
      description: "Generate unlimited practice questions tailored to your learning level",
      screenshot: "📊 Generate Physics MCQs for Class 12, Chapter: Thermodynamics..."
    },
    {
      icon: MessageCircle,
      title: "24/7 Doubt Clearing",
      description: "Upload images, ask questions, get voice responses - anytime, anywhere",
      screenshot: "📸 Upload your handwritten problem → Get instant detailed solution"
    },
    {
      icon: BookOpen,
      title: "NCERT-Based Learning",
      description: "All answers directly linked to NCERT textbooks for authentic preparation",
      screenshot: "📚 Reference: NCERT Biology Class 12, Chapter 8: Human Health and Disease"
    }
  ];

  const benefits = [
    "24/7 AI Tutor Support",
    "Unlimited Practice Questions",
    "Image-Based Problem Solving",
    "Performance Analytics",
    "NCERT-Aligned Content",
    "Multi-Subject Coverage"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple via-brand-green to-brand-purple">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Special Offer Badge */}
            <div className="text-center mb-8">
              <Badge className="bg-yellow-500 text-black px-6 py-3 text-lg font-bold animate-pulse">
                <Gift className="w-5 h-5 mr-2" />
                🎉 FREE MVP Access for Early Users!
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="text-center text-white mb-12">
              <h1 className="text-5xl lg:text-7xl font-bold font-brand-primary leading-tight mb-6">
                Meet{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  XmPrepNEETGuru
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold mb-4">
                Your AI-Powered NEET Preparation Companion
              </p>
              <p className="text-xl text-white/90 max-w-4xl mx-auto font-poppins leading-relaxed">
                Experience the future of NEET preparation with our revolutionary AI tutor. 
                Get instant doubt resolution, personalized practice, and 24/7 support.
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex justify-center space-x-8 mb-12 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">∞</div>
                <div className="text-sm">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">3</div>
                <div className="text-sm">Subjects Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100%</div>
                <div className="text-sm">NCERT Aligned</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🚀 Be Among the First to Experience Our AI Tutor!
                </h3>
                <p className="text-white/90 mb-6">
                  Join our exclusive demo session and get FREE access to XmPrepNEETGuru. 
                  Limited seats available!
                </p>
                
                <Button 
                  onClick={handleGoogleFormRedirect}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-12 py-4 text-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  Register for FREE Demo
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                
                <div className="flex items-center justify-center mt-4 space-x-4 text-white/80 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    No Registration Fee
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    Free AI Access
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    Live Demo Session
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Screenshots */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark-gray mb-4 font-brand-primary">
              Revolutionary AI Tutor Features
            </h2>
            <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
              See what makes XmPrepNEETGuru different from traditional learning platforms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <CardTitle className="text-xl font-bold text-brand-dark-gray font-brand-primary">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg text-brand-light-gray font-poppins">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 ml-4">XmPrepNEETGuru Demo</span>
                    </div>
                    <div className="text-white">
                      {feature.screenshot}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-brand-dark-gray mb-4 font-brand-primary">
              What You Get in the Demo Session
            </h2>
            <p className="text-xl text-brand-light-gray mb-12 font-poppins">
              Join our exclusive Google Meet session and discover the future of NEET preparation
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-brand-green/20 bg-brand-green/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-green font-brand-primary">
                    <Play className="w-6 h-6 mr-3" />
                    Live AI Tutor Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    {benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-brand-green mr-3" />
                        <span className="font-poppins">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-brand-purple/20 bg-brand-purple/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-purple font-brand-primary">
                    <Gift className="w-6 h-6 mr-3" />
                    Free Access Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    {benefits.slice(3).map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-brand-purple mr-3" />
                        <span className="font-poppins">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-brand-purple to-brand-green rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4 font-brand-primary">
                Ready to Transform Your NEET Preparation?
              </h3>
              <p className="text-xl mb-6 font-poppins">
                Limited seats available for our exclusive demo session. Register now!
              </p>
              
              <Button 
                onClick={handleGoogleFormRedirect}
                size="lg"
                className="bg-white text-brand-purple hover:bg-gray-100 font-bold px-12 py-4 text-xl shadow-2xl"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Your Free Demo Seat
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <div className="flex items-center justify-center mt-6 space-x-6 text-white/90">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Interactive Session</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>45-minute Demo</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  <span>Q&A with Experts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-brand-dark-gray text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 font-brand-primary">Questions? We're Here to Help!</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+91 XXXX XXXXXX</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>hello@xmprep.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorLanding;

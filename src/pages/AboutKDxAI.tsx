
import { ArrowLeft, Brain, Users, Target, Zap, Award, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutKDxAI = () => {
  const timeline = [
    {
      date: "Jan 2024",
      title: "Vision Born",
      description: "KDxAI founded with a mission to revolutionize NEET preparation through AI"
    },
    {
      date: "Mar 2024",
      title: "AI Chatbot Development",
      description: "Advanced natural language processing for personalized tutoring"
    },
    {
      date: "Jun 2024",
      title: "Beta Testing",
      description: "Extensive testing with 500+ NEET aspirants across India"
    },
    {
      date: "Aug 2024",
      title: "AI Chatbot MVP Ready",
      description: "Launch of comprehensive AI-powered NEET preparation platform"
    }
  ];

  const achievements = [
    { metric: "95%", label: "Student Satisfaction", icon: <Users className="w-6 h-6" /> },
    { metric: "40%", label: "Score Improvement", icon: <Target className="w-6 h-6" /> },
    { metric: "24/7", label: "AI Availability", icon: <Zap className="w-6 h-6" /> },
    { metric: "50K+", label: "Questions Solved", icon: <Award className="w-6 h-6" /> }
  ];

  const features = [
    "Personalized AI Chatbot for instant doubt resolution",
    "Adaptive learning paths based on student performance",
    "Comprehensive question bank covering all NEET topics",
    "Real-time performance analytics and insights",
    "24/7 availability for continuous learning support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
                KDxAI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">
            About KDxAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of NEET preparation through advanced AI technology. 
            Our AI Chatbot provides personalized, intelligent tutoring that adapts to each student's unique learning journey.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-700">
                <Target className="w-6 h-6" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To democratize quality NEET education by making advanced AI Chatbot technology 
                accessible to every aspiring medical student in India, regardless of their geographic 
                location or economic background.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <Brain className="w-6 h-6" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To become India's leading AI-powered education platform, transforming how students 
                prepare for competitive exams through intelligent, personalized, and effective 
                learning experiences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What Makes KDxAI Special
          </h2>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-green-400"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Card className={`w-80 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} bg-white shadow-lg hover:shadow-xl transition-shadow`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-green-500 text-white">
                          {item.date}
                        </Badge>
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-green-500 rounded-full relative z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3 text-purple-600">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{achievement.metric}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-green-500 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your NEET Preparation?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of students who are already experiencing the power of AI-driven learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ai-tutor-demo">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Try AI Chatbot Demo
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutKDxAI;

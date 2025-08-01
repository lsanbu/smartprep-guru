
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  Award, 
  BookOpen, 
  Lightbulb,
  Globe,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutKDxAI = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We pioneer cutting-edge AI solutions that transform how students learn and achieve their goals.",
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/10"
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make is guided by what's best for student success and learning outcomes.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in AI accuracy, user experience, and educational effectiveness.",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making world-class AI education accessible to every student, regardless of their background.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const products = [
    {
      name: "XmPrep NEET",
      description: "AI-powered NEET preparation platform with personalized tutoring and adaptive learning.",
      status: "Live",
      users: "10,000+",
      features: ["AI Tutor", "Mock Tests", "Performance Analytics", "NCERT Integration"]
    },
    {
      name: "JEE Prep AI",
      description: "Comprehensive JEE Main & Advanced preparation with AI-driven problem solving.",
      status: "Coming Soon",
      users: "Pre-launch",
      features: ["Advanced Math AI", "Physics Simulations", "Chemistry Lab", "Rank Predictor"]
    },
    {
      name: "Board Exam AI",
      description: "Class 10th & 12th board exam preparation across all major boards in India.",
      status: "Development",
      users: "Beta Testing",
      features: ["Multi-board Support", "AI Essays", "Concept Mapping", "Exam Strategy"]
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      expertise: "AI Research, Educational Technology",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Priya Sharma",
      role: "Head of AI",
      expertise: "Machine Learning, NLP, Computer Vision",
      image: "photo-1494790108755-2616b612b4e0"
    },
    {
      name: "Arjun Patel",
      role: "Head of Education",
      expertise: "Curriculum Design, Learning Psychology",
      image: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Sneha Gupta",
      role: "Head of Product",
      expertise: "UX Design, Product Strategy",
      image: "photo-1438761681033-6461ffad8d80"
    }
  ];

  const achievements = [
    { metric: "50,000+", label: "Students Impacted" },
    { metric: "95%", label: "Improvement Rate" },
    { metric: "24/7", label: "AI Support Available" },
    { metric: "15+", label: "AI Models Deployed" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-purple via-brand-green to-brand-purple overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-6xl font-bold font-brand-primary leading-tight mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  KDxAI
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-poppins leading-relaxed mb-8">
                Pioneering the Future of AI-Powered Education
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">{achievement.metric}</div>
                  <div className="text-white/90 font-medium">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  Join Our Mission
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Mission & Vision
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Transforming education through artificial intelligence, making quality learning accessible to every student in India and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Target className="w-8 h-8 text-brand-purple" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-brand-purple font-brand-primary">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 font-poppins leading-relaxed text-lg">
                    To democratize high-quality education through AI-powered personalized learning, ensuring every student has access to world-class tutoring and can achieve their academic dreams regardless of their geographical or economic constraints.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-brand-green" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-brand-green font-brand-primary">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 font-poppins leading-relaxed text-lg">
                    To become the leading AI education platform globally, where artificial intelligence and human expertise combine to create unprecedented learning outcomes and unlock the potential of millions of students worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                The principles that guide every decision we make and every product we build.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${value.bgColor} mx-auto mb-4 flex items-center justify-center`}>
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className={`text-lg font-bold ${value.color} font-brand-primary`}>
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center font-poppins leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products & Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Products & Solutions
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Comprehensive AI-powered educational platforms serving different academic needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="border-0 shadow-xl bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl font-bold text-brand-purple font-brand-primary">
                        {product.name}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'Live' ? 'bg-green-100 text-green-800' :
                        product.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 font-poppins">
                      {product.description}
                    </CardDescription>
                    <div className="text-sm text-brand-green font-semibold mt-2">
                      {product.users} users
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-brand-green" />
                          <span className="text-gray-600 font-poppins text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Experienced leaders combining deep expertise in AI, education, and technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-green rounded-full mx-auto mb-4"></div>
                    <CardTitle className="text-lg font-bold text-brand-dark-gray font-brand-primary">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-brand-purple font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                      {member.expertise}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple to-brand-green">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold font-brand-primary mb-6">
              Join the AI Education Revolution
            </h2>
            <p className="text-xl text-white/90 font-poppins mb-8 leading-relaxed">
              Be part of the future of learning. Experience how AI can transform your educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <Users className="mr-2 w-5 h-5" />
                  Start Learning Today
                </Button>
              </Link>
              <Link to="/student">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Brain className="mr-2 w-5 h-5" />
                  Try Our AI Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutKDxAI;

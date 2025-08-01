
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
  CheckCircle,
  Cpu,
  Database,
  Bot,
  GraduationCap,
  Building2,
  BarChart3,
  Briefcase,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutKDxAI = () => {
  const verticals = [
    {
      icon: Bot,
      title: "KDˣAI Automate",
      description: "Intelligent automation solutions that streamline business processes and enhance operational efficiency across industries.",
      features: ["Process Automation", "Workflow Optimization", "Smart Document Processing", "Business Intelligence"],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Brain,
      title: "KDˣAI Intelligence",
      description: "Advanced AI-powered analytics and decision-making systems that transform data into actionable insights.",
      features: ["Predictive Analytics", "Machine Learning Models", "Data Intelligence", "Smart Recommendations"],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const productLines = [
    {
      category: "Education Technology",
      icon: GraduationCap,
      products: [
        {
          name: "XmPrepᴺᴱᴱᵀ",
          description: "Our flagship AI-powered NEET preparation platform with personalized tutoring and adaptive learning.",
          status: "Pioneer Product",
          highlight: true,
          features: ["AI Tutor", "Mock Tests", "Performance Analytics", "NCERT Integration"]
        },
        {
          name: "JEE Prep AI",
          description: "Comprehensive JEE Main & Advanced preparation with AI-driven problem solving.",
          status: "Coming Soon",
          features: ["Advanced Math AI", "Physics Simulations", "Chemistry Lab", "Rank Predictor"]
        },
        {
          name: "Board Exam AI",
          description: "Class 10th & 12th board exam preparation across all major boards in India.",
          status: "In Development",
          features: ["Multi-board Support", "AI Essays", "Concept Mapping", "Exam Strategy"]
        }
      ]
    },
    {
      category: "Enterprise Solutions",
      icon: Building2,
      products: [
        {
          name: "KDˣAI Business Intelligence",
          description: "Advanced analytics platform for enterprise decision-making and performance optimization.",
          status: "Enterprise Ready",
          features: ["Real-time Analytics", "Custom Dashboards", "Predictive Modeling", "ROI Tracking"]
        },
        {
          name: "KDˣAI Process Automation",
          description: "Intelligent automation suite for streamlining business operations and workflows.",
          status: "Beta Testing",
          features: ["Workflow Designer", "Document AI", "Integration Hub", "Performance Monitoring"]
        }
      ]
    },
    {
      category: "Healthcare & Research",
      icon: Shield,
      products: [
        {
          name: "KDˣAI MedTech",
          description: "AI-powered healthcare solutions for medical professionals and researchers.",
          status: "Research Phase",
          features: ["Diagnostic AI", "Treatment Planning", "Research Analytics", "Clinical Decision Support"]
        }
      ]
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We pioneer cutting-edge AI solutions that transform how industries operate and students learn.",
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/10"
    },
    {
      icon: Heart,
      title: "Human-Centric",
      description: "Every solution we create is designed to augment human capabilities and improve lives.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in AI accuracy, user experience, and solution effectiveness.",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making world-class AI solutions accessible to everyone, regardless of their background or location.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      expertise: "AI Research, Educational Technology, Enterprise Solutions",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Priya Sharma",
      role: "Head of AI Research",
      expertise: "Machine Learning, NLP, Computer Vision, Deep Learning",
      image: "photo-1494790108755-2616b612b4e0"
    },
    {
      name: "Arjun Patel",
      role: "Head of Education",
      expertise: "Curriculum Design, Learning Psychology, EdTech Innovation",
      image: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Sneha Gupta",
      role: "Head of Product",
      expertise: "UX Design, Product Strategy, User Research",
      image: "photo-1438761681033-6461ffad8d80"
    },
    {
      name: "Vikram Singh",
      role: "Head of Enterprise Solutions",
      expertise: "Business Intelligence, Process Automation, Enterprise Architecture",
      image: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Dr. Anjali Rao",
      role: "Head of Research",
      expertise: "AI Ethics, Healthcare AI, Research Methodology",
      image: "photo-1438761681033-6461ffad8d80"
    }
  ];

  const achievements = [
    { metric: "100,000+", label: "Lives Impacted" },
    { metric: "95%", label: "Success Rate" },
    { metric: "24/7", label: "AI Support Available" },
    { metric: "25+", label: "AI Models Deployed" },
    { metric: "3", label: "Industry Verticals" },
    { metric: "15+", label: "Enterprise Clients" }
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
                  KD<sup className="text-2xl lg:text-3xl">x</sup>AI
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-poppins leading-relaxed mb-4">
                Pioneering the Future of AI-Powered Solutions
              </p>
              <p className="text-lg text-white/80 font-poppins leading-relaxed mb-8">
                From Education to Enterprise - Transforming Industries with Intelligent Automation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-2">{achievement.metric}</div>
                  <div className="text-white/90 font-medium text-sm">{achievement.label}</div>
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
                Transforming industries through artificial intelligence, making cutting-edge AI solutions accessible across education, enterprise, and healthcare sectors.
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
                    To democratize artificial intelligence across industries, creating solutions that enhance human capabilities, streamline operations, and unlock unprecedented potential in education, business, and healthcare sectors worldwide.
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
                    To become the global leader in AI-powered solutions, where artificial intelligence and human expertise converge to create transformative outcomes across all sectors of society, fostering innovation and progress worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* KDxAI Verticals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                KD<sup className="text-2xl">x</sup>AI Verticals
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Two powerful verticals driving innovation across industries with specialized AI solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {verticals.map((vertical, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  <CardHeader className="text-center pb-6">
                    <div className={`w-20 h-20 rounded-full ${vertical.bgColor} mx-auto mb-6 flex items-center justify-center`}>
                      <vertical.icon className={`w-10 h-10 ${vertical.color}`} />
                    </div>
                    <CardTitle className={`text-2xl font-bold ${vertical.color} font-brand-primary mb-4`}>
                      {vertical.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-poppins text-lg leading-relaxed">
                      {vertical.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {vertical.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className={`w-4 h-4 ${vertical.color}`} />
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

      {/* Product Lines */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Product Portfolio
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Comprehensive AI solutions across multiple industries, with XmPrep<sup>NEET</sup> leading the way in educational technology.
              </p>
            </div>

            {productLines.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <div className="flex items-center justify-center mb-8">
                  <category.icon className="w-8 h-8 text-brand-purple mr-3" />
                  <h3 className="text-2xl font-bold text-brand-purple font-brand-primary">{category.category}</h3>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-6">
                  {category.products.map((product, productIndex) => (
                    <Card key={productIndex} className={`border-0 shadow-xl bg-white ${product.highlight ? 'ring-4 ring-brand-purple/20 shadow-2xl' : ''}`}>
                      {product.highlight && (
                        <div className="bg-gradient-to-r from-brand-purple to-brand-green text-white text-center py-2 text-sm font-semibold">
                          🏆 Pioneer Product
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className={`text-xl font-bold font-brand-primary ${product.highlight ? 'text-brand-purple' : 'text-gray-800'}`}>
                            {product.name}
                          </CardTitle>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'Pioneer Product' ? 'bg-purple-100 text-purple-800' :
                            product.status === 'Enterprise Ready' ? 'bg-green-100 text-green-800' :
                            product.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                            product.status === 'Beta Testing' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        <CardDescription className="text-gray-600 font-poppins leading-relaxed">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className={`w-4 h-4 ${product.highlight ? 'text-brand-purple' : 'text-brand-green'}`} />
                              <span className="text-gray-600 font-poppins text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {product.highlight && (
                          <div className="mt-4 pt-4 border-t">
                            <Link to="/student">
                              <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                                Experience XmPrep<sup>NEET</sup>
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
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
                The principles that guide every decision we make and every solution we build.
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

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Visionary leaders combining deep expertise in AI, education, enterprise solutions, and technology innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Join the AI Revolution
            </h2>
            <p className="text-xl text-white/90 font-poppins mb-4 leading-relaxed">
              Experience the future of AI-powered solutions across education and enterprise.
            </p>
            <p className="text-lg text-white/80 font-poppins mb-8 leading-relaxed">
              Start with XmPrep<sup>NEET</sup> - our pioneering educational AI platform transforming NEET preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  Try XmPrep<sup>NEET</sup>
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Join Our Platform
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

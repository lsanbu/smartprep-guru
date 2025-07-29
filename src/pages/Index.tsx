import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Shield,
  Database,
  Bell,
  Building,
  School,
  GraduationCap,
  Award,
  Clock,
  Globe,
  MessageCircle,
  Zap,
  Star,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Play,
  Sparkles,
  Lightbulb,
  Cpu,
  Workflow,
  MapPin,
  Heart,
  Code,
  Briefcase,
  Scale,
  FileSearch,
  Bot,
  Cog,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import Contact from '../components/Contact';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAboutDropdown = () => setIsAboutDropdownOpen(!isAboutDropdownOpen);

  const handleDropdownLinkClick = (href: string) => {
    setIsAboutDropdownOpen(false);
    // Small delay to ensure dropdown closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personal NEET tutor available 24/7 with instant doubt clearing",
      color: "text-brand-purple"
    },
    {
      icon: Target,
      title: "NEET Readiness Score",
      description: "Real-time rank prediction based on your performance",
      color: "text-brand-green"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into your strengths and weak areas",
      color: "text-brand-purple"
    },
    {
      icon: Users,
      title: "Peer Benchmarking",
      description: "Compare your progress with students across Tamil Nadu",
      color: "text-brand-green"
    },
    {
      icon: FileText,
      title: "Mock Tests",
      description: "NEET-pattern tests with instant feedback and solutions",
      color: "text-brand-purple"
    },
    {
      icon: Sparkles,
      title: "Gamified Learning",
      description: "Earn points, badges, and compete with friends",
      color: "text-brand-green"
    }
  ];

  const kdxIntelligenceProducts = [
    { name: "XmPrepNEET", desc: "AI tutor for NEET with RAG, multilingual support" },
    { name: "XmPrepCBSE", desc: "AI revision companion for Class 9-12" },
    { name: "XmPrepUPSC", desc: "AI-powered civil services mentor" },
    { name: "KDxITGym", desc: "Technical upskilling for students & freshers" },
    { name: "KDxLaw", desc: "RAG-powered legal intelligence platform" },
    { name: "KDxDocs", desc: "AI search for company SOPs & documentation" }
  ];

  const kdxAutomateProducts = [
    { name: "KDxRobotize", desc: "No-code task agents for workflows" },
    { name: "KDxWorkflow", desc: "Cross-platform automation solutions" },
    { name: "KDxOps", desc: "Operations dashboard with AI insights" },
    { name: "KDxHR", desc: "AI-first HR workflow automation" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-green rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-purple">
                  XmPrepNEET
                </h1>
                <p className="text-xs text-gray-500">Powered by KDx<sup>AI</sup></p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-brand-purple font-medium transition-colors">Features</a>
              
              {/* About Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleAboutDropdown}
                  className="flex items-center text-gray-700 hover:text-brand-purple font-medium transition-colors"
                >
                  About <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isAboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button 
                      onClick={() => handleDropdownLinkClick('#about-xmprepneet')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-brand-purple hover:bg-gray-50 transition-colors"
                    >
                      About XmPrepNEET
                    </button>
                    <button 
                      onClick={() => handleDropdownLinkClick('#about-kdxai')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-brand-purple hover:bg-gray-50 transition-colors"
                    >
                      About KDx<sup>AI</sup>
                    </button>
                  </div>
                )}
              </div>
              
              <a href="#pricing" className="text-gray-700 hover:text-brand-purple font-medium transition-colors">Pricing</a>
              <Button asChild className="bg-brand-purple hover:bg-brand-purple/90 text-white shadow-lg">
                <Link to="/student">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Student Portal
                </Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <nav className="space-y-3">
                <a href="#features" className="block px-4 py-2 text-gray-700 hover:text-brand-purple font-medium transition-colors">Features</a>
                <a href="#about-xmprepneet" className="block px-4 py-2 text-gray-700 hover:text-brand-purple font-medium transition-colors">About XmPrepNEET</a>
                <a href="#about-kdxai" className="block px-4 py-2 text-gray-700 hover:text-brand-purple font-medium transition-colors">About KDx<sup>AI</sup></a>
                <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:text-brand-purple font-medium transition-colors">Pricing</a>
                <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                  <Link to="/student" onClick={() => setIsMenuOpen(false)}>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Student Portal
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gray-100 text-brand-purple border-gray-200 text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2 text-brand-green" />
              AI-Powered NEET Preparation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-brand-purple">
                Crack NEET
              </span>
              <br />
              <span className="text-brand-green">with AI Tutoring</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your personal AI tutor, real-time rank prediction, and comprehensive analytics. 
              Join thousands of students already using XmPrepNEET to achieve their medical dreams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-4 text-lg shadow-xl">
                <Link to="/student" className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-brand-purple text-brand-purple hover:bg-gray-50 px-8 py-4 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Try AI Tutor Free
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple mb-1">50K+</div>
                <div className="text-sm text-gray-500">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green mb-1">95%</div>
                <div className="text-sm text-gray-500">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-purple mb-1">24/7</div>
                <div className="text-sm text-gray-500">AI Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-green mb-1">1M+</div>
                <div className="text-sm text-gray-500">Questions Solved</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration - subtle */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-100 rounded-full opacity-30"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-purple mb-4">
              Why Students Love XmPrepNEET
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced features designed specifically for NEET aspirants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-gray-800 group-hover:text-brand-purple transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-brand-purple font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About XmPrepNEET Section */}
      <section id="about-xmprepneet" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-purple mb-4">
              About XmPrepNEET
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your intelligent companion for NEET preparation, powered by advanced AI technology
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-brand-purple mb-4">What is XmPrepNEET?</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    XmPrepNEET is an AI-powered learning platform specifically designed for NEET aspirants. 
                    It combines cutting-edge artificial intelligence with comprehensive NEET preparation 
                    resources to provide personalized tutoring, real-time performance tracking, and 
                    intelligent study planning.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our platform offers 24/7 AI tutoring, instant doubt resolution, mock tests with 
                    detailed analytics, and peer benchmarking to help students achieve their medical dreams.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-brand-purple to-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-sm text-gray-500">Empowering NEET Aspirants</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
                <Brain className="w-12 h-12 text-brand-purple mx-auto mb-4" />
                <h4 className="font-semibold text-brand-purple mb-2">AI-Powered Learning</h4>
                <p className="text-sm text-gray-600">Personalized tutoring with intelligent content delivery</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
                <Target className="w-12 h-12 text-brand-green mx-auto mb-4" />
                <h4 className="font-semibold text-brand-green mb-2">NEET-Focused</h4>
                <p className="text-sm text-gray-600">Curriculum aligned with NEET exam patterns</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
                <BarChart3 className="w-12 h-12 text-brand-purple mx-auto mb-4" />
                <h4 className="font-semibold text-brand-purple mb-2">Performance Analytics</h4>
                <p className="text-sm text-gray-600">Real-time insights and rank predictions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About KDxAI Section */}
      <section id="about-kdxai" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-12 h-12 text-brand-purple mr-4" />
              <h2 className="text-4xl font-bold text-brand-purple">
                About KDx<sup className="text-brand-green">AI</sup>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              KDx<sup>AI</sup> (Kaaryaa Digitalx AI) is a visionary product studio dedicated to building intelligent, 
              retrieval-augmented, and automation-first solutions for the real world.
            </p>
            <div className="bg-white border-l-4 border-brand-purple p-6 rounded-r-lg max-w-2xl mx-auto shadow-sm">
              <p className="text-lg font-semibold text-brand-purple italic">
                "Tasks Digitised. Knowledge Amplified."
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* KDxIntelligence */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader className="bg-brand-purple text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">KDx<sup>Intelligence</sup></CardTitle>
                    <CardDescription className="text-gray-200">
                      Smarter Decisions from Your Data
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  A suite of RAG-powered, AI-guided learning and knowledge agents that revolutionize 
                  how students, professionals, and teams access and interact with information.
                </p>
                <div className="space-y-3">
                  {kdxIntelligenceProducts.map((product, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-brand-purple">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* KDxAutomate */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader className="bg-brand-green text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <Workflow className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">KDx<sup>Automate</sup></CardTitle>
                    <CardDescription className="text-gray-200">
                      Do More by Doing Less
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Task-level AI agents and cross-platform automation solutions that help individuals 
                  and teams eliminate repetitive effort and optimize operations.
                </p>
                <div className="space-y-3">
                  {kdxAutomateProducts.map((product, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-brand-green">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Differentiation */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-brand-purple mb-6 text-center">
              Our Differentiation
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-brand-purple mb-2">RAG Architecture</h4>
                <p className="text-sm text-gray-600">Reliable, contextual, source-backed intelligence</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-green to-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-brand-green mb-2">Multilingual Support</h4>
                <p className="text-sm text-gray-600">Tamil + English for real inclusion</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-brand-purple mb-2">Freemium Access</h4>
                <p className="text-sm text-gray-600">Built for Tier 2/3 learners and underserved users</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-green to-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-brand-green mb-2">Build in Public</h4>
                <p className="text-sm text-gray-600">Transparent, purpose-driven, community-centric</p>
              </div>
            </div>
          </div>

          {/* Location & Mission */}
          <div className="text-center bg-gradient-to-r from-brand-purple to-brand-green text-white rounded-2xl p-8 shadow-lg">
            <MapPin className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Based in Chennai. Built for the world.</h3>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Whether it's preparing a NEET student in Madurai, assisting a lawyer in Delhi, or automating HR for a startup in Mumbai — 
              <strong className="text-white"> KDx<sup>AI</sup> is quietly powering the future of intelligence and automation in India.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-purple to-brand-green">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of successful NEET aspirants who chose XmPrepNEET as their study partner
            </p>
            <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-50 px-8 py-4 text-lg shadow-xl">
              <Link to="/student" className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Enter Student Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-green rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">XmPrepNEET</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                AI-powered NEET preparation platform for the next generation of medical professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/student" className="text-gray-400 hover:text-white transition-colors">Student Interface</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#about-xmprepneet" className="text-gray-400 hover:text-white transition-colors">About XmPrepNEET</a></li>
                <li><a href="#about-kdxai" className="text-gray-400 hover:text-white transition-colors">About KDx<sup>AI</sup></a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 KDx<sup>AI</sup>. All rights reserved. | Empowering NEET preparation across India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

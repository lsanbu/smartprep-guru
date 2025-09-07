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
  Shield,
  FileSearch,
  Workflow,
  UserCheck,
  Stethoscope,
  Scale,
  ShoppingCart,
  Landmark,
  DollarSign,
  Rocket,
  Lightbulb as Innovation
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutKDxAI = () => {
  const currentProducts = [
    {
      name: "KDx<sup>ITGym</sup>",
      description: "AI Career Guidance Platform - Complete career coaching system with resume analysis, roadmaps, and intelligent guidance",
      status: "MVP Ready",
      highlight: true,
      icon: Briefcase,
      features: ["AI Career Coach", "Resume Advisor", "Learning Roadmaps", "Company Insights", "Interview Prep"],
      url: "itgym.in"
    },
    {
      name: "KDx<sup>Verse</sup>",
      description: "Go-to platform for individuals and teams to collect, organize, share, and discover valuable web content through intuitive playlists and smart categorization",
      status: "MVP Ready",
      highlight: true,
      icon: Globe,
      features: ["Universal Link Capture", "Smart Auto-Categorization", "Playlists & Collections", "Rich Sharing & Collaboration", "Advanced Search & Discovery", "Social & Viral Network Effects"],
      url: "https://preview--kdxverse.lovable.app/"
    },
    {
      name: "KDx<sup>Claims</sup>",
      description: "Comprehensive digital solution for expense claims management, designed to streamline the process from receipt capture to employer submission through OCR technology, automated data extraction, and intelligent reporting",
      status: "MVP Ready",
      highlight: true,
      icon: FileSearch,
      features: ["Intelligent OCR Extraction", "Multi-Type Claims Support", "Period-Based Reporting", "PDF/CSV Export", "Corporate Integration", "Mobile Responsive"],
      url: "https://preview--kdxclaims.lovable.app/"
    },
    {
      name: "KDx<sup>Kelviya</sup>",
      description: "Senior-Friendly AI Conversational Assistant with Proactive Intelligence - A comprehensive AI conversational assistant specifically designed for senior citizens (40+) that combines reactive chat capabilities with proactive intelligence and personalized daily content. Features Tamil cultural integration, multi-LLM support, life event extraction, and sophisticated contextual intelligence engine.",
      status: "MVP Ready",
      highlight: true,
      icon: Stethoscope,
      features: ["Proactive Intelligence", "Personalized Content Hub", "Tamil Cultural Integration", "Multi-LLM Support", "Life Event Extraction", "Contextual Intelligence Engine"],
      url: "https://preview--kelvi-saha-companion.lovable.app/"
    },
    {
      name: "XmPrep<sup>NEET</sup>",
      description: "AI Tutor MVP - Our first functional RAG-powered tutoring system for NEET preparation",
      status: "MVP Ready",
      highlight: true,
      icon: GraduationCap,
      features: ["RAG-powered AI Tutor", "Doubt solving", "Interactive chat", "Beta testing phase"],
      url: "xmprep.in"
    }
  ];

  const plannedIntelligenceProducts = [
    {
      name: "KDx<sup>Vantage</sup>",
      description: "A MicroSaaS product designed to simplify the development and deployment of Generative AI applications. Provides a unified interface for testing, routing, and monitoring LLM API calls across multiple providers.",
      status: "Brainstorming",
      highlight: false,
      icon: Zap,
      features: [
        "Unified API for multiple LLM providers",
        "Model Playground for comparison",
        "Production Observability & Analytics",
        "Hard Spending Limits & Cost Control",
        "Centralized Key Management",
        "Eliminates vendor lock-in"
      ],
      details: {
        problem: "GenAI developers face complexity and risk due to fragmented tooling, evaluation paralysis, financial risk from unexpected costs, and lack of observability.",
        solution: "A single platform that abstracts away complexity through unified API, centralized key management, model playground for side-by-side comparison, production observability with analytics, and hard spending limits."
      }
    },
    {
      name: "XmPrep<sup>CBSE</sup>",
      description: "AI-first revision companion for Class 9–12 students across all CBSE subjects",
      status: "Future Vision",
      highlight: false,
      icon: BookOpen,
      features: ["Multi-subject coverage", "NCERT integration", "Personalized learning", "Exam preparation"]
    },
    {
      name: "XmPrep<sup>CUET</sup>",
      description: "AI-powered CUET preparation assistant based on NCERT/CBSE syllabus for central university admissions",
      status: "Future Vision",
      highlight: false,
      icon: Building2,
      features: ["NCERT/CBSE aligned", "Domain-wise prep", "Mock tests", "University guidance"]
    },
  ];

  const plannedAutomateProducts = [
    {
      name: "KDx<sup>Robotize</sup>",
      description: "No-code AI task agents for repetitive actions like email replies, file movement, and data processing",
      status: "Brainstorming",
      highlight: false,
      icon: Bot,
      features: ["No-code interface", "Email automation", "File management", "Data processing"]
    },
    {
      name: "KDx<sup>Workflow</sup>",
      description: "Cross-platform process automation connecting CRM, Sheets, WhatsApp, and more",
      status: "Brainstorming",
      highlight: false,
      icon: Workflow,
      features: ["Multi-platform sync", "API integrations", "Custom workflows", "Real-time triggers"]
    },
    {
      name: "KDx<sup>Ops</sup>",
      description: "Operations automation dashboard with reports, checklists, and intelligent alerts",
      status: "Brainstorming",
      highlight: false,
      icon: BarChart3,
      features: ["Real-time dashboards", "Automated reports", "Alert systems", "Performance metrics"]
    },
  ];

  const verticals = [
    {
      icon: Brain,
      title: "KDx<sup>Intelligence</sup>",
      subtitle: "Smarter Decisions from Your Data",
      description: "A suite of RAG-powered, AI-guided learning and knowledge agents. Starting with our XmPrepNEET AI Tutor MVP and expanding with KDxITGym career platform, we're revolutionizing how people access and interact with specialized knowledge across education and professional domains.",
      features: ["RAG Architecture", "Contextual Intelligence", "Source-backed Responses"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      currentProducts: currentProducts,
      plannedProducts: plannedIntelligenceProducts
    },
    {
      icon: Zap,
      title: "KDx<sup>Automate</sup>",
      subtitle: "Do More by Doing Less",
      description: "Future vision for task-level AI agents and cross-platform automation. These are brainstorming ideas to help individuals and teams eliminate repetitive effort and optimize operations.",
      features: ["No-code Automation", "Cross-platform Integration", "Intelligent Agents", "Process Optimization"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      currentProducts: [],
      plannedProducts: plannedAutomateProducts
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "RAG Architecture",
      description: "Every solution built with retrieval-augmented generation for reliable, contextual, source-backed intelligence.",
      color: "text-brand-purple",
      bgColor: "bg-brand-purple/10"
    },
    {
      icon: Globe,
      title: "Transparent Development",
      description: "Building in public with honest communication about our current capabilities and future aspirations.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Target,
      title: "MVP-First Approach",
      description: "Founder-led, focused development starting with working products before expanding to other ideas.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const achievements = [
    { metric: "Products", label: "Ready" },
    { metric: "RAG", label: "Architecture Proven" },
    { metric: "Active", label: "User Base" },
    { metric: "10+", label: "Future Ideas" },
    { metric: "2025", label: "Growth Plan" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-purple via-brand-green to-brand-purple overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="mb-8">
                <h1 className="text-5xl lg:text-7xl font-bold font-brand-primary leading-tight mb-6">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    KDx<sup className="text-2xl lg:text-4xl align-super text-yellow-300">AI</sup> Dynamics
                  </span>
                </h1>
              <p className="text-2xl lg:text-3xl text-white/95 font-poppins leading-relaxed mb-4 font-semibold">
                Automation. Intelligence. Amplified.
              </p>
              <p className="text-lg lg:text-xl text-white/85 font-poppins leading-relaxed mb-8 max-w-4xl mx-auto">
                KDx<sup>AI</sup> Dynamics (Kaaryaa Digital Transformation powered by AI) is building intelligent, retrieval-augmented solutions. <strong>Our products showcase our expertise in RAG technology, building intelligent chat assistants, and developing AI/LLM-based applications: XmPrep<sup>NEET</sup> AI Tutor, KDx<sup>ITGym</sup> Career Platform, KDx<sup>Verse</sup>, KDx<sup>Claims</sup>, and KDx<sup>Kelviya</sup></strong> - proving our capabilities before expanding into a broader ecosystem of educational and automation solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-2">{achievement.metric}</div>
                  <div className="text-white/90 font-medium text-sm">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-tutor-demo">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  Try NEET Tutor
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="https://itgym.lovable.app/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Briefcase className="mr-2 w-5 h-5" />
                  Try ITGym Career
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl lg:text-3xl font-light text-brand-dark-gray leading-relaxed font-poppins mb-8 italic">
              "We're building <span className="font-semibold text-brand-purple">working AI solutions</span> to prove our RAG technology, then <span className="font-semibold text-brand-green">expanding thoughtfully</span> into a suite of intelligent solutions that truly serve users' needs."
            </blockquote>
            <p className="text-lg text-brand-light-gray font-poppins">
              <strong>Based in Chennai. Products Ready. From working MVPs to future automation ideas - let's build intelligent solutions together, one step at a time.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Current Success & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Journey: Proven MVPs, Expanding Vision
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Starting with our products ready for market - XmPrep<sup>NEET</sup> AI Tutor, KDx<sup>ITGym</sup> Career Platform, KDx<sup>Verse</sup>, KDx<sup>Claims</sup>, and KDx<sup>Kelviya</sup> - we're building toward powerful verticals of AI innovation based on proven RAG experience.
              </p>
            </div>

            {verticals.map((vertical, index) => (
              <div key={index} className="mb-20">
                <div className="text-center mb-12">
                  <div className={`w-20 h-20 rounded-full ${vertical.bgColor} mx-auto mb-6 flex items-center justify-center`}>
                    <vertical.icon className={`w-10 h-10 ${vertical.color}`} />
                  </div>
                  <h3 className={`text-3xl font-bold ${vertical.color} font-brand-primary mb-2`} dangerouslySetInnerHTML={{ __html: vertical.title }}>
                  </h3>
                  <h4 className="text-xl font-semibold text-gray-600 mb-4">{vertical.subtitle}</h4>
                  <p className="text-lg text-gray-600 font-poppins leading-relaxed max-w-4xl mx-auto mb-8">
                    {vertical.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                    {vertical.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className={`${vertical.bgColor} rounded-lg p-4 border border-gray-200`}>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className={`w-4 h-4 ${vertical.color}`} />
                          <span className={`${vertical.color} font-semibold text-sm`}>{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Products */}
                {vertical.currentProducts.length > 0 && (
                  <div className="mb-12">
                    <h4 className="text-2xl font-bold text-green-600 mb-6 text-center flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      MVP Ready
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {vertical.currentProducts.map((product, productIndex) => (
                        <Card key={productIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ring-4 ring-green-200">
                          <div className="bg-gradient-to-r from-green-500 to-brand-green text-white text-center py-2 text-sm font-semibold">
                            🚀 MVP Ready
                          </div>
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <product.icon className="w-8 h-8 text-green-600" />
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                {product.status}
                              </span>
                            </div>
                            <CardTitle className="text-lg font-bold font-brand-primary mb-2 text-green-600" dangerouslySetInnerHTML={{ __html: product.name }}>
                            </CardTitle>
                            <CardDescription className="text-gray-600 font-poppins text-sm leading-relaxed">
                              {product.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2 mb-4">
                              {product.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                  <span className="text-gray-600 font-poppins text-xs">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-4 border-t">
                              {product.name.includes('XmPrep') ? (
                                <Link to="/ai-tutor-demo">
                                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Try MVP
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </Button>
                                </Link>
                              ) : product.name.includes('ITGym') ? (
                                <a href="https://itgym.lovable.app/" target="_blank" rel="noopener noreferrer">
                                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Try MVP
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </Button>
                                </a>
                              ) : product.url ? (
                                <a href={product.url} target="_blank" rel="noopener noreferrer">
                                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Try MVP
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </Button>
                                </a>
                              ) : (
                                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
                                  Coming Soon
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Future Vision */}
                <div>
                  <h4 className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center justify-center">
                    <Rocket className="w-6 h-6 mr-2" />
                    Future Vision & Brainstorming
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
                    <p className="text-blue-800 font-medium">
                      🧠 These are our ideas and vision for the future - not current commitments but possibilities we're exploring based on our RAG experience
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {vertical.plannedProducts.map((product, productIndex) => (
                      <Card key={productIndex} className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <product.icon className="w-8 h-8 text-blue-500" />
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.status === 'Future Vision' ? 'bg-purple-100 text-purple-800' :
                              product.status === 'Brainstorming' ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {product.status}
                            </span>
                          </div>
                          <CardTitle className="text-lg font-bold font-brand-primary mb-2 text-blue-700" dangerouslySetInnerHTML={{ __html: product.name }}>
                          </CardTitle>
                          <CardDescription className="text-gray-600 font-poppins text-sm leading-relaxed">
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                         <CardContent>
                           <div className="space-y-2 mb-4">
                             {product.features.map((feature, featureIndex) => (
                               <div key={featureIndex} className="flex items-center space-x-2">
                                 <Innovation className="w-3 h-3 text-blue-500" />
                                 <span className="text-gray-600 font-poppins text-xs">{feature}</span>
                               </div>
                             ))}
                           </div>
                           
                           {/* Special detailed section for KDxVantage */}
                           {product.name === 'KDxVantage' && product.details && (
                             <div className="mt-4 space-y-4">
                               <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                 <h5 className="font-semibold text-orange-800 mb-2">Core Problem</h5>
                                 <p className="text-orange-700 text-xs leading-relaxed">{product.details.problem}</p>
                               </div>
                               <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                 <h5 className="font-semibold text-green-800 mb-2">Our Solution</h5>
                                 <p className="text-green-700 text-xs leading-relaxed">{product.details.solution}</p>
                               </div>
                             </div>
                           )}
                         </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Differentiation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Foundation & Approach
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Unlike generic AI tools, our KDx<sup>AI</sup> approach is built with proven methodology, transparency, and working MVPs first.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
                    <p className="text-gray-600 text-center font-poppins leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team & Technology Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Technology Foundation
              </h2>
              <p className="text-xl text-brand-light-gray font-poppins">
                Built by experts in GenAI architecture and automation solutions.
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="text-center pb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-brand-purple to-brand-green rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-brand-dark-gray font-brand-primary mb-2">
                  Expert Technology Team
                </CardTitle>
                <CardDescription className="text-brand-purple font-semibold text-lg">
                  GenAI Architecture & Automation Specialists
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 font-poppins leading-relaxed mb-6">
                  Our team comprises seasoned technologists and GenAI architects with deep expertise in retrieval-augmented generation (RAG), 
                  automation-first solutions, and scalable AI systems. We follow a transparent, build-in-public approach with an MVP-first strategy 
                  to ensure every KDx<sup>AI</sup> product is purpose-driven, community-centric, and technically robust.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="font-semibold text-brand-purple mb-1">Core Expertise</div>
                    <div className="text-gray-600">GenAI Architecture, RAG Systems</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="font-semibold text-brand-green mb-1">Development Philosophy</div>
                    <div className="text-gray-600">MVP First, Transparent Innovation</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-blue-600 mb-1">Vision</div>
                    <div className="text-gray-600">Proven Tech, Scalable Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple to-brand-green">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold font-brand-primary mb-6">
              Experience Our MVPs, Shape Our Future
            </h2>
            <p className="text-xl text-white/90 font-poppins mb-4 leading-relaxed">
              Try our working XmPrep<sup>NEET</sup> AI Tutor and KDx<sup>ITGym</sup> Career Platform MVPs and be part of shaping our journey from proven technology to expanded vision. 
              <strong> Your feedback helps us build what truly matters.</strong>
            </p>
            <p className="text-lg text-white/80 font-poppins mb-8 leading-relaxed">
              From 2 working MVPs to future automation ideas - let's build intelligent solutions together, one step at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-tutor-demo">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  Try NEET Tutor MVP
                </Button>
              </Link>
              <a href="https://itgym.lovable.app/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Briefcase className="mr-2 w-5 h-5" />
                  Try ITGym Career
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutKDxAI;

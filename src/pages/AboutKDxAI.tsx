
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
      name: "XmPrep<sup>NEET</sup>",
      description: "Our pioneer AI tutor for NEET aspirants, built with RAG and adaptive feedback systems",
      status: "Live & Growing",
      highlight: true,
      icon: GraduationCap,
      features: ["RAG-powered tutoring", "Adaptive feedback", "Past paper analysis", "Smart doubt solving"],
      users: "1000+ active students"
    }
  ];

  const plannedIntelligenceProducts = [
    {
      name: "XmPrep<sup>CBSE</sup>",
      description: "AI-first revision companion for Class 9–12 students across all CBSE subjects",
      status: "In Research",
      highlight: false,
      icon: BookOpen,
      features: ["Multi-subject coverage", "NCERT integration", "Personalized learning", "Exam preparation"]
    },
    {
      name: "XmPrep<sup>CUET</sup>",
      description: "AI-powered CUET preparation assistant based on NCERT/CBSE syllabus for central university admissions",
      status: "Roadmap 2025",
      highlight: false,
      icon: Building2,
      features: ["NCERT/CBSE aligned", "Domain-wise prep", "Mock tests", "University guidance"]
    },
    {
      name: "KDx<sup>ITGym</sup>",
      description: "Technical upskilling gym for students and freshers with hands-on AI project modules",
      status: "Concept Development",
      highlight: false,
      icon: Cpu,
      features: ["Coding practice", "AI project modules", "Career guidance", "Industry readiness"]
    },
    {
      name: "KDx<sup>WikiSenior</sup>",
      description: "Care companion app for senior citizens with health reminders and caregiver support",
      status: "Innovation Lab",
      highlight: false,
      icon: Stethoscope,
      features: ["Health monitoring", "Medication reminders", "Emergency contacts", "Wellness tracking"]
    },
    {
      name: "KDx<sup>Law</sup>",
      description: "RAG-powered legal intelligence for case search, clause extraction, and precedent comparison",
      status: "Market Research",
      highlight: false,
      icon: Scale,
      features: ["Case law search", "Document analysis", "Legal research", "Precedent matching"]
    },
    {
      name: "KDx<sup>Docs</sup>",
      description: "AI search agent for company SOPs, HR docs, and internal knowledge management",
      status: "Pilot Ready",
      highlight: false,
      icon: FileSearch,
      features: ["Document indexing", "Smart search", "Knowledge extraction", "Team collaboration"]
    },
    {
      name: "KDx<sup>Guru</sup>",
      description: "Enterprise knowledge assistant - your organization's private ChatGPT for internal workflows",
      status: "Prototype",
      highlight: false,
      icon: Brain,
      features: ["Internal knowledge base", "Workflow automation", "Team assistance", "Custom training"]
    }
  ];

  const plannedAutomateProducts = [
    {
      name: "KDx<sup>Robotize</sup>",
      description: "No-code AI task agents for repetitive actions like email replies, file movement, and data processing",
      status: "Alpha Concept",
      highlight: false,
      icon: Bot,
      features: ["No-code interface", "Email automation", "File management", "Data processing"]
    },
    {
      name: "KDx<sup>Workflow</sup>",
      description: "Cross-platform process automation connecting CRM, Sheets, WhatsApp, and more",
      status: "Design Phase",
      highlight: false,
      icon: Workflow,
      features: ["Multi-platform sync", "API integrations", "Custom workflows", "Real-time triggers"]
    },
    {
      name: "KDx<sup>Ops</sup>",
      description: "Operations automation dashboard with reports, checklists, and intelligent alerts",
      status: "Planning",
      highlight: false,
      icon: BarChart3,
      features: ["Real-time dashboards", "Automated reports", "Alert systems", "Performance metrics"]
    },
    {
      name: "KDx<sup>HR</sup>",
      description: "Employee onboarding, timesheet, leave management, and document workflow automation",
      status: "Market Validation",
      highlight: false,
      icon: UserCheck,
      features: ["Onboarding automation", "Leave management", "Document workflows", "Compliance tracking"]
    }
  ];

  const verticals = [
    {
      icon: Brain,
      title: "KDx<sup>Intelligence</sup>",
      subtitle: "Smarter Decisions from Your Data",
      description: "A planned suite of RAG-powered, AI-guided learning and knowledge agents that will revolutionize how students, professionals, and teams access and interact with information.",
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
      description: "Planned task-level AI agents and cross-platform automation to help individuals and teams eliminate repetitive effort and optimize operations.",
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
      title: "Freemium Access",
      description: "Built for underserved users with accessible pricing and white-label pilot models.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Target,
      title: "Build in Public",
      description: "Founder-led, transparent development with every release being purpose-driven and community-centric.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const achievements = [
    { metric: "1000+", label: "Students Impacted (XmPrep NEET)" },
    { metric: "95%", label: "User Satisfaction" },
    { metric: "24/7", label: "AI Support" },
    { metric: "10+", label: "Innovation Ideas" },
    { metric: "2025", label: "Expansion Timeline" }
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
                  KDx<sup className="text-4xl lg:text-5xl text-yellow-200 font-extrabold">AI</sup>
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl text-white/95 font-poppins leading-relaxed mb-4 font-semibold">
                Tasks Digitised. Knowledge Amplified.
              </p>
              <p className="text-lg lg:text-xl text-white/85 font-poppins leading-relaxed mb-8 max-w-4xl mx-auto">
                KDx<sup>AI</sup> (Kaaryaa Digital Transformation AI) is a visionary product studio building intelligent, retrieval-augmented solutions. <strong>Starting with XmPrep<sup>NEET</sup></strong> as our pioneer product, we're developing a comprehensive ecosystem of AI-powered educational and automation tools.
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
                  Try XmPrep<sup>NEET</sup>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Join Our Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl lg:text-3xl font-light text-brand-dark-gray leading-relaxed font-poppins mb-8 italic">
              "We're not building yet another chatbot or automation tool — we're crafting a suite of platforms that <span className="font-semibold text-brand-purple">understand</span>, <span className="font-semibold text-brand-green">respond</span>, and <span className="font-semibold text-brand-purple">transform</span> human effort into smarter, scalable outcomes."
            </blockquote>
            <p className="text-lg text-brand-light-gray font-poppins">
              <strong>Based in Chennai. Starting with NEET. Expanding globally.</strong>
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
                Our Journey: From Success to Vision
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Starting with XmPrep<sup>NEET</sup> as our proven success story, we're expanding into two powerful verticals of AI innovation.
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
                      Live & Growing
                    </h4>
                    <div className="grid lg:grid-cols-4 gap-6">
                      {vertical.currentProducts.map((product, productIndex) => (
                        <Card key={productIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ring-4 ring-green-200">
                          <div className="bg-gradient-to-r from-green-500 to-brand-green text-white text-center py-2 text-sm font-semibold">
                            🚀 Live Product
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
                            {product.users && (
                              <div className="mb-4 p-2 bg-green-50 rounded-lg text-center">
                                <span className="text-green-700 font-semibold text-xs">{product.users}</span>
                              </div>
                            )}
                            <div className="pt-4 border-t">
                              <Link to="/ai-tutor-demo">
                                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                  Try Now
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Innovation Pipeline */}
                <div>
                  <h4 className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center justify-center">
                    <Rocket className="w-6 h-6 mr-2" />
                    Innovation Pipeline
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
                    <p className="text-blue-800 font-medium">
                      🔬 These are our planned innovations and research ideas - not current commitments but our vision for the future
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-4 gap-6">
                    {vertical.plannedProducts.map((product, productIndex) => (
                      <Card key={productIndex} className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <product.icon className="w-8 h-8 text-blue-500" />
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.status === 'In Research' ? 'bg-yellow-100 text-yellow-800' :
                              product.status === 'Roadmap 2025' ? 'bg-purple-100 text-purple-800' :
                              product.status === 'Concept Development' ? 'bg-orange-100 text-orange-800' :
                              product.status === 'Pilot Ready' ? 'bg-green-100 text-green-800' :
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
                          <div className="space-y-2">
                            {product.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <Innovation className="w-3 h-3 text-blue-500" />
                                <span className="text-gray-600 font-poppins text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>
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
                Unlike generic AI tools, every KDx<sup>AI</sup> solution is built with purpose, transparency, and proven methodology.
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
                  automation-first solutions, and scalable AI systems. We follow a transparent, build-in-public approach that ensures 
                  every KDx<sup>AI</sup> product is purpose-driven, community-centric, and technically robust.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="font-semibold text-brand-purple mb-1">Core Expertise</div>
                    <div className="text-gray-600">GenAI Architecture, RAG Systems</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="font-semibold text-brand-green mb-1">Development Philosophy</div>
                    <div className="text-gray-600">Build in Public, Transparent Innovation</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-blue-600 mb-1">Vision</div>
                    <div className="text-gray-600">Democratizing AI Solutions</div>
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
              Join Our Journey from Success to Innovation
            </h2>
            <p className="text-xl text-white/90 font-poppins mb-4 leading-relaxed">
              Experience our proven success with XmPrep<sup>NEET</sup> and be part of shaping the future of AI-powered education and automation. 
              <strong> Your feedback helps us build what truly matters.</strong>
            </p>
            <p className="text-lg text-white/80 font-poppins mb-8 leading-relaxed">
              From NEET preparation to enterprise automation - let's co-create intelligent solutions together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-tutor-demo">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  Try XmPrep<sup>NEET</sup> Live
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Join Our Community
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

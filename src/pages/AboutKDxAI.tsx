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
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutKDxAI = () => {
  const intelligenceProducts = [
    {
      name: "XmPrep<sup>NEET</sup>",
      description: "Focused AI tutor for NEET aspirants, built with RAG, multilingual support, and adaptive feedback",
      status: "Pioneer Product",
      highlight: true,
      icon: GraduationCap,
      features: ["RAG-powered tutoring", "Tamil + English support", "Adaptive feedback", "Past paper analysis"]
    },
    {
      name: "XmPrep<sup>CBSE</sup>",
      description: "AI-first revision companion for Class 9–12 students across all CBSE subjects",
      status: "In Development",
      highlight: false,
      icon: BookOpen,
      features: ["Multi-subject coverage", "NCERT integration", "Personalized learning", "Exam preparation"]
    },
    {
      name: "XmPrep<sup>UPSC</sup>",
      description: "AI-powered civil services mentor with layered reasoning and current affairs integration",
      status: "Planned",
      highlight: false,
      icon: Landmark,
      features: ["Current affairs AI", "Essay writing aid", "Interview prep", "Mains strategy"]
    },
    {
      name: "KDx<sup>ITGym</sup>",
      description: "Technical upskilling gym for students and freshers with hands-on AI project modules",
      status: "Beta Testing",
      highlight: false,
      icon: Cpu,
      features: ["Coding practice", "AI project modules", "Career guidance", "Industry readiness"]
    },
    {
      name: "KDx<sup>WikiSenior</sup>",
      description: "Care companion app for senior citizens with health reminders and caregiver support",
      status: "Research Phase",
      highlight: false,
      icon: Stethoscope,
      features: ["Health monitoring", "Medication reminders", "Emergency contacts", "Wellness tracking"]
    },
    {
      name: "KDx<sup>Law</sup>",
      description: "RAG-powered legal intelligence for case search, clause extraction, and precedent comparison",
      status: "In Development",
      highlight: false,
      icon: Scale,
      features: ["Case law search", "Document analysis", "Legal research", "Precedent matching"]
    },
    {
      name: "KDx<sup>Docs</sup>",
      description: "AI search agent for company SOPs, HR docs, and internal knowledge management",
      status: "Enterprise Ready",
      highlight: false,
      icon: FileSearch,
      features: ["Document indexing", "Smart search", "Knowledge extraction", "Team collaboration"]
    },
    {
      name: "KDx<sup>Guru</sup>",
      description: "Enterprise knowledge assistant - your organization's private ChatGPT for internal workflows",
      status: "Beta Testing",
      highlight: false,
      icon: Brain,
      features: ["Internal knowledge base", "Workflow automation", "Team assistance", "Custom training"]
    }
  ];

  const automateProducts = [
    {
      name: "KDx<sup>Robotize</sup>",
      description: "No-code AI task agents for repetitive actions like email replies, file movement, and data processing",
      status: "Alpha Testing",
      highlight: false,
      icon: Bot,
      features: ["No-code interface", "Email automation", "File management", "Data processing"]
    },
    {
      name: "KDx<sup>Workflow</sup>",
      description: "Cross-platform process automation connecting CRM, Sheets, WhatsApp, and more",
      status: "In Development",
      highlight: false,
      icon: Workflow,
      features: ["Multi-platform sync", "API integrations", "Custom workflows", "Real-time triggers"]
    },
    {
      name: "KDx<sup>Ops</sup>",
      description: "Operations automation dashboard with reports, checklists, and intelligent alerts",
      status: "Beta Testing",
      highlight: false,
      icon: BarChart3,
      features: ["Real-time dashboards", "Automated reports", "Alert systems", "Performance metrics"]
    },
    {
      name: "KDx<sup>HR</sup>",
      description: "Employee onboarding, timesheet, leave management, and document workflow automation",
      status: "Enterprise Ready",
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
      description: "A suite of RAG-powered, AI-guided learning and knowledge agents that revolutionize how students, professionals, and teams access and interact with information.",
      features: ["RAG Architecture", "Contextual Intelligence", "Source-backed Responses"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      products: intelligenceProducts
    },
    {
      icon: Zap,
      title: "KDx<sup>Automate</sup>",
      subtitle: "Do More by Doing Less",
      description: "Task-level AI agents and cross-platform automation helping individuals and teams eliminate repetitive effort and optimize operations.",
      features: ["No-code Automation", "Cross-platform Integration", "Intelligent Agents", "Process Optimization"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      products: automateProducts
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
    { metric: "1000+", label: "Students Impacted" },
    { metric: "95%", label: "Success Rate" },
    { metric: "24/7", label: "AI Support" },
    { metric: "13+", label: "AI Products" },
    { metric: "2", label: "Core Verticals" }
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
                  KDx<sup className="text-3xl lg:text-4xl text-yellow-200 font-bold">AI</sup>
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl text-white/95 font-poppins leading-relaxed mb-4 font-semibold">
                Tasks Digitised. Knowledge Amplified.
              </p>
              <p className="text-lg lg:text-xl text-white/85 font-poppins leading-relaxed mb-8 max-w-4xl mx-auto">
                A visionary product studio dedicated to building intelligent, retrieval-augmented, and automation-first solutions for the real world.
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
                  Join Our Mission
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
              "We are not building yet another chatbot or automation tool — we are crafting a suite of platforms that <span className="font-semibold text-brand-purple">understand</span>, <span className="font-semibold text-brand-green">respond</span>, and <span className="font-semibold text-brand-purple">transform</span> human effort into smarter, scalable outcomes."
            </blockquote>
            <p className="text-lg text-brand-light-gray font-poppins">
              <strong>Based in Chennai. Built for the world.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* KDxAI Verticals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Verticals
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Two powerful verticals driving innovation with specialized AI solutions across industries.
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

                <div className="grid lg:grid-cols-4 gap-6">
                  {vertical.products.map((product, productIndex) => (
                    <Card key={productIndex} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white ${product.highlight ? 'ring-4 ring-brand-purple/20' : ''}`}>
                      {product.highlight && (
                        <div className="bg-gradient-to-r from-brand-purple to-brand-green text-white text-center py-2 text-sm font-semibold">
                          🏆 Pioneer Product
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <product.icon className={`w-8 h-8 ${product.highlight ? 'text-brand-purple' : vertical.color}`} />
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'Pioneer Product' ? 'bg-purple-100 text-purple-800' :
                            product.status === 'Enterprise Ready' ? 'bg-green-100 text-green-800' :
                            product.status === 'Beta Testing' ? 'bg-blue-100 text-blue-800' :
                            product.status === 'Alpha Testing' ? 'bg-orange-100 text-orange-800' :
                            product.status === 'In Development' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        <CardTitle className={`text-lg font-bold font-brand-primary mb-2 ${product.highlight ? 'text-brand-purple' : 'text-gray-800'}`} dangerouslySetInnerHTML={{ __html: product.name }}>
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-poppins text-sm leading-relaxed">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className={`w-3 h-3 ${product.highlight ? 'text-brand-purple' : vertical.color}`} />
                              <span className="text-gray-600 font-poppins text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {product.highlight && (
                          <div className="mt-4 pt-4 border-t">
                            <Link to="/ai-tutor-demo">
                              <Button size="sm" className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                                Try Now
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

      {/* Our Differentiation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
                Our Differentiation
              </h2>
              <p className="text-xl text-brand-light-gray max-w-3xl mx-auto font-poppins">
                Unlike generic AI tools or prompt-based GPTs, every KDx<sup>AI</sup> product is built with purpose and precision.
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
              Co-build What Matters
            </h2>
            <p className="text-xl text-white/90 font-poppins mb-4 leading-relaxed">
              Whether it's preparing a NEET student or automating enterprise workflows — 
              <strong> KDx<sup>AI</sup> is quietly powering the future of intelligence and automation in India.</strong>
            </p>
            <p className="text-lg text-white/80 font-poppins mb-8 leading-relaxed">
              Curious to partner, pilot, or contribute? Let's co-build what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-tutor-demo">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  Experience XmPrep<sup>NEET</sup>
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

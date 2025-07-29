import React from 'react';
import { ArrowRight, BookOpen, Brain, Target, Users, Star, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-brand-primary text-brand-primary">XmPrepNEET</span>
              <Badge variant="secondary" className="bg-brand-accent/20 text-brand-primary">
                KDxAI Powered
              </Badge>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-brand-primary transition-colors"
              >
                Contact
              </button>
            </nav>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-brand-accent/20 text-brand-primary border-brand-accent/30">
              🚀 Powered by KDxAI - Next-Gen AI Learning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-brand-primary text-gray-900 mb-6">
              Master NEET with
              <span className="text-brand-primary"> AI-Powered</span>
              <br />
              Personalized Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your NEET preparation with our intelligent tutoring system, 
              adaptive mock tests, and comprehensive performance analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
                Start Learning Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-brand-primary text-gray-900 mb-4">
              🔥 Key Features
            </h2>
            <p className="text-xl text-gray-600">
              Unlock your NEET potential with our advanced AI-driven features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-2.5">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-semibold">AI-Powered Tutoring</CardTitle>
                <CardDescription className="text-gray-500">
                  Get personalized guidance and instant doubt resolution with our AI tutor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Instant Doubt Resolution</li>
                  <li>Personalized Study Plans</li>
                  <li>24/7 Availability</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-2.5">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Adaptive Mock Tests</CardTitle>
                <CardDescription className="text-gray-500">
                  Evaluate your preparation level with tests that adapt to your performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Real-time Performance Analysis</li>
                  <li>Customizable Difficulty Levels</li>
                  <li>Detailed Score Reports</li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-2.5">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-semibold">Comprehensive Analytics</CardTitle>
                <CardDescription className="text-gray-500">
                  Track your progress with detailed analytics and identify areas for improvement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Subject-wise Performance</li>
                  <li>Trend Analysis</li>
                  <li>Personalized Insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold font-brand-primary text-gray-900 mb-6 text-center">
              More Awesome Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature Item 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-accent/20 text-brand-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Collaborative Study Groups</h4>
                  <p className="text-gray-600">
                    Join study groups and collaborate with peers for enhanced learning.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-accent/20 text-brand-primary rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Recommendations</h4>
                  <p className="text-gray-600">
                    Receive tailored recommendations for study materials and strategies.
                  </p>
                </div>
              </div>

              {/* Feature Item 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-accent/20 text-brand-primary rounded-lg flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">NEET Readiness Score</h4>
                  <p className="text-gray-600">
                    Track your NEET readiness with our comprehensive scoring system.
                  </p>
                </div>
              </div>

              {/* Feature Item 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-accent/20 text-brand-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">NCERT RAG Access</h4>
                  <p className="text-gray-600">
                    Quick access to NCERT resources with Read, Access, and Grasp methodology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-brand-primary text-gray-900 mb-4">
              About XmPrepNEET
            </h2>
            <p className="text-xl text-gray-600">
              Our mission is to revolutionize NEET preparation with AI-powered personalized learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="About XmPrepNEET"
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold font-brand-primary text-gray-900 mb-4">
                Why Choose XmPrepNEET?
              </h3>
              <p className="text-gray-600 mb-6">
                We leverage the power of AI to provide personalized learning experiences that adapt to each student's unique learning style and pace. Our platform combines intelligent tutoring, performance analytics, mock testing, and study planning to help students excel in their NEET examinations.
              </p>
              <ul className="list-disc pl-5 text-gray-600 mb-6">
                <li>Personalized AI Tutoring</li>
                <li>Adaptive Mock Tests</li>
                <li>Comprehensive Performance Analytics</li>
                <li>Intelligent Study Planning</li>
              </ul>
              <Button className="bg-brand-primary hover:bg-brand-primary/90">
                Learn More
              </Button>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold font-brand-primary text-gray-900 mb-6 text-center">
              Meet Our Team
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ce0e59ba98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold text-gray-900">John Doe</h4>
                <p className="text-gray-600">CEO</p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold text-gray-900">Jane Smith</h4>
                <p className="text-gray-600">CTO</p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold text-gray-900">Emily Johnson</h4>
                <p className="text-gray-600">Head of Education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-brand-primary">XmPrepNEET</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing NEET preparation with AI-powered personalized learning experiences.
              </p>
              <Badge className="bg-brand-accent/20 text-brand-primary">
                KDxAI Powered
              </Badge>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 XmPrepNEET. All rights reserved. Powered by KDxAI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

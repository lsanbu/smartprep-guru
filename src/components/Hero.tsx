import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-brand-purple via-brand-green to-brand-purple overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Beta Launch Special Notice - moved up */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
              <Star className="w-4 h-4 mr-2 text-yellow-300" />
              🎉 Beta Launch Special: AI Tutor access completely FREE for early users!
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-white space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold font-brand-primary leading-tight mb-6">
                  Crack NEET with{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    AI-Powered
                  </span>{' '}
                  Learning
                </h1>
                <p className="text-xl text-white/90 font-poppins leading-relaxed">
                  Experience personalized NEET preparation with XmPrep's revolutionary AI tutor. Get instant doubt resolution, adaptive practice tests, and performance insights tailored just for you.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-yellow-300" />
                  </div>
                  <span className="font-medium">AI-Powered Tutor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-yellow-300" />
                  </div>
                  <span className="font-medium">Adaptive Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-yellow-300" />
                  </div>
                  <span className="font-medium">Comprehensive Content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-yellow-300" />
                  </div>
                  <span className="font-medium">Expert Support</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/student">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-purple font-semibold px-8 py-4 text-lg w-full sm:w-auto"
                  >
                    Student Login
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">1000+ Students</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-300 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-xl font-semibold">Your AI Study Companion</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Brain className="w-5 h-5 text-yellow-300" />
                        <span className="text-white font-medium">AI Tutor</span>
                      </div>
                      <p className="text-white/80 text-sm">
                        "Let's solve this Organic Chemistry problem step by step..."
                      </p>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Target className="w-5 h-5 text-blue-300" />
                        <span className="text-white font-medium">Performance Tracker</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-white/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-white text-sm font-medium">85%</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <BookOpen className="w-5 h-5 text-pink-300" />
                        <span className="text-white font-medium">Smart Recommendations</span>
                      </div>
                      <p className="text-white/80 text-sm">
                        Focus on: Thermodynamics, Cell Biology, Aldehydes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import { BookOpen, Brain, Target, TrendingUp, Users, FileText, Award, Clock, MessageCircle, Image, Send, BarChart3, Zap, Star, Trophy, Calendar, CheckCircle, AlertCircle, ArrowUp, ArrowDown, Play, Pause, RotateCcw, Home, Settings, LogOut, Bell, Search, Filter, Download, Share, Lightbulb } from "lucide-react";

const AboutKDxAI = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-green-50 min-h-screen font-poppins">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-brand-purple/20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-green rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-brand-primary text-brand-dark-gray">
                  XmPrep<sup className="text-sm text-brand-purple">NEET</sup>
                </h1>
                <p className="text-xs font-brand-tagline text-brand-light-gray">
                  Tasks Digitised. Knowledge Amplified.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="hidden md:flex items-center space-x-2 bg-brand-purple/10 text-brand-purple px-3 py-2 rounded-full hover:bg-brand-purple/20 transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-brand-primary text-brand-dark-gray mb-4">
            About XmPrep<sup className="text-sm text-brand-purple">NEET</sup>
          </h2>
          <p className="text-brand-light-gray leading-relaxed mb-6">
            XmPrepNEET is an innovative educational platform designed to transform NEET exam preparation. We leverage cutting-edge AI technology to provide students with personalized, efficient, and effective learning experiences.
          </p>
          <p className="text-brand-light-gray leading-relaxed">
            Our mission is to democratize access to quality education, empowering every student to achieve their full potential and excel in the NEET exam.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold font-brand-primary text-brand-dark-gray mb-6">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-brand-primary text-brand-dark-gray mb-2">AI Tutor</h3>
              <p className="text-brand-green font-medium">MVP Ready</p>
              <p className="text-brand-light-gray text-sm mt-2">
                Fully functional AI tutoring system with text and image-based doubt solving for NEET preparation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-brand-primary text-brand-dark-gray mb-2">Student Portal</h3>
              <p className="text-yellow-600 font-medium">In Development</p>
              <p className="text-brand-light-gray text-sm mt-2">
                Comprehensive dashboard with analytics, mock tests, and study planning features (coming in future phases)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-brand-primary text-brand-dark-gray mb-2">Advanced Features</h3>
              <p className="text-blue-600 font-medium">Ideation Phase</p>
              <p className="text-brand-light-gray text-sm mt-2">
                Future innovations including personalized learning paths, adaptive assessments, and multi-subject expansion
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold font-brand-primary text-brand-dark-gray mb-2">
                AI-Powered Doubt Solving
              </h4>
              <p className="text-brand-light-gray leading-relaxed">
                Get instant solutions to your NEET doubts with our AI tutor. Simply type your question or upload an image, and our AI will provide step-by-step explanations.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold font-brand-primary text-brand-dark-gray mb-2">
                Personalized Learning Experience
              </h4>
              <p className="text-brand-light-gray leading-relaxed">
                Our platform adapts to your learning style and pace, providing customized content and recommendations to help you master key concepts.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold font-brand-primary text-brand-dark-gray mb-4">
            Join the XmPrep<sup className="text-sm text-brand-purple">NEET</sup> Community
          </h2>
          <p className="text-brand-light-gray leading-relaxed mb-6">
            Start your journey towards NEET success today! Sign up now and unlock the power of AI-driven learning.
          </p>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-gradient-to-r from-brand-purple to-brand-green text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Sign Up Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-brand-purple/20 py-6 text-center">
        <p className="text-sm text-brand-light-gray">
          &copy; {new Date().getFullYear()} XmPrepNEET. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutKDxAI;

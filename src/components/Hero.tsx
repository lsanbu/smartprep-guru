
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Hero = () => {
  const handleGetStarted = () => {
    toast.success("🎉 Welcome to XmPrep! Let's begin your NEET journey!");
    setTimeout(() => {
      window.location.href = '/signup';
    }, 1000);
  };

  const handleStudentPortal = () => {
    window.location.href = '/student';
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-purple/10 via-white to-brand-green/10 py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="bg-brand-green/20 text-brand-green border-brand-green/30 mb-6 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered NEET Preparation
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold font-brand-primary text-brand-dark-gray mb-6 leading-tight">
            XmPrep<sup className="text-brand-purple text-3xl md:text-4xl">NEET</sup>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-brand-tagline text-brand-light-gray mb-4">
            Tasks Digitised. Knowledge Amplified.
          </p>

          {/* Beta Notice moved up */}
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-amber-800 font-medium font-poppins">
              🎉 <strong>Beta Launch Special:</strong> AI Tutor access completely FREE for early users!
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto font-poppins">
            Revolutionize your NEET preparation with our AI-powered tutor. Get personalized learning, 
            instant doubt clearing, and comprehensive performance analytics to ace your medical entrance exam.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-brand-purple" />
              <span className="text-gray-700 font-medium font-poppins">AI Tutor</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-brand-purple" />
              <span className="text-gray-700 font-medium font-poppins">NCERT RAG</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-brand-purple" />
              <span className="text-gray-700 font-medium font-poppins">Performance Analytics</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-brand-purple to-brand-green hover:from-brand-purple/90 hover:to-brand-green/90 text-white px-8 py-4 text-lg shadow-lg font-poppins"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleStudentPortal}
              className="border-brand-purple text-brand-purple hover:bg-brand-purple/10 px-8 py-4 text-lg font-poppins"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Student Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-purple/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-green/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;

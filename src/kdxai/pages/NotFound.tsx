import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-white/80">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        
        <div className="space-y-4">
          <a href="/">
            <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 font-semibold">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
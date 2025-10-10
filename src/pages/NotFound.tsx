import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #062F5A 0%, #20B2AA 50%, #A4D65E 100%)' }}>
      <div className="text-center text-white">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        <a href="/" className="inline-block bg-white text-brand-navy hover:bg-gray-100 font-semibold px-8 py-3 rounded-md transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

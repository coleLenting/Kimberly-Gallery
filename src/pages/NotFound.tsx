
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Camera } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <Camera className="h-16 w-16 text-blush-pink mx-auto mb-4" />
          <h1 className="text-6xl font-playfair font-bold text-charcoal-gray mb-2">404</h1>
          <h2 className="text-2xl font-playfair text-soft-brown mb-4">Page Not Found</h2>
          <p className="text-soft-brown leading-relaxed mb-8">
            Oops! It looks like this photo got lost in the album. 
            Let's get you back to the gallery where all the beautiful memories are waiting.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-blush-pink hover:bg-light-pink text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover-lift"
        >
          <Home className="h-5 w-5" />
          <span>Return to Gallery</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

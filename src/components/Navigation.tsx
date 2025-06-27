import { Camera, Heart, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useRecentViews } from "@/contexts/RecentViewsContext";

export const Navigation = () => {
  const { favoritesCount } = useFavorites();
  const { recentViewsCount } = useRecentViews();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-light-pink/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-blush-pink" />
            <span className="text-xl font-playfair font-semibold text-charcoal-gray">
              Kimberly's Gallery
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            
            <Link 
              to="/recent" 
              className="text-soft-brown hover:text-blush-pink transition-colors duration-300 flex items-center space-x-1 relative"
            >
              <Clock className="h-4 w-4" />
              <span>Recently Viewed</span>
              {recentViewsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blush-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {recentViewsCount > 99 ? '99+' : recentViewsCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/favorites" 
              className="text-soft-brown hover:text-blush-pink transition-colors duration-300 flex items-center space-x-1 relative"
            >
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
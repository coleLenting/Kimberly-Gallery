import { Clock, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecentViews } from "@/contexts/RecentViewsContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const RecentViewsSection = () => {
  const { recentViews, clearRecentViews, recentViewsCount } = useRecentViews();
  const { isFavorite } = useFavorites();
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Show only the 8 most recent views in this section
  const displayViews = recentViews.slice(0, 8);

  const handleClearRecentViews = () => {
    clearRecentViews();
    setShowClearDialog(false);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const viewTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - viewTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return viewTime.toLocaleDateString();
  };

  if (recentViewsCount === 0) {
    return null; // Don't show section if no recent views
  }

  return (
    <section id="recent" className="py-16 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-charcoal-gray mb-2">
              Recently Viewed
            </h2>
            <p className="text-soft-brown">
              {recentViewsCount} photo{recentViewsCount !== 1 ? 's' : ''} viewed recently
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {recentViewsCount > 8 && (
              <Link 
                to="/recent"
                className="flex items-center space-x-2 text-blush-pink hover:text-light-pink transition-colors duration-300"
              >
                <span className="text-sm font-medium">View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            
            <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <AlertDialogTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 text-soft-brown hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-300">
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Clear</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Recent Views?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all {recentViewsCount} recently viewed photos from your history. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearRecentViews} className="bg-red-600 hover:bg-red-700">
                    Clear Recent Views
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Horizontal scrollable gallery */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {displayViews.map((view, index) => {
              const isPhotoFavorite = isFavorite(view.photoId);
              
              return (
                <div 
                  key={view.id}
                  className="group flex-shrink-0 w-48 animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={view.photoUrl}
                        alt={view.caption || 'Recently viewed photo'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Favorite indicator */}
                      {isPhotoFavorite && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Heart className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                      
                      {/* Time indicator */}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs text-white font-medium">
                          {formatTimeAgo(view.viewedAt)}
                        </span>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                          View Again
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <p className="text-sm text-charcoal-gray font-medium mb-1 line-clamp-2">
                        {view.caption || 'Beautiful moment'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-soft-brown">
                        <span className="capitalize">{view.category.replace('-', ' ')}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(view.viewedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
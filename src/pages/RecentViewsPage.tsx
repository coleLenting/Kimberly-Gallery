import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Heart, Download, Trash2, Share2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useRecentViews } from "@/contexts/RecentViewsContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useShare } from "@/hooks/useShare";
import { useDownload } from "@/hooks/useDownload";
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

const RecentViewsPage = () => {
  const { getRecentViewsByTimeGroup, clearRecentViews, recentViewsCount } = useRecentViews();
  const { isFavorite } = useFavorites();
  const { sharePhoto } = useShare();
  const { downloadPhoto } = useDownload();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const timeGroups = getRecentViewsByTimeGroup();

  const handleClearRecentViews = () => {
    clearRecentViews();
    setShowClearDialog(false);
  };

  const handleExportRecentViews = async () => {
    const exportData = Object.entries(timeGroups).flatMap(([timeGroup, views]) =>
      views.map(view => ({
        caption: view.caption,
        url: view.photoUrl,
        category: view.category,
        viewedAt: view.viewedAt,
        timeGroup,
      }))
    );
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `recent-views-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        
        <div className="bg-gradient-pink py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center text-soft-brown hover:text-charcoal-gray transition-colors duration-300 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-charcoal-gray mb-4 text-shadow-soft">
              Recently Viewed
            </h1>
            <p className="text-xl text-charcoal-gray/80 leading-relaxed">
              No photos viewed yet! Start exploring the gallery to see your viewing history here.
            </p>
          </div>
        </div>
        
        <div className="py-20 px-4 text-center">
          <Clock className="h-16 w-16 text-blush-pink mx-auto mb-6" />
          <h2 className="text-2xl font-playfair text-charcoal-gray mb-4">
            Your recently viewed photos will appear here
          </h2>
          <p className="text-soft-brown mb-8 max-w-md mx-auto">
            Browse through the gallery and open photos to automatically track your viewing history.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-blush-pink hover:bg-light-pink text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover-lift"
          >
            Explore Gallery
          </Link>
        </div>
      </div>
    );
  }

  const renderTimeGroup = (title: string, views: typeof timeGroups.today, delay: number = 0) => {
    if (views.length === 0) return null;

    return (
      <div className="mb-12" style={{ animationDelay: `${delay}ms` }}>
        <h3 className="text-xl font-playfair font-semibold text-charcoal-gray mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blush-pink" />
          {title} ({views.length})
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {views.map((view, index) => {
            const isPhotoFavorite = isFavorite(view.photoId);
            
            return (
              <div 
                key={view.id}
                className="group animate-fade-in hover-lift"
                style={{ animationDelay: `${delay + (index * 100)}ms` }}
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
                      <div className="absolute top-3 right-3 w-8 h-8 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white fill-current" />
                      </div>
                    )}
                    
                    {/* Action overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-3">
                        <button
                          onClick={() => sharePhoto({
                            url: view.photoUrl,
                            caption: view.caption || 'Beautiful photo',
                            galleryUrl: window.location.origin,
                          })}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="Share photo"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                        
                        <button
                          onClick={() => downloadPhoto(view.photoUrl, `${(view.caption || 'photo').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`)}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="Download photo"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-charcoal-gray font-medium mb-1 line-clamp-2">
                      {view.caption || 'Beautiful moment'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-soft-brown">
                      <span className="capitalize">{view.category.replace('-', ' ')}</span>
                      <span>{formatTimeAgo(view.viewedAt)}</span>
                    </div>
                    <div className="text-xs text-soft-brown/70 mt-1">
                      {new Date(view.viewedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-pink py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-soft-brown hover:text-charcoal-gray transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-charcoal-gray mb-4 text-shadow-soft">
                Recently Viewed
              </h1>
              <p className="text-lg text-soft-brown mb-2">
                {recentViewsCount} photo{recentViewsCount !== 1 ? 's' : ''} viewed recently
              </p>
              <p className="text-xl text-charcoal-gray/80 leading-relaxed">
                Your viewing history organized by time
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportRecentViews}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-charcoal-gray hover:bg-white/30 rounded-full transition-colors duration-300"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Export History</span>
              </button>
              
              <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-700 hover:bg-red-500/30 rounded-full transition-colors duration-300">
                    <Trash2 className="h-4 w-4" />
                    <span className="text-sm">Clear All</span>
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
        </div>
      </div>

      {/* Recent Views by Time Groups */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {renderTimeGroup("Today", timeGroups.today, 0)}
          {renderTimeGroup("Yesterday", timeGroups.yesterday, 200)}
          {renderTimeGroup("This Week", timeGroups.thisWeek, 400)}
          {renderTimeGroup("Older", timeGroups.older, 600)}
        </div>
      </div>
    </div>
  );
};

export default RecentViewsPage;
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Download, Trash2, Share2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
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

const FavoritesPage = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { sharePhoto } = useShare();
  const { downloadPhoto } = useDownload();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearFavorites = () => {
    clearFavorites();
    setShowClearDialog(false);
  };

  const handleExportFavorites = async () => {
    const exportData = favorites.map(fav => ({
      caption: fav.caption,
      url: fav.url,
      category: fav.category,
      dateAdded: fav.dateAdded,
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `favorites-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (favorites.length === 0) {
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
              Your Favorites
            </h1>
            <p className="text-xl text-charcoal-gray/80 leading-relaxed">
              No favorites yet! Start exploring the gallery and add photos you love.
            </p>
          </div>
        </div>
        
        <div className="py-20 px-4 text-center">
          <Heart className="h-16 w-16 text-blush-pink mx-auto mb-6" />
          <h2 className="text-2xl font-playfair text-charcoal-gray mb-4">
            Your favorite photos will appear here
          </h2>
          <p className="text-soft-brown mb-8 max-w-md mx-auto">
            Browse through the gallery and click the heart icon on photos you'd like to save to your favorites.
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
                Your Favorites
              </h1>
              <p className="text-lg text-soft-brown mb-2">
                {favorites.length} cherished moment{favorites.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xl text-charcoal-gray/80 leading-relaxed">
                Your personal collection of beautiful memories
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportFavorites}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-charcoal-gray hover:bg-white/30 rounded-full transition-colors duration-300"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Export List</span>
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
                    <AlertDialogTitle>Clear All Favorites?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all {favorites.length} photos from your favorites list. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearFavorites} className="bg-red-600 hover:bg-red-700">
                      Clear All Favorites
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite, index) => (
              <div 
                key={favorite.id}
                className="group animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={favorite.url}
                      alt={favorite.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Action overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-3">
                        <button
                          onClick={() => sharePhoto({
                            url: favorite.url,
                            caption: favorite.caption,
                            galleryUrl: window.location.origin,
                          })}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="Share photo"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                        
                        <button
                          onClick={() => downloadPhoto(favorite.url, `${favorite.caption.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`)}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          aria-label="Download photo"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                        
                        <button
                          onClick={() => removeFavorite(favorite.id)}
                          className="w-10 h-10 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/90 transition-colors duration-300"
                          aria-label="Remove from favorites"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-charcoal-gray font-medium mb-1 line-clamp-2">
                      {favorite.caption}
                    </p>
                    <div className="flex items-center justify-between text-xs text-soft-brown">
                      <span className="capitalize">{favorite.category.replace('-', ' ')}</span>
                      <span>{favorite.age}</span>
                    </div>
                    <div className="text-xs text-soft-brown/70 mt-1">
                      Added {new Date(favorite.dateAdded).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
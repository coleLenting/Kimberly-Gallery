import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Download, Share2 } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useShare } from "@/hooks/useShare";
import { useDownload } from "@/hooks/useDownload";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface Photo {
  id: number;
  src: string;
  thumbnail: string;
  caption: string;
  date: string;
  age: string;
}

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  categoryId?: string;
}

export const PhotoLightbox = ({ photos, currentIndex, onClose, onNavigate, categoryId = 'gallery' }: PhotoLightboxProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { sharePhoto, isSharing } = useShare();
  const { downloadPhoto, isDownloading } = useDownload();

  const currentPhoto = photos[currentIndex];
  const photoId = `${categoryId}-${currentPhoto.id}`;
  const isCurrentFavorite = isFavorite(photoId);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsLoading(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
      setIsLoading(true);
    }
  };

  const handleFavorite = () => {
    if (isCurrentFavorite) {
      removeFavorite(photoId);
    } else {
      addFavorite({
        id: photoId,
        url: currentPhoto.src,
        caption: currentPhoto.caption,
        dateAdded: new Date().toISOString(),
        category: categoryId,
        age: currentPhoto.age,
        date: currentPhoto.date,
      });
    }
  };

  const handleShare = async () => {
    await sharePhoto({
      url: currentPhoto.src,
      caption: currentPhoto.caption,
      galleryUrl: window.location.origin,
    });
  };

  const handleDownload = async () => {
    const filename = `${currentPhoto.caption.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${currentPhoto.date}.jpg`;
    await downloadPhoto(currentPhoto.src, filename);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onFavorite: handleFavorite,
    onShare: handleShare,
    onDownload: handleDownload,
    onClose: onClose,
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
        aria-label="Close lightbox (Esc)"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
          aria-label="Previous photo (←)"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
          aria-label="Next photo (→)"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Main image */}
      <div className="relative max-w-7xl max-h-[90vh] mx-auto px-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={currentPhoto.src}
          alt={currentPhoto.caption}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Photo info panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-white text-lg font-playfair font-medium mb-1">
                {currentPhoto.caption}
              </h3>
              <div className="flex items-center space-x-4 text-white/80 text-sm">
                <span>{currentPhoto.date}</span>
                <span>•</span>
                <span>{currentPhoto.age}</span>
                <span>•</span>
                <span>{currentIndex + 1} of {photos.length}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleFavorite}
                className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrentFavorite 
                    ? 'bg-red-500/80 hover:bg-red-500/90 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                aria-label={`${isCurrentFavorite ? 'Remove from' : 'Add to'} favorites (F)`}
              >
                <Heart className={`h-5 w-5 ${isCurrentFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={handleShare}
                disabled={isSharing}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                aria-label="Share photo (S)"
              >
                {isSharing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Share2 className="h-5 w-5 text-white" />
                )}
              </button>
              
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                aria-label="Download photo (D)"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white/80 text-xs">
        <div className="space-y-1">
          <div>F - Favorite</div>
          <div>S - Share</div>
          <div>D - Download</div>
          <div>← → - Navigate</div>
          <div>Esc - Close</div>
        </div>
      </div>
    </div>
  );
};
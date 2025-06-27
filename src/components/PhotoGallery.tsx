import { useEffect, useState } from "react";
import { PhotoLightbox } from "./PhotoLightbox";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { getPhotosForCategory } from "@/lib/utils";


interface PhotoGalleryProps {
  categoryId: string;
}

export const PhotoGallery = ({ categoryId }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    const fetchPhotos = () => {
      const data = getPhotosForCategory(categoryId);
      setPhotos(data);
    };

    fetchPhotos();
  }, [categoryId]);

  if (!photos.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No photos found in this category.
      </div>
    );
  }


  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => {
            const photoId = `${categoryId}-${photo.id}`;
            const isPhotoFavorite = isFavorite(photoId);
            
            return (
              <div 
                key={photo.id}
                className="group cursor-pointer animate-fade-in hover-lift relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={photo.thumbnail}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Favorite indicator */}
                    {isPhotoFavorite && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-white fill-current" />
                      </div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium">
                        Click to view
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-charcoal-gray font-medium mb-1 line-clamp-2">
                      {photo.caption}
                    </p>
                    <div className="flex items-center justify-between text-xs text-soft-brown">
                      <span>{photo.date}</span>
                      <span>{photo.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <PhotoLightbox 
            photos={photos}
            currentIndex={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={setSelectedPhoto}
            categoryId={categoryId}
          />
        )}
      </div>
    </div>
  );
};
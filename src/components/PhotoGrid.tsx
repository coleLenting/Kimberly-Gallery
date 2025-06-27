
import React, { useState, useCallback } from 'react';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import PhotoSkeleton from './PhotoSkeleton';
import { Photo } from '../types/photo';
import { generatePhotos } from '../data/photos';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid = ({ photos: initialPhotos }: PhotoGridProps) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [hasMore, setHasMore] = useState(true);

  const loadMorePhotos = useCallback(() => {
    console.log('Loading more photos...');
    setTimeout(() => {
      // Load 3-6 images at a time for smoother experience
      const batchSize = Math.floor(Math.random() * 4) + 3; // Random between 3-6
      const newPhotos = generatePhotos(batchSize, photos.length);
      
      // If no new photos generated (reached end of available templates), stop loading
      if (newPhotos.length === 0) {
        setHasMore(false);
        return;
      }
      
      setPhotos(prev => [...prev, ...newPhotos]);
      
      // Stop loading after reaching a reasonable limit or if we've cycled through many times
      if (photos.length + newPhotos.length >= 60) {
        setHasMore(false);
      }
    }, 600);
  }, [photos.length]);

  const isLoading = useInfiniteScroll(loadMorePhotos, hasMore);

  const handleLike = (photoId: string) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isLiked={likedPhotos.has(photo.id)}
            onLike={() => handleLike(photo.id)}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>
      
      {/* Loading skeletons at the bottom */}
      {isLoading && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PhotoSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}
      
      {!hasMore && photos.length > 0 && (
        <div className="text-center py-8 animate-fade-in">
          <p className="text-gray-400">You've reached the end of our gallery ✨</p>
        </div>
      )}
      
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          isLiked={likedPhotos.has(selectedPhoto.id)}
          onLike={() => handleLike(selectedPhoto.id)}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};

export default PhotoGrid;

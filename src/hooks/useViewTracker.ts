import { useCallback } from 'react';
import { useRecentViews } from '@/contexts/RecentViewsContext';

interface PhotoViewData {
  photoId: string;
  photoUrl: string;
  caption?: string;
  category: string;
}

export const useViewTracker = () => {
  const { addRecentView } = useRecentViews();

  /**
   * Track a photo view - debounced to prevent excessive tracking
   */
  const trackPhotoView = useCallback((photoData: PhotoViewData) => {
    // Generate a unique ID for this view
    const viewId = `${photoData.category}-${photoData.photoId}-${Date.now()}`;
    
    addRecentView({
      id: viewId,
      photoId: photoData.photoId,
      photoUrl: photoData.photoUrl,
      caption: photoData.caption,
      category: photoData.category,
    });
  }, [addRecentView]);

  return {
    trackPhotoView,
  };
};
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

export interface RecentView {
  id: string;
  photoUrl: string;
  caption?: string;
  category: string;
  viewedAt: string; // ISO timestamp
  photoId: string; // Original photo ID for deduplication
}

interface RecentViewsState {
  recentViews: RecentView[];
  addRecentView: (photo: Omit<RecentView, 'viewedAt'>) => void;
  clearRecentViews: () => void;
  getRecentViewsByCategory: (category: string) => RecentView[];
  getRecentViewsFromToday: () => RecentView[];
  getRecentViewsByTimeGroup: () => {
    today: RecentView[];
    yesterday: RecentView[];
    thisWeek: RecentView[];
    older: RecentView[];
  };
  recentViewsCount: number;
}

const RecentViewsContext = createContext<RecentViewsState | null>(null);

const STORAGE_KEY = 'photoGallery_recentViews';
const MAX_RECENT_VIEWS = 30;
const CLEANUP_DAYS = 30;

export const RecentViewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentViews, setRecentViews] = useState<RecentView[]>([]);

  // Load recent views from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedViews = JSON.parse(stored);
        // Clean up old views (older than 30 days)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - CLEANUP_DAYS);
        
        const cleanedViews = parsedViews.filter((view: RecentView) => 
          new Date(view.viewedAt) > cutoffDate
        );
        
        setRecentViews(cleanedViews);
        
        // Update localStorage if we cleaned up any views
        if (cleanedViews.length !== parsedViews.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedViews));
        }
      }
    } catch (error) {
      console.error('Error loading recent views from localStorage:', error);
    }
  }, []);

  // Save recent views to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentViews));
    } catch (error) {
      console.error('Error saving recent views to localStorage:', error);
      toast.error('Failed to save recent views');
    }
  }, [recentViews]);

  const addRecentView = (photo: Omit<RecentView, 'viewedAt'>) => {
    setRecentViews(prev => {
      // Check if this photo was already viewed recently (within last hour)
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      
      const existingRecentView = prev.find(view => 
        view.photoId === photo.photoId && 
        new Date(view.viewedAt) > oneHourAgo
      );
      
      if (existingRecentView) {
        // Update timestamp instead of creating duplicate
        return prev.map(view => 
          view.photoId === photo.photoId 
            ? { ...view, viewedAt: new Date().toISOString() }
            : view
        );
      }
      
      // Remove any older views of the same photo
      const filteredViews = prev.filter(view => view.photoId !== photo.photoId);
      
      // Add new view at the beginning
      const newView: RecentView = {
        ...photo,
        viewedAt: new Date().toISOString(),
      };
      
      const updatedViews = [newView, ...filteredViews];
      
      // Limit to MAX_RECENT_VIEWS
      return updatedViews.slice(0, MAX_RECENT_VIEWS);
    });
  };

  const clearRecentViews = () => {
    setRecentViews([]);
    toast.success('Recent views cleared');
  };

  const getRecentViewsByCategory = (category: string) => {
    return recentViews.filter(view => view.category === category);
  };

  const getRecentViewsFromToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return recentViews.filter(view => 
      new Date(view.viewedAt) >= today
    );
  };

  const getRecentViewsByTimeGroup = () => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - 7);

    return {
      today: recentViews.filter(view => new Date(view.viewedAt) >= today),
      yesterday: recentViews.filter(view => {
        const viewDate = new Date(view.viewedAt);
        return viewDate >= yesterday && viewDate < today;
      }),
      thisWeek: recentViews.filter(view => {
        const viewDate = new Date(view.viewedAt);
        return viewDate >= thisWeekStart && viewDate < yesterday;
      }),
      older: recentViews.filter(view => new Date(view.viewedAt) < thisWeekStart),
    };
  };

  const value: RecentViewsState = {
    recentViews,
    addRecentView,
    clearRecentViews,
    getRecentViewsByCategory,
    getRecentViewsFromToday,
    getRecentViewsByTimeGroup,
    recentViewsCount: recentViews.length,
  };

  return (
    <RecentViewsContext.Provider value={value}>
      {children}
    </RecentViewsContext.Provider>
  );
};

export const useRecentViews = () => {
  const context = useContext(RecentViewsContext);
  if (!context) {
    throw new Error('useRecentViews must be used within a RecentViewsProvider');
  }
  return context;
};
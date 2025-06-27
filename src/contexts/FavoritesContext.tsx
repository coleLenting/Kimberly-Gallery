import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';

export interface FavoritePhoto {
  id: string;
  url: string;
  caption: string;
  dateAdded: string;
  category: string;
  age?: string;
  date?: string;
}

interface FavoritesState {
  favorites: FavoritePhoto[];
  addFavorite: (photo: FavoritePhoto) => void;
  removeFavorite: (photoId: string) => void;
  isFavorite: (photoId: string) => boolean;
  clearFavorites: () => void;
  getFavoritesByCategory: (category: string) => FavoritePhoto[];
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesState | null>(null);

const STORAGE_KEY = 'photoGallery_favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritePhoto[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedFavorites = JSON.parse(stored);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      toast.error('Failed to load favorites');
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
      toast.error('Failed to save favorites');
    }
  }, [favorites]);

  const addFavorite = (photo: FavoritePhoto) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === photo.id)) {
        return prev; // Already favorited
      }
      const newFavorites = [...prev, { ...photo, dateAdded: new Date().toISOString() }];
      toast.success('Added to favorites ❤️');
      return newFavorites;
    });
  };

  const removeFavorite = (photoId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.id !== photoId);
      toast.success('Removed from favorites');
      return newFavorites;
    });
  };

  const isFavorite = (photoId: string) => {
    return favorites.some(fav => fav.id === photoId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.success('All favorites cleared');
  };

  const getFavoritesByCategory = (category: string) => {
    return favorites.filter(fav => fav.category === category);
  };

  const value: FavoritesState = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesByCategory,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
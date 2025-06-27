import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Heart, Trash2 } from "lucide-react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Navigation } from "@/components/Navigation";
import { useFavorites } from "@/contexts/FavoritesContext";
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { getFavoritesByCategory, clearFavorites } = useFavorites();
  const [showClearDialog, setShowClearDialog] = useState(false);
  
  // Mock data - in a real app, this would come from your data source
  const categoryData = {
    'baby-days': {
      title: 'Baby Days',
      subtitle: '0-1 year • 24 precious moments',
      description: 'Those magical first moments that take your breath away'
    },
    'toddler-adventures': {
      title: 'Toddler Adventures', 
      subtitle: '1-3 years • 18 adventures',
      description: 'Exploring the world with wonder and curiosity'
    },
    'little-explorer': {
      title: 'Little Explorer',
      subtitle: '3-5 years • 32 discoveries', 
      description: 'Adventures in discovery and imagination'
    },
    'school-days': {
      title: 'School Days',
      subtitle: '5+ years • 15 milestones',
      description: 'Learning, growing, and reaching new heights'
    },
    'special-occasions': {
      title: 'Special Occasions',
      subtitle: 'Celebrations • 28 memories',
      description: 'Birthdays, holidays, and milestone moments'
    },
    'everyday-moments': {
      title: 'Everyday Moments', 
      subtitle: 'Daily life • 41 treasures',
      description: 'The beautiful ordinary that makes life extraordinary'
    }
  };

  const category = categoryData[categoryId as keyof typeof categoryData];
  const categoryFavorites = categoryId ? getFavoritesByCategory(categoryId) : [];

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleClearFavorites = () => {
    clearFavorites();
    setShowClearDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-pink py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Link 
            to="/" 
            className="inline-flex items-center text-soft-brown hover:text-charcoal-gray transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-charcoal-gray mb-4 text-shadow-soft">
              {category.title}
            </h1>
            <p className="text-lg text-soft-brown mb-2">
              {category.subtitle}
            </p>
            <p className="text-xl text-charcoal-gray/80 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-light-pink/20 py-4 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blush-pink/20 text-blush-pink rounded-full hover:bg-blush-pink/30 transition-colors duration-300">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Sort by Date</span>
            </button>
            
            {categoryFavorites.length > 0 && (
              <span className="text-sm text-soft-brown">
                {categoryFavorites.length} favorite{categoryFavorites.length !== 1 ? 's' : ''} in this category
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {categoryFavorites.length > 0 && (
              <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-300">
                    <Trash2 className="h-4 w-4" />
                    <span className="text-sm">Clear All Favorites</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Favorites?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all photos from your favorites list. This action cannot be undone.
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
            )}
            
            <Link 
              to="/favorites"
              className="flex items-center space-x-2 px-4 py-2 text-soft-brown hover:text-blush-pink transition-colors duration-300"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">View All Favorites</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery categoryId={categoryId!} />
    </div>
  );
};

export default CategoryPage;
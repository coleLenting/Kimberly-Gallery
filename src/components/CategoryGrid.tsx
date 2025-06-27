
import { Baby, Book, Backpack, Heart, Camera } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export const CategoryGrid = () => {
  const categories = [
    {
      id: 'baby-days',
      title: 'Baby Days',
      subtitle: '0-1 year',
      description: 'Those precious first moments',
      icon: Baby,
      color: 'bg-light-pink/20',
      iconColor: 'text-light-pink',
      previewImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop&crop=face',
      photoCount: 24
    },
    {
      id: 'toddler-adventures',
      title: 'Toddler Adventures',
      subtitle: '1-3 years',
      description: 'Exploring the world with wonder',
      icon: Heart,
      color: 'bg-blush-pink/20',
      iconColor: 'text-blush-pink',
      previewImage: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop&crop=center',
      photoCount: 18
    },
    {
      id: 'little-explorer',
      title: 'Little Explorer',
      subtitle: '3-5 years',
      description: 'Adventures in discovery',
      icon: Camera,
      color: 'bg-dusty-rose/20',
      iconColor: 'text-dusty-rose',
      previewImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face',
      photoCount: 32
    },
    {
      id: 'school-days',
      title: 'School Days',
      subtitle: '5+ years',
      description: 'Learning and growing',
      icon: Book,
      color: 'bg-light-pink/20',
      iconColor: 'text-light-pink',
      previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face',
      photoCount: 15
    },
    {
      id: 'special-occasions',
      title: 'Special Occasions',
      subtitle: 'Celebrations',
      description: 'Birthdays, holidays & milestones',
      icon: Heart,
      color: 'bg-blush-pink/20',
      iconColor: 'text-blush-pink',
      previewImage: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop&crop=center',
      photoCount: 28
    },
    {
      id: 'everyday-moments',
      title: 'Everyday Moments',
      subtitle: 'Daily life',
      description: 'The beautiful ordinary',
      icon: Camera,
      color: 'bg-dusty-rose/20',
      iconColor: 'text-dusty-rose',
      previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=center',
      photoCount: 41
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-charcoal-gray mb-4">
            Memory Collection
          </h2>
          <p className="text-lg text-soft-brown max-w-2xl mx-auto">
            Browse through precious moments organized by the stages of Isabella's beautiful journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

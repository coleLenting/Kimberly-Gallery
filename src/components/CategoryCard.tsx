
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    color: string;
    iconColor: string;
    previewImage: string;
    photoCount: number;
  };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = category.icon;

  return (
    <Link to={`/category/${category.id}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover-lift group-hover:shadow-2xl transition-all duration-500">
        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={category.previewImage}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Icon overlay */}
          <div className={`absolute top-4 right-4 w-12 h-12 ${category.color} rounded-full flex items-center justify-center backdrop-blur-sm`}>
            <Icon className={`h-6 w-6 ${category.iconColor}`} />
          </div>
          
          {/* Photo count */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-medium text-charcoal-gray">
              {category.photoCount} photos
            </span>
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-playfair font-semibold text-charcoal-gray group-hover:text-blush-pink transition-colors duration-300">
              {category.title}
            </h3>
            <span className="text-sm text-soft-brown font-medium">
              {category.subtitle}
            </span>
          </div>
          
          <p className="text-soft-brown text-sm leading-relaxed">
            {category.description}
          </p>
          
          {/* Hover indicator */}
          <div className="mt-4 flex items-center text-blush-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">View Gallery</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

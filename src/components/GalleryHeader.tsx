
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const GalleryHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Sparkles className="text-pink-400 animate-pulse" size={32} />
        <h1 className="text-4xl md:text-5xl font-light text-gray-700">
          Kimberly's Gallery
        </h1>
        <Sparkles className="text-purple-400 animate-pulse" size={32} />
      </div>
      <p className="text-lg text-gray-500 font-light mb-6">
        A collection of precious moments
      </p>
      <div className="flex items-center justify-center gap-2">
        <Heart className="text-pink-300 fill-pink-300" size={16} />
        <span className="text-sm text-gray-400 font-light">Made with love for our little star</span>
        <Heart className="text-pink-300 fill-pink-300" size={16} />
      </div>
    </div>
  );
};

export default GalleryHeader;

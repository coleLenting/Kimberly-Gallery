
import React from 'react';
import { Heart } from 'lucide-react';
import { Photo } from '../types/photo';

interface PhotoCardProps {
  photo: Photo;
  isLiked: boolean;
  onLike: () => void;
  onClick: () => void;
}

const PhotoCard = ({ photo, isLiked, onLike, onClick }: PhotoCardProps) => {
  return (
    <div className="break-inside-avoid mb-6">
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] cursor-pointer">
        <div onClick={onClick} className="relative">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700 text-sm mb-1">{photo.title}</h3>
              <p className="text-xs text-gray-400">{photo.date}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className="group/heart p-2 rounded-full hover:bg-pink-50 transition-colors duration-200"
            >
              <Heart
                size={18}
                className={`transition-all duration-200 ${
                  isLiked
                    ? 'text-pink-500 fill-pink-500 scale-110'
                    : 'text-gray-300 group-hover/heart:text-pink-400 group-hover/heart:scale-110'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;

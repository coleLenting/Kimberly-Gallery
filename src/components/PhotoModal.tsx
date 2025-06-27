
import React from 'react';
import { X, Heart } from 'lucide-react';
import { Photo } from '../types/photo';

interface PhotoModalProps {
  photo: Photo;
  isLiked: boolean;
  onLike: () => void;
  onClose: () => void;
}

const PhotoModal = ({ photo, isLiked, onLike, onClose }: PhotoModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
        >
          <X size={20} className="text-gray-600" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          
          <div className="p-6 md:w-80 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-light text-gray-700 mb-2">{photo.title}</h2>
              <p className="text-gray-500 mb-4">{photo.date}</p>
              <p className="text-gray-600 leading-relaxed">{photo.description}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={onLike}
                className="flex items-center gap-2 w-full justify-center py-3 px-4 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors duration-200"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-200 ${
                    isLiked
                      ? 'text-pink-500 fill-pink-500'
                      : 'text-pink-400'
                  }`}
                />
                <span className="text-pink-600 font-medium">
                  {isLiked ? 'Loved!' : 'Love this photo'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;

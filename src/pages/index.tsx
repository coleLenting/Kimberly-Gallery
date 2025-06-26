
import React from 'react';
import GalleryHeader from '../components/GalleryHeader';
import PhotoGrid from '../components/PhotoGrid';
import { photos } from '../data/photos';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <GalleryHeader />
        <PhotoGrid photos={photos} />
      </div>
    </div>
  );
};

export default Index;

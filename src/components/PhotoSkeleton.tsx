
import React from 'react';
import { Skeleton } from './ui/skeleton';

const PhotoSkeleton = () => {
  // Random height for masonry effect
  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-60'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className="break-inside-avoid mb-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <Skeleton className={`w-full ${randomHeight} bg-gray-100`} />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2 bg-gray-100" />
              <Skeleton className="h-3 w-1/2 bg-gray-100" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSkeleton;

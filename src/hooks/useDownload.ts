import { useState } from 'react';
import { toast } from '@/components/ui/sonner';

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Download a photo from URL
   */
  const downloadPhoto = async (url: string, filename?: string) => {
    setIsDownloading(true);
    
    try {
      // Generate filename if not provided
      const finalFilename = filename || `gallery-photo-${new Date().toISOString().split('T')[0]}.jpg`;
      
      // Fetch the image
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      
      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = finalFilename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success('Photo downloaded successfully! 📥');
      
    } catch (error) {
      console.error('Error downloading photo:', error);
      toast.error('Failed to download photo. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadPhoto,
    isDownloading,
  };
};
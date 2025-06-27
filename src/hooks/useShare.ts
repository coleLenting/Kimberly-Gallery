import { useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface ShareData {
  url: string;
  caption: string;
  galleryUrl?: string;
}

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);

  /**
   * Share content using Web Share API or fallback to clipboard
   */
  const sharePhoto = async (data: ShareData) => {
    setIsSharing(true);
    
    try {
      const shareText = `Check out this beautiful photo! 
${data.caption}
${data.url}
${data.galleryUrl ? `\nView the full gallery: ${data.galleryUrl}` : ''}`;

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: 'Beautiful Photo from Isabella\'s Gallery',
          text: data.caption,
          url: data.url,
        };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success('Photo shared successfully! 📤');
          return;
        }
      }

      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText);
      toast.success('Photo link copied to clipboard! 📋');
      
    } catch (error) {
      console.error('Error sharing photo:', error);
      
      // Final fallback - try to copy just the URL
      try {
        await navigator.clipboard.writeText(data.url);
        toast.success('Photo URL copied to clipboard! 📋');
      } catch (clipboardError) {
        console.error('Clipboard fallback failed:', clipboardError);
        toast.error('Unable to share photo. Please try again.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return {
    sharePhoto,
    isSharing,
  };
};
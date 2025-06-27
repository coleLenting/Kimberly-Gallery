import { useEffect } from 'react';

interface KeyboardShortcuts {
  onFavorite?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onClose?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'f':
          event.preventDefault();
          shortcuts.onFavorite?.();
          break;
        case 's':
          event.preventDefault();
          shortcuts.onShare?.();
          break;
        case 'd':
          event.preventDefault();
          shortcuts.onDownload?.();
          break;
        case 'escape':
          event.preventDefault();
          shortcuts.onClose?.();
          break;
        case 'arrowright':
          event.preventDefault();
          shortcuts.onNext?.();
          break;
        case 'arrowleft':
          event.preventDefault();
          shortcuts.onPrevious?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
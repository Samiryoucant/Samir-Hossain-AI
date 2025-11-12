import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface ImagePreviewModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] w-full p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      >
        <img
          src={`data:image/jpeg;base64,${imageUrl}`}
          alt="AI Generated Preview"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
       <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close Preview"
        >
          <Icon name="close" className="w-6 h-6" />
        </button>
    </div>
  );
};
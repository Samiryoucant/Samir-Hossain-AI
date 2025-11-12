import React from 'react';
import { GeneratedImage } from '../types';
import { Icon } from './Icon';

interface ImageCardProps {
  image: GeneratedImage;
  onPreview: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onPreview }) => {
  const imageUrl = `data:image/jpeg;base64,${image.base64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${image.id}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <img
        src={imageUrl}
        alt="AI Generated Art"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
        <button
          onClick={onPreview}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-purple-400"
          aria-label="Preview Image"
        >
          <Icon name="zoom-in" className="w-6 h-6" />
        </button>
        <button
          onClick={handleDownload}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-purple-400"
          aria-label="Download Image"
        >
          <Icon name="download" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
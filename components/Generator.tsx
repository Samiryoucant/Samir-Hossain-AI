import React, { useState, useCallback } from 'react';
import { AspectRatio, GeneratedImage } from '../types';
import { generateImages } from '../services/geminiService';
import { ImageCard } from './ImageCard';
import { Icon } from './Icon';
import { Spinner } from './Spinner';
import { ImagePreviewModal } from './ImagePreviewModal';

interface GeneratorProps {
    credits: number;
    setCredits: (credits: number) => void;
}

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '1:1', label: 'Square' },
  { value: '16:9', label: 'Landscape' },
  { value: '9:16', label: 'Portrait' },
  { value: '4:3', label: 'Wide' },
  { value: '3:4', label: 'Tall' },
];

const stylePresets = [
    { name: 'Photorealistic', keywords: ', photorealistic, 8k, detailed, professional photography' },
    { name: 'Cinematic', keywords: ', cinematic lighting, dramatic, movie still, film grain' },
    { name: 'Illustration', keywords: ', illustration, digital painting, artstation' },
    { name: 'Anime', keywords: ', anime style, vibrant, detailed, studio ghibli inspired' },
    { name: 'Fantasy', keywords: ', fantasy art, epic, detailed, matte painting' },
    { name: 'Minimalist', keywords: ', minimalist, clean, simple, vector art' },
];

export const Generator: React.FC<GeneratorProps> = ({ credits, setCredits }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    const creditCost = 25 * numberOfImages;
    if (credits < creditCost) {
      setError(`You need ${creditCost} credits, but you only have ${credits}. Please upgrade your plan.`);
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    const fullPrompt = prompt + (selectedStyle || '');

    try {
      const imagesBase64 = await generateImages(fullPrompt, numberOfImages, aspectRatio);
      const newImages = imagesBase64.map((base64) => ({
        id: crypto.randomUUID(),
        base64,
      }));
      setGeneratedImages(newImages);
      setCredits(credits - creditCost);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, numberOfImages, aspectRatio, selectedStyle, credits, setCredits]);

  return (
    <section className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
          Create AI Images in Seconds
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Turn your imagination into stunning visuals. Describe what you want to see, and let our AI bring it to life.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              rows={3}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-purple-500 transition-colors"
              placeholder="e.g., A majestic lion wearing a crown, cinematic lighting..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Style Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style Preset</label>
            <div className="flex flex-wrap gap-2">
              {stylePresets.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(selectedStyle === style.keywords ? null : style.keywords)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all border ${
                    selectedStyle === style.keywords
                      ? 'bg-brand-purple-600 text-white border-brand-purple-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
                  }`}
                  disabled={isLoading}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Settings: Aspect Ratio & Number of Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aspect Ratio</label>
              <select
                id="aspectRatio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-purple-500 focus:border-brand-purple-500"
                disabled={isLoading}
              >
                {aspectRatios.map((ar) => (
                  <option key={ar.value} value={ar.value}>{ar.label} ({ar.value})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="numberOfImages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Images</label>
              <select
                id="numberOfImages"
                value={numberOfImages}
                onChange={(e) => setNumberOfImages(parseInt(e.target.value))}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-purple-500 focus:border-brand-purple-500"
                disabled={isLoading}
              >
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full flex items-center justify-center py-4 px-6 text-lg font-bold text-white bg-brand-purple-600 hover:bg-brand-purple-700 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              `Generate (${25 * numberOfImages} Credits)`
            )}
          </button>
        </div>
      </div>
      
      {/* Error Display */}
      {error && <div className="mt-6 text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg max-w-4xl mx-auto">{error}</div>}

      {/* Results Section */}
      <div className="mt-12">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: numberOfImages }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}
        {generatedImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generatedImages.map((image, index) => (
              <div key={image.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}>
                <ImageCard image={image} onPreview={() => setPreviewImage(image.base64)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {previewImage && <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />}
      
    </section>
  );
};
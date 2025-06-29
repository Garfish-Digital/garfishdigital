'use client';

import { useState, useEffect } from 'react';

interface BackgroundSwitcherProps {
  onBackgroundChange?: (imagePath: string) => void;
}

export default function BackgroundSwitcher({ onBackgroundChange }: BackgroundSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(true);

  // Generate list of background images - adjust filenames as needed
  useEffect(() => {
    const imageList: string[] = [];
    
    // Add your actual image filenames here
    for (let i = 1; i <= 18; i++) {
      imageList.push(`/backgrounds/bg-${i}.jpg`);
      imageList.push(`/backgrounds/image-${i}.png`);
      // Add more patterns based on your actual filenames
    }
    
    setImages(imageList.slice(0, 18)); // Limit to 18 images
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (images.length === 0) return;
          e.preventDefault();
          setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
          setShowOverlay(true);
          break;
        case 'ArrowRight':
          if (images.length === 0) return;
          e.preventDefault();
          setCurrentIndex(prev => (prev + 1) % images.length);
          setShowOverlay(true);
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          setShowOverlay(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  // Hide overlay after 3 seconds
  useEffect(() => {
    if (!showOverlay) return;
    
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showOverlay, currentIndex]);

  // Notify parent of background change
  useEffect(() => {
    if (images.length > 0 && onBackgroundChange) {
      onBackgroundChange(images[currentIndex]);
    }
  }, [currentIndex, images, onBackgroundChange]);

  const currentImage = images[currentIndex];
  const imageName = currentImage ? currentImage.split('/').pop()?.split('.')[0] : '';

  return (
    <>
      {showOverlay && (
        <div className="fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Background: {imageName || 'None'}</h3>
          <p className="text-sm text-gray-300">
            {images.length > 0 ? `${currentIndex + 1} of ${images.length}` : 'Add images to /public/backgrounds/'}
          </p>
          <div className="text-sm text-gray-400 mt-2">
            <p>← → Switch backgrounds</p>
            <p>H Hide controls</p>
            <p className="text-yellow-400 mt-1">Edit globals.css to test filters!</p>
          </div>
        </div>
      )}
    </>
  );
}
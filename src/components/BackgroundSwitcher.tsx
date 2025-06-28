'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundSwitcherProps {
  onBackgroundChange?: (imagePath: string) => void;
}

export default function BackgroundSwitcher({ onBackgroundChange }: BackgroundSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [showOverlay, setShowOverlay] = useState(true);

  // Generate list of 18 background images (assuming common formats)
  useEffect(() => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const imageList: string[] = [];
    
    // Generate potential filenames - you can adjust this based on your actual filenames
    for (let i = 1; i <= 18; i++) {
      for (const ext of imageExtensions) {
        imageList.push(`/backgrounds/bg-${i}.${ext}`);
        imageList.push(`/backgrounds/background-${i}.${ext}`);
        imageList.push(`/backgrounds/${i}.${ext}`);
      }
    }
    
    // Check which images actually exist
    const checkImages = async () => {
      const existingImages: string[] = [];
      
      for (const imagePath of imageList) {
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            existingImages.push(imagePath);
          }
        } catch {
          // Image doesn't exist, skip
        }
      }
      
      setImages(existingImages.slice(0, 18)); // Limit to 18 images
    };

    checkImages();
  }, []);

  // Preload current, next, and previous images
  const preloadImage = useCallback((imagePath: string) => {
    if (loadedImages.has(imagePath)) return;
    
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, imagePath]));
    };
    img.src = imagePath;
  }, [loadedImages]);

  // Preload images around current index
  useEffect(() => {
    if (images.length === 0) return;
    
    const currentImage = images[currentIndex];
    const nextImage = images[(currentIndex + 1) % images.length];
    const prevImage = images[(currentIndex - 1 + images.length) % images.length];
    
    preloadImage(currentImage);
    preloadImage(nextImage);
    preloadImage(prevImage);
  }, [currentIndex, images, preloadImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (images.length === 0) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
          setShowOverlay(true);
          break;
        case 'ArrowRight':
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

  if (images.length === 0) {
    return (
      <div className="fixed top-4 left-4 z-50 bg-black/50 text-white p-3 rounded-lg">
        <p>Loading backgrounds...</p>
        <p className="text-sm text-gray-300">Place your 18 images in /public/backgrounds/</p>
      </div>
    );
  }

  return (
    <>
      {/* Controls Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">Background: {imageName}</h3>
                <p className="text-sm text-gray-300">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
              <div className="text-sm text-gray-400">
                <p>← → Switch</p>
                <p>H Hide</p>
              </div>
            </div>
            
            {/* Loading indicator */}
            {!loadedImages.has(currentImage) && (
              <div className="mt-2 text-xs text-yellow-400">
                Loading...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick access indicator */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/30 text-white/70 p-2 rounded text-xs">
        Press H to toggle controls
      </div>
    </>
  );
}
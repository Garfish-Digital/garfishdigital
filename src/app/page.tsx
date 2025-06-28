'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Minimap from '@/components/Minimap';
import BackgroundSwitcher from '@/components/BackgroundSwitcher';

const pages = [
  { id: 'gallery', title: 'Gallery', gridColumn: '1/2', gridRow: '1/2', color: '#ff6b6b' },
  { id: 'about', title: 'About', gridColumn: '2/3', gridRow: '1/2', color: '#ffcc5c' },
  { id: 'home', title: 'Home', gridColumn: '1/3', gridRow: '2/3', color: '#88d8b0' },
  { id: 'contact', title: 'Contact', gridColumn: '1/2', gridRow: '3/4', color: '#4ecdc4' },
  { id: 'payment', title: 'Payment', gridColumn: '2/3', gridRow: '3/4', color: '#556270' },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentBackground, setCurrentBackground] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (!page || !wrapperRef.current) return;

    let scrollLeft = 0;
    let scrollTop = 0;

    switch (pageId) {
      case 'gallery':
        scrollLeft = 0;
        scrollTop = 0;
        break;
      case 'about':
        scrollLeft = window.innerWidth;
        scrollTop = 0;
        break;
      case 'home':
        scrollLeft = window.innerWidth / 2;
        scrollTop = window.innerHeight;
        break;
      case 'contact':
        scrollLeft = 0;
        scrollTop = window.innerHeight * 2;
        break;
      case 'payment':
        scrollLeft = window.innerWidth;
        scrollTop = window.innerHeight * 2;
        break;
    }

    wrapperRef.current.scrollTo({
      left: scrollLeft,
      top: scrollTop,
      behavior: 'smooth'
    });

    setCurrentPage(pageId);
  };

  useEffect(() => {
    scrollToPage('home');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: string } = {
        '7': 'gallery',
        '9': 'about', 
        '5': 'home',
        '1': 'contact',
        '3': 'payment'
      };

      if (keyMap[e.key]) {
        scrollToPage(keyMap[e.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div 
        ref={wrapperRef}
        className="w-screen h-screen overflow-scroll scrollbar-hide"
        style={{ 
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div 
          className="grid relative"
          style={{
            width: '200vw',
            height: '300vh',
            gridTemplateColumns: 'repeat(2, 100vw)',
            gridTemplateRows: 'repeat(3, 100vh)',
            backgroundImage: currentBackground ? `url(${currentBackground})` : 'none',
            backgroundSize: '200vw 300vh',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-center text-white font-sans text-5xl font-bold"
              style={{
                gridColumn: page.gridColumn,
                gridRow: page.gridRow,
                backgroundColor: currentBackground ? 'transparent' : page.color,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {page.title}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <BackgroundSwitcher 
        onBackgroundChange={setCurrentBackground}
      />

      <Minimap 
        currentPage={currentPage} 
        onPageClick={scrollToPage}
        pages={pages}
      />
    </>
  );
}

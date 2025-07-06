'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Minimap from '@/components/Minimap';
import { GlobeAltIcon, AtSymbolIcon, BeakerIcon, ChevronDoubleRightIcon, RectangleGroupIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import './gallery.css';

const pages = [
  { id: 'cell1', title: 'Portfolio', gridColumn: '1/2', gridRow: '1/2', color: '#ff6b6b' },
  { id: 'cell2', title: 'Experiments', gridColumn: '2/3', gridRow: '1/2', color: '#ffcc5c' },
  { id: 'cell3', title: 'Interactive Demos', gridColumn: '3/4', gridRow: '1/2', color: '#556270' },
  { id: 'cell4', title: 'Client Work', gridColumn: '1/2', gridRow: '2/3', color: '#4ecdc4' },
  { id: 'cell5', title: 'Home', gridColumn: '2/3', gridRow: '2/3', color: '#88d8b0' },
  { id: 'cell6', title: 'Tools', gridColumn: '3/4', gridRow: '2/3', color: '#9b59b6' },
  { id: 'cell7', title: 'About', gridColumn: '1/2', gridRow: '3/4', color: '#e67e22' },
  { id: 'cell8', title: 'Contact', gridColumn: '2/3', gridRow: '3/4', color: '#34495e' },
  { id: 'cell9', title: 'Blog', gridColumn: '3/4', gridRow: '3/4', color: '#95a5a6' },
];

const demoCards = {
  cell1: {
    title: 'Black Lodge Brews',
    subtitle: 'Micro Brewery Taproom',
    url: 'https://blacklodgebrews-demo.netlify.app',
    effects: ['Responsive design', 'Performance optimized', 'Modern aesthetics'],
    hoverColors: {
      border: 'hover:border-blue-500/50',
      shadow: 'hover:shadow-blue-500/20',
      gradient: 'from-blue-500/20 to-blue-500/10',
      text: 'text-blue-500'
    }
  },
  cell2: {
    title: 'Lab Experiments',
    subtitle: 'Innovation Station',
    url: 'https://infernoink-demo.netlify.app',
    effects: ['WebGL shaders', 'AI integration', 'Real-time effects'],
    hoverColors: {
      border: 'hover:border-yellow-500/50',
      shadow: 'hover:shadow-yellow-500/20',
      gradient: 'from-yellow-500/20 to-yellow-500/10',
      text: 'text-yellow-500'
    }
  },
  cell3: {
    title: 'Inferno Ink',
    subtitle: 'Hell Hath No Fury',
    url: 'https://infernoink-demo.netlify.app',
    effects: ['Fire particles', 'Custom cursor', 'Animated scrolling'],
    hoverColors: {
      border: 'hover:border-red-500/50',
      shadow: 'hover:shadow-red-500/20',
      gradient: 'from-red-500/20 to-red-500/10',
      text: 'text-red-500'
    }
  },
  cell4: {
    title: 'Client Projects',
    subtitle: 'Professional Solutions',
    url: 'https://infernoink-demo.netlify.app',
    effects: ['Custom frameworks', 'Enterprise scale', 'Security focused'],
    hoverColors: {
      border: 'hover:border-teal-500/50',
      shadow: 'hover:shadow-teal-500/20',
      gradient: 'from-teal-500/20 to-teal-500/10',
      text: 'text-teal-500'
    }
  },
  cell6: {
    title: 'Obsidian Peaks',
    subtitle: 'Snowboarding Lessons & Tours',
    url: 'https://obsidianpeaks-demo.netlify.app',
    effects: ['CLI automation', 'Code generation', 'Testing frameworks'],
    hoverColors: {
      border: 'hover:border-purple-500/50',
      shadow: 'hover:shadow-purple-500/20',
      gradient: 'from-purple-500/20 to-purple-500/10',
      text: 'text-purple-500'
    }
  },
  cell7: {
    title: 'Our Story',
    subtitle: 'Digital Craftsmen',
    url: 'https://infernoink-demo.netlify.app',
    effects: ['User-centered design', 'Agile methodology', 'Continuous learning'],
    hoverColors: {
      border: 'hover:border-orange-500/50',
      shadow: 'hover:shadow-orange-500/20',
      gradient: 'from-orange-500/20 to-orange-500/10',
      text: 'text-orange-500'
    }
  },
  cell8: {
    title: 'Get In Touch',
    subtitle: 'Start Your Project',
    url: '/contact',
    effects: ['Free consultation', 'Project planning', 'Custom solutions'],
    hoverColors: {
      border: 'hover:border-slate-500/50',
      shadow: 'hover:shadow-slate-500/20',
      gradient: 'from-slate-500/20 to-slate-500/10',
      text: 'text-slate-500'
    }
  },
  cell9: {
    title: 'Hearth & Harrow',
    subtitle: 'Divination Supplies',
    url: 'https://hearthandharrow-demo.netlify.app',
    effects: ['Technical deep-dives', 'Industry trends', 'Best practices'],
    hoverColors: {
      border: 'hover:border-gray-500/50',
      shadow: 'hover:shadow-gray-500/20',
      gradient: 'from-gray-500/20 to-gray-500/10',
      text: 'text-gray-500'
    }
  }
};

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState('cell5');
  const [showTechCard, setShowTechCard] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (!page || !wrapperRef.current) return;

    let scrollLeft = 0;
    let scrollTop = 0;

    switch (pageId) {
      case 'cell1':
        scrollLeft = 0;
        scrollTop = 0;
        break;
      case 'cell2':
        scrollLeft = window.innerWidth;
        scrollTop = 0;
        break;
      case 'cell3':
        scrollLeft = window.innerWidth * 2;
        scrollTop = 0;
        break;
      case 'cell4':
        scrollLeft = 0;
        scrollTop = window.innerHeight;
        break;
      case 'cell5':
        scrollLeft = window.innerWidth;
        scrollTop = window.innerHeight;
        break;
      case 'cell6':
        scrollLeft = window.innerWidth * 2;
        scrollTop = window.innerHeight;
        break;
      case 'cell7':
        scrollLeft = 0;
        scrollTop = window.innerHeight * 2;
        break;
      case 'cell8':
        scrollLeft = window.innerWidth;
        scrollTop = window.innerHeight * 2;
        break;
      case 'cell9':
        scrollLeft = window.innerWidth * 2;
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
    // Initialize scroll position to cell5 without animation
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: window.innerWidth,
        top: window.innerHeight,
        behavior: 'auto' // No animation on initial load
      });
    }
  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close tech card modal with ESC
      if (e.key === 'Escape' && showTechCard) {
        setShowTechCard(false);
        return;
      }

      const keyMap: { [key: string]: string } = {
        '1': 'cell1',
        '2': 'cell2',
        '3': 'cell3',
        '4': 'cell4',
        '5': 'cell5',
        '6': 'cell6',
        '7': 'cell7',
        '8': 'cell8',
        '9': 'cell9'
      };

      if (keyMap[e.key]) {
        scrollToPage(keyMap[e.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTechCard]);

  // Tech card data for each cell
  const getTechCardData = (cellId: string) => {
    const techData = {
      cell1: {
        title: 'Portfolio Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell2: {
        title: 'Experiment Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell3: {
        title: 'Interactive Demo Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell4: {
        title: 'Client Work Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell6: {
        title: 'Tools Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell7: {
        title: 'About Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell8: {
        title: 'Contact Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      },
      cell9: {
        title: 'Blog Techniques',
        items: ['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed', 'Do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna', 'Aliqua enim ad', 'Minim veniam quis']
      }
    };
    return techData[cellId as keyof typeof techData] || null;
  };

  const handleTechCardOpen = () => {
    // Only show tech card if not on center cell
    if (currentPage !== 'cell5') {
      setShowTechCard(true);
    }
  };

  const handleTechCardClose = () => {
    setShowTechCard(false);
  };

  const handleRandomNavigation = () => {
    // Get all pages except cell5
    const availablePages = pages.filter(page => page.id !== 'cell5');
    // Pick a random page
    const randomPage = availablePages[Math.floor(Math.random() * availablePages.length)];
    scrollToPage(randomPage.id);
  };

  // 3D Tilt Effect Functions
  const createTiltHandlers = () => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = e.currentTarget;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate position relative to center (-0.5 to 0.5)
        const rotX = (mouseY - centerY) / rect.height;
        const rotY = (mouseX - centerX) / rect.width;

        // Tilt strength settings
        const tiltStrength = 0.15;
        const parallaxStrength = 8;

        // Calculate tilt angles
        const tiltY = -rotY * (tiltStrength * 100);
        const tiltX = rotX * (tiltStrength * 100);

        // Calculate parallax translation
        const parallaxX = -rotY * parallaxStrength;
        const parallaxY = -rotX * parallaxStrength;

        // Calculate dynamic shadow (opposite to tilt direction for realistic lighting)
        const shadowStrength = 20; // Base shadow strength
        const shadowX = rotY * shadowStrength; // Shadow moves opposite to horizontal tilt
        const shadowY = rotX * shadowStrength; // Shadow moves opposite to vertical tilt
        const shadowBlur = 15 + Math.abs(rotX * 10) + Math.abs(rotY * 10); // Dynamic blur based on tilt intensity

        target.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(${parallaxX}px) translateY(${parallaxY}px)`;
        target.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3)`;
        target.style.transition = 'none';
      });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = e.currentTarget;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)';
        target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)'; // Return to subtle base shadow
        target.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
      });
    };

    return { handleMouseMove, handleMouseLeave };
  };

  const { handleMouseMove: handleTiltMove, handleMouseLeave: handleTiltLeave } = createTiltHandlers();

  const renderDemoCard = (cardData: typeof demoCards.cell1) => {
    return (
      <div className="h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
        <motion.a
          href={cardData.url}
          target={cardData.url.startsWith('http') ? "_blank" : undefined}
          rel={cardData.url.startsWith('http') ? "noopener noreferrer" : undefined}
          className={`group relative bg-black backdrop-blur-sm rounded-lg border border-white/10 p-4 sm:p-6 md:p-8 transition-all duration-300 ${cardData.hoverColors.border} hover:shadow-lg ${cardData.hoverColors.shadow} w-80 sm:w-96 md:w-[420px]`}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cardData.hoverColors.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>{cardData.title}</h3>
              </div>
              
              <p className={`${cardData.hoverColors.text} font-medium mb-4 sm:mb-6 italic text-base sm:text-lg leading-relaxed`} style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>{cardData.subtitle}</p>
              
              <div className="space-y-2 mb-6 sm:mb-8 flex-1">
                <p className="text-white/60 text-xs sm:text-sm font-medium" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>Features:</p>
                <ul className="text-white/80 text-xs sm:text-sm space-y-1" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>
                  {cardData.effects.map((effect, index) => (
                    <li key={index}>• {effect}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center text-white/70 group-hover:text-white transition-colors mt-auto">
                <span className="text-xs sm:text-sm font-medium" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>{cardData.url.startsWith('http') ? 'View Live Demo' : 'Explore'}</span>
                <ChevronDoubleRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                <RectangleGroupIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </div>
            </div>
          </motion.a>
      </div>
    );
  };

  const getPageContent = (pageId: string) => {
    if (pageId === 'cell5') {
      return (
        <div className="relative w-full h-full">
          {/* Static Black Logo - Upper Left Corner */}
          <motion.div 
            className="fixed top-8 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="back-text" 
              style={{ 
                color: '#000000',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              garfish digital
            </div>
          </motion.div>
        </div>
      );
    }

    const cardData = demoCards[pageId as keyof typeof demoCards];
    if (cardData) {
      return renderDemoCard(cardData);
    }

    return null;
  };

  return (
    <>
      {/* Navigation Icons - Bottom Right */}
      <div className="bottom-nav-container">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link 
            href="/"
            className="transition-all duration-300 hover:brightness-150"
            title="Back to Home"
          >
            <GlobeAltIcon className="home-icon gallery-page-home-icon drop-shadow-lg" />
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link 
            href="/contact"
            className="transition-all duration-300 hover:brightness-150"
            title="Contact"
          >
            <AtSymbolIcon className="home-icon gallery-page-contact-icon drop-shadow-lg" />
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {currentPage === 'cell5' ? (
              <motion.button
                key="random-nav"
                onClick={handleRandomNavigation}
                className="transition-all duration-300 hover:brightness-150"
                title="Explore Random Page"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
              >
                <ArrowsPointingOutIcon className="home-icon gallery-page-home-icon drop-shadow-lg" />
              </motion.button>
            ) : (
              <motion.button
                key="tech-card"
                onClick={handleTechCardOpen}
                className="transition-all duration-300 hover:brightness-150"
                title="View Techniques"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <BeakerIcon className="home-icon gallery-page-home-icon drop-shadow-lg" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div 
        ref={wrapperRef}
        className="w-screen h-screen overflow-hidden gallery-wrapper"
      >
        <div 
          className="grid relative gallery-grid"
        >
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center justify-center text-black gallery-page-item gallery-page-${page.id}`}
            >
              {getPageContent(page.id)}
            </div>
          ))}
        </div>
      </div>

      <Minimap 
        currentPage={currentPage} 
        onPageClick={scrollToPage}
        pages={pages}
      />

      {/* Hip & Soothing Tech Card Modal */}
      <AnimatePresence>
        {showTechCard && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleTechCardClose}
          >
            <motion.div
              className="w-full max-w-4xl mx-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between p-6 border-b border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>
                  {getTechCardData(currentPage)?.title || 'Techniques Involved'}
                </h2>
                <motion.button
                  onClick={handleTechCardClose}
                  className="text-white/60 hover:text-white transition-colors p-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </motion.div>

              {/* Content */}
              <motion.div 
                className="p-6 max-h-[60vh] overflow-y-auto text-white/80 leading-relaxed" 
                style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="space-y-4">
                  <ul className="text-white space-y-3">
                    {getTechCardData(currentPage)?.items.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                      >
                        <span className="text-white/60 mr-3">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div 
                className="p-6 border-t border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="text-white/50 text-sm" style={{ fontFamily: 'system-ui, Arial, "Helvetica Neue", Helvetica, sans-serif' }}>Technical implementation details</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
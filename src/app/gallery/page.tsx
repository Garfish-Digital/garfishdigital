'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Minimap from '@/components/Minimap';
import { HomeModernIcon } from '@heroicons/react/24/solid';

const pages = [
  { id: 'portfolio', title: 'Portfolio', gridColumn: '1/2', gridRow: '1/2', color: '#ff6b6b' },
  { id: 'experiments', title: 'Experiments', gridColumn: '2/3', gridRow: '1/2', color: '#ffcc5c' },
  { id: 'demos', title: 'Interactive Demos', gridColumn: '3/4', gridRow: '1/2', color: '#556270' },
  { id: 'clients', title: 'Client Work', gridColumn: '1/2', gridRow: '2/3', color: '#4ecdc4' },
  { id: 'showcase', title: 'Home', gridColumn: '2/3', gridRow: '2/3', color: '#88d8b0' },
  { id: 'tools', title: 'Tools', gridColumn: '3/4', gridRow: '2/3', color: '#9b59b6' },
  { id: 'about', title: 'About', gridColumn: '1/2', gridRow: '3/4', color: '#e67e22' },
  { id: 'contact', title: 'Contact', gridColumn: '2/3', gridRow: '3/4', color: '#34495e' },
  { id: 'blog', title: 'Blog', gridColumn: '3/4', gridRow: '3/4', color: '#95a5a6' },
];

export default function Gallery() {
  const [currentPage, setCurrentPage] = useState('showcase');
  const [showTypedText, setShowTypedText] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (!page || !wrapperRef.current) return;

    let scrollLeft = 0;
    let scrollTop = 0;

    switch (pageId) {
      case 'portfolio':
        scrollLeft = 0;
        scrollTop = 0;
        break;
      case 'experiments':
        scrollLeft = window.innerWidth;
        scrollTop = 0;
        break;
      case 'demos':
        scrollLeft = window.innerWidth * 2;
        scrollTop = 0;
        break;
      case 'clients':
        scrollLeft = 0;
        scrollTop = window.innerHeight;
        break;
      case 'showcase':
        scrollLeft = window.innerWidth;
        scrollTop = window.innerHeight;
        break;
      case 'tools':
        scrollLeft = window.innerWidth * 2;
        scrollTop = window.innerHeight;
        break;
      case 'about':
        scrollLeft = 0;
        scrollTop = window.innerHeight * 2;
        break;
      case 'contact':
        scrollLeft = window.innerWidth;
        scrollTop = window.innerHeight * 2;
        break;
      case 'blog':
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
    scrollToPage('showcase');
  }, []);

  // Start typing effect when component mounts and on showcase page
  useEffect(() => {
    if (currentPage === 'showcase') {
      const timer = setTimeout(() => {
        setShowTypedText(true);
      }, 1000); // Start typing after 1 second delay

      return () => clearTimeout(timer);
    } else {
      setShowTypedText(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: string } = {
        '7': 'portfolio',
        '8': 'experiments',
        '9': 'demos',
        '4': 'clients',
        '5': 'showcase',
        '6': 'tools',
        '1': 'about',
        '2': 'contact',
        '3': 'blog'
      };

      if (keyMap[e.key]) {
        scrollToPage(keyMap[e.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getPageContent = (pageId: string) => {
    switch (pageId) {
      case 'portfolio':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Portfolio</h2>
              <p className="text-xl text-white/80">Curated collection of our finest work</p>
            </motion.div>
          </div>
        );
      case 'experiments':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Experiments</h2>
              <p className="text-xl text-white/80">Pushing boundaries with cutting-edge tech</p>
            </motion.div>
          </div>
        );
      case 'demos':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Interactive Demos</h2>
              <p className="text-xl text-white/80">Experience our technical capabilities</p>
              <Link 
                href="/gallery/interactive-nav"
                className="inline-block mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-lg"
              >
                Navigation System Demo →
              </Link>
            </motion.div>
          </div>
        );
      case 'clients':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Client Work</h2>
              <p className="text-xl text-white/80">Transforming visions into digital reality</p>
            </motion.div>
          </div>
        );
      case 'showcase':
        return (
          <div className="relative w-full h-full">
            {/* Typed Text Effect - Upper Left Corner */}
            {showTypedText && (
              <div className="absolute top-8 left-8 z-20">
                <section className="typed-text animate">
                  <div className="typing-text">
                    <span className="typed-text-1">&lt;garfishdigital&gt;</span><br />
                    <span className="typed-text-2">&nbsp;&nbsp;&lt;h1&gt;Web design and development&lt;/h1&gt;</span><br />
                    <span className="typed-text-3">&lt;/garfishdigital&gt;</span><br />
                  </div>
                </section>
              </div>
            )}
            
            {/* Main Content - Centered */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl font-bold mb-6">Gallery Home</h1>
                  <p className="text-2xl text-white/80 mb-8">Navigate through our creative universe</p>
                  <div className="text-lg text-white/60 space-y-2">
                    <p>Use keyboard numpad or click the minimap to explore</p>
                    <p>9 sections to discover</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      case 'tools':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Tools</h2>
              <p className="text-xl text-white/80">Development utilities and resources</p>
            </motion.div>
          </div>
        );
      case 'about':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">About</h2>
              <p className="text-xl text-white/80">Our story and philosophy</p>
            </motion.div>
          </div>
        );
      case 'contact':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Contact</h2>
              <p className="text-xl text-white/80">Get in touch with us</p>
              <Link 
                href="/contact"
                className="inline-block mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-lg"
              >
                Contact Form →
              </Link>
            </motion.div>
          </div>
        );
      case 'blog':
        return (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-4">Blog</h2>
              <p className="text-xl text-white/80">Insights and thoughts from our team</p>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Home Icon - Fixed Position Upper Right */}
      <Link 
        href="/"
        className="fixed top-8 right-8 z-50 transition-all duration-300 hover:brightness-150"
        title="Back to Home"
      >
        <HomeModernIcon className="w-12 h-12 text-white/80 drop-shadow-lg" />
      </Link>

      <div 
        ref={wrapperRef}
        className="w-screen h-screen overflow-hidden"
        style={{ 
          scrollBehavior: 'smooth'
        }}
      >
        <div 
          className="grid relative"
          style={{
            width: '300vw',
            height: '300vh',
            gridTemplateColumns: 'repeat(3, 100vw)',
            gridTemplateRows: 'repeat(3, 100vh)',
            background: `
              radial-gradient(at 40% 80%, #4A4A4A 0px, transparent 50%),
              radial-gradient(at 80% 20%, #2F2F2F 0px, transparent 70%),
              radial-gradient(at 0% 50%, #5A5A5A 0px, transparent 90%),
              #0A0A0A
            `
          }}
        >
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-center text-white font-sans"
              style={{
                gridColumn: page.gridColumn,
                gridRow: page.gridRow,
                backgroundColor: page.id === 'showcase' ? undefined : page.color,
                background: page.id === 'showcase' ? `
                  radial-gradient(at 40% 20%, #4A4A4A 0px, transparent 50%),
                  radial-gradient(at 80% 80%, #2F2F2F 0px, transparent 70%),
                  radial-gradient(at 0% 50%, #5A5A5A 0px, transparent 90%),
                  #0A0A0A
                ` : undefined,
              }}
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

      {/* Gallery Navigation Info */}
      <div className="fixed bottom-4 right-4 z-40 bg-black/80 text-white p-3 rounded-lg text-sm">
        <h4 className="font-semibold mb-1">Gallery Navigation</h4>
        <p className="text-xs text-gray-300">Multi-dimensional portfolio exploration</p>
        <p className="text-xs text-gray-400 mt-1">Numpad 1-9 Navigate | Click Minimap</p>
      </div>
    </>
  );
}
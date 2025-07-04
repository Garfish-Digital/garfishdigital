'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Minimap from '@/components/Minimap';
import { HomeModernIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import './gallery.css';

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
          <div className="h-full p-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-5xl font-bold mb-4">Interactive Demos</h2>
              <p className="text-xl text-white/80">Experience our technical capabilities</p>
            </motion.div>

            {/* Featured Project */}
            <div className="flex-1 flex items-center justify-center">
              <motion.a
                href="https://infernoink-demo.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-8 transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Red glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-bold text-white">Inferno Ink</h3>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  
                  <p className="text-red-400 font-medium mb-6 italic text-lg">Hell Hath No Fury</p>
                  
                  <div className="space-y-2 mb-8">
                    <p className="text-white/60 text-sm font-medium">Effects:</p>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Fire particles</li>
                      <li>• Custom cursor</li>
                      <li>• Animated scrolling</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center text-white/70 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">View Live Demo</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>
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
            
            {/* Main Content - Golden Section Bottom Right */}
            {/* <div className="absolute bottom-0 right-0 w-full h-full">
              <div className="absolute gallery-showcase-position">
                <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl font-bold mb-6 gallery-showcase-heading">see our work</h1>
                </motion.div>
                </div>
              </div>
            </div> */}
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
        <HomeModernIcon className="home-icon gallery-page-home-icon drop-shadow-lg" />
      </Link>
      
      {/* Contact Icon - Fixed Position Upper Right */}
      <Link 
        href="/contact"
        className="fixed right-8 z-50 transition-all duration-300 hover:brightness-150"
        title="Contact"
      >
        <AtSymbolIcon className="home-icon gallery-page-contact-icon drop-shadow-lg" />
      </Link>

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
    </>
  );
}
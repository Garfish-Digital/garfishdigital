'use client';

import { motion } from 'framer-motion';

interface Page {
  id: string;
  title: string;
  gridColumn: string;
  gridRow: string;
  color: string;
}

interface MinimapProps {
  currentPage: string;
  onPageClick: (pageId: string) => void;
  pages: Page[];
}

export default function Minimap({ currentPage, onPageClick, pages }: MinimapProps) {
  // Dynamic positioning logic - position minimap on side nearest to Home from current page
  const getMinimapPosition = (pageId: string) => {
    switch (pageId) {
      // Top row - minimap goes to bottom (toward Home)
      case 'portfolio':
        return { bottom: '2rem', right: '2rem' }; // bottom-right toward Home
      case 'experiments':
        return { bottom: '2rem', left: 'calc(50% - 75px)' }; // bottom center toward Home
      case 'demos':
        return { bottom: '2rem', left: '2rem' }; // bottom-left toward Home
      
      // Middle row  
      case 'clients':
        return { top: 'calc(50% - 75px)', right: '2rem' }; // right side toward Home
      case 'showcase':
        return { top: 'calc(50% - 75px)', left: 'calc(50% - 75px)' }; // perfectly centered on Home
      case 'tools':
        return { top: 'calc(50% - 75px)', left: '2rem' }; // left side toward Home
      
      // Bottom row - minimap goes to top (toward Home)
      case 'about':
        return { top: '2rem', right: '2rem' }; // top-right toward Home
      case 'contact':
        return { top: '2rem', left: 'calc(50% - 75px)' }; // top center toward Home
      case 'blog':
        return { top: '2rem', left: '2rem' }; // top-left toward Home
      
      default:
        return { top: 'calc(50% - 75px)', left: 'calc(50% - 75px)' };
    }
  };

  // Map page IDs to their 3x3 grid positions
  const getGridPosition = (pageId: string) => {
    const positions = {
      'portfolio': { row: 1, col: 1 },
      'experiments': { row: 1, col: 2 },
      'demos': { row: 1, col: 3 },
      'clients': { row: 2, col: 1 },
      'showcase': { row: 2, col: 2 }, // Home in center
      'tools': { row: 2, col: 3 },
      'about': { row: 3, col: 1 },
      'contact': { row: 3, col: 2 },
      'blog': { row: 3, col: 3 },
    };
    return positions[pageId as keyof typeof positions] || { row: 2, col: 2 };
  };

  const position = getMinimapPosition(currentPage);

  return (
    <motion.div
      className="fixed z-50 pointer-events-auto"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      layout
    >
      {/* 3x3 Grid Container */}
      <div 
        className="relative p-2 rounded-lg backdrop-blur-sm"
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        
        {/* 3x3 Grid */}
        <div 
          className="grid gap-1 h-full relative z-10"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => {
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;
            
            // Find page that matches this grid position
            const page = pages.find(p => {
              const pos = getGridPosition(p.id);
              return pos.row === row && pos.col === col;
            });
            
            const isActive = page && currentPage === page.id;
            const isCenter = row === 2 && col === 2; // Home position
            
            return (
              <motion.button
                key={`${row}-${col}`}
                className={`
                  relative text-xs font-bold cursor-pointer rounded-sm
                  flex items-center justify-center transition-all duration-200
                  ${isActive ? 'text-white' : 'text-gray-400'}
                  ${isCenter ? 'border-2' : 'border'}
                  ${!isActive && page ? 'glitch-border' : ''}
                `}
                style={{
                  border: isActive 
                    ? '2px solid rgba(255, 255, 255, 0.8)' 
                    : isCenter 
                    ? '2px solid rgba(255, 255, 255, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: isActive 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : isCenter 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: isActive 
                    ? '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)' 
                    : 'none',
                  animationDelay: !isActive && page ? `${(row + col) * 0.6}s` : undefined,
                }}
                onClick={() => page && onPageClick(page.id)}
                disabled={!page}
                whileHover={page ? { 
                  scale: 1.1,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.6)'
                } : {}}
                whileTap={page ? { scale: 0.9 } : {}}
              >
                {page && (
                  <span className="text-center leading-tight relative z-10">
                    {page.id === 'showcase' ? 'H' : page.title.charAt(0)}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
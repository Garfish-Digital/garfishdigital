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
      case 'cell1':
        return { bottom: '2rem', right: '2rem' }; // bottom-right toward Home
      case 'cell2':
        return { bottom: '2rem', left: 'calc(50% - 75px)' }; // bottom center toward Home
      case 'cell3':
        return { bottom: '2rem', left: '2rem' }; // bottom-left toward Home
      
      // Middle row  
      case 'cell4':
        return { top: 'calc(50% - 75px)', right: '2rem' }; // right side toward Home
      case 'cell5':
        return { top: 'calc(50% - 75px)', left: 'calc(50% - 75px)' }; // perfectly centered on Home
      case 'cell6':
        return { top: 'calc(50% - 75px)', left: '2rem' }; // left side toward Home
      
      // Bottom row - minimap goes to top (toward Home)
      case 'cell7':
        return { top: '2rem', right: '2rem' }; // top-right toward Home
      case 'cell8':
        return { top: '2rem', left: 'calc(50% - 75px)' }; // top center toward Home
      case 'cell9':
        return { top: '2rem', left: '2rem' }; // top-left toward Home
      
      default:
        return { top: 'calc(50% - 75px)', left: 'calc(50% - 75px)' };
    }
  };

  // Map page IDs to their 3x3 grid positions
  const getGridPosition = (pageId: string) => {
    const positions = {
      'cell1': { row: 1, col: 1 },
      'cell2': { row: 1, col: 2 },
      'cell3': { row: 1, col: 3 },
      'cell4': { row: 2, col: 1 },
      'cell5': { row: 2, col: 2 }, // Home in center
      'cell6': { row: 2, col: 3 },
      'cell7': { row: 3, col: 1 },
      'cell8': { row: 3, col: 2 },
      'cell9': { row: 3, col: 3 },
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
          backgroundColor: '#555555',
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
            
            return (
              <motion.button
                key={`${row}-${col}`}
                className={`
                  relative cursor-pointer rounded-sm
                  flex items-center justify-center transition-all duration-50
                  ${isActive ? '' : ''}
                `}
                style={{
                    border : '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: isActive 
                    ? 'rgba(170, 170, 170)'
                    : 'rgba(255, 255, 255, 0.05)',
                }}
                onClick={() => page && onPageClick(page.id)}
                disabled={!page}
                whileHover={page ? { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                } : {}}
                whileTap={page ? { scale: 0.9 } : {}}
              >
                {/* No text content - just empty buttons */}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
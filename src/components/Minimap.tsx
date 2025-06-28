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
  const getMinimapPosition = (pageId: string) => {
    switch (pageId) {
      case 'home':
        return { top: '2rem', right: '2rem' };
      case 'gallery':
        return { bottom: '2rem', right: '2rem' };
      case 'about':
        return { bottom: '2rem', left: '2rem' };
      case 'contact':
        return { top: '2rem', right: '2rem' };
      case 'payment':
        return { top: '2rem', left: '2rem' };
      default:
        return { top: '2rem', right: '2rem' };
    }
  };

  const getMinimapCellPosition = (pageId: string) => {
    switch (pageId) {
      case 'gallery':
        return { gridColumn: '1/2', gridRow: '1/2' };
      case 'about':
        return { gridColumn: '2/3', gridRow: '1/2' };
      case 'home':
        return { gridColumn: '1/3', gridRow: '2/3' };
      case 'contact':
        return { gridColumn: '1/2', gridRow: '3/4' };
      case 'payment':
        return { gridColumn: '2/3', gridRow: '3/4' };
      default:
        return { gridColumn: '1/2', gridRow: '1/2' };
    }
  };

  const position = getMinimapPosition(currentPage);

  return (
    <motion.div
      className="fixed z-50 pointer-events-auto"
      style={position}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div 
        className="grid gap-1 p-2 rounded-lg backdrop-blur-sm"
        style={{
          width: '120px',
          height: '180px',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        {pages.map((page) => {
          const cellPosition = getMinimapCellPosition(page.id);
          const isActive = currentPage === page.id;
          
          return (
            <motion.button
              key={page.id}
              className={`
                relative text-xs font-medium cursor-pointer rounded-sm
                flex items-center justify-center transition-all duration-200
                ${isActive ? 'text-white' : 'text-[#43695B]'}
              `}
              style={{
                gridColumn: cellPosition.gridColumn,
                gridRow: cellPosition.gridRow,
                border: `2px solid #43695B`,
                backgroundColor: isActive ? 'rgba(124, 179, 66, 0.2)' : 'transparent',
                boxShadow: isActive ? '0 0 10px rgba(124, 179, 66, 0.5)' : 'none',
              }}
              onClick={() => onPageClick(page.id)}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(124, 179, 66, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-center leading-tight">
                {page.title}
              </span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-sm"
                  style={{
                    backgroundColor: 'rgba(124, 179, 66, 0.3)',
                    boxShadow: '0 0 15px rgba(124, 179, 66, 0.6), inset 0 0 15px rgba(124, 179, 66, 0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
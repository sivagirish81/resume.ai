import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const CAT_IMAGE = '/cat.jpg'; // Make sure cat.jpg is in public/
const NUM_CATS = 18;
const GRID_COLS = 6;
const GRID_ROWS = 3;

// Generate a grid of positions to minimize overlap
const createGridPositions = (cols: number, rows: number) => {
  const positions = [];
  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        x: col * cellWidth + cellWidth / 2,
        y: row * cellHeight + cellHeight / 2,
      });
    }
  }
  return positions;
};

// Shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface CatAnim {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  direction: number;
  duration: number;
  delay: number;
  size: number;
}

const FloatingCats: React.FC = () => {
  const [catAnims, setCatAnims] = useState<CatAnim[]>([]);

  useEffect(() => {
    const grid = createGridPositions(GRID_COLS, GRID_ROWS);
    const positions = shuffleArray(grid).slice(0, NUM_CATS);
    const anims: CatAnim[] = positions.map(pos => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const movement = 12 + Math.random() * 10;
      const startX = pos.x;
      const startY = pos.y;
      const endX = Math.max(0, Math.min(100, startX + direction * movement));
      const endY = Math.max(0, Math.min(100, startY + (Math.random() - 0.5) * movement));
      return {
        startX,
        startY,
        endX,
        endY,
        direction,
        duration: 18 + Math.random() * 10,
        delay: Math.random() * 6,
        size: 70 + Math.random() * 30,
      };
    });
    setCatAnims(anims);
  }, []);

  // Generate keyframes for each cat
  const keyframes = catAnims.map((anim, i) => `
    @keyframes cat-crawl-${i} {
      0% {
        top: ${anim.startY}%;
        left: ${anim.startX}%;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
      }
      40% {
        top: ${anim.endY}%;
        left: ${anim.endX}%;
        transform: translate(-50%, -50%) scale(1.08) rotate(${anim.direction * 8}deg);
      }
      60% {
        top: ${anim.endY}%;
        left: ${anim.endX}%;
        transform: translate(-50%, -50%) scale(1.08) rotate(${anim.direction * -8}deg);
      }
      100% {
        top: ${anim.startY}%;
        left: ${anim.startX}%;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
      }
    }
  `).join('\n');

  return (
    <>
      <style>{keyframes}</style>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 0.03) 100%)',
            zIndex: 1,
          },
        }}
      >
        {catAnims.map((anim, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: anim.size,
              height: anim.size,
              top: `${anim.startY}%`,
              left: `${anim.startX}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.85,
              zIndex: 2,
              animation: `cat-crawl-${i} ${anim.duration}s ease-in-out infinite`,
              animationDelay: `${anim.delay}s`,
              filter: 'drop-shadow(0 0 16px rgba(99,102,241,0.18)) drop-shadow(0 0 32px rgba(99,102,241,0.10))',
              transition: 'filter 0.3s',
              '&:hover': {
                opacity: 1,
                filter: 'drop-shadow(0 0 32px rgba(99,102,241,0.25)) drop-shadow(0 0 64px rgba(99,102,241,0.18))',
                transition: 'filter 0.3s',
              },
            }}
          >
            <img
              src={CAT_IMAGE}
              alt="Crawling cat"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '16px',
                pointerEvents: 'auto',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FloatingCats; 
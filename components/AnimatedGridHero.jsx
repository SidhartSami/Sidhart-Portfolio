import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TypingAnimation } from './ui/typing-animation';

const AnimatedGridHero = ({ scrollToProjects }) => {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Grid configuration
    const cellSize = 16;
    const gap = 4;
    const totalSize = cellSize + gap;
    
    const isDark = resolvedTheme === 'dark';
    
    const darkColors = [
      '#0d1117', // near-black
      '#161b22', // deep charcoal
      '#1e2530', // dark grey
      '#2d3748', // dark slate
      '#3a4a5e', // muted graphite
    ];

    const lightColors = [
      '#f8f9fa', // off-white
      '#f1f3f5', // very light grey
      '#e9ecef', // light grey
      '#dee2e6', // soft grey
      '#ced4da', // muted grey
    ];

    const colors = isDark ? darkColors : lightColors;

    let cells = [];
    let cols, rows;

    const initGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / totalSize);
      rows = Math.ceil(height / totalSize);

      cells = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          cells.push({
            x: i * totalSize,
            y: j * totalSize,
            targetColor: colors[Math.floor(Math.random() * colors.length)],
            currentColor: colors[Math.floor(Math.random() * colors.length)],
            lerpFactor: 0,
            speed: 0.005 + Math.random() * 0.01,
          });
        }
      }
    };

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const lerpColor = (color1, color2, factor) => {
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      if (!c1 || !c2) return color1;

      const r = Math.round(c1.r + (c2.r - c1.r) * factor);
      const g = Math.round(c1.g + (c2.g - c1.g) * factor);
      const b = Math.round(c1.b + (c2.b - c1.b) * factor);

      return `rgb(${r},${g},${b})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cells.forEach(cell => {
        cell.lerpFactor += cell.speed;
        if (cell.lerpFactor >= 1) {
          cell.currentColor = cell.targetColor;
          cell.targetColor = colors[Math.floor(Math.random() * colors.length)];
          cell.lerpFactor = 0;
          cell.speed = 0.005 + Math.random() * 0.01;
        }

        const color = lerpColor(cell.currentColor, cell.targetColor, cell.lerpFactor);
        ctx.fillStyle = color;
        
        // Draw rounded rect
        const radius = 3;
        ctx.beginPath();
        ctx.moveTo(cell.x + radius, cell.y);
        ctx.lineTo(cell.x + cellSize - radius, cell.y);
        ctx.quadraticCurveTo(cell.x + cellSize, cell.y, cell.x + cellSize, cell.y + radius);
        ctx.lineTo(cell.x + cellSize, cell.y + cellSize - radius);
        ctx.quadraticCurveTo(cell.x + cellSize, cell.y + cellSize, cell.x + cellSize - radius, cell.y + cellSize);
        ctx.lineTo(cell.x + radius, cell.y + cellSize);
        ctx.quadraticCurveTo(cell.x, cell.y + cellSize, cell.x, cell.y + cellSize - radius);
        ctx.lineTo(cell.x, cell.y + radius);
        ctx.quadraticCurveTo(cell.x, cell.y, cell.x + radius, cell.y);
        ctx.closePath();
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    initGrid();
    draw();

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return <div className="w-full h-screen bg-[var(--color-bg)]" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="relative w-full h-screen overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--color-bg)', fontFamily: 'var(--font-display)' }}>
      {/* Animated Canvas Grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      {/* Edge Vignette Fades */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 150px var(--color-bg)` }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--color-bg)] via-transparent to-[var(--color-bg)]"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-[var(--color-text)]">
            Hi, I&apos;m <span className="text-[var(--color-primary)]">Sidhart Sami</span>
          </h1>
          
          <div className="text-xl md:text-2xl font-medium text-[var(--color-text-muted)] tracking-tight min-h-[1.5em]">
            <TypingAnimation
              words={[
                "Data Science Specialist",
                "Full-stack Web Engineer",
                "Mobile App Architect",
                "Game Systems Designer"
              ]}
              loop
              typeSpeed={80}
              deleteSpeed={40}
              pauseDelay={2000}
              className="text-[var(--color-text)]"
            />
          </div>

          <div className="pt-8">
            <button
              onClick={scrollToProjects}
              className="px-10 py-4 bg-[var(--color-text)] text-[var(--color-bg)] font-black rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:bg-[var(--color-primary)] hover:text-black"
            >
              Explore My Work
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedGridHero;

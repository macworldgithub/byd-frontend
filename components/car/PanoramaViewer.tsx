'use client';

import { useState, useRef, useEffect } from 'react';

interface PanoramaViewerProps {
  image: string;
  className?: string;
}

export default function PanoramaViewer({ image, className }: PanoramaViewerProps) {
  const [position, setPosition] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPosition = useRef(0);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startPosition.current = position;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    
    const currentX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const deltaX = currentX - startX.current;
    
    // Sensitivity: 0.5px movement = 0.1% background shift
    const newPosition = startPosition.current + (deltaX * 0.1);
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.min(Math.max(zoom - e.deltaY * 0.001, 1), 2.5);
    setZoom(newZoom);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [position]);

  return (
    <div 
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
    >
      <div 
        className="w-full h-full transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: `${200 * zoom}% 100%`,
          backgroundPosition: `${position}% center`,
          backgroundRepeat: 'repeat-x',
          transform: `scale(${zoom})`,
        }}
      />
      
      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
        <p className="text-[10px] text-white font-bold tracking-widest uppercase">
          Drag to Rotate • Scroll to Zoom
        </p>
      </div>
    </div>
  );
}

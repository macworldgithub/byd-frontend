"use client";

// components/car/Car360Viewer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Core 360° drag-to-rotate viewer using image frame sequences.
//
// USAGE WITH REAL FRAMES:
//   <Car360Viewer
//     frames={["/images/360/1/frame_001.png", ...36 paths]}
//     alt="BYD ATTO 1"
//   />
//
// USAGE WITH FALLBACK (single image):
//   <Car360Viewer
//     frames={["/images/car.png"]}
//     alt="BYD ATTO 1"
//   />
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface Car360ViewerProps {
  /** Ordered frame paths: 0° → 350° */
  frames: string[];
  /** Fallback shown while loading or for single-frame mode */
  fallbackImage?: string;
  alt: string;
  /** Pixels per frame change. Lower = more sensitive. Default: 7 */
  sensitivity?: number;
  className?: string;
  /** Called with current rotation in degrees (0–359) */
  onRotationChange?: (degrees: number) => void;
  /** Called when drag starts/ends */
  onDragStateChange?: (isDragging: boolean) => void;
}

function wrap(index: number, total: number) {
  return ((index % total) + total) % total;
}

export default function Car360Viewer({
  frames,
  fallbackImage,
  alt,
  sensitivity = 7,
  className = "",
  onRotationChange,
  onDragStateChange,
}: Car360ViewerProps) {
  const totalFrames = frames.length;
  const isSingleFrame = totalFrames <= 1;

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const dragStartX = useRef(0);
  const frameAtDragStart = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ── Preload all frames ─────────────────────────────────────────────────────
  useEffect(() => {
    if (isSingleFrame) {
      setIsLoaded(true);
      return;
    }
    let done = 0;
    frames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        done++;
        setLoadedCount(done);
        if (done === frames.length) setIsLoaded(true);
      };
    });
  }, [frames, isSingleFrame]);

  // ── Notify parent of degree ─────────────────────────────────────────────────
  useEffect(() => {
    onRotationChange?.(Math.round((currentFrame / totalFrames) * 360));
  }, [currentFrame, totalFrames, onRotationChange]);

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const startDrag = useCallback(
    (clientX: number) => {
      if (isSingleFrame) return;
      setIsDragging(true);
      setHasInteracted(true);
      onDragStateChange?.(true);
      dragStartX.current = clientX;
      frameAtDragStart.current = currentFrame;
    },
    [isSingleFrame, currentFrame, onDragStateChange],
  );

  const moveDrag = useCallback(
    (clientX: number) => {
      if (!isDragging || isSingleFrame) return;
      const delta = clientX - dragStartX.current;
      const frameDelta = Math.floor(delta / sensitivity);
      const next = wrap(frameAtDragStart.current - frameDelta, totalFrames);
      if (next !== currentFrame) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setCurrentFrame(next));
      }
    },
    [isDragging, isSingleFrame, sensitivity, totalFrames, currentFrame],
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    onDragStateChange?.(false);
  }, [onDragStateChange]);

  // ── Auto-spin on first load (single pass to tease interaction) ─────────────
  useEffect(() => {
    if (!isLoaded || isSingleFrame || hasInteracted) return;
    let frame = 0;
    let alive = true;
    const tick = () => {
      if (!alive || hasInteracted) return;
      frame = wrap(frame + 1, totalFrames);
      setCurrentFrame(frame);
      if (frame < totalFrames - 1)
        setTimeout(() => requestAnimationFrame(tick), 35);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 500);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [isLoaded, isSingleFrame, hasInteracted, totalFrames]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const src = isSingleFrame
    ? (fallbackImage ?? frames[0])
    : frames[currentFrame];
  const loadPct = isSingleFrame
    ? 100
    : Math.round((loadedCount / totalFrames) * 100);
  const rotDeg = isSingleFrame
    ? 0
    : Math.round((currentFrame / totalFrames) * 360);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        cursor: isSingleFrame ? "default" : isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={() => {
        if (isDragging) endDrag();
      }}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => {
        e.preventDefault();
        moveDrag(e.touches[0].clientX);
      }}
      onTouchEnd={endDrag}
    >
      {/* Loading overlay */}
      {!isLoaded && !isSingleFrame && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
          <div
            className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin mb-3"
            role="status"
            aria-label="Loading 360° view"
          />
          <span className="text-xs font-semibold text-gray-500 tracking-widest">
            LOADING {loadPct}%
          </span>
          <div className="w-32 h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-300"
              style={{ width: `${loadPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Car image */}
      <Image
        src={src}
        alt={alt}
        width={700}
        height={400}
        className={`w-full h-auto object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } pointer-events-none`}
        draggable={false}
        priority
        unoptimized
      />

      {/* Drag hint */}
      {!isSingleFrame && !hasInteracted && isLoaded && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm pointer-events-none animate-pulse">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3.5 h-3.5"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              d="M8 12h8M8 12l3-3M8 12l3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          DRAG TO ROTATE
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-3.5 h-3.5 scale-x-[-1]"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              d="M8 12h8M8 12l3-3M8 12l3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Live degree readout */}
      {!isSingleFrame && isLoaded && hasInteracted && (
        <div className="absolute top-2 left-2 bg-black/50 text-white text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full pointer-events-none">
          {rotDeg}°
        </div>
      )}
    </div>
  );
}

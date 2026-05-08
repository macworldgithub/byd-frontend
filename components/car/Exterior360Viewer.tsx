'use client';

import React from 'react';

// Add type support for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function Exterior360Viewer() {
  return (
    <div className="relative w-full h-full bg-gray-50 flex items-center justify-center">
      <model-viewer
        src="/models/car.glb"
        alt="A 3D model of a car"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        interaction-prompt="auto"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      >
        {/* Interaction Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
          <p className="text-[10px] text-white font-bold tracking-widest uppercase">
            Rotate & Zoom 3D Model
          </p>
        </div>

        {/* Loading Bar */}
        <div slot="progress-bar" className="w-full h-1 bg-gray-200">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      </model-viewer>
    </div>
  );
}

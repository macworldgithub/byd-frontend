"use client";

// components/car/CarHero.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Extracted hero section for the car-info page.
// Owns: title, badge, 360° viewer, color picker, variant toggle.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Car360Viewer from "@/components/car/Car360Viewer";
import Car360Badge from "@/components/car/Car360Badge";
import use360Frames from "./hooks/use360Frames";


// ── Types ──
interface ColorOption {
  id: string;
  bg: string;
  label?: string;
}

interface CarHeroProps {
  carId: string;
  name: string;
  subtitle: string;
  colorOptions: ColorOption[];
}

// ── Component ──
export default function CarHero({
  carId,
  name,
  subtitle,
  colorOptions,
}: CarHeroProps) {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.id ?? "");
  const [selectedVariant, setSelectedVariant] = useState<"Essential" | "Premium">("Essential");
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { frames, fallbackImage, hasRealFrames } = use360Frames(carId);

  const shortName = name.replace("BYD ", "");

  return (
    <div className="relative w-full bg-gradient-to-b from-[#F0EFED] to-white pt-10 pb-0 flex flex-col items-center">
      {/* ── Title ── */}
      <div className="text-center px-6 pt-2 pb-1">
        <h1 className="text-[2.2rem] font-black tracking-tight text-gray-900 leading-none">
          {name}
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            Electric
          </span>
        </div>
      </div>

      {/* ── 360° Viewer ── */}
      <div className="relative w-full mt-2">
        {/* Watermark behind car */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <span className="text-[5.5rem] font-black text-gray-200/60 tracking-tighter select-none whitespace-nowrap">
            {shortName}
          </span>
        </div>

        {/* ANCAP badge */}
        <div className="absolute top-2 right-4 z-20 flex flex-col items-center bg-white/95 rounded-xl px-2 py-1.5 shadow-md">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-black text-gray-900">★</span>
            </div>
            <span className="text-[9px] font-black text-gray-800 tracking-wider">ANCAP</span>
          </div>
          <span className="text-[8px] bg-yellow-400 text-gray-900 font-black px-1 rounded-sm mt-0.5">
            2024
          </span>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[8px] text-yellow-400">★</span>
            ))}
          </div>
        </div>

        {/* The actual 360 viewer */}
        <Car360Viewer
          frames={frames}
          fallbackImage={fallbackImage}
          alt={name}
          sensitivity={7}
          className="relative z-10 w-full px-4"
          onRotationChange={(deg) => setRotationDeg(deg)}
          onDragStateChange={(dragging) => setIsDragging(dragging)}
        />
      </div>

      {/* ── 360° Badge ── */}
      <Car360Badge
        hasRealFrames={hasRealFrames}
        rotationDegrees={rotationDeg}
        isDragging={isDragging}
      />

      {/* ── Color + Variant ── */}
      <div className="w-full px-5 flex items-center justify-between mb-5">
        {/* Color swatches */}
        <div className="flex gap-2.5 items-center">
          {colorOptions.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedColor(c.id)}
              aria-label={c.label ?? c.id}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                selectedColor === c.id
                  ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                  : "ring-1 ring-gray-200"
              }`}
              style={{ backgroundColor: c.bg }}
            />
          ))}
        </div>

        {/* Variant toggle */}
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {(["Essential", "Premium"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVariant(v)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedVariant === v
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { Car } from "@/types/car";
import Image from "next/image";

interface CarShowcaseProps {
  car: Car;
  onNext?: () => void;
  onPrev?: () => void;
  onImageClick?: () => void;
}

export default function CarShowcase({
  car,
  onNext,
  onPrev,
  onImageClick,
}: CarShowcaseProps) {
  return (
    <div className="relative bg-[#2a2a2f] rounded-2xl overflow-hidden">
      <div
        className={`relative h-[420px] md:h-[500px] ${onImageClick ? "cursor-pointer" : ""}`}
        onClick={onImageClick}
      >
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transition-all duration-500"
          key={car.id}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Car Name - Centered at top */}
        <div className="absolute top-6 left-0 right-0 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            {car.name}
          </h2>
        </div>

        {/* Navigation Buttons (Middle Sides) */}
        {/* <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm p-3 rounded-full text-white transition-colors"
          aria-label="Previous Car"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button> */}

        {/* Bottom Info */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-2 items-center">
              <span className="border border-white/50 bg-white text-black text-xs px-4 py-1.5 rounded-md">
                {car.type}
              </span>
              {car.status === "New" && (
                <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-md">
                  New
                </span>
              )}
            </div>
            {/* Description */}
            <p className="text-white text-base font-semibold">
              {car.description}
            </p>
          </div>

          {/* Bottom Right Arrow (Decorative/Next) */}
          <button
            onClick={onNext}
            className="hover:scale-110 transition-transform"
          >
            <svg
              className="w-8 h-8 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

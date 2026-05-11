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
    <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 shadow-2xl shadow-black/40">
      <div
        className={`relative h-[420px] md:h-[520px] ${onImageClick ? "cursor-pointer" : ""}`}
        onClick={onImageClick}
      >
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          key={car.id}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-6 px-6 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-lg">
            {car.name}
          </h2>
        </div>

        <div className="absolute left-6 top-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm">
            {car.type}
          </span>
          {car.status === "New" && (
            <span className="rounded-full bg-sky-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
              New
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-6 px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-lg font-semibold text-white/90 md:text-xl">
                {car.description}
              </p>
            </div>
            <button
              onClick={onNext}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
              aria-label="Next car"
            >
              <svg
                className="h-6 w-6"
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
    </div>
  );
}

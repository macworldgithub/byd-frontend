"use client";

import { Car } from "@/types/car";
import Image from "next/image";

interface CarListProps {
  cars: Car[];
  selectedCar: Car;
  onCarSelect: (car: Car) => void;
}

export default function CarList({
  cars,
  selectedCar,
  onCarSelect,
}: CarListProps) {
  return (
    <div className="py-4 px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cars.map((car) => (
          <div
            key={car.id}
            onClick={() => onCarSelect(car)}
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 ${
              selectedCar.id === car.id
                ? "ring-2 ring-blue-400/60"
                : "opacity-90"
            }`}
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                  {car.type}
                </span>
                {car.status === "New" && (
                  <span className="rounded-full bg-sky-500/95 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                    New
                  </span>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-4 px-4 text-white">
                <p className="text-2xl font-black uppercase tracking-[0.18em] drop-shadow-lg">
                  {car.name}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="max-w-[70%] text-sm leading-6 text-white/85">
                    {car.description}
                  </p>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition group-hover:bg-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path fill="currentColor" d="M10 17l5-5-5-5v10z" />
                    </svg>
                  </div>
                </div>
              </div>

              {selectedCar.id === car.id && (
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-2 ring-cyan-300/60" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

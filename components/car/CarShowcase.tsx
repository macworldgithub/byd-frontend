'use client';

import { Car } from '@/types/car';
import Image from 'next/image';

interface CarShowcaseProps {
  car: Car;
}

export default function CarShowcase({ car }: CarShowcaseProps) {
  return (
    <div className="relative bg-[#2a2a2f] rounded-2xl overflow-hidden">
      <div className="relative h-72 md:h-96">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute top-6 left-6">
          <h2 className="text-white text-3xl font-bold">{car.name}</h2>
          <div className="flex gap-3 mt-2 items-center">
            <span className="text-white/80 text-sm">{car.type}</span>
            {car.status === 'New' && (
              <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-white/80 text-sm mt-3 font-medium">{car.description}</p>
        </div>
        
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

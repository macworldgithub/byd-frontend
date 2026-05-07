'use client';

import { Car } from '@/types/car';
import Image from 'next/image';

interface CarListProps {
  cars: Car[];
  selectedCar: Car;
  onCarSelect: (car: Car) => void;
}

export default function CarList({ cars, selectedCar, onCarSelect }: CarListProps) {
  return (
    <div className="py-2 px-4">
      <div className="flex gap-2">
        {cars.map((car) => (
          <div
            key={car.id}
            onClick={() => onCarSelect(car)}
            className={`flex-1 cursor-pointer transition-all duration-200 ${selectedCar.id === car.id ? 'scale-[1.02]' : 'scale-100 opacity-75'
              }`}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
              {/* Dark gradient overlay at bottom for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Car name overlaid at bottom */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-xs md:text-sm font-bold leading-tight">{car.name}</p>
              </div>
              {selectedCar.id === car.id && (
                <div className="absolute inset-0 border-2 border-white/40 rounded-2xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="py-4 px-4">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {cars.map((car) => (
          <div
            key={car.id}
            onClick={() => onCarSelect(car)}
            className={`flex-shrink-0 flex-1 cursor-pointer transition-all duration-200 ${
              selectedCar.id === car.id ? 'scale-[1.02]' : 'scale-100 opacity-70'
            }`}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
              {selectedCar.id === car.id && (
                <div className="absolute inset-0 border-2 border-white/60 rounded-2xl" />
              )}
            </div>
            <p className="text-white text-xs md:text-sm text-center mt-2 font-medium">{car.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

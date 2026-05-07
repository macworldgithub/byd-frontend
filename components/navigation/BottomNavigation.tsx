'use client';

import { NavigationItem } from '@/types/car';

interface BottomNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export default function BottomNavigation({ items, activeItem, onItemClick }: BottomNavigationProps) {
  return (
    <div className="flex justify-center pb-6 pt-2">
      <div className="bg-[#2a2a2f] rounded-full flex items-center gap-1 px-2 py-2 shadow-lg">
        {items.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#4a4a52] text-white px-6 py-3'
                  : 'text-gray-400 px-4 py-3 hover:text-gray-300'
              }`}
            >
              <div className="w-5 h-5 flex-shrink-0">
                {item.icon === 'home' && (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                )}
                {item.icon === 'car' && (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                )}
                {item.icon === 'people' && (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                )}
              </div>
              {isActive && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

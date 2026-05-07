'use client';

import { useState } from 'react';
import Image from 'next/image';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import { NavigationItem } from '@/types/car';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'car', label: 'Cars', icon: 'car' },
  { id: 'team', label: 'Team', icon: 'people' }
];

export default function TeamPage() {
  const [activeNav, setActiveNav] = useState<string>('team');

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === 'home') window.location.href = '/';
    if (itemId === 'car') window.location.href = '/car-details';
    if (itemId === 'team') window.location.href = '/team';
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      <div className="px-6 pt-12">
        {/* Welcome Section */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Welcome To BYD
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed font-light">
            BYD — Build Your Dreams — is the world's leading new energy vehicle manufacturer, pioneering safer batteries and integrated electric architectures.
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/10] mb-12 rounded-[40px] overflow-hidden shadow-sm">
          <Image
            src="/images/car.png"
            alt="BYD Car"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <section className="mb-10">
          <h2 className="text-5xl font-bold mb-8 tracking-tight">
            Driving the Future of Mobility
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3">About Us</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                At <span className="font-bold">BYD Australia</span>, we're not just selling cars — we're shaping the future of sustainable mobility. With innovation at our core, we bring cutting-edge electric vehicles that combine performance, technology, and environmental responsibility.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              From sleek urban sedans to powerful SUVs, our vehicles are designed to redefine how Australians drive. Powered by advanced engineering, BYD is committed to reducing the carbon footprint while providing unmatched driving experiences.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We believe the future is electric, and it starts today.
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNavigation 
          items={navigationItems}
          activeItem={activeNav}
          onItemClick={handleNavClick}
        />
      </div>
    </div>
  );
}

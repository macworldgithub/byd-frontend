"use client";

import { useState } from "react";
import Image from "next/image";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "team", label: "Team", icon: "people" },
];

export default function TeamPage() {
  const [activeNav, setActiveNav] = useState<string>("team");

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") window.location.href = "/";
    if (itemId === "car") window.location.href = "/car-details";
    if (itemId === "team") window.location.href = "/team";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black font-sans pb-32">
      {/* Main Content Container */}
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-12 md:pt-16">
        {/* Welcome Section */}
        <header className="mb-8 sm:mb-10 md:mb-12 xl:px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            Welcome To BYD
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light xl:max-w-[950px]">
            BYD — Build Your Dreams — is the world's leading new energy vehicle
            manufacturer, pioneering safer batteries and integrated electric
            architectures.
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-video sm:aspect-[16/10] mb-10 sm:mb-12 md:mb-16 rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/car.png"
            alt="BYD Car"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tight leading-tight">
            Driving the Future of Mobility
          </h2>

          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                About Us
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                At <span className="font-bold">BYD Australia</span>, we're not
                just selling cars — we're shaping the future of sustainable
                mobility. With innovation at our core, we bring cutting-edge
                electric vehicles that combine performance, technology, and
                environmental responsibility.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              From sleek urban sedans to powerful SUVs, our vehicles are
              designed to redefine how Australians drive. Powered by advanced
              engineering, BYD is committed to reducing the carbon footprint
              while providing unmatched driving experiences.
            </p>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
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

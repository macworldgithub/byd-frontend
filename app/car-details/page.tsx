"use client";

import { useState } from "react";
import CarShowcase from "@/components/car/CarShowcase";
import CarList from "@/components/car/CarList";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import BuildYourDreams from "@/components/marketing/BuildYourDreams";
import { Car, NavigationItem } from "@/types/car";
import { useRouter } from "next/navigation";

const sampleCars: Car[] = [
  {
    id: "1",
    name: "BYD ATTO 1",
    type: "Electric",
    status: "New",
    description: "Built for the Big City",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-1.jpg",
  },
  {
    id: "2",
    name: "BYD ATTO 2",
    type: "Electric",
    status: "New",
    description: "Distinctive city cruiser",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-2/showcase-1.jpg",
  },
  {
    id: "3",
    name: "BYD ATTO 3",
    type: "Electric",
    status: "New",
    description: "Refined and responsive",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-3/configurator/black-0-1.jpg",
  },
  {
    id: "4",
    name: "BYD Dolphin",
    type: "Electric",
    status: "New",
    description: "Compact and efficient",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/dolphin/configurator/white-0-1.jpg",
  },
  {
    id: "5",
    name: "BYD Seal",
    type: "Electric",
    status: "New",
    description: "Sporty with bold style",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/seal/configurator/blue-0-1.jpg",
  },
  {
    id: "6",
    name: "BYD Sealion 5",
    type: "Electric",
    status: "New",
    description: "Premium presence on the road",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/sealion-5/configurator/atlantis-0-1.jpg",
  },
  {
    id: "7",
    name: "BYD Sealion 6",
    type: "Electric",
    status: "New",
    description: "Bold performance and comfort",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/sealion-6/banner-1.jpg",
  },
  {
    id: "8",
    name: "BYD Sealion 7",
    type: "Electric",
    status: "New",
    description: "Dynamic design with premium flair",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/sealion-7/configurator/blue-0-1.jpg",
  },
  {
    id: "9",
    name: "BYD Sealion 8",
    type: "Electric",
    status: "New",
    description: "Modern luxury, reimagined",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/sealion-8/configurator/green-0-1.jpg",
  },
  {
    id: "10",
    name: "BYD Shark 6",
    type: "Electric",
    status: "New",
    description: "Advanced performance in blue",
    image:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/shark-6/configurator/blue-0-1.jpg",
  },
];

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "team", label: "Team", icon: "people" },
];

export default function CarDetailsPage() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<Car>(sampleCars[0]);
  const [activeNav, setActiveNav] = useState<string>("car");

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
  };

  const handleNextCar = () => {
    const currentIndex = sampleCars.findIndex((c) => c.id === selectedCar.id);
    const nextIndex = (currentIndex + 1) % sampleCars.length;
    setSelectedCar(sampleCars[nextIndex]);
  };

  const handlePrevCar = () => {
    const currentIndex = sampleCars.findIndex((c) => c.id === selectedCar.id);
    const prevIndex =
      (currentIndex - 1 + sampleCars.length) % sampleCars.length;
    setSelectedCar(sampleCars[prevIndex]);
  };

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") window.location.href = "/";
    if (itemId === "car") window.location.href = "/car-details";
    if (itemId === "team") window.location.href = "/team";
  };

  const handleImageClick = () => {
    router.push(`/car-info/${selectedCar.id}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Section 1: Build Your Dreams */}
        <BuildYourDreams />

        {/* Section 2: Car Showcase */}
        <div className="px-4 mb-4">
          <CarShowcase
            car={selectedCar}
            onNext={handleNextCar}
            onPrev={handlePrevCar}
            onImageClick={handleImageClick}
          />
        </div>

        {/* Section 3: Car List (3 images) */}
        <CarList
          cars={sampleCars}
          selectedCar={selectedCar}
          onCarSelect={handleCarSelect}
        />
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

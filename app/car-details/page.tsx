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
  const [showModal, setShowModal] = useState(false);

  const handleCarSelect = (car: Car) => setSelectedCar(car);

  const handleNextCar = () => {
    const i = sampleCars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(sampleCars[(i + 1) % sampleCars.length]);
  };

  const handlePrevCar = () => {
    const i = sampleCars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(sampleCars[(i - 1 + sampleCars.length) % sampleCars.length]);
  };

  // const handleViewDetails = () => setShowModal(true);
  const handleViewDetails = () => {
    if (selectedCar.id === "1") {
      router.push(`/car-info/${selectedCar.id}`);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") window.location.href = "/";
    if (itemId === "car") window.location.href = "/car-details";
    if (itemId === "team") window.location.href = "/team";
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#080A0E",
        color: "#E8ECF0",
        fontFamily: "'Rajdhani', 'Barlow', sans-serif",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap");
      `}</style>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* <BuildYourDreams /> */}

        <div className="px-4 mb-4">
          {/* <CarShowcase
            car={selectedCar}
            onNext={handleNextCar}
            onPrev={handlePrevCar}
            onImageClick={() => router.push(`/car-info/${selectedCar.id}`)}
            onViewDetails={handleViewDetails}
          /> */}
          <CarShowcase
            car={selectedCar}
            onNext={handleNextCar}
            onPrev={handlePrevCar}
            onImageClick={handleViewDetails}
            onViewDetails={handleViewDetails}
          />
        </div>

        <CarList
          cars={sampleCars}
          selectedCar={selectedCar}
          onCarSelect={handleCarSelect}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0A0C10] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="mb-6 text-center text-2xl uppercase tracking-[0.32em] text-[#00A8E8]">
              Coming Soon ...
            </div>
            {/* <h2 className="mb-6 text-center text-3xl font-black text-white">
              {selectedCar.name} Details
            </h2> */}
            <div className="flex flex-col gap-3 items-center">
              {/* <button
                onClick={closeModal}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0A0C10] transition hover:bg-slate-200"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}

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

// "use client";

// import { useState } from "react";
// import CarShowcase from "@/components/car/CarShowcase";
// import CarList from "@/components/car/CarList";
// import BottomNavigation from "@/components/navigation/BottomNavigation";
// import BuildYourDreams from "@/components/marketing/BuildYourDreams";
// import { Car, NavigationItem } from "@/types/car";
// import { useRouter } from "next/navigation";
// import { CAR_DATA } from "../car-info/carData";

// const sampleCars: Car[] = [
//   {
//     id: "1",
//     name: "BYD ATTO 1",
//     type: "Electric",
//     status: "New",
//     description: "Built for Big City",
//     image: CAR_DATA["1"].heroImage,
//   },
//   {
//     id: "2",
//     name: "BYD ATTO 2",
//     type: "Electric",
//     status: "New",
//     description: "Distinctive city cruiser",
//     image: CAR_DATA["2"].heroImage,
//   },
//   {
//     id: "3",
//     name: "BYD ATTO 3",
//     type: "Electric",
//     status: "New",
//     description: "Refined and responsive",
//     image: CAR_DATA["3"].heroImage,
//   },
// ];

// const navigationItems: NavigationItem[] = [
//   { id: "home", label: "Home", icon: "home" },
//   { id: "car", label: "Cars", icon: "car" },
//   { id: "team", label: "Team", icon: "people" },
// ];

// export default function CarDetailsPage() {
//   const router = useRouter();
//   const [selectedCar, setSelectedCar] = useState<Car>(sampleCars[0]);
//   const [activeNav, setActiveNav] = useState<string>("car");

//   const handleCarSelect = (car: Car) => {
//     setSelectedCar(car);
//   };

//   const handleNextCar = () => {
//     const currentIndex = sampleCars.findIndex((c) => c.id === selectedCar.id);
//     const nextIndex = (currentIndex + 1) % sampleCars.length;
//     setSelectedCar(sampleCars[nextIndex]);
//   };

//   const handlePrevCar = () => {
//     const currentIndex = sampleCars.findIndex((c) => c.id === selectedCar.id);
//     const prevIndex =
//       (currentIndex - 1 + sampleCars.length) % sampleCars.length;
//     setSelectedCar(sampleCars[prevIndex]);
//   };

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     if (itemId === "home") window.location.href = "/";
//     if (itemId === "car") window.location.href = "/car-details";
//     if (itemId === "team") window.location.href = "/team";
//   };

//   const handleImageClick = () => {
//     router.push(`/car-info/${selectedCar.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto pb-20">
//         {/* Section 1: Build Your Dreams */}
//         <BuildYourDreams />

//         {/* Section 2: Car Showcase */}
//         <div className="px-4 mb-4">
//           <CarShowcase
//             car={selectedCar}
//             onNext={handleNextCar}
//             onPrev={handlePrevCar}
//             onImageClick={handleImageClick}
//           />
//         </div>

//         {/* Section 3: Car List (3 images) */}
//         <CarList
//           cars={sampleCars}
//           selectedCar={selectedCar}
//           onCarSelect={handleCarSelect}
//         />
//       </div>

//       {/* Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 right-0 z-20">
//         <BottomNavigation
//           items={navigationItems}
//           activeItem={activeNav}
//           onItemClick={handleNavClick}
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import CarShowcase from "@/components/car/CarShowcase";
import CarList from "@/components/car/CarList";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import BuildYourDreams from "@/components/marketing/BuildYourDreams";
import { Car, NavigationItem } from "@/types/car";
import { useRouter } from "next/navigation";
import { CAR_DATA } from "../car-info/carData";

const sampleCars: Car[] = [
  {
    id: "1",
    name: "BYD ATTO 1",
    type: "Electric",
    status: "New",
    description: "Built for Big City",
    image: CAR_DATA["1"].heroImage,
  },
  {
    id: "2",
    name: "BYD ATTO 2",
    type: "Electric",
    status: "New",
    description: "Distinctive city cruiser",
    image: CAR_DATA["2"].heroImage,
  },
  {
    id: "3",
    name: "BYD ATTO 3",
    type: "Electric",
    status: "New",
    description: "Refined and responsive",
    image: CAR_DATA["3"].heroImage,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleCarSelect = (car: Car) => setSelectedCar(car);

  const handleNextCar = () => {
    const i = sampleCars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(sampleCars[(i + 1) % sampleCars.length]);
  };

  const handlePrevCar = () => {
    const i = sampleCars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(sampleCars[(i - 1 + sampleCars.length) % sampleCars.length]);
  };

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") window.location.href = "/";
    if (itemId === "car") window.location.href = "/car-details";
    if (itemId === "team") window.location.href = "/team";
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080A0E", color: "#E8ECF0", fontFamily: "'Rajdhani', 'Barlow', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="flex-1 overflow-y-auto pb-20">
        <BuildYourDreams />

        <div className="px-4 mb-4">
          <CarShowcase
            car={selectedCar}
            onNext={handleNextCar}
            onPrev={handlePrevCar}
            onImageClick={() => router.push(`/car-info/${selectedCar.id}`)}
          />
        </div>

        <CarList cars={sampleCars} selectedCar={selectedCar} onCarSelect={handleCarSelect} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNavigation items={navigationItems} activeItem={activeNav} onItemClick={handleNavClick} />
      </div>
    </div>
  );
}
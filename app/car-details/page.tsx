// 'use client';

// import { useState } from 'react';
// import CarShowcase from '@/components/car/CarShowcase';
// import CarList from '@/components/car/CarList';
// import BottomNavigation from '@/components/navigation/BottomNavigation';
// import BuildYourDreams from '@/components/marketing/BuildYourDreams';
// import { Car, NavigationItem } from '@/types/car';

// const sampleCars: Car[] = [
//   {
//     id: '1',
//     name: 'BYD ATTO 1',
//     type: 'Electric',
//     status: 'New',
//     description: 'Built for the Big City',
//     image: '/images/car.png'
//   },
//   {
//     id: '2',
//     name: 'BYD ATTO 2',
//     type: 'Electric',
//     status: 'New',
//     description: 'Built for the Big City',
//     image: '/images/car2.png'
//   },
//   {
//     id: '3',
//     name: 'BYD ATTO 3',
//     type: 'Electric',
//     status: 'New',
//     description: 'Built for the Big City',
//     image: '/images/car3.png'
//   }
// ];
// 7
// const navigationItems: NavigationItem[] = [
//   { id: 'home', label: 'Home', icon: 'home' },
//   { id: 'car', label: 'Cars', icon: 'car' },
//   { id: 'people', label: 'Community', icon: 'people' }
// ];

// export default function CarDetailsPage() {
//   const [selectedCar, setSelectedCar] = useState<Car>(sampleCars[0]);
//   const [activeNav, setActiveNav] = useState<string>('car');

//   const handleCarSelect = (car: Car) => {
//     setSelectedCar(car);
//   };

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     // Handle navigation logic here
//     if (itemId === 'home') {
//       window.location.href = '/';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#1b1b20] flex flex-col">
//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto pb-20">
//         {/* Section 1: Build Your Dreams */}
//         <BuildYourDreams />
        
//         {/* Section 2: Car Showcase */}
//         <div className="px-4 mb-4">
//           <CarShowcase car={selectedCar} />
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
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CarShowcase from '@/components/car/CarShowcase';
import CarList from '@/components/car/CarList';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import BuildYourDreams from '@/components/marketing/BuildYourDreams';
import { Car, NavigationItem } from '@/types/car';

const sampleCars: Car[] = [
  {
    id: '1',
    name: 'BYD ATTO 1',
    type: 'Electric',
    status: 'New',
    description: 'Built for the Big City',
    image: '/images/car.png'
  },
  {
    id: '2',
    name: 'BYD ATTO 2',
    type: 'Electric',
    status: 'New',
    description: 'Built for the Big City',
    image: '/images/car2.png'
  },
  {
    id: '3',
    name: 'BYD ATTO 3',
    type: 'Electric',
    status: 'New',
    description: 'Built for the Big City',
    image: '/images/car3.png'
  }
];

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'car', label: 'Cars', icon: 'car' },
  { id: 'people', label: 'Community', icon: 'people' }
];

export default function CarDetailsPage() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState<Car>(sampleCars[0]);
  const [activeNav, setActiveNav] = useState<string>('car');

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
  };

  // When user clicks "View Details" or the car showcase — navigate to car-info
  // For now hardcoded id will come from selectedCar.id
  // Later: replace selectedCar.id with real API id
  const handleViewDetails = (car: Car) => {
    router.push(`/car-info/${car.id}`);
  };

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === 'home') {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b20] flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Section 1: Build Your Dreams */}
        <BuildYourDreams />

        {/* Section 2: Car Showcase — clicking opens car-info/[id] */}
        <div
          className="px-4 mb-4 cursor-pointer"
          onClick={() => handleViewDetails(selectedCar)}
        >
          <CarShowcase car={selectedCar} />
        </div>

        {/* Section 3: Car List — selecting highlights, double-tap/click navigates */}
        <CarList
          cars={sampleCars}
          selectedCar={selectedCar}
          onCarSelect={handleCarSelect}
          onCarClick={handleViewDetails}  // pass this new prop — see note below
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
// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import { useState } from "react";
// import BottomNavigation from "@/components/navigation/BottomNavigation";
// import { NavigationItem } from "@/types/car";

// // ─────────────────────────────────────────────
// // HARDCODED DATA — replace with API call later
// // When backend is ready:
// //   const car = await fetch(`/api/cars/${params.id}`).then(r => r.json())
// // ─────────────────────────────────────────────
// const CAR_DATA: Record<
//   string,
//   {
//     name: string;
//     subtitle: string;
//     image: string;
//     specs: { value: string; unit: string; label: string }[];
//     overview: { heading: string; body: string };
//     specifications: [string, string][];
//     features: string[];
//   }
// > = {
//   "1": {
//     name: "BYD ATTO 1",
//     subtitle: "The Compact Electric City Car",
//     image: "/images/car.png",
//     specs: [
//       { value: "9.1", unit: "s", label: "0-100Km/h" },
//       { value: "115", unit: "kW", label: "Power" },
//       { value: "310", unit: "km", label: "WLTP range" },
//     ],
//     overview: {
//       heading: "Built for the big city",
//       body: "The BYD ATTO 1 is the cool, fun-loving model from the world's largest new-energy vehicle brand. It mixes sharp design, a spacious interior, punchy performance and BYD's trademark in-car technologies – making it the perfect choice for people who don't want to compromise on features.",
//     },
//     specifications: [
//       ["Battery Capacity", "60.5 kWh"],
//       ["Charging (AC)", "11 kW"],
//       ["Charging (DC)", "88 kW"],
//       ["Top Speed", "160 km/h"],
//       ["Drive Type", "FWD"],
//       ["Seats", "5"],
//       ["Boot Space", "440 L"],
//       ["Kerb Weight", "1,780 kg"],
//     ],
//     features: [
//       '15.6" Rotating Display',
//       "Wireless CarPlay",
//       "360° Camera",
//       "Adaptive Cruise",
//       "Lane Assist",
//       "V2L Technology",
//       "OTA Updates",
//       "BYD DiPilot",
//     ],
//   },
//   "2": {
//     name: "BYD ATTO 2",
//     subtitle: "The Smart Urban Electric",
//     image: "/images/car2.png",
//     specs: [
//       { value: "7.9", unit: "s", label: "0-100Km/h" },
//       { value: "130", unit: "kW", label: "Power" },
//       { value: "345", unit: "km", label: "WLTP range" },
//     ],
//     overview: {
//       heading: "Smart city driving",
//       body: "The BYD ATTO 2 brings next-generation electric performance to urban commuters. With enhanced range, faster charging, and an evolved interior, it's the natural upgrade for city dwellers who demand more.",
//     },
//     specifications: [
//       ["Battery Capacity", "65.0 kWh"],
//       ["Charging (AC)", "11 kW"],
//       ["Charging (DC)", "100 kW"],
//       ["Top Speed", "170 km/h"],
//       ["Drive Type", "FWD"],
//       ["Seats", "5"],
//       ["Boot Space", "460 L"],
//       ["Kerb Weight", "1,820 kg"],
//     ],
//     features: [
//       '15.6" Rotating Display',
//       "Wireless CarPlay",
//       "360° Camera",
//       "Adaptive Cruise",
//       "Lane Assist",
//       "V2L Technology",
//       "OTA Updates",
//       "BYD DiPilot",
//     ],
//   },
//   "3": {
//     name: "BYD ATTO 3",
//     subtitle: "The Family Electric SUV",
//     image: "/images/car3.png",
//     specs: [
//       { value: "7.3", unit: "s", label: "0-100Km/h" },
//       { value: "150", unit: "kW", label: "Power" },
//       { value: "420", unit: "km", label: "WLTP range" },
//     ],
//     overview: {
//       heading: "More space, more range",
//       body: "The BYD ATTO 3 is a family-focused electric SUV that refuses to compromise. With generous boot space, class-leading range, and BYD's advanced Blade Battery technology, it's built for every journey.",
//     },
//     specifications: [
//       ["Battery Capacity", "72.8 kWh"],
//       ["Charging (AC)", "11 kW"],
//       ["Charging (DC)", "88 kW"],
//       ["Top Speed", "180 km/h"],
//       ["Drive Type", "FWD"],
//       ["Seats", "5"],
//       ["Boot Space", "440 L"],
//       ["Kerb Weight", "1,950 kg"],
//     ],
//     features: [
//       '12.8" Rotating Display',
//       "Wireless CarPlay",
//       "360° Camera",
//       "Adaptive Cruise",
//       "Lane Assist",
//       "V2L Technology",
//       "OTA Updates",
//       "BYD DiPilot",
//     ],
//   },
// };

// // Fallback if id not found
// const DEFAULT_CAR = CAR_DATA["1"];

// // ─────────────────────────────────────────────

// const colorOptions = [
//   { id: "cream", bg: "#E8E0D0" },
//   { id: "blue", bg: "#7B9DB8" },
//   { id: "lime", bg: "#B8C840" },
//   { id: "dark", bg: "#2D2D2D" },
// ];

// const TABS = ["Overview", "Specifications", "Features", "Learn"];

// const navigationItems: NavigationItem[] = [
//   { id: "home", label: "Home", icon: "home" },
//   { id: "car", label: "Cars", icon: "car" },
//   { id: "people", label: "Community", icon: "people" },
// ];

// export default function CarInfoPage() {
//   const router = useRouter();
//   const params = useParams();

//   // ── When backend is ready, fetch by params.id ──
//   const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
//   const car = CAR_DATA[id] ?? DEFAULT_CAR;
//   // ───────────────────────────────────────────────

//   const [selectedColor, setSelectedColor] = useState("cream");
//   const [selectedVariant, setSelectedVariant] = useState<
//     "Essential" | "Premium"
//   >("Essential");
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [activeNav, setActiveNav] = useState<string>("car");

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     // Handle navigation logic here
//     if (itemId === "home") {
//       router.push("/");
//     } else if (itemId === "car") {
//       router.push("/car-details");
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden">
//       {/* ── Hero ── */}
//       <div className="relative w-full bg-gradient-to-b from-[#F0EFED] to-white pt-10 pb-0 flex flex-col items-center">
//         {/* Back button */}
//         <button
//           onClick={() => router.back()}
//           className="absolute top-4 left-4 z-20 flex items-center gap-1 text-sm font-semibold text-gray-600"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             className="w-5 h-5"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           Back
//         </button>

//         {/* Title */}
//         <div className="text-center px-6 pt-2 pb-1">
//           <h1 className="text-[2.2rem] font-black tracking-tight text-gray-900 leading-none">
//             {car.name}
//           </h1>
//           <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">
//             {car.subtitle}
//           </p>
//           <div className="flex items-center justify-center gap-2 mt-3">
//             <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//               New
//             </span>
//             <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
//               Electric
//             </span>
//           </div>
//         </div>

//         {/* Car Image with watermark */}
//         <div className="relative w-full max-w-sm mx-auto mt-4 px-2">
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
//             <span className="text-[4.5rem] font-black text-gray-200/80 tracking-tighter select-none whitespace-nowrap">
//               {car.name.replace("BYD ", "")}
//             </span>
//           </div>
//           <div className="relative z-10">
//             <Image
//               src={car.image}
//               alt={car.name}
//               width={520}
//               height={300}
//               className="w-full h-auto object-contain drop-shadow-xl"
//               priority
//               unoptimized
//             />
//           </div>

//           {/* ANCAP Badge */}
//           <div className="absolute top-4 right-4 z-20 flex flex-col items-center bg-white/90 rounded-xl px-2 py-1.5 shadow-md">
//             <div className="flex items-center gap-1">
//               <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
//                 <span className="text-[8px] font-black text-gray-900">★</span>
//               </div>
//               <span className="text-[9px] font-black text-gray-800 tracking-wider">
//                 ANCAP
//               </span>
//             </div>
//             <span className="text-[8px] bg-yellow-400 text-gray-900 font-black px-1 rounded-sm mt-0.5">
//               2024
//             </span>
//             <div className="flex gap-0.5 mt-0.5">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className="text-[8px] text-yellow-400">
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 360° */}
//         <div className="flex items-center gap-1.5 mb-4 mt-1">
//           <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="w-4 h-4 text-gray-500"
//             >
//               <path
//                 d="M12 4C7 4 3 7.6 3 12s4 8 9 8 9-3.6 9-8"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//               />
//               <path
//                 d="M17 4l2 2-2 2"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <span className="text-sm font-semibold text-gray-700 tracking-wide">
//             360°
//           </span>
//         </div>

//         {/* Color + Variant */}
//         <div className="w-full px-5 flex items-center justify-between mb-5">
//           <div className="flex gap-2.5 items-center">
//             {colorOptions.map((c) => (
//               <button
//                 key={c.id}
//                 onClick={() => setSelectedColor(c.id)}
//                 className={`w-8 h-8 rounded-full transition-all duration-200 ${
//                   selectedColor === c.id
//                     ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
//                     : "ring-1 ring-gray-200"
//                 }`}
//                 style={{ backgroundColor: c.bg }}
//               />
//             ))}
//           </div>
//           <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
//             {(["Essential", "Premium"] as const).map((v) => (
//               <button
//                 key={v}
//                 onClick={() => setSelectedVariant(v)}
//                 className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
//                   selectedVariant === v
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {v}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Performance Stats ── */}
//       <div className="px-5 mb-5">
//         <h2 className="text-xl font-black text-gray-900 text-center mb-3 tracking-tight">
//           {car.name.replace("BYD ", "")} Performance
//         </h2>
//         <div className="grid grid-cols-3 gap-3">
//           {car.specs.map((spec) => (
//             <div
//               key={spec.label}
//               className="border border-gray-200 rounded-2xl px-3 py-4 flex flex-col items-center bg-white shadow-sm"
//             >
//               <div className="flex items-baseline gap-1">
//                 <span className="text-2xl font-black text-gray-900">
//                   {spec.value}
//                 </span>
//                 <span className="text-sm font-bold text-gray-500">
//                   {spec.unit}
//                 </span>
//               </div>
//               <span className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">
//                 {spec.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Tabs ── */}
//       <div className="px-5 mb-4">
//         <div className="flex gap-0 border-b border-gray-200">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 pb-2.5 text-sm font-semibold transition-all duration-200 relative ${
//                 activeTab === tab ? "text-gray-900" : "text-gray-400"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Tab Content ── */}
//       <div className="px-5 flex-1 pb-28">
//         {activeTab === "Overview" && (
//           <div>
//             <h3 className="text-lg font-black text-gray-900 mb-2">
//               {car.overview.heading}
//             </h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               {car.overview.body}
//             </p>
//             <button className="mt-6 w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-base tracking-wide hover:bg-gray-800 active:scale-95 transition-all">
//               Configure Your {car.name.replace("BYD ", "")}
//             </button>
//           </div>
//         )}

//         {activeTab === "Specifications" && (
//           <div className="space-y-3">
//             {car.specifications.map(([label, value]) => (
//               <div
//                 key={label}
//                 className="flex justify-between items-center py-2.5 border-b border-gray-100"
//               >
//                 <span className="text-sm text-gray-500 font-medium">
//                   {label}
//                 </span>
//                 <span className="text-sm text-gray-900 font-bold">{value}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "Features" && (
//           <div className="grid grid-cols-2 gap-3 mt-1">
//             {car.features.map((feature) => (
//               <div
//                 key={feature}
//                 className="border border-gray-200 rounded-2xl p-3 bg-white"
//               >
//                 <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mb-2">
//                   <div className="w-2 h-2 rounded-full bg-blue-500" />
//                 </div>
//                 <span className="text-xs font-semibold text-gray-800">
//                   {feature}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "Learn" && (
//           <div className="space-y-4">
//             {[
//               {
//                 title: "What is Blade Battery?",
//                 desc: "BYD's proprietary LFP cell-to-pack technology for superior safety and longevity.",
//               },
//               {
//                 title: "DiPilot Driver Assistance",
//                 desc: "Advanced suite of ADAS features designed for confident city and highway driving.",
//               },
//               {
//                 title: "V2L Charging",
//                 desc: "Power external devices directly from your car's battery – up to 3.3kW.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.title}
//                 className="border border-gray-200 rounded-2xl p-4"
//               >
//                 <h4 className="text-sm font-black text-gray-900 mb-1">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs text-gray-500 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <BottomNavigation
//         items={navigationItems}
//         activeItem={activeNav}
//         onItemClick={handleNavClick}
//       />
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";

// ─────────────────────────────────────────────
// HARDCODED DATA — replace with API call later
// When backend is ready:
//   const car = await fetch(`/api/cars/${params.id}`).then(r => r.json())
// ─────────────────────────────────────────────
const CAR_DATA: Record<
  string,
  {
    name: string;
    subtitle: string;
    status: string;
    heroImage: string;
    bannerImage: string;
    collageImages: string[];
    showcaseImages: string[];
    videos: string[];
    showcaseFeatures: { image: string; title: string; description: string }[];
    exteriorColors: {
      name: string;
      colorCode: string;
      images: {
        front: { essential: string; premium: string };
        side: { essential: string; premium: string };
      };
    }[];
    interiorColors: { name: string; image: string }[];
    specs: { value: string; unit: string; label: string }[];
    overview: { heading: string; body: string };
    design: {
      title: string;
      features: { title: string; description: string }[];
    };
    technology: {
      title: string;
      features: { title: string; description: string }[];
    };
    styling: { title: string; subtitle: string };
    safety: { features: { title: string; description: string }[] };
    storage: { boot: string; expanded: string };
    models: { name: string; specs: string[] }[];
    moreInfo: { handbook: string; testDrive: string };
    specifications: [string, string][];
    features: string[];
  }
> = {
  "1": {
    name: "BYD ATTO 1",
    subtitle: "The Compact Electric City Car",
    status: "New Electric",
    heroImage:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/hero.png?v=1",
    bannerImage:
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/banner-1.jpg?v=1",
    collageImages: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/collage-2.jpg?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/collage-1.jpg?v=1",
    ],
    showcaseImages: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-1.jpg?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-2.jpg?v=1",
    ],
    videos: [
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/video-1.mp4?v=1",
      "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/video-2.mp4?v=1",
    ],
    showcaseFeatures: [
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-1.jpg?v=1",
        title: "A 'floating roof' and full-width LED tail-lights",
        description:
          "The C-pillar uses a dot-matrix design inspired by ice crystals, creating a floating roof effect with full-width LED tail-lights.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-2.jpg?v=1",
        title: "Distinctive daytime-running lights",
        description:
          "Six angled light strips create a sharp and sophisticated lighting signature.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-3.jpg?v=1",
        title: "Sporty rear spoiler",
        description:
          "Integrated roof spoiler improves sporty styling and aerodynamic efficiency.",
      },
      {
        image:
          "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/showcase-feature-4.jpg?v=1",
        title: "Fun flourishes",
        description:
          "Cyber punk-inspired air conditioning vent design adds a futuristic feel.",
      },
    ],
    exteriorColors: [
      {
        name: "Apricity White",
        colorCode: "white",
        images: {
          front: {
            essential: "/images/atto1/white-front-essential.jpg",
            premium: "/images/atto1/white-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/white-side-essential.jpg",
            premium: "/images/atto1/white-side-premium.jpg",
          },
        },
      },
      {
        name: "Arctic Blue",
        colorCode: "blue",
        images: {
          front: {
            essential: "/images/atto1/blue-front-essential.jpg",
            premium: "/images/atto1/blue-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/blue-side-essential.jpg",
            premium: "/images/atto1/blue-side-premium.jpg",
          },
        },
      },
      {
        name: "Pine Lime",
        colorCode: "yellow",
        images: {
          front: {
            essential: "/images/atto1/yellow-front-essential.jpg",
            premium: "/images/atto1/yellow-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/yellow-side-essential.jpg",
            premium: "/images/atto1/yellow-side-premium.jpg",
          },
        },
      },
      {
        name: "Cosmos Black",
        colorCode: "black",
        images: {
          front: {
            essential: "/images/atto1/black-front-essential.jpg",
            premium: "/images/atto1/black-front-premium.jpg",
          },
          side: {
            essential: "/images/atto1/black-side-essential.jpg",
            premium: "/images/atto1/black-side-premium.jpg",
          },
        },
      },
    ],
    interiorColors: [{ name: "Black + Grey", image: "" }],
    specs: [
      { value: "9.1", unit: "s", label: "0–100km/h" },
      { value: "115", unit: "kW", label: "Power" },
      { value: "310", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Built for the big city",
      body: "The BYD ATTO 1 is the cool, fun-loving model from the world's largest new-energy vehicle brand. It mixes sharp design, a spacious interior, punchy performance and BYD's trademark in-car technologies – making it the perfect choice for people who don't want to compromise on features.",
    },
    design: {
      title: "A design where function meets fun",
      features: [
        {
          title: "Floating roof",
          description: "Dot-matrix C-pillar design inspired by ice crystals",
        },
        {
          title: "LED lighting",
          description: "Full-width LED tail-lights and distinctive DRL",
        },
        {
          title: "Sporty styling",
          description: "Integrated rear spoiler for aerodynamic efficiency",
        },
      ],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [
        {
          title: "Fast charging",
          description:
            "Maximum AC charging rate of 11kW for convenient home charging",
        },
        {
          title: "10.1-inch Intelligent Infotainment Screen",
          description:
            "Includes wireless Apple CarPlay, Android Auto, and 'Hi BYD' voice control",
        },
        {
          title: "Cutting-edge features",
          description:
            "Keyless entry and start, NFC card key access, One-touch tailgate, OTA updates",
        },
        {
          title: "Charge your life with V2L",
          description:
            "Vehicle-to-Load technology allows powering external devices from the car battery",
        },
      ],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [
        {
          title: "Digital, not daunting",
          description:
            "Features dual digital displays: 10.1-inch infotainment screen, 7-inch driver display",
        },
        {
          title: "Style meets substance",
          description:
            "Vegan leather black and grey interior with heated front seats on Premium trim",
        },
        {
          title: "e-Platform 3.0",
          description:
            "Built on BYD's e-Platform 3.0 with Blade Battery technology",
        },
        {
          title: "Safety first",
          description:
            "Includes six airbags and a full suite of safety systems",
        },
      ],
    },
    storage: {
      boot: "308L",
      expanded: "Up to 1,037L with rear seats folded",
    },
    models: [
      {
        name: "BYD ATTO 1 Essential",
        specs: [
          "65 kW power",
          "220 km WLTP range",
          "11.1s acceleration",
          "15' steel wheels",
          "10.1' touchscreen",
        ],
      },
      {
        name: "BYD ATTO 1 Premium",
        specs: [
          "115 kW power",
          "310 km WLTP range",
          "9.1s acceleration",
          "16' alloy wheels",
          "10.1' touchscreen",
        ],
      },
    ],
    moreInfo: {
      handbook:
        "https://cdn.virtualyard.com.au/75df63609809c7a2052fdffe5c00a84e/2c229a16a91c75765f5b75c0997baf31/models/atto-1/owners-handbook.jpg",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "60.5 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "88 kW"],
      ["Top Speed", "160 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "440 L"],
      ["Kerb Weight", "1,780 kg"],
    ],
    features: [
      '10.1" Intelligent Infotainment Screen',
      "Wireless Apple CarPlay",
      "Wireless Android Auto",
      "Hi BYD Voice Control",
      "Keyless Entry",
      "NFC Card Key",
      "One-touch Tailgate",
      "OTA Updates",
      "V2L Technology",
      "e-Platform 3.0",
      "Blade Battery",
      "6 Airbags",
    ],
  },
  "2": {
    name: "BYD ATTO 2",
    subtitle: "The Smart Urban Electric",
    status: "New Electric",
    heroImage: "/images/car2.png",
    bannerImage: "/images/car2.png",
    collageImages: ["/images/car2.png", "/images/car2.png"],
    showcaseImages: ["/images/car2.png", "/images/car2.png"],
    videos: [],
    showcaseFeatures: [],
    exteriorColors: [],
    interiorColors: [],
    specs: [
      { value: "7.9", unit: "s", label: "0-100Km/h" },
      { value: "130", unit: "kW", label: "Power" },
      { value: "345", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Smart city driving",
      body: "The BYD ATTO 2 brings next-generation electric performance to urban commuters. With enhanced range, faster charging, and an evolved interior, it's the natural upgrade for city dwellers who demand more.",
    },
    design: {
      title: "A design where function meets fun",
      features: [],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [],
    },
    storage: {
      boot: "460L",
      expanded: "Up to 1,200L with rear seats folded",
    },
    models: [],
    moreInfo: {
      handbook: "",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "65.0 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "100 kW"],
      ["Top Speed", "170 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "460 L"],
      ["Kerb Weight", "1,820 kg"],
    ],
    features: [
      '15.6" Rotating Display',
      "Wireless CarPlay",
      "360° Camera",
      "Adaptive Cruise",
      "Lane Assist",
      "V2L Technology",
      "OTA Updates",
      "BYD DiPilot",
    ],
  },
  "3": {
    name: "BYD ATTO 3",
    subtitle: "The Family Electric SUV",
    status: "New Electric",
    heroImage: "/images/car3.png",
    bannerImage: "/images/car3.png",
    collageImages: ["/images/car3.png", "/images/car3.png"],
    showcaseImages: ["/images/car3.png", "/images/car3.png"],
    videos: [],
    showcaseFeatures: [],
    exteriorColors: [],
    interiorColors: [],
    specs: [
      { value: "7.3", unit: "s", label: "0-100Km/h" },
      { value: "150", unit: "kW", label: "Power" },
      { value: "420", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "More space, more range",
      body: "The BYD ATTO 3 is a family-focused electric SUV that refuses to compromise. With generous boot space, class-leading range, and BYD's advanced Blade Battery technology, it's built for every journey.",
    },
    design: {
      title: "A design where function meets fun",
      features: [],
    },
    technology: {
      title: "All the tech you'd expect from a BYD",
      features: [],
    },
    styling: {
      title: "Premium styling",
      subtitle: "Inside and out",
    },
    safety: {
      features: [],
    },
    storage: {
      boot: "440L",
      expanded: "Up to 1,340L with rear seats folded",
    },
    models: [],
    moreInfo: {
      handbook: "",
      testDrive: "",
    },
    specifications: [
      ["Battery Capacity", "72.8 kWh"],
      ["Charging (AC)", "11 kW"],
      ["Charging (DC)", "88 kW"],
      ["Top Speed", "180 km/h"],
      ["Drive Type", "FWD"],
      ["Seats", "5"],
      ["Boot Space", "440 L"],
      ["Kerb Weight", "1,950 kg"],
    ],
    features: [
      '12.8" Rotating Display',
      "Wireless CarPlay",
      "360° Camera",
      "Adaptive Cruise",
      "Lane Assist",
      "V2L Technology",
      "OTA Updates",
      "BYD DiPilot",
    ],
  },
};

const DEFAULT_CAR = CAR_DATA["1"];

const colorOptions = [
  { id: "cream", bg: "#E8E0D0" },
  { id: "blue", bg: "#7B9DB8" },
  { id: "lime", bg: "#B8C840" },
  { id: "dark", bg: "#2D2D2D" },
];

const TABS = ["Overview", "Specifications", "Features", "Learn"];

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "people", label: "Community", icon: "people" },
];

export default function CarInfoPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
  const car = CAR_DATA[id] ?? DEFAULT_CAR;

  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedView, setSelectedView] = useState<"front" | "side">("front");
  const [selectedVariant, setSelectedVariant] = useState<
    "essential" | "premium"
  >("essential");
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeNav, setActiveNav] = useState<string>("car");

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") {
      router.push("/");
    } else if (itemId === "car") {
      router.push("/car-details");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden">
      {/* ── Hero Section ── */}
      <div className="relative w-full">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={car.heroImage}
            alt={car.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-8 left-6 right-6 text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">{car.name}</h1>
            <p className="text-lg md:text-xl mb-4 opacity-90">{car.subtitle}</p>
            <div className="flex items-center gap-3">
              <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {car.status}
              </span>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Build & Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Performance Highlights ── */}
      <div className="px-6 py-8 bg-gray-50">
        <h2 className="text-2xl font-black text-center mb-8 text-gray-900">
          Performance Highlights
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {car.specs.map((spec) => (
            <div key={spec.label} className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">
                {spec.value}{" "}
                <span className="text-xl font-bold text-gray-500">
                  {spec.unit}
                </span>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Overview Section ── */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-4">{car.overview.heading}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            "{car.overview.body}"
          </p>
        </div>
      </div>

      {/* ── Banner Image ── */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <Image
          src={car.bannerImage}
          alt="Banner"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* ── Design Section ── */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            {car.design.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {car.collageImages.map((image, index) => (
              <div
                key={index}
                className="relative h-[300px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Design ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Design Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {car.showcaseFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-24 h-24 relative rounded-xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Technology Section ── */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            {car.technology.title}
          </h2>

          {/* Video or Image */}
          {car.videos[0] ? (
            <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12">
              <video
                src={car.videos[0]}
                controls
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
              />
            </div>
          ) : (
            <div className="w-full h-[400px] relative rounded-2xl overflow-hidden mb-12">
              <Image
                src={car.showcaseImages[0]}
                alt="Technology"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Tech Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {car.technology.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Premium Styling Section ── */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
            {car.styling.title}
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12">
            {car.styling.subtitle}
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedView("front")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  selectedView === "front"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setSelectedView("side")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  selectedView === "side"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Side
              </button>
            </div>
          </div>

          {/* Main Car Display */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-50">
              {car.exteriorColors.length > 0 && (
                <Image
                  src={
                    car.exteriorColors.find(
                      (c) => c.colorCode === selectedColor,
                    )?.images[selectedView][selectedVariant] ||
                    "/images/car.png"
                  }
                  alt={`${car.name} ${selectedColor} ${selectedView} ${selectedVariant}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>

            {/* Car Info Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <p className="text-sm font-semibold text-gray-900">
                {car.name}{" "}
                {
                  car.exteriorColors.find((c) => c.colorCode === selectedColor)
                    ?.name
                }{" "}
                <span className="text-blue-500 capitalize">
                  {selectedVariant}
                </span>
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Choose Color
            </h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {car.exteriorColors.map((color) => (
                <button
                  key={color.colorCode}
                  onClick={() => setSelectedColor(color.colorCode)}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === color.colorCode
                      ? "border-gray-900 scale-110"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  style={{
                    backgroundColor:
                      color.colorCode === "white"
                        ? "#f8f9fa"
                        : color.colorCode === "blue"
                          ? "#007bff"
                          : color.colorCode === "yellow"
                            ? "#ffc107"
                            : "#212529",
                  }}
                  title={color.name}
                >
                  {selectedColor === color.colorCode && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full border border-gray-900"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {
                car.exteriorColors.find((c) => c.colorCode === selectedColor)
                  ?.name
              }
            </p>
          </div>

          {/* Variant Selection */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSelectedVariant("essential")}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedVariant === "essential"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Essential
            </button>
            <button
              onClick={() => setSelectedVariant("premium")}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedVariant === "premium"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* ── Safety & Features Section ── */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
            Fun, Easy and Safe
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {car.safety.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Storage Solutions */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Clever storage solutions
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-2xl font-black text-blue-500 mb-2">
                  {car.storage.boot}
                </div>
                <p className="text-sm text-gray-700">Boot space</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-2xl font-black text-blue-500 mb-2">
                  {car.storage.expanded}
                </div>
                <p className="text-sm text-gray-700">With rear seats folded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Model Comparison ── */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
            Choose your ATTO 1
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12">
            Compare Models
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {car.models.map((model, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  {model.name}
                </h3>
                <ul className="space-y-3">
                  {model.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-900">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── More Info Section ── */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            More ATTO 1
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Owner's Handbook */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {car.moreInfo.handbook && (
                <div className="h-48 relative">
                  <Image
                    src={car.moreInfo.handbook}
                    alt="Owner's Handbook"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Owner's handbook
                </h3>
                <p className="text-gray-700 mb-4">Download digital handbook.</p>
                <button className="text-blue-500 font-semibold hover:text-blue-600">
                  Download →
                </button>
              </div>
            </div>

            {/* Test Drive */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Test Drive
                </h3>
                <p className="text-gray-700 mb-4">
                  Book a test drive at a BYD experience centre.
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navigationItems}
        activeItem={activeNav}
        onItemClick={handleNavClick}
      />
    </div>
  );
}

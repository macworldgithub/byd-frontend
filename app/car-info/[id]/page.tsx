// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import { useState } from "react";
// import BottomNavigation from "@/components/navigation/BottomNavigation";
// import { NavigationItem } from "@/types/car";
// import { CAR_DATA, DEFAULT_CAR } from "../carData";

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

//   const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
//   const car = CAR_DATA[id] ?? DEFAULT_CAR;

//   const [selectedColor, setSelectedColor] = useState("white");
//   const [selectedView, setSelectedView] = useState<"front" | "side">("front");
//   const [selectedVariant, setSelectedVariant] = useState<
//     "essential" | "premium"
//   >("essential");
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [activeNav, setActiveNav] = useState<string>("car");
//   const [viewMode, setViewMode] = useState<"static" | "interior" | "exterior">(
//     "static",
//   );

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     if (itemId === "home") {
//       router.push("/");
//     } else if (itemId === "car") {
//       router.push("/car-details");
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden">
//       {/* ── Hero Section ── */}
//       <div className="relative w-full">
//         {/* Hero Image */}
//         <div className="relative w-full h-[400px] md:h-[500px]">
//           <Image
//             src={car.heroImage}
//             alt={car.name}
//             fill
//             className="object-cover"
//             priority
//             unoptimized
//           />
//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-black/40" />

//           {/* Back Button */}
//           <button
//             onClick={() => router.back()}
//             className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="w-5 h-5"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             <span className="text-sm font-medium">Back</span>
//           </button>

//           {/* Title Overlay */}
//           <div className="absolute bottom-8 left-6 right-6 text-white">
//             <h1 className="text-3xl md:text-4xl font-black mb-2">{car.name}</h1>
//             <p className="text-lg md:text-xl mb-4 opacity-90">{car.subtitle}</p>
//             <div className="flex items-center gap-3">
//               <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
//                 {car.status}
//               </span>
//               <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
//                 Build & Price
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Performance Highlights ── */}
//       <div className="px-6 py-8 bg-gray-50">
//         <h2 className="text-2xl font-black text-center mb-8 text-gray-900">
//           Performance Highlights
//         </h2>
//         <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
//           {car.specs.map((spec) => (
//             <div key={spec.label} className="text-center">
//               <div className="text-3xl font-black text-gray-900 mb-1">
//                 {spec.value}{" "}
//                 <span className="text-xl font-bold text-gray-500">
//                   {spec.unit}
//                 </span>
//               </div>
//               <div className="text-sm text-gray-600 font-medium">
//                 {spec.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Overview Section ── */}
//       <div className="px-6 py-12">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-2xl font-black mb-4">{car.overview.heading}</h2>
//           <p className="text-lg text-gray-700 leading-relaxed">
//             "{car.overview.body}"
//           </p>
//         </div>
//       </div>

//       {/* ── Banner Image ── */}
//       <div className="w-full h-[300px] md:h-[400px] relative">
//         <Image
//           src={car.bannerImage}
//           alt="Banner"
//           fill
//           className="object-cover"
//           unoptimized
//         />
//       </div>

//       {/* ── Design Section ── */}
//       <div className="px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
//             {car.design.title}
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             {car.collageImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative h-[300px] rounded-2xl overflow-hidden"
//               >
//                 <Image
//                   src={image}
//                   alt={`Design ${index + 1}`}
//                   fill
//                   className="object-cover"
//                   unoptimized
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Design Features Grid */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {car.showcaseFeatures.map((feature, index) => (
//               <div key={index} className="flex gap-4">
//                 <div className="shrink-0 w-24 h-24 relative rounded-xl overflow-hidden">
//                   <Image
//                     src={feature.image}
//                     alt={feature.title}
//                     fill
//                     className="object-cover"
//                     unoptimized
//                   />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-2 text-gray-900">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-700 text-sm">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Technology Section ── */}
//       <div className="px-6 py-12 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
//             {car.technology.title}
//           </h2>

//           {/* Video or Image */}
//           {car.videos[0] ? (
//             <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12">
//               <video
//                 src={car.videos[0]}
//                 controls
//                 className="w-full h-full object-cover"
//                 autoPlay
//                 muted
//                 loop
//               />
//             </div>
//           ) : (
//             <div className="w-full h-[400px] relative rounded-2xl overflow-hidden mb-12">
//               <Image
//                 src={car.showcaseImages[0]}
//                 alt="Technology"
//                 fill
//                 className="object-cover"
//                 unoptimized
//               />
//             </div>
//           )}

//           {/* Tech Features Grid */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {car.technology.features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
//                 <h3 className="font-bold text-xl mb-3 text-gray-900">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-700">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Premium Styling Section ── */}
//       <div className="px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
//             {car.styling.title}
//           </h2>
//           <p className="text-xl text-center text-gray-700 mb-12">
//             {car.styling.subtitle}
//           </p>

//           {/* Tabs */}
//           <div className="flex justify-center mb-8">
//             <div className="inline-flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setSelectedView("front")}
//                 className={`px-6 py-2 rounded-md font-medium transition-all ${
//                   selectedView === "front"
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Front
//               </button>
//               <button
//                 onClick={() => setSelectedView("side")}
//                 className={`px-6 py-2 rounded-md font-medium transition-all ${
//                   selectedView === "side"
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Side
//               </button>
//             </div>
//           </div>

//           {/* Interior/Exterior Tabs */}
//           <div className="flex justify-center mb-8">
//             <div className="inline-flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode("exterior")}
//                 className={`px-6 py-2 rounded-md font-medium transition-all ${
//                   viewMode === "exterior"
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Exterior
//               </button>
//               <button
//                 onClick={() => setViewMode("interior")}
//                 className={`px-6 py-2 rounded-md font-medium transition-all ${
//                   viewMode === "interior"
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Interior
//               </button>
//             </div>
//           </div>

//           {/* Main Car Display */}
//           <div className="relative mb-8">
//             <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-50">
//               {viewMode === "exterior" && car.exteriorColors.length > 0 && (
//                 <Image
//                   src={
//                     car.exteriorColors.find(
//                       (c) => c.colorCode === selectedColor,
//                     )?.images[selectedView][selectedVariant] ||
//                     "/images/car.png"
//                   }
//                   alt={`${car.name} ${selectedColor} ${selectedView} ${selectedVariant}`}
//                   fill
//                   className="object-contain"
//                   unoptimized
//                 />
//               )}
//               {viewMode === "interior" && car.interiorColors.length > 0 && (
//                 <Image
//                   src={car.interiorColors[0]?.image || "/images/car.png"}
//                   alt={`${car.name} Interior`}
//                   fill
//                   className="object-contain"
//                   unoptimized
//                 />
//               )}
//             </div>

//             {/* Car Info Badge */}
//             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
//               <p className="text-sm font-semibold text-gray-900">
//                 {car.name}{" "}
//                 {viewMode === "exterior" &&
//                   car.exteriorColors.find((c) => c.colorCode === selectedColor)
//                     ?.name}
//                 {viewMode === "interior" && car.interiorColors[0]?.name}{" "}
//                 <span className="text-blue-500 capitalize">
//                   {selectedVariant}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* Color Selection - Only show in exterior mode */}
//           {viewMode === "exterior" && (
//             <div className="mb-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
//                 Choose Color
//               </h3>
//               <div className="flex justify-center gap-3 flex-wrap">
//                 {car.exteriorColors.map((color) => (
//                   <button
//                     key={color.colorCode}
//                     onClick={() => setSelectedColor(color.colorCode)}
//                     className={`relative w-12 h-12 rounded-full border-2 transition-all ${
//                       selectedColor === color.colorCode
//                         ? "border-gray-900 scale-110"
//                         : "border-gray-300 hover:border-gray-500"
//                     }`}
//                     style={{
//                       backgroundColor:
//                         color.colorCode === "white"
//                           ? "#f8f9fa"
//                           : color.colorCode === "blue"
//                             ? "#007bff"
//                             : color.colorCode === "yellow"
//                               ? "#ffc107"
//                               : "#212529",
//                     }}
//                     title={color.name}
//                   >
//                     {selectedColor === color.colorCode && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-2 h-2 bg-white rounded-full border border-gray-900"></div>
//                       </div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//               <p className="text-center text-sm text-gray-600 mt-2">
//                 {
//                   car.exteriorColors.find((c) => c.colorCode === selectedColor)
//                     ?.name
//                 }
//               </p>
//             </div>
//           )}

//           {/* Variant Selection - Only show in exterior mode */}
//           {viewMode === "exterior" && (
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setSelectedVariant("essential")}
//                 className={`px-8 py-3 rounded-full font-semibold transition-all ${
//                   selectedVariant === "essential"
//                     ? "bg-gray-900 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 Essential
//               </button>
//               <button
//                 onClick={() => setSelectedVariant("premium")}
//                 className={`px-8 py-3 rounded-full font-semibold transition-all ${
//                   selectedVariant === "premium"
//                     ? "bg-gray-900 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 Premium
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Safety & Features Section ── */}
//       <div className="px-6 py-12 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
//             Fun, Easy and Safe
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             {car.safety.features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
//                 <h3 className="font-bold text-xl mb-3 text-gray-900">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Storage Solutions */}
//           <div className="text-center">
//             <h3 className="text-2xl font-bold mb-6 text-gray-900">
//               Clever storage solutions
//             </h3>
//             <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//               <div className="bg-white p-6 rounded-2xl shadow-sm">
//                 <div className="text-2xl font-black text-blue-500 mb-2">
//                   {car.storage.boot}
//                 </div>
//                 <p className="text-sm text-gray-700">Boot space</p>
//               </div>
//               <div className="bg-white p-6 rounded-2xl shadow-sm">
//                 <div className="text-2xl font-black text-blue-500 mb-2">
//                   {car.storage.expanded}
//                 </div>
//                 <p className="text-sm text-gray-700">With rear seats folded</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Model Comparison ── */}
//       <div className="px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
//             Choose your ATTO 1
//           </h2>
//           <p className="text-xl text-center text-gray-700 mb-12">
//             Compare Models
//           </p>

//           <div className="grid md:grid-cols-2 gap-8">
//             {car.models.map((model, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-2xl p-8"
//               >
//                 <h3 className="text-xl font-bold mb-6 text-gray-900">
//                   {model.name}
//                 </h3>
//                 <ul className="space-y-3">
//                   {model.specs.map((spec, specIndex) => (
//                     <li key={specIndex} className="flex items-center gap-2">
//                       <svg
//                         className="w-5 h-5 text-green-500"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span className="text-gray-900">{spec}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── More Info Section ── */}
//       <div className="px-6 py-12 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
//             More ATTO 1
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Owner's Handbook */}
//             <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
//               {car.moreInfo.handbook && (
//                 <div className="h-48 relative">
//                   <Image
//                     src={car.moreInfo.handbook}
//                     alt="Owner's Handbook"
//                     fill
//                     className="object-cover"
//                     unoptimized
//                   />
//                 </div>
//               )}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-gray-900">
//                   Owner's handbook
//                 </h3>
//                 <p className="text-gray-700 mb-4">Download digital handbook.</p>
//                 <button className="text-blue-500 font-semibold hover:text-blue-600">
//                   Download →
//                 </button>
//               </div>
//             </div>

//             {/* Test Drive */}
//             <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
//               <div className="h-48 bg-gray-100 flex items-center justify-center">
//                 <svg
//                   className="w-16 h-16 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 text-gray-900">
//                   Test Drive
//                 </h3>
//                 <p className="text-gray-700 mb-4">
//                   Book a test drive at a BYD experience centre.
//                 </p>
//                 <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
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

// "use client";

// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import BottomNavigation from "@/components/navigation/BottomNavigation";
// import { NavigationItem } from "@/types/car";
// import { CAR_DATA, DEFAULT_CAR } from "../carData";

// const navigationItems: NavigationItem[] = [
//   { id: "home", label: "Home", icon: "home" },
//   { id: "car", label: "Cars", icon: "car" },
//   { id: "people", label: "Community", icon: "people" },
// ];

// export default function CarInfoPage() {
//   const router = useRouter();
//   const params = useParams();

//   const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
//   const car = CAR_DATA[id] ?? DEFAULT_CAR;

//   const [selectedColor, setSelectedColor] = useState(
//     car.exteriorColors[0]?.colorCode ?? "white"
//   );
//   const [selectedView, setSelectedView] = useState<"front" | "side">("front");
//   const [selectedVariant, setSelectedVariant] = useState<"essential" | "premium">("essential");
//   const [activeNav, setActiveNav] = useState<string>("car");
//   const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
//   const [scrollY, setScrollY] = useState(0);
//   const [activeSection, setActiveSection] = useState(0);
//   const heroRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     if (itemId === "home") router.push("/");
//     else if (itemId === "car") router.push("/car-details");
//   };

//   const parallaxOffset = scrollY * 0.4;

//   return (
//     <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden"
//       style={{ background: "#080A0E", color: "#E8ECF0", fontFamily: "'Rajdhani', 'Barlow', sans-serif" }}>

//       {/* ── GLOBAL STYLES ── */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap');

//         * { box-sizing: border-box; }

//         :root {
//           --byd-blue: #00A8E8;
//           --byd-blue-glow: rgba(0, 168, 232, 0.3);
//           --byd-dark: #080A0E;
//           --byd-card: #0D1117;
//           --byd-card-2: #111620;
//           --byd-border: rgba(255,255,255,0.07);
//           --byd-text: #E8ECF0;
//           --byd-muted: #6B7280;
//           --byd-accent: #00D4FF;
//         }

//         .kiosk-section {
//           opacity: 0;
//           transform: translateY(40px);
//           animation: sectionReveal 0.8s ease forwards;
//         }

//         @keyframes sectionReveal {
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .spec-card {
//           position: relative;
//           background: linear-gradient(135deg, #0D1117 0%, #111620 100%);
//           border: 1px solid rgba(0, 168, 232, 0.15);
//           transition: all 0.3s ease;
//         }
//         .spec-card::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           background: linear-gradient(135deg, rgba(0, 168, 232, 0.06) 0%, transparent 60%);
//           opacity: 0;
//           transition: opacity 0.3s;
//         }
//         .spec-card:hover::before { opacity: 1; }
//         .spec-card:hover { border-color: rgba(0, 168, 232, 0.4); transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,168,232,0.12); }

//         .tab-btn {
//           position: relative;
//           padding: 10px 24px;
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 600;
//           font-size: 13px;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 2px;
//           background: transparent;
//           color: #6B7280;
//           cursor: pointer;
//           transition: all 0.25s ease;
//         }
//         .tab-btn.active {
//           background: var(--byd-blue);
//           border-color: var(--byd-blue);
//           color: #fff;
//           box-shadow: 0 0 24px rgba(0,168,232,0.35);
//         }
//         .tab-btn:not(.active):hover {
//           border-color: rgba(0, 168, 232, 0.5);
//           color: var(--byd-text);
//         }

//         .color-dot {
//           position: relative;
//           width: 36px; height: 36px;
//           border-radius: 50%;
//           border: 2px solid transparent;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
//         .color-dot.active {
//           border-color: var(--byd-blue);
//           box-shadow: 0 0 0 3px rgba(0,168,232,0.25);
//           transform: scale(1.15);
//         }
//         .color-dot:not(.active):hover { transform: scale(1.1); }

//         .glow-line {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, var(--byd-blue), transparent);
//           opacity: 0.5;
//         }

//         .price-badge {
//           background: linear-gradient(135deg, rgba(0,168,232,0.15), rgba(0,168,232,0.05));
//           border: 1px solid rgba(0,168,232,0.3);
//         }

//         .feature-row {
//           border-bottom: 1px solid rgba(255,255,255,0.04);
//           transition: background 0.2s;
//         }
//         .feature-row:hover { background: rgba(0,168,232,0.04); }

//         .hero-title {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 900;
//           text-transform: uppercase;
//           letter-spacing: -0.01em;
//           line-height: 0.9;
//         }

//         .section-label {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px;
//           letter-spacing: 0.3em;
//           text-transform: uppercase;
//           color: var(--byd-blue);
//           font-weight: 600;
//         }

//         .section-title {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: 0.02em;
//         }

//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(0,168,232,0.2); }
//           50% { box-shadow: 0 0 40px rgba(0,168,232,0.5); }
//         }
//         .pulse-blue { animation: pulse-glow 3s ease-in-out infinite; }

//         .model-card {
//           background: linear-gradient(160deg, #0D1117, #111620);
//           border: 1px solid rgba(255,255,255,0.06);
//           transition: all 0.3s ease;
//         }
//         .model-card:hover {
//           border-color: rgba(0,168,232,0.35);
//           box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,168,232,0.08);
//           transform: translateY(-4px);
//         }
//         .model-card.featured {
//           border-color: rgba(0,168,232,0.3);
//           background: linear-gradient(160deg, #0D1520, #0A1A2E);
//         }

//         .stat-number {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-weight: 900;
//           background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           line-height: 1;
//         }

//         .back-btn {
//           display: flex; align-items: center; gap: 8px;
//           background: rgba(255,255,255,0.06);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255,255,255,0.12);
//           border-radius: 6px;
//           padding: 8px 16px;
//           color: white;
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 13px;
//           font-weight: 600;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
//         .back-btn:hover {
//           background: rgba(255,255,255,0.12);
//           border-color: rgba(255,255,255,0.25);
//         }

//         .tech-card {
//           background: #0D1117;
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 12px;
//           overflow: hidden;
//           transition: all 0.3s;
//         }
//         .tech-card:hover {
//           border-color: rgba(0,168,232,0.3);
//           box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(0,168,232,0.06);
//         }

//         .storage-box {
//           background: linear-gradient(135deg, #0D1117, #111620);
//           border: 1px solid rgba(0,168,232,0.2);
//           border-radius: 12px;
//           padding: 28px 20px;
//           text-align: center;
//         }
//       `}</style>

//       {/* ── HERO ── */}
//       <div ref={heroRef} className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
//         {/* Parallax Image */}
//         <div className="absolute inset-0" style={{ transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}>
//           <Image src={car.heroImage} alt={car.name} fill className="object-cover" priority unoptimized />
//         </div>

//         {/* Multi-layer overlay */}
//         <div className="absolute inset-0" style={{
//           background: 'linear-gradient(0deg, #080A0E 0%, rgba(8,10,14,0.7) 40%, rgba(8,10,14,0.2) 70%, rgba(8,10,14,0.5) 100%)'
//         }} />
//         <div className="absolute inset-0" style={{
//           background: 'linear-gradient(90deg, rgba(8,10,14,0.8) 0%, transparent 60%)'
//         }} />

//         {/* Header bar */}
//         <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5">
//           <button onClick={() => router.back()} className="back-btn">
//             <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//             Back
//           </button>

//           {/* BYD Logo placeholder */}
//           <div style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 900,
//             fontSize: 22,
//             letterSpacing: '0.2em',
//             color: 'white',
//           }}>BYD</div>

//           <div className="price-badge px-4 py-2 rounded-md">
//             <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', color: '#00A8E8' }}>
//               {car.status}
//             </span>
//           </div>
//         </div>

//         {/* Hero content */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-14 md:px-12">
//           {/* Label */}
//           <div className="section-label mb-3">Electric Vehicle · {car.type ?? 'EV'}</div>

//           {/* Name */}
//           <h1 className="hero-title text-white mb-3" style={{ fontSize: 'clamp(52px, 10vw, 100px)' }}>
//             {car.name}
//           </h1>

//           {/* Subtitle */}
//           <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 20, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', marginBottom: 32 }}>
//             {car.subtitle}
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-wrap gap-3">
//             <button
//               className="pulse-blue"
//               style={{
//                 background: '#00A8E8',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 4,
//                 padding: '14px 36px',
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 14,
//                 letterSpacing: '0.18em',
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//               }}
//             >
//               Build & Price
//             </button>
//             <button style={{
//               background: 'transparent',
//               color: 'white',
//               border: '1px solid rgba(255,255,255,0.3)',
//               borderRadius: 4,
//               padding: '14px 36px',
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 600,
//               fontSize: 14,
//               letterSpacing: '0.18em',
//               textTransform: 'uppercase',
//               cursor: 'pointer',
//             }}>
//               Book Test Drive
//             </button>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-2 opacity-50">
//           <div style={{
//             width: 1, height: 50,
//             background: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
//           }} />
//           <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'white' }}>Scroll</span>
//         </div>
//       </div>

//       {/* ── PERFORMANCE STATS ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#080A0E', padding: '72px 24px' }}>
//         <div style={{ maxWidth: 1100, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Performance Data</div>
//           <h2 className="section-title text-center mb-12" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#E8ECF0' }}>
//             Engineering Excellence
//           </h2>

//           <div className="glow-line mb-12" />

//           <div className="grid grid-cols-3 gap-4 md:gap-8">
//             {car.specs.map((spec, i) => (
//               <div key={spec.label} className="spec-card rounded-lg p-6 md:p-8 text-center" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
//                 {/* Accent top border */}
//                 <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00A8E8, transparent)', marginBottom: 20, borderRadius: 2 }} />
//                 <div className="stat-number" style={{ fontSize: 'clamp(36px, 6vw, 60px)' }}>
//                   {spec.value}
//                 </div>
//                 <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 16, color: '#00A8E8', letterSpacing: '0.1em', margin: '4px 0 8px' }}>
//                   {spec.unit}
//                 </div>
//                 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
//                   {spec.label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="glow-line mt-12" />
//         </div>
//       </section>

//       {/* ── OVERVIEW ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.2s', background: '#0A0C10', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 900, margin: '0 auto' }}>
//           <div className="section-label mb-3">{car.name}</div>
//           <h2 className="section-title mb-8" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#E8ECF0' }}>
//             {car.overview.heading}
//           </h2>
//           {/* Quote style */}
//           <div style={{ borderLeft: '3px solid #00A8E8', paddingLeft: 28, marginBottom: 40 }}>
//             <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 300, lineHeight: 1.75, color: 'rgba(232,236,240,0.75)', fontStyle: 'italic' }}>
//               "{car.overview.body}"
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ── BANNER ── */}
//       <div className="w-full relative overflow-hidden" style={{ height: 'clamp(240px, 40vw, 480px)' }}>
//         <Image src={car.bannerImage} alt="Banner" fill className="object-cover" unoptimized />
//         <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #080A0E 0%, transparent 40%, transparent 70%, #080A0E 100%)' }} />
//       </div>

//       {/* ── DESIGN ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#080A0E', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Exterior Design</div>
//           <h2 className="section-title text-center mb-16" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             {car.design.title}
//           </h2>

//           {/* Collage */}
//           <div className="grid md:grid-cols-2 gap-3 mb-16">
//             {car.collageImages.map((img, i) => (
//               <div key={i} className="relative overflow-hidden rounded-sm" style={{ height: 'clamp(200px, 25vw, 340px)' }}>
//                 <Image src={img} alt={`Design ${i + 1}`} fill className="object-cover transition-transform duration-700 hover:scale-105" unoptimized />
//                 <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,168,232,0.06) 0%, transparent 60%)' }} />
//               </div>
//             ))}
//           </div>

//           {/* Design features */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {car.showcaseFeatures.map((feature, i) => (
//               <div key={i} className="flex gap-5 p-5 rounded-sm tech-card">
//                 <div className="relative shrink-0 overflow-hidden rounded-sm" style={{ width: 96, height: 96 }}>
//                   <Image src={feature.image} alt={feature.title} fill className="object-cover" unoptimized />
//                   <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(0,168,232,0.15))' }} />
//                 </div>
//                 <div>
//                   <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#E8ECF0', marginBottom: 8 }}>
//                     {feature.title}
//                   </h3>
//                   <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.65, color: '#6B7280', fontWeight: 400 }}>
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── TECHNOLOGY ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#0A0C10', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Innovation</div>
//           <h2 className="section-title text-center mb-16" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             {car.technology.title}
//           </h2>

//           {/* Video */}
//           <div className="relative overflow-hidden rounded-sm mb-16" style={{ height: 'clamp(220px, 35vw, 480px)', border: '1px solid rgba(0,168,232,0.12)' }}>
//             {car.videos[0] ? (
//               <video src={car.videos[0]} autoPlay muted loop className="w-full h-full object-cover" />
//             ) : (
//               <Image src={car.showcaseImages?.[0] ?? car.heroImage} alt="Tech" fill className="object-cover" unoptimized />
//             )}
//             <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(8,10,14,0.6) 0%, transparent 50%)' }} />
//           </div>

//           {/* Tech cards */}
//           <div className="grid md:grid-cols-2 gap-5">
//             {car.technology.features.map((feature, i) => (
//               <div key={i} className="tech-card p-7">
//                 {/* Icon accent */}
//                 <div style={{ width: 32, height: 3, background: '#00A8E8', borderRadius: 2, marginBottom: 16 }} />
//                 <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#E8ECF0', marginBottom: 12 }}>
//                   {feature.title}
//                 </h3>
//                 <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#6B7280' }}>
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CONFIGURATOR ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#080A0E', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Personalize</div>
//           <h2 className="section-title text-center mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             {car.styling.title}
//           </h2>
//           <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 16, textAlign: 'center', color: '#6B7280', marginBottom: 48, letterSpacing: '0.05em' }}>
//             {car.styling.subtitle}
//           </p>

//           {/* Toggle controls */}
//           <div className="flex flex-wrap justify-center gap-3 mb-8">
//             {/* View toggle */}
//             <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
//               {(["exterior", "interior"] as const).map((v) => (
//                 <button key={v} onClick={() => setViewMode(v)} className={`tab-btn ${viewMode === v ? "active" : ""}`} style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderBottom: 'none' }}>
//                   {v}
//                 </button>
//               ))}
//             </div>

//             {/* Front/Side toggle — exterior only */}
//             {viewMode === "exterior" && (
//               <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
//                 {(["front", "side"] as const).map((v) => (
//                   <button key={v} onClick={() => setSelectedView(v)} className={`tab-btn ${selectedView === v ? "active" : ""}`} style={{ borderRadius: 0, border: 'none' }}>
//                     {v}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Car display */}
//           <div className="relative rounded-sm overflow-hidden mb-8" style={{
//             height: 'clamp(260px, 35vw, 480px)',
//             background: 'linear-gradient(135deg, #0D1117, #0A0E16)',
//             border: '1px solid rgba(0,168,232,0.1)',
//           }}>
//             {/* Corner accents */}
//             {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
//               <div key={i} className={`absolute ${pos} w-8 h-8 z-10`} style={{
//                 borderTop: i < 2 ? '2px solid rgba(0,168,232,0.4)' : 'none',
//                 borderBottom: i >= 2 ? '2px solid rgba(0,168,232,0.4)' : 'none',
//                 borderLeft: i % 2 === 0 ? '2px solid rgba(0,168,232,0.4)' : 'none',
//                 borderRight: i % 2 === 1 ? '2px solid rgba(0,168,232,0.4)' : 'none',
//               }} />
//             ))}

//             {viewMode === "exterior" && car.exteriorColors.length > 0 && (
//               <Image
//                 src={
//                   car.exteriorColors.find((c) => c.colorCode === selectedColor)?.images[selectedView][selectedVariant] ||
//                   "/images/car.png"
//                 }
//                 alt={`${car.name} ${selectedColor}`}
//                 fill
//                 className="object-contain"
//                 unoptimized
//               />
//             )}
//             {viewMode === "interior" && car.interiorColors.length > 0 && (
//               <Image src={car.interiorColors[0]?.image || "/images/car.png"} alt={`${car.name} Interior`} fill className="object-contain" unoptimized />
//             )}

//             {/* Badge */}
//             <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-sm" style={{ background: 'rgba(8,10,14,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
//               <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8E8' }} />
//               <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', color: '#E8ECF0' }}>
//                 {viewMode === "exterior"
//                   ? car.exteriorColors.find((c) => c.colorCode === selectedColor)?.name
//                   : car.interiorColors[0]?.name}
//                 {" · "}
//                 <span style={{ color: '#00A8E8', textTransform: 'capitalize' }}>{selectedVariant}</span>
//               </span>
//             </div>
//           </div>

//           {/* Color picker */}
//           {viewMode === "exterior" && (
//             <div className="mb-8 text-center">
//               <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 16 }}>
//                 Exterior Color
//               </p>
//               <div className="flex justify-center gap-4 flex-wrap mb-3">
//                 {car.exteriorColors.map((color) => {
//                   const colorMap: Record<string, string> = {
//                     white: "#F5F4F0", blue: "#1A56D6", yellow: "#F5C200",
//                     black: "#1A1A1A", red: "#C1121F", grey: "#8E8E93",
//                     silver: "#C0C0C0", green: "#2D6A4F",
//                   };
//                   return (
//                     <button
//                       key={color.colorCode}
//                       onClick={() => setSelectedColor(color.colorCode)}
//                       className={`color-dot ${selectedColor === color.colorCode ? "active" : ""}`}
//                       style={{ background: colorMap[color.colorCode] ?? color.colorCode }}
//                       title={color.name}
//                     />
//                   );
//                 })}
//               </div>
//               <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#6B7280', letterSpacing: '0.05em' }}>
//                 {car.exteriorColors.find((c) => c.colorCode === selectedColor)?.name}
//               </p>
//             </div>
//           )}

//           {/* Variant picker */}
//           {viewMode === "exterior" && (
//             <div className="flex justify-center gap-4">
//               {(["essential", "premium"] as const).map((v) => (
//                 <button key={v} onClick={() => setSelectedVariant(v)} className={`tab-btn ${selectedVariant === v ? "active" : ""}`}>
//                   {v}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ── SAFETY ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#0A0C10', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Protection</div>
//           <h2 className="section-title text-center mb-16" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             Fun, Easy &amp; Safe
//           </h2>

//           <div className="grid md:grid-cols-2 gap-5 mb-16">
//             {car.safety.features.map((feature, i) => (
//               <div key={i} className="tech-card p-7">
//                 <div style={{ width: 32, height: 3, background: 'linear-gradient(90deg, #00A8E8, transparent)', borderRadius: 2, marginBottom: 16 }} />
//                 <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E8ECF0', marginBottom: 10 }}>
//                   {feature.title}
//                 </h3>
//                 <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#6B7280' }}>
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Storage */}
//           <div className="glow-line mb-12" />
//           <h3 className="section-title text-center mb-8" style={{ fontSize: 28, color: '#E8ECF0' }}>Clever Storage</h3>
//           <div className="grid grid-cols-2 gap-5 max-w-lg mx-auto">
//             <div className="storage-box">
//               <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 42, color: '#00A8E8', lineHeight: 1, marginBottom: 8 }}>
//                 {car.storage.boot}
//               </div>
//               <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Boot Space</p>
//             </div>
//             <div className="storage-box">
//               <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 42, color: '#00A8E8', lineHeight: 1, marginBottom: 8 }}>
//                 {car.storage.expanded}
//               </div>
//               <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Seats Folded</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── MODEL COMPARISON ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#080A0E', padding: '80px 24px' }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <div className="section-label text-center mb-2">Configuration</div>
//           <h2 className="section-title text-center mb-4" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             Choose Your {car.name}
//           </h2>
//           <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 16, textAlign: 'center', color: '#6B7280', marginBottom: 48 }}>
//             Compare Models
//           </p>

//           <div className="grid md:grid-cols-2 gap-6">
//             {car.models.map((model, i) => (
//               <div key={i} className={`model-card rounded-sm p-8 ${i === 1 ? "featured" : ""}`}>
//                 {i === 1 && (
//                   <div style={{
//                     display: 'inline-block', marginBottom: 16,
//                     background: 'rgba(0,168,232,0.15)', border: '1px solid rgba(0,168,232,0.3)',
//                     borderRadius: 2, padding: '3px 12px',
//                     fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11,
//                     letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00A8E8',
//                   }}>
//                     Recommended
//                   </div>
//                 )}
//                 <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#E8ECF0', marginBottom: 24 }}>
//                   {model.name}
//                 </h3>
//                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
//                   {model.specs.map((spec, si) => (
//                     <li key={si} className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
//                       <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,168,232,0.15)', border: '1px solid rgba(0,168,232,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                         <svg className="w-3 h-3" fill="none" stroke="#00A8E8" strokeWidth={2.5} viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                       <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#A0A8B0', fontWeight: 400 }}>{spec}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button style={{
//                   width: '100%', marginTop: 28,
//                   background: i === 1 ? '#00A8E8' : 'transparent',
//                   color: i === 1 ? '#fff' : '#00A8E8',
//                   border: `1px solid ${i === 1 ? '#00A8E8' : 'rgba(0,168,232,0.3)'}`,
//                   borderRadius: 4, padding: '12px 0',
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700, fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
//                   transition: 'all 0.25s',
//                 }}>
//                   Configure Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA FOOTER ── */}
//       <section className="kiosk-section" style={{ animationDelay: '0.1s', background: '#0A0C10', padding: '80px 24px', paddingBottom: 120 }}>
//         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//           <h2 className="section-title text-center mb-12" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: '#E8ECF0' }}>
//             Experience {car.name}
//           </h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Handbook */}
//             <div className="tech-card overflow-hidden">
//               {car.moreInfo?.handbook && (
//                 <div className="relative" style={{ height: 200 }}>
//                   <Image src={car.moreInfo.handbook} alt="Handbook" fill className="object-cover" unoptimized />
//                   <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #0D1117, transparent 60%)' }} />
//                 </div>
//               )}
//               <div className="p-7">
//                 <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E8ECF0', marginBottom: 8 }}>
//                   Owner's Handbook
//                 </h3>
//                 <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
//                   Download the complete digital handbook for your vehicle.
//                 </p>
//                 <button style={{
//                   background: 'transparent', color: '#00A8E8',
//                   border: '1px solid rgba(0,168,232,0.3)', borderRadius: 4,
//                   padding: '10px 24px',
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
//                 }}>
//                   Download PDF →
//                 </button>
//               </div>
//             </div>

//             {/* Test Drive */}
//             <div className="tech-card overflow-hidden" style={{ border: '1px solid rgba(0,168,232,0.2)', background: 'linear-gradient(160deg, #0D1520, #080A0E)' }}>
//               <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(0,168,232,0.05), rgba(0,168,232,0.12))' }}>
//                 <svg className="w-20 h-20" fill="none" stroke="rgba(0,168,232,0.5)" strokeWidth={1} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="p-7">
//                 <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#E8ECF0', marginBottom: 8 }}>
//                   Book a Test Drive
//                 </h3>
//                 <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
//                   Experience the {car.name} at a BYD Experience Centre near you.
//                 </p>
//                 <button className="pulse-blue" style={{
//                   background: '#00A8E8', color: '#fff',
//                   border: 'none', borderRadius: 4,
//                   padding: '12px 28px',
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
//                 }}>
//                   Reserve Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Bottom Navigation */}
//       <BottomNavigation items={navigationItems} activeItem={activeNav} onItemClick={handleNavClick} />
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type TouchEvent,
  type ReactNode,
} from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";
import { CAR_DATA, DEFAULT_CAR } from "../carData";

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "people", label: "Community", icon: "people" },
];

// ─── SECTION DEFINITIONS ────────────────────────────────────────────────
type SectionId =
  | "hero"
  | "specs"
  | "overview"
  | "design"
  | "technology"
  | "configurator"
  | "safety"
  | "models"
  | "cta";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Overview" },
  { id: "specs", label: "Performance" },
  { id: "overview", label: "Story" },
  { id: "design", label: "Design" },
  { id: "technology", label: "Technology" },
  { id: "configurator", label: "Configure" },
  { id: "safety", label: "Safety" },
  { id: "models", label: "Models" },
  { id: "cta", label: "Experience" },
];

export default function CarInfoPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
  const car = CAR_DATA[id] ?? DEFAULT_CAR;

  // Section state
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  // Responsive tablet state
  const [isTablet, setIsTablet] = useState(false);

  // Configurator state
  const [selectedColor, setSelectedColor] = useState(
    car.exteriorColors[0]?.colorCode ?? "white",
  );
  const [selectedView, setSelectedView] = useState<"front" | "side">("front");
  const [selectedVariant, setSelectedVariant] = useState<
    "essential" | "premium"
  >("essential");
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  const [activeNav, setActiveNav] = useState<string>("car");

  // Swipe handling
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 768 && w <= 1180);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActiveSection(0);
    setSlideDir("left");
    setIsTransitioning(false);

    setSelectedColor(car.exteriorColors[0]?.colorCode ?? "white");
    setSelectedView("front");
    setSelectedVariant("essential");
    setViewMode("exterior");
  }, [id, car]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const goToSection = useCallback(
    (index: number, dir?: "left" | "right") => {
      if (isTransitioning || index === activeSection) return;

      const direction = dir ?? (index > activeSection ? "left" : "right");
      setSlideDir(direction);
      setIsTransitioning(true);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        setActiveSection(index);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning, activeSection],
  );

  const nextSection = useCallback(() => {
    if (activeSection < SECTIONS.length - 1) {
      goToSection(activeSection + 1, "left");
    }
  }, [activeSection, goToSection]);

  const prevSection = useCallback(() => {
    if (activeSection > 0) {
      goToSection(activeSection - 1, "right");
    }
  }, [activeSection, goToSection]);

  // Touch events
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const dt = Date.now() - touchStartTime.current;

    // Only register horizontal swipes that are faster than 600ms and >50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && dt < 600) {
      if (dx < 0) nextSection();
      else prevSection();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSection();
      if (e.key === "ArrowLeft") prevSection();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSection, prevSection]);

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") router.push("/");
    else if (itemId === "car") router.push("/car-details");
  };

  const colorMap: Record<string, string> = {
    white: "#d9d4c8",
    blue: "#8299ac",
    yellow: "#b5bb4d",
    black: "#2a2e37",
    red: "#C1121F",
    grey: "#8E8E93",
    silver: "#C0C0C0",
    green: "#2D6A4F",
  };

  // ─── SECTION RENDERERS ───────────────────────────────────────────────

  const renderHero = () => (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={car.heroImage}
        alt={car.name}
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg,#080A0E 0%,rgba(8,10,14,0.65) 45%,rgba(8,10,14,0.2) 70%,rgba(8,10,14,0.5) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,rgba(8,10,14,0.85) 0%,transparent 60%)",
        }}
      />

      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <button onClick={() => router.back()} className="back-btn">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: "0.2em",
            color: "white",
          }}
        >
          BYD
        </div>

        <div className="price-badge px-3 py-2 rounded-md md:px-4">
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.05em",
              color: "#00A8E8",
            }}
          >
            {car.status}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-20 md:px-8 md:pb-24 lg:px-12">
        <div className="section-label mb-3">
          Electric Vehicle · {car.type ?? "EV"}
        </div>

        <h1
          className="hero-title text-white mb-3"
          style={{ fontSize: "clamp(42px,7vw,100px)" }}
        >
          {car.name}
        </h1>

        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontWeight: 300,
            fontSize: "clamp(15px,1.8vw,20px)",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.05em",
            marginBottom: 32,
            maxWidth: 720,
          }}
        >
          {car.subtitle}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            className="pulse-blue"
            style={{
              background: "#00A8E8",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "14px 36px",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Build &amp; Price
          </button>

          <button
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 4,
              padding: "14px 36px",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Book Test Drive
          </button>
        </div>
      </div>
    </div>
  );

  const renderSpecs = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Performance Data</div>
      <h2
        className="section-title text-center mb-8"
        style={{ fontSize: "clamp(28px,5vw,48px)", color: "#E8ECF0" }}
      >
        Engineering Excellence
      </h2>

      <div className="glow-line mb-8" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {car.specs.map((spec, i) => (
          <div
            key={spec.label}
            className="spec-card rounded-lg p-5 text-center"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg,transparent,#00A8E8,transparent)",
                marginBottom: 16,
                borderRadius: 2,
              }}
            />
            <div
              className="stat-number"
              style={{ fontSize: "clamp(30px,5vw,56px)" }}
            >
              {spec.value}
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#00A8E8",
                letterSpacing: "0.1em",
                margin: "4px 0 8px",
              }}
            >
              {spec.unit}
            </div>
            <div
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 12,
                color: "#6B7280",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {spec.label}
            </div>
          </div>
        ))}
      </div>

      <div className="glow-line mt-8" />
    </div>
  );

  const renderOverview = () => (
    <div className="section-content">
      <div className="section-label mb-3">{car.name}</div>
      <h2
        className="section-title mb-6"
        style={{ fontSize: "clamp(26px,4vw,44px)", color: "#E8ECF0" }}
      >
        {car.overview.heading}
      </h2>

      <div
        style={{
          borderLeft: "3px solid #00A8E8",
          paddingLeft: 28,
          marginBottom: 32,
        }}
      >
        <p
          style={{
            fontFamily: "'Barlow',sans-serif",
            fontSize: "clamp(15px,2.2vw,19px)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(232,236,240,0.75)",
            fontStyle: "italic",
          }}
        >
          "{car.overview.body}"
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-sm"
        style={{ height: "clamp(170px,25vw,300px)" }}
      >
        <Image
          src={car.bannerImage}
          alt="Banner"
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg,#080A0E 0%,transparent 40%,transparent 70%,#080A0E 100%)",
          }}
        />
      </div>
    </div>
  );

  const renderDesign = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Exterior Design</div>
      <h2
        className="section-title text-center mb-8"
        style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
      >
        {car.design.title}
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-6">
        {car.collageImages.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-sm"
            style={{ height: "clamp(140px,18vw,220px)" }}
          >
            <Image
              src={img}
              alt={`Design ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {car.showcaseFeatures.map((feature, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-sm tech-card">
            <div
              className="relative shrink-0 overflow-hidden rounded-sm"
              style={{ width: 72, height: 72 }}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#E8ECF0",
                  marginBottom: 6,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#6B7280",
                }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnology = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Innovation</div>
      <h2
        className="section-title text-center mb-8"
        style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
      >
        {car.technology.title}
      </h2>

      <div
        className="relative overflow-hidden rounded-sm mb-6"
        style={{
          height: "clamp(190px,28vw,360px)",
          border: "1px solid rgba(0,168,232,0.12)",
        }}
      >
        {car.videos[0] ? (
          <video
            src={car.videos[0]}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={car.heroImage}
            alt="Tech"
            fill
            className="object-cover"
            unoptimized
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg,rgba(8,10,14,0.6) 0%,transparent 50%)",
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {car.technology.features.map((feature, i) => (
          <div key={i} className="tech-card p-5">
            <div
              style={{
                width: 28,
                height: 3,
                background: "#00A8E8",
                borderRadius: 2,
                marginBottom: 12,
              }}
            />
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#E8ECF0",
                marginBottom: 10,
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                lineHeight: 1.65,
                color: "#6B7280",
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConfigurator = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Personalize</div>
      <h2
        className="section-title text-center mb-2"
        style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
      >
        {car.styling.title}
      </h2>
      <p
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontWeight: 300,
          fontSize: 14,
          textAlign: "center",
          color: "#6B7280",
          marginBottom: 20,
        }}
      >
        {car.styling.subtitle}
      </p>

      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          height: "clamp(240px,34vw,420px)",
          background: "linear-gradient(135deg,#0D1117,#0A0E16)",
          border: "1px solid rgba(0,168,232,0.1)",
        }}
      >
        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-8 h-8 z-10`}
            style={{
              borderTop: i < 2 ? "2px solid rgba(0,168,232,0.4)" : "none",
              borderBottom: i >= 2 ? "2px solid rgba(0,168,232,0.4)" : "none",
              borderLeft:
                i % 2 === 0 ? "2px solid rgba(0,168,232,0.4)" : "none",
              borderRight:
                i % 2 === 1 ? "2px solid rgba(0,168,232,0.4)" : "none",
            }}
          />
        ))}

        {viewMode === "exterior" && car.exteriorColors.length > 0 && (
          <Image
            src={
              car.exteriorColors.find((c) => c.colorCode === selectedColor)
                ?.images[selectedView][selectedVariant] || "/images/car.png"
            }
            alt={`${car.name} ${selectedColor}`}
            fill
            className="object-cover"
            unoptimized
          />
        )}

        {viewMode === "interior" && car.interiorColors.length > 0 && (
          <Image
            src={car.interiorColors[0]?.image || "/images/car.png"}
            alt={`${car.name} Interior`}
            fill
            className="object-cover"
            unoptimized
          />
        )}

        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-[calc(100%-24px)] md:max-w-[360px]">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0,
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(0,168,232,0.25)",
              backdropFilter: "blur(12px)",
              background: "rgba(8,10,14,0.75)",
            }}
          >
            {(["exterior", "interior"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                style={{
                  padding: "5px 12px",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: viewMode === v ? "#00A8E8" : "transparent",
                  color: viewMode === v ? "#fff" : "#6B7280",
                  minWidth: 84,
                }}
              >
                {v}
              </button>
            ))}
          </div>

          {viewMode === "exterior" && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0,
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(0,168,232,0.25)",
                backdropFilter: "blur(12px)",
                background: "rgba(8,10,14,0.75)",
              }}
            >
              {(["front", "side"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedView(v)}
                  style={{
                    padding: "5px 12px",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: selectedView === v ? "#00A8E8" : "transparent",
                    color: selectedView === v ? "#fff" : "#6B7280",
                    minWidth: 84,
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          {viewMode === "exterior" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                background: "rgba(8,10,14,0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,168,232,0.2)",
                borderRadius: 4,
                padding: "8px 7px",
                maxWidth: "100%",
              }}
            >
              {car.exteriorColors.map((color) => (
                <button
                  key={color.colorCode}
                  onClick={() => setSelectedColor(color.colorCode)}
                  title={color.name}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: colorMap[color.colorCode] ?? color.colorCode,
                    border:
                      selectedColor === color.colorCode
                        ? "2px solid #00A8E8"
                        : "2px solid rgba(255,255,255,0.15)",
                    boxShadow:
                      selectedColor === color.colorCode
                        ? "0 0 0 2px rgba(0,168,232,0.35)"
                        : "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    transform:
                      selectedColor === color.colorCode
                        ? "scale(1.12)"
                        : "scale(1)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-3 left-3 z-10 flex items-center gap-2 px-3 py-2 rounded-sm"
          style={{
            background: "rgba(8,10,14,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00A8E8",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#E8ECF0",
            }}
          >
            {viewMode === "exterior"
              ? car.exteriorColors.find((c) => c.colorCode === selectedColor)
                  ?.name
              : car.interiorColors[0]?.name}
            {viewMode === "exterior" && (
              <span style={{ color: "#00A8E8" }}> · {selectedVariant}</span>
            )}
          </span>
        </div>

        {viewMode === "exterior" && (
          <div
            className="absolute bottom-3 right-3 z-10"
            style={{
              display: "flex",
              flexWrap: "wrap",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(0,168,232,0.25)",
              backdropFilter: "blur(12px)",
              background: "rgba(8,10,14,0.75)",
            }}
          >
            {(["essential", "premium"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                style={{
                  padding: "5px 10px",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: selectedVariant === v ? "#00A8E8" : "transparent",
                  color: selectedVariant === v ? "#fff" : "#6B7280",
                  minWidth: 86,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSafety = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Protection</div>
      <h2
        className="section-title text-center mb-8"
        style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
      >
        Fun, Easy &amp; Safe
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
        {car.safety.features.map((feature, i) => (
          <div key={i} className="tech-card p-5">
            <div
              style={{
                width: 28,
                height: 3,
                background: "linear-gradient(90deg,#00A8E8,transparent)",
                borderRadius: 2,
                marginBottom: 14,
              }}
            />
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 17,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#E8ECF0",
                marginBottom: 8,
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                lineHeight: 1.65,
                color: "#6B7280",
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="glow-line mb-6" />

      <h3
        className="section-title text-center mb-5"
        style={{ fontSize: 24, color: "#E8ECF0" }}
      >
        Clever Storage
      </h3>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className="storage-box">
          <div
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: 38,
              color: "#00A8E8",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {car.storage.boot}
          </div>
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 12,
              color: "#6B7280",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Boot Space
          </p>
        </div>

        <div className="storage-box">
          <div
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 900,
              fontSize: 38,
              color: "#00A8E8",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {car.storage.expanded}
          </div>
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: 12,
              color: "#6B7280",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Seats Folded
          </p>
        </div>
      </div>
    </div>
  );

  const renderModels = () => (
    <div className="section-content">
      <div className="section-label text-center mb-2">Configuration</div>
      <h2
        className="section-title text-center mb-2"
        style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
      >
        Choose Your {car.name}
      </h2>
      <p
        style={{
          fontFamily: "'Barlow',sans-serif",
          fontWeight: 300,
          fontSize: 14,
          textAlign: "center",
          color: "#6B7280",
          marginBottom: 24,
        }}
      >
        Compare Models
      </p>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {car.models.map((model, i) => (
          <div
            key={i}
            className={`model-card rounded-sm p-6 ${i === 1 ? "featured" : ""}`}
          >
            {i === 1 && (
              <div
                style={{
                  display: "inline-block",
                  marginBottom: 12,
                  background: "rgba(0,168,232,0.15)",
                  border: "1px solid rgba(0,168,232,0.3)",
                  borderRadius: 2,
                  padding: "3px 12px",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#00A8E8",
                }}
              >
                Recommended
              </div>
            )}

            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 800,
                fontSize: 21,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#E8ECF0",
                marginBottom: 18,
              }}
            >
              {model.name}
            </h3>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {model.specs.map((spec, si) => (
                <li
                  key={si}
                  className="feature-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "rgba(0,168,232,0.15)",
                      border: "1px solid rgba(0,168,232,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      stroke="#00A8E8"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: 13,
                      color: "#A0A8B0",
                      fontWeight: 400,
                    }}
                  >
                    {spec}
                  </span>
                </li>
              ))}
            </ul>

            <button
              style={{
                width: "100%",
                marginTop: 20,
                background: i === 1 ? "#00A8E8" : "transparent",
                color: i === 1 ? "#fff" : "#00A8E8",
                border: `1px solid ${i === 1 ? "#00A8E8" : "rgba(0,168,232,0.3)"}`,
                borderRadius: 4,
                padding: "11px 0",
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Configure Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCTA = () => (
    <div className="section-content">
      <h2
        className="section-title text-center mb-10"
        style={{ fontSize: "clamp(26px,5vw,48px)", color: "#E8ECF0" }}
      >
        Experience {car.name}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="tech-card overflow-hidden">
          {car.moreInfo?.handbook && (
            <div className="relative" style={{ height: 180 }}>
              <Image
                src={car.moreInfo.handbook}
                alt="Handbook"
                fill
                className="object-cover"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(0deg,#0D1117,transparent 60%)",
                }}
              />
            </div>
          )}

          <div className="p-6">
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 19,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#E8ECF0",
                marginBottom: 8,
              }}
            >
              Owner&apos;s Handbook
            </h3>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Download the complete digital handbook for your vehicle.
            </p>
            <button
              style={{
                background: "transparent",
                color: "#00A8E8",
                border: "1px solid rgba(0,168,232,0.3)",
                borderRadius: 4,
                padding: "9px 20px",
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Download PDF →
            </button>
          </div>
        </div>

        <div
          className="tech-card overflow-hidden"
          style={{
            border: "1px solid rgba(0,168,232,0.2)",
            background: "linear-gradient(160deg,#0D1520,#080A0E)",
          }}
        >
          <div
            style={{
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg,rgba(0,168,232,0.05),rgba(0,168,232,0.12))",
            }}
          >
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="rgba(0,168,232,0.5)"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="p-6">
            <h3
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 19,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#E8ECF0",
                marginBottom: 8,
              }}
            >
              Book a Test Drive
            </h3>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: 13,
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Experience the {car.name} at a BYD Experience Centre near you.
            </p>
            <button
              className="pulse-blue"
              style={{
                background: "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "11px 24px",
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const sectionRenderers: Record<SectionId, () => ReactNode> = {
    hero: renderHero,
    specs: renderSpecs,
    overview: renderOverview,
    design: renderDesign,
    technology: renderTechnology,
    configurator: renderConfigurator,
    safety: renderSafety,
    models: renderModels,
    cta: renderCTA,
  };

  const currentSection = SECTIONS[activeSection];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${isTablet ? "tablet-layout" : ""}`}
      style={{
        height: "100dvh",
        background: "#080A0E",
        color: "#E8ECF0",
        fontFamily: "'Rajdhani','Barlow',sans-serif",
        userSelect: "none",
        touchAction: "pan-y",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap");

        * {
          box-sizing: border-box;
        }

        :root {
          --byd-blue: #00a8e8;
          --byd-blue-glow: rgba(0, 168, 232, 0.3);
          --byd-dark: #080a0e;
          --byd-card: #0d1117;
          --byd-card-2: #111620;
          --byd-border: rgba(255, 255, 255, 0.07);
          --byd-text: #e8ecf0;
          --byd-muted: #6b7280;
        }

        .spec-card {
          position: relative;
          background: linear-gradient(135deg, #0d1117 0%, #111620 100%);
          border: 1px solid rgba(0, 168, 232, 0.15);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .spec-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(0, 168, 232, 0.06) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .spec-card:hover::before {
          opacity: 1;
        }

        .spec-card:hover {
          border-color: rgba(0, 168, 232, 0.4);
          transform: translateY(-3px);
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #00a8e8, transparent);
          opacity: 0.5;
        }

        .price-badge {
          background: linear-gradient(
            135deg,
            rgba(0, 168, 232, 0.15),
            rgba(0, 168, 232, 0.05)
          );
          border: 1px solid rgba(0, 168, 232, 0.3);
        }

        .feature-row {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: background 0.2s;
        }

        .feature-row:hover {
          background: rgba(0, 168, 232, 0.04);
        }

        .hero-title {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 0.9;
        }

        .section-label {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #00a8e8;
          font-weight: 600;
        }

        .section-title {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(0, 168, 232, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 168, 232, 0.5);
          }
        }

        .pulse-blue {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .model-card {
          background: linear-gradient(160deg, #0d1117, #111620);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }

        .model-card:hover {
          border-color: rgba(0, 168, 232, 0.35);
          box-shadow:
            0 24px 64px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(0, 168, 232, 0.08);
          transform: translateY(-4px);
        }

        .model-card.featured {
          border-color: rgba(0, 168, 232, 0.3);
          background: linear-gradient(160deg, #0d1520, #0a1a2e);
        }

        .stat-number {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 900;
          background: linear-gradient(
            135deg,
            #fff 0%,
            rgba(255, 255, 255, 0.7) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 8px 16px;
          color: white;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .tech-card {
          background: #0d1117;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .tech-card:hover {
          border-color: rgba(0, 168, 232, 0.3);
          box-shadow:
            0 16px 48px rgba(0, 0, 0, 0.5),
            0 0 24px rgba(0, 168, 232, 0.06);
        }

        .storage-box {
          background: linear-gradient(135deg, #0d1117, #111620);
          border: 1px solid rgba(0, 168, 232, 0.2);
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
        }

        .slide-in-left {
          animation: slideInLeft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .slide-out-left {
          animation: slideOutLeft 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        .slide-out-right {
          animation: slideOutRight 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-60px);
            opacity: 0;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(60px);
            opacity: 0;
          }
        }

        .section-content {
          padding: 20px 20px 24px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        @media (min-width: 768px) and (max-width: 1180px) {
          .section-content {
            padding: 28px 28px 32px;
            max-width: 100%;
          }

          .hero-title {
            font-size: clamp(56px, 9vw, 92px);
          }

          .section-title {
            font-size: clamp(30px, 4vw, 46px);
          }

          .back-btn {
            padding: 10px 18px;
            font-size: 12px;
          }

          .spec-card,
          .tech-card,
          .model-card {
            border-radius: 14px;
          }
        }

        @media (max-width: 767px) {
          .section-content {
            padding: 18px 16px 22px;
          }

          .hero-title {
            font-size: clamp(38px, 12vw, 72px);
          }
        }
      `}</style>

      <div
        className={`absolute inset-0 ${
          currentSection.id === "hero" ? "" : "overflow-y-auto"
        } ${
          isTransitioning
            ? slideDir === "left"
              ? "slide-out-left"
              : "slide-out-right"
            : slideDir === "left"
              ? "slide-in-left"
              : "slide-in-right"
        }`}
        style={{
          paddingBottom:
            currentSection.id === "hero"
              ? isTablet
                ? 118
                : 96
              : isTablet
                ? 144
                : 104,
        }}
      >
        {sectionRenderers[currentSection.id]()}
      </div>

      {currentSection.id !== "hero" && (
        <div
          className="absolute top-4 left-1/2 z-30 flex items-center gap-2"
          style={{ transform: "translateX(-50%)" }}
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSection(i)}
              style={{
                width: i === activeSection ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === activeSection ? "#00A8E8" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          background: "linear-gradient(0deg,#080A0E 70%,transparent)",
          paddingTop: 20,
          paddingBottom: isTablet ? 10 : 0,
        }}
      >
        <div className="flex items-center justify-between gap-3 px-3 mb-2 md:px-4">
          <button
            onClick={prevSection}
            disabled={activeSection === 0}
            style={{
              width: 36,
              height: 36,
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(8,10,14,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: activeSection === 0 ? "rgba(255,255,255,0.2)" : "#fff",
              cursor: activeSection === 0 ? "default" : "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div style={{ textAlign: "center", flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: isTablet ? 11 : 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#00A8E8",
                display: "inline-block",
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeSection + 1} / {SECTIONS.length} · {currentSection.label}
            </span>
          </div>

          <button
            onClick={nextSection}
            disabled={activeSection === SECTIONS.length - 1}
            style={{
              width: 36,
              height: 36,
              borderRadius: 4,
              border: "1px solid rgba(0,168,232,0.3)",
              background: "rgba(0,168,232,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:
                activeSection === SECTIONS.length - 1
                  ? "rgba(0,168,232,0.3)"
                  : "#00A8E8",
              cursor:
                activeSection === SECTIONS.length - 1 ? "default" : "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {activeSection === 0 && (
          <div className="flex justify-center mb-2 px-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(8,10,14,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "4px 14px",
                maxWidth: "100%",
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="#6B7280"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "#6B7280",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Swipe to explore
              </span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="#6B7280"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}

        <BottomNavigation
          items={navigationItems}
          activeItem={activeNav}
          onItemClick={handleNavClick}
        />
      </div>
    </div>
  );
}

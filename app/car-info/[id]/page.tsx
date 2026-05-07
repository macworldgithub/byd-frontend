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
    image: string;
    specs: { value: string; unit: string; label: string }[];
    overview: { heading: string; body: string };
    specifications: [string, string][];
    features: string[];
  }
> = {
  "1": {
    name: "BYD ATTO 1",
    subtitle: "The Compact Electric City Car",
    image: "/images/car.png",
    specs: [
      { value: "9.1", unit: "s", label: "0-100Km/h" },
      { value: "115", unit: "kW", label: "Power" },
      { value: "310", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Built for the big city",
      body: "The BYD ATTO 1 is the cool, fun-loving model from the world's largest new-energy vehicle brand. It mixes sharp design, a spacious interior, punchy performance and BYD's trademark in-car technologies – making it the perfect choice for people who don't want to compromise on features.",
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
  "2": {
    name: "BYD ATTO 2",
    subtitle: "The Smart Urban Electric",
    image: "/images/car2.png",
    specs: [
      { value: "7.9", unit: "s", label: "0-100Km/h" },
      { value: "130", unit: "kW", label: "Power" },
      { value: "345", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "Smart city driving",
      body: "The BYD ATTO 2 brings next-generation electric performance to urban commuters. With enhanced range, faster charging, and an evolved interior, it's the natural upgrade for city dwellers who demand more.",
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
    image: "/images/car3.png",
    specs: [
      { value: "7.3", unit: "s", label: "0-100Km/h" },
      { value: "150", unit: "kW", label: "Power" },
      { value: "420", unit: "km", label: "WLTP range" },
    ],
    overview: {
      heading: "More space, more range",
      body: "The BYD ATTO 3 is a family-focused electric SUV that refuses to compromise. With generous boot space, class-leading range, and BYD's advanced Blade Battery technology, it's built for every journey.",
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

// Fallback if id not found
const DEFAULT_CAR = CAR_DATA["1"];

// ─────────────────────────────────────────────

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

  // ── When backend is ready, fetch by params.id ──
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "1");
  const car = CAR_DATA[id] ?? DEFAULT_CAR;
  // ───────────────────────────────────────────────

  const [selectedColor, setSelectedColor] = useState("cream");
  const [selectedVariant, setSelectedVariant] = useState<
    "Essential" | "Premium"
  >("Essential");
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeNav, setActiveNav] = useState<string>("car");

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    // Handle navigation logic here
    if (itemId === "home") {
      router.push("/");
    } else if (itemId === "car") {
      router.push("/car-details");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden">
      {/* ── Hero ── */}
      <div className="relative w-full bg-gradient-to-b from-[#F0EFED] to-white pt-10 pb-0 flex flex-col items-center">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 flex items-center gap-1 text-sm font-semibold text-gray-600"
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
          Back
        </button>

        {/* Title */}
        <div className="text-center px-6 pt-2 pb-1">
          <h1 className="text-[2.2rem] font-black tracking-tight text-gray-900 leading-none">
            {car.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium tracking-wide">
            {car.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              New
            </span>
            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              Electric
            </span>
          </div>
        </div>

        {/* Car Image with watermark */}
        <div className="relative w-full max-w-sm mx-auto mt-4 px-2">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="text-[4.5rem] font-black text-gray-200/80 tracking-tighter select-none whitespace-nowrap">
              {car.name.replace("BYD ", "")}
            </span>
          </div>
          <div className="relative z-10">
            <Image
              src={car.image}
              alt={car.name}
              width={520}
              height={300}
              className="w-full h-auto object-contain drop-shadow-xl"
              priority
              unoptimized
            />
          </div>

          {/* ANCAP Badge */}
          <div className="absolute top-4 right-4 z-20 flex flex-col items-center bg-white/90 rounded-xl px-2 py-1.5 shadow-md">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-[8px] font-black text-gray-900">★</span>
              </div>
              <span className="text-[9px] font-black text-gray-800 tracking-wider">
                ANCAP
              </span>
            </div>
            <span className="text-[8px] bg-yellow-400 text-gray-900 font-black px-1 rounded-sm mt-0.5">
              2024
            </span>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[8px] text-yellow-400">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 360° */}
        <div className="flex items-center gap-1.5 mb-4 mt-1">
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-gray-500"
            >
              <path
                d="M12 4C7 4 3 7.6 3 12s4 8 9 8 9-3.6 9-8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M17 4l2 2-2 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700 tracking-wide">
            360°
          </span>
        </div>

        {/* Color + Variant */}
        <div className="w-full px-5 flex items-center justify-between mb-5">
          <div className="flex gap-2.5 items-center">
            {colorOptions.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  selectedColor === c.id
                    ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                    : "ring-1 ring-gray-200"
                }`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>
          <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
            {(["Essential", "Premium"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedVariant === v
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Performance Stats ── */}
      <div className="px-5 mb-5">
        <h2 className="text-xl font-black text-gray-900 text-center mb-3 tracking-tight">
          {car.name.replace("BYD ", "")} Performance
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {car.specs.map((spec) => (
            <div
              key={spec.label}
              className="border border-gray-200 rounded-2xl px-3 py-4 flex flex-col items-center bg-white shadow-sm"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">
                  {spec.value}
                </span>
                <span className="text-sm font-bold text-gray-500">
                  {spec.unit}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-medium tracking-wide">
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="px-5 mb-4">
        <div className="flex gap-0 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2.5 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === tab ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="px-5 flex-1 pb-28">
        {activeTab === "Overview" && (
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-2">
              {car.overview.heading}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {car.overview.body}
            </p>
            <button className="mt-6 w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-base tracking-wide hover:bg-gray-800 active:scale-95 transition-all">
              Configure Your {car.name.replace("BYD ", "")}
            </button>
          </div>
        )}

        {activeTab === "Specifications" && (
          <div className="space-y-3">
            {car.specifications.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center py-2.5 border-b border-gray-100"
              >
                <span className="text-sm text-gray-500 font-medium">
                  {label}
                </span>
                <span className="text-sm text-gray-900 font-bold">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Features" && (
          <div className="grid grid-cols-2 gap-3 mt-1">
            {car.features.map((feature) => (
              <div
                key={feature}
                className="border border-gray-200 rounded-2xl p-3 bg-white"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="text-xs font-semibold text-gray-800">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Learn" && (
          <div className="space-y-4">
            {[
              {
                title: "What is Blade Battery?",
                desc: "BYD's proprietary LFP cell-to-pack technology for superior safety and longevity.",
              },
              {
                title: "DiPilot Driver Assistance",
                desc: "Advanced suite of ADAS features designed for confident city and highway driving.",
              },
              {
                title: "V2L Charging",
                desc: "Power external devices directly from your car's battery – up to 3.3kW.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gray-200 rounded-2xl p-4"
              >
                <h4 className="text-sm font-black text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
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

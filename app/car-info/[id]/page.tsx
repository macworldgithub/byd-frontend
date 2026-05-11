"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";
import { CAR_DATA, DEFAULT_CAR } from "../carData";

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
  const [viewMode, setViewMode] = useState<"static" | "interior" | "exterior">(
    "static",
  );

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

          {/* Interior/Exterior Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("exterior")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  viewMode === "exterior"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setViewMode("interior")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  viewMode === "interior"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Interior
              </button>
            </div>
          </div>

          {/* Main Car Display */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-50">
              {viewMode === "exterior" && car.exteriorColors.length > 0 && (
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
              {viewMode === "interior" && car.interiorColors.length > 0 && (
                <Image
                  src={car.interiorColors[0]?.image || "/images/car.png"}
                  alt={`${car.name} Interior`}
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
                {viewMode === "exterior" &&
                  car.exteriorColors.find((c) => c.colorCode === selectedColor)
                    ?.name}
                {viewMode === "interior" && car.interiorColors[0]?.name}{" "}
                <span className="text-blue-500 capitalize">
                  {selectedVariant}
                </span>
              </p>
            </div>
          </div>

          {/* Color Selection - Only show in exterior mode */}
          {viewMode === "exterior" && (
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
          )}

          {/* Variant Selection - Only show in exterior mode */}
          {viewMode === "exterior" && (
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
          )}
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

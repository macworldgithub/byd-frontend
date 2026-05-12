"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - no overlay, no opacity */}
      <Image
        src="/images/bg.png"
        alt="Background"
        fill
        className="object-cover object-center pointer-events-none"
        priority
        unoptimized
        quality={100}
      />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-start justify-between px-6 pt-10 md:px-12 lg:px-16">
          {/* Left Text */}
          <div>
            <h1 className="leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold text-white tracking-[-1px]">
              YOUR CAR
              <br />
              IS READY
              <br />
              TO GO
            </h1>
          </div>

          {/* BYD Logo */}
          <div className="pt-2">
            <Image
              src="/images/byd-logo.png"
              alt="BYD Logo"
              width={160}
              height={55}
              className="md:w-48"
              priority
              unoptimized
              quality={100}
            />
          </div>
        </div>

        {/* Middle + Bottom Section */}
        <div className="flex flex-col items-center justify-between flex-1">
          {/* FIND YOUR BYD */}
          <div className="mt-6 px-6 text-center md:mt-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-light text-white/90 tracking-wider">
              FIND YOUR BYD
            </h2>
          </div>

          {/* Car Image - fixed: use large intrinsic dimensions */}
          <div className="relative w-full max-w-2xl px-4">
            <Image
              src="/images/home-car.png"
              alt="BYD Seal U car"
              width={900}
              height={520}
              className="w-full h-auto object-contain"
              priority
              unoptimized
              quality={100}
            />
          </div>

          {/* Unlock Button */}
          <div className="pb-10 px-6 md:pb-12 w-full flex justify-center relative z-50">
            <button
              onClick={() => {
                console.log("Button clicked, navigating to car-details");
                router.push("/car-details");
              }}
              className="group flex w-full max-w-lg items-center justify-center gap-3 rounded-3xl border-2 border-white/70 bg-white/10 px-8 py-5 text-lg font-medium text-black backdrop-blur-md transition-all hover:bg-white hover:text-black hover:shadow-3xl hover:scale-[1.02] active:scale-95 cursor-pointer pointer-events-auto"
              style={{ pointerEvents: "auto" }}
            >
              <Image
                src="/images/lock-icon.png"
                alt="Lock Icon"
                width={22}
                height={22}
                priority
                unoptimized
              />
              Tap To Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

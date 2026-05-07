// import Image from "next/image";
// import background from "@/assets/images/hero-bg.png";

// export default function HeroSection() {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
//       />
//       {/* Dark overlay for text readability */}
//       <div className="absolute inset-0 bg-black/30" />

//       {/* Header */}
//       <header className="absolute right-0 z-10 flex items-center  px-6 py-8 md:px-8 lg:px-12">
//         <div className="flex items-end">
//           <Image
//             src="/images/byd-logo.png"
//             alt="BYD Logo"
//             width={100}
//             height={50}
//             className="md:w-[130px] lg:w-[150px]"
//           />
//         </div>
//         <div className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
//           YOUR CAR IS
//           <br />
//           READY TO GO
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:px-8 lg:px-12">
//         {/* Title */}
//         {/* <div className="mb-8 text-left md:mb-12 lg:mb-16"> */}

//         {/* </div> */}

//         {/* Subtitle */}
//         <div className="mb-12 text-center md:mb-16 lg:mb-20">
//           <h2 className="text-4xl font-light text-white/90 md:text-5xl lg:text-6xl xl:text-7xl">
//             FIND YOUR BYD
//           </h2>
//         </div>

//         {/* Car Image Container */}
//         {/* <div className="relative mb-16 w-full max-w-2xl md:mb-20 lg:mb-24">
//           <div className="relative aspect-video md:aspect-[16/10] lg:aspect-[16/8]">
//             <Image
//               src="/byd-sealion-7.png"
//               alt="BYD SEALION 7"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//         </div> */}

//         {/* Unlock Button */}
//         <div className="relative z-20">
//           <button className="group flex items-center gap-3 rounded-2xl bg-white/90 px-8 py-4 text-lg font-medium text-gray-900 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 md:px-10 md:py-5 md:text-xl">
//             <svg
//               className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 md:h-6 md:w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
//               />
//             </svg>
//             Tap To Unlock
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }
// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden">
//       {/* Background Image */}
//       {/* <Image
//         src="/images/bg.png"
//         alt="Background"
//         fill
//         className="object-cover"
//         priority
//       /> */}
//       <Image
//         src="/images/bg.png"
//         alt="Background"
//         fill
//         className="object-cover"
//         priority
//         unoptimized
//       />
//       {/* Optional Overlay (for better text readability) */}
//       {/* <div className="absolute inset-0 bg-black/30" /> */}

//       {/* Main Content */}
//       <div className="relative z-10 flex min-h-screen flex-col justify-between">
//         {/* Top Header */}
//         <div className="flex items-start justify-between px-6 pt-10 md:px-12 lg:px-16">
//           {/* Left Text */}
//           <div>
//             <h1 className="leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-[-1px]">
//               YOUR CAR
//               <br />
//               IS READY
//               <br />
//               TO GO
//             </h1>
//           </div>

//           {/* BYD Logo */}
//           <div className="pt-2">
//             <Image
//               src="/images/byd-logo.png"
//               alt="BYD Logo"
//               width={160}
//               height={55}
//               className="md:w-48"
//               priority
//             />
//           </div>
//         </div>

//         {/* Middle + Bottom Section */}
//         <div className="flex flex-col items-center justify-between flex-1">
//           {/* FIND YOUR BYD */}
//           <div className="mt-6 px-6 text-center md:mt-10">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-light text-white/90 tracking-wider">
//               FIND YOUR BYD
//             </h2>
//           </div>
//           <div className="pt-2">
//             <Image
//               src="/images/car.png"
//               alt="car"
//               width={100}
//               height={100}
//               className="md:w-xl"
//               priority
//             />
//           </div>
//           {/* Unlock Button */}
//           <div className="pb-10 px-6 md:pb-12 w-full flex justify-center">
//             <button className="group flex w-full max-w-lg items-center justify-center gap-3 rounded-3xl  border-2 border-white/70 px-8 py-5 text-lg font-medium text-black backdrop-blur-md transition-all hover:bg-white hover:text-black hover:shadow-3xl hover:scale-[1.02] active:scale-95">
//               <Image
//                 src="/images/lock-icon.png"
//                 alt="Lock Icon"
//                 width={22}
//                 height={22}
//                 priority
//               />
//               Tap To Unlock
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
        className="object-cover object-center"
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
            <h1 className="leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-[-1px]">
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
          <div className="pb-10 px-6 md:pb-12 w-full flex justify-center">
            <button
              onClick={() => router.push("/car-details")}
              className="group flex w-full max-w-lg items-center justify-center gap-3 rounded-3xl border-2
             border-white/70 bg-white/10 px-8 py-5 text-lg font-medium text-black backdrop-blur-md transition-all hover:bg-white
              hover:text-black hover:shadow-3xl hover:scale-[1.02] active:scale-95"
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

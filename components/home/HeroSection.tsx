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
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background - Matching Original Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3D] via-[#0F2A4F] to-[#1A3A6B]" />

      {/* Optional subtle background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between px-6 pt-10 md:px-12 lg:px-16">
          {/* Left Text */}
          <div>
            <h1 className="text-[2.8rem] leading-[1.05] md:text-6xl lg:text-7xl font-semibold text-white tracking-[-1px]">
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
              className="md:w-[190px]"
              priority
            />
          </div>
        </div>

        {/* FIND YOUR BYD - Positioned above car like original */}
        <div className="mt-6 px-6 text-center md:mt-10">
          <h2 className="text-5xl md:text-6xl lg:text-[4.2rem] font-light text-white/90 tracking-wider">
            FIND YOUR BYD
          </h2>
        </div>

        {/* Car Image - Better positioning and size */}
        <div className="relative mt-6 flex-1 flex items-center justify-center px-4">
          <div className="relative w-full max-w-[1100px]">
            <Image
              src="/byd-sealion-7.png"
              alt="BYD SEALION 7"
              width={1200}
              height={620}
              className="object-contain drop-shadow-2xl scale-[1.02]"
              priority
            />
          </div>
        </div>

        {/* Unlock Button - Positioned at bottom like original */}
        <div className="pb-10 px-6 md:pb-12 flex justify-center">
          <button className="group flex w-full max-w-[420px] items-center justify-center gap-3 rounded-3xl bg-white/95 px-8 py-5 text-lg font-medium text-gray-900 shadow-2xl backdrop-blur-md transition-all hover:bg-white hover:shadow-3xl hover:scale-[1.02] active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v-2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Tap To Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { Car } from "@/types/car";
// import Image from "next/image";

// interface CarShowcaseProps {
//   car: Car;
//   onNext?: () => void;
//   onPrev?: () => void;
//   onImageClick?: () => void;
// }

// export default function CarShowcase({
//   car,
//   onNext,
//   onPrev,
//   onImageClick,
// }: CarShowcaseProps) {
//   return (
//     <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 shadow-2xl shadow-black/40">
//       <div
//         className={`relative h-[420px] md:h-[520px] ${onImageClick ? "cursor-pointer" : ""}`}
//         onClick={onImageClick}
//       >
//         <Image
//           src={car.image}
//           alt={car.name}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-105"
//           key={car.id}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

//         <div className="absolute inset-x-0 top-6 px-6 text-center">
//           <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-lg">
//             {car.name}
//           </h2>
//         </div>

//         <div className="absolute left-6 top-6 flex flex-wrap gap-2">
//           <span className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm">
//             {car.type}
//           </span>
//           {car.status === "New" && (
//             <span className="rounded-full bg-sky-500 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
//               New
//             </span>
//           )}
//         </div>

//         <div className="absolute inset-x-0 bottom-6 px-6">
//           <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//             <div>
//               <p className="text-lg font-semibold text-white/90 md:text-xl">
//                 {car.description}
//               </p>
//             </div>
//             <button
//               onClick={onNext}
//               className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 hover:scale-105"
//               aria-label="Next car"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Car } from "@/types/car";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CarShowcaseProps {
  car: Car;
  onNext?: () => void;
  onPrev?: () => void;
  onImageClick?: () => void;
}

export default function CarShowcase({
  car,
  onNext,
  onPrev,
  onImageClick,
}: CarShowcaseProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        borderRadius: 6,
        border: hovered
          ? "1px solid rgba(0,168,232,0.3)"
          : "1px solid rgba(0,168,232,0.12)",
        background: "#0A0C10",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,168,232,0.08)"
          : "0 32px 80px rgba(0,0,0,0.6)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onImageClick}
    >
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
        .scan {
          animation: scanline 4s linear infinite;
          opacity: 0;
        }
        .group:hover .scan {
          opacity: 1;
        }
      `}</style>

      {/* Image */}
      <div className="relative" style={{ height: "clamp(280px, 45vw, 520px)" }}>
        <Image
          src={car.image}
          alt={car.name}
          fill
          key={car.id}
          className="object-cover"
          style={{
            transition: "transform 0.7s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #080A0E 0%, rgba(8,10,14,0.5) 35%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,10,14,0.75) 0%, transparent 50%)",
          }}
        />

        {/* Scanline effect */}
        <div
          className="scan absolute inset-x-0 h-24"
          style={{
            background:
              "linear-gradient(0deg, transparent, rgba(0,168,232,0.06), transparent)",
            top: 0,
          }}
        />

        {/* Corner accents */}
        {[
          { corner: "top-3 left-3", bt: true, bl: true },
          { corner: "top-3 right-3", bt: true, br: true },
          { corner: "bottom-3 left-3", bb: true, bl: true },
          { corner: "bottom-3 right-3", bb: true, br: true },
        ].map(({ corner, bt, bl, bb, br }, i) => (
          <div
            key={i}
            className={`absolute ${corner} w-6 h-6 z-10`}
            style={{
              borderTop: bt ? "2px solid rgba(0,168,232,0.5)" : "none",
              borderBottom: bb ? "2px solid rgba(0,168,232,0.5)" : "none",
              borderLeft: bl ? "2px solid rgba(0,168,232,0.5)" : "none",
              borderRight: br ? "2px solid rgba(0,168,232,0.5)" : "none",
            }}
          />
        ))}

        {/* Status badge */}
        <div className="absolute top-5 left-5 flex gap-2 z-10">
          <span
            style={{
              background: "rgba(8,10,14,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              padding: "4px 12px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#E8ECF0",
            }}
          >
            {car.type}
          </span>
          {car.status === "New" && (
            <span
              style={{
                background: "#00A8E8",
                borderRadius: 3,
                padding: "4px 12px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#fff",
                boxShadow: "0 0 16px rgba(0,168,232,0.4)",
              }}
            >
              New
            </span>
          )}
        </div>

        {/* Explore hint */}
        <div
          className="absolute top-5 right-5 z-10 flex items-center gap-2"
          style={{
            background: "rgba(8,10,14,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,168,232,0.2)",
            borderRadius: 3,
            padding: "6px 14px",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        >
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#00A8E8",
            }}
          >
            Explore
          </span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="#00A8E8"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 z-10">
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#00A8E8",
              marginBottom: 4,
            }}
          >
            {car.description}
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 64px)",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 0.95,
              marginBottom: 20,
            }}
          >
            {car.name}
          </h2>

          <div className="flex items-center justify-between">
            {/* Prev/Next */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev?.();
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(8,10,14,0.8)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <svg
                  className="w-5 h-5"
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext?.();
                }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 4,
                  border: "1px solid rgba(0,168,232,0.3)",
                  background: "rgba(0,168,232,0.1)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00A8E8",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 0 20px rgba(0,168,232,0.15)",
                }}
              >
                <svg
                  className="w-5 h-5"
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

            {/* CTA */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageClick?.();
              }}
              style={{
                background: "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "11px 24px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(0,168,232,0.35)",
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

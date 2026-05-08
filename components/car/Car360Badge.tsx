"use client";

// components/car/Car360Badge.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Visual badge shown below the car image.
// Shows either: active 360° rotation info OR a "360° Coming Soon" state.
// ─────────────────────────────────────────────────────────────────────────────

interface Car360BadgeProps {
  hasRealFrames: boolean;
  rotationDegrees?: number;
  isDragging?: boolean;
}

export default function Car360Badge({
  hasRealFrames,
  rotationDegrees = 0,
  isDragging = false,
}: Car360BadgeProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4 mt-1">
      {hasRealFrames ? (
        // ── Active 360° badge ──
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
            isDragging
              ? "bg-gray-900 border-gray-900 text-white"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          {/* Spinning arc icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-4 h-4 transition-transform ${isDragging ? "animate-spin" : ""}`}
            style={isDragging ? { animationDuration: "1s" } : {}}
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
          <span className="text-sm font-semibold tracking-wide">
            {isDragging ? `${rotationDegrees}°` : "360°"}
          </span>
        </div>
      ) : (
        // ── Coming soon badge ──
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-gray-300 bg-gray-50">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-2.5 h-2.5 text-gray-400"
            >
              <path
                d="M12 4C7 4 3 7.6 3 12s4 8 9 8 9-3.6 9-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 4l2 2-2 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-400 tracking-wide">
            360° · Coming Soon
          </span>
        </div>
      )}
    </div>
  );
}   
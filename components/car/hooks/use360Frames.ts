// hooks/use360Frames.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central registry for 360° frame sequences.
//
// HOW TO ADD REAL FRAMES:
//   1. Place your images in /public/images/360/<carId>/
//      Name them frame_001.png → frame_036.png  (or however many you have)
//   2. Update the entry below with frameCount matching your file count.
//
// NAMING CONVENTION:
//   /public/images/360/1/frame_001.png  →  car id "1", first frame
//
// FALLBACK:
//   If frameCount is 1 (or images not yet added), the viewer falls back to
//   the single existing car image with a "coming soon" UI.
// ─────────────────────────────────────────────────────────────────────────────

export interface CarFrameConfig {
  /** Car ID matching your CAR_DATA keys */
  carId: string;
  /**
   * Number of frames in the sequence.
   * Set to 1 to use fallback single image until you add real 360 frames.
   */
  frameCount: number;
  /** Folder inside /public/images/360/<carId>/ */
  folder: string;
  /** File prefix, e.g. "frame_" → frame_001.png */
  prefix: string;
  /** File extension without dot */
  ext: string;
  /** Single fallback image path (used when frameCount <= 1) */
  fallbackImage: string;
}

// ── Registry ─────────────────────────────────────────────────────────────────
const CAR_FRAME_REGISTRY: Record<string, CarFrameConfig> = {
  "1": {
    carId: "1",
    // ✅ Change this to 36 (or however many frames you have) when you add images
    frameCount: 1,
    folder: "/images/360/1",
    prefix: "frame_",
    ext: "png",
    fallbackImage: "/images/car.png",
  },
  "2": {
    carId: "2",
    frameCount: 1,
    folder: "/images/360/2",
    prefix: "frame_",
    ext: "png",
    fallbackImage: "/images/car2.png",
  },
  "3": {
    carId: "3",
    frameCount: 1,
    folder: "/images/360/3",
    prefix: "frame_",
    ext: "png",
    fallbackImage: "/images/car3.png",
  },
};

// ── Frame URL Builder ─────────────────────────────────────────────────────────
function buildFrameUrls(config: CarFrameConfig): string[] {
  if (config.frameCount <= 1) {
    return [config.fallbackImage];
  }
  return Array.from({ length: config.frameCount }, (_, i) => {
    const index = String(i + 1).padStart(3, "0");
    return `${config.folder}/${config.prefix}${index}.${config.ext}`;
  });
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function use360Frames(carId: string) {
  const config = CAR_FRAME_REGISTRY[carId] ?? CAR_FRAME_REGISTRY["1"];
  const frames = buildFrameUrls(config);
  const hasRealFrames = config.frameCount > 1;

  return {
    frames,
    fallbackImage: config.fallbackImage,
    hasRealFrames,
    frameCount: config.frameCount,
  };
}

export default use360Frames;

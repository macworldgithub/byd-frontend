

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
import { getCarById, CarData } from "../../lib/api";

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

// ─── LOADING SCREEN ──────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div
      style={{
        height: "100dvh",
        background: "#080A0E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily: "'Barlow Condensed',sans-serif",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          border: "2px solid rgba(0,168,232,0.15)",
          borderTop: "2px solid #00A8E8",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#6B7280",
        }}
      >
        Loading vehicle data...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── ERROR SCREEN ────────────────────────────────────────────────────────
function ErrorScreen({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      style={{
        height: "100dvh",
        background: "#080A0E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "0 32px",
        fontFamily: "'Barlow Condensed',sans-serif",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#ef4444",
        }}
      >
        Failed to load vehicle
      </p>
      <p
        style={{
          fontSize: 13,
          color: "#6B7280",
          maxWidth: 360,
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          background: "#00A8E8",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "10px 28px",
          fontFamily: "'Barlow Condensed',sans-serif",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          marginTop: 8,
        }}
      >
        Retry
      </button>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────
export default function CarInfoPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id ?? "");

  // ── Data state ──────────────────────────────────────────────────────
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0); // increment to retry

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCarById(id);
        if (!cancelled) setCar(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, fetchKey]);

  // ── Section / nav state ─────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [isTablet, setIsTablet] = useState(false);

  // ── Configurator state ──────────────────────────────────────────────
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedView, setSelectedView] = useState<"front" | "side">("front");
  const [selectedVariant, setSelectedVariant] = useState<
    "essential" | "premium"
  >("essential");
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  const [activeNav, setActiveNav] = useState<string>("car");

  // ── Refs ────────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync configurator color when car data loads
  useEffect(() => {
    if (car) {
      setSelectedColor(car.exteriorColors[0]?.colorCode ?? "");
      setActiveSection(0);
      setSlideDir("left");
      setIsTransitioning(false);
      setSelectedView("front");

      // Determine default variant based on what's available
      const hasEssential = car.exteriorColors.some(
        (c) => c.images?.front?.essential?.trim() || c.images?.side?.essential?.trim()
      );
      const hasPremium = car.exteriorColors.some(
        (c) => c.images?.front?.premium?.trim() || c.images?.side?.premium?.trim()
      );
      if (!hasEssential && hasPremium) {
        setSelectedVariant("premium");
      } else {
        setSelectedVariant("essential");
      }

      setViewMode("exterior");
    }
  }, [car]);

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
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const goToSection = useCallback(
    (index: number, dir?: "left" | "right") => {
      if (isTransitioning || index === activeSection) return;
      const direction = dir ?? (index > activeSection ? "left" : "right");
      setSlideDir(direction);
      setIsTransitioning(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setActiveSection(index);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning, activeSection],
  );

  const nextSection = useCallback(() => {
    if (activeSection < SECTIONS.length - 1)
      goToSection(activeSection + 1, "left");
  }, [activeSection, goToSection]);

  const prevSection = useCallback(() => {
    if (activeSection > 0) goToSection(activeSection - 1, "right");
  }, [activeSection, goToSection]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const dt = Date.now() - touchStartTime.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && dt < 600) {
      if (dx < 0) nextSection();
      else prevSection();
    }
  };

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

  // ── Early returns ──────────────────────────────────────────────────
  if (loading) return <LoadingScreen />;
  if (error || !car)
    return (
      <ErrorScreen
        message={error ?? "Car not found"}
        onRetry={() => setFetchKey((k) => k + 1)}
      />
    );

  // ── Color map ────────────────────────────────────────────────────────
  const colorMap: Record<string, string> = {
    white: "#d9d4c8",
    blue: "#8299ac",
    yellow: "#b5bb4d",
    black: "#2a2e37",
    red: "#C1121F",
    grey: "#8E8E93",
    silver: "#C0C0C0",
    green: "#2D6A4F",
    mist: "#b8c4cc",
    atlantis: "#4a7fa5",
  };

  // ─── SECTION RENDERERS ───────────────────────────────────────────────

  const renderHero = () => (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={car.heroImage}
        alt={car.name}
        fill
        className="object-contain"
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
          src={car.heroImage}
          alt="Banner"
          fill
          className="object-contain"
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
            className="object-contain"
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

  // const renderConfigurator = () => (
  //   <div className="section-content">
  //     <div className="section-label text-center mb-2">Personalize</div>
  //     <h2
  //       className="section-title text-center mb-2"
  //       style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0" }}
  //     >
  //       {car.styling.title}
  //     </h2>
  //     <p
  //       style={{
  //         fontFamily: "'Barlow',sans-serif",
  //         fontWeight: 300,
  //         fontSize: 14,
  //         textAlign: "center",
  //         color: "#6B7280",
  //         marginBottom: 20,
  //       }}
  //     >
  //       {car.styling.subtitle}
  //     </p>

  //     <div
  //       className="relative rounded-sm overflow-hidden"
  //       style={{
  //         height: "clamp(240px,34vw,420px)",
  //         background: "linear-gradient(135deg,#0D1117,#0A0E16)",
  //         border: "1px solid rgba(0,168,232,0.1)",
  //       }}
  //     >
  //       {/* Corner brackets */}
  //       {(
  //         [
  //           "top-0 left-0",
  //           "top-0 right-0",
  //           "bottom-0 left-0",
  //           "bottom-0 right-0",
  //         ] as const
  //       ).map((pos, i) => (
  //         <div
  //           key={i}
  //           className={`absolute ${pos} w-8 h-8 z-10`}
  //           style={{
  //             borderTop: i < 2 ? "2px solid rgba(0,168,232,0.4)" : "none",
  //             borderBottom: i >= 2 ? "2px solid rgba(0,168,232,0.4)" : "none",
  //             borderLeft:
  //               i % 2 === 0 ? "2px solid rgba(0,168,232,0.4)" : "none",
  //             borderRight:
  //               i % 2 === 1 ? "2px solid rgba(0,168,232,0.4)" : "none",
  //           }}
  //         />
  //       ))}

  //       {viewMode === "exterior" && car.exteriorColors.length > 0 && (
  //         <Image
  //           src={
  //             car.exteriorColors.find((c) => c.colorCode === selectedColor)
  //               ?.images[selectedView][selectedVariant] || car.heroImage
  //           }
  //           alt={`${car.name} ${selectedColor}`}
  //           fill
  //           className="object-cover"
  //           unoptimized
  //         />
  //       )}

  //       {viewMode === "interior" && car.interiorColors.length > 0 && (
  //         <Image
  //           src={car.interiorColors[0]?.image || car.heroImage}
  //           alt={`${car.name} Interior`}
  //           fill
  //           className="object-cover"
  //           unoptimized
  //         />
  //       )}

  //       {/* Exterior/Interior toggle */}
  //       <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 max-w-[calc(100%-24px)] md:max-w-[360px]">
  //         <div
  //           style={{
  //             display: "flex",
  //             flexWrap: "wrap",
  //             gap: 0,
  //             borderRadius: 4,
  //             overflow: "hidden",
  //             border: "1px solid rgba(0,168,232,0.25)",
  //             backdropFilter: "blur(12px)",
  //             background: "rgba(8,10,14,0.75)",
  //           }}
  //         >
  //           {(["exterior", "interior"] as const).map((v) => (
  //             <button
  //               key={v}
  //               onClick={() => setViewMode(v)}
  //               style={{
  //                 padding: "5px 12px",
  //                 fontFamily: "'Barlow Condensed',sans-serif",
  //                 fontWeight: 700,
  //                 fontSize: 10,
  //                 letterSpacing: "0.18em",
  //                 textTransform: "uppercase",
  //                 border: "none",
  //                 cursor: "pointer",
  //                 transition: "all 0.2s",
  //                 background: viewMode === v ? "#00A8E8" : "transparent",
  //                 color: viewMode === v ? "#fff" : "#6B7280",
  //                 minWidth: 84,
  //               }}
  //             >
  //               {v}
  //             </button>
  //           ))}
  //         </div>

  //         {viewMode === "exterior" && (
  //           <div
  //             style={{
  //               display: "flex",
  //               flexWrap: "wrap",
  //               gap: 0,
  //               borderRadius: 4,
  //               overflow: "hidden",
  //               border: "1px solid rgba(0,168,232,0.25)",
  //               backdropFilter: "blur(12px)",
  //               background: "rgba(8,10,14,0.75)",
  //             }}
  //           >
  //             {(["front", "side"] as const).map((v) => (
  //               <button
  //                 key={v}
  //                 onClick={() => setSelectedView(v)}
  //                 style={{
  //                   padding: "5px 12px",
  //                   fontFamily: "'Barlow Condensed',sans-serif",
  //                   fontWeight: 700,
  //                   fontSize: 10,
  //                   letterSpacing: "0.18em",
  //                   textTransform: "uppercase",
  //                   border: "none",
  //                   cursor: "pointer",
  //                   transition: "all 0.2s",
  //                   background: selectedView === v ? "#00A8E8" : "transparent",
  //                   color: selectedView === v ? "#fff" : "#6B7280",
  //                   minWidth: 84,
  //                 }}
  //               >
  //                 {v}
  //               </button>
  //             ))}
  //           </div>
  //         )}

  //         {viewMode === "exterior" && (
  //           <div
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //               flexWrap: "wrap",
  //               gap: 8,
  //               background: "rgba(8,10,14,0.75)",
  //               backdropFilter: "blur(12px)",
  //               border: "1px solid rgba(0,168,232,0.2)",
  //               borderRadius: 4,
  //               padding: "8px 7px",
  //               maxWidth: "100%",
  //             }}
  //           >
  //             {car.exteriorColors.map((color) => (
  //               <button
  //                 key={color.colorCode}
  //                 onClick={() => setSelectedColor(color.colorCode)}
  //                 title={color.name}
  //                 style={{
  //                   width: 22,
  //                   height: 22,
  //                   borderRadius: "50%",
  //                   background: colorMap[color.colorCode] ?? color.colorCode,
  //                   border:
  //                     selectedColor === color.colorCode
  //                       ? "2px solid #00A8E8"
  //                       : "2px solid rgba(255,255,255,0.15)",
  //                   boxShadow:
  //                     selectedColor === color.colorCode
  //                       ? "0 0 0 2px rgba(0,168,232,0.35)"
  //                       : "none",
  //                   cursor: "pointer",
  //                   transition: "all 0.2s",
  //                   transform:
  //                     selectedColor === color.colorCode
  //                       ? "scale(1.12)"
  //                       : "scale(1)",
  //                 }}
  //               />
  //             ))}
  //           </div>
  //         )}
  //       </div>

  //       {/* Active color label */}
  //       <div
  //         className="absolute bottom-3 left-3 z-10 flex items-center gap-2 px-3 py-2 rounded-sm"
  //         style={{
  //           background: "rgba(8,10,14,0.8)",
  //           backdropFilter: "blur(12px)",
  //           border: "1px solid rgba(255,255,255,0.08)",
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: 6,
  //             height: 6,
  //             borderRadius: "50%",
  //             background: "#00A8E8",
  //           }}
  //         />
  //         <span
  //           style={{
  //             fontFamily: "'Barlow Condensed',sans-serif",
  //             fontWeight: 600,
  //             fontSize: 11,
  //             letterSpacing: "0.1em",
  //             color: "#E8ECF0",
  //           }}
  //         >
  //           {viewMode === "exterior"
  //             ? car.exteriorColors.find((c) => c.colorCode === selectedColor)
  //                 ?.name
  //             : car.interiorColors[0]?.name}
  //           {viewMode === "exterior" && (
  //             <span style={{ color: "#00A8E8" }}> · {selectedVariant}</span>
  //           )}
  //         </span>
  //       </div>

  //       {/* Essential/Premium toggle */}
  //       {viewMode === "exterior" && (
  //         <div
  //           className="absolute bottom-3 right-3 z-10"
  //           style={{
  //             display: "flex",
  //             flexWrap: "wrap",
  //             borderRadius: 4,
  //             overflow: "hidden",
  //             border: "1px solid rgba(0,168,232,0.25)",
  //             backdropFilter: "blur(12px)",
  //             background: "rgba(8,10,14,0.75)",
  //           }}
  //         >
  //           {(["essential", "premium"] as const).map((v) => (
  //             <button
  //               key={v}
  //               onClick={() => setSelectedVariant(v)}
  //               style={{
  //                 padding: "5px 10px",
  //                 fontFamily: "'Barlow Condensed',sans-serif",
  //                 fontWeight: 700,
  //                 fontSize: 10,
  //                 letterSpacing: "0.15em",
  //                 textTransform: "uppercase",
  //                 border: "none",
  //                 cursor: "pointer",
  //                 transition: "all 0.2s",
  //                 background: selectedVariant === v ? "#00A8E8" : "transparent",
  //                 color: selectedVariant === v ? "#fff" : "#6B7280",
  //                 minWidth: 86,
  //               }}
  //             >
  //               {v}
  //             </button>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  const renderConfigurator = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "65vh",
    }}
  >
    {/* Header — sits above the image */}
    <div className="section-label text-center mb-2" style={{ paddingTop: 20 }}>
      Personalize
    </div>
    <h2
      className="section-title text-center mb-1"
      style={{ fontSize: "clamp(26px,5vw,44px)", color: "#E8ECF0", padding: "0 16px" }}
    >
      {car.styling.title}
    </h2>
    <p
      style={{
        fontFamily: "'Barlow',sans-serif",
        fontWeight: 300,
        fontSize: 13,
        textAlign: "center",
        color: "#6B7280",
        marginBottom: 12,
        padding: "0 16px",
      }}
    >
      {car.styling.subtitle}
    </p>

    {/* ── Full-width image stage ── */}
    <div
      style={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        height: "clamp(260px, 56vw, 640px)",
        background: "linear-gradient(135deg,#0D1117,#0A0E16)",
        overflow: "hidden",
      }}
    >
      {/* Car image — full width, object-cover, centered */}
      {viewMode === "exterior" && car.exteriorColors.length > 0 && (
        <Image
          src={
            car.exteriorColors.find((c) => c.colorCode === selectedColor)
              ?.images[selectedView][selectedVariant] || car.heroImage
          }
          alt={`${car.name} ${selectedColor}`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          unoptimized
        />
      )}

      {viewMode === "interior" && car.interiorColors.length > 0 && (
        <Image
          src={car.interiorColors[0]?.image || car.heroImage}
          alt={`${car.name} Interior`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          unoptimized
        />
      )}

      {/* Subtle side fade so image blends into page edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(8,10,14,0.35) 0%, transparent 18%, transparent 82%, rgba(8,10,14,0.35) 100%)",
        }}
      />
      {/* Subtle bottom fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(0deg, rgba(8,10,14,0.5) 0%, transparent 30%)",
        }}
      />

      {/* ── TOP-LEFT controls ── */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Exterior / Interior */}
        <div
          style={{
            display: "flex",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(0,168,232,0.22)",
            backdropFilter: "blur(12px)",
            background: "rgba(8,10,14,0.38)",
          }}
        >
          {(["exterior", "interior"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              style={{
                padding: "4px 10px",
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: viewMode === v ? "#00A8E8" : "transparent",
                color: viewMode === v ? "#fff" : "rgba(255,255,255,0.45)",
                minWidth: 62,
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Front / Side */}
        {viewMode === "exterior" && (
          <div
            style={{
              display: "flex",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(0,168,232,0.22)",
              backdropFilter: "blur(12px)",
              background: "rgba(8,10,14,0.38)",
            }}
          >
            {(["front", "side"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSelectedView(v)}
                style={{
                  padding: "4px 10px",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: selectedView === v ? "#00A8E8" : "transparent",
                  color: selectedView === v ? "#fff" : "rgba(255,255,255,0.45)",
                  minWidth: 62,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {/* Color swatches */}
        {viewMode === "exterior" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              background: "rgba(8,10,14,0.38)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,168,232,0.16)",
              borderRadius: 4,
              padding: "5px 6px",
              maxWidth: 130,
            }}
          >
            {car.exteriorColors.map((color) => (
              <button
                key={color.colorCode}
                onClick={() => setSelectedColor(color.colorCode)}
                title={color.name}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: colorMap[color.colorCode] ?? color.colorCode,
                  border:
                    selectedColor === color.colorCode
                      ? "2px solid #00A8E8"
                      : "1px solid rgba(255,255,255,0.2)",
                  boxShadow:
                    selectedColor === color.colorCode
                      ? "0 0 0 2px rgba(0,168,232,0.3)"
                      : "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform:
                    selectedColor === color.colorCode ? "scale(1.18)" : "scale(1)",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM-LEFT: active color label ── */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(8,10,14,0.36)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 4,
          padding: "4px 10px",
        }}
      >
        <div
          style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E8", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "#E8ECF0",
            whiteSpace: "nowrap",
          }}
        >
          {viewMode === "exterior"
            ? car.exteriorColors.find((c) => c.colorCode === selectedColor)?.name
            : car.interiorColors[0]?.name}
          {viewMode === "exterior" && (
            <span style={{ color: "#00A8E8" }}> · {selectedVariant}</span>
          )}
        </span>
      </div>

      {/* ── BOTTOM-RIGHT: Essential / Premium ── */}
      {viewMode === "exterior" && (() => {
        const availableVariants = (["essential", "premium"] as const).filter((v) => {
          if (v === "essential") {
            return car.exteriorColors.some(
              (c) => c.images?.front?.essential?.trim() || c.images?.side?.essential?.trim()
            );
          }
          if (v === "premium") {
            return car.exteriorColors.some(
              (c) => c.images?.front?.premium?.trim() || c.images?.side?.premium?.trim()
            );
          }
          return true;
        });

        if (availableVariants.length === 0) return null;

        return (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              zIndex: 10,
              display: "flex",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(0,168,232,0.22)",
              backdropFilter: "blur(12px)",
              background: "rgba(8,10,14,0.38)",
            }}
          >
            {availableVariants.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVariant(v)}
                style={{
                  padding: "4px 10px",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: selectedVariant === v ? "#00A8E8" : "transparent",
                  color: selectedVariant === v ? "#fff" : "rgba(255,255,255,0.45)",
                  minWidth: 64,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        );
      })()}
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

      {/* Main content */}
      <div
        className={`absolute inset-0 ${currentSection.id === "hero" ? "" : "overflow-y-auto"} ${
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

      {/* Dot navigation */}
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

      {/* Bottom nav bar */}
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

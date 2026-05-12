"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";
import { CAR_DATA, DEFAULT_CAR } from "../carData";

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

  const [selectedColor, setSelectedColor] = useState(
    car.exteriorColors[0]?.colorCode ?? "white",
  );
  const [selectedView, setSelectedView] = useState<"front" | "side">("front");
  const [selectedVariant, setSelectedVariant] = useState<
    "essential" | "premium"
  >("essential");
  const [activeNav, setActiveNav] = useState<string>("car");
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") router.push("/");
    else if (itemId === "car") router.push("/car-details");
  };

  const parallaxOffset = scrollY * 0.4;

  return (
    <div
      className="relative min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{
        background: "#080A0E",
        color: "#E8ECF0",
        fontFamily: "'Rajdhani', 'Barlow', sans-serif",
      }}
    >
      {/* ── GLOBAL STYLES ── */}
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
          --byd-accent: #00d4ff;
        }

        .kiosk-section {
          opacity: 0;
          transform: translateY(40px);
          animation: sectionReveal 0.8s ease forwards;
        }

        @keyframes sectionReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .spec-card {
          position: relative;
          background: linear-gradient(135deg, #0d1117 0%, #111620 100%);
          border: 1px solid rgba(0, 168, 232, 0.15);
          transition: all 0.3s ease;
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
        }
        .spec-card:hover::before {
          opacity: 1;
        }
        .spec-card:hover {
          border-color: rgba(0, 168, 232, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0, 168, 232, 0.12);
        }

        .tab-btn {
          position: relative;
          padding: 10px 24px;
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tab-btn.active {
          background: var(--byd-blue);
          border-color: var(--byd-blue);
          color: #fff;
          box-shadow: 0 0 24px rgba(0, 168, 232, 0.35);
        }
        .tab-btn:not(.active):hover {
          border-color: rgba(0, 168, 232, 0.5);
          color: var(--byd-text);
        }

        .color-dot {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .color-dot.active {
          border-color: var(--byd-blue);
          box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.25);
          transform: scale(1.15);
        }
        .color-dot:not(.active):hover {
          transform: scale(1.1);
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--byd-blue),
            transparent
          );
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
          color: var(--byd-blue);
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
          border-radius: 12px;
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
          padding: 28px 20px;
          text-align: center;
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden"
      >
        {/* Parallax Image */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: "transform",
          }}
        >
          <Image
            src={car.heroImage}
            alt={car.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Multi-layer overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #080A0E 0%, rgba(8,10,14,0.7) 40%, rgba(8,10,14,0.2) 70%, rgba(8,10,14,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,10,14,0.8) 0%, transparent 60%)",
          }}
        />

        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5">
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

          {/* BYD Logo placeholder */}
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: "0.2em",
              color: "white",
            }}
          >
            BYD
          </div>

          <div className="price-badge px-4 py-2 rounded-md">
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
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

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-14 md:px-12">
          {/* Label */}
          <div className="section-label mb-3">
            Electric Vehicle · {car.type ?? "EV"}
          </div>

          {/* Name */}
          <h1
            className="hero-title text-white mb-3"
            style={{ fontSize: "clamp(52px, 10vw, 100px)" }}
          >
            {car.name}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 20,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.05em",
              marginBottom: 32,
            }}
          >
            {car.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              className="pulse-blue"
              style={{
                background: "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "14px 36px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Build & Price
            </button>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 4,
                padding: "14px 36px",
                fontFamily: "'Barlow Condensed', sans-serif",
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

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-2 opacity-50">
          <div
            style={{
              width: 1,
              height: 50,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), white)",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* ── PERFORMANCE STATS ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#080A0E",
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Performance Data</div>
          <h2
            className="section-title text-center mb-12"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", color: "#E8ECF0" }}
          >
            Engineering Excellence
          </h2>

          <div className="glow-line mb-12" />

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {car.specs.map((spec, i) => (
              <div
                key={spec.label}
                className="spec-card rounded-lg p-6 md:p-8 text-center"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                {/* Accent top border */}
                <div
                  style={{
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, #00A8E8, transparent)",
                    marginBottom: 20,
                    borderRadius: 2,
                  }}
                />
                <div
                  className="stat-number"
                  style={{ fontSize: "clamp(36px, 6vw, 60px)" }}
                >
                  {spec.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#00A8E8",
                    letterSpacing: "0.1em",
                    margin: "4px 0 8px",
                  }}
                >
                  {spec.unit}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 13,
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

          <div className="glow-line mt-12" />
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.2s",
          background: "#0A0C10",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="section-label mb-3">{car.name}</div>
          <h2
            className="section-title mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#E8ECF0" }}
          >
            {car.overview.heading}
          </h2>
          {/* Quote style */}
          <div
            style={{
              borderLeft: "3px solid #00A8E8",
              paddingLeft: 28,
              marginBottom: 40,
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(16px, 2.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(232,236,240,0.75)",
                fontStyle: "italic",
              }}
            >
              "{car.overview.body}"
            </p>
          </div>
        </div>
      </section>

      {/* ── BANNER ── */}
      <div
        className="w-full relative overflow-hidden"
        style={{ height: "clamp(240px, 40vw, 480px)" }}
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
              "linear-gradient(0deg, #080A0E 0%, transparent 40%, transparent 70%, #080A0E 100%)",
          }}
        />
      </div>

      {/* ── DESIGN ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#080A0E",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Exterior Design</div>
          <h2
            className="section-title text-center mb-16"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            {car.design.title}
          </h2>

          {/* Collage */}
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {car.collageImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm"
                style={{ height: "clamp(200px, 25vw, 340px)" }}
              >
                <Image
                  src={img}
                  alt={`Design ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,168,232,0.06) 0%, transparent 60%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Design features */}
          <div className="grid md:grid-cols-2 gap-6">
            {car.showcaseFeatures.map((feature, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-sm tech-card">
                <div
                  className="relative shrink-0 overflow-hidden rounded-sm"
                  style={{ width: 96, height: 96 }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 50%, rgba(0,168,232,0.15))",
                    }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#E8ECF0",
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#6B7280",
                      fontWeight: 400,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#0A0C10",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Innovation</div>
          <h2
            className="section-title text-center mb-16"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            {car.technology.title}
          </h2>

          {/* Video */}
          <div
            className="relative overflow-hidden rounded-sm mb-16"
            style={{
              height: "clamp(220px, 35vw, 480px)",
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
                src={car.showcaseImages?.[0] ?? car.heroImage}
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
                  "linear-gradient(0deg, rgba(8,10,14,0.6) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Tech cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {car.technology.features.map((feature, i) => (
              <div key={i} className="tech-card p-7">
                {/* Icon accent */}
                <div
                  style={{
                    width: 32,
                    height: 3,
                    background: "#00A8E8",
                    borderRadius: 2,
                    marginBottom: 16,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#E8ECF0",
                    marginBottom: 12,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#6B7280",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#080A0E",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Personalize</div>
          <h2
            className="section-title text-center mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            {car.styling.title}
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              textAlign: "center",
              color: "#6B7280",
              marginBottom: 48,
              letterSpacing: "0.05em",
            }}
          >
            {car.styling.subtitle}
          </p>

          {/* Toggle controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {/* View toggle */}
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              {(["exterior", "interior"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v)}
                  className={`tab-btn ${viewMode === v ? "active" : ""}`}
                  style={{
                    borderRadius: 0,
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Front/Side toggle — exterior only */}
            {viewMode === "exterior" && (
              <div
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                {(["front", "side"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedView(v)}
                    className={`tab-btn ${selectedView === v ? "active" : ""}`}
                    style={{ borderRadius: 0, border: "none" }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car display */}
          <div
            className="relative rounded-sm overflow-hidden mb-8"
            style={{
              height: "clamp(260px, 35vw, 480px)",
              background: "linear-gradient(135deg, #0D1117, #0A0E16)",
              border: "1px solid rgba(0,168,232,0.1)",
            }}
          >
            {/* Corner accents */}
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
                  borderBottom:
                    i >= 2 ? "2px solid rgba(0,168,232,0.4)" : "none",
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

            {/* Badge */}
            <div
              className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-sm"
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
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  color: "#E8ECF0",
                }}
              >
                {viewMode === "exterior"
                  ? car.exteriorColors.find(
                      (c) => c.colorCode === selectedColor,
                    )?.name
                  : car.interiorColors[0]?.name}
                {" · "}
                <span style={{ color: "#00A8E8", textTransform: "capitalize" }}>
                  {selectedVariant}
                </span>
              </span>
            </div>
          </div>

          {/* Color picker */}
          {viewMode === "exterior" && (
            <div className="mb-8 text-center">
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#6B7280",
                  marginBottom: 16,
                }}
              >
                Exterior Color
              </p>
              <div className="flex justify-center gap-4 flex-wrap mb-3">
                {car.exteriorColors.map((color) => {
                  const colorMap: Record<string, string> = {
                    white: "#F5F4F0",
                    blue: "#1A56D6",
                    yellow: "#F5C200",
                    black: "#1A1A1A",
                    red: "#C1121F",
                    grey: "#8E8E93",
                    silver: "#C0C0C0",
                    green: "#2D6A4F",
                  };
                  return (
                    <button
                      key={color.colorCode}
                      onClick={() => setSelectedColor(color.colorCode)}
                      className={`color-dot ${selectedColor === color.colorCode ? "active" : ""}`}
                      style={{
                        background:
                          colorMap[color.colorCode] ?? color.colorCode,
                      }}
                      title={color.name}
                    />
                  );
                })}
              </div>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  color: "#6B7280",
                  letterSpacing: "0.05em",
                }}
              >
                {
                  car.exteriorColors.find((c) => c.colorCode === selectedColor)
                    ?.name
                }
              </p>
            </div>
          )}

          {/* Variant picker */}
          {viewMode === "exterior" && (
            <div className="flex justify-center gap-4">
              {(["essential", "premium"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`tab-btn ${selectedVariant === v ? "active" : ""}`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SAFETY ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#0A0C10",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Protection</div>
          <h2
            className="section-title text-center mb-16"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            Fun, Easy &amp; Safe
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {car.safety.features.map((feature, i) => (
              <div key={i} className="tech-card p-7">
                <div
                  style={{
                    width: 32,
                    height: 3,
                    background: "linear-gradient(90deg, #00A8E8, transparent)",
                    borderRadius: 2,
                    marginBottom: 16,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#E8ECF0",
                    marginBottom: 10,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "#6B7280",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Storage */}
          <div className="glow-line mb-12" />
          <h3
            className="section-title text-center mb-8"
            style={{ fontSize: 28, color: "#E8ECF0" }}
          >
            Clever Storage
          </h3>
          <div className="grid grid-cols-2 gap-5 max-w-lg mx-auto">
            <div className="storage-box">
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 42,
                  color: "#00A8E8",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {car.storage.boot}
              </div>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
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
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: 42,
                  color: "#00A8E8",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {car.storage.expanded}
              </div>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
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
      </section>

      {/* ── MODEL COMPARISON ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#080A0E",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label text-center mb-2">Configuration</div>
          <h2
            className="section-title text-center mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            Choose Your {car.name}
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              textAlign: "center",
              color: "#6B7280",
              marginBottom: 48,
            }}
          >
            Compare Models
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {car.models.map((model, i) => (
              <div
                key={i}
                className={`model-card rounded-sm p-8 ${i === 1 ? "featured" : ""}`}
              >
                {i === 1 && (
                  <div
                    style={{
                      display: "inline-block",
                      marginBottom: 16,
                      background: "rgba(0,168,232,0.15)",
                      border: "1px solid rgba(0,168,232,0.3)",
                      borderRadius: 2,
                      padding: "3px 12px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
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
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 24,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#E8ECF0",
                    marginBottom: 24,
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
                        gap: 12,
                        padding: "10px 0",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
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
                          className="w-3 h-3"
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
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: 14,
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
                    marginTop: 28,
                    background: i === 1 ? "#00A8E8" : "transparent",
                    color: i === 1 ? "#fff" : "#00A8E8",
                    border: `1px solid ${i === 1 ? "#00A8E8" : "rgba(0,168,232,0.3)"}`,
                    borderRadius: 4,
                    padding: "12px 0",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  Configure Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section
        className="kiosk-section"
        style={{
          animationDelay: "0.1s",
          background: "#0A0C10",
          padding: "80px 24px",
          paddingBottom: 120,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            className="section-title text-center mb-12"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", color: "#E8ECF0" }}
          >
            Experience {car.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Handbook */}
            <div className="tech-card overflow-hidden">
              {car.moreInfo?.handbook && (
                <div className="relative" style={{ height: 200 }}>
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
                      background:
                        "linear-gradient(0deg, #0D1117, transparent 60%)",
                    }}
                  />
                </div>
              )}
              <div className="p-7">
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#E8ECF0",
                    marginBottom: 8,
                  }}
                >
                  Owner's Handbook
                </h3>
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.6,
                    marginBottom: 20,
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
                    padding: "10px 24px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Download PDF →
                </button>
              </div>
            </div>

            {/* Test Drive */}
            <div
              className="tech-card overflow-hidden"
              style={{
                border: "1px solid rgba(0,168,232,0.2)",
                background: "linear-gradient(160deg, #0D1520, #080A0E)",
              }}
            >
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, rgba(0,168,232,0.05), rgba(0,168,232,0.12))",
                }}
              >
                <svg
                  className="w-20 h-20"
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
              <div className="p-7">
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
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
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.6,
                    marginBottom: 20,
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
                    padding: "12px 28px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
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
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navigationItems}
        activeItem={activeNav}
        onItemClick={handleNavClick}
      />
    </div>
  );
}

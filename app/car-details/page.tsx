"use client";

import { useState, useEffect } from "react";
import CarShowcase from "@/components/car/CarShowcase";
import CarList from "@/components/car/CarList";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { Car, NavigationItem } from "@/types/car";
import { useRouter } from "next/navigation";
import { getAllCars, CarListItem } from "../lib/api";

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "team", label: "Team", icon: "people" },
];

/** Map the API shape to the local Car type used by CarShowcase / CarList */
function mapApiCarToLocal(apiCar: CarListItem): Car {
  return {
    id: apiCar.carId,
    name: apiCar.name,
    type: apiCar.type,
    status: apiCar.status === "Used" ? "Used" : "New",
    description: apiCar.subtitle,
    image: (apiCar.showcaseImages?.[0] ?? apiCar.heroImage ?? "")
      .replace(/\\/g, "/")
      .replace(/^([^/])/, "/$1"),
  };
}

export default function CarDetailsPage() {
  const router = useRouter();

  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeNav, setActiveNav] = useState<string>("car");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const apiCars = await getAllCars();
        if (cancelled) return;
        const mapped = apiCars.map(mapApiCarToLocal);
        setCars(mapped);
        if (mapped.length > 0) setSelectedCar(mapped[0]);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load cars");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCarSelect = (car: Car) => setSelectedCar(car);

  const handleNextCar = () => {
    if (!selectedCar || cars.length === 0) return;
    const i = cars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(cars[(i + 1) % cars.length]);
  };

  const handlePrevCar = () => {
    if (!selectedCar || cars.length === 0) return;
    const i = cars.findIndex((c) => c.id === selectedCar.id);
    setSelectedCar(cars[(i - 1 + cars.length) % cars.length]);
  };

  const handleViewDetails = () => {
    if (!selectedCar) return;
    router.push(`/car-info/${selectedCar.id}`);
  };

  const closeModal = () => setShowModal(false);

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") window.location.href = "/";
    if (itemId === "car") window.location.href = "/car-details";
    if (itemId === "team") window.location.href = "/team";
  };

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "#080A0E",
          color: "#E8ECF0",
          fontFamily: "'Rajdhani','Barlow',sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: "2px solid rgba(0,168,232,0.2)",
              borderTop: "2px solid #00A8E8",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6B7280",
            }}
          >
            Loading vehicles...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background: "#080A0E",
          color: "#E8ECF0",
          fontFamily: "'Rajdhani','Barlow',sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <p
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: 12,
            }}
          >
            Connection Error
          </p>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 24 }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#00A8E8",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "10px 28px",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedCar) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#080A0E",
        color: "#E8ECF0",
        fontFamily: "'Rajdhani', 'Barlow', sans-serif",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap");
      `}</style>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 mb-4">
          <CarShowcase
            car={selectedCar}
            onNext={handleNextCar}
            onPrev={handlePrevCar}
            onImageClick={handleViewDetails}
            onViewDetails={handleViewDetails}
          />
        </div>

        <CarList
          cars={cars}
          selectedCar={selectedCar}
          onCarSelect={handleCarSelect}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0A0C10] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="mb-6 text-center text-2xl uppercase tracking-[0.32em] text-[#00A8E8]">
              Coming Soon ...
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNavigation
          items={navigationItems}
          activeItem={activeNav}
          onItemClick={handleNavClick}
        />
      </div>
    </div>
  );
}

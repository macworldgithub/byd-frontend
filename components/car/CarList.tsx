"use client";

import { Car } from "@/types/car";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarListProps {
  cars: Car[];
  selectedCar: Car;
  onCarSelect: (car: Car) => void;
}

export default function CarList({
  cars,
  selectedCar,
  onCarSelect,
}: CarListProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);














































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































  

  return (
    <div className="py-4 px-4">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 20,
          paddingLeft: 4,
        }}
      >
        <div
          style={{ height: 1, width: 32, background: "rgba(0,168,232,0.4)" }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6B7280",
          }}
        >
          All Models
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {cars.map((car) => {
          const isSelected = selectedCar.id === car.id;
          const isHovered = hoveredId === car.id;

          return (
            <div
              key={car.id}
              onClick={() => onCarSelect(car)}
              onMouseEnter={() => setHoveredId(car.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                borderRadius: 6,
                overflow: "hidden",
                border: isSelected
                  ? "1px solid rgba(0,168,232,0.5)"
                  : isHovered
                    ? "1px solid rgba(0,168,232,0.25)"
                    : "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform:
                  isHovered && !isSelected
                    ? "translateY(-3px)"
                    : "translateY(0)",
                boxShadow: isSelected
                  ? "0 0 32px rgba(0,168,232,0.15), 0 16px 48px rgba(0,0,0,0.5)"
                  : isHovered
                    ? "0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,168,232,0.06)"
                    : "0 8px 32px rgba(0,0,0,0.4)",
                background: "#0A0C10",
              }}
            >
              {/* Image area */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                  style={{
                    transition: "transform 0.6s ease",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                  }}
                />

                {/* Gradients */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(0deg, #0A0C10 0%, rgba(10,12,16,0.4) 40%, transparent 70%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(10,12,16,0.6) 0%, transparent 50%)",
                  }}
                />

                {/* Type badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      background: "rgba(8,10,14,0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      padding: "3px 10px",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#A0A8B0",
                    }}
                  >
                    {car.type}
                  </span>
                  {car.status === "New" && (
                    <span
                      style={{
                        background: "#00A8E8",
                        borderRadius: 2,
                        padding: "3px 10px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      New
                    </span>
                  )}
                </div>

                {/* Selected ring */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      boxShadow: "inset 0 0 0 2px rgba(0,168,232,0.4)",
                      borderRadius: "inherit",
                      background:
                        "linear-gradient(135deg, rgba(0,168,232,0.05), transparent)",
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px 16px" }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: isSelected ? "#E8ECF0" : "#A0A8B0",
                    transition: "color 0.2s",
                  }}
                >
                  {car.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 12,
                      color: "#4B5563",
                      fontWeight: 400,
                    }}
                  >
                    {car.description}
                  </span>
                  {/* Selection indicator */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isSelected ? "#00A8E8" : "transparent",
                      border: isSelected
                        ? "1px solid #00A8E8"
                        : "1px solid #374151",
                      boxShadow: isSelected
                        ? "0 0 8px rgba(0,168,232,0.6)"
                        : "none",
                      transition: "all 0.3s",
                    }}
                  />
                </div>
              </div>

              {/* Active bottom accent */}
              {isSelected && (
                <div
                  style={{
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, #00A8E8, transparent)",
                  }}
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/car-info/${car.id}`);
                }}
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "#00A8E8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

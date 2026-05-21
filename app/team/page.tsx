// "use client";

// import { useState, useRef, useCallback, type TouchEvent } from "react";
// import Image from "next/image";
// import { Star, Zap, ShieldCheck } from "lucide-react";
// import BottomNavigation from "@/components/navigation/BottomNavigation";
// import { NavigationItem } from "@/types/car";
// import { useRouter } from "next/navigation";

// const navigationItems: NavigationItem[] = [
//   { id: "home", label: "Home", icon: "home" },
//   { id: "car", label: "Cars", icon: "car" },
//   { id: "enquire", label: "Enquire", icon: "people" },
// ];

// type SectionId = "landing" | "personal" | "vehicle" | "confirm";

// const SECTIONS: { id: SectionId; label: string }[] = [
//   { id: "landing", label: "Overview" },
//   { id: "personal", label: "Your Details" },
//   { id: "vehicle", label: "Vehicle" },
//   { id: "confirm", label: "Confirm" },
// ];

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   postcode: string;
//   model: string;
//   timeline: string;
//   contactPreference: "phone" | "email";
//   notes: string;
//   consent: boolean;
// }

// const INITIAL_FORM: FormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   postcode: "",
//   model: "",
//   timeline: "",
//   contactPreference: "phone",
//   notes: "",
//   consent: false,
// };

// const BYD_MODELS = [
//   { value: "atto3", label: "Atto 3", tag: "Popular SUV" },
//   { value: "seal", label: "Seal", tag: "Performance Sedan" },
//   { value: "dolphin", label: "Dolphin", tag: "Compact & Affordable" },
//   { value: "sealion6", label: "Sealion 6", tag: "PHEV SUV" },
//   { value: "sealion7", label: "Sealion 7", tag: "Premium Electric SUV" },
//   { value: "shark6", label: "Shark 6", tag: "Ute" },
//   { value: "other", label: "Other / Not Sure", tag: "" },
// ];

// const TIMELINES = [
//   { value: "1month", label: "Within 1 month" },
//   { value: "1-3months", label: "1–3 months" },
//   { value: "3-6months", label: "3–6 months" },
//   { value: "browsing", label: "Just browsing" },
// ];

// export default function LeadCapturePage() {
//   const router = useRouter();
//   const [activeNav, setActiveNav] = useState("enquire");
//   const [activeSection, setActiveSection] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [slideDir, setSlideDir] = useState<"left" | "right">("left");
//   const [form, setForm] = useState<FormData>(INITIAL_FORM);
//   const [submitted, setSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
//     {},
//   );

//   const touchStartX = useRef(0);
//   const touchStartY = useRef(0);
//   const touchStartTime = useRef(0);
//   const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const goToSection = useCallback(
//     (index: number, dir?: "left" | "right") => {
//       if (isTransitioning || index === activeSection) return;
//       const direction = dir ?? (index > activeSection ? "left" : "right");
//       setSlideDir(direction);
//       setIsTransitioning(true);
//       if (transitionTimer.current) clearTimeout(transitionTimer.current);
//       transitionTimer.current = setTimeout(() => {
//         setActiveSection(index);
//         setIsTransitioning(false);
//       }, 350);
//     },
//     [isTransitioning, activeSection],
//   );

//   const nextSection = useCallback(() => {
//     if (activeSection < SECTIONS.length - 1)
//       goToSection(activeSection + 1, "left");
//   }, [activeSection, goToSection]);

//   const prevSection = useCallback(() => {
//     if (activeSection > 0) goToSection(activeSection - 1, "right");
//   }, [activeSection, goToSection]);

//   const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
//     touchStartX.current = e.touches[0].clientX;
//     touchStartY.current = e.touches[0].clientY;
//     touchStartTime.current = Date.now();
//   };

//   const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
//     const dx = e.changedTouches[0].clientX - touchStartX.current;
//     const dy = e.changedTouches[0].clientY - touchStartY.current;
//     const dt = Date.now() - touchStartTime.current;
//     if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && dt < 600) {
//       if (dx < 0) nextSection();
//       else prevSection();
//     }
//   };

//   const handleNavClick = (itemId: string) => {
//     setActiveNav(itemId);
//     if (itemId === "home") router.push("/");
//     if (itemId === "car") router.push("/car-details");
//   };

//   const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//   };

//   const validatePersonal = () => {
//     const e: Partial<Record<keyof FormData, string>> = {};
//     if (!form.firstName.trim()) e.firstName = "Required";
//     if (!form.lastName.trim()) e.lastName = "Required";
//     if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
//       e.email = "Valid email required";
//     if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8)
//       e.phone = "Valid phone required";
//     if (!form.postcode.trim() || !/^\d{4}$/.test(form.postcode))
//       e.postcode = "4-digit postcode required";
//     return e;
//   };

//   const validateVehicle = () => {
//     const e: Partial<Record<keyof FormData, string>> = {};
//     if (!form.model) e.model = "Please select a model";
//     if (!form.timeline) e.timeline = "Please select a timeline";
//     return e;
//   };

//   const handlePersonalNext = () => {
//     const e = validatePersonal();
//     if (Object.keys(e).length > 0) {
//       setErrors(e);
//       return;
//     }
//     nextSection();
//   };

//   const handleVehicleNext = () => {
//     const e = validateVehicle();
//     if (Object.keys(e).length > 0) {
//       setErrors(e);
//       return;
//     }
//     nextSection();
//   };

//   const handleSubmit = async () => {
//     if (!form.consent) {
//       setErrors({ consent: "Please accept to continue" });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError(null);

//     // Map internal values to API-expected format
//     const modelLabel =
//       BYD_MODELS.find((m) => m.value === form.model)?.label ?? form.model;
//     const timelineLabel =
//       TIMELINES.find((t) => t.value === form.timeline)?.label ?? form.timeline;

//     const payload = {
//       firstName: form.firstName.trim(),
//       lastName: form.lastName.trim(),
//       email: form.email.trim(),
//       phone: form.phone.trim(),
//       postcode: form.postcode.trim(),
//       model: modelLabel,
//       timeline: timelineLabel,
//       contactPreference:
//         form.contactPreference.charAt(0).toUpperCase() +
//         form.contactPreference.slice(1),
//       notes: form.notes.trim(),
//       consent: "on",
//     };

//     try {
//       const res = await fetch("https://byd-backend.omnisuiteai.com/api/leads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const text = await res.text().catch(() => "");
//         throw new Error(text || `Server error (${res.status})`);
//       }

//       setSubmitted(true);
//     } catch (err) {
//       setSubmitError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const currentSection = SECTIONS[activeSection];

//   // ── SECTION: LANDING ────────────────────────────────────────────────────
//   const renderLanding = () => (
//     <div style={{ width: "100%", position: "relative" }}>
//       {/* ── HERO IMAGE BLOCK ─────────────────────────────────────── */}
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "clamp(240px, 52vw, 420px)",
//           overflow: "hidden",
//           background: "linear-gradient(135deg,#0D1520,#080A0E)",
//         }}
//       >
//         <Image
//           src="/images/atto-3/hero.png"
//           alt="BYD Atto 3 – Discover Your Next BYD"
//           fill
//           style={{ objectFit: "cover", objectPosition: "center 30%" }}
//           priority
//           unoptimized
//         />
//         {/* Dark gradient overlays so text reads on top */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(0deg, #080A0E 0%, rgba(8,10,14,0.55) 45%, rgba(8,10,14,0.1) 100%)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(90deg, rgba(8,10,14,0.8) 0%, transparent 60%)",
//           }}
//         />

//         {/* BYD wordmark top-right */}
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             right: 16,
//             zIndex: 10,
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 900,
//             fontSize: 20,
//             letterSpacing: "0.22em",
//             color: "white",
//           }}
//         >
//           BYD
//         </div>

//         {/* Hero text over image */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 20,
//             left: 20,
//             right: 20,
//             zIndex: 10,
//           }}
//         >
//           <div
//             style={{
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 900,
//               fontSize: "clamp(28px, 8vw, 52px)",
//               textTransform: "uppercase",
//               letterSpacing: "0.01em",
//               lineHeight: 0.92,
//               color: "#E8ECF0",
//               marginBottom: 8,
//             }}
//           >
//             Discover Your
//             <br />
//             <span
//               style={{
//                 background: "linear-gradient(90deg, #00A8E8, #00d4ff)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               Next BYD
//             </span>
//           </div>
//           <p
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontWeight: 300,
//               fontSize: "clamp(12px, 2.2vw, 15px)",
//               color: "rgba(232,236,240,0.75)",
//               lineHeight: 1.55,
//               maxWidth: 340,
//             }}
//           >
//             Get Exclusive Pricing &amp; Book a Test Drive Today
//           </p>
//         </div>
//       </div>

//       {/* ── TRUST BAR ────────────────────────────────────────────── */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0,
//           background: "linear-gradient(90deg, #060810, #0A1020, #060810)",
//           borderTop: "1px solid rgba(0,168,232,0.15)",
//           borderBottom: "1px solid rgba(0,168,232,0.15)",
//           padding: "10px 12px",
//           flexWrap: "wrap",
//         }}
//       >
//         {[
//           { Icon: Star, text: "5-Star Safety" },
//           { Icon: Zap, text: "Blade Battery Technology" },
//           { Icon: ShieldCheck, text: "6-Year Warranty" },
//         ].map(({ Icon, text }, i) => (
//           <div key={i} style={{ display: "flex", alignItems: "center" }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 6,
//                 padding: "2px 12px",
//               }}
//             >
//               <Icon size={13} color="#00A8E8" strokeWidth={2} />
//               <span
//                 style={{
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700,
//                   fontSize: 10,
//                   letterSpacing: "0.16em",
//                   textTransform: "uppercase",
//                   color: "#00A8E8",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {text}
//               </span>
//             </div>
//             {i < 2 && (
//               <span
//                 style={{
//                   width: 1,
//                   height: 14,
//                   background: "rgba(0,168,232,0.25)",
//                   flexShrink: 0,
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ── CONTENT BELOW IMAGE ──────────────────────────────────── */}
//       <div className="section-content" style={{ paddingTop: 24 }}>
//         {/* Subheadline */}
//         <p
//           style={{
//             fontFamily: "'Barlow', sans-serif",
//             fontWeight: 400,
//             fontSize: "clamp(13px,2vw,15px)",
//             color: "rgba(232,236,240,0.6)",
//             lineHeight: 1.7,
//             marginBottom: 20,
//             textAlign: "center",
//           }}
//         >
//           Join thousands driving Australia's favourite new energy vehicles.
//           Instant access to latest offers on{" "}
//           <span style={{ color: "#00A8E8", fontWeight: 600 }}>
//             Atto 3, Seal, Sealion, Dolphin &amp; more.
//           </span>
//         </p>

//         <div className="glow-line" style={{ marginBottom: 20 }} />

//         {/* What you'll receive */}
//         {/* <div style={{
//           background: "linear-gradient(135deg, #0D1117, #111620)",
//           border: "1px solid rgba(0,168,232,0.12)",
//           borderRadius: 12,
//           padding: "18px 18px",
//           marginBottom: 20,
//         }}>
//           <p style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 10,
//             letterSpacing: "0.25em",
//             textTransform: "uppercase",
//             color: "#00A8E8",
//             marginBottom: 12,
//           }}>
//             Tell us what you're looking for and receive:
//           </p>
//           {[
//             "✅  Personalised Pricing",
//             "✅  Test Drive Booking",
//             "✅  Latest Brochure",
//           ].map((item) => (
//             <div key={item} style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               marginBottom: 9,
//             }}>
//               <span style={{
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 14,
//                 color: "#E8ECF0",
//                 fontWeight: 500,
//               }}>{item}</span>
//             </div>
//           ))}
//         </div> */}

//         {/* Available models pills */}
//         <p
//           style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 600,
//             fontSize: 10,
//             letterSpacing: "0.22em",
//             textTransform: "uppercase",
//             color: "#6B7280",
//             marginBottom: 8,
//           }}
//         >
//           Available Models
//         </p>
//         <div
//           style={{
//             display: "flex",
//             gap: 6,
//             flexWrap: "wrap",
//             marginBottom: 22,
//           }}
//         >
//           {[
//             "Atto 3",
//             "Seal",
//             "Dolphin",
//             "Sealion 6",
//             "Sealion 7",
//             "Shark 6",
//           ].map((m) => (
//             <span
//               key={m}
//               style={{
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 600,
//                 fontSize: 11,
//                 letterSpacing: "0.06em",
//                 color: "#A0A8B0",
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 borderRadius: 4,
//                 padding: "4px 10px",
//               }}
//             >
//               {m}
//             </span>
//           ))}
//         </div>

//         <button
//           onClick={nextSection}
//           style={{
//             width: "100%",
//             padding: "15px 0",
//             background: "linear-gradient(135deg, #00A8E8, #004E8C)",
//             border: "none",
//             borderRadius: 6,
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 14,
//             letterSpacing: "0.2em",
//             textTransform: "uppercase",
//             color: "#fff",
//             cursor: "pointer",
//             boxShadow: "0 4px 24px rgba(0,168,232,0.4)",
//             transition: "all 0.2s",
//             marginBottom: 90,
//           }}
//           onMouseEnter={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.boxShadow =
//               "0 6px 32px rgba(0,168,232,0.6)";
//           }}
//           onMouseLeave={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.boxShadow =
//               "0 4px 24px rgba(0,168,232,0.4)";
//           }}
//         >
//           Get My Personalised BYD Offer Now →
//         </button>
//       </div>
//     </div>
//   );

//   // ── SECTION: PERSONAL DETAILS ───────────────────────────────────────────
//   const renderPersonal = () => (
//     <div className="section-content" style={{ paddingTop: 28 }}>
//       <div className="section-label text-center mb-2">Step 1 of 3</div>
//       <h2
//         className="section-title text-center mb-2"
//         style={{ fontSize: "clamp(24px,5vw,40px)", color: "#E8ECF0" }}
//       >
//         Your Details
//       </h2>
//       <p
//         style={{
//           fontFamily: "'Barlow', sans-serif",
//           fontSize: 13,
//           color: "#6B7280",
//           textAlign: "center",
//           marginBottom: 24,
//         }}
//       >
//         We'll use this to send your personalised offer.
//       </p>
//       <div className="glow-line" style={{ marginBottom: 24 }} />

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 12,
//           marginBottom: 12,
//         }}
//       >
//         <div>
//           <FieldLabel label="First Name" required />
//           <Input
//             value={form.firstName}
//             onChange={(v) => setField("firstName", v)}
//             placeholder="Jane"
//             error={errors.firstName}
//           />
//         </div>
//         <div>
//           <FieldLabel label="Last Name" required />
//           <Input
//             value={form.lastName}
//             onChange={(v) => setField("lastName", v)}
//             placeholder="Smith"
//             error={errors.lastName}
//           />
//         </div>
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <FieldLabel label="Email Address" required />
//         <Input
//           value={form.email}
//           onChange={(v) => setField("email", v)}
//           placeholder="jane@example.com"
//           type="email"
//           error={errors.email}
//         />
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <FieldLabel label="Phone Number" required />
//         <Input
//           value={form.phone}
//           onChange={(v) => setField("phone", v)}
//           placeholder="04xx xxx xxx"
//           type="tel"
//           error={errors.phone}
//         />
//       </div>

//       <div style={{ marginBottom: 24 }}>
//         <FieldLabel label="Postcode" required />
//         <Input
//           value={form.postcode}
//           onChange={(v) => setField("postcode", v)}
//           placeholder="2000"
//           error={errors.postcode}
//         />
//       </div>

//       <button
//         onClick={handlePersonalNext}
//         style={{
//           width: "100%",
//           padding: "13px 0",
//           background: "linear-gradient(135deg, #00A8E8, #004E8C)",
//           border: "none",
//           borderRadius: 6,
//           fontFamily: "'Barlow Condensed', sans-serif",
//           fontWeight: 700,
//           fontSize: 13,
//           letterSpacing: "0.18em",
//           textTransform: "uppercase",
//           color: "#fff",
//           cursor: "pointer",
//           boxShadow: "0 4px 20px rgba(0,168,232,0.3)",
//           marginBottom: 90,
//         }}
//       >
//         Continue →
//       </button>
//     </div>
//   );

//   // ── SECTION: VEHICLE PREFERENCES ───────────────────────────────────────
//   const renderVehicle = () => (
//     <div className="section-content" style={{ paddingTop: 28 }}>
//       <div className="section-label text-center mb-2">Step 2 of 3</div>
//       <h2
//         className="section-title text-center mb-2"
//         style={{ fontSize: "clamp(24px,5vw,40px)", color: "#E8ECF0" }}
//       >
//         Your Preferences
//       </h2>
//       <p
//         style={{
//           fontFamily: "'Barlow', sans-serif",
//           fontSize: 13,
//           color: "#6B7280",
//           textAlign: "center",
//           marginBottom: 24,
//         }}
//       >
//         Help us match you with the right vehicle.
//       </p>
//       <div className="glow-line" style={{ marginBottom: 24 }} />

//       {/* Model selection */}
//       <div style={{ marginBottom: 20 }}>
//         <FieldLabel label="Which BYD model interests you most?" required />
//         <div
//           style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
//         >
//           {BYD_MODELS.map((m) => (
//             <button
//               key={m.value}
//               onClick={() => setField("model", m.value)}
//               style={{
//                 padding: "10px 10px",
//                 background:
//                   form.model === m.value
//                     ? "rgba(0,168,232,0.15)"
//                     : "rgba(255,255,255,0.03)",
//                 border: `1px solid ${form.model === m.value ? "rgba(0,168,232,0.5)" : "rgba(255,255,255,0.08)"}`,
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 textAlign: "left",
//                 transition: "all 0.2s",
//               }}
//             >
//               <div
//                 style={{
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   letterSpacing: "0.04em",
//                   color: form.model === m.value ? "#00A8E8" : "#E8ECF0",
//                   textTransform: "uppercase",
//                   marginBottom: m.tag ? 2 : 0,
//                 }}
//               >
//                 {m.label}
//               </div>
//               {m.tag && (
//                 <div
//                   style={{
//                     fontFamily: "'Barlow', sans-serif",
//                     fontSize: 10,
//                     color: "#6B7280",
//                   }}
//                 >
//                   {m.tag}
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>
//         {errors.model && <ErrorText text={errors.model} />}
//       </div>

//       {/* Timeline */}
//       <div style={{ marginBottom: 20 }}>
//         <FieldLabel label="When are you looking to buy?" required />
//         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//           {TIMELINES.map((t) => (
//             <button
//               key={t.value}
//               onClick={() => setField("timeline", t.value)}
//               style={{
//                 padding: "11px 16px",
//                 background:
//                   form.timeline === t.value
//                     ? "rgba(0,168,232,0.12)"
//                     : "rgba(255,255,255,0.03)",
//                 border: `1px solid ${form.timeline === t.value ? "rgba(0,168,232,0.4)" : "rgba(255,255,255,0.07)"}`,
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 transition: "all 0.2s",
//               }}
//             >
//               <div
//                 style={{
//                   width: 16,
//                   height: 16,
//                   borderRadius: "50%",
//                   border: `2px solid ${form.timeline === t.value ? "#00A8E8" : "rgba(255,255,255,0.2)"}`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 {form.timeline === t.value && (
//                   <div
//                     style={{
//                       width: 8,
//                       height: 8,
//                       borderRadius: "50%",
//                       background: "#00A8E8",
//                     }}
//                   />
//                 )}
//               </div>
//               <span
//                 style={{
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 13,
//                   color: form.timeline === t.value ? "#E8ECF0" : "#A0A8B0",
//                   fontWeight: form.timeline === t.value ? 600 : 400,
//                 }}
//               >
//                 {t.label}
//               </span>
//             </button>
//           ))}
//         </div>
//         {errors.timeline && <ErrorText text={errors.timeline} />}
//       </div>

//       {/* Contact preference */}
//       <div style={{ marginBottom: 24 }}>
//         <FieldLabel label="Preferred Contact" />
//         <div style={{ display: "flex", gap: 10 }}>
//           {(["phone", "email"] as const).map((pref) => (
//             <button
//               key={pref}
//               onClick={() => setField("contactPreference", pref)}
//               style={{
//                 flex: 1,
//                 padding: "10px",
//                 background:
//                   form.contactPreference === pref
//                     ? "rgba(0,168,232,0.12)"
//                     : "rgba(255,255,255,0.03)",
//                 border: `1px solid ${form.contactPreference === pref ? "rgba(0,168,232,0.4)" : "rgba(255,255,255,0.07)"}`,
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 12,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 color: form.contactPreference === pref ? "#00A8E8" : "#6B7280",
//                 transition: "all 0.2s",
//               }}
//             >
//               {pref}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleVehicleNext}
//         style={{
//           width: "100%",
//           padding: "13px 0",
//           background: "linear-gradient(135deg, #00A8E8, #004E8C)",
//           border: "none",
//           borderRadius: 6,
//           fontFamily: "'Barlow Condensed', sans-serif",
//           fontWeight: 700,
//           fontSize: 13,
//           letterSpacing: "0.18em",
//           textTransform: "uppercase",
//           color: "#fff",
//           cursor: "pointer",
//           boxShadow: "0 4px 20px rgba(0,168,232,0.3)",
//           marginBottom: 90,
//         }}
//       >
//         Continue →
//       </button>
//     </div>
//   );

//   // ── SECTION: CONFIRM ────────────────────────────────────────────────────
//   const renderConfirm = () => {
//     const modelLabel =
//       BYD_MODELS.find((m) => m.value === form.model)?.label ?? form.model;
//     const timelineLabel =
//       TIMELINES.find((t) => t.value === form.timeline)?.label ?? form.timeline;

//     if (submitted) {
//       return (
//         <div
//           className="section-content"
//           style={{ paddingTop: 40, textAlign: "center" }}
//         >
//           <div
//             style={{
//               width: 72,
//               height: 72,
//               borderRadius: "50%",
//               background: "rgba(0,168,232,0.1)",
//               border: "1px solid rgba(0,168,232,0.3)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               margin: "0 auto 24px",
//               boxShadow: "0 0 32px rgba(0,168,232,0.2)",
//             }}
//           >
//             <svg
//               width="32"
//               height="32"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#00A8E8"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2
//             style={{
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 800,
//               fontSize: "clamp(26px,5vw,40px)",
//               textTransform: "uppercase",
//               color: "#E8ECF0",
//               marginBottom: 12,
//               letterSpacing: "0.02em",
//             }}
//           >
//             You're All Set!
//           </h2>
//           <p
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 14,
//               color: "#6B7280",
//               lineHeight: 1.7,
//               marginBottom: 32,
//               maxWidth: 340,
//               margin: "0 auto 32px",
//             }}
//           >
//             Thanks,{" "}
//             <strong style={{ color: "#E8ECF0" }}>{form.firstName}</strong>. Our
//             BYD team will be in touch shortly with your personalised offer for
//             the <strong style={{ color: "#00A8E8" }}>{modelLabel}</strong>.
//           </p>
//           <div className="glow-line" style={{ marginBottom: 28 }} />
//           <button
//             onClick={() => router.push("/car-details")}
//             style={{
//               padding: "13px 32px",
//               background: "transparent",
//               border: "1px solid rgba(0,168,232,0.4)",
//               borderRadius: 6,
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 700,
//               fontSize: 13,
//               letterSpacing: "0.18em",
//               textTransform: "uppercase",
//               color: "#00A8E8",
//               cursor: "pointer",
//             }}
//           >
//             Explore Vehicles →
//           </button>
//         </div>
//       );
//     }

//     return (
//       <div className="section-content" style={{ paddingTop: 28 }}>
//         <div className="section-label text-center mb-2">Step 3 of 3</div>
//         <h2
//           className="section-title text-center mb-2"
//           style={{ fontSize: "clamp(24px,5vw,40px)", color: "#E8ECF0" }}
//         >
//           Review &amp; Submit
//         </h2>
//         <div className="glow-line" style={{ marginBottom: 20 }} />

//         {/* Summary card */}
//         <div
//           style={{
//             background: "linear-gradient(135deg, #0D1117, #111620)",
//             border: "1px solid rgba(0,168,232,0.12)",
//             borderRadius: 12,
//             padding: "18px 16px",
//             marginBottom: 20,
//           }}
//         >
//           <p
//             style={{
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontSize: 10,
//               letterSpacing: "0.25em",
//               textTransform: "uppercase",
//               color: "#6B7280",
//               marginBottom: 14,
//             }}
//           >
//             Enquiry Summary
//           </p>

//           {[
//             { label: "Name", value: `${form.firstName} ${form.lastName}` },
//             { label: "Email", value: form.email },
//             { label: "Phone", value: form.phone },
//             { label: "Postcode", value: form.postcode },
//             { label: "Model", value: modelLabel },
//             { label: "Timeline", value: timelineLabel },
//             { label: "Contact via", value: form.contactPreference },
//           ].map((row) => (
//             <div
//               key={row.label}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 paddingBottom: 8,
//                 marginBottom: 8,
//                 borderBottom: "1px solid rgba(255,255,255,0.04)",
//               }}
//             >
//               <span
//                 style={{
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 11,
//                   color: "#6B7280",
//                   textTransform: "uppercase",
//                   letterSpacing: "0.08em",
//                 }}
//               >
//                 {row.label}
//               </span>
//               <span
//                 style={{
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 13,
//                   color: "#E8ECF0",
//                   fontWeight: 500,
//                 }}
//               >
//                 {row.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Notes */}
//         <div style={{ marginBottom: 20 }}>
//           <FieldLabel label="Additional notes (optional)" />
//           <textarea
//             value={form.notes}
//             onChange={(e) => setField("notes", e.target.value)}
//             placeholder="Any specific requirements or questions..."
//             rows={3}
//             style={{
//               width: "100%",
//               background: "rgba(255,255,255,0.03)",
//               border: "1px solid rgba(255,255,255,0.08)",
//               borderRadius: 8,
//               padding: "12px 14px",
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 13,
//               color: "#E8ECF0",
//               resize: "none",
//               outline: "none",
//               transition: "border-color 0.2s",
//               boxSizing: "border-box",
//             }}
//             onFocus={(e) => {
//               e.currentTarget.style.borderColor = "rgba(0,168,232,0.4)";
//             }}
//             onBlur={(e) => {
//               e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
//             }}
//           />
//         </div>

//         {/* Consent */}
//         <div
//           onClick={() => setField("consent", !form.consent)}
//           style={{
//             display: "flex",
//             gap: 12,
//             alignItems: "flex-start",
//             padding: "14px 14px",
//             background: form.consent
//               ? "rgba(0,168,232,0.06)"
//               : "rgba(255,255,255,0.02)",
//             border: `1px solid ${form.consent ? "rgba(0,168,232,0.25)" : "rgba(255,255,255,0.06)"}`,
//             borderRadius: 8,
//             cursor: "pointer",
//             transition: "all 0.2s",
//             marginBottom: 4,
//           }}
//         >
//           <div
//             style={{
//               width: 18,
//               height: 18,
//               borderRadius: 4,
//               border: `2px solid ${form.consent ? "#00A8E8" : "rgba(255,255,255,0.2)"}`,
//               background: form.consent ? "#00A8E8" : "transparent",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//               marginTop: 1,
//               transition: "all 0.2s",
//             }}
//           >
//             {form.consent && (
//               <svg
//                 width="10"
//                 height="10"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth={3}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M5 13l4 4L19 7" />
//               </svg>
//             )}
//           </div>
//           <p
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 12,
//               color: "#6B7280",
//               lineHeight: 1.6,
//             }}
//           >
//             I agree to receive communications from BYD and authorised dealers
//             about new vehicles, offers and test drives.{" "}
//             <span style={{ color: "#00A8E8" }}>Privacy Policy</span>
//           </p>
//         </div>
//         {errors.consent && <ErrorText text={errors.consent} />}

//         {/* API error banner */}
//         {submitError && (
//           <div
//             style={{
//               marginTop: 16,
//               padding: "12px 14px",
//               background: "rgba(239,68,68,0.08)",
//               border: "1px solid rgba(239,68,68,0.3)",
//               borderRadius: 8,
//               display: "flex",
//               alignItems: "flex-start",
//               gap: 10,
//             }}
//           >
//             <svg
//               width="15"
//               height="15"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#ef4444"
//               strokeWidth={2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ flexShrink: 0, marginTop: 1 }}
//             >
//               <circle cx="12" cy="12" r="10" />
//               <line x1="12" y1="8" x2="12" y2="12" />
//               <line x1="12" y1="16" x2="12.01" y2="16" />
//             </svg>
//             <p
//               style={{
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 12,
//                 color: "#ef4444",
//                 lineHeight: 1.5,
//               }}
//             >
//               {submitError}
//             </p>
//           </div>
//         )}

//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           style={{
//             width: "100%",
//             marginTop: 16,
//             padding: "14px 0",
//             background: isSubmitting
//               ? "rgba(0,168,232,0.35)"
//               : "linear-gradient(135deg, #00A8E8, #004E8C)",
//             border: "none",
//             borderRadius: 6,
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 13,
//             letterSpacing: "0.18em",
//             textTransform: "uppercase",
//             color: "#fff",
//             cursor: isSubmitting ? "not-allowed" : "pointer",
//             boxShadow: isSubmitting
//               ? "none"
//               : "0 4px 20px rgba(0,168,232,0.35)",
//             transition: "all 0.2s",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 10,
//           }}
//         >
//           {isSubmitting ? (
//             <>
//               <span
//                 style={{
//                   width: 14,
//                   height: 14,
//                   border: "2px solid rgba(255,255,255,0.3)",
//                   borderTop: "2px solid #fff",
//                   borderRadius: "50%",
//                   display: "inline-block",
//                   animation: "spin 0.7s linear infinite",
//                   flexShrink: 0,
//                 }}
//               />
//               Submitting...
//             </>
//           ) : (
//             "Get My Personalised BYD Offer"
//           )}
//         </button>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 6,
//             marginTop: 12,
//             marginBottom: 90,
//           }}
//         >
//           <svg
//             width="12"
//             height="12"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#6B7280"
//             strokeWidth={2}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//             <path d="M7 11V7a5 5 0 0110 0v4" />
//           </svg>
//           <span
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 11,
//               color: "#6B7280",
//             }}
//           >
//             Your information is secure and only used to contact you about BYD
//             vehicles.
//           </span>
//         </div>
//       </div>
//     );
//   };

//   const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
//     landing: renderLanding,
//     personal: renderPersonal,
//     vehicle: renderVehicle,
//     confirm: renderConfirm,
//   };

//   return (
//     <div
//       style={{
//         height: "100dvh",
//         background: "#080A0E",
//         color: "#E8ECF0",
//         fontFamily: "'Rajdhani', 'Barlow', sans-serif",
//         overflow: "hidden",
//         position: "relative",
//         userSelect: "none",
//         touchAction: "pan-y",
//       }}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap");
//         * {
//           box-sizing: border-box;
//         }
//         .glow-line {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #00a8e8, transparent);
//           opacity: 0.5;
//         }
//         .section-label {
//           font-family: "Barlow Condensed", sans-serif;
//           font-size: 11px;
//           letter-spacing: 0.3em;
//           text-transform: uppercase;
//           color: #00a8e8;
//           font-weight: 600;
//         }
//         .section-title {
//           font-family: "Barlow Condensed", sans-serif;
//           font-weight: 800;
//           text-transform: uppercase;
//           letter-spacing: 0.02em;
//         }
//         .section-content {
//           padding: 20px 20px 24px;
//           max-width: 560px;
//           margin: 0 auto;
//           width: 100%;
//         }
//         .slide-in-left {
//           animation: slideInLeft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//         }
//         .slide-in-right {
//           animation: slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
//         }
//         .slide-out-left {
//           animation: slideOutLeft 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
//         }
//         .slide-out-right {
//           animation: slideOutRight 0.35s cubic-bezier(0.55, 0, 1, 0.45) forwards;
//         }
//         @keyframes slideInLeft {
//           from {
//             transform: translateX(60px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         @keyframes slideInRight {
//           from {
//             transform: translateX(-60px);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         @keyframes slideOutLeft {
//           from {
//             transform: translateX(0);
//             opacity: 1;
//           }
//           to {
//             transform: translateX(-60px);
//             opacity: 0;
//           }
//         }
//         @keyframes slideOutRight {
//           from {
//             transform: translateX(0);
//             opacity: 1;
//           }
//           to {
//             transform: translateX(60px);
//             opacity: 0;
//           }
//         }
//         textarea::placeholder,
//         input::placeholder {
//           color: #3d4450;
//         }
//         input,
//         textarea {
//           color-scheme: dark;
//         }
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>

//       {/* Main scrollable content */}
//       <div
//         className={`absolute inset-0 overflow-y-auto ${
//           isTransitioning
//             ? slideDir === "left"
//               ? "slide-out-left"
//               : "slide-out-right"
//             : slideDir === "left"
//               ? "slide-in-left"
//               : "slide-in-right"
//         }`}
//         style={{ paddingBottom: 104 }}
//       >
//         {sectionRenderers[currentSection.id]()}
//       </div>

//       {/* Dot nav — hidden on landing */}
//       {activeSection > 0 && !submitted && (
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 30,
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//           }}
//         >
//           {SECTIONS.map((s, i) => (
//             <button
//               key={s.id}
//               onClick={() => i < activeSection && goToSection(i)}
//               style={{
//                 width: i === activeSection ? 20 : 6,
//                 height: 6,
//                 borderRadius: 3,
//                 background:
//                   i === activeSection
//                     ? "#00A8E8"
//                     : i < activeSection
//                       ? "rgba(0,168,232,0.35)"
//                       : "rgba(255,255,255,0.15)",
//                 border: "none",
//                 cursor: i < activeSection ? "pointer" : "default",
//                 transition: "all 0.3s ease",
//                 padding: 0,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Bottom nav bar */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           zIndex: 30,
//           background: "linear-gradient(0deg,#080A0E 70%,transparent)",
//           paddingTop: 20,
//         }}
//       >
//         {/* Prev/next + section label */}
//         {!submitted && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 12,
//               padding: "0 12px",
//               marginBottom: 8,
//             }}
//           >
//             <button
//               onClick={prevSection}
//               disabled={activeSection === 0}
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: 4,
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 background: "rgba(8,10,14,0.8)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: activeSection === 0 ? "rgba(255,255,255,0.2)" : "#fff",
//                 cursor: activeSection === 0 ? "default" : "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>

//             <span
//               style={{
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 12,
//                 letterSpacing: "0.25em",
//                 textTransform: "uppercase",
//                 color: "#00A8E8",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {activeSection + 1} / {SECTIONS.length} · {currentSection.label}
//             </span>

//             <button
//               onClick={nextSection}
//               disabled={activeSection === SECTIONS.length - 1}
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: 4,
//                 border: "1px solid rgba(0,168,232,0.3)",
//                 background: "rgba(0,168,232,0.1)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color:
//                   activeSection === SECTIONS.length - 1
//                     ? "rgba(0,168,232,0.3)"
//                     : "#00A8E8",
//                 cursor:
//                   activeSection === SECTIONS.length - 1 ? "default" : "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}

//         <BottomNavigation
//           items={navigationItems}
//           activeItem={activeNav}
//           onItemClick={handleNavClick}
//         />
//       </div>
//     </div>
//   );
// }

// // ── SHARED MICRO-COMPONENTS ────────────────────────────────────────────────

// function FieldLabel({
//   label,
//   required,
// }: {
//   label: string;
//   required?: boolean;
// }) {
//   return (
//     <p
//       style={{
//         fontFamily: "'Barlow Condensed', sans-serif",
//         fontWeight: 600,
//         fontSize: 11,
//         letterSpacing: "0.18em",
//         textTransform: "uppercase",
//         color: "#6B7280",
//         marginBottom: 6,
//       }}
//     >
//       {label}
//       {required && <span style={{ color: "#00A8E8", marginLeft: 2 }}>*</span>}
//     </p>
//   );
// }

// function Input({
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   error,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
//   error?: string;
// }) {
//   return (
//     <>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         style={{
//           width: "100%",
//           background: "rgba(255,255,255,0.03)",
//           border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}`,
//           borderRadius: 8,
//           padding: "11px 14px",
//           fontFamily: "'Barlow', sans-serif",
//           fontSize: 14,
//           color: "#E8ECF0",
//           outline: "none",
//           transition: "border-color 0.2s",
//           boxSizing: "border-box",
//         }}
//         onFocus={(e) => {
//           e.currentTarget.style.borderColor = error
//             ? "rgba(239,68,68,0.5)"
//             : "rgba(0,168,232,0.4)";
//         }}
//         onBlur={(e) => {
//           e.currentTarget.style.borderColor = error
//             ? "rgba(239,68,68,0.5)"
//             : "rgba(255,255,255,0.08)";
//         }}
//       />
//       {error && <ErrorText text={error} />}
//     </>
//   );
// }

// function ErrorText({ text }: { text: string }) {
//   return (
//     <p
//       style={{
//         fontFamily: "'Barlow', sans-serif",
//         fontSize: 11,
//         color: "#ef4444",
//         marginTop: 4,
//       }}
//     >
//       {text}
//     </p>
//   );
// }
"use client";

import { useState, useRef, useCallback, type TouchEvent } from "react";
import Image from "next/image";
import { Star, Zap, ShieldCheck } from "lucide-react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { NavigationItem } from "@/types/car";
import { useRouter } from "next/navigation";

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "car", label: "Cars", icon: "car" },
  { id: "enquire", label: "Enquire", icon: "people" },
];

type SectionId = "landing" | "personal" | "vehicle" | "confirm";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "landing", label: "Overview" },
  { id: "personal", label: "Your Details" },
  { id: "vehicle", label: "Vehicle" },
  { id: "confirm", label: "Confirm" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  model: string;
  timeline: string;
  contactPreference: "phone" | "email";
  notes: string;
  consent: boolean;
}

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postcode: "",
  model: "",
  timeline: "",
  contactPreference: "phone",
  notes: "",
  consent: false,
};

const BYD_MODELS = [
  { value: "atto3", label: "Atto 3", tag: "Popular SUV" },
  { value: "seal", label: "Seal", tag: "Performance Sedan" },
  { value: "dolphin", label: "Dolphin", tag: "Compact & Affordable" },
  { value: "sealion6", label: "Sealion 6", tag: "PHEV SUV" },
  { value: "sealion7", label: "Sealion 7", tag: "Premium Electric SUV" },
  { value: "shark6", label: "Shark 6", tag: "Ute" },
  { value: "other", label: "Other / Not Sure", tag: "" },
];

const TIMELINES = [
  { value: "1month", label: "Within 1 month" },
  { value: "1-3months", label: "1–3 months" },
  { value: "3-6months", label: "3–6 months" },
  { value: "browsing", label: "Just browsing" },
];

export default function LeadCapturePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("enquire");
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSection = useCallback(
    (index: number, dir?: "left" | "right") => {
      if (isTransitioning || index === activeSection) return;
      const direction = dir ?? (index > activeSection ? "left" : "right");
      setSlideDir(direction);
      setIsTransitioning(true);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
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

  const handleNavClick = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === "home") router.push("/");
    if (itemId === "car") router.push("/car-details");
  };

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validatePersonal = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8)
      e.phone = "Valid phone required";
    if (!form.postcode.trim() || !/^\d{4}$/.test(form.postcode))
      e.postcode = "4-digit postcode required";
    return e;
  };

  const validateVehicle = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.model) e.model = "Please select a model";
    if (!form.timeline) e.timeline = "Please select a timeline";
    return e;
  };

  const handlePersonalNext = () => {
    const e = validatePersonal();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    nextSection();
  };

  const handleVehicleNext = () => {
    const e = validateVehicle();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    nextSection();
  };

  const handleSubmit = async () => {
    if (!form.consent) {
      setErrors({ consent: "Please accept to continue" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const modelLabel =
      BYD_MODELS.find((m) => m.value === form.model)?.label ?? form.model;
    const timelineLabel =
      TIMELINES.find((t) => t.value === form.timeline)?.label ?? form.timeline;

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      postcode: form.postcode.trim(),
      model: modelLabel,
      timeline: timelineLabel,
      contactPreference:
        form.contactPreference.charAt(0).toUpperCase() +
        form.contactPreference.slice(1),
      notes: form.notes.trim(),
      consent: "on",
    };

    try {
      const res = await fetch("https://byd-backend.omnisuiteai.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Server error (${res.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSection = SECTIONS[activeSection];

  // ── SECTION: LANDING ────────────────────────────────────────────────────
  const renderLanding = () => (
    <div style={{ width: "100%", position: "relative" }}>
      {/* ── HERO IMAGE BLOCK ─────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(240px, 52vw, 420px)",
          overflow: "hidden",
          background: "linear-gradient(135deg,#0D1520,#080A0E)",
        }}
      >
        <Image
          src="/images/atto-3/hero.png"
          alt="BYD Atto 3 – Discover Your Next BYD"
          fill
          style={{ objectFit: "contain", objectPosition: "center 30%" }}
          priority
          unoptimized
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, #080A0E 0%, rgba(8,10,14,0.55) 45%, rgba(8,10,14,0.1) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(8,10,14,0.8) 0%, transparent 60%)",
          }}
        />

        {/* BYD wordmark top-right */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: "0.22em",
            color: "white",
          }}
        >
          BYD
        </div>

        {/* Hero text over image */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 8vw, 52px)",
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              lineHeight: 0.92,
              color: "#E8ECF0",
              marginBottom: 10, // ← was 8
            }}
          >
            Discover Your
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #00A8E8, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Next BYD
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(12px, 2.2vw, 15px)",
              color: "rgba(232,236,240,0.75)",
              lineHeight: 1.55,
              maxWidth: 340,
            }}
          >
            Get Exclusive Pricing &amp; Book a Test Drive Today
          </p>
        </div>
      </div>

      {/* ── TRUST BAR ────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          background: "linear-gradient(90deg, #060810, #0A1020, #060810)",
          borderTop: "1px solid rgba(0,168,232,0.15)",
          borderBottom: "1px solid rgba(0,168,232,0.15)",
          padding: "12px 12px", // ← was 10px
          flexWrap: "wrap",
        }}
      >
        {[
          { Icon: Star, text: "5-Star Safety" },
          { Icon: Zap, text: "Blade Battery Technology" },
          { Icon: ShieldCheck, text: "6-Year Warranty" },
        ].map(({ Icon, text }, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "2px 14px", // ← was 12px
              }}
            >
              <Icon size={13} color="#00A8E8" strokeWidth={2} />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#00A8E8",
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </span>
            </div>
            {i < 2 && (
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(0,168,232,0.25)",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── CONTENT BELOW IMAGE ──────────────────────────────────── */}
      <div className="section-content" style={{ paddingTop: 28 }}>
        {" "}
        {/* ← was 24 */}
        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px,2vw,15px)",
            color: "rgba(232,236,240,0.6)",
            lineHeight: 1.7,
            marginBottom: 24, // ← was 20
            textAlign: "center",
          }}
        >
          Join thousands driving Australia's favourite new energy vehicles.
          Instant access to latest offers on{" "}
          <span style={{ color: "#00A8E8", fontWeight: 600 }}>
            Atto 3, Seal, Sealion, Dolphin &amp; more.
          </span>
        </p>
        <div className="glow-line" style={{ marginBottom: 24 }} />{" "}
        {/* ← was 20 */}
        {/* Available models label */}
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6B7280",
            marginBottom: 10, // ← was 8
          }}
        >
          Available Models
        </p>
        {/* Model pills */}
        <div
          style={{
            display: "flex",
            gap: 8, // ← was 6
            flexWrap: "wrap",
            marginBottom: 28, // ← was 22
          }}
        >
          {[
            "Atto 3",
            "Seal",
            "Dolphin",
            "Sealion 6",
            "Sealion 7",
            "Shark 6",
          ].map((m) => (
            <span
              key={m}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "#A0A8B0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4,
                padding: "5px 12px", // ← was 4px 10px
              }}
            >
              {m}
            </span>
          ))}
        </div>
        <button
          onClick={nextSection}
          style={{
            width: "100%",
            padding: "16px 0", // ← was 15px
            background: "linear-gradient(135deg, #00A8E8, #004E8C)",
            border: "none",
            borderRadius: 6,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,168,232,0.4)",
            transition: "all 0.2s",
            marginBottom: 90,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 6px 32px rgba(0,168,232,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 24px rgba(0,168,232,0.4)";
          }}
        >
          Get My Personalised BYD Offer Now →
        </button>
      </div>
    </div>
  );

  // ── SECTION: PERSONAL DETAILS ───────────────────────────────────────────
  const renderPersonal = () => (
    <div className="section-content" style={{ paddingTop: 32 }}>
      {" "}
      {/* ← was 28 */}
      <div className="section-label text-center mb-2">Step 1 of 3</div>
      <h2
        className="section-title text-center mb-2"
        style={{
          fontSize: "clamp(24px,5vw,40px)",
          color: "#E8ECF0",
          marginBottom: 10,
        }} // ← added marginBottom
      >
        Your Details
      </h2>
      <p
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13,
          color: "#6B7280",
          textAlign: "center",
          marginBottom: 28, // ← was 24
        }}
      >
        We'll use this to send your personalised offer.
      </p>
      <div className="glow-line" style={{ marginBottom: 28 }} />{" "}
      {/* ← was 24 */}
      {/* First + Last name row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14, // ← was 12
          marginBottom: 16, // ← was 12
        }}
      >
        <div>
          <FieldLabel label="First Name" required />
          <Input
            value={form.firstName}
            onChange={(v) => setField("firstName", v)}
            placeholder="Jane"
            error={errors.firstName}
          />
        </div>
        <div>
          <FieldLabel label="Last Name" required />
          <Input
            value={form.lastName}
            onChange={(v) => setField("lastName", v)}
            placeholder="Smith"
            error={errors.lastName}
          />
        </div>
      </div>
      {/* Email */}
      <div style={{ marginBottom: 16 }}>
        {" "}
        {/* ← was 12 */}
        <FieldLabel label="Email Address" required />
        <Input
          value={form.email}
          onChange={(v) => setField("email", v)}
          placeholder="jane@example.com"
          type="email"
          error={errors.email}
        />
      </div>
      {/* Phone */}
      <div style={{ marginBottom: 16 }}>
        {" "}
        {/* ← was 12 */}
        <FieldLabel label="Phone Number" required />
        <Input
          value={form.phone}
          onChange={(v) => setField("phone", v)}
          placeholder="04xx xxx xxx"
          type="tel"
          error={errors.phone}
        />
      </div>
      {/* Postcode */}
      <div style={{ marginBottom: 28 }}>
        {" "}
        {/* ← was 24 */}
        <FieldLabel label="Postcode" required />
        <Input
          value={form.postcode}
          onChange={(v) => setField("postcode", v)}
          placeholder="2000"
          error={errors.postcode}
        />
      </div>
      <button
        onClick={handlePersonalNext}
        style={{
          width: "100%",
          padding: "14px 0", // ← was 13px
          background: "linear-gradient(135deg, #00A8E8, #004E8C)",
          border: "none",
          borderRadius: 6,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,168,232,0.3)",
          marginBottom: 90,
        }}
      >
        Continue →
      </button>
    </div>
  );

  // ── SECTION: VEHICLE PREFERENCES ───────────────────────────────────────
  const renderVehicle = () => (
    <div className="section-content" style={{ paddingTop: 32 }}>
      {" "}
      {/* ← was 28 */}
      <div className="section-label text-center mb-2">Step 2 of 3</div>
      <h2
        className="section-title text-center mb-2"
        style={{
          fontSize: "clamp(24px,5vw,40px)",
          color: "#E8ECF0",
          marginBottom: 10,
        }} // ← added marginBottom
      >
        Your Preferences
      </h2>
      <p
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13,
          color: "#6B7280",
          textAlign: "center",
          marginBottom: 28, // ← was 24
        }}
      >
        Help us match you with the right vehicle.
      </p>
      <div className="glow-line" style={{ marginBottom: 28 }} />{" "}
      {/* ← was 24 */}
      {/* Model selection */}
      <div style={{ marginBottom: 28 }}>
        {" "}
        {/* ← was 20 */}
        <FieldLabel label="Which BYD model interests you most?" required />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10, // ← was 8
            marginTop: 8, // ← added
          }}
        >
          {BYD_MODELS.map((m) => (
            <button
              key={m.value}
              onClick={() => setField("model", m.value)}
              style={{
                padding: "12px 10px", // ← was 10px
                background:
                  form.model === m.value
                    ? "rgba(0,168,232,0.15)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${form.model === m.value ? "rgba(0,168,232,0.5)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 8,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  color: form.model === m.value ? "#00A8E8" : "#E8ECF0",
                  textTransform: "uppercase",
                  marginBottom: m.tag ? 4 : 0,
                }}
              >
                {m.label}
              </div>
              {m.tag && (
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 10,
                    color: "#6B7280",
                  }}
                >
                  {m.tag}
                </div>
              )}
            </button>
          ))}
        </div>
        {errors.model && <ErrorText text={errors.model} />}
      </div>
      {/* Timeline */}
      <div style={{ marginBottom: 28 }}>
        {" "}
        {/* ← was 20 */}
        <FieldLabel label="When are you looking to buy?" required />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 8,
          }}
        >
          {" "}
          {/* ← gap was 8, added marginTop */}
          {TIMELINES.map((t) => (
            <button
              key={t.value}
              onClick={() => setField("timeline", t.value)}
              style={{
                padding: "13px 16px", // ← was 11px
                background:
                  form.timeline === t.value
                    ? "rgba(0,168,232,0.12)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${form.timeline === t.value ? "rgba(0,168,232,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `2px solid ${form.timeline === t.value ? "#00A8E8" : "rgba(255,255,255,0.2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {form.timeline === t.value && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00A8E8",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  color: form.timeline === t.value ? "#E8ECF0" : "#A0A8B0",
                  fontWeight: form.timeline === t.value ? 600 : 400,
                }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
        {errors.timeline && <ErrorText text={errors.timeline} />}
      </div>
      {/* Contact preference */}
      <div style={{ marginBottom: 28 }}>
        {" "}
        {/* ← was 24 */}
        <FieldLabel label="Preferred Contact" />
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {" "}
          {/* ← gap was 10, added marginTop */}
          {(["phone", "email"] as const).map((pref) => (
            <button
              key={pref}
              onClick={() => setField("contactPreference", pref)}
              style={{
                flex: 1,
                padding: "12px", // ← was 10px
                background:
                  form.contactPreference === pref
                    ? "rgba(0,168,232,0.12)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${form.contactPreference === pref ? "rgba(0,168,232,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: form.contactPreference === pref ? "#00A8E8" : "#6B7280",
                transition: "all 0.2s",
              }}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleVehicleNext}
        style={{
          width: "100%",
          padding: "14px 0", // ← was 13px
          background: "linear-gradient(135deg, #00A8E8, #004E8C)",
          border: "none",
          borderRadius: 6,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,168,232,0.3)",
          marginBottom: 90,
        }}
      >
        Continue →
      </button>
    </div>
  );

  // ── SECTION: CONFIRM ────────────────────────────────────────────────────
  const renderConfirm = () => {
    const modelLabel =
      BYD_MODELS.find((m) => m.value === form.model)?.label ?? form.model;
    const timelineLabel =
      TIMELINES.find((t) => t.value === form.timeline)?.label ?? form.timeline;

    if (submitted) {
      return (
        <div
          className="section-content"
          style={{ paddingTop: 48, textAlign: "center" }} // ← was 40
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(0,168,232,0.1)",
              border: "1px solid rgba(0,168,232,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px", // ← was 24px
              boxShadow: "0 0 32px rgba(0,168,232,0.2)",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00A8E8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px,5vw,40px)",
              textTransform: "uppercase",
              color: "#E8ECF0",
              marginBottom: 14, // ← was 12
              letterSpacing: "0.02em",
            }}
          >
            You're All Set!
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 1.7,
              marginBottom: 36, // ← was 32
              maxWidth: 340,
              margin: "0 auto 36px",
            }}
          >
            Thanks,{" "}
            <strong style={{ color: "#E8ECF0" }}>{form.firstName}</strong>. Our
            BYD team will be in touch shortly with your personalised offer for
            the <strong style={{ color: "#00A8E8" }}>{modelLabel}</strong>.
          </p>
          <div className="glow-line" style={{ marginBottom: 32 }} />{" "}
          {/* ← was 28 */}
          <button
            onClick={() => router.push("/car-details")}
            style={{
              padding: "14px 36px", // ← was 13px 32px
              background: "transparent",
              border: "1px solid rgba(0,168,232,0.4)",
              borderRadius: 6,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#00A8E8",
              cursor: "pointer",
            }}
          >
            Explore Vehicles →
          </button>
        </div>
      );
    }

    return (
      <div className="section-content" style={{ paddingTop: 32 }}>
        {" "}
        {/* ← was 28 */}
        <div className="section-label text-center mb-2">Step 3 of 3</div>
        <h2
          className="section-title text-center mb-2"
          style={{
            fontSize: "clamp(24px,5vw,40px)",
            color: "#E8ECF0",
            marginBottom: 10,
          }} // ← added marginBottom
        >
          Review &amp; Submit
        </h2>
        <div className="glow-line" style={{ marginBottom: 24 }} />{" "}
        {/* ← was 20 */}
        {/* Summary card */}
        <div
          style={{
            background: "linear-gradient(135deg, #0D1117, #111620)",
            border: "1px solid rgba(0,168,232,0.12)",
            borderRadius: 12,
            padding: "20px 18px", // ← was 18px 16px
            marginBottom: 24, // ← was 20
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: 16, // ← was 14
            }}
          >
            Enquiry Summary
          </p>

          {[
            { label: "Name", value: `${form.firstName} ${form.lastName}` },
            { label: "Email", value: form.email },
            { label: "Phone", value: form.phone },
            { label: "Postcode", value: form.postcode },
            { label: "Model", value: modelLabel },
            { label: "Timeline", value: timelineLabel },
            { label: "Contact via", value: form.contactPreference },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 10, // ← was 8
                marginBottom: 10, // ← was 8
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 11,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  color: "#E8ECF0",
                  fontWeight: 500,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        {/* Notes */}
        <div style={{ marginBottom: 24 }}>
          {" "}
          {/* ← was 20 */}
          <FieldLabel label="Additional notes (optional)" />
          <textarea
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Any specific requirements or questions..."
            rows={3}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "13px 14px", // ← was 12px
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13,
              color: "#E8ECF0",
              resize: "none",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
              marginTop: 8, // ← added
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,168,232,0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          />
        </div>
        {/* Consent */}
        <div
          onClick={() => setField("consent", !form.consent)}
          style={{
            display: "flex",
            gap: 14, // ← was 12
            alignItems: "flex-start",
            padding: "16px 16px", // ← was 14px
            background: form.consent
              ? "rgba(0,168,232,0.06)"
              : "rgba(255,255,255,0.02)",
            border: `1px solid ${form.consent ? "rgba(0,168,232,0.25)" : "rgba(255,255,255,0.06)"}`,
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: 6, // ← was 4
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: `2px solid ${form.consent ? "#00A8E8" : "rgba(255,255,255,0.2)"}`,
              background: form.consent ? "#00A8E8" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
              transition: "all 0.2s",
            }}
          >
            {form.consent && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: "#6B7280",
              lineHeight: 1.6,
            }}
          >
            I agree to receive communications from BYD and authorised dealers
            about new vehicles, offers and test drives.{" "}
            <span style={{ color: "#00A8E8" }}>Privacy Policy</span>
          </p>
        </div>
        {errors.consent && <ErrorText text={errors.consent} />}
        {/* API error banner */}
        {submitError && (
          <div
            style={{
              marginTop: 18, // ← was 16
              padding: "14px 16px", // ← was 12px 14px
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 12,
                color: "#ef4444",
                lineHeight: 1.5,
              }}
            >
              {submitError}
            </p>
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            marginTop: 20, // ← was 16
            padding: "15px 0", // ← was 14px
            background: isSubmitting
              ? "rgba(0,168,232,0.35)"
              : "linear-gradient(135deg, #00A8E8, #004E8C)",
            border: "none",
            borderRadius: 6,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fff",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            boxShadow: isSubmitting
              ? "none"
              : "0 4px 20px rgba(0,168,232,0.35)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                  flexShrink: 0,
                }}
              />
              Submitting...
            </>
          ) : (
            "Get My Personalised BYD Offer"
          )}
        </button>
        {/* Security note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8, // ← was 6
            marginTop: 16, // ← was 12
            marginBottom: 90,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Your information is secure and only used to contact you about BYD
            vehicles.
          </span>
        </div>
      </div>
    );
  };

  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    landing: renderLanding,
    personal: renderPersonal,
    vehicle: renderVehicle,
    confirm: renderConfirm,
  };

  return (
    <div
      style={{
        height: "100dvh",
        background: "#080A0E",
        color: "#E8ECF0",
        fontFamily: "'Rajdhani', 'Barlow', sans-serif",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "pan-y",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap");
        * {
          box-sizing: border-box;
        }
        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, #00a8e8, transparent);
          opacity: 0.5;
        }
        .section-label {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #00a8e8;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .section-title {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
        }
        .section-content {
          padding: 20px 20px 24px;
          max-width: 560px;
          margin: 0 auto;
          width: 100%;
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
        textarea::placeholder,
        input::placeholder {
          color: #3d4450;
        }
        input,
        textarea {
          color-scheme: dark;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Main scrollable content */}
      <div
        className={`absolute inset-0 overflow-y-auto ${
          isTransitioning
            ? slideDir === "left"
              ? "slide-out-left"
              : "slide-out-right"
            : slideDir === "left"
              ? "slide-in-left"
              : "slide-in-right"
        }`}
        style={{ paddingBottom: 104 }}
      >
        {sectionRenderers[currentSection.id]()}
      </div>

      {/* Dot nav — hidden on landing */}
      {activeSection > 0 && !submitted && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => i < activeSection && goToSection(i)}
              style={{
                width: i === activeSection ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === activeSection
                    ? "#00A8E8"
                    : i < activeSection
                      ? "rgba(0,168,232,0.35)"
                      : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: i < activeSection ? "pointer" : "default",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom nav bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          background: "linear-gradient(0deg,#080A0E 70%,transparent)",
          paddingTop: 20,
        }}
      >
        {!submitted && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "0 12px",
              marginBottom: 10, // ← was 8
            }}
          >
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

            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#00A8E8",
                whiteSpace: "nowrap",
              }}
            >
              {activeSection + 1} / {SECTIONS.length} · {currentSection.label}
            </span>

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

// ── SHARED MICRO-COMPONENTS ────────────────────────────────────────────────

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <p
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#6B7280",
        marginBottom: 8, // ← was 6
      }}
    >
      {label}
      {required && <span style={{ color: "#00A8E8", marginLeft: 2 }}>*</span>}
    </p>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 8,
          padding: "12px 14px", // ← was 11px
          fontFamily: "'Barlow', sans-serif",
          fontSize: 14,
          color: "#E8ECF0",
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error
            ? "rgba(239,68,68,0.5)"
            : "rgba(0,168,232,0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? "rgba(239,68,68,0.5)"
            : "rgba(255,255,255,0.08)";
        }}
      />
      {error && <ErrorText text={error} />}
    </>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: 11,
        color: "#ef4444",
        marginTop: 5, // ← was 4
      }}
    >
      {text}
    </p>
  );
}

// // "use client";

// // import { useState, useRef, useEffect, useCallback } from "react";

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // interface Message {
// //   id: string;
// //   role: "user" | "assistant";
// //   content: string;
// //   timestamp: Date;
// // }

// // interface ConversationHistoryItem {
// //   role: "user" | "assistant";
// //   content: string;
// // }

// // interface ShareModalProps {
// //   onClose: () => void;
// //   conversationSummary: string;
// // }

// // // ─── Suggested Questions ─────────────────────────────────────────────────────
// // const SUGGESTED_QUESTIONS = [
// //   "Which BYD model suits a family of 4?",
// //   "What's the range on the BYD Seal?",
// //   "Tell me about BYD Blade Battery",
// //   "Compare Atto 3 vs Sealion 7",
// //   "How fast does the Shark 6 charge?",
// //   "What's the cheapest BYD available?",
// // ];

// // // ─── Buyer Journey Prompts ────────────────────────────────────────────────────
// // const JOURNEY_STAGES = [
// //   { label: "Discover", prompt: "Help me find the right BYD for my lifestyle" },
// //   { label: "Explore", prompt: "Tell me about BYD model ranges and pricing" },
// //   { label: "Compare", prompt: "What are the differences between BYD models?" },
// //   { label: "Configure", prompt: "Help me configure and personalise a BYD" },
// // ];

// // // ─── Share Modal ──────────────────────────────────────────────────────────────
// // function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [sent, setSent] = useState(false);
// //   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

// //   const handleSend = () => {
// //     setSent(true);
// //     setTimeout(() => {
// //       setSent(false);
// //       onClose();
// //     }, 2000);
// //   };

// //   const qrUrl = `https://bydfairfield.com.au?ref=kiosk`;

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         zIndex: 1000,
// //         background: "rgba(0,0,0,0.75)",
// //         display: "flex",
// //         alignItems: "flex-end",
// //         backdropFilter: "blur(4px)",
// //       }}
// //       onClick={onClose}
// //     >
// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{
// //           width: "100%",
// //           background: "#0D1117",
// //           border: "1px solid rgba(0,168,232,0.2)",
// //           borderRadius: "16px 16px 0 0",
// //           padding: "24px 20px 40px",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //         }}
// //       >
// //         {/* Handle */}
// //         <div
// //           style={{
// //             width: 36,
// //             height: 4,
// //             background: "rgba(255,255,255,0.15)",
// //             borderRadius: 2,
// //             margin: "0 auto 20px",
// //           }}
// //         />

// //         <h3
// //           style={{
// //             fontFamily: "'Barlow Condensed', sans-serif",
// //             fontWeight: 800,
// //             fontSize: 20,
// //             letterSpacing: "0.05em",
// //             textTransform: "uppercase",
// //             color: "#E8ECF0",
// //             marginBottom: 6,
// //           }}
// //         >
// //           Continue Your Journey
// //         </h3>
// //         <p
// //           style={{
// //             fontFamily: "'Barlow', sans-serif",
// //             fontSize: 13,
// //             color: "#6B7280",
// //             marginBottom: 20,
// //           }}
// //         >
// //           Send this conversation to your device to continue exploring later.
// //         </p>

// //         {/* Tabs */}
// //         <div
// //           style={{
// //             display: "flex",
// //             gap: 4,
// //             marginBottom: 20,
// //             background: "rgba(255,255,255,0.04)",
// //             borderRadius: 6,
// //             padding: 4,
// //           }}
// //         >
// //           {(["email", "sms", "qr"] as const).map((tab) => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               style={{
// //                 flex: 1,
// //                 padding: "7px 0",
// //                 fontFamily: "'Barlow Condensed', sans-serif",
// //                 fontWeight: 700,
// //                 fontSize: 11,
// //                 letterSpacing: "0.15em",
// //                 textTransform: "uppercase",
// //                 border: "none",
// //                 borderRadius: 4,
// //                 cursor: "pointer",
// //                 transition: "all 0.2s",
// //                 background: activeTab === tab ? "#00A8E8" : "transparent",
// //                 color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
// //               }}
// //             >
// //               {tab === "qr" ? "QR Code" : tab.toUpperCase()}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Tab Content */}
// //         {activeTab === "email" && (
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             <input
// //               type="email"
// //               placeholder="Enter your email address"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               style={{
// //                 background: "rgba(255,255,255,0.05)",
// //                 border: "1px solid rgba(0,168,232,0.2)",
// //                 borderRadius: 6,
// //                 padding: "12px 14px",
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 14,
// //                 color: "#E8ECF0",
// //                 outline: "none",
// //                 width: "100%",
// //               }}
// //             />
// //             <button
// //               onClick={handleSend}
// //               disabled={!email || sent}
// //               style={{
// //                 background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
// //                 color: "#fff",
// //                 border: "none",
// //                 borderRadius: 6,
// //                 padding: "13px 0",
// //                 fontFamily: "'Barlow Condensed', sans-serif",
// //                 fontWeight: 700,
// //                 fontSize: 13,
// //                 letterSpacing: "0.15em",
// //                 textTransform: "uppercase",
// //                 cursor: email && !sent ? "pointer" : "default",
// //                 transition: "all 0.2s",
// //               }}
// //             >
// //               {sent ? "✓ Sent!" : "Send to Email"}
// //             </button>
// //           </div>
// //         )}

// //         {activeTab === "sms" && (
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             <input
// //               type="tel"
// //               placeholder="Enter your phone number"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               style={{
// //                 background: "rgba(255,255,255,0.05)",
// //                 border: "1px solid rgba(0,168,232,0.2)",
// //                 borderRadius: 6,
// //                 padding: "12px 14px",
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 14,
// //                 color: "#E8ECF0",
// //                 outline: "none",
// //                 width: "100%",
// //               }}
// //             />
// //             <button
// //               onClick={handleSend}
// //               disabled={!phone || sent}
// //               style={{
// //                 background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
// //                 color: "#fff",
// //                 border: "none",
// //                 borderRadius: 6,
// //                 padding: "13px 0",
// //                 fontFamily: "'Barlow Condensed', sans-serif",
// //                 fontWeight: 700,
// //                 fontSize: 13,
// //                 letterSpacing: "0.15em",
// //                 textTransform: "uppercase",
// //                 cursor: phone && !sent ? "pointer" : "default",
// //                 transition: "all 0.2s",
// //               }}
// //             >
// //               {sent ? "✓ Sent!" : "Send via SMS"}
// //             </button>
// //           </div>
// //         )}

// //         {activeTab === "qr" && (
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //               gap: 12,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "#fff",
// //                 borderRadius: 8,
// //                 padding: 12,
// //                 display: "inline-block",
// //               }}
// //             >
// //               {/* QR placeholder — replace with an actual QR library if needed */}
// //               <svg
// //                 width={120}
// //                 height={120}
// //                 viewBox="0 0 120 120"
// //                 style={{ display: "block" }}
// //               >
// //                 {/* Simple QR code placeholder pattern */}
// //                 <rect width="120" height="120" fill="white" />
// //                 {[
// //                   [0, 0],
// //                   [0, 90],
// //                   [90, 0],
// //                 ].map(([x, y], i) => (
// //                   <g key={i}>
// //                     <rect
// //                       x={x + 5}
// //                       y={y + 5}
// //                       width={25}
// //                       height={25}
// //                       fill="black"
// //                       rx={2}
// //                     />
// //                     <rect
// //                       x={x + 8}
// //                       y={y + 8}
// //                       width={19}
// //                       height={19}
// //                       fill="white"
// //                       rx={1}
// //                     />
// //                     <rect
// //                       x={x + 11}
// //                       y={y + 11}
// //                       width={13}
// //                       height={13}
// //                       fill="black"
// //                       rx={1}
// //                     />
// //                   </g>
// //                 ))}
// //                 {/* Data dots */}
// //                 {Array.from({ length: 36 }).map((_, i) => {
// //                   const col = i % 6;
// //                   const row = Math.floor(i / 6);
// //                   if (
// //                     (col < 3 && row < 3) ||
// //                     (col < 3 && row > 2) ||
// //                     (col > 2 && row < 3)
// //                   )
// //                     return null;
// //                   const visible = (i * 7 + 3) % 5 > 1;
// //                   return visible ? (
// //                     <rect
// //                       key={i}
// //                       x={35 + col * 8 + (col > 3 ? 10 : 0)}
// //                       y={35 + row * 8 + (row > 3 ? 10 : 0)}
// //                       width={5}
// //                       height={5}
// //                       fill="black"
// //                       rx={0.5}
// //                     />
// //                   ) : null;
// //                 })}
// //                 <text
// //                   x={60}
// //                   y={110}
// //                   textAnchor="middle"
// //                   fontSize={7}
// //                   fill="#555"
// //                 >
// //                   bydfairfield.com.au
// //                 </text>
// //               </svg>
// //             </div>
// //             <p
// //               style={{
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 12,
// //                 color: "#6B7280",
// //                 textAlign: "center",
// //                 maxWidth: 240,
// //               }}
// //             >
// //               Scan to open BYD Fairfield on your phone and continue your
// //               journey.
// //             </p>
// //           </div>
// //         )}

// //         <div
// //           style={{
// //             marginTop: 16,
// //             padding: "10px 14px",
// //             background: "rgba(0,168,232,0.06)",
// //             border: "1px solid rgba(0,168,232,0.12)",
// //             borderRadius: 6,
// //           }}
// //         >
// //           <p
// //             style={{
// //               fontFamily: "'Barlow', sans-serif",
// //               fontSize: 11,
// //               color: "#6B7280",
// //               margin: 0,
// //               lineHeight: 1.5,
// //             }}
// //           >
// //             📞 Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>
// //             &nbsp;·&nbsp;415 Heidelberg Road, Fairfield VIC 3078
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Message Bubble ───────────────────────────────────────────────────────────
// // function MessageBubble({
// //   message,
// //   isLatest,
// // }: {
// //   message: Message;
// //   isLatest: boolean;
// // }) {
// //   const isUser = message.role === "user";

// //   // Simple markdown-like rendering for bold and line breaks
// //   const renderContent = (text: string) => {
// //     return text.split("\n").map((line, i) => {
// //       const parts = line.split(/\*\*(.*?)\*\*/g);
// //       return (
// //         <span key={i}>
// //           {parts.map((part, j) =>
// //             j % 2 === 1 ? (
// //               <strong key={j} style={{ color: "#E8ECF0", fontWeight: 700 }}>
// //                 {part}
// //               </strong>
// //             ) : (
// //               part
// //             )
// //           )}
// //           {i < text.split("\n").length - 1 && <br />}
// //         </span>
// //       );
// //     });
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: isUser ? "row-reverse" : "row",
// //         alignItems: "flex-start",
// //         gap: 8,
// //         marginBottom: 12,
// //         animation: isLatest ? "fadeSlideIn 0.3s ease forwards" : "none",
// //       }}
// //     >
// //       {/* Avatar */}
// //       {!isUser && (
// //         <div
// //           style={{
// //             width: 28,
// //             height: 28,
// //             borderRadius: "50%",
// //             background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             flexShrink: 0,
// //             marginTop: 2,
// //             fontSize: 12,
// //             fontWeight: 900,
// //             color: "#fff",
// //             fontFamily: "'Barlow Condensed', sans-serif",
// //             letterSpacing: "0.05em",
// //           }}
// //         >
// //           B
// //         </div>
// //       )}

// //       {/* Bubble */}
// //       <div
// //         style={{
// //           maxWidth: "80%",
// //           padding: isUser ? "9px 14px" : "11px 14px",
// //           borderRadius: isUser ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
// //           background: isUser
// //             ? "linear-gradient(135deg, #00A8E8, #0077B6)"
// //             : "rgba(255,255,255,0.05)",
// //           border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
// //           fontFamily: "'Barlow', sans-serif",
// //           fontSize: 13.5,
// //           lineHeight: 1.65,
// //           color: isUser ? "#fff" : "#B0BAC4",
// //           fontWeight: 400,
// //         }}
// //       >
// //         {renderContent(message.content)}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Typing Indicator ─────────────────────────────────────────────────────────
// // function TypingIndicator() {
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         alignItems: "center",
// //         gap: 8,
// //         marginBottom: 12,
// //       }}
// //     >
// //       <div
// //         style={{
// //           width: 28,
// //           height: 28,
// //           borderRadius: "50%",
// //           background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           flexShrink: 0,
// //           fontSize: 12,
// //           fontWeight: 900,
// //           color: "#fff",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //         }}
// //       >
// //         B
// //       </div>
// //       <div
// //         style={{
// //           padding: "11px 14px",
// //           borderRadius: "4px 14px 14px 14px",
// //           background: "rgba(255,255,255,0.05)",
// //           border: "1px solid rgba(255,255,255,0.07)",
// //           display: "flex",
// //           gap: 5,
// //           alignItems: "center",
// //         }}
// //       >
// //         {[0, 1, 2].map((i) => (
// //           <div
// //             key={i}
// //             style={{
// //               width: 6,
// //               height: 6,
// //               borderRadius: "50%",
// //               background: "#00A8E8",
// //               animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
// //             }}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Chatbot Component ───────────────────────────────────────────────────
// // interface BYDChatbotProps {
// //   /** Whether the chatbot panel is open */
// //   isOpen: boolean;
// //   /** Callback to close the chatbot */
// //   onClose: () => void;
// //   /** Optional car context to pre-seed the conversation */
// //   carContext?: string;
// // }

// // export default function BYDChatbot({
// //   isOpen,
// //   onClose,
// //   carContext,
// // }: BYDChatbotProps) {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showShare, setShowShare] = useState(false);
// //   const [conversationHistory, setConversationHistory] = useState<
// //     ConversationHistoryItem[]
// //   >([]);
// //   const [hasStarted, setHasStarted] = useState(false);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const inputRef = useRef<HTMLTextAreaElement>(null);

// //   // Welcome message
// //   useEffect(() => {
// //     if (isOpen && messages.length === 0) {
// //       const welcomeMsg: Message = {
// //         id: "welcome",
// //         role: "assistant",
// //         content: carContext
// //           ? `Hi! I'm your BYD assistant. I see you're looking at the **${carContext}** — great choice! Ask me anything about specs, pricing, features, or how it compares to other models. What would you like to know?`
// //           : "Hi! I'm your BYD assistant 👋\n\nI'm here to help you explore our full range of electric and hybrid vehicles — from performance specs to pricing and everything in between.\n\n**What would you like to know?**",
// //         timestamp: new Date(),
// //       };
// //       setMessages([welcomeMsg]);
// //     }
// //   }, [isOpen]);

// //   // Auto-scroll to bottom
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, isLoading]);

// //   // Focus input when opened
// //   useEffect(() => {
// //     if (isOpen) {
// //       setTimeout(() => inputRef.current?.focus(), 300);
// //     }
// //   }, [isOpen]);

// //   const sendMessage = useCallback(
// //     async (text: string) => {
// //       const trimmed = text.trim();
// //       if (!trimmed || isLoading) return;

// //       setHasStarted(true);
// //       setInput("");

// //       const userMsg: Message = {
// //         id: `user-${Date.now()}`,
// //         role: "user",
// //         content: trimmed,
// //         timestamp: new Date(),
// //       };

// //       setMessages((prev) => [...prev, userMsg]);
// //       setIsLoading(true);

// //       const newHistory: ConversationHistoryItem[] = [
// //         ...conversationHistory,
// //         { role: "user", content: trimmed },
// //       ];

// //       try {
// //         const response = await fetch(
// //           "https://byd-backend.omnisuiteai.com/api/chatbot",
// //           {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               message: trimmed,
// //               conversationHistory: conversationHistory,
// //             }),
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error(`HTTP error: ${response.status}`);
// //         }

// //         const data = await response.json();

// //         if (data.success && data.response) {
// //           const assistantMsg: Message = {
// //             id: `assistant-${Date.now()}`,
// //             role: "assistant",
// //             content: data.response,
// //             timestamp: new Date(),
// //           };
// //           setMessages((prev) => [...prev, assistantMsg]);
// //           setConversationHistory([
// //             ...newHistory,
// //             { role: "assistant", content: data.response },
// //           ]);
// //         } else {
// //           throw new Error(data.error || "Unknown error");
// //         }
// //       } catch (err) {
// //         const errMsg: Message = {
// //           id: `error-${Date.now()}`,
// //           role: "assistant",
// //           content:
// //             "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
// //           timestamp: new Date(),
// //         };
// //         setMessages((prev) => [...prev, errMsg]);
// //       } finally {
// //         setIsLoading(false);
// //         inputRef.current?.focus();
// //       }
// //     },
// //     [isLoading, conversationHistory]
// //   );

// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage(input);
// //     }
// //   };

// //   const handleReset = () => {
// //     setMessages([]);
// //     setConversationHistory([]);
// //     setHasStarted(false);
// //     setInput("");
// //     // Re-trigger welcome message
// //     setTimeout(() => {
// //       const welcomeMsg: Message = {
// //         id: "welcome-reset",
// //         role: "assistant",
// //         content:
// //           "Conversation reset! What would you like to explore about our BYD range?",
// //         timestamp: new Date(),
// //       };
// //       setMessages([welcomeMsg]);
// //     }, 50);
// //   };

// //   const conversationSummary = messages
// //     .slice(0, 6)
// //     .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
// //     .join("\n");

// //   if (!isOpen) return null;

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes fadeSlideIn {
// //           from { opacity: 0; transform: translateY(8px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes typingBounce {
// //           0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
// //           30% { transform: translateY(-5px); opacity: 1; }
// //         }
// //         @keyframes panelSlideUp {
// //           from { transform: translateY(100%); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }
// //         .byd-chat-input:focus {
// //           outline: none;
// //           border-color: rgba(0,168,232,0.5) !important;
// //         }
// //         .byd-chat-input::placeholder {
// //           color: rgba(255,255,255,0.2);
// //         }
// //         .byd-suggestion:hover {
// //           background: rgba(0,168,232,0.12) !important;
// //           border-color: rgba(0,168,232,0.35) !important;
// //           color: #E8ECF0 !important;
// //         }
// //         .byd-journey-btn:hover {
// //           background: rgba(0,168,232,0.15) !important;
// //           border-color: rgba(0,168,232,0.4) !important;
// //         }
// //         .byd-send-btn:not(:disabled):hover {
// //           background: #0077B6 !important;
// //         }
// //         .byd-chat-scroll::-webkit-scrollbar {
// //           width: 3px;
// //         }
// //         .byd-chat-scroll::-webkit-scrollbar-track {
// //           background: transparent;
// //         }
// //         .byd-chat-scroll::-webkit-scrollbar-thumb {
// //           background: rgba(0,168,232,0.2);
// //           border-radius: 2px;
// //         }
// //       `}</style>

// //       {/* Overlay */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           inset: 0,
// //           zIndex: 900,
// //           background: "rgba(0,0,0,0.4)",
// //           backdropFilter: "blur(2px)",
// //         }}
// //         onClick={onClose}
// //       />

// //       {/* Chat Panel */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           zIndex: 950,
// //           height: "90dvh",
// //           maxHeight: 700,
// //           background: "#080A0E",
// //           border: "1px solid rgba(0,168,232,0.15)",
// //           borderRadius: "16px 16px 0 0",
// //           display: "flex",
// //           flexDirection: "column",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //           animation: "panelSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
// //           overflow: "hidden",
// //         }}
// //       >
// //         {/* Header */}
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             padding: "14px 16px",
// //             borderBottom: "1px solid rgba(255,255,255,0.06)",
// //             background: "rgba(13,17,23,0.9)",
// //             backdropFilter: "blur(12px)",
// //             flexShrink: 0,
// //           }}
// //         >
// //           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //             {/* BYD logo badge */}
// //             <div
// //               style={{
// //                 width: 34,
// //                 height: 34,
// //                 borderRadius: "50%",
// //                 background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontWeight: 900,
// //                 fontSize: 14,
// //                 color: "#fff",
// //                 letterSpacing: "0.05em",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               B
// //             </div>
// //             <div>
// //               <div
// //                 style={{
// //                   fontWeight: 800,
// //                   fontSize: 15,
// //                   letterSpacing: "0.08em",
// //                   textTransform: "uppercase",
// //                   color: "#E8ECF0",
// //                   lineHeight: 1.1,
// //                 }}
// //               >
// //                 BYD Assistant
// //               </div>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 5,
// //                   marginTop: 2,
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 6,
// //                     height: 6,
// //                     borderRadius: "50%",
// //                     background: "#22c55e",
// //                     animation: "typingBounce 2s ease-in-out infinite",
// //                   }}
// //                 />
// //                 <span
// //                   style={{
// //                     fontFamily: "'Barlow', sans-serif",
// //                     fontSize: 11,
// //                     color: "#6B7280",
// //                     fontWeight: 400,
// //                   }}
// //                 >
// //                   Online · BYD Fairfield
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ display: "flex", gap: 6 }}>
// //             {/* Share button */}
// //             {hasStarted && (
// //               <button
// //                 onClick={() => setShowShare(true)}
// //                 title="Share this conversation"
// //                 style={{
// //                   background: "rgba(0,168,232,0.1)",
// //                   border: "1px solid rgba(0,168,232,0.25)",
// //                   borderRadius: 6,
// //                   padding: "7px 12px",
// //                   fontFamily: "'Barlow Condensed', sans-serif",
// //                   fontWeight: 700,
// //                   fontSize: 10,
// //                   letterSpacing: "0.15em",
// //                   textTransform: "uppercase",
// //                   color: "#00A8E8",
// //                   cursor: "pointer",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 5,
// //                 }}
// //               >
// //                 <svg
// //                   width="13"
// //                   height="13"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth={2.5}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 >
// //                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
// //                   <polyline points="16 6 12 2 8 6" />
// //                   <line x1="12" y1="2" x2="12" y2="15" />
// //                 </svg>
// //                 Share
// //               </button>
// //             )}

// //             {/* Reset button */}
// //             {hasStarted && (
// //               <button
// //                 onClick={handleReset}
// //                 title="New conversation"
// //                 style={{
// //                   background: "rgba(255,255,255,0.04)",
// //                   border: "1px solid rgba(255,255,255,0.08)",
// //                   borderRadius: 6,
// //                   width: 32,
// //                   height: 32,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   cursor: "pointer",
// //                   color: "#6B7280",
// //                 }}
// //               >
// //                 <svg
// //                   width="14"
// //                   height="14"
// //                   viewBox="0 0 24 24"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth={2.5}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 >
// //                   <polyline points="23 4 23 10 17 10" />
// //                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
// //                 </svg>
// //               </button>
// //             )}

// //             {/* Close button */}
// //             <button
// //               onClick={onClose}
// //               style={{
// //                 background: "rgba(255,255,255,0.04)",
// //                 border: "1px solid rgba(255,255,255,0.08)",
// //                 borderRadius: 6,
// //                 width: 32,
// //                 height: 32,
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: "pointer",
// //                 color: "#6B7280",
// //               }}
// //             >
// //               <svg
// //                 width="14"
// //                 height="14"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth={2.5}
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               >
// //                 <line x1="18" y1="6" x2="6" y2="18" />
// //                 <line x1="6" y1="6" x2="18" y2="18" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Journey Guide Bar — shown before conversation starts */}
// //         {!hasStarted && (
// //           <div
// //             style={{
// //               padding: "10px 14px",
// //               borderBottom: "1px solid rgba(255,255,255,0.05)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 10,
// //                 color: "#6B7280",
// //                 letterSpacing: "0.1em",
// //                 textTransform: "uppercase",
// //                 marginBottom: 7,
// //               }}
// //             >
// //               Where are you in your journey?
// //             </div>
// //             <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
// //               {JOURNEY_STAGES.map((stage) => (
// //                 <button
// //                   key={stage.label}
// //                   className="byd-journey-btn"
// //                   onClick={() => sendMessage(stage.prompt)}
// //                   style={{
// //                     flexShrink: 0,
// //                     padding: "6px 12px",
// //                     background: "transparent",
// //                     border: "1px solid rgba(255,255,255,0.1)",
// //                     borderRadius: 20,
// //                     fontFamily: "'Barlow Condensed', sans-serif",
// //                     fontWeight: 700,
// //                     fontSize: 10,
// //                     letterSpacing: "0.12em",
// //                     textTransform: "uppercase",
// //                     color: "#A0A8B0",
// //                     cursor: "pointer",
// //                     transition: "all 0.2s",
// //                   }}
// //                 >
// //                   {stage.label}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Messages Area */}
// //         <div
// //           className="byd-chat-scroll"
// //           style={{
// //             flex: 1,
// //             overflowY: "auto",
// //             padding: "16px 14px",
// //           }}
// //         >
// //           {messages.map((msg, i) => (
// //             <MessageBubble
// //               key={msg.id}
// //               message={msg}
// //               isLatest={i === messages.length - 1}
// //             />
// //           ))}

// //           {isLoading && <TypingIndicator />}

// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Suggested Questions — shown after welcome, before real conversation */}
// //         {messages.length === 1 && !isLoading && (
// //           <div
// //             style={{
// //               padding: "0 14px 10px",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <div
// //               style={{
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 10,
// //                 color: "#6B7280",
// //                 letterSpacing: "0.1em",
// //                 textTransform: "uppercase",
// //                 marginBottom: 7,
// //               }}
// //             >
// //               Common questions
// //             </div>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexWrap: "wrap",
// //                 gap: 6,
// //               }}
// //             >
// //               {SUGGESTED_QUESTIONS.map((q) => (
// //                 <button
// //                   key={q}
// //                   className="byd-suggestion"
// //                   onClick={() => sendMessage(q)}
// //                   style={{
// //                     padding: "6px 11px",
// //                     background: "rgba(255,255,255,0.03)",
// //                     border: "1px solid rgba(255,255,255,0.08)",
// //                     borderRadius: 20,
// //                     fontFamily: "'Barlow', sans-serif",
// //                     fontSize: 12,
// //                     color: "#7A8490",
// //                     cursor: "pointer",
// //                     transition: "all 0.2s",
// //                     textAlign: "left",
// //                   }}
// //                 >
// //                   {q}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Input Area */}
// //         <div
// //           style={{
// //             padding: "10px 14px 16px",
// //             borderTop: "1px solid rgba(255,255,255,0.05)",
// //             background: "rgba(8,10,14,0.95)",
// //             flexShrink: 0,
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex",
// //               gap: 8,
// //               alignItems: "flex-end",
// //               background: "rgba(255,255,255,0.04)",
// //               border: "1px solid rgba(255,255,255,0.09)",
// //               borderRadius: 10,
// //               padding: "8px 8px 8px 14px",
// //               transition: "border-color 0.2s",
// //             }}
// //           >
// //             <textarea
// //               ref={inputRef}
// //               className="byd-chat-input"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               placeholder="Ask anything about BYD vehicles…"
// //               rows={1}
// //               style={{
// //                 flex: 1,
// //                 background: "transparent",
// //                 border: "none",
// //                 outline: "none",
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 14,
// //                 color: "#E8ECF0",
// //                 resize: "none",
// //                 lineHeight: 1.5,
// //                 maxHeight: 80,
// //                 overflowY: "auto",
// //                 paddingTop: 2,
// //               }}
// //               onInput={(e) => {
// //                 const t = e.target as HTMLTextAreaElement;
// //                 t.style.height = "auto";
// //                 t.style.height = `${Math.min(t.scrollHeight, 80)}px`;
// //               }}
// //             />
// //             <button
// //               className="byd-send-btn"
// //               onClick={() => sendMessage(input)}
// //               disabled={!input.trim() || isLoading}
// //               style={{
// //                 width: 34,
// //                 height: 34,
// //                 borderRadius: 7,
// //                 border: "none",
// //                 background:
// //                   input.trim() && !isLoading
// //                     ? "#00A8E8"
// //                     : "rgba(255,255,255,0.06)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: input.trim() && !isLoading ? "pointer" : "default",
// //                 transition: "all 0.2s",
// //                 flexShrink: 0,
// //               }}
// //             >
// //               <svg
// //                 width="15"
// //                 height="15"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke={input.trim() && !isLoading ? "#fff" : "#3A4050"}
// //                 strokeWidth={2.5}
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //               >
// //                 <line x1="22" y1="2" x2="11" y2="13" />
// //                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
// //               </svg>
// //             </button>
// //           </div>

// //           <div
// //             style={{
// //               textAlign: "center",
// //               marginTop: 7,
// //               fontFamily: "'Barlow', sans-serif",
// //               fontSize: 10,
// //               color: "rgba(255,255,255,0.18)",
// //               letterSpacing: "0.05em",
// //             }}
// //           >
// //             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
// //           </div>
// //         </div>
// //       </div>

// //       {/* Share Modal */}
// //       {showShare && (
// //         <ShareModal
// //           onClose={() => setShowShare(false)}
// //           conversationSummary={conversationSummary}
// //         />
// //       )}
// //     </>
// //   );
// // }

// // // ─── Chatbot Trigger Button ───────────────────────────────────────────────────
// // // Drop this anywhere in your layout to open the chatbot
// // export function BYDChatbotButton({
// //   carContext,
// // }: {
// //   carContext?: string;
// // }) {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <>
// //       <button
// //         onClick={() => setIsOpen(true)}
// //         style={{
// //           position: "fixed",
// //           bottom: 100,
// //           right: 16,
// //           zIndex: 800,
// //           width: 52,
// //           height: 52,
// //           borderRadius: "50%",
// //           background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// //           border: "none",
// //           cursor: "pointer",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           boxShadow: "0 4px 20px rgba(0,168,232,0.35)",
// //           transition: "transform 0.2s, box-shadow 0.2s",
// //         }}
// //         onMouseEnter={(e) => {
// //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
// //           (e.currentTarget as HTMLButtonElement).style.boxShadow =
// //             "0 6px 28px rgba(0,168,232,0.5)";
// //         }}
// //         onMouseLeave={(e) => {
// //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
// //           (e.currentTarget as HTMLButtonElement).style.boxShadow =
// //             "0 4px 20px rgba(0,168,232,0.35)";
// //         }}
// //       >
// //         <svg
// //           width="22"
// //           height="22"
// //           viewBox="0 0 24 24"
// //           fill="none"
// //           stroke="#fff"
// //           strokeWidth={2}
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         >
// //           <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
// //         </svg>
// //       </button>

// //       <BYDChatbot
// //         isOpen={isOpen}
// //         onClose={() => setIsOpen(false)}
// //         carContext={carContext}
// //       />
// //     </>
// //   );
// // }
// // "use client";

// // import { useState, useRef, useEffect, useCallback } from "react";

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // interface Message {
// //   id: string;
// //   role: "user" | "assistant";
// //   content: string;
// //   timestamp: Date;
// // }

// // interface ConversationHistoryItem {
// //   role: "user" | "assistant";
// //   content: string;
// // }

// // interface ShareModalProps {
// //   onClose: () => void;
// //   conversationSummary: string;
// // }

// // // ─── Context-aware suggestion maps ───────────────────────────────────────────
// // const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
// //   specs: [
// //     "What does this acceleration mean in real-world driving?",
// //     "How does the range compare to competitors?",
// //     "What factors affect the WLTP range?",
// //     "Is this range enough for daily commuting?",
// //     "What's the peak charging speed?",
// //   ],
// //   models: [
// //     "What's the key difference between Essential and Premium?",
// //     "Is the Premium worth the extra cost?",
// //     "Which model is better for families?",
// //     "What extras does the top variant include?",
// //     "Can I customise my chosen variant?",
// //   ],
// //   configurator: [
// //     "Which colour is most popular?",
// //     "Does colour choice affect resale value?",
// //     "Are there any metallic paint options?",
// //     "What interior options are available?",
// //     "How long does delivery take after configuring?",
// //   ],
// //   technology: [
// //     "How does Blade Battery compare to standard lithium-ion?",
// //     "What makes this battery safer than competitors?",
// //     "Tell me about the e-Platform 3.0",
// //     "What smart tech features are included?",
// //     "Does it support over-the-air updates?",
// //   ],
// //   safety: [
// //     "What is the safety rating for this car?",
// //     "How does the AEB system work?",
// //     "What driver assistance features are standard?",
// //     "Is this safe for young families?",
// //     "What crash test results does it have?",
// //   ],
// //   default: [
// //     "Which BYD model suits a family of 4?",
// //     "What's the range on this model?",
// //     "Tell me about the Blade Battery",
// //     "How fast does it charge at home?",
// //     "What's the total cost of ownership?",
// //     "How does it compare to a Tesla?",
// //   ],
// // };

// // const JOURNEY_STAGES = [
// //   { label: "Discover", prompt: "What makes this BYD special compared to other EVs?" },
// //   { label: "Compare", prompt: "How does this compare to similar models in the range?" },
// //   { label: "Configure", prompt: "Help me choose the right variant, colour and extras" },
// // //   { label: "Purchase", prompt: "What are my options to finance, order or test drive?" },
// // ];

// // // ─── Share Modal ──────────────────────────────────────────────────────────────
// // function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
// //   const [phone, setPhone] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [sent, setSent] = useState(false);
// //   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

// //   const handleSend = () => {
// //     setSent(true);
// //     setTimeout(() => { setSent(false); onClose(); }, 2000);
// //   };

// //   return (
// //     <div
// //       style={{
// //         position: "fixed",
// //         inset: 0,
// //         zIndex: 1000,
// //         background: "rgba(0,0,0,0.8)",
// //         display: "flex",
// //         alignItems: "flex-end",
// //         backdropFilter: "blur(8px)",
// //       }}
// //       onClick={onClose}
// //     >
// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{
// //           width: "100%",
// //           background: "linear-gradient(180deg, #0F1318 0%, #080A0E 100%)",
// //           border: "1px solid rgba(0,168,232,0.15)",
// //           borderBottom: "none",
// //           borderRadius: "20px 20px 0 0",
// //           padding: "8px 20px 44px",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //         }}
// //       >
// //         <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "12px auto 24px" }} />

// //         <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8ECF0", marginBottom: 4 }}>
// //           Continue Your Journey
// //         </h3>
// //         <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#4B5563", marginBottom: 24, lineHeight: 1.5 }}>
// //           Send this conversation to your device to explore further at home.
// //         </p>

// //         <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
// //           {(["email"] as const).map((tab) => (
// //             <button
// //               key={tab}
// //               onClick={() => setActiveTab(tab)}
// //               style={{
// //                 flex: 1,
// //                 padding: "8px 0",
// //                 fontFamily: "'Barlow Condensed', sans-serif",
// //                 fontWeight: 700,
// //                 fontSize: 11,
// //                 letterSpacing: "0.18em",
// //                 textTransform: "uppercase",
// //                 border: "none",
// //                 borderRadius: 6,
// //                 cursor: "pointer",
// //                 transition: "all 0.2s",
// //                 background: activeTab === tab ? "#00A8E8" : "transparent",
// //                 color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
// //               }}
// //             >
// //               {/* {tab === "qr" ? "QR Code" : tab.toUpperCase()} */}
// //             </button>
// //           ))}
// //         </div>

// //         {activeTab === "email" && (
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             <input
// //               type="email"
// //               placeholder="your@email.com"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
// //             />
// //             <button
// //               onClick={handleSend}
// //               disabled={!email || sent}
// //               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: email && !sent ? "pointer" : "default", transition: "all 0.2s" }}
// //             >
// //               {sent ? "✓  Sent Successfully" : "Send to Email"}
// //             </button>
// //           </div>
// //         )}

// //         {activeTab === "sms" && (
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             <input
// //               type="tel"
// //               placeholder="+61 400 000 000"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
// //             />
// //             <button
// //               onClick={handleSend}
// //               disabled={!phone || sent}
// //               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: phone && !sent ? "pointer" : "default", transition: "all 0.2s" }}
// //             >
// //               {sent ? "✓  Sent Successfully" : "Send via SMS"}
// //             </button>
// //           </div>
// //         )}

// //         {activeTab === "qr" && (
// //           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
// //             <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "inline-block", border: "1px solid rgba(0,0,0,0.05)" }}>
// //               <svg width={120} height={120} viewBox="0 0 120 120" style={{ display: "block" }}>
// //                 <rect width="120" height="120" fill="white" />
// //                 {[[0, 0], [0, 90], [90, 0]].map(([x, y], i) => (
// //                   <g key={i}>
// //                     <rect x={x + 5} y={y + 5} width={25} height={25} fill="black" rx={2} />
// //                     <rect x={x + 8} y={y + 8} width={19} height={19} fill="white" rx={1} />
// //                     <rect x={x + 11} y={y + 11} width={13} height={13} fill="black" rx={1} />
// //                   </g>
// //                 ))}
// //                 {Array.from({ length: 36 }).map((_, i) => {
// //                   const col = i % 6;
// //                   const row = Math.floor(i / 6);
// //                   if ((col < 3 && row < 3) || (col < 3 && row > 2) || (col > 2 && row < 3)) return null;
// //                   const visible = (i * 7 + 3) % 5 > 1;
// //                   return visible ? <rect key={i} x={35 + col * 8 + (col > 3 ? 10 : 0)} y={35 + row * 8 + (row > 3 ? 10 : 0)} width={5} height={5} fill="black" rx={0.5} /> : null;
// //                 })}
// //                 <text x={60} y={112} textAnchor="middle" fontSize={7} fill="#555">bydfairfield.com.au</text>
// //               </svg>
// //             </div>
// //             <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
// //               Scan with your phone to continue exploring on your own device.
// //             </p>
// //           </div>
// //         )}

// //         <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(0,168,232,0.05)", border: "1px solid rgba(0,168,232,0.1)", borderRadius: 8 }}>
// //           <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
// //           <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.5 }}>
// //             Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong> · 415 Heidelberg Road, Fairfield VIC 3078
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Message Bubble ───────────────────────────────────────────────────────────
// // function MessageBubble({ message, isLatest }: { message: Message; isLatest: boolean }) {
// //   const isUser = message.role === "user";

// //   const renderContent = (text: string) => {
// //     return text.split("\n").map((line, i, arr) => {
// //       const parts = line.split(/\*\*(.*?)\*\*/g);
// //       return (
// //         <span key={i}>
// //           {parts.map((part, j) =>
// //             j % 2 === 1 ? (
// //               <strong key={j} style={{ color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0", fontWeight: 700 }}>{part}</strong>
// //             ) : part
// //           )}
// //           {i < arr.length - 1 && <br />}
// //         </span>
// //       );
// //     });
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: isUser ? "row-reverse" : "row",
// //         alignItems: "flex-end",
// //         gap: 10,
// //         marginBottom: 16,
// //         animation: isLatest ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
// //         opacity: isLatest ? 0 : 1,
// //       }}
// //     >
// //       {!isUser && (
// //         <div style={{
// //           width: 30,
// //           height: 30,
// //           borderRadius: "50%",
// //           background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           flexShrink: 0,
// //           fontSize: 11,
// //           fontWeight: 900,
// //           color: "#fff",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //           letterSpacing: "0.08em",
// //           border: "1px solid rgba(0,168,232,0.3)",
// //         }}>
// //           BYD
// //         </div>
// //       )}

// //       <div style={{
// //         maxWidth: "78%",
// //         padding: isUser ? "10px 16px" : "12px 16px",
// //         borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
// //         background: isUser
// //           ? "linear-gradient(135deg, #00A8E8, #0066B3)"
// //           : "rgba(255,255,255,0.04)",
// //         border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
// //         fontFamily: "'Barlow', sans-serif",
// //         fontSize: 13.5,
// //         lineHeight: 1.7,
// //         color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
// //         fontWeight: 400,
// //         boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
// //       }}>
// //         {renderContent(message.content)}
// //       </div>

// //       {isUser && (
// //         <div style={{
// //           width: 28,
// //           height: 28,
// //           borderRadius: "50%",
// //           background: "rgba(255,255,255,0.06)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           flexShrink: 0,
// //           border: "1px solid rgba(255,255,255,0.08)",
// //         }}>
// //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
// //             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
// //             <circle cx="12" cy="7" r="4" />
// //           </svg>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ─── Typing Indicator ─────────────────────────────────────────────────────────
// // function TypingIndicator() {
// //   return (
// //     <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 16 }}>
// //       <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 900, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", border: "1px solid rgba(0,168,232,0.3)" }}>BYD</div>
// //       <div style={{ padding: "12px 18px", borderRadius: "4px 16px 16px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 6, alignItems: "center" }}>
// //         {[0, 1, 2].map((i) => (
// //           <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E8", animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite` }} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Suggestion Pills ─────────────────────────────────────────────────────────
// // function SuggestionPills({ suggestions, onSelect, label }: { suggestions: string[]; onSelect: (s: string) => void; label: string }) {
// //   return (
// //     <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
// //       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
// //         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
// //         <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#374151" }}>{label}</span>
// //         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
// //       </div>
// //       <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
// //         {suggestions.map((s) => (
// //           <button
// //             key={s}
// //             onClick={() => onSelect(s)}
// //             style={{
// //               padding: "7px 13px",
// //               background: "rgba(255,255,255,0.03)",
// //               border: "1px solid rgba(255,255,255,0.07)",
// //               borderRadius: 20,
// //               fontFamily: "'Barlow', sans-serif",
// //               fontSize: 12,
// //               color: "#6B7280",
// //               cursor: "pointer",
// //               transition: "all 0.2s",
// //               textAlign: "left",
// //               lineHeight: 1.3,
// //             }}
// //             onMouseEnter={(e) => {
// //               const el = e.currentTarget as HTMLButtonElement;
// //               el.style.background = "rgba(0,168,232,0.08)";
// //               el.style.borderColor = "rgba(0,168,232,0.3)";
// //               el.style.color = "#E8ECF0";
// //             }}
// //             onMouseLeave={(e) => {
// //               const el = e.currentTarget as HTMLButtonElement;
// //               el.style.background = "rgba(255,255,255,0.03)";
// //               el.style.borderColor = "rgba(255,255,255,0.07)";
// //               el.style.color = "#6B7280";
// //             }}
// //           >
// //             {s}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Chatbot Component ───────────────────────────────────────────────────
// // interface BYDChatbotProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   carContext?: string;
// //   /** Context hint for showing relevant suggestions e.g. "specs" | "models" | "configurator" | "technology" | "safety" */
// //   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// // }

// // export default function BYDChatbot({ isOpen, onClose, carContext, suggestionContext }: BYDChatbotProps) {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [input, setInput] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showShare, setShowShare] = useState(false);
// //   const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>([]);
// //   const [hasStarted, setHasStarted] = useState(false);
// //   const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
// //     CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]
// //   );
// //   const [showSuggestions, setShowSuggestions] = useState(true);

// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const inputRef = useRef<HTMLTextAreaElement>(null);

// //   useEffect(() => {
// //     if (isOpen && messages.length === 0) {
// //       const carName = carContext ?? "BYD vehicle";
// //       const welcomeMsg: Message = {
// //         id: "welcome",
// //         role: "assistant",
// //         content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carName}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
// //         timestamp: new Date(),
// //       };
// //       setMessages([welcomeMsg]);
// //     }
// //   }, [isOpen, carContext]);

// //   useEffect(() => {
// //     // Update suggestions when context changes (e.g. user opened from specs section)
// //     if (suggestionContext) {
// //       setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default);
// //     }
// //   }, [suggestionContext]);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, isLoading]);

// //   useEffect(() => {
// //     if (isOpen) setTimeout(() => inputRef.current?.focus(), 320);
// //   }, [isOpen]);

// //   const sendMessage = useCallback(
// //     async (text: string) => {
// //       const trimmed = text.trim();
// //       if (!trimmed || isLoading) return;

// //       setHasStarted(true);
// //       setShowSuggestions(false);
// //       setInput("");

// //       const userMsg: Message = {
// //         id: `user-${Date.now()}`,
// //         role: "user",
// //         content: trimmed,
// //         timestamp: new Date(),
// //       };

// //       setMessages((prev) => [...prev, userMsg]);
// //       setIsLoading(true);

// //       const newHistory: ConversationHistoryItem[] = [
// //         ...conversationHistory,
// //         { role: "user", content: trimmed },
// //       ];

// //       try {
// //         const response = await fetch("https://byd-backend.omnisuiteai.com/api/chatbot", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             message: trimmed,
// //             conversationHistory,
// //             carContext: carContext ?? null,
// //           }),
// //         });

// //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// //         const data = await response.json();

// //         if (data.success && data.response) {
// //           const assistantMsg: Message = {
// //             id: `assistant-${Date.now()}`,
// //             role: "assistant",
// //             content: data.response,
// //             timestamp: new Date(),
// //           };
// //           setMessages((prev) => [...prev, assistantMsg]);
// //           setConversationHistory([...newHistory, { role: "assistant", content: data.response }]);
// //           // Show follow-up suggestions after first exchange
// //           setShowSuggestions(true);
// //           setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
// //         } else {
// //           throw new Error(data.error || "Unknown error");
// //         }
// //       } catch {
// //         setMessages((prev) => [
// //           ...prev,
// //           {
// //             id: `err-${Date.now()}`,
// //             role: "assistant",
// //             content: "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
// //             timestamp: new Date(),
// //           },
// //         ]);
// //       } finally {
// //         setIsLoading(false);
// //         inputRef.current?.focus();
// //       }
// //     },
// //     [isLoading, conversationHistory, carContext, suggestionContext]
// //   );

// //   const handleReset = () => {
// //     setMessages([]);
// //     setConversationHistory([]);
// //     setHasStarted(false);
// //     setInput("");
// //     setShowSuggestions(true);
// //     setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
// //     setTimeout(() => {
// //       setMessages([{
// //         id: "welcome-reset",
// //         role: "assistant",
// //         content: "Fresh start! What would you like to explore about the " + (carContext ?? "BYD range") + "?",
// //         timestamp: new Date(),
// //       }]);
// //     }, 50);
// //   };

// //   const conversationSummary = messages
// //     .slice(0, 6)
// //     .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
// //     .join("\n");

// //   if (!isOpen) return null;

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes msgIn {
// //           from { opacity: 0; transform: translateY(10px) scale(0.98); }
// //           to { opacity: 1; transform: translateY(0) scale(1); }
// //         }
// //         @keyframes dotBounce {
// //           0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
// //           30% { transform: translateY(-6px); opacity: 1; }
// //         }
// //         @keyframes chatPanelUp {
// //           from { transform: translateY(100%); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }
// //         @keyframes overlayIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         .byd-input:focus { outline: none; }
// //         .byd-input::placeholder { color: rgba(255,255,255,0.18); }
// //         .byd-scroll::-webkit-scrollbar { width: 2px; }
// //         .byd-scroll::-webkit-scrollbar-track { background: transparent; }
// //         .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
// //         .byd-send:not(:disabled):hover { background: #0090CC !important; }
// //         .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
// //       `}</style>

// //       {/* Backdrop */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           inset: 0,
// //           zIndex: 900,
// //           background: "rgba(0,0,0,0.6)",
// //           backdropFilter: "blur(6px)",
// //           animation: "overlayIn 0.25s ease forwards",
// //         }}
// //         onClick={onClose}
// //       />

// //       {/* Chat Panel */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           zIndex: 950,
// //           height: "91dvh",
// //           maxHeight: 720,
// //           background: "#080A0E",
// //           borderTop: "1px solid rgba(0,168,232,0.12)",
// //           borderLeft: "1px solid rgba(0,168,232,0.06)",
// //           borderRight: "1px solid rgba(0,168,232,0.06)",
// //           borderRadius: "20px 20px 0 0",
// //           display: "flex",
// //           flexDirection: "column",
// //           fontFamily: "'Barlow Condensed', sans-serif",
// //           animation: "chatPanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
// //           overflow: "hidden",
// //         }}
// //       >
// //         {/* Ambient top glow line */}
// //         <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)", flexShrink: 0 }} />

// //         {/* Header */}
// //         <div style={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //           padding: "14px 16px",
// //           borderBottom: "1px solid rgba(255,255,255,0.05)",
// //           background: "rgba(8,10,14,0.9)",
// //           backdropFilter: "blur(20px)",
// //           flexShrink: 0,
// //         }}>
// //           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //             {/* BYD emblem */}
// //             <div style={{
// //               width: 38,
// //               height: 38,
// //               borderRadius: 10,
// //               background: "linear-gradient(145deg, #00A8E8, #004E8C)",
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               flexShrink: 0,
// //               border: "1px solid rgba(0,168,232,0.4)",
// //               boxShadow: "0 0 16px rgba(0,168,232,0.12)",
// //             }}>
// //               <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
// //                 <text x="4" y="25" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fontSize="26" fill="white" letterSpacing="-1">BYD</text>
// //               </svg>
// //             </div>
// //             <div>
// //               <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8ECF0", lineHeight: 1.1 }}>
// //                 BYD Assistant
// //               </div>
// //               <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
// //                 <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
// //                 <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#4B5563", fontWeight: 400 }}>
// //                   Online · BYD Fairfield
// //                   {carContext && (
// //                     <span style={{ color: "#00A8E8", marginLeft: 4 }}>· {carContext}</span>
// //                   )}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
// //             {hasStarted && (
// //               <button
// //                 onClick={() => setShowShare(true)}
// //                 className="byd-icon-btn"
// //                 style={{
// //                   background: "rgba(0,168,232,0.08)",
// //                   border: "1px solid rgba(0,168,232,0.2)",
// //                   borderRadius: 8,
// //                   padding: "6px 12px",
// //                   fontFamily: "'Barlow Condensed', sans-serif",
// //                   fontWeight: 700,
// //                   fontSize: 10,
// //                   letterSpacing: "0.18em",
// //                   textTransform: "uppercase",
// //                   color: "#00A8E8",
// //                   cursor: "pointer",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 6,
// //                   transition: "all 0.2s",
// //                 }}
// //               >
// //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
// //                   <polyline points="16 6 12 2 8 6" />
// //                   <line x1="12" y1="2" x2="12" y2="15" />
// //                 </svg>
// //                 Share
// //               </button>
// //             )}
// //             {hasStarted && (
// //               <button
// //                 onClick={handleReset}
// //                 className="byd-icon-btn"
// //                 title="New conversation"
// //                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
// //               >
// //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// //                   <polyline points="23 4 23 10 17 10" />
// //                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
// //                 </svg>
// //               </button>
// //             )}
// //             <button
// //               onClick={onClose}
// //               className="byd-icon-btn"
// //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
// //             >
// //               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// //                 <line x1="18" y1="6" x2="6" y2="18" />
// //                 <line x1="6" y1="6" x2="18" y2="18" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Journey Guide — pre-conversation */}
// //         {!hasStarted && (
// //           <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
// //             <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "#374151", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
// //               Where are you in your journey?
// //             </div>
// //             <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2 }}>
// //               {JOURNEY_STAGES.map((stage) => (
// //                 <button
// //                   key={stage.label}
// //                   onClick={() => sendMessage(stage.prompt)}
// //                   style={{
// //                     flexShrink: 0,
// //                     padding: "7px 14px",
// //                     background: "transparent",
// //                     border: "1px solid rgba(255,255,255,0.09)",
// //                     borderRadius: 20,
// //                     fontFamily: "'Barlow Condensed', sans-serif",
// //                     fontWeight: 700,
// //                     fontSize: 10,
// //                     letterSpacing: "0.15em",
// //                     textTransform: "uppercase",
// //                     color: "#6B7280",
// //                     cursor: "pointer",
// //                     transition: "all 0.2s",
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     const el = e.currentTarget as HTMLButtonElement;
// //                     el.style.borderColor = "rgba(0,168,232,0.4)";
// //                     el.style.color = "#00A8E8";
// //                     el.style.background = "rgba(0,168,232,0.07)";
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     const el = e.currentTarget as HTMLButtonElement;
// //                     el.style.borderColor = "rgba(255,255,255,0.09)";
// //                     el.style.color = "#6B7280";
// //                     el.style.background = "transparent";
// //                   }}
// //                 >
// //                   {stage.label}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Messages */}
// //         <div
// //           className="byd-scroll"
// //           style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}
// //         >
// //           {messages.map((msg, i) => (
// //             <MessageBubble key={msg.id} message={msg} isLatest={i === messages.length - 1} />
// //           ))}
// //           {isLoading && <TypingIndicator />}
// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Contextual Suggestions */}
// //         {showSuggestions && !isLoading && messages.length > 0 && (
// //           <SuggestionPills
// //             label={hasStarted ? "Follow-up questions" : "Common questions"}
// //             suggestions={currentSuggestions}
// //             onSelect={sendMessage}
// //           />
// //         )}

// //         {/* Input */}
// //         <div style={{
// //           padding: "10px 14px 18px",
// //           borderTop: "1px solid rgba(255,255,255,0.05)",
// //           background: "rgba(8,10,14,0.98)",
// //           flexShrink: 0,
// //         }}>
// //           <div style={{
// //             display: "flex",
// //             gap: 10,
// //             alignItems: "flex-end",
// //             background: "rgba(255,255,255,0.04)",
// //             border: "1px solid rgba(255,255,255,0.08)",
// //             borderRadius: 12,
// //             padding: "10px 10px 10px 16px",
// //             transition: "border-color 0.2s",
// //           }}
// //             onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,168,232,0.4)"; }}
// //             onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
// //           >
// //             <textarea
// //               ref={inputRef}
// //               className="byd-input"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => {
// //                 if (e.key === "Enter" && !e.shiftKey) {
// //                   e.preventDefault();
// //                   sendMessage(input);
// //                 }
// //               }}
// //               placeholder={carContext ? `Ask about the ${carContext}…` : "Ask anything about BYD vehicles…"}
// //               rows={1}
// //               style={{
// //                 flex: 1,
// //                 background: "transparent",
// //                 border: "none",
// //                 outline: "none",
// //                 fontFamily: "'Barlow', sans-serif",
// //                 fontSize: 14,
// //                 color: "#E8ECF0",
// //                 resize: "none",
// //                 lineHeight: 1.55,
// //                 maxHeight: 84,
// //                 overflowY: "auto",
// //                 paddingTop: 1,
// //               }}
// //               onInput={(e) => {
// //                 const t = e.target as HTMLTextAreaElement;
// //                 t.style.height = "auto";
// //                 t.style.height = `${Math.min(t.scrollHeight, 84)}px`;
// //               }}
// //             />
// //             <button
// //               className="byd-send"
// //               onClick={() => sendMessage(input)}
// //               disabled={!input.trim() || isLoading}
// //               style={{
// //                 width: 36,
// //                 height: 36,
// //                 borderRadius: 9,
// //                 border: "none",
// //                 background: input.trim() && !isLoading ? "#00A8E8" : "rgba(255,255,255,0.06)",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: input.trim() && !isLoading ? "pointer" : "default",
// //                 transition: "all 0.2s",
// //                 flexShrink: 0,
// //                 boxShadow: input.trim() && !isLoading ? "0 4px 14px rgba(0,168,232,0.3)" : "none",
// //               }}
// //             >
// //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isLoading ? "#fff" : "#374151"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// //                 <line x1="22" y1="2" x2="11" y2="13" />
// //                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
// //               </svg>
// //             </button>
// //           </div>

// //           <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.14)", letterSpacing: "0.06em" }}>
// //             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
// //           </div>
// //         </div>
// //       </div>

// //       {showShare && <ShareModal onClose={() => setShowShare(false)} conversationSummary={conversationSummary} />}
// //     </>
// //   );
// // }

// // // ─── Floating Trigger Button ──────────────────────────────────────────────────
// // export function BYDChatbotButton({ carContext, suggestionContext }: {
// //   carContext?: string;
// //   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// // }) {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [pulse, setPulse] = useState(true);

// //   useEffect(() => {
// //     const t = setTimeout(() => setPulse(false), 3000);
// //     return () => clearTimeout(t);
// //   }, []);

// //   return (
// //     <>
// //       <style>{`
// //         @keyframes ringPulse {
// //           0% { transform: scale(1); opacity: 0.5; }
// //           70% { transform: scale(1.6); opacity: 0; }
// //           100% { transform: scale(1.6); opacity: 0; }
// //         }
// //         .byd-fab-ring {
// //           position: absolute;
// //           inset: -2px;
// //           border-radius: 50%;
// //           border: 2px solid rgba(0,168,232,0.5);
// //           animation: ringPulse 2s ease-out 0.5s 2 forwards;
// //           pointer-events: none;
// //         }
// //       `}</style>
// //       <button
// //         onClick={() => setIsOpen(true)}
// //         style={{
// //           position: "fixed",
// //           bottom: 100,
// //           right: 16,
// //           zIndex: 800,
// //           width: 52,
// //           height: 52,
// //           borderRadius: "50%",
// //           background: "linear-gradient(145deg, #00A8E8, #004E8C)",
// //           border: "1px solid rgba(0,168,232,0.5)",
// //           cursor: "pointer",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           boxShadow: "0 4px 20px rgba(0,168,232,0.35), 0 0 0 0 rgba(0,168,232,0)",
// //           transition: "transform 0.2s, box-shadow 0.2s",
// //         }}
// //         onMouseEnter={(e) => {
// //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
// //           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,168,232,0.5)";
// //         }}
// //         onMouseLeave={(e) => {
// //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
// //           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,168,232,0.35)";
// //         }}
// //         title="Ask BYD Assistant"
// //       >
// //         {pulse && <div className="byd-fab-ring" />}
// //         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
// //           <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
// //         </svg>
// //       </button>

// //       <BYDChatbot
// //         isOpen={isOpen}
// //         onClose={() => setIsOpen(false)}
// //         carContext={carContext}
// //         suggestionContext={suggestionContext}
// //       />
// //     </>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// interface ConversationHistoryItem {
//   role: "user" | "assistant";
//   content: string;
// }

// interface ShareModalProps {
//   onClose: () => void;
//   conversationSummary: string;
// }

// // ─── Context-aware suggestion maps ───────────────────────────────────────────
// const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
//   specs: [
//     "What does this acceleration mean in real-world driving?",
//     "How does the range compare to competitors?",
//     "What factors affect the WLTP range?",
//     "Is this range enough for daily commuting?",
//     "What's the peak charging speed?",
//   ],
//   models: [
//     "What's the key difference between Essential and Premium?",
//     "Is the Premium worth the extra cost?",
//     "Which model is better for families?",
//     "What extras does the top variant include?",
//     "Can I customise my chosen variant?",
//   ],
//   configurator: [
//     "Which colour is most popular?",
//     "Does colour choice affect resale value?",
//     "Are there any metallic paint options?",
//     "What interior options are available?",
//     "How long does delivery take after configuring?",
//   ],
//   technology: [
//     "How does Blade Battery compare to standard lithium-ion?",
//     "What makes this battery safer than competitors?",
//     "Tell me about the e-Platform 3.0",
//     "What smart tech features are included?",
//     "Does it support over-the-air updates?",
//   ],
//   safety: [
//     "What is the safety rating for this car?",
//     "How does the AEB system work?",
//     "What driver assistance features are standard?",
//     "Is this safe for young families?",
//     "What crash test results does it have?",
//   ],
//   default: [
//     "Which BYD model suits a family of 4?",
//     "What's the range on this model?",
//     "Tell me about the Blade Battery",
//     "How fast does it charge at home?",
//     "What's the total cost of ownership?",
//     "How does it compare to a Tesla?",
//   ],
// };

// const JOURNEY_STAGES = [
//   { label: "Discover", prompt: "What makes this BYD special compared to other EVs?" },
//   { label: "Compare", prompt: "How does this compare to similar models in the range?" },
//   { label: "Configure", prompt: "Help me choose the right variant, colour and extras" },
//   { label: "Purchase", prompt: "What are my options to finance, order or test drive?" },
// ];

// // ─── Share Modal ──────────────────────────────────────────────────────────────
// function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);
//   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

//   const handleSend = () => {
//     setSent(true);
//     setTimeout(() => { setSent(false); onClose(); }, 2000);
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1000,
//         background: "rgba(0,0,0,0.8)",
//         display: "flex",
//         alignItems: "flex-end",
//         backdropFilter: "blur(8px)",
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           background: "linear-gradient(180deg, #0F1318 0%, #080A0E 100%)",
//           border: "1px solid rgba(0,168,232,0.15)",
//           borderBottom: "none",
//           borderRadius: "20px 20px 0 0",
//           padding: "8px 20px 44px",
//           fontFamily: "'Barlow Condensed', sans-serif",
//         }}
//       >
//         <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "12px auto 24px" }} />

//         <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8ECF0", marginBottom: 4 }}>
//           Continue Your Journey
//         </h3>
//         <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#4B5563", marginBottom: 24, lineHeight: 1.5 }}>
//           Send this conversation to your device to explore further at home.
//         </p>

//         <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
//           {(["email"] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               style={{
//                 flex: 1,
//                 padding: "8px 0",
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 11,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 border: "none",
//                 borderRadius: 6,
//                 cursor: "pointer",
//                 transition: "all 0.2s",
//                 background: activeTab === tab ? "#00A8E8" : "transparent",
//                 color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
//               }}
//             >
//               {/* {tab === "qr" ? "QR Code" : tab.toUpperCase()} */}
//             </button>
//           ))}
//         </div>

//         {activeTab === "email" && (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <input
//               type="email"
//               placeholder="your@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!email || sent}
//               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: email && !sent ? "pointer" : "default", transition: "all 0.2s" }}
//             >
//               {sent ? "✓  Sent Successfully" : "Send to Email"}
//             </button>
//           </div>
//         )}

//         {activeTab === "sms" && (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <input
//               type="tel"
//               placeholder="+61 400 000 000"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!phone || sent}
//               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: phone && !sent ? "pointer" : "default", transition: "all 0.2s" }}
//             >
//               {sent ? "✓  Sent Successfully" : "Send via SMS"}
//             </button>
//           </div>
//         )}

//         {activeTab === "qr" && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//             <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "inline-block", border: "1px solid rgba(0,0,0,0.05)" }}>
//               <svg width={120} height={120} viewBox="0 0 120 120" style={{ display: "block" }}>
//                 <rect width="120" height="120" fill="white" />
//                 {[[0, 0], [0, 90], [90, 0]].map(([x, y], i) => (
//                   <g key={i}>
//                     <rect x={x + 5} y={y + 5} width={25} height={25} fill="black" rx={2} />
//                     <rect x={x + 8} y={y + 8} width={19} height={19} fill="white" rx={1} />
//                     <rect x={x + 11} y={y + 11} width={13} height={13} fill="black" rx={1} />
//                   </g>
//                 ))}
//                 {Array.from({ length: 36 }).map((_, i) => {
//                   const col = i % 6;
//                   const row = Math.floor(i / 6);
//                   if ((col < 3 && row < 3) || (col < 3 && row > 2) || (col > 2 && row < 3)) return null;
//                   const visible = (i * 7 + 3) % 5 > 1;
//                   return visible ? <rect key={i} x={35 + col * 8 + (col > 3 ? 10 : 0)} y={35 + row * 8 + (row > 3 ? 10 : 0)} width={5} height={5} fill="black" rx={0.5} /> : null;
//                 })}
//                 <text x={60} y={112} textAnchor="middle" fontSize={7} fill="#555">bydfairfield.com.au</text>
//               </svg>
//             </div>
//             <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
//               Scan with your phone to continue exploring on your own device.
//             </p>
//           </div>
//         )}

//         <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(0,168,232,0.05)", border: "1px solid rgba(0,168,232,0.1)", borderRadius: 8 }}>
//           <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
//           <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.5 }}>
//             Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong> · 415 Heidelberg Road, Fairfield VIC 3078
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Message Bubble ───────────────────────────────────────────────────────────
// function MessageBubble({ message, isLatest }: { message: Message; isLatest: boolean }) {
//   const isUser = message.role === "user";

//   const renderContent = (text: string) => {
//     return text.split("\n").map((line, i, arr) => {
//       const parts = line.split(/\*\*(.*?)\*\*/g);
//       return (
//         <span key={i}>
//           {parts.map((part, j) =>
//             j % 2 === 1 ? (
//               <strong key={j} style={{ color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0", fontWeight: 700 }}>{part}</strong>
//             ) : part
//           )}
//           {i < arr.length - 1 && <br />}
//         </span>
//       );
//     });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: isUser ? "row-reverse" : "row",
//         alignItems: "flex-end",
//         gap: 10,
//         marginBottom: 16,
//         animation: isLatest ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
//         opacity: isLatest ? 0 : 1,
//       }}
//     >
//       {!isUser && (
//         <div style={{
//           width: 30,
//           height: 30,
//           borderRadius: "50%",
//           background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexShrink: 0,
//           fontSize: 11,
//           fontWeight: 900,
//           color: "#fff",
//           fontFamily: "'Barlow Condensed', sans-serif",
//           letterSpacing: "0.08em",
//           border: "1px solid rgba(0,168,232,0.3)",
//         }}>
//           BYD
//         </div>
//       )}

//       <div style={{
//         maxWidth: "78%",
//         padding: isUser ? "10px 16px" : "12px 16px",
//         borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
//         background: isUser
//           ? "linear-gradient(135deg, #00A8E8, #0066B3)"
//           : "rgba(255,255,255,0.04)",
//         border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
//         fontFamily: "'Barlow', sans-serif",
//         fontSize: 13.5,
//         lineHeight: 1.7,
//         color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
//         fontWeight: 400,
//         boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
//       }}>
//         {renderContent(message.content)}
//       </div>

//       {isUser && (
//         <div style={{
//           width: 28,
//           height: 28,
//           borderRadius: "50%",
//           background: "rgba(255,255,255,0.06)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexShrink: 0,
//           border: "1px solid rgba(255,255,255,0.08)",
//         }}>
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//             <circle cx="12" cy="7" r="4" />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Typing Indicator ─────────────────────────────────────────────────────────
// function TypingIndicator() {
//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 16 }}>
//       <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 900, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", border: "1px solid rgba(0,168,232,0.3)" }}>BYD</div>
//       <div style={{ padding: "12px 18px", borderRadius: "4px 16px 16px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 6, alignItems: "center" }}>
//         {[0, 1, 2].map((i) => (
//           <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E8", animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite` }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Suggestion Pills ─────────────────────────────────────────────────────────
// function SuggestionPills({ suggestions, onSelect, label }: { suggestions: string[]; onSelect: (s: string) => void; label: string }) {
//   return (
//     <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
//         <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#374151" }}>{label}</span>
//         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
//       </div>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
//         {suggestions.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSelect(s)}
//             style={{
//               padding: "7px 13px",
//               background: "rgba(255,255,255,0.03)",
//               border: "1px solid rgba(255,255,255,0.07)",
//               borderRadius: 20,
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 12,
//               color: "#6B7280",
//               cursor: "pointer",
//               transition: "all 0.2s",
//               textAlign: "left",
//               lineHeight: 1.3,
//             }}
//             onMouseEnter={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.background = "rgba(0,168,232,0.08)";
//               el.style.borderColor = "rgba(0,168,232,0.3)";
//               el.style.color = "#E8ECF0";
//             }}
//             onMouseLeave={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.background = "rgba(255,255,255,0.03)";
//               el.style.borderColor = "rgba(255,255,255,0.07)";
//               el.style.color = "#6B7280";
//             }}
//           >
//             {s}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Main Chatbot Component ───────────────────────────────────────────────────
// interface BYDChatbotProps {
//   isOpen: boolean;
//   onClose: () => void;
//   carContext?: string;
//   /** Context hint for showing relevant suggestions e.g. "specs" | "models" | "configurator" | "technology" | "safety" */
//   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// }

// export default function BYDChatbot({ isOpen, onClose, carContext, suggestionContext }: BYDChatbotProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showShare, setShowShare] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>([]);
//   const [hasStarted, setHasStarted] = useState(false);
//   const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
//     CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]
//   );
//   const [showSuggestions, setShowSuggestions] = useState(true);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       const carName = carContext ?? "BYD vehicle";
//       const welcomeMsg: Message = {
//         id: "welcome",
//         role: "assistant",
//         content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carName}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
//         timestamp: new Date(),
//       };
//       setMessages([welcomeMsg]);
//     }
//   }, [isOpen, carContext]);

//   useEffect(() => {
//     // Update suggestions when context changes (e.g. user opened from specs section)
//     if (suggestionContext) {
//       setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default);
//     }
//   }, [suggestionContext]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isLoading]);

//   useEffect(() => {
//     if (isOpen) setTimeout(() => inputRef.current?.focus(), 320);
//   }, [isOpen]);

//   const sendMessage = useCallback(
//     async (text: string) => {
//       const trimmed = text.trim();
//       if (!trimmed || isLoading) return;

//       setHasStarted(true);
//       setShowSuggestions(false);
//       setInput("");

//       const userMsg: Message = {
//         id: `user-${Date.now()}`,
//         role: "user",
//         content: trimmed,
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, userMsg]);
//       setIsLoading(true);

//       const newHistory: ConversationHistoryItem[] = [
//         ...conversationHistory,
//         { role: "user", content: trimmed },
//       ];

//       try {
//         const response = await fetch("https://byd-backend.omnisuiteai.com/api/chatbot", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             message: trimmed,
//             conversationHistory,
//             carContext: carContext ?? null,
//           }),
//         });

//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
//         const data = await response.json();

//         if (data.success && data.response) {
//           const assistantMsg: Message = {
//             id: `assistant-${Date.now()}`,
//             role: "assistant",
//             content: data.response,
//             timestamp: new Date(),
//           };
//           setMessages((prev) => [...prev, assistantMsg]);
//           setConversationHistory([...newHistory, { role: "assistant", content: data.response }]);
//           // Show follow-up suggestions after first exchange
//           setShowSuggestions(true);
//           setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
//         } else {
//           throw new Error(data.error || "Unknown error");
//         }
//       } catch {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `err-${Date.now()}`,
//             role: "assistant",
//             content: "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
//             timestamp: new Date(),
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//         inputRef.current?.focus();
//       }
//     },
//     [isLoading, conversationHistory, carContext, suggestionContext]
//   );

//   const handleReset = () => {
//     setMessages([]);
//     setConversationHistory([]);
//     setHasStarted(false);
//     setInput("");
//     setShowSuggestions(true);
//     setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
//     setTimeout(() => {
//       setMessages([{
//         id: "welcome-reset",
//         role: "assistant",
//         content: "Fresh start! What would you like to explore about the " + (carContext ?? "BYD range") + "?",
//         timestamp: new Date(),
//       }]);
//     }, 50);
//   };

//   const conversationSummary = messages
//     .slice(0, 6)
//     .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
//     .join("\n");

//   if (!isOpen) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes msgIn {
//           from { opacity: 0; transform: translateY(10px) scale(0.98); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes dotBounce {
//           0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
//           30% { transform: translateY(-6px); opacity: 1; }
//         }
//         @keyframes chatPanelUp {
//           from { transform: translateY(100%); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         @keyframes overlayIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .byd-input:focus { outline: none; }
//         .byd-input::placeholder { color: rgba(255,255,255,0.18); }
//         .byd-scroll::-webkit-scrollbar { width: 2px; }
//         .byd-scroll::-webkit-scrollbar-track { background: transparent; }
//         .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
//         .byd-send:not(:disabled):hover { background: #0090CC !important; }
//         .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           zIndex: 900,
//           background: "rgba(0,0,0,0.6)",
//           backdropFilter: "blur(6px)",
//           animation: "overlayIn 0.25s ease forwards",
//         }}
//         onClick={onClose}
//       />

//       {/* Chat Panel */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           zIndex: 950,
//           height: "91dvh",
//           maxHeight: 720,
//           background: "#080A0E",
//           borderTop: "1px solid rgba(0,168,232,0.12)",
//           borderLeft: "1px solid rgba(0,168,232,0.06)",
//           borderRight: "1px solid rgba(0,168,232,0.06)",
//           borderRadius: "20px 20px 0 0",
//           display: "flex",
//           flexDirection: "column",
//           fontFamily: "'Barlow Condensed', sans-serif",
//           animation: "chatPanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
//           overflow: "hidden",
//         }}
//       >
//         {/* Ambient top glow line */}
//         <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)", flexShrink: 0 }} />

//         {/* Header */}
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "14px 16px",
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//           background: "rgba(8,10,14,0.9)",
//           backdropFilter: "blur(20px)",
//           flexShrink: 0,
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             {/* BYD emblem */}
//             <div style={{
//               width: 38,
//               height: 38,
//               borderRadius: 10,
//               background: "linear-gradient(145deg, #00A8E8, #004E8C)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               flexShrink: 0,
//               border: "1px solid rgba(0,168,232,0.4)",
//               boxShadow: "0 0 16px rgba(0,168,232,0.12)",
//             }}>
//               <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
//                 <text x="4" y="25" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fontSize="26" fill="white" letterSpacing="-1">BYD</text>
//               </svg>
//             </div>
//             <div>
//               <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8ECF0", lineHeight: 1.1 }}>
//                 BYD Assistant
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
//                 <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
//                 <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#4B5563", fontWeight: 400 }}>
//                   Online · BYD Fairfield
//                   {carContext && (
//                     <span style={{ color: "#00A8E8", marginLeft: 4 }}>· {carContext}</span>
//                   )}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//             {hasStarted && (
//               <button
//                 onClick={() => setShowShare(true)}
//                 className="byd-icon-btn"
//                 style={{
//                   background: "rgba(0,168,232,0.08)",
//                   border: "1px solid rgba(0,168,232,0.2)",
//                   borderRadius: 8,
//                   padding: "6px 12px",
//                   fontFamily: "'Barlow Condensed', sans-serif",
//                   fontWeight: 700,
//                   fontSize: 10,
//                   letterSpacing: "0.18em",
//                   textTransform: "uppercase",
//                   color: "#00A8E8",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   transition: "all 0.2s",
//                 }}
//               >
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
//                   <polyline points="16 6 12 2 8 6" />
//                   <line x1="12" y1="2" x2="12" y2="15" />
//                 </svg>
//                 Share
//               </button>
//             )}
//             {hasStarted && (
//               <button
//                 onClick={handleReset}
//                 className="byd-icon-btn"
//                 title="New conversation"
//                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
//               >
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="23 4 23 10 17 10" />
//                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
//                 </svg>
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="byd-icon-btn"
//               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
//             >
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Journey Guide — pre-conversation */}
//         {!hasStarted && (
//           <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
//             <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "#374151", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
//               Where are you in your journey?
//             </div>
//             <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2 }}>
//               {JOURNEY_STAGES.map((stage) => (
//                 <button
//                   key={stage.label}
//                   onClick={() => sendMessage(stage.prompt)}
//                   style={{
//                     flexShrink: 0,
//                     padding: "7px 14px",
//                     background: "transparent",
//                     border: "1px solid rgba(255,255,255,0.09)",
//                     borderRadius: 20,
//                     fontFamily: "'Barlow Condensed', sans-serif",
//                     fontWeight: 700,
//                     fontSize: 10,
//                     letterSpacing: "0.15em",
//                     textTransform: "uppercase",
//                     color: "#6B7280",
//                     cursor: "pointer",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) => {
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.borderColor = "rgba(0,168,232,0.4)";
//                     el.style.color = "#00A8E8";
//                     el.style.background = "rgba(0,168,232,0.07)";
//                   }}
//                   onMouseLeave={(e) => {
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.borderColor = "rgba(255,255,255,0.09)";
//                     el.style.color = "#6B7280";
//                     el.style.background = "transparent";
//                   }}
//                 >
//                   {stage.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Messages */}
//         <div
//           className="byd-scroll"
//           style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}
//         >
//           {messages.map((msg, i) => (
//             <MessageBubble key={msg.id} message={msg} isLatest={i === messages.length - 1} />
//           ))}
//           {isLoading && <TypingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Contextual Suggestions */}
//         {showSuggestions && !isLoading && messages.length > 0 && (
//           <SuggestionPills
//             label={hasStarted ? "Follow-up questions" : "Common questions"}
//             suggestions={currentSuggestions}
//             onSelect={sendMessage}
//           />
//         )}

//         {/* Input */}
//         <div style={{
//           padding: "10px 14px 18px",
//           borderTop: "1px solid rgba(255,255,255,0.05)",
//           background: "rgba(8,10,14,0.98)",
//           flexShrink: 0,
//         }}>
//           <div style={{
//             display: "flex",
//             gap: 10,
//             alignItems: "flex-end",
//             background: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(255,255,255,0.08)",
//             borderRadius: 12,
//             padding: "10px 10px 10px 16px",
//             transition: "border-color 0.2s",
//           }}
//             onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,168,232,0.4)"; }}
//             onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
//           >
//             <textarea
//               ref={inputRef}
//               className="byd-input"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   sendMessage(input);
//                 }
//               }}
//               placeholder={carContext ? `Ask about the ${carContext}…` : "Ask anything about BYD vehicles…"}
//               rows={1}
//               style={{
//                 flex: 1,
//                 background: "transparent",
//                 border: "none",
//                 outline: "none",
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 14,
//                 color: "#E8ECF0",
//                 resize: "none",
//                 lineHeight: 1.55,
//                 maxHeight: 84,
//                 overflowY: "auto",
//                 paddingTop: 1,
//               }}
//               onInput={(e) => {
//                 const t = e.target as HTMLTextAreaElement;
//                 t.style.height = "auto";
//                 t.style.height = `${Math.min(t.scrollHeight, 84)}px`;
//               }}
//             />
//             <button
//               className="byd-send"
//               onClick={() => sendMessage(input)}
//               disabled={!input.trim() || isLoading}
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: 9,
//                 border: "none",
//                 background: input.trim() && !isLoading ? "#00A8E8" : "rgba(255,255,255,0.06)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: input.trim() && !isLoading ? "pointer" : "default",
//                 transition: "all 0.2s",
//                 flexShrink: 0,
//                 boxShadow: input.trim() && !isLoading ? "0 4px 14px rgba(0,168,232,0.3)" : "none",
//               }}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isLoading ? "#fff" : "#374151"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="22" y1="2" x2="11" y2="13" />
//                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
//               </svg>
//             </button>
//           </div>

//           <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.14)", letterSpacing: "0.06em" }}>
//             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
//           </div>
//         </div>
//       </div>

//       {showShare && <ShareModal onClose={() => setShowShare(false)} conversationSummary={conversationSummary} />}
//     </>
//   );
// }

// // ─── Floating Trigger Button ──────────────────────────────────────────────────
// export function BYDChatbotButton({ carContext, suggestionContext }: {
//   carContext?: string;
//   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pulse, setPulse] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setPulse(false), 3000);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes ringPulse {
//           0% { transform: scale(1); opacity: 0.5; }
//           70% { transform: scale(1.6); opacity: 0; }
//           100% { transform: scale(1.6); opacity: 0; }
//         }
//         .byd-fab-ring {
//           position: absolute;
//           inset: -2px;
//           border-radius: 50%;
//           border: 2px solid rgba(0,168,232,0.5);
//           animation: ringPulse 2s ease-out 0.5s 2 forwards;
//           pointer-events: none;
//         }
//       `}</style>
//       <button
//         onClick={() => setIsOpen(true)}
//         style={{
//           position: "fixed",
//           bottom: 100,
//           right: 16,
//           zIndex: 800,
//           width: 52,
//           height: 52,
//           borderRadius: "50%",
//           background: "linear-gradient(145deg, #00A8E8, #004E8C)",
//           border: "1px solid rgba(0,168,232,0.5)",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 4px 20px rgba(0,168,232,0.35), 0 0 0 0 rgba(0,168,232,0)",
//           transition: "transform 0.2s, box-shadow 0.2s",
//         }}
//         onMouseEnter={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,168,232,0.5)";
//         }}
//         onMouseLeave={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,168,232,0.35)";
//         }}
//         title="Ask BYD Assistant"
//       >
//         {pulse && <div className="byd-fab-ring" />}
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//           <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
//         </svg>
//       </button>

//       <BYDChatbot
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         carContext={carContext}
//         suggestionContext={suggestionContext}
//       />
//     </>
//   );
// }

"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ConversationHistoryItem {
  role: "user" | "assistant";
  content: string;
}

interface ShareModalProps {
  onClose: () => void;
  conversationSummary: string;
}

// ─── Context-aware suggestion maps ───────────────────────────────────────────
const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
  specs: [
    "What does this acceleration mean in real-world driving?",
    "How does the range compare to competitors?",
    "What factors affect the WLTP range?",
    "Is this range enough for daily commuting?",
    "What's the peak charging speed?",
  ],
  models: [
    "What's the key difference between Essential and Premium?",
    "Is the Premium worth the extra cost?",
    "Which model is better for families?",
    "What extras does the top variant include?",
    "Can I customise my chosen variant?",
  ],
  configurator: [
    "Which colour is most popular?",
    "Does colour choice affect resale value?",
    "Are there any metallic paint options?",
    "What interior options are available?",
    "How long does delivery take after configuring?",
  ],
  technology: [
    "How does Blade Battery compare to standard lithium-ion?",
    "What makes this battery safer than competitors?",
    "Tell me about the e-Platform 3.0",
    "What smart tech features are included?",
    "Does it support over-the-air updates?",
  ],
  safety: [
    "What is the safety rating for this car?",
    "How does the AEB system work?",
    "What driver assistance features are standard?",
    "Is this safe for young families?",
    "What crash test results does it have?",
  ],
  default: [
    "Which BYD model suits a family of 4?",
    "What's the range on this model?",
    "Tell me about the Blade Battery",
    "How fast does it charge at home?",
    "What's the total cost of ownership?",
    "How does it compare to a Tesla?",
  ],
};

const JOURNEY_STAGES = [
  {
    label: "Discover",
    prompt: "What makes this BYD special compared to other EVs?",
  },
  {
    label: "Compare",
    prompt: "How does this compare to similar models in the range?",
  },
  {
    label: "Configure",
    prompt: "Help me choose the right variant, colour and extras",
  },
  {
    label: "Purchase",
    prompt: "What are my options to finance, order or test drive?",
  },
];

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "flex-end",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #0F1318 0%, #080A0E 100%)",
          border: "1px solid rgba(0,168,232,0.15)",
          borderBottom: "none",
          borderRadius: "20px 20px 0 0",
          padding: "8px 20px 44px",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 2,
            margin: "12px auto 24px",
          }}
        />

        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#E8ECF0",
            marginBottom: 4,
          }}
        >
          Continue Your Journey
        </h3>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            color: "#4B5563",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          Send this conversation to your device to explore further at home.
        </p>

        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 24,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            padding: 4,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {(["email"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "8px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeTab === tab ? "#00A8E8" : "transparent",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
              }}
            >
              {/* {tab === "qr" ? "QR Code" : tab.toUpperCase()} */}
            </button>
          ))}
        </div>

        {activeTab === "email" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "13px 16px",
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: "#E8ECF0",
                outline: "none",
                width: "100%",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!email || sent}
              style={{
                background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: email && !sent ? "pointer" : "default",
                transition: "all 0.2s",
              }}
            >
              {sent ? "✓  Sent Successfully" : "Send to Email"}
            </button>
          </div>
        )}

        {activeTab === "sms" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="tel"
              placeholder="+61 400 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "13px 16px",
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: "#E8ECF0",
                outline: "none",
                width: "100%",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!phone || sent}
              style={{
                background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: phone && !sent ? "pointer" : "default",
                transition: "all 0.2s",
              }}
            >
              {sent ? "✓  Sent Successfully" : "Send via SMS"}
            </button>
          </div>
        )}

        {activeTab === "qr" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 14,
                display: "inline-block",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <svg
                width={120}
                height={120}
                viewBox="0 0 120 120"
                style={{ display: "block" }}
              >
                <rect width="120" height="120" fill="white" />
                {[
                  [0, 0],
                  [0, 90],
                  [90, 0],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <rect
                      x={x + 5}
                      y={y + 5}
                      width={25}
                      height={25}
                      fill="black"
                      rx={2}
                    />
                    <rect
                      x={x + 8}
                      y={y + 8}
                      width={19}
                      height={19}
                      fill="white"
                      rx={1}
                    />
                    <rect
                      x={x + 11}
                      y={y + 11}
                      width={13}
                      height={13}
                      fill="black"
                      rx={1}
                    />
                  </g>
                ))}
                {Array.from({ length: 36 }).map((_, i) => {
                  const col = i % 6;
                  const row = Math.floor(i / 6);
                  if (
                    (col < 3 && row < 3) ||
                    (col < 3 && row > 2) ||
                    (col > 2 && row < 3)
                  )
                    return null;
                  const visible = (i * 7 + 3) % 5 > 1;
                  return visible ? (
                    <rect
                      key={i}
                      x={35 + col * 8 + (col > 3 ? 10 : 0)}
                      y={35 + row * 8 + (row > 3 ? 10 : 0)}
                      width={5}
                      height={5}
                      fill="black"
                      rx={0.5}
                    />
                  ) : null;
                })}
                <text
                  x={60}
                  y={112}
                  textAnchor="middle"
                  fontSize={7}
                  fill="#555"
                >
                  bydfairfield.com.au
                </text>
              </svg>
            </div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 12,
                color: "#4B5563",
                textAlign: "center",
                maxWidth: 220,
                lineHeight: 1.6,
              }}
            >
              Scan with your phone to continue exploring on your own device.
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            background: "rgba(0,168,232,0.05)",
            border: "1px solid rgba(0,168,232,0.1)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: "#4B5563",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>{" "}
            · 415 Heidelberg Road, Fairfield VIC 3078
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({
  message,
  isLatest,
}: {
  message: Message;
  isLatest: boolean;
}) {
  const isUser = message.role === "user";

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i, arr) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong
                key={j}
                style={{
                  color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0",
                  fontWeight: 700,
                }}
              >
                {part}
              </strong>
            ) : (
              part
            ),
          )}
          {i < arr.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 10,
        marginBottom: 16,
        animation: isLatest
          ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards"
          : "none",
        opacity: isLatest ? 0 : 1,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.08em",
            border: "1px solid rgba(0,168,232,0.3)",
          }}
        >
          BYD
        </div>
      )}

      <div
        style={{
          maxWidth: "78%",
          padding: isUser ? "10px 16px" : "12px 16px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
          background: isUser
            ? "linear-gradient(135deg, #00A8E8, #0066B3)"
            : "rgba(255,255,255,0.04)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13.5,
          lineHeight: 1.7,
          color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
          fontWeight: 400,
          boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
        }}
      >
        {renderContent(message.content)}
      </div>

      {isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.08em",
          border: "1px solid rgba(0,168,232,0.3)",
        }}
      >
        BYD
      </div>
      <div
        style={{
          padding: "12px 18px",
          borderRadius: "4px 16px 16px 16px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#00A8E8",
              animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Suggestion Pills ─────────────────────────────────────────────────────────
function SuggestionPills({
  suggestions,
  onSelect,
  label,
}: {
  suggestions: string[];
  onSelect: (s: string) => void;
  label: string;
}) {
  return (
    <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
        />
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#374151",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <div
          style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
        />
      </div>

      <div
        className="byd-suggestions-scroll"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 8,
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 4,
          scrollSnapType: "x proximity",
        }}
      >
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={{
              flex: "0 0 auto",
              whiteSpace: "nowrap",
              padding: "7px 13px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: "#6B7280",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
              lineHeight: 1.3,
              scrollSnapAlign: "start",
              maxWidth: "80vw",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(0,168,232,0.08)";
              el.style.borderColor = "rgba(0,168,232,0.3)";
              el.style.color = "#E8ECF0";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(255,255,255,0.03)";
              el.style.borderColor = "rgba(255,255,255,0.07)";
              el.style.color = "#6B7280";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
interface BYDChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  carContext?: string;
  /** Context hint for showing relevant suggestions e.g. "specs" | "models" | "configurator" | "technology" | "safety" */
  suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
}

export default function BYDChatbot({
  isOpen,
  onClose,
  carContext,
  suggestionContext,
}: BYDChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationHistoryItem[]
  >([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
    CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
  );
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const carName = carContext ?? "BYD vehicle";
      const welcomeMsg: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carName}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, carContext]);

  useEffect(() => {
    if (suggestionContext) {
      setCurrentSuggestions(
        CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default,
      );
    }
  }, [suggestionContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 320);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setHasStarted(true);
      setShowSuggestions(false);
      setInput("");

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      const newHistory: ConversationHistoryItem[] = [
        ...conversationHistory,
        { role: "user", content: trimmed },
      ];

      try {
        const response = await fetch(
          "https://byd-backend.omnisuiteai.com/api/chatbot",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmed,
              conversationHistory,
              carContext: carContext ?? null,
            }),
          },
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (data.success && data.response) {
          const assistantMsg: Message = {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setConversationHistory([
            ...newHistory,
            { role: "assistant", content: data.response },
          ]);
          setShowSuggestions(true);
          setCurrentSuggestions(
            CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
          );
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content:
              "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, conversationHistory, carContext, suggestionContext],
  );

  const handleReset = () => {
    setMessages([]);
    setConversationHistory([]);
    setHasStarted(false);
    setInput("");
    setShowSuggestions(true);
    setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
    setTimeout(() => {
      setMessages([
        {
          id: "welcome-reset",
          role: "assistant",
          content:
            "Fresh start! What would you like to explore about the " +
            (carContext ?? "BYD range") +
            "?",
          timestamp: new Date(),
        },
      ]);
    }, 50);
  };

  const conversationSummary = messages
    .slice(0, 6)
    .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
    .join("\n");

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatPanelUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .byd-input:focus { outline: none; }
        .byd-input::placeholder { color: rgba(255,255,255,0.18); }
        .byd-scroll::-webkit-scrollbar { width: 2px; }
        .byd-scroll::-webkit-scrollbar-track { background: transparent; }
        .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
        .byd-send:not(:disabled):hover { background: #0090CC !important; }
        .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
        .byd-suggestions-scroll::-webkit-scrollbar { height: 2px; }
        .byd-suggestions-scroll::-webkit-scrollbar-track { background: transparent; }
        .byd-suggestions-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 900,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          animation: "overlayIn 0.25s ease forwards",
        }}
        onClick={onClose}
      />

      {/* Chat Panel */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 950,
          height: "91dvh",
          maxHeight: 720,
          background: "#080A0E",
          borderTop: "1px solid rgba(0,168,232,0.12)",
          borderLeft: "1px solid rgba(0,168,232,0.06)",
          borderRight: "1px solid rgba(0,168,232,0.06)",
          borderRadius: "20px 20px 0 0",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Barlow Condensed', sans-serif",
          animation: "chatPanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)",
            flexShrink: 0,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,10,14,0.9)",
            backdropFilter: "blur(20px)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(145deg, #00A8E8, #004E8C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "1px solid rgba(0,168,232,0.4)",
                boxShadow: "0 0 16px rgba(0,168,232,0.12)",
              }}
            >
              <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
                <text
                  x="4"
                  y="25"
                  fontFamily="'Barlow Condensed',sans-serif"
                  fontWeight="900"
                  fontSize="26"
                  fill="white"
                  letterSpacing="-1"
                >
                  BYD
                </text>
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#E8ECF0",
                  lineHeight: 1.1,
                }}
              >
                BYD Assistant
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 3,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 6px rgba(34,197,94,0.6)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 11,
                    color: "#4B5563",
                    fontWeight: 400,
                  }}
                >
                  Online · BYD Fairfield
                  {carContext && (
                    <span style={{ color: "#00A8E8", marginLeft: 4 }}>
                      · {carContext}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {hasStarted && (
              <button
                onClick={() => setShowShare(true)}
                className="byd-icon-btn"
                style={{
                  background: "rgba(0,168,232,0.08)",
                  border: "1px solid rgba(0,168,232,0.2)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#00A8E8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            )}
            {hasStarted && (
              <button
                onClick={handleReset}
                className="byd-icon-btn"
                title="New conversation"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#4B5563",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="byd-icon-btn"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#4B5563",
                transition: "all 0.2s",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Journey Guide — pre-conversation */}
        {!hasStarted && (
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 10,
                color: "#374151",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Where are you in your journey?
            </div>
            <div
              style={{
                display: "flex",
                gap: 7,
                overflowX: "auto",
                paddingBottom: 2,
                WebkitOverflowScrolling: "touch",
              }}
            >
              {JOURNEY_STAGES.map((stage) => (
                <button
                  key={stage.label}
                  onClick={() => sendMessage(stage.prompt)}
                  style={{
                    flexShrink: 0,
                    padding: "7px 14px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 20,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.borderColor = "rgba(0,168,232,0.4)";
                    el.style.color = "#00A8E8";
                    el.style.background = "rgba(0,168,232,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.borderColor = "rgba(255,255,255,0.09)";
                    el.style.color = "#6B7280";
                    el.style.background = "transparent";
                  }}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="byd-scroll"
          style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}
        >
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isLatest={i === messages.length - 1}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Contextual Suggestions */}
        {showSuggestions && !isLoading && messages.length > 0 && (
          <SuggestionPills
            label={hasStarted ? "Follow-up questions" : "Common questions"}
            suggestions={currentSuggestions}
            onSelect={sendMessage}
          />
        )}

        {/* Input */}
        <div
          style={{
            padding: "10px 14px 18px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,10,14,0.98)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "10px 10px 10px 16px",
              transition: "border-color 0.2s",
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(0,168,232,0.4)";
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            <textarea
              ref={inputRef}
              className="byd-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={
                carContext
                  ? `Ask about the ${carContext}…`
                  : "Ask anything about BYD vehicles…"
              }
              rows={1}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: "#E8ECF0",
                resize: "none",
                lineHeight: 1.55,
                maxHeight: 84,
                overflowY: "auto",
                paddingTop: 1,
              }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = `${Math.min(t.scrollHeight, 84)}px`;
              }}
            />
            <button
              className="byd-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: "none",
                background:
                  input.trim() && !isLoading
                    ? "#00A8E8"
                    : "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() && !isLoading ? "pointer" : "default",
                transition: "all 0.2s",
                flexShrink: 0,
                boxShadow:
                  input.trim() && !isLoading
                    ? "0 4px 14px rgba(0,168,232,0.3)"
                    : "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={input.trim() && !isLoading ? "#fff" : "#374151"}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 8,
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              color: "rgba(255,255,255,0.14)",
              letterSpacing: "0.06em",
            }}
          >
            BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
          </div>
        </div>
      </div>

      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
          conversationSummary={conversationSummary}
        />
      )}
    </>
  );
}

// ─── Floating Trigger Button ──────────────────────────────────────────────────
export function BYDChatbotButton({
  carContext,
  suggestionContext,
}: {
  carContext?: string;
  suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.5; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .byd-fab-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid rgba(0,168,232,0.5);
          animation: ringPulse 2s ease-out 0.5s 2 forwards;
          pointer-events: none;
        }
      `}</style>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 100,
          right: 16,
          zIndex: 800,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #00A8E8, #004E8C)",
          border: "1px solid rgba(0,168,232,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 4px 20px rgba(0,168,232,0.35), 0 0 0 0 rgba(0,168,232,0)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform =
            "scale(1.08)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 28px rgba(0,168,232,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(0,168,232,0.35)";
        }}
        title="Ask BYD Assistant"
      >
        {pulse && <div className="byd-fab-ring" />}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>

      <BYDChatbot
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        carContext={carContext}
        suggestionContext={suggestionContext}
      />
    </>
  );
}


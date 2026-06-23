// // // "use client";

// // // import { useState, useRef, useEffect, useCallback } from "react";

// // // // ─── Types ────────────────────────────────────────────────────────────────────
// // // interface Message {
// // //   id: string;
// // //   role: "user" | "assistant";
// // //   content: string;
// // //   timestamp: Date;
// // // }

// // // interface ConversationHistoryItem {
// // //   role: "user" | "assistant";
// // //   content: string;
// // // }

// // // interface ShareModalProps {
// // //   onClose: () => void;
// // //   conversationSummary: string;
// // // }

// // // // ─── Suggested Questions ─────────────────────────────────────────────────────
// // // const SUGGESTED_QUESTIONS = [
// // //   "Which BYD model suits a family of 4?",
// // //   "What's the range on the BYD Seal?",
// // //   "Tell me about BYD Blade Battery",
// // //   "Compare Atto 3 vs Sealion 7",
// // //   "How fast does the Shark 6 charge?",
// // //   "What's the cheapest BYD available?",
// // // ];

// // // // ─── Buyer Journey Prompts ────────────────────────────────────────────────────
// // // const JOURNEY_STAGES = [
// // //   { label: "Discover", prompt: "Help me find the right BYD for my lifestyle" },
// // //   { label: "Explore", prompt: "Tell me about BYD model ranges and pricing" },
// // //   { label: "Compare", prompt: "What are the differences between BYD models?" },
// // //   { label: "Configure", prompt: "Help me configure and personalise a BYD" },
// // // ];

// // // // ─── Share Modal ──────────────────────────────────────────────────────────────
// // // function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
// // //   const [phone, setPhone] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [sent, setSent] = useState(false);
// // //   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

// // //   const handleSend = () => {
// // //     setSent(true);
// // //     setTimeout(() => {
// // //       setSent(false);
// // //       onClose();
// // //     }, 2000);
// // //   };

// // //   const qrUrl = `https://bydfairfield.com.au?ref=kiosk`;

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "fixed",
// // //         inset: 0,
// // //         zIndex: 1000,
// // //         background: "rgba(0,0,0,0.75)",
// // //         display: "flex",
// // //         alignItems: "flex-end",
// // //         backdropFilter: "blur(4px)",
// // //       }}
// // //       onClick={onClose}
// // //     >
// // //       <div
// // //         onClick={(e) => e.stopPropagation()}
// // //         style={{
// // //           width: "100%",
// // //           background: "#0D1117",
// // //           border: "1px solid rgba(0,168,232,0.2)",
// // //           borderRadius: "16px 16px 0 0",
// // //           padding: "24px 20px 40px",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //         }}
// // //       >
// // //         {/* Handle */}
// // //         <div
// // //           style={{
// // //             width: 36,
// // //             height: 4,
// // //             background: "rgba(255,255,255,0.15)",
// // //             borderRadius: 2,
// // //             margin: "0 auto 20px",
// // //           }}
// // //         />

// // //         <h3
// // //           style={{
// // //             fontFamily: "'Barlow Condensed', sans-serif",
// // //             fontWeight: 800,
// // //             fontSize: 20,
// // //             letterSpacing: "0.05em",
// // //             textTransform: "uppercase",
// // //             color: "#E8ECF0",
// // //             marginBottom: 6,
// // //           }}
// // //         >
// // //           Continue Your Journey
// // //         </h3>
// // //         <p
// // //           style={{
// // //             fontFamily: "'Barlow', sans-serif",
// // //             fontSize: 13,
// // //             color: "#6B7280",
// // //             marginBottom: 20,
// // //           }}
// // //         >
// // //           Send this conversation to your device to continue exploring later.
// // //         </p>

// // //         {/* Tabs */}
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             gap: 4,
// // //             marginBottom: 20,
// // //             background: "rgba(255,255,255,0.04)",
// // //             borderRadius: 6,
// // //             padding: 4,
// // //           }}
// // //         >
// // //           {(["email", "sms", "qr"] as const).map((tab) => (
// // //             <button
// // //               key={tab}
// // //               onClick={() => setActiveTab(tab)}
// // //               style={{
// // //                 flex: 1,
// // //                 padding: "7px 0",
// // //                 fontFamily: "'Barlow Condensed', sans-serif",
// // //                 fontWeight: 700,
// // //                 fontSize: 11,
// // //                 letterSpacing: "0.15em",
// // //                 textTransform: "uppercase",
// // //                 border: "none",
// // //                 borderRadius: 4,
// // //                 cursor: "pointer",
// // //                 transition: "all 0.2s",
// // //                 background: activeTab === tab ? "#00A8E8" : "transparent",
// // //                 color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
// // //               }}
// // //             >
// // //               {tab === "qr" ? "QR Code" : tab.toUpperCase()}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Tab Content */}
// // //         {activeTab === "email" && (
// // //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// // //             <input
// // //               type="email"
// // //               placeholder="Enter your email address"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               style={{
// // //                 background: "rgba(255,255,255,0.05)",
// // //                 border: "1px solid rgba(0,168,232,0.2)",
// // //                 borderRadius: 6,
// // //                 padding: "12px 14px",
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 14,
// // //                 color: "#E8ECF0",
// // //                 outline: "none",
// // //                 width: "100%",
// // //               }}
// // //             />
// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!email || sent}
// // //               style={{
// // //                 background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
// // //                 color: "#fff",
// // //                 border: "none",
// // //                 borderRadius: 6,
// // //                 padding: "13px 0",
// // //                 fontFamily: "'Barlow Condensed', sans-serif",
// // //                 fontWeight: 700,
// // //                 fontSize: 13,
// // //                 letterSpacing: "0.15em",
// // //                 textTransform: "uppercase",
// // //                 cursor: email && !sent ? "pointer" : "default",
// // //                 transition: "all 0.2s",
// // //               }}
// // //             >
// // //               {sent ? "✓ Sent!" : "Send to Email"}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {activeTab === "sms" && (
// // //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// // //             <input
// // //               type="tel"
// // //               placeholder="Enter your phone number"
// // //               value={phone}
// // //               onChange={(e) => setPhone(e.target.value)}
// // //               style={{
// // //                 background: "rgba(255,255,255,0.05)",
// // //                 border: "1px solid rgba(0,168,232,0.2)",
// // //                 borderRadius: 6,
// // //                 padding: "12px 14px",
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 14,
// // //                 color: "#E8ECF0",
// // //                 outline: "none",
// // //                 width: "100%",
// // //               }}
// // //             />
// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!phone || sent}
// // //               style={{
// // //                 background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
// // //                 color: "#fff",
// // //                 border: "none",
// // //                 borderRadius: 6,
// // //                 padding: "13px 0",
// // //                 fontFamily: "'Barlow Condensed', sans-serif",
// // //                 fontWeight: 700,
// // //                 fontSize: 13,
// // //                 letterSpacing: "0.15em",
// // //                 textTransform: "uppercase",
// // //                 cursor: phone && !sent ? "pointer" : "default",
// // //                 transition: "all 0.2s",
// // //               }}
// // //             >
// // //               {sent ? "✓ Sent!" : "Send via SMS"}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {activeTab === "qr" && (
// // //           <div
// // //             style={{
// // //               display: "flex",
// // //               flexDirection: "column",
// // //               alignItems: "center",
// // //               gap: 12,
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "#fff",
// // //                 borderRadius: 8,
// // //                 padding: 12,
// // //                 display: "inline-block",
// // //               }}
// // //             >
// // //               {/* QR placeholder — replace with an actual QR library if needed */}
// // //               <svg
// // //                 width={120}
// // //                 height={120}
// // //                 viewBox="0 0 120 120"
// // //                 style={{ display: "block" }}
// // //               >
// // //                 {/* Simple QR code placeholder pattern */}
// // //                 <rect width="120" height="120" fill="white" />
// // //                 {[
// // //                   [0, 0],
// // //                   [0, 90],
// // //                   [90, 0],
// // //                 ].map(([x, y], i) => (
// // //                   <g key={i}>
// // //                     <rect
// // //                       x={x + 5}
// // //                       y={y + 5}
// // //                       width={25}
// // //                       height={25}
// // //                       fill="black"
// // //                       rx={2}
// // //                     />
// // //                     <rect
// // //                       x={x + 8}
// // //                       y={y + 8}
// // //                       width={19}
// // //                       height={19}
// // //                       fill="white"
// // //                       rx={1}
// // //                     />
// // //                     <rect
// // //                       x={x + 11}
// // //                       y={y + 11}
// // //                       width={13}
// // //                       height={13}
// // //                       fill="black"
// // //                       rx={1}
// // //                     />
// // //                   </g>
// // //                 ))}
// // //                 {/* Data dots */}
// // //                 {Array.from({ length: 36 }).map((_, i) => {
// // //                   const col = i % 6;
// // //                   const row = Math.floor(i / 6);
// // //                   if (
// // //                     (col < 3 && row < 3) ||
// // //                     (col < 3 && row > 2) ||
// // //                     (col > 2 && row < 3)
// // //                   )
// // //                     return null;
// // //                   const visible = (i * 7 + 3) % 5 > 1;
// // //                   return visible ? (
// // //                     <rect
// // //                       key={i}
// // //                       x={35 + col * 8 + (col > 3 ? 10 : 0)}
// // //                       y={35 + row * 8 + (row > 3 ? 10 : 0)}
// // //                       width={5}
// // //                       height={5}
// // //                       fill="black"
// // //                       rx={0.5}
// // //                     />
// // //                   ) : null;
// // //                 })}
// // //                 <text
// // //                   x={60}
// // //                   y={110}
// // //                   textAnchor="middle"
// // //                   fontSize={7}
// // //                   fill="#555"
// // //                 >
// // //                   bydfairfield.com.au
// // //                 </text>
// // //               </svg>
// // //             </div>
// // //             <p
// // //               style={{
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 12,
// // //                 color: "#6B7280",
// // //                 textAlign: "center",
// // //                 maxWidth: 240,
// // //               }}
// // //             >
// // //               Scan to open BYD Fairfield on your phone and continue your
// // //               journey.
// // //             </p>
// // //           </div>
// // //         )}

// // //         <div
// // //           style={{
// // //             marginTop: 16,
// // //             padding: "10px 14px",
// // //             background: "rgba(0,168,232,0.06)",
// // //             border: "1px solid rgba(0,168,232,0.12)",
// // //             borderRadius: 6,
// // //           }}
// // //         >
// // //           <p
// // //             style={{
// // //               fontFamily: "'Barlow', sans-serif",
// // //               fontSize: 11,
// // //               color: "#6B7280",
// // //               margin: 0,
// // //               lineHeight: 1.5,
// // //             }}
// // //           >
// // //             📞 Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>
// // //             &nbsp;·&nbsp;415 Heidelberg Road, Fairfield VIC 3078
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Message Bubble ───────────────────────────────────────────────────────────
// // // function MessageBubble({
// // //   message,
// // //   isLatest,
// // // }: {
// // //   message: Message;
// // //   isLatest: boolean;
// // // }) {
// // //   const isUser = message.role === "user";

// // //   // Simple markdown-like rendering for bold and line breaks
// // //   const renderContent = (text: string) => {
// // //     return text.split("\n").map((line, i) => {
// // //       const parts = line.split(/\*\*(.*?)\*\*/g);
// // //       return (
// // //         <span key={i}>
// // //           {parts.map((part, j) =>
// // //             j % 2 === 1 ? (
// // //               <strong key={j} style={{ color: "#E8ECF0", fontWeight: 700 }}>
// // //                 {part}
// // //               </strong>
// // //             ) : (
// // //               part
// // //             )
// // //           )}
// // //           {i < text.split("\n").length - 1 && <br />}
// // //         </span>
// // //       );
// // //     });
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         display: "flex",
// // //         flexDirection: isUser ? "row-reverse" : "row",
// // //         alignItems: "flex-start",
// // //         gap: 8,
// // //         marginBottom: 12,
// // //         animation: isLatest ? "fadeSlideIn 0.3s ease forwards" : "none",
// // //       }}
// // //     >
// // //       {/* Avatar */}
// // //       {!isUser && (
// // //         <div
// // //           style={{
// // //             width: 28,
// // //             height: 28,
// // //             borderRadius: "50%",
// // //             background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             flexShrink: 0,
// // //             marginTop: 2,
// // //             fontSize: 12,
// // //             fontWeight: 900,
// // //             color: "#fff",
// // //             fontFamily: "'Barlow Condensed', sans-serif",
// // //             letterSpacing: "0.05em",
// // //           }}
// // //         >
// // //           B
// // //         </div>
// // //       )}

// // //       {/* Bubble */}
// // //       <div
// // //         style={{
// // //           maxWidth: "80%",
// // //           padding: isUser ? "9px 14px" : "11px 14px",
// // //           borderRadius: isUser ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
// // //           background: isUser
// // //             ? "linear-gradient(135deg, #00A8E8, #0077B6)"
// // //             : "rgba(255,255,255,0.05)",
// // //           border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
// // //           fontFamily: "'Barlow', sans-serif",
// // //           fontSize: 13.5,
// // //           lineHeight: 1.65,
// // //           color: isUser ? "#fff" : "#B0BAC4",
// // //           fontWeight: 400,
// // //         }}
// // //       >
// // //         {renderContent(message.content)}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Typing Indicator ─────────────────────────────────────────────────────────
// // // function TypingIndicator() {
// // //   return (
// // //     <div
// // //       style={{
// // //         display: "flex",
// // //         alignItems: "center",
// // //         gap: 8,
// // //         marginBottom: 12,
// // //       }}
// // //     >
// // //       <div
// // //         style={{
// // //           width: 28,
// // //           height: 28,
// // //           borderRadius: "50%",
// // //           background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           flexShrink: 0,
// // //           fontSize: 12,
// // //           fontWeight: 900,
// // //           color: "#fff",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //         }}
// // //       >
// // //         B
// // //       </div>
// // //       <div
// // //         style={{
// // //           padding: "11px 14px",
// // //           borderRadius: "4px 14px 14px 14px",
// // //           background: "rgba(255,255,255,0.05)",
// // //           border: "1px solid rgba(255,255,255,0.07)",
// // //           display: "flex",
// // //           gap: 5,
// // //           alignItems: "center",
// // //         }}
// // //       >
// // //         {[0, 1, 2].map((i) => (
// // //           <div
// // //             key={i}
// // //             style={{
// // //               width: 6,
// // //               height: 6,
// // //               borderRadius: "50%",
// // //               background: "#00A8E8",
// // //               animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
// // //             }}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Main Chatbot Component ───────────────────────────────────────────────────
// // // interface BYDChatbotProps {
// // //   /** Whether the chatbot panel is open */
// // //   isOpen: boolean;
// // //   /** Callback to close the chatbot */
// // //   onClose: () => void;
// // //   /** Optional car context to pre-seed the conversation */
// // //   carContext?: string;
// // // }

// // // export default function BYDChatbot({
// // //   isOpen,
// // //   onClose,
// // //   carContext,
// // // }: BYDChatbotProps) {
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [input, setInput] = useState("");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showShare, setShowShare] = useState(false);
// // //   const [conversationHistory, setConversationHistory] = useState<
// // //     ConversationHistoryItem[]
// // //   >([]);
// // //   const [hasStarted, setHasStarted] = useState(false);

// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const inputRef = useRef<HTMLTextAreaElement>(null);

// // //   // Welcome message
// // //   useEffect(() => {
// // //     if (isOpen && messages.length === 0) {
// // //       const welcomeMsg: Message = {
// // //         id: "welcome",
// // //         role: "assistant",
// // //         content: carContext
// // //           ? `Hi! I'm your BYD assistant. I see you're looking at the **${carContext}** — great choice! Ask me anything about specs, pricing, features, or how it compares to other models. What would you like to know?`
// // //           : "Hi! I'm your BYD assistant 👋\n\nI'm here to help you explore our full range of electric and hybrid vehicles — from performance specs to pricing and everything in between.\n\n**What would you like to know?**",
// // //         timestamp: new Date(),
// // //       };
// // //       setMessages([welcomeMsg]);
// // //     }
// // //   }, [isOpen]);

// // //   // Auto-scroll to bottom
// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, isLoading]);

// // //   // Focus input when opened
// // //   useEffect(() => {
// // //     if (isOpen) {
// // //       setTimeout(() => inputRef.current?.focus(), 300);
// // //     }
// // //   }, [isOpen]);

// // //   const sendMessage = useCallback(
// // //     async (text: string) => {
// // //       const trimmed = text.trim();
// // //       if (!trimmed || isLoading) return;

// // //       setHasStarted(true);
// // //       setInput("");

// // //       const userMsg: Message = {
// // //         id: `user-${Date.now()}`,
// // //         role: "user",
// // //         content: trimmed,
// // //         timestamp: new Date(),
// // //       };

// // //       setMessages((prev) => [...prev, userMsg]);
// // //       setIsLoading(true);

// // //       const newHistory: ConversationHistoryItem[] = [
// // //         ...conversationHistory,
// // //         { role: "user", content: trimmed },
// // //       ];

// // //       try {
// // //         const response = await fetch(
// // //           "https://byd-backend.omnisuiteai.com/api/chatbot",
// // //           {
// // //             method: "POST",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify({
// // //               message: trimmed,
// // //               conversationHistory: conversationHistory,
// // //             }),
// // //           }
// // //         );

// // //         if (!response.ok) {
// // //           throw new Error(`HTTP error: ${response.status}`);
// // //         }

// // //         const data = await response.json();

// // //         if (data.success && data.response) {
// // //           const assistantMsg: Message = {
// // //             id: `assistant-${Date.now()}`,
// // //             role: "assistant",
// // //             content: data.response,
// // //             timestamp: new Date(),
// // //           };
// // //           setMessages((prev) => [...prev, assistantMsg]);
// // //           setConversationHistory([
// // //             ...newHistory,
// // //             { role: "assistant", content: data.response },
// // //           ]);
// // //         } else {
// // //           throw new Error(data.error || "Unknown error");
// // //         }
// // //       } catch (err) {
// // //         const errMsg: Message = {
// // //           id: `error-${Date.now()}`,
// // //           role: "assistant",
// // //           content:
// // //             "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
// // //           timestamp: new Date(),
// // //         };
// // //         setMessages((prev) => [...prev, errMsg]);
// // //       } finally {
// // //         setIsLoading(false);
// // //         inputRef.current?.focus();
// // //       }
// // //     },
// // //     [isLoading, conversationHistory]
// // //   );

// // //   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
// // //     if (e.key === "Enter" && !e.shiftKey) {
// // //       e.preventDefault();
// // //       sendMessage(input);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setMessages([]);
// // //     setConversationHistory([]);
// // //     setHasStarted(false);
// // //     setInput("");
// // //     // Re-trigger welcome message
// // //     setTimeout(() => {
// // //       const welcomeMsg: Message = {
// // //         id: "welcome-reset",
// // //         role: "assistant",
// // //         content:
// // //           "Conversation reset! What would you like to explore about our BYD range?",
// // //         timestamp: new Date(),
// // //       };
// // //       setMessages([welcomeMsg]);
// // //     }, 50);
// // //   };

// // //   const conversationSummary = messages
// // //     .slice(0, 6)
// // //     .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
// // //     .join("\n");

// // //   if (!isOpen) return null;

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @keyframes fadeSlideIn {
// // //           from { opacity: 0; transform: translateY(8px); }
// // //           to { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes typingBounce {
// // //           0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
// // //           30% { transform: translateY(-5px); opacity: 1; }
// // //         }
// // //         @keyframes panelSlideUp {
// // //           from { transform: translateY(100%); opacity: 0; }
// // //           to { transform: translateY(0); opacity: 1; }
// // //         }
// // //         .byd-chat-input:focus {
// // //           outline: none;
// // //           border-color: rgba(0,168,232,0.5) !important;
// // //         }
// // //         .byd-chat-input::placeholder {
// // //           color: rgba(255,255,255,0.2);
// // //         }
// // //         .byd-suggestion:hover {
// // //           background: rgba(0,168,232,0.12) !important;
// // //           border-color: rgba(0,168,232,0.35) !important;
// // //           color: #E8ECF0 !important;
// // //         }
// // //         .byd-journey-btn:hover {
// // //           background: rgba(0,168,232,0.15) !important;
// // //           border-color: rgba(0,168,232,0.4) !important;
// // //         }
// // //         .byd-send-btn:not(:disabled):hover {
// // //           background: #0077B6 !important;
// // //         }
// // //         .byd-chat-scroll::-webkit-scrollbar {
// // //           width: 3px;
// // //         }
// // //         .byd-chat-scroll::-webkit-scrollbar-track {
// // //           background: transparent;
// // //         }
// // //         .byd-chat-scroll::-webkit-scrollbar-thumb {
// // //           background: rgba(0,168,232,0.2);
// // //           border-radius: 2px;
// // //         }
// // //       `}</style>

// // //       {/* Overlay */}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           inset: 0,
// // //           zIndex: 900,
// // //           background: "rgba(0,0,0,0.4)",
// // //           backdropFilter: "blur(2px)",
// // //         }}
// // //         onClick={onClose}
// // //       />

// // //       {/* Chat Panel */}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           bottom: 0,
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 950,
// // //           height: "90dvh",
// // //           maxHeight: 700,
// // //           background: "#080A0E",
// // //           border: "1px solid rgba(0,168,232,0.15)",
// // //           borderRadius: "16px 16px 0 0",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //           animation: "panelSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         {/* Header */}
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "space-between",
// // //             padding: "14px 16px",
// // //             borderBottom: "1px solid rgba(255,255,255,0.06)",
// // //             background: "rgba(13,17,23,0.9)",
// // //             backdropFilter: "blur(12px)",
// // //             flexShrink: 0,
// // //           }}
// // //         >
// // //           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //             {/* BYD logo badge */}
// // //             <div
// // //               style={{
// // //                 width: 34,
// // //                 height: 34,
// // //                 borderRadius: "50%",
// // //                 background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 fontWeight: 900,
// // //                 fontSize: 14,
// // //                 color: "#fff",
// // //                 letterSpacing: "0.05em",
// // //                 flexShrink: 0,
// // //               }}
// // //             >
// // //               B
// // //             </div>
// // //             <div>
// // //               <div
// // //                 style={{
// // //                   fontWeight: 800,
// // //                   fontSize: 15,
// // //                   letterSpacing: "0.08em",
// // //                   textTransform: "uppercase",
// // //                   color: "#E8ECF0",
// // //                   lineHeight: 1.1,
// // //                 }}
// // //               >
// // //                 BYD Assistant
// // //               </div>
// // //               <div
// // //                 style={{
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: 5,
// // //                   marginTop: 2,
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     width: 6,
// // //                     height: 6,
// // //                     borderRadius: "50%",
// // //                     background: "#22c55e",
// // //                     animation: "typingBounce 2s ease-in-out infinite",
// // //                   }}
// // //                 />
// // //                 <span
// // //                   style={{
// // //                     fontFamily: "'Barlow', sans-serif",
// // //                     fontSize: 11,
// // //                     color: "#6B7280",
// // //                     fontWeight: 400,
// // //                   }}
// // //                 >
// // //                   Online · BYD Fairfield
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div style={{ display: "flex", gap: 6 }}>
// // //             {/* Share button */}
// // //             {hasStarted && (
// // //               <button
// // //                 onClick={() => setShowShare(true)}
// // //                 title="Share this conversation"
// // //                 style={{
// // //                   background: "rgba(0,168,232,0.1)",
// // //                   border: "1px solid rgba(0,168,232,0.25)",
// // //                   borderRadius: 6,
// // //                   padding: "7px 12px",
// // //                   fontFamily: "'Barlow Condensed', sans-serif",
// // //                   fontWeight: 700,
// // //                   fontSize: 10,
// // //                   letterSpacing: "0.15em",
// // //                   textTransform: "uppercase",
// // //                   color: "#00A8E8",
// // //                   cursor: "pointer",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: 5,
// // //                 }}
// // //               >
// // //                 <svg
// // //                   width="13"
// // //                   height="13"
// // //                   viewBox="0 0 24 24"
// // //                   fill="none"
// // //                   stroke="currentColor"
// // //                   strokeWidth={2.5}
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                 >
// // //                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
// // //                   <polyline points="16 6 12 2 8 6" />
// // //                   <line x1="12" y1="2" x2="12" y2="15" />
// // //                 </svg>
// // //                 Share
// // //               </button>
// // //             )}

// // //             {/* Reset button */}
// // //             {hasStarted && (
// // //               <button
// // //                 onClick={handleReset}
// // //                 title="New conversation"
// // //                 style={{
// // //                   background: "rgba(255,255,255,0.04)",
// // //                   border: "1px solid rgba(255,255,255,0.08)",
// // //                   borderRadius: 6,
// // //                   width: 32,
// // //                   height: 32,
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   justifyContent: "center",
// // //                   cursor: "pointer",
// // //                   color: "#6B7280",
// // //                 }}
// // //               >
// // //                 <svg
// // //                   width="14"
// // //                   height="14"
// // //                   viewBox="0 0 24 24"
// // //                   fill="none"
// // //                   stroke="currentColor"
// // //                   strokeWidth={2.5}
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                 >
// // //                   <polyline points="23 4 23 10 17 10" />
// // //                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
// // //                 </svg>
// // //               </button>
// // //             )}

// // //             {/* Close button */}
// // //             <button
// // //               onClick={onClose}
// // //               style={{
// // //                 background: "rgba(255,255,255,0.04)",
// // //                 border: "1px solid rgba(255,255,255,0.08)",
// // //                 borderRadius: 6,
// // //                 width: 32,
// // //                 height: 32,
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 cursor: "pointer",
// // //                 color: "#6B7280",
// // //               }}
// // //             >
// // //               <svg
// // //                 width="14"
// // //                 height="14"
// // //                 viewBox="0 0 24 24"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 strokeWidth={2.5}
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //               >
// // //                 <line x1="18" y1="6" x2="6" y2="18" />
// // //                 <line x1="6" y1="6" x2="18" y2="18" />
// // //               </svg>
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Journey Guide Bar — shown before conversation starts */}
// // //         {!hasStarted && (
// // //           <div
// // //             style={{
// // //               padding: "10px 14px",
// // //               borderBottom: "1px solid rgba(255,255,255,0.05)",
// // //               flexShrink: 0,
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 10,
// // //                 color: "#6B7280",
// // //                 letterSpacing: "0.1em",
// // //                 textTransform: "uppercase",
// // //                 marginBottom: 7,
// // //               }}
// // //             >
// // //               Where are you in your journey?
// // //             </div>
// // //             <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
// // //               {JOURNEY_STAGES.map((stage) => (
// // //                 <button
// // //                   key={stage.label}
// // //                   className="byd-journey-btn"
// // //                   onClick={() => sendMessage(stage.prompt)}
// // //                   style={{
// // //                     flexShrink: 0,
// // //                     padding: "6px 12px",
// // //                     background: "transparent",
// // //                     border: "1px solid rgba(255,255,255,0.1)",
// // //                     borderRadius: 20,
// // //                     fontFamily: "'Barlow Condensed', sans-serif",
// // //                     fontWeight: 700,
// // //                     fontSize: 10,
// // //                     letterSpacing: "0.12em",
// // //                     textTransform: "uppercase",
// // //                     color: "#A0A8B0",
// // //                     cursor: "pointer",
// // //                     transition: "all 0.2s",
// // //                   }}
// // //                 >
// // //                   {stage.label}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Messages Area */}
// // //         <div
// // //           className="byd-chat-scroll"
// // //           style={{
// // //             flex: 1,
// // //             overflowY: "auto",
// // //             padding: "16px 14px",
// // //           }}
// // //         >
// // //           {messages.map((msg, i) => (
// // //             <MessageBubble
// // //               key={msg.id}
// // //               message={msg}
// // //               isLatest={i === messages.length - 1}
// // //             />
// // //           ))}

// // //           {isLoading && <TypingIndicator />}

// // //           <div ref={messagesEndRef} />
// // //         </div>

// // //         {/* Suggested Questions — shown after welcome, before real conversation */}
// // //         {messages.length === 1 && !isLoading && (
// // //           <div
// // //             style={{
// // //               padding: "0 14px 10px",
// // //               flexShrink: 0,
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 10,
// // //                 color: "#6B7280",
// // //                 letterSpacing: "0.1em",
// // //                 textTransform: "uppercase",
// // //                 marginBottom: 7,
// // //               }}
// // //             >
// // //               Common questions
// // //             </div>
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 flexWrap: "wrap",
// // //                 gap: 6,
// // //               }}
// // //             >
// // //               {SUGGESTED_QUESTIONS.map((q) => (
// // //                 <button
// // //                   key={q}
// // //                   className="byd-suggestion"
// // //                   onClick={() => sendMessage(q)}
// // //                   style={{
// // //                     padding: "6px 11px",
// // //                     background: "rgba(255,255,255,0.03)",
// // //                     border: "1px solid rgba(255,255,255,0.08)",
// // //                     borderRadius: 20,
// // //                     fontFamily: "'Barlow', sans-serif",
// // //                     fontSize: 12,
// // //                     color: "#7A8490",
// // //                     cursor: "pointer",
// // //                     transition: "all 0.2s",
// // //                     textAlign: "left",
// // //                   }}
// // //                 >
// // //                   {q}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Input Area */}
// // //         <div
// // //           style={{
// // //             padding: "10px 14px 16px",
// // //             borderTop: "1px solid rgba(255,255,255,0.05)",
// // //             background: "rgba(8,10,14,0.95)",
// // //             flexShrink: 0,
// // //           }}
// // //         >
// // //           <div
// // //             style={{
// // //               display: "flex",
// // //               gap: 8,
// // //               alignItems: "flex-end",
// // //               background: "rgba(255,255,255,0.04)",
// // //               border: "1px solid rgba(255,255,255,0.09)",
// // //               borderRadius: 10,
// // //               padding: "8px 8px 8px 14px",
// // //               transition: "border-color 0.2s",
// // //             }}
// // //           >
// // //             <textarea
// // //               ref={inputRef}
// // //               className="byd-chat-input"
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={handleKeyDown}
// // //               placeholder="Ask anything about BYD vehicles…"
// // //               rows={1}
// // //               style={{
// // //                 flex: 1,
// // //                 background: "transparent",
// // //                 border: "none",
// // //                 outline: "none",
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 14,
// // //                 color: "#E8ECF0",
// // //                 resize: "none",
// // //                 lineHeight: 1.5,
// // //                 maxHeight: 80,
// // //                 overflowY: "auto",
// // //                 paddingTop: 2,
// // //               }}
// // //               onInput={(e) => {
// // //                 const t = e.target as HTMLTextAreaElement;
// // //                 t.style.height = "auto";
// // //                 t.style.height = `${Math.min(t.scrollHeight, 80)}px`;
// // //               }}
// // //             />
// // //             <button
// // //               className="byd-send-btn"
// // //               onClick={() => sendMessage(input)}
// // //               disabled={!input.trim() || isLoading}
// // //               style={{
// // //                 width: 34,
// // //                 height: 34,
// // //                 borderRadius: 7,
// // //                 border: "none",
// // //                 background:
// // //                   input.trim() && !isLoading
// // //                     ? "#00A8E8"
// // //                     : "rgba(255,255,255,0.06)",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 cursor: input.trim() && !isLoading ? "pointer" : "default",
// // //                 transition: "all 0.2s",
// // //                 flexShrink: 0,
// // //               }}
// // //             >
// // //               <svg
// // //                 width="15"
// // //                 height="15"
// // //                 viewBox="0 0 24 24"
// // //                 fill="none"
// // //                 stroke={input.trim() && !isLoading ? "#fff" : "#3A4050"}
// // //                 strokeWidth={2.5}
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //               >
// // //                 <line x1="22" y1="2" x2="11" y2="13" />
// // //                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // //               </svg>
// // //             </button>
// // //           </div>

// // //           <div
// // //             style={{
// // //               textAlign: "center",
// // //               marginTop: 7,
// // //               fontFamily: "'Barlow', sans-serif",
// // //               fontSize: 10,
// // //               color: "rgba(255,255,255,0.18)",
// // //               letterSpacing: "0.05em",
// // //             }}
// // //           >
// // //             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Share Modal */}
// // //       {showShare && (
// // //         <ShareModal
// // //           onClose={() => setShowShare(false)}
// // //           conversationSummary={conversationSummary}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // }

// // // // ─── Chatbot Trigger Button ───────────────────────────────────────────────────
// // // // Drop this anywhere in your layout to open the chatbot
// // // export function BYDChatbotButton({
// // //   carContext,
// // // }: {
// // //   carContext?: string;
// // // }) {
// // //   const [isOpen, setIsOpen] = useState(false);

// // //   return (
// // //     <>
// // //       <button
// // //         onClick={() => setIsOpen(true)}
// // //         style={{
// // //           position: "fixed",
// // //           bottom: 100,
// // //           right: 16,
// // //           zIndex: 800,
// // //           width: 52,
// // //           height: 52,
// // //           borderRadius: "50%",
// // //           background: "linear-gradient(135deg, #00A8E8, #0077B6)",
// // //           border: "none",
// // //           cursor: "pointer",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           boxShadow: "0 4px 20px rgba(0,168,232,0.35)",
// // //           transition: "transform 0.2s, box-shadow 0.2s",
// // //         }}
// // //         onMouseEnter={(e) => {
// // //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
// // //           (e.currentTarget as HTMLButtonElement).style.boxShadow =
// // //             "0 6px 28px rgba(0,168,232,0.5)";
// // //         }}
// // //         onMouseLeave={(e) => {
// // //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
// // //           (e.currentTarget as HTMLButtonElement).style.boxShadow =
// // //             "0 4px 20px rgba(0,168,232,0.35)";
// // //         }}
// // //       >
// // //         <svg
// // //           width="22"
// // //           height="22"
// // //           viewBox="0 0 24 24"
// // //           fill="none"
// // //           stroke="#fff"
// // //           strokeWidth={2}
// // //           strokeLinecap="round"
// // //           strokeLinejoin="round"
// // //         >
// // //           <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
// // //         </svg>
// // //       </button>

// // //       <BYDChatbot
// // //         isOpen={isOpen}
// // //         onClose={() => setIsOpen(false)}
// // //         carContext={carContext}
// // //       />
// // //     </>
// // //   );
// // // }
// // // "use client";

// // // import { useState, useRef, useEffect, useCallback } from "react";

// // // // ─── Types ────────────────────────────────────────────────────────────────────
// // // interface Message {
// // //   id: string;
// // //   role: "user" | "assistant";
// // //   content: string;
// // //   timestamp: Date;
// // // }

// // // interface ConversationHistoryItem {
// // //   role: "user" | "assistant";
// // //   content: string;
// // // }

// // // interface ShareModalProps {
// // //   onClose: () => void;
// // //   conversationSummary: string;
// // // }

// // // // ─── Context-aware suggestion maps ───────────────────────────────────────────
// // // const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
// // //   specs: [
// // //     "What does this acceleration mean in real-world driving?",
// // //     "How does the range compare to competitors?",
// // //     "What factors affect the WLTP range?",
// // //     "Is this range enough for daily commuting?",
// // //     "What's the peak charging speed?",
// // //   ],
// // //   models: [
// // //     "What's the key difference between Essential and Premium?",
// // //     "Is the Premium worth the extra cost?",
// // //     "Which model is better for families?",
// // //     "What extras does the top variant include?",
// // //     "Can I customise my chosen variant?",
// // //   ],
// // //   configurator: [
// // //     "Which colour is most popular?",
// // //     "Does colour choice affect resale value?",
// // //     "Are there any metallic paint options?",
// // //     "What interior options are available?",
// // //     "How long does delivery take after configuring?",
// // //   ],
// // //   technology: [
// // //     "How does Blade Battery compare to standard lithium-ion?",
// // //     "What makes this battery safer than competitors?",
// // //     "Tell me about the e-Platform 3.0",
// // //     "What smart tech features are included?",
// // //     "Does it support over-the-air updates?",
// // //   ],
// // //   safety: [
// // //     "What is the safety rating for this car?",
// // //     "How does the AEB system work?",
// // //     "What driver assistance features are standard?",
// // //     "Is this safe for young families?",
// // //     "What crash test results does it have?",
// // //   ],
// // //   default: [
// // //     "Which BYD model suits a family of 4?",
// // //     "What's the range on this model?",
// // //     "Tell me about the Blade Battery",
// // //     "How fast does it charge at home?",
// // //     "What's the total cost of ownership?",
// // //     "How does it compare to a Tesla?",
// // //   ],
// // // };

// // // const JOURNEY_STAGES = [
// // //   { label: "Discover", prompt: "What makes this BYD special compared to other EVs?" },
// // //   { label: "Compare", prompt: "How does this compare to similar models in the range?" },
// // //   { label: "Configure", prompt: "Help me choose the right variant, colour and extras" },
// // // //   { label: "Purchase", prompt: "What are my options to finance, order or test drive?" },
// // // ];

// // // // ─── Share Modal ──────────────────────────────────────────────────────────────
// // // function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
// // //   const [phone, setPhone] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [sent, setSent] = useState(false);
// // //   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

// // //   const handleSend = () => {
// // //     setSent(true);
// // //     setTimeout(() => { setSent(false); onClose(); }, 2000);
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         position: "fixed",
// // //         inset: 0,
// // //         zIndex: 1000,
// // //         background: "rgba(0,0,0,0.8)",
// // //         display: "flex",
// // //         alignItems: "flex-end",
// // //         backdropFilter: "blur(8px)",
// // //       }}
// // //       onClick={onClose}
// // //     >
// // //       <div
// // //         onClick={(e) => e.stopPropagation()}
// // //         style={{
// // //           width: "100%",
// // //           background: "linear-gradient(180deg, #0F1318 0%, #080A0E 100%)",
// // //           border: "1px solid rgba(0,168,232,0.15)",
// // //           borderBottom: "none",
// // //           borderRadius: "20px 20px 0 0",
// // //           padding: "8px 20px 44px",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //         }}
// // //       >
// // //         <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2, margin: "12px auto 24px" }} />

// // //         <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8ECF0", marginBottom: 4 }}>
// // //           Continue Your Journey
// // //         </h3>
// // //         <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#4B5563", marginBottom: 24, lineHeight: 1.5 }}>
// // //           Send this conversation to your device to explore further at home.
// // //         </p>

// // //         <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
// // //           {(["email"] as const).map((tab) => (
// // //             <button
// // //               key={tab}
// // //               onClick={() => setActiveTab(tab)}
// // //               style={{
// // //                 flex: 1,
// // //                 padding: "8px 0",
// // //                 fontFamily: "'Barlow Condensed', sans-serif",
// // //                 fontWeight: 700,
// // //                 fontSize: 11,
// // //                 letterSpacing: "0.18em",
// // //                 textTransform: "uppercase",
// // //                 border: "none",
// // //                 borderRadius: 6,
// // //                 cursor: "pointer",
// // //                 transition: "all 0.2s",
// // //                 background: activeTab === tab ? "#00A8E8" : "transparent",
// // //                 color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.35)",
// // //               }}
// // //             >
// // //               {/* {tab === "qr" ? "QR Code" : tab.toUpperCase()} */}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {activeTab === "email" && (
// // //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// // //             <input
// // //               type="email"
// // //               placeholder="your@email.com"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
// // //             />
// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!email || sent}
// // //               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: email && !sent ? "pointer" : "default", transition: "all 0.2s" }}
// // //             >
// // //               {sent ? "✓  Sent Successfully" : "Send to Email"}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {activeTab === "sms" && (
// // //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// // //             <input
// // //               type="tel"
// // //               placeholder="+61 400 000 000"
// // //               value={phone}
// // //               onChange={(e) => setPhone(e.target.value)}
// // //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "13px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#E8ECF0", outline: "none", width: "100%" }}
// // //             />
// // //             <button
// // //               onClick={handleSend}
// // //               disabled={!phone || sent}
// // //               style={{ background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8", color: "#fff", border: "none", borderRadius: 8, padding: "14px 0", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", cursor: phone && !sent ? "pointer" : "default", transition: "all 0.2s" }}
// // //             >
// // //               {sent ? "✓  Sent Successfully" : "Send via SMS"}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {activeTab === "qr" && (
// // //           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
// // //             <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "inline-block", border: "1px solid rgba(0,0,0,0.05)" }}>
// // //               <svg width={120} height={120} viewBox="0 0 120 120" style={{ display: "block" }}>
// // //                 <rect width="120" height="120" fill="white" />
// // //                 {[[0, 0], [0, 90], [90, 0]].map(([x, y], i) => (
// // //                   <g key={i}>
// // //                     <rect x={x + 5} y={y + 5} width={25} height={25} fill="black" rx={2} />
// // //                     <rect x={x + 8} y={y + 8} width={19} height={19} fill="white" rx={1} />
// // //                     <rect x={x + 11} y={y + 11} width={13} height={13} fill="black" rx={1} />
// // //                   </g>
// // //                 ))}
// // //                 {Array.from({ length: 36 }).map((_, i) => {
// // //                   const col = i % 6;
// // //                   const row = Math.floor(i / 6);
// // //                   if ((col < 3 && row < 3) || (col < 3 && row > 2) || (col > 2 && row < 3)) return null;
// // //                   const visible = (i * 7 + 3) % 5 > 1;
// // //                   return visible ? <rect key={i} x={35 + col * 8 + (col > 3 ? 10 : 0)} y={35 + row * 8 + (row > 3 ? 10 : 0)} width={5} height={5} fill="black" rx={0.5} /> : null;
// // //                 })}
// // //                 <text x={60} y={112} textAnchor="middle" fontSize={7} fill="#555">bydfairfield.com.au</text>
// // //               </svg>
// // //             </div>
// // //             <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", textAlign: "center", maxWidth: 220, lineHeight: 1.6 }}>
// // //               Scan with your phone to continue exploring on your own device.
// // //             </p>
// // //           </div>
// // //         )}

// // //         <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(0,168,232,0.05)", border: "1px solid rgba(0,168,232,0.1)", borderRadius: 8 }}>
// // //           <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
// // //           <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#4B5563", margin: 0, lineHeight: 1.5 }}>
// // //             Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong> · 415 Heidelberg Road, Fairfield VIC 3078
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Message Bubble ───────────────────────────────────────────────────────────
// // // function MessageBubble({ message, isLatest }: { message: Message; isLatest: boolean }) {
// // //   const isUser = message.role === "user";

// // //   const renderContent = (text: string) => {
// // //     return text.split("\n").map((line, i, arr) => {
// // //       const parts = line.split(/\*\*(.*?)\*\*/g);
// // //       return (
// // //         <span key={i}>
// // //           {parts.map((part, j) =>
// // //             j % 2 === 1 ? (
// // //               <strong key={j} style={{ color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0", fontWeight: 700 }}>{part}</strong>
// // //             ) : part
// // //           )}
// // //           {i < arr.length - 1 && <br />}
// // //         </span>
// // //       );
// // //     });
// // //   };

// // //   return (
// // //     <div
// // //       style={{
// // //         display: "flex",
// // //         flexDirection: isUser ? "row-reverse" : "row",
// // //         alignItems: "flex-end",
// // //         gap: 10,
// // //         marginBottom: 16,
// // //         animation: isLatest ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
// // //         opacity: isLatest ? 0 : 1,
// // //       }}
// // //     >
// // //       {!isUser && (
// // //         <div style={{
// // //           width: 30,
// // //           height: 30,
// // //           borderRadius: "50%",
// // //           background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           flexShrink: 0,
// // //           fontSize: 11,
// // //           fontWeight: 900,
// // //           color: "#fff",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //           letterSpacing: "0.08em",
// // //           border: "1px solid rgba(0,168,232,0.3)",
// // //         }}>
// // //           BYD
// // //         </div>
// // //       )}

// // //       <div style={{
// // //         maxWidth: "78%",
// // //         padding: isUser ? "10px 16px" : "12px 16px",
// // //         borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
// // //         background: isUser
// // //           ? "linear-gradient(135deg, #00A8E8, #0066B3)"
// // //           : "rgba(255,255,255,0.04)",
// // //         border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
// // //         fontFamily: "'Barlow', sans-serif",
// // //         fontSize: 13.5,
// // //         lineHeight: 1.7,
// // //         color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
// // //         fontWeight: 400,
// // //         boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
// // //       }}>
// // //         {renderContent(message.content)}
// // //       </div>

// // //       {isUser && (
// // //         <div style={{
// // //           width: 28,
// // //           height: 28,
// // //           borderRadius: "50%",
// // //           background: "rgba(255,255,255,0.06)",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           flexShrink: 0,
// // //           border: "1px solid rgba(255,255,255,0.08)",
// // //         }}>
// // //           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
// // //             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
// // //             <circle cx="12" cy="7" r="4" />
// // //           </svg>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // ─── Typing Indicator ─────────────────────────────────────────────────────────
// // // function TypingIndicator() {
// // //   return (
// // //     <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 16 }}>
// // //       <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 900, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", border: "1px solid rgba(0,168,232,0.3)" }}>BYD</div>
// // //       <div style={{ padding: "12px 18px", borderRadius: "4px 16px 16px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 6, alignItems: "center" }}>
// // //         {[0, 1, 2].map((i) => (
// // //           <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E8", animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite` }} />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Suggestion Pills ─────────────────────────────────────────────────────────
// // // function SuggestionPills({ suggestions, onSelect, label }: { suggestions: string[]; onSelect: (s: string) => void; label: string }) {
// // //   return (
// // //     <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
// // //       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
// // //         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
// // //         <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#374151" }}>{label}</span>
// // //         <div style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }} />
// // //       </div>
// // //       <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
// // //         {suggestions.map((s) => (
// // //           <button
// // //             key={s}
// // //             onClick={() => onSelect(s)}
// // //             style={{
// // //               padding: "7px 13px",
// // //               background: "rgba(255,255,255,0.03)",
// // //               border: "1px solid rgba(255,255,255,0.07)",
// // //               borderRadius: 20,
// // //               fontFamily: "'Barlow', sans-serif",
// // //               fontSize: 12,
// // //               color: "#6B7280",
// // //               cursor: "pointer",
// // //               transition: "all 0.2s",
// // //               textAlign: "left",
// // //               lineHeight: 1.3,
// // //             }}
// // //             onMouseEnter={(e) => {
// // //               const el = e.currentTarget as HTMLButtonElement;
// // //               el.style.background = "rgba(0,168,232,0.08)";
// // //               el.style.borderColor = "rgba(0,168,232,0.3)";
// // //               el.style.color = "#E8ECF0";
// // //             }}
// // //             onMouseLeave={(e) => {
// // //               const el = e.currentTarget as HTMLButtonElement;
// // //               el.style.background = "rgba(255,255,255,0.03)";
// // //               el.style.borderColor = "rgba(255,255,255,0.07)";
// // //               el.style.color = "#6B7280";
// // //             }}
// // //           >
// // //             {s}
// // //           </button>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Main Chatbot Component ───────────────────────────────────────────────────
// // // interface BYDChatbotProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   carContext?: string;
// // //   /** Context hint for showing relevant suggestions e.g. "specs" | "models" | "configurator" | "technology" | "safety" */
// // //   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// // // }

// // // export default function BYDChatbot({ isOpen, onClose, carContext, suggestionContext }: BYDChatbotProps) {
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [input, setInput] = useState("");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showShare, setShowShare] = useState(false);
// // //   const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>([]);
// // //   const [hasStarted, setHasStarted] = useState(false);
// // //   const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
// // //     CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]
// // //   );
// // //   const [showSuggestions, setShowSuggestions] = useState(true);

// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const inputRef = useRef<HTMLTextAreaElement>(null);

// // //   useEffect(() => {
// // //     if (isOpen && messages.length === 0) {
// // //       const carName = carContext ?? "BYD vehicle";
// // //       const welcomeMsg: Message = {
// // //         id: "welcome",
// // //         role: "assistant",
// // //         content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carName}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
// // //         timestamp: new Date(),
// // //       };
// // //       setMessages([welcomeMsg]);
// // //     }
// // //   }, [isOpen, carContext]);

// // //   useEffect(() => {
// // //     // Update suggestions when context changes (e.g. user opened from specs section)
// // //     if (suggestionContext) {
// // //       setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default);
// // //     }
// // //   }, [suggestionContext]);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, isLoading]);

// // //   useEffect(() => {
// // //     if (isOpen) setTimeout(() => inputRef.current?.focus(), 320);
// // //   }, [isOpen]);

// // //   const sendMessage = useCallback(
// // //     async (text: string) => {
// // //       const trimmed = text.trim();
// // //       if (!trimmed || isLoading) return;

// // //       setHasStarted(true);
// // //       setShowSuggestions(false);
// // //       setInput("");

// // //       const userMsg: Message = {
// // //         id: `user-${Date.now()}`,
// // //         role: "user",
// // //         content: trimmed,
// // //         timestamp: new Date(),
// // //       };

// // //       setMessages((prev) => [...prev, userMsg]);
// // //       setIsLoading(true);

// // //       const newHistory: ConversationHistoryItem[] = [
// // //         ...conversationHistory,
// // //         { role: "user", content: trimmed },
// // //       ];

// // //       try {
// // //         const response = await fetch("https://byd-backend.omnisuiteai.com/api/chatbot", {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({
// // //             message: trimmed,
// // //             conversationHistory,
// // //             carContext: carContext ?? null,
// // //           }),
// // //         });

// // //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// // //         const data = await response.json();

// // //         if (data.success && data.response) {
// // //           const assistantMsg: Message = {
// // //             id: `assistant-${Date.now()}`,
// // //             role: "assistant",
// // //             content: data.response,
// // //             timestamp: new Date(),
// // //           };
// // //           setMessages((prev) => [...prev, assistantMsg]);
// // //           setConversationHistory([...newHistory, { role: "assistant", content: data.response }]);
// // //           // Show follow-up suggestions after first exchange
// // //           setShowSuggestions(true);
// // //           setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
// // //         } else {
// // //           throw new Error(data.error || "Unknown error");
// // //         }
// // //       } catch {
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           {
// // //             id: `err-${Date.now()}`,
// // //             role: "assistant",
// // //             content: "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
// // //             timestamp: new Date(),
// // //           },
// // //         ]);
// // //       } finally {
// // //         setIsLoading(false);
// // //         inputRef.current?.focus();
// // //       }
// // //     },
// // //     [isLoading, conversationHistory, carContext, suggestionContext]
// // //   );

// // //   const handleReset = () => {
// // //     setMessages([]);
// // //     setConversationHistory([]);
// // //     setHasStarted(false);
// // //     setInput("");
// // //     setShowSuggestions(true);
// // //     setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
// // //     setTimeout(() => {
// // //       setMessages([{
// // //         id: "welcome-reset",
// // //         role: "assistant",
// // //         content: "Fresh start! What would you like to explore about the " + (carContext ?? "BYD range") + "?",
// // //         timestamp: new Date(),
// // //       }]);
// // //     }, 50);
// // //   };

// // //   const conversationSummary = messages
// // //     .slice(0, 6)
// // //     .map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content.slice(0, 80)}`)
// // //     .join("\n");

// // //   if (!isOpen) return null;

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @keyframes msgIn {
// // //           from { opacity: 0; transform: translateY(10px) scale(0.98); }
// // //           to { opacity: 1; transform: translateY(0) scale(1); }
// // //         }
// // //         @keyframes dotBounce {
// // //           0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
// // //           30% { transform: translateY(-6px); opacity: 1; }
// // //         }
// // //         @keyframes chatPanelUp {
// // //           from { transform: translateY(100%); opacity: 0; }
// // //           to { transform: translateY(0); opacity: 1; }
// // //         }
// // //         @keyframes overlayIn {
// // //           from { opacity: 0; }
// // //           to { opacity: 1; }
// // //         }
// // //         .byd-input:focus { outline: none; }
// // //         .byd-input::placeholder { color: rgba(255,255,255,0.18); }
// // //         .byd-scroll::-webkit-scrollbar { width: 2px; }
// // //         .byd-scroll::-webkit-scrollbar-track { background: transparent; }
// // //         .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
// // //         .byd-send:not(:disabled):hover { background: #0090CC !important; }
// // //         .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
// // //       `}</style>

// // //       {/* Backdrop */}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           inset: 0,
// // //           zIndex: 900,
// // //           background: "rgba(0,0,0,0.6)",
// // //           backdropFilter: "blur(6px)",
// // //           animation: "overlayIn 0.25s ease forwards",
// // //         }}
// // //         onClick={onClose}
// // //       />

// // //       {/* Chat Panel */}
// // //       <div
// // //         style={{
// // //           position: "fixed",
// // //           bottom: 0,
// // //           left: 0,
// // //           right: 0,
// // //           zIndex: 950,
// // //           height: "91dvh",
// // //           maxHeight: 720,
// // //           background: "#080A0E",
// // //           borderTop: "1px solid rgba(0,168,232,0.12)",
// // //           borderLeft: "1px solid rgba(0,168,232,0.06)",
// // //           borderRight: "1px solid rgba(0,168,232,0.06)",
// // //           borderRadius: "20px 20px 0 0",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           fontFamily: "'Barlow Condensed', sans-serif",
// // //           animation: "chatPanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
// // //           overflow: "hidden",
// // //         }}
// // //       >
// // //         {/* Ambient top glow line */}
// // //         <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)", flexShrink: 0 }} />

// // //         {/* Header */}
// // //         <div style={{
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "space-between",
// // //           padding: "14px 16px",
// // //           borderBottom: "1px solid rgba(255,255,255,0.05)",
// // //           background: "rgba(8,10,14,0.9)",
// // //           backdropFilter: "blur(20px)",
// // //           flexShrink: 0,
// // //         }}>
// // //           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// // //             {/* BYD emblem */}
// // //             <div style={{
// // //               width: 38,
// // //               height: 38,
// // //               borderRadius: 10,
// // //               background: "linear-gradient(145deg, #00A8E8, #004E8C)",
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "center",
// // //               flexShrink: 0,
// // //               border: "1px solid rgba(0,168,232,0.4)",
// // //               boxShadow: "0 0 16px rgba(0,168,232,0.12)",
// // //             }}>
// // //               <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
// // //                 <text x="4" y="25" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fontSize="26" fill="white" letterSpacing="-1">BYD</text>
// // //               </svg>
// // //             </div>
// // //             <div>
// // //               <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8ECF0", lineHeight: 1.1 }}>
// // //                 BYD Assistant
// // //               </div>
// // //               <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
// // //                 <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
// // //                 <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#4B5563", fontWeight: 400 }}>
// // //                   Online · BYD Fairfield
// // //                   {carContext && (
// // //                     <span style={{ color: "#00A8E8", marginLeft: 4 }}>· {carContext}</span>
// // //                   )}
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
// // //             {hasStarted && (
// // //               <button
// // //                 onClick={() => setShowShare(true)}
// // //                 className="byd-icon-btn"
// // //                 style={{
// // //                   background: "rgba(0,168,232,0.08)",
// // //                   border: "1px solid rgba(0,168,232,0.2)",
// // //                   borderRadius: 8,
// // //                   padding: "6px 12px",
// // //                   fontFamily: "'Barlow Condensed', sans-serif",
// // //                   fontWeight: 700,
// // //                   fontSize: 10,
// // //                   letterSpacing: "0.18em",
// // //                   textTransform: "uppercase",
// // //                   color: "#00A8E8",
// // //                   cursor: "pointer",
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: 6,
// // //                   transition: "all 0.2s",
// // //                 }}
// // //               >
// // //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// // //                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
// // //                   <polyline points="16 6 12 2 8 6" />
// // //                   <line x1="12" y1="2" x2="12" y2="15" />
// // //                 </svg>
// // //                 Share
// // //               </button>
// // //             )}
// // //             {hasStarted && (
// // //               <button
// // //                 onClick={handleReset}
// // //                 className="byd-icon-btn"
// // //                 title="New conversation"
// // //                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
// // //               >
// // //                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// // //                   <polyline points="23 4 23 10 17 10" />
// // //                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
// // //                 </svg>
// // //               </button>
// // //             )}
// // //             <button
// // //               onClick={onClose}
// // //               className="byd-icon-btn"
// // //               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4B5563", transition: "all 0.2s" }}
// // //             >
// // //               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// // //                 <line x1="18" y1="6" x2="6" y2="18" />
// // //                 <line x1="6" y1="6" x2="18" y2="18" />
// // //               </svg>
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Journey Guide — pre-conversation */}
// // //         {!hasStarted && (
// // //           <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
// // //             <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "#374151", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
// // //               Where are you in your journey?
// // //             </div>
// // //             <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2 }}>
// // //               {JOURNEY_STAGES.map((stage) => (
// // //                 <button
// // //                   key={stage.label}
// // //                   onClick={() => sendMessage(stage.prompt)}
// // //                   style={{
// // //                     flexShrink: 0,
// // //                     padding: "7px 14px",
// // //                     background: "transparent",
// // //                     border: "1px solid rgba(255,255,255,0.09)",
// // //                     borderRadius: 20,
// // //                     fontFamily: "'Barlow Condensed', sans-serif",
// // //                     fontWeight: 700,
// // //                     fontSize: 10,
// // //                     letterSpacing: "0.15em",
// // //                     textTransform: "uppercase",
// // //                     color: "#6B7280",
// // //                     cursor: "pointer",
// // //                     transition: "all 0.2s",
// // //                   }}
// // //                   onMouseEnter={(e) => {
// // //                     const el = e.currentTarget as HTMLButtonElement;
// // //                     el.style.borderColor = "rgba(0,168,232,0.4)";
// // //                     el.style.color = "#00A8E8";
// // //                     el.style.background = "rgba(0,168,232,0.07)";
// // //                   }}
// // //                   onMouseLeave={(e) => {
// // //                     const el = e.currentTarget as HTMLButtonElement;
// // //                     el.style.borderColor = "rgba(255,255,255,0.09)";
// // //                     el.style.color = "#6B7280";
// // //                     el.style.background = "transparent";
// // //                   }}
// // //                 >
// // //                   {stage.label}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Messages */}
// // //         <div
// // //           className="byd-scroll"
// // //           style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}
// // //         >
// // //           {messages.map((msg, i) => (
// // //             <MessageBubble key={msg.id} message={msg} isLatest={i === messages.length - 1} />
// // //           ))}
// // //           {isLoading && <TypingIndicator />}
// // //           <div ref={messagesEndRef} />
// // //         </div>

// // //         {/* Contextual Suggestions */}
// // //         {showSuggestions && !isLoading && messages.length > 0 && (
// // //           <SuggestionPills
// // //             label={hasStarted ? "Follow-up questions" : "Common questions"}
// // //             suggestions={currentSuggestions}
// // //             onSelect={sendMessage}
// // //           />
// // //         )}

// // //         {/* Input */}
// // //         <div style={{
// // //           padding: "10px 14px 18px",
// // //           borderTop: "1px solid rgba(255,255,255,0.05)",
// // //           background: "rgba(8,10,14,0.98)",
// // //           flexShrink: 0,
// // //         }}>
// // //           <div style={{
// // //             display: "flex",
// // //             gap: 10,
// // //             alignItems: "flex-end",
// // //             background: "rgba(255,255,255,0.04)",
// // //             border: "1px solid rgba(255,255,255,0.08)",
// // //             borderRadius: 12,
// // //             padding: "10px 10px 10px 16px",
// // //             transition: "border-color 0.2s",
// // //           }}
// // //             onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,168,232,0.4)"; }}
// // //             onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
// // //           >
// // //             <textarea
// // //               ref={inputRef}
// // //               className="byd-input"
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === "Enter" && !e.shiftKey) {
// // //                   e.preventDefault();
// // //                   sendMessage(input);
// // //                 }
// // //               }}
// // //               placeholder={carContext ? `Ask about the ${carContext}…` : "Ask anything about BYD vehicles…"}
// // //               rows={1}
// // //               style={{
// // //                 flex: 1,
// // //                 background: "transparent",
// // //                 border: "none",
// // //                 outline: "none",
// // //                 fontFamily: "'Barlow', sans-serif",
// // //                 fontSize: 14,
// // //                 color: "#E8ECF0",
// // //                 resize: "none",
// // //                 lineHeight: 1.55,
// // //                 maxHeight: 84,
// // //                 overflowY: "auto",
// // //                 paddingTop: 1,
// // //               }}
// // //               onInput={(e) => {
// // //                 const t = e.target as HTMLTextAreaElement;
// // //                 t.style.height = "auto";
// // //                 t.style.height = `${Math.min(t.scrollHeight, 84)}px`;
// // //               }}
// // //             />
// // //             <button
// // //               className="byd-send"
// // //               onClick={() => sendMessage(input)}
// // //               disabled={!input.trim() || isLoading}
// // //               style={{
// // //                 width: 36,
// // //                 height: 36,
// // //                 borderRadius: 9,
// // //                 border: "none",
// // //                 background: input.trim() && !isLoading ? "#00A8E8" : "rgba(255,255,255,0.06)",
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 cursor: input.trim() && !isLoading ? "pointer" : "default",
// // //                 transition: "all 0.2s",
// // //                 flexShrink: 0,
// // //                 boxShadow: input.trim() && !isLoading ? "0 4px 14px rgba(0,168,232,0.3)" : "none",
// // //               }}
// // //             >
// // //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isLoading ? "#fff" : "#374151"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
// // //                 <line x1="22" y1="2" x2="11" y2="13" />
// // //                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
// // //               </svg>
// // //             </button>
// // //           </div>

// // //           <div style={{ textAlign: "center", marginTop: 8, fontFamily: "'Barlow', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.14)", letterSpacing: "0.06em" }}>
// // //             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showShare && <ShareModal onClose={() => setShowShare(false)} conversationSummary={conversationSummary} />}
// // //     </>
// // //   );
// // // }

// // // // ─── Floating Trigger Button ──────────────────────────────────────────────────
// // // export function BYDChatbotButton({ carContext, suggestionContext }: {
// // //   carContext?: string;
// // //   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// // // }) {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [pulse, setPulse] = useState(true);

// // //   useEffect(() => {
// // //     const t = setTimeout(() => setPulse(false), 3000);
// // //     return () => clearTimeout(t);
// // //   }, []);

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @keyframes ringPulse {
// // //           0% { transform: scale(1); opacity: 0.5; }
// // //           70% { transform: scale(1.6); opacity: 0; }
// // //           100% { transform: scale(1.6); opacity: 0; }
// // //         }
// // //         .byd-fab-ring {
// // //           position: absolute;
// // //           inset: -2px;
// // //           border-radius: 50%;
// // //           border: 2px solid rgba(0,168,232,0.5);
// // //           animation: ringPulse 2s ease-out 0.5s 2 forwards;
// // //           pointer-events: none;
// // //         }
// // //       `}</style>
// // //       <button
// // //         onClick={() => setIsOpen(true)}
// // //         style={{
// // //           position: "fixed",
// // //           bottom: 100,
// // //           right: 16,
// // //           zIndex: 800,
// // //           width: 52,
// // //           height: 52,
// // //           borderRadius: "50%",
// // //           background: "linear-gradient(145deg, #00A8E8, #004E8C)",
// // //           border: "1px solid rgba(0,168,232,0.5)",
// // //           cursor: "pointer",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //           boxShadow: "0 4px 20px rgba(0,168,232,0.35), 0 0 0 0 rgba(0,168,232,0)",
// // //           transition: "transform 0.2s, box-shadow 0.2s",
// // //         }}
// // //         onMouseEnter={(e) => {
// // //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
// // //           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,168,232,0.5)";
// // //         }}
// // //         onMouseLeave={(e) => {
// // //           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
// // //           (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,168,232,0.35)";
// // //         }}
// // //         title="Ask BYD Assistant"
// // //       >
// // //         {pulse && <div className="byd-fab-ring" />}
// // //         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
// // //           <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
// // //         </svg>
// // //       </button>

// // //       <BYDChatbot
// // //         isOpen={isOpen}
// // //         onClose={() => setIsOpen(false)}
// // //         carContext={carContext}
// // //         suggestionContext={suggestionContext}
// // //       />
// // //     </>
// // //   );
// // // }

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
// //   { label: "Purchase", prompt: "What are my options to finance, order or test drive?" },
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
//   {
//     label: "Discover",
//     prompt: "What makes this BYD special compared to other EVs?",
//   },
//   {
//     label: "Compare",
//     prompt: "How does this compare to similar models in the range?",
//   },
//   {
//     label: "Configure",
//     prompt: "Help me choose the right variant, colour and extras",
//   },
//   {
//     label: "Purchase",
//     prompt: "What are my options to finance, order or test drive?",
//   },
// ];

// // ─── Share Modal ──────────────────────────────────────────────────────────────
// function ShareModal({ onClose, conversationSummary }: ShareModalProps) {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);
//   const [activeTab, setActiveTab] = useState<"sms" | "email" | "qr">("email");

//   const handleSend = () => {
//     setSent(true);
//     setTimeout(() => {
//       setSent(false);
//       onClose();
//     }, 2000);
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
//         <div
//           style={{
//             width: 40,
//             height: 3,
//             background: "rgba(255,255,255,0.12)",
//             borderRadius: 2,
//             margin: "12px auto 24px",
//           }}
//         />

//         <h3
//           style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 800,
//             fontSize: 22,
//             letterSpacing: "0.06em",
//             textTransform: "uppercase",
//             color: "#E8ECF0",
//             marginBottom: 4,
//           }}
//         >
//           Continue Your Journey
//         </h3>
//         <p
//           style={{
//             fontFamily: "'Barlow', sans-serif",
//             fontSize: 13,
//             color: "#4B5563",
//             marginBottom: 24,
//             lineHeight: 1.5,
//           }}
//         >
//           Send this conversation to your device to explore further at home.
//         </p>

//         <div
//           style={{
//             display: "flex",
//             gap: 4,
//             marginBottom: 24,
//             background: "rgba(255,255,255,0.03)",
//             borderRadius: 8,
//             padding: 4,
//             border: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
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
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 borderRadius: 8,
//                 padding: "13px 16px",
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 14,
//                 color: "#E8ECF0",
//                 outline: "none",
//                 width: "100%",
//               }}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!email || sent}
//               style={{
//                 background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 padding: "14px 0",
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 13,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 cursor: email && !sent ? "pointer" : "default",
//                 transition: "all 0.2s",
//               }}
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
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 borderRadius: 8,
//                 padding: "13px 16px",
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 14,
//                 color: "#E8ECF0",
//                 outline: "none",
//                 width: "100%",
//               }}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!phone || sent}
//               style={{
//                 background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 8,
//                 padding: "14px 0",
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 13,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 cursor: phone && !sent ? "pointer" : "default",
//                 transition: "all 0.2s",
//               }}
//             >
//               {sent ? "✓  Sent Successfully" : "Send via SMS"}
//             </button>
//           </div>
//         )}

//         {activeTab === "qr" && (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >
//             <div
//               style={{
//                 background: "#fff",
//                 borderRadius: 12,
//                 padding: 14,
//                 display: "inline-block",
//                 border: "1px solid rgba(0,0,0,0.05)",
//               }}
//             >
//               <svg
//                 width={120}
//                 height={120}
//                 viewBox="0 0 120 120"
//                 style={{ display: "block" }}
//               >
//                 <rect width="120" height="120" fill="white" />
//                 {[
//                   [0, 0],
//                   [0, 90],
//                   [90, 0],
//                 ].map(([x, y], i) => (
//                   <g key={i}>
//                     <rect
//                       x={x + 5}
//                       y={y + 5}
//                       width={25}
//                       height={25}
//                       fill="black"
//                       rx={2}
//                     />
//                     <rect
//                       x={x + 8}
//                       y={y + 8}
//                       width={19}
//                       height={19}
//                       fill="white"
//                       rx={1}
//                     />
//                     <rect
//                       x={x + 11}
//                       y={y + 11}
//                       width={13}
//                       height={13}
//                       fill="black"
//                       rx={1}
//                     />
//                   </g>
//                 ))}
//                 {Array.from({ length: 36 }).map((_, i) => {
//                   const col = i % 6;
//                   const row = Math.floor(i / 6);
//                   if (
//                     (col < 3 && row < 3) ||
//                     (col < 3 && row > 2) ||
//                     (col > 2 && row < 3)
//                   )
//                     return null;
//                   const visible = (i * 7 + 3) % 5 > 1;
//                   return visible ? (
//                     <rect
//                       key={i}
//                       x={35 + col * 8 + (col > 3 ? 10 : 0)}
//                       y={35 + row * 8 + (row > 3 ? 10 : 0)}
//                       width={5}
//                       height={5}
//                       fill="black"
//                       rx={0.5}
//                     />
//                   ) : null;
//                 })}
//                 <text
//                   x={60}
//                   y={112}
//                   textAnchor="middle"
//                   fontSize={7}
//                   fill="#555"
//                 >
//                   bydfairfield.com.au
//                 </text>
//               </svg>
//             </div>
//             <p
//               style={{
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 12,
//                 color: "#4B5563",
//                 textAlign: "center",
//                 maxWidth: 220,
//                 lineHeight: 1.6,
//               }}
//             >
//               Scan with your phone to continue exploring on your own device.
//             </p>
//           </div>
//         )}

//         <div
//           style={{
//             marginTop: 20,
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             padding: "12px 16px",
//             background: "rgba(0,168,232,0.05)",
//             border: "1px solid rgba(0,168,232,0.1)",
//             borderRadius: 8,
//           }}
//         >
//           <div
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: "50%",
//               background: "#22c55e",
//               flexShrink: 0,
//             }}
//           />
//           <p
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 12,
//               color: "#4B5563",
//               margin: 0,
//               lineHeight: 1.5,
//             }}
//           >
//             Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>{" "}
//             · 415 Heidelberg Road, Fairfield VIC 3078
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Message Bubble ───────────────────────────────────────────────────────────
// function MessageBubble({
//   message,
//   isLatest,
// }: {
//   message: Message;
//   isLatest: boolean;
// }) {
//   const isUser = message.role === "user";

//   const renderContent = (text: string) => {
//     return text.split("\n").map((line, i, arr) => {
//       const parts = line.split(/\*\*(.*?)\*\*/g);
//       return (
//         <span key={i}>
//           {parts.map((part, j) =>
//             j % 2 === 1 ? (
//               <strong
//                 key={j}
//                 style={{
//                   color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0",
//                   fontWeight: 700,
//                 }}
//               >
//                 {part}
//               </strong>
//             ) : (
//               part
//             ),
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
//         animation: isLatest
//           ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards"
//           : "none",
//         opacity: isLatest ? 0 : 1,
//       }}
//     >
//       {!isUser && (
//         <div
//           style={{
//             width: 30,
//             height: 30,
//             borderRadius: "50%",
//             background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//             fontSize: 11,
//             fontWeight: 900,
//             color: "#fff",
//             fontFamily: "'Barlow Condensed', sans-serif",
//             letterSpacing: "0.08em",
//             border: "1px solid rgba(0,168,232,0.3)",
//           }}
//         >
//           BYD
//         </div>
//       )}

//       <div
//         style={{
//           maxWidth: "78%",
//           padding: isUser ? "10px 16px" : "12px 16px",
//           borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
//           background: isUser
//             ? "linear-gradient(135deg, #00A8E8, #0066B3)"
//             : "rgba(255,255,255,0.04)",
//           border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
//           fontFamily: "'Barlow', sans-serif",
//           fontSize: 13.5,
//           lineHeight: 1.7,
//           color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
//           fontWeight: 400,
//           boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
//         }}
//       >
//         {renderContent(message.content)}
//       </div>

//       {isUser && (
//         <div
//           style={{
//             width: 28,
//             height: 28,
//             borderRadius: "50%",
//             background: "rgba(255,255,255,0.06)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="rgba(255,255,255,0.5)"
//             strokeWidth={2}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
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
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-end",
//         gap: 10,
//         marginBottom: 16,
//       }}
//     >
//       <div
//         style={{
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
//         }}
//       >
//         BYD
//       </div>
//       <div
//         style={{
//           padding: "12px 18px",
//           borderRadius: "4px 16px 16px 16px",
//           background: "rgba(255,255,255,0.04)",
//           border: "1px solid rgba(255,255,255,0.07)",
//           display: "flex",
//           gap: 6,
//           alignItems: "center",
//         }}
//       >
//         {[0, 1, 2].map((i) => (
//           <div
//             key={i}
//             style={{
//               width: 5,
//               height: 5,
//               borderRadius: "50%",
//               background: "#00A8E8",
//               animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Suggestion Pills ─────────────────────────────────────────────────────────
// function SuggestionPills({
//   suggestions,
//   onSelect,
//   label,
// }: {
//   suggestions: string[];
//   onSelect: (s: string) => void;
//   label: string;
// }) {
//   return (
//     <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           marginBottom: 10,
//         }}
//       >
//         <div
//           style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
//         />
//         <span
//           style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 9,
//             letterSpacing: "0.25em",
//             textTransform: "uppercase",
//             color: "#374151",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {label}
//         </span>
//         <div
//           style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
//         />
//       </div>

//       <div
//         className="byd-suggestions-scroll"
//         style={{
//           display: "flex",
//           flexWrap: "nowrap",
//           gap: 8,
//           overflowX: "auto",
//           overflowY: "hidden",
//           WebkitOverflowScrolling: "touch",
//           paddingBottom: 4,
//           scrollSnapType: "x proximity",
//         }}
//       >
//         {suggestions.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSelect(s)}
//             style={{
//               flex: "0 0 auto",
//               whiteSpace: "nowrap",
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
//               scrollSnapAlign: "start",
//               maxWidth: "80vw",
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

// export default function BYDChatbot({
//   isOpen,
//   onClose,
//   carContext,
//   suggestionContext,
// }: BYDChatbotProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showShare, setShowShare] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState<
//     ConversationHistoryItem[]
//   >([]);
//   const [hasStarted, setHasStarted] = useState(false);
//   const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
//     CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
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
//     if (suggestionContext) {
//       setCurrentSuggestions(
//         CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default,
//       );
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
//         const response = await fetch(
//           "https://byd-backend.omnisuiteai.com/api/chatbot",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               message: trimmed,
//               conversationHistory,
//               carContext: carContext ?? null,
//             }),
//           },
//         );

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
//           setConversationHistory([
//             ...newHistory,
//             { role: "assistant", content: data.response },
//           ]);
//           setShowSuggestions(true);
//           setCurrentSuggestions(
//             CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
//           );
//         } else {
//           throw new Error(data.error || "Unknown error");
//         }
//       } catch {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `err-${Date.now()}`,
//             role: "assistant",
//             content:
//               "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
//             timestamp: new Date(),
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//         inputRef.current?.focus();
//       }
//     },
//     [isLoading, conversationHistory, carContext, suggestionContext],
//   );

//   const handleReset = () => {
//     setMessages([]);
//     setConversationHistory([]);
//     setHasStarted(false);
//     setInput("");
//     setShowSuggestions(true);
//     setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
//     setTimeout(() => {
//       setMessages([
//         {
//           id: "welcome-reset",
//           role: "assistant",
//           content:
//             "Fresh start! What would you like to explore about the " +
//             (carContext ?? "BYD range") +
//             "?",
//           timestamp: new Date(),
//         },
//       ]);
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
//         .byd-suggestions-scroll::-webkit-scrollbar { height: 2px; }
//         .byd-suggestions-scroll::-webkit-scrollbar-track { background: transparent; }
//         .byd-suggestions-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
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
//         <div
//           style={{
//             height: 1,
//             background:
//               "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)",
//             flexShrink: 0,
//           }}
//         />

//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "14px 16px",
//             borderBottom: "1px solid rgba(255,255,255,0.05)",
//             background: "rgba(8,10,14,0.9)",
//             backdropFilter: "blur(20px)",
//             flexShrink: 0,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 38,
//                 height: 38,
//                 borderRadius: 10,
//                 background: "linear-gradient(145deg, #00A8E8, #004E8C)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//                 border: "1px solid rgba(0,168,232,0.4)",
//                 boxShadow: "0 0 16px rgba(0,168,232,0.12)",
//               }}
//             >
//               <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
//                 <text
//                   x="4"
//                   y="25"
//                   fontFamily="'Barlow Condensed',sans-serif"
//                   fontWeight="900"
//                   fontSize="26"
//                   fill="white"
//                   letterSpacing="-1"
//                 >
//                   BYD
//                 </text>
//               </svg>
//             </div>
//             <div>
//               <div
//                 style={{
//                   fontWeight: 800,
//                   fontSize: 15,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#E8ECF0",
//                   lineHeight: 1.1,
//                 }}
//               >
//                 BYD Assistant
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   marginTop: 3,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#22c55e",
//                     boxShadow: "0 0 6px rgba(34,197,94,0.6)",
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Barlow', sans-serif",
//                     fontSize: 11,
//                     color: "#4B5563",
//                     fontWeight: 400,
//                   }}
//                 >
//                   Online · BYD Fairfield
//                   {carContext && (
//                     <span style={{ color: "#00A8E8", marginLeft: 4 }}>
//                       · {carContext}
//                     </span>
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
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
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
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                   borderRadius: 8,
//                   width: 32,
//                   height: 32,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#4B5563",
//                   transition: "all 0.2s",
//                 }}
//               >
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="23 4 23 10 17 10" />
//                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
//                 </svg>
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="byd-icon-btn"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 borderRadius: 8,
//                 width: 32,
//                 height: 32,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#4B5563",
//                 transition: "all 0.2s",
//               }}
//             >
//               <svg
//                 width="13"
//                 height="13"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Journey Guide — pre-conversation */}
//         {!hasStarted && (
//           <div
//             style={{
//               padding: "12px 16px",
//               borderBottom: "1px solid rgba(255,255,255,0.04)",
//               flexShrink: 0,
//             }}
//           >
//             <div
//               style={{
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 10,
//                 color: "#374151",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 marginBottom: 8,
//               }}
//             >
//               Where are you in your journey?
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 7,
//                 overflowX: "auto",
//                 paddingBottom: 2,
//                 WebkitOverflowScrolling: "touch",
//               }}
//             >
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
//             <MessageBubble
//               key={msg.id}
//               message={msg}
//               isLatest={i === messages.length - 1}
//             />
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
//         <div
//           style={{
//             padding: "10px 14px 18px",
//             borderTop: "1px solid rgba(255,255,255,0.05)",
//             background: "rgba(8,10,14,0.98)",
//             flexShrink: 0,
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               gap: 10,
//               alignItems: "flex-end",
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(255,255,255,0.08)",
//               borderRadius: 12,
//               padding: "10px 10px 10px 16px",
//               transition: "border-color 0.2s",
//             }}
//             onFocusCapture={(e) => {
//               (e.currentTarget as HTMLDivElement).style.borderColor =
//                 "rgba(0,168,232,0.4)";
//             }}
//             onBlurCapture={(e) => {
//               (e.currentTarget as HTMLDivElement).style.borderColor =
//                 "rgba(255,255,255,0.08)";
//             }}
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
//               placeholder={
//                 carContext
//                   ? `Ask about the ${carContext}…`
//                   : "Ask anything about BYD vehicles…"
//               }
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
//                 background:
//                   input.trim() && !isLoading
//                     ? "#00A8E8"
//                     : "rgba(255,255,255,0.06)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: input.trim() && !isLoading ? "pointer" : "default",
//                 transition: "all 0.2s",
//                 flexShrink: 0,
//                 boxShadow:
//                   input.trim() && !isLoading
//                     ? "0 4px 14px rgba(0,168,232,0.3)"
//                     : "none",
//               }}
//             >
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke={input.trim() && !isLoading ? "#fff" : "#374151"}
//                 strokeWidth={2.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="22" y1="2" x2="11" y2="13" />
//                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
//               </svg>
//             </button>
//           </div>

//           <div
//             style={{
//               textAlign: "center",
//               marginTop: 8,
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 10,
//               color: "rgba(255,255,255,0.14)",
//               letterSpacing: "0.06em",
//             }}
//           >
//             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
//           </div>
//         </div>
//       </div>

//       {showShare && (
//         <ShareModal
//           onClose={() => setShowShare(false)}
//           conversationSummary={conversationSummary}
//         />
//       )}
//     </>
//   );
// }

// // ─── Floating Trigger Button ──────────────────────────────────────────────────
// export function BYDChatbotButton({
//   carContext,
//   suggestionContext,
// }: {
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
//           boxShadow:
//             "0 4px 20px rgba(0,168,232,0.35), 0 0 0 0 rgba(0,168,232,0)",
//           transition: "transform 0.2s, box-shadow 0.2s",
//         }}
//         onMouseEnter={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform =
//             "scale(1.08)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow =
//             "0 8px 28px rgba(0,168,232,0.5)";
//         }}
//         onMouseLeave={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow =
//             "0 4px 20px rgba(0,168,232,0.35)";
//         }}
//         title="Ask BYD Assistant"
//       >
//         {pulse && <div className="byd-fab-ring" />}
//         <svg
//           width="22"
//           height="22"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#fff"
//           strokeWidth={1.8}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
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

// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import { io, Socket } from "socket.io-client";

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

// type VoiceState = "idle" | "connecting" | "active" | "agent-speaking" | "error";

// interface VoiceTranscript {
//   role: "user" | "agent";
//   text: string;
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
//   {
//     label: "Discover",
//     prompt: "What makes this BYD special compared to other EVs?",
//   },
//   {
//     label: "Compare",
//     prompt: "How does this compare to similar models in the range?",
//   },
//   {
//     label: "Configure",
//     prompt: "Help me choose the right variant, colour and extras",
//   },
//   {
//     label: "Purchase",
//     prompt: "What are my options to finance, order or test drive?",
//   },
// ];

// // ─── Voice Server URL ─────────────────────────────────────────────────────────
// const VOICE_SERVER_URL =
//   typeof window !== "undefined"
//     ? "https://byd-voice.omnisuiteai.com"
//     : "http://localhost:4000";

// // ─── Voice Agent Hook ─────────────────────────────────────────────────────────
// function useVoiceAgent() {
//   const [voiceState, setVoiceState] = useState<VoiceState>("idle");
//   const [agentTranscript, setAgentTranscript] = useState("");
//   const [userTranscript, setUserTranscript] = useState("");
//   const [transcriptLog, setTranscriptLog] = useState<VoiceTranscript[]>([]);
//   const [volumeLevel, setVolumeLevel] = useState(0);

//   const socketRef = useRef<Socket | null>(null);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const mediaStreamRef = useRef<MediaStream | null>(null);
//   const processorRef = useRef<ScriptProcessorNode | null>(null);
//   const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
//   const agentTranscriptRef = useRef("");
//   // Queue holds scheduled end-time so we chain buffers gaplessly
//   const nextPlayTimeRef = useRef(0);
//   const analyserRef = useRef<AnalyserNode | null>(null);
//   const animFrameRef = useRef<number>(0);
//   const voiceStateRef = useRef<VoiceState>("idle");

//   // Keep ref in sync so callbacks always see latest state
//   useEffect(() => {
//     voiceStateRef.current = voiceState;
//   }, [voiceState]);

//   // ── Stop microphone capture ──────────────────────────────────────────────
//   const stopMic = useCallback(() => {
//     try {
//       processorRef.current?.disconnect();
//     } catch (_) {}
//     try {
//       sourceRef.current?.disconnect();
//     } catch (_) {}
//     if (mediaStreamRef.current) {
//       mediaStreamRef.current.getTracks().forEach((t) => t.stop());
//       mediaStreamRef.current = null;
//     }
//     processorRef.current = null;
//     sourceRef.current = null;
//     analyserRef.current = null;
//   }, []);

//   // ── Schedule PCM16 chunk via Web Audio clock (gap-free) ─────────────────
//   const playPcm16Chunk = useCallback((base64: string) => {
//     const ctx = audioContextRef.current;
//     if (!ctx) return;

//     const raw = atob(base64);
//     const bytes = new Uint8Array(raw.length);
//     for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

//     const pcm16 = new Int16Array(bytes.buffer);
//     const float32 = new Float32Array(pcm16.length);
//     for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;

//     const buf = ctx.createBuffer(1, float32.length, 16000);
//     buf.getChannelData(0).set(float32);

//     const src = ctx.createBufferSource();
//     src.buffer = buf;
//     src.connect(ctx.destination);

//     const now = ctx.currentTime;
//     const startAt = Math.max(now, nextPlayTimeRef.current);
//     src.start(startAt);
//     nextPlayTimeRef.current = startAt + buf.duration;
//   }, []);

//   // ── Volume tracker via analyser ──────────────────────────────────────────
//   const trackVolume = useCallback(() => {
//     if (!analyserRef.current) return;
//     const data = new Uint8Array(analyserRef.current.frequencyBinCount);
//     analyserRef.current.getByteFrequencyData(data);
//     const avg = data.reduce((a, b) => a + b, 0) / data.length;
//     setVolumeLevel(Math.min(100, avg * 1.5));
//     animFrameRef.current = requestAnimationFrame(trackVolume);
//   }, []);

//   const startMic = useCallback(async (socket: Socket) => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: {
//         sampleRate: 24000,
//         channelCount: 1,
//         echoCancellation: true,
//         noiseSuppression: true,
//       },
//       video: false,
//     });
//     mediaStreamRef.current = stream;

//     const ctx = audioContextRef.current!;
//     const src = ctx.createMediaStreamSource(stream);
//     sourceRef.current = src;

//     const analyser = ctx.createAnalyser();
//     analyser.fftSize = 256;
//     analyserRef.current = analyser;
//     src.connect(analyser);

//     // ScriptProcessor for PCM capture — NOTE: do NOT connect to ctx.destination
//     // to avoid mic playback echo. We only use it to read input data.
//     const processor = ctx.createScriptProcessor(4096, 1, 1);
//     processorRef.current = processor;

//     processor.onaudioprocess = (e) => {
//       if (voiceStateRef.current === "idle") return;
//       const input = e.inputBuffer.getChannelData(0);
//       const pcm16 = new Int16Array(input.length);
//       for (let i = 0; i < input.length; i++) {
//         pcm16[i] = Math.max(-32768, Math.min(32767, input[i] * 32767));
//       }
//       // btoa with typed array via Uint8Array view
//       const bytes = new Uint8Array(pcm16.buffer);
//       let binary = "";
//       for (let i = 0; i < bytes.byteLength; i++)
//         binary += String.fromCharCode(bytes[i]);
//       const base64 = btoa(binary);
//       socket.emit("audio-chunk", { audio: base64 });
//     };

//     // Connect src → analyser → processor (no destination — avoids echo)
//     analyser.connect(processor);
//     // processor needs to be connected to *something* in the graph to fire,
//     // but we use a silent GainNode set to 0 so no audio leaks to speakers
//     const silentGain = ctx.createGain();
//     silentGain.gain.value = 0;
//     processor.connect(silentGain);
//     silentGain.connect(ctx.destination);
//   }, []);

//   // ── Connect to voice server
//   const connect = useCallback(async () => {
//     if (voiceStateRef.current !== "idle" && voiceStateRef.current !== "error")
//       return;

//     setVoiceState("connecting");
//     setTranscriptLog([]);
//     agentTranscriptRef.current = "";
//     setAgentTranscript("");
//     setUserTranscript("");
//     nextPlayTimeRef.current = 0;

//     try {
//       const socket: Socket = io(VOICE_SERVER_URL, {
//         transports: ["websocket"],
//         reconnection: false,
//       });
//       socketRef.current = socket;

//       audioContextRef.current = new AudioContext({ sampleRate: 24000 });
//       if (audioContextRef.current.state === "suspended") {
//         await audioContextRef.current.resume();
//       }

//       socket.on("connect", () => {
//         socket.emit("start-session");
//       });

//       socket.on("session-started", async () => {
//         setVoiceState("active");
//         try {
//           await startMic(socket);
//           trackVolume();
//         } catch (micErr) {
//           console.error("Mic access denied:", micErr);
//           setVoiceState("error");
//         }
//       });

//       socket.on("audio-delta", ({ delta }: { delta: string }) => {
//         setVoiceState((prev) =>
//           prev === "active" || prev === "agent-speaking"
//             ? "agent-speaking"
//             : prev,
//         );
//         playPcm16Chunk(delta);
//       });

//       socket.on("speech-started", () => {
//         // User interrupted — reset playback clock so agent audio stops scheduling
//         nextPlayTimeRef.current = 0;
//         if (audioContextRef.current) {
//           // Re-sync clock to now to discard queued audio
//           nextPlayTimeRef.current = audioContextRef.current.currentTime;
//         }
//         setVoiceState("active");
//         agentTranscriptRef.current = "";
//         setAgentTranscript("");
//       });

//       socket.on("transcript-done", ({ transcript }: { transcript: string }) => {
//         if (transcript?.trim()) {
//           setTranscriptLog((prev) => [
//             ...prev,
//             { role: "agent", text: transcript },
//           ]);
//           agentTranscriptRef.current = "";
//           setAgentTranscript("");
//           setTimeout(
//             () =>
//               setVoiceState((prev) =>
//                 prev === "agent-speaking" ? "active" : prev,
//               ),
//             600,
//           );
//         }
//       });

//       socket.on("user-transcript", ({ transcript }: { transcript: string }) => {
//         if (transcript?.trim()) {
//           setUserTranscript(transcript);
//           setTranscriptLog((prev) => [
//             ...prev,
//             { role: "user", text: transcript },
//           ]);
//           setTimeout(() => setUserTranscript(""), 2500);
//         }
//       });

//       socket.on("transcript-delta", ({ delta }: { delta: string }) => {
//         agentTranscriptRef.current += delta;
//         setAgentTranscript(agentTranscriptRef.current);
//       });

//       socket.on(
//         "realtime-error",
//         ({ error }: { error: { message: string } }) => {
//           console.error("Voice error:", error);
//           setVoiceState("error");
//         },
//       );

//       socket.on("session-closed", () => {
//         setVoiceState("idle");
//       });

//       socket.on("connect_error", (err) => {
//         console.error("Socket connect error:", err.message);
//         setVoiceState("error");
//       });

//       socket.on("disconnect", () => {
//         setVoiceState((prev) => (prev !== "idle" ? "error" : "idle"));
//       });
//     } catch (err) {
//       console.error("Voice connect failed:", err);
//       setVoiceState("error");
//     }
//   }, [startMic, playPcm16Chunk, trackVolume]);

//   // ── Disconnect and clean up all resources ───────────────────────────────
//   const disconnect = useCallback(() => {
//     cancelAnimationFrame(animFrameRef.current);
//     stopMic();
//     nextPlayTimeRef.current = 0;

//     if (socketRef.current) {
//       socketRef.current.emit("end-session");
//       socketRef.current.removeAllListeners();
//       socketRef.current.disconnect();
//       socketRef.current = null;
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close().catch(() => {});
//       audioContextRef.current = null;
//     }

//     setVoiceState("idle");
//     setVolumeLevel(0);
//     agentTranscriptRef.current = "";
//     setAgentTranscript("");
//     setUserTranscript("");
//   }, [stopMic]);

//   // Cleanup on unmount
//   useEffect(() => () => disconnect(), [disconnect]);

//   return {
//     voiceState,
//     agentTranscript,
//     userTranscript,
//     transcriptLog,
//     volumeLevel,
//     connect,
//     disconnect,
//   };
// }

// // ─── Voice Modal ──────────────────────────────────────────────────────────────
// function VoiceModal({
//   onClose,
//   carContext,
// }: {
//   onClose: () => void;
//   carContext?: string;
// }) {
//   const {
//     voiceState,
//     agentTranscript,
//     userTranscript,
//     transcriptLog,
//     volumeLevel,
//     connect,
//     disconnect,
//   } = useVoiceAgent();

//   const transcriptEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [transcriptLog, agentTranscript]);

//   // Auto-connect when modal opens
//   useEffect(() => {
//     connect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClose = () => {
//     disconnect();
//     onClose();
//   };

//   const statusLabel: Record<VoiceState, string> = {
//     idle: "Tap to start voice call",
//     connecting: "Connecting to BYD Assistant…",
//     active: "Listening…",
//     "agent-speaking": "BYD Assistant speaking",
//     error: "Connection failed — tap to retry",
//   };

//   const statusColor: Record<VoiceState, string> = {
//     idle: "#4B5563",
//     connecting: "#F59E0B",
//     active: "#22C55E",
//     "agent-speaking": "#00A8E8",
//     error: "#EF4444",
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         zIndex: 1100,
//         background: "rgba(0,0,0,0.88)",
//         backdropFilter: "blur(12px)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "flex-end",
//       }}
//       onClick={(e) => {
//         if (e.target === e.currentTarget) handleClose();
//       }}
//     >
//       <style>{`
//         @keyframes voicePanelUp {
//           from { transform: translateY(100%); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         @keyframes ring {
//           0% { transform: scale(1); opacity: 0.55; }
//           100% { transform: scale(2.8); opacity: 0; }
//         }
//         @keyframes pulseGlow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(0,168,232,0.45); }
//           50% { box-shadow: 0 0 0 22px rgba(0,168,232,0); }
//         }
//         @keyframes speakingWave {
//           0%, 100% { transform: scaleY(0.35); }
//           50% { transform: scaleY(1); }
//         }
//         @keyframes dotBounceV {
//           0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
//           30% { transform: translateY(-6px); opacity: 1; }
//         }
//         .voice-bar { animation: speakingWave 0.75s ease-in-out infinite; transform-origin: bottom; }
//         .voice-bar:nth-child(1) { animation-delay: 0s; }
//         .voice-bar:nth-child(2) { animation-delay: 0.1s; }
//         .voice-bar:nth-child(3) { animation-delay: 0.2s; }
//         .voice-bar:nth-child(4) { animation-delay: 0.15s; }
//         .voice-bar:nth-child(5) { animation-delay: 0.05s; }
//         .voice-dot-bounce { animation: dotBounceV 1.4s ease-in-out infinite; }
//       `}</style>

//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%",
//           maxWidth: 480,
//           background: "linear-gradient(180deg, #0D1117 0%, #080A0E 100%)",
//           border: "1px solid rgba(0,168,232,0.12)",
//           borderBottom: "none",
//           borderRadius: "24px 24px 0 0",
//           padding: "8px 0 48px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           animation: "voicePanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
//           overflow: "hidden",
//           minHeight: 520,
//         }}
//       >
//         {/* Drag pill */}
//         <div
//           style={{
//             width: 40,
//             height: 3,
//             background: "rgba(255,255,255,0.1)",
//             borderRadius: 2,
//             margin: "12px auto 20px",
//           }}
//         />

//         {/* Header */}
//         <div
//           style={{ textAlign: "center", marginBottom: 28, padding: "0 24px" }}
//         >
//           <div
//             style={{
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 900,
//               fontSize: 11,
//               letterSpacing: "0.25em",
//               textTransform: "uppercase",
//               color: "#00A8E8",
//               marginBottom: 6,
//             }}
//           >
//             BYD Fairfield · Voice Assistant
//           </div>
//           <div
//             style={{
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 800,
//               fontSize: 22,
//               letterSpacing: "0.05em",
//               textTransform: "uppercase",
//               color: "#E8ECF0",
//             }}
//           >
//             {carContext ? `Ask about the ${carContext}` : "Talk to us"}
//           </div>
//         </div>

//         {/* Voice orb */}
//         <div
//           style={{
//             position: "relative",
//             width: 120,
//             height: 120,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: 24,
//           }}
//         >
//           {[0, 1, 2].map((i) => (
//             <div
//               key={i}
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 borderRadius: "50%",
//                 border: `2px solid ${statusColor[voiceState]}`,
//                 opacity:
//                   voiceState === "active" || voiceState === "agent-speaking"
//                     ? 0.5
//                     : 0,
//                 animation:
//                   voiceState === "active" || voiceState === "agent-speaking"
//                     ? `ring 2s ease-out ${i * 0.65}s infinite`
//                     : "none",
//                 pointerEvents: "none",
//               }}
//             />
//           ))}

//           <button
//             onClick={() => {
//               if (voiceState === "idle" || voiceState === "error") connect();
//             }}
//             disabled={
//               voiceState === "connecting" ||
//               voiceState === "active" ||
//               voiceState === "agent-speaking"
//             }
//             style={{
//               width: 100,
//               height: 100,
//               borderRadius: "50%",
//               border: "none",
//               background:
//                 voiceState === "idle" || voiceState === "error"
//                   ? "linear-gradient(145deg, #00A8E8, #004E8C)"
//                   : voiceState === "connecting"
//                     ? "linear-gradient(145deg, #F59E0B, #92400E)"
//                     : "linear-gradient(145deg, #22C55E, #166534)",
//               cursor:
//                 voiceState === "idle" || voiceState === "error"
//                   ? "pointer"
//                   : "default",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: `0 0 40px ${statusColor[voiceState]}44`,
//               transition: "all 0.4s ease",
//               animation:
//                 voiceState === "active"
//                   ? "pulseGlow 2s ease-in-out infinite"
//                   : "none",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {(voiceState === "idle" || voiceState === "error") && (
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth={1.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                 <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                 <line x1="12" y1="19" x2="12" y2="23" />
//                 <line x1="8" y1="23" x2="16" y2="23" />
//               </svg>
//             )}
//             {voiceState === "connecting" && (
//               <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
//                 {[0, 1, 2].map((i) => (
//                   <div
//                     key={i}
//                     className="voice-dot-bounce"
//                     style={{
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       background: "white",
//                       animationDelay: `${i * 0.18}s`,
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//             {voiceState === "active" && (
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth={1.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                 <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                 <line x1="12" y1="19" x2="12" y2="23" />
//                 <line x1="8" y1="23" x2="16" y2="23" />
//               </svg>
//             )}
//             {voiceState === "agent-speaking" && (
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 4,
//                   alignItems: "center",
//                   height: 28,
//                 }}
//               >
//                 {[0, 1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="voice-bar"
//                     style={{
//                       width: 4,
//                       height: 20,
//                       background: "white",
//                       borderRadius: 2,
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </button>
//         </div>

//         {/* Status indicator */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 7,
//             marginBottom: 20,
//           }}
//         >
//           <div
//             style={{
//               width: 7,
//               height: 7,
//               borderRadius: "50%",
//               background: statusColor[voiceState],
//               flexShrink: 0,
//             }}
//           />
//           <span
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 13,
//               color: statusColor[voiceState],
//               letterSpacing: "0.02em",
//             }}
//           >
//             {statusLabel[voiceState]}
//           </span>
//         </div>

//         {/* Volume bar — only when user is speaking */}
//         <div
//           style={{
//             width: 200,
//             height: 3,
//             background: "rgba(255,255,255,0.06)",
//             borderRadius: 2,
//             marginBottom: 20,
//             overflow: "hidden",
//             opacity: voiceState === "active" ? 1 : 0,
//             transition: "opacity 0.3s",
//           }}
//         >
//           <div
//             style={{
//               height: "100%",
//               width: `${volumeLevel}%`,
//               background: "linear-gradient(90deg, #22C55E, #00A8E8)",
//               borderRadius: 2,
//               transition: "width 0.08s ease",
//             }}
//           />
//         </div>

//         {/* Transcript scroll area */}
//         <div
//           style={{
//             width: "100%",
//             flex: 1,
//             padding: "0 20px",
//             display: "flex",
//             flexDirection: "column",
//             gap: 8,
//             overflowY: "auto",
//             maxHeight: 220,
//           }}
//         >
//           {transcriptLog.length === 0 &&
//             (voiceState === "active" ||
//               voiceState === "agent-speaking" ||
//               voiceState === "connecting") && (
//               <div
//                 style={{
//                   textAlign: "center",
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 13,
//                   color: "#374151",
//                   fontStyle: "italic",
//                   padding: "16px 0",
//                 }}
//               >
//                 {voiceState === "connecting"
//                   ? "Connecting, please wait…"
//                   : "The assistant will greet you shortly…"}
//               </div>
//             )}

//           {transcriptLog.map((entry, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 flexDirection: entry.role === "user" ? "row-reverse" : "row",
//                 gap: 8,
//                 alignItems: "flex-end",
//               }}
//             >
//               <div
//                 style={{
//                   maxWidth: "80%",
//                   padding: "8px 13px",
//                   borderRadius:
//                     entry.role === "user"
//                       ? "14px 14px 3px 14px"
//                       : "3px 14px 14px 14px",
//                   background:
//                     entry.role === "user"
//                       ? "rgba(0,168,232,0.15)"
//                       : "rgba(255,255,255,0.04)",
//                   border:
//                     entry.role === "user"
//                       ? "1px solid rgba(0,168,232,0.25)"
//                       : "1px solid rgba(255,255,255,0.07)",
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 12.5,
//                   color: entry.role === "user" ? "#93C5FD" : "#9CA3AF",
//                   lineHeight: 1.55,
//                 }}
//               >
//                 {entry.text}
//               </div>
//             </div>
//           ))}

//           {/* Live streaming agent transcript */}
//           {agentTranscript && voiceState === "agent-speaking" && (
//             <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
//               <div
//                 style={{
//                   maxWidth: "80%",
//                   padding: "8px 13px",
//                   borderRadius: "3px 14px 14px 14px",
//                   background: "rgba(0,168,232,0.08)",
//                   border: "1px solid rgba(0,168,232,0.18)",
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 12.5,
//                   color: "#93C5FD",
//                   lineHeight: 1.55,
//                   fontStyle: "italic",
//                 }}
//               >
//                 {agentTranscript}
//                 <span style={{ opacity: 0.5 }}>▋</span>
//               </div>
//             </div>
//           )}

//           {/* Live user transcript */}
//           {userTranscript && (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row-reverse",
//                 gap: 8,
//                 alignItems: "flex-end",
//               }}
//             >
//               <div
//                 style={{
//                   maxWidth: "80%",
//                   padding: "8px 13px",
//                   borderRadius: "14px 14px 3px 14px",
//                   background: "rgba(34,197,94,0.1)",
//                   border: "1px solid rgba(34,197,94,0.2)",
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 12.5,
//                   color: "#86EFAC",
//                   lineHeight: 1.55,
//                   fontStyle: "italic",
//                 }}
//               >
//                 {userTranscript}
//               </div>
//             </div>
//           )}

//           <div ref={transcriptEndRef} />
//         </div>

//         {/* End call */}
//         <button
//           onClick={handleClose}
//           style={{
//             marginTop: 20,
//             padding: "11px 36px",
//             background: "rgba(239,68,68,0.1)",
//             border: "1px solid rgba(239,68,68,0.3)",
//             borderRadius: 50,
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 11,
//             letterSpacing: "0.2em",
//             textTransform: "uppercase",
//             color: "#EF4444",
//             cursor: "pointer",
//             transition: "background 0.2s",
//           }}
//           onMouseEnter={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.background =
//               "rgba(239,68,68,0.22)";
//           }}
//           onMouseLeave={(e) => {
//             (e.currentTarget as HTMLButtonElement).style.background =
//               "rgba(239,68,68,0.1)";
//           }}
//         >
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Share Modal ──────────────────────────────────────────────────────────────
// function ShareModal({
//   onClose,
//   conversationSummary: _conversationSummary,
// }: ShareModalProps) {
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);

//   const handleSend = () => {
//     setSent(true);
//     setTimeout(() => {
//       setSent(false);
//       onClose();
//     }, 2000);
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
//         <div
//           style={{
//             width: 40,
//             height: 3,
//             background: "rgba(255,255,255,0.12)",
//             borderRadius: 2,
//             margin: "12px auto 24px",
//           }}
//         />
//         <h3
//           style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 800,
//             fontSize: 22,
//             letterSpacing: "0.06em",
//             textTransform: "uppercase",
//             color: "#E8ECF0",
//             marginBottom: 4,
//           }}
//         >
//           Continue Your Journey
//         </h3>
//         <p
//           style={{
//             fontFamily: "'Barlow', sans-serif",
//             fontSize: 13,
//             color: "#4B5563",
//             marginBottom: 24,
//             lineHeight: 1.5,
//           }}
//         >
//           Send this conversation to your device to explore further at home.
//         </p>
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           <input
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               border: "1px solid rgba(255,255,255,0.08)",
//               borderRadius: 8,
//               padding: "13px 16px",
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 14,
//               color: "#E8ECF0",
//               outline: "none",
//               width: "100%",
//               boxSizing: "border-box",
//             }}
//           />
//           <button
//             onClick={handleSend}
//             disabled={!email || sent}
//             style={{
//               background: sent ? "rgba(0,168,232,0.4)" : "#00A8E8",
//               color: "#fff",
//               border: "none",
//               borderRadius: 8,
//               padding: "14px 0",
//               fontFamily: "'Barlow Condensed', sans-serif",
//               fontWeight: 700,
//               fontSize: 13,
//               letterSpacing: "0.18em",
//               textTransform: "uppercase",
//               cursor: email && !sent ? "pointer" : "default",
//             }}
//           >
//             {sent ? "✓  Sent Successfully" : "Send to Email"}
//           </button>
//         </div>
//         <div
//           style={{
//             marginTop: 20,
//             display: "flex",
//             alignItems: "center",
//             gap: 12,
//             padding: "12px 16px",
//             background: "rgba(0,168,232,0.05)",
//             border: "1px solid rgba(0,168,232,0.1)",
//             borderRadius: 8,
//           }}
//         >
//           <div
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: "50%",
//               background: "#22c55e",
//               flexShrink: 0,
//             }}
//           />
//           <p
//             style={{
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 12,
//               color: "#4B5563",
//               margin: 0,
//               lineHeight: 1.5,
//             }}
//           >
//             Call us: <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>{" "}
//             · 415 Heidelberg Road, Fairfield VIC 3078
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Message Bubble ───────────────────────────────────────────────────────────
// function MessageBubble({
//   message,
//   isLatest,
// }: {
//   message: Message;
//   isLatest: boolean;
// }) {
//   const isUser = message.role === "user";
//   const renderContent = (text: string) =>
//     text.split("\n").map((line, i, arr) => {
//       const parts = line.split(/\*\*(.*?)\*\*/g);
//       return (
//         <span key={i}>
//           {parts.map((part, j) =>
//             j % 2 === 1 ? (
//               <strong
//                 key={j}
//                 style={{
//                   color: isUser ? "rgba(255,255,255,0.95)" : "#E8ECF0",
//                   fontWeight: 700,
//                 }}
//               >
//                 {part}
//               </strong>
//             ) : (
//               part
//             ),
//           )}
//           {i < arr.length - 1 && <br />}
//         </span>
//       );
//     });

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: isUser ? "row-reverse" : "row",
//         alignItems: "flex-end",
//         gap: 10,
//         marginBottom: 16,
//         animation: isLatest
//           ? "msgIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards"
//           : "none",
//         opacity: isLatest ? 0 : 1,
//       }}
//     >
//       {!isUser && (
//         <div
//           style={{
//             width: 30,
//             height: 30,
//             borderRadius: "50%",
//             background: "linear-gradient(135deg, #00A8E8 0%, #0066B3 100%)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//             fontSize: 11,
//             fontWeight: 900,
//             color: "#fff",
//             fontFamily: "'Barlow Condensed', sans-serif",
//             letterSpacing: "0.08em",
//             border: "1px solid rgba(0,168,232,0.3)",
//           }}
//         >
//           BYD
//         </div>
//       )}
//       <div
//         style={{
//           maxWidth: "78%",
//           padding: isUser ? "10px 16px" : "12px 16px",
//           borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
//           background: isUser
//             ? "linear-gradient(135deg, #00A8E8, #0066B3)"
//             : "rgba(255,255,255,0.04)",
//           border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
//           fontFamily: "'Barlow', sans-serif",
//           fontSize: 13.5,
//           lineHeight: 1.7,
//           color: isUser ? "rgba(255,255,255,0.95)" : "#9CA3AF",
//           boxShadow: isUser ? "0 4px 20px rgba(0,168,232,0.2)" : "none",
//         }}
//       >
//         {renderContent(message.content)}
//       </div>
//       {isUser && (
//         <div
//           style={{
//             width: 28,
//             height: 28,
//             borderRadius: "50%",
//             background: "rgba(255,255,255,0.06)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="rgba(255,255,255,0.5)"
//             strokeWidth={2}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//             <circle cx="12" cy="7" r="4" />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// }

// function TypingIndicator() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-end",
//         gap: 10,
//         marginBottom: 16,
//       }}
//     >
//       <div
//         style={{
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
//         }}
//       >
//         BYD
//       </div>
//       <div
//         style={{
//           padding: "12px 18px",
//           borderRadius: "4px 16px 16px 16px",
//           background: "rgba(255,255,255,0.04)",
//           border: "1px solid rgba(255,255,255,0.07)",
//           display: "flex",
//           gap: 6,
//           alignItems: "center",
//         }}
//       >
//         {[0, 1, 2].map((i) => (
//           <div
//             key={i}
//             style={{
//               width: 5,
//               height: 5,
//               borderRadius: "50%",
//               background: "#00A8E8",
//               animation: `dotBounce 1.4s ease-in-out ${i * 0.18}s infinite`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SuggestionPills({
//   suggestions,
//   onSelect,
//   label,
// }: {
//   suggestions: string[];
//   onSelect: (s: string) => void;
//   label: string;
// }) {
//   return (
//     <div style={{ padding: "0 16px 12px", flexShrink: 0 }}>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           marginBottom: 10,
//         }}
//       >
//         <div
//           style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
//         />
//         <span
//           style={{
//             fontFamily: "'Barlow Condensed', sans-serif",
//             fontWeight: 700,
//             fontSize: 9,
//             letterSpacing: "0.25em",
//             textTransform: "uppercase",
//             color: "#374151",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {label}
//         </span>
//         <div
//           style={{ height: 1, background: "rgba(0,168,232,0.15)", flex: 1 }}
//         />
//       </div>
//       <div
//         className="byd-suggestions-scroll"
//         style={{
//           display: "flex",
//           flexWrap: "nowrap",
//           gap: 8,
//           overflowX: "auto",
//           overflowY: "hidden",
//           WebkitOverflowScrolling: "touch" as any,
//           paddingBottom: 4,
//         }}
//       >
//         {suggestions.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSelect(s)}
//             style={{
//               flex: "0 0 auto",
//               whiteSpace: "nowrap",
//               padding: "7px 13px",
//               background: "rgba(255,255,255,0.03)",
//               border: "1px solid rgba(255,255,255,0.07)",
//               borderRadius: 20,
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 12,
//               color: "#6B7280",
//               cursor: "pointer",
//               transition: "all 0.2s",
//               lineHeight: 1.3,
//               maxWidth: "80vw",
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
//   suggestionContext?: keyof typeof CONTEXT_SUGGESTIONS;
// }

// export default function BYDChatbot({
//   isOpen,
//   onClose,
//   carContext,
//   suggestionContext,
// }: BYDChatbotProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showShare, setShowShare] = useState(false);
//   const [showVoice, setShowVoice] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState<
//     ConversationHistoryItem[]
//   >([]);
//   const [hasStarted, setHasStarted] = useState(false);
//   const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
//     CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
//   );
//   const [showSuggestions, setShowSuggestions] = useState(true);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([
//         {
//           id: "welcome",
//           role: "assistant",
//           content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carContext ?? "BYD vehicle"}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
//           timestamp: new Date(),
//         },
//       ]);
//     }
//   }, [isOpen, carContext, messages.length]);

//   useEffect(() => {
//     if (suggestionContext)
//       setCurrentSuggestions(
//         CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default,
//       );
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
//         const response = await fetch(
//           "https://byd-backend.omnisuiteai.com/api/chatbot",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               message: trimmed,
//               conversationHistory,
//               carContext: carContext ?? null,
//             }),
//           },
//         );
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
//           setConversationHistory([
//             ...newHistory,
//             { role: "assistant", content: data.response },
//           ]);
//           setShowSuggestions(true);
//           setCurrentSuggestions(
//             CONTEXT_SUGGESTIONS[suggestionContext ?? "default"],
//           );
//         } else throw new Error(data.error || "Unknown error");
//       } catch {
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `err-${Date.now()}`,
//             role: "assistant",
//             content:
//               "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
//             timestamp: new Date(),
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//         inputRef.current?.focus();
//       }
//     },
//     [isLoading, conversationHistory, carContext, suggestionContext],
//   );

//   const handleReset = () => {
//     setMessages([]);
//     setConversationHistory([]);
//     setHasStarted(false);
//     setInput("");
//     setShowSuggestions(true);
//     setCurrentSuggestions(CONTEXT_SUGGESTIONS[suggestionContext ?? "default"]);
//     setTimeout(() => {
//       setMessages([
//         {
//           id: "welcome-reset",
//           role: "assistant",
//           content: `Fresh start! What would you like to explore about the ${carContext ?? "BYD range"}?`,
//           timestamp: new Date(),
//         },
//       ]);
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
//         @keyframes msgIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
//         @keyframes dotBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-6px); opacity: 1; } }
//         @keyframes chatPanelUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes voiceButtonPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,168,232,0.5); } 50% { box-shadow: 0 0 0 8px rgba(0,168,232,0); } }
//         .byd-input:focus { outline: none; }
//         .byd-input::placeholder { color: rgba(255,255,255,0.18); }
//         .byd-scroll::-webkit-scrollbar { width: 2px; }
//         .byd-scroll::-webkit-scrollbar-track { background: transparent; }
//         .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
//         .byd-send:not(:disabled):hover { background: #0090CC !important; }
//         .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
//         .byd-suggestions-scroll::-webkit-scrollbar { height: 2px; }
//         .byd-voice-btn:hover { background: rgba(0,168,232,0.15) !important; border-color: rgba(0,168,232,0.5) !important; }
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
//         <div
//           style={{
//             height: 1,
//             background:
//               "linear-gradient(90deg, transparent, rgba(0,168,232,0.5), transparent)",
//             flexShrink: 0,
//           }}
//         />

//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "14px 16px",
//             borderBottom: "1px solid rgba(255,255,255,0.05)",
//             background: "rgba(8,10,14,0.9)",
//             backdropFilter: "blur(20px)",
//             flexShrink: 0,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div
//               style={{
//                 width: 38,
//                 height: 38,
//                 borderRadius: 10,
//                 background: "linear-gradient(145deg, #00A8E8, #004E8C)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//                 border: "1px solid rgba(0,168,232,0.4)",
//                 boxShadow: "0 0 16px rgba(0,168,232,0.12)",
//               }}
//             >
//               <svg width="20" height="14" viewBox="0 0 48 32" fill="none">
//                 <text
//                   x="4"
//                   y="25"
//                   fontFamily="'Barlow Condensed',sans-serif"
//                   fontWeight="900"
//                   fontSize="26"
//                   fill="white"
//                   letterSpacing="-1"
//                 >
//                   BYD
//                 </text>
//               </svg>
//             </div>
//             <div>
//               <div
//                 style={{
//                   fontWeight: 800,
//                   fontSize: 15,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#E8ECF0",
//                   lineHeight: 1.1,
//                 }}
//               >
//                 BYD Assistant
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   marginTop: 3,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#22c55e",
//                     boxShadow: "0 0 6px rgba(34,197,94,0.6)",
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontFamily: "'Barlow', sans-serif",
//                     fontSize: 11,
//                     color: "#4B5563",
//                     fontWeight: 400,
//                   }}
//                 >
//                   Online · BYD Fairfield
//                   {carContext && (
//                     <span style={{ color: "#00A8E8", marginLeft: 4 }}>
//                       · {carContext}
//                     </span>
//                   )}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//             {/* Voice button */}
//             <button
//               onClick={() => setShowVoice(true)}
//               className="byd-voice-btn"
//               title="Start voice call"
//               style={{
//                 background: "rgba(0,168,232,0.08)",
//                 border: "1px solid rgba(0,168,232,0.25)",
//                 borderRadius: 8,
//                 padding: "6px 12px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 6,
//                 cursor: "pointer",
//                 fontFamily: "'Barlow Condensed', sans-serif",
//                 fontWeight: 700,
//                 fontSize: 10,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 color: "#00A8E8",
//                 transition: "all 0.2s",
//                 animation: "voiceButtonPulse 3s ease-in-out infinite",
//               }}
//             >
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                 <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                 <line x1="12" y1="19" x2="12" y2="23" />
//                 <line x1="8" y1="23" x2="16" y2="23" />
//               </svg>
//               Voice
//             </button>

//             {hasStarted && (
//               <button
//                 onClick={() => setShowShare(true)}
//                 className="byd-icon-btn"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                   borderRadius: 8,
//                   width: 32,
//                   height: 32,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#4B5563",
//                   transition: "all 0.2s",
//                 }}
//               >
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
//                   <polyline points="16 6 12 2 8 6" />
//                   <line x1="12" y1="2" x2="12" y2="15" />
//                 </svg>
//               </button>
//             )}
//             {hasStarted && (
//               <button
//                 onClick={handleReset}
//                 className="byd-icon-btn"
//                 title="New conversation"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.07)",
//                   borderRadius: 8,
//                   width: 32,
//                   height: 32,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                   color: "#4B5563",
//                   transition: "all 0.2s",
//                 }}
//               >
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="23 4 23 10 17 10" />
//                   <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
//                 </svg>
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className="byd-icon-btn"
//               style={{
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 borderRadius: 8,
//                 width: 32,
//                 height: 32,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#4B5563",
//                 transition: "all 0.2s",
//               }}
//             >
//               <svg
//                 width="13"
//                 height="13"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Journey Guide + Voice CTA */}
//         {!hasStarted && (
//           <div
//             style={{
//               padding: "12px 16px",
//               borderBottom: "1px solid rgba(255,255,255,0.04)",
//               flexShrink: 0,
//             }}
//           >
//             <div
//               style={{
//                 fontFamily: "'Barlow', sans-serif",
//                 fontSize: 10,
//                 color: "#374151",
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 marginBottom: 8,
//               }}
//             >
//               Where are you in your journey?
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 7,
//                 overflowX: "auto",
//                 paddingBottom: 2,
//               }}
//             >
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
//             <div
//               style={{
//                 marginTop: 12,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 padding: "10px 14px",
//                 background: "rgba(0,168,232,0.06)",
//                 border: "1px solid rgba(0,168,232,0.12)",
//                 borderRadius: 10,
//                 cursor: "pointer",
//               }}
//               onClick={() => setShowVoice(true)}
//             >
//               <div
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: "50%",
//                   background: "linear-gradient(135deg, #00A8E8, #0066B3)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                   <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                   <line x1="12" y1="19" x2="12" y2="23" />
//                   <line x1="8" y1="23" x2="16" y2="23" />
//                 </svg>
//               </div>
//               <div>
//                 <div
//                   style={{
//                     fontFamily: "'Barlow Condensed', sans-serif",
//                     fontWeight: 700,
//                     fontSize: 12,
//                     color: "#E8ECF0",
//                     letterSpacing: "0.06em",
//                   }}
//                 >
//                   Prefer to talk? Try our Voice Assistant
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "'Barlow', sans-serif",
//                     fontSize: 11,
//                     color: "#4B5563",
//                     marginTop: 2,
//                   }}
//                 >
//                   Speak naturally — ask anything about any BYD model
//                 </div>
//               </div>
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#00A8E8"
//                 strokeWidth={2}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 style={{ marginLeft: "auto", flexShrink: 0 }}
//               >
//                 <polyline points="9 18 15 12 9 6" />
//               </svg>
//             </div>
//           </div>
//         )}

//         {/* Messages */}
//         <div
//           className="byd-scroll"
//           style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}
//         >
//           {messages.map((msg, i) => (
//             <MessageBubble
//               key={msg.id}
//               message={msg}
//               isLatest={i === messages.length - 1}
//             />
//           ))}
//           {isLoading && <TypingIndicator />}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Suggestions */}
//         {showSuggestions && !isLoading && messages.length > 0 && (
//           <SuggestionPills
//             label={hasStarted ? "Follow-up questions" : "Common questions"}
//             suggestions={currentSuggestions}
//             onSelect={sendMessage}
//           />
//         )}

//         {/* Input bar */}
//         <div
//           style={{
//             padding: "10px 14px 18px",
//             borderTop: "1px solid rgba(255,255,255,0.05)",
//             background: "rgba(8,10,14,0.98)",
//             flexShrink: 0,
//           }}
//         >
//           <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
//             {/* Inline mic button */}
//             <button
//               onClick={() => setShowVoice(true)}
//               title="Voice call"
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: 10,
//                 border: "1px solid rgba(0,168,232,0.2)",
//                 background: "rgba(0,168,232,0.07)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 flexShrink: 0,
//                 transition: "all 0.2s",
//                 color: "#00A8E8",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background =
//                   "rgba(0,168,232,0.16)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLButtonElement).style.background =
//                   "rgba(0,168,232,0.07)";
//               }}
//             >
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                 <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                 <line x1="12" y1="19" x2="12" y2="23" />
//                 <line x1="8" y1="23" x2="16" y2="23" />
//               </svg>
//             </button>

//             <div
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "flex-end",
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 borderRadius: 12,
//                 padding: "10px 10px 10px 16px",
//                 transition: "border-color 0.2s",
//               }}
//               onFocusCapture={(e) => {
//                 (e.currentTarget as HTMLDivElement).style.borderColor =
//                   "rgba(0,168,232,0.4)";
//               }}
//               onBlurCapture={(e) => {
//                 (e.currentTarget as HTMLDivElement).style.borderColor =
//                   "rgba(255,255,255,0.08)";
//               }}
//             >
//               <textarea
//                 ref={inputRef}
//                 className="byd-input"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     sendMessage(input);
//                   }
//                 }}
//                 placeholder={
//                   carContext
//                     ? `Ask about the ${carContext}…`
//                     : "Ask anything about BYD vehicles…"
//                 }
//                 rows={1}
//                 style={{
//                   flex: 1,
//                   background: "transparent",
//                   border: "none",
//                   outline: "none",
//                   fontFamily: "'Barlow', sans-serif",
//                   fontSize: 14,
//                   color: "#E8ECF0",
//                   resize: "none",
//                   lineHeight: 1.55,
//                   maxHeight: 84,
//                   overflowY: "auto",
//                   paddingTop: 1,
//                 }}
//                 onInput={(e) => {
//                   const t = e.target as HTMLTextAreaElement;
//                   t.style.height = "auto";
//                   t.style.height = `${Math.min(t.scrollHeight, 84)}px`;
//                 }}
//               />
//               <button
//                 className="byd-send"
//                 onClick={() => sendMessage(input)}
//                 disabled={!input.trim() || isLoading}
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 9,
//                   border: "none",
//                   background:
//                     input.trim() && !isLoading
//                       ? "#00A8E8"
//                       : "rgba(255,255,255,0.06)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: input.trim() && !isLoading ? "pointer" : "default",
//                   transition: "all 0.2s",
//                   flexShrink: 0,
//                   boxShadow:
//                     input.trim() && !isLoading
//                       ? "0 4px 14px rgba(0,168,232,0.3)"
//                       : "none",
//                 }}
//               >
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke={input.trim() && !isLoading ? "#fff" : "#374151"}
//                   strokeWidth={2.5}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="22" y1="2" x2="11" y2="13" />
//                   <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               marginTop: 8,
//               fontFamily: "'Barlow', sans-serif",
//               fontSize: 10,
//               color: "rgba(255,255,255,0.14)",
//               letterSpacing: "0.06em",
//             }}
//           >
//             BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
//           </div>
//         </div>
//       </div>

//       {showShare && (
//         <ShareModal
//           onClose={() => setShowShare(false)}
//           conversationSummary={conversationSummary}
//         />
//       )}
//       {showVoice && (
//         <VoiceModal
//           onClose={() => setShowVoice(false)}
//           carContext={carContext}
//         />
//       )}
//     </>
//   );
// }

// // ─── Floating FAB ─────────────────────────────────────────────────────────────
// export function BYDChatbotButton({
//   carContext,
//   suggestionContext,
// }: {
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
//         @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1.6); opacity: 0; } }
//         .byd-fab-ring { position: absolute; inset: -2px; border-radius: 50%; border: 2px solid rgba(0,168,232,0.5); animation: ringPulse 2s ease-out 0.5s 2 forwards; pointer-events: none; }
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
//           boxShadow: "0 4px 20px rgba(0,168,232,0.35)",
//           transition: "transform 0.2s, box-shadow 0.2s",
//         }}
//         onMouseEnter={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform =
//             "scale(1.08)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow =
//             "0 8px 28px rgba(0,168,232,0.5)";
//         }}
//         onMouseLeave={(e) => {
//           (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
//           (e.currentTarget as HTMLButtonElement).style.boxShadow =
//             "0 4px 20px rgba(0,168,232,0.35)";
//         }}
//         title="Ask BYD Assistant"
//       >
//         {pulse && <div className="byd-fab-ring" />}
//         <svg
//           width="22"
//           height="22"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#fff"
//           strokeWidth={1.8}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
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
import { io, Socket } from "socket.io-client";

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

type VoiceState = "idle" | "connecting" | "active" | "agent-speaking" | "error";

interface VoiceTranscript {
  role: "user" | "agent";
  text: string;
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

// ─── Voice Server URL ─────────────────────────────────────────────────────────
const VOICE_SERVER_URL =
  typeof window !== "undefined"
    ? "https://byd-voice.omnisuiteai.com"
    : "http://localhost:4030";

// ─── Voice Agent Hook ─────────────────────────────────────────────────────────
function useVoiceAgent() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [agentTranscript, setAgentTranscript] = useState("");
  const [userTranscript, setUserTranscript] = useState("");
  const [transcriptLog, setTranscriptLog] = useState<VoiceTranscript[]>([]);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const agentTranscriptRef = useRef("");
  const nextPlayTimeRef = useRef(0);
  // FIX: track every scheduled AudioBufferSourceNode so we can stop them
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const voiceStateRef = useRef<VoiceState>("idle");

  useEffect(() => {
    voiceStateRef.current = voiceState;
  }, [voiceState]);

  // ── Stop microphone capture ──────────────────────────────────────────────
  const stopMic = useCallback(() => {
    try {
      processorRef.current?.disconnect();
    } catch (_) {}
    try {
      sourceRef.current?.disconnect();
    } catch (_) {}
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    processorRef.current = null;
    sourceRef.current = null;
    analyserRef.current = null;
  }, []);

  // FIX: stop all scheduled-but-not-yet-played audio nodes immediately
  const stopAllScheduledAudio = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch (_) {}
    });
    activeSourcesRef.current = [];
    // Reset clock to NOW so next agent audio chains cleanly from current time
    if (audioContextRef.current) {
      nextPlayTimeRef.current = audioContextRef.current.currentTime;
    } else {
      nextPlayTimeRef.current = 0;
    }
  }, []);

  // ── Schedule PCM16 chunk via Web Audio clock (gap-free) ─────────────────
  const playPcm16Chunk = useCallback((base64: string) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const raw = atob(base64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;

    const buf = ctx.createBuffer(1, float32.length, 16000);
    buf.getChannelData(0).set(float32);

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);

    // FIX: register node and auto-remove when it finishes naturally
    activeSourcesRef.current.push(src);
    src.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(
        (s) => s !== src,
      );
    };

    const now = ctx.currentTime;
    const startAt = Math.max(now, nextPlayTimeRef.current);
    src.start(startAt);
    nextPlayTimeRef.current = startAt + buf.duration;
  }, []);

  // ── Volume tracker via analyser ──────────────────────────────────────────
  const trackVolume = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    setVolumeLevel(Math.min(100, avg * 1.5));
    animFrameRef.current = requestAnimationFrame(trackVolume);
  }, []);

  const startMic = useCallback(async (socket: Socket) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 24000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: false,
    });
    mediaStreamRef.current = stream;

    const ctx = audioContextRef.current!;
    const src = ctx.createMediaStreamSource(stream);
    sourceRef.current = src;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;
    src.connect(analyser);

    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (e) => {
      if (voiceStateRef.current === "idle") return;
      const input = e.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        pcm16[i] = Math.max(-32768, Math.min(32767, input[i] * 32767));
      }
      const bytes = new Uint8Array(pcm16.buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++)
        binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      socket.emit("audio-chunk", { audio: base64 });
    };

    analyser.connect(processor);
    const silentGain = ctx.createGain();
    silentGain.gain.value = 0;
    processor.connect(silentGain);
    silentGain.connect(ctx.destination);
  }, []);

  // ── Connect to voice server ──────────────────────────────────────────────
  const connect = useCallback(
    async (carContext?: string) => {
    if (voiceStateRef.current !== "idle" && voiceStateRef.current !== "error")
      return;

    setVoiceState("connecting");
    setTranscriptLog([]);
    agentTranscriptRef.current = "";
    setAgentTranscript("");
    setUserTranscript("");
    // FIX: reset to 0 at connect time; will be set to currentTime once ctx exists
    nextPlayTimeRef.current = 0;
    activeSourcesRef.current = [];

    try {
      const socket: Socket = io(VOICE_SERVER_URL, {
        transports: ["websocket"],
        reconnection: false,
      });
      socketRef.current = socket;

      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      socket.on("connect", () => {
        // Pass carContext so the backend knows which car page this session is for
        socket.emit("start-session", { carContext: carContext ?? null });
      });

      socket.on("session-started", async () => {
        setVoiceState("active");
        try {
          await startMic(socket);
          trackVolume();
        } catch (micErr) {
          console.error("Mic access denied:", micErr);
          setVoiceState("error");
        }
      });

      socket.on("audio-delta", ({ delta }: { delta: string }) => {
        setVoiceState((prev) =>
          prev === "active" || prev === "agent-speaking"
            ? "agent-speaking"
            : prev,
        );
        playPcm16Chunk(delta);
      });

      // FIX: use stopAllScheduledAudio to cancel pre-buffered agent audio
      socket.on("speech-started", () => {
        stopAllScheduledAudio();
        setVoiceState("active");
        agentTranscriptRef.current = "";
        setAgentTranscript("");
      });

        socket.on(
          "transcript-done",
          ({ transcript }: { transcript: string }) => {
        if (transcript?.trim()) {
          setTranscriptLog((prev) => [
            ...prev,
            { role: "agent", text: transcript },
          ]);
          agentTranscriptRef.current = "";
          setAgentTranscript("");
          setTimeout(
            () =>
              setVoiceState((prev) =>
                prev === "agent-speaking" ? "active" : prev,
              ),
            600,
          );
        }
          },
        );

        socket.on(
          "user-transcript",
          ({ transcript }: { transcript: string }) => {
        if (transcript?.trim()) {
          setUserTranscript(transcript);
          setTranscriptLog((prev) => [
            ...prev,
            { role: "user", text: transcript },
          ]);
          setTimeout(() => setUserTranscript(""), 2500);
        }
          },
        );

      socket.on("transcript-delta", ({ delta }: { delta: string }) => {
        agentTranscriptRef.current += delta;
        setAgentTranscript(agentTranscriptRef.current);
      });

      socket.on(
        "realtime-error",
        ({ error }: { error: { message: string } }) => {
          console.error("Voice error:", error);
          setVoiceState("error");
        },
      );

      socket.on("session-closed", () => {
        setVoiceState("idle");
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connect error:", err.message);
        setVoiceState("error");
      });

      socket.on("disconnect", () => {
        setVoiceState((prev) => (prev !== "idle" ? "error" : "idle"));
      });
    } catch (err) {
      console.error("Voice connect failed:", err);
      setVoiceState("error");
    }
  }, [startMic, playPcm16Chunk, trackVolume, stopAllScheduledAudio]);

  // ── Disconnect and clean up all resources ────────────────────────────────
  const disconnect = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    // FIX: stop all audio before tearing down
    stopAllScheduledAudio();
    stopMic();

    if (socketRef.current) {
      socketRef.current.emit("end-session");
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    setVoiceState("idle");
    setVolumeLevel(0);
    agentTranscriptRef.current = "";
    setAgentTranscript("");
    setUserTranscript("");
  }, [stopMic, stopAllScheduledAudio]);

  useEffect(() => () => disconnect(), [disconnect]);

  return {
    voiceState,
    agentTranscript,
    userTranscript,
    transcriptLog,
    volumeLevel,
    connect,
    disconnect,
  };
}

// ─── Voice Modal ──────────────────────────────────────────────────────────────
function VoiceModal({
  onClose,
  carContext,
}: {
  onClose: () => void;
  carContext?: string;
}) {
  const {
    voiceState,
    agentTranscript,
    userTranscript,
    transcriptLog,
    volumeLevel,
    connect,
    disconnect,
  } = useVoiceAgent();

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcriptLog, agentTranscript]);

  useEffect(() => {
    connect(carContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    disconnect();
    onClose();
  };

  const statusLabel: Record<VoiceState, string> = {
    idle: "Tap to start voice call",
    connecting: "Connecting to BYD Assistant…",
    active: "Listening…",
    "agent-speaking": "BYD Assistant speaking",
    error: "Connection failed — tap to retry",
  };

  const statusColor: Record<VoiceState, string> = {
    idle: "#4B5563",
    connecting: "#F59E0B",
    active: "#22C55E",
    "agent-speaking": "#00A8E8",
    error: "#EF4444",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <style>{`
        @keyframes voicePanelUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes ring {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,168,232,0.45); }
          50% { box-shadow: 0 0 0 22px rgba(0,168,232,0); }
        }
        @keyframes speakingWave {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @keyframes dotBounceV {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .voice-bar { animation: speakingWave 0.75s ease-in-out infinite; transform-origin: bottom; }
        .voice-bar:nth-child(1) { animation-delay: 0s; }
        .voice-bar:nth-child(2) { animation-delay: 0.1s; }
        .voice-bar:nth-child(3) { animation-delay: 0.2s; }
        .voice-bar:nth-child(4) { animation-delay: 0.15s; }
        .voice-bar:nth-child(5) { animation-delay: 0.05s; }
        .voice-dot-bounce { animation: dotBounceV 1.4s ease-in-out infinite; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "linear-gradient(180deg, #0D1117 0%, #080A0E 100%)",
          border: "1px solid rgba(0,168,232,0.12)",
          borderBottom: "none",
          borderRadius: "24px 24px 0 0",
          padding: "8px 0 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "voicePanelUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
          overflow: "hidden",
          minHeight: 520,
        }}
      >
        {/* Drag pill */}
        <div
          style={{
            width: 40,
            height: 3,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 2,
            margin: "12px auto 20px",
          }}
        />

        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: 28, padding: "0 24px" }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#00A8E8",
              marginBottom: 6,
            }}
          >
            BYD Fairfield · Voice Assistant
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#E8ECF0",
            }}
          >
            {carContext ? `Ask about the ${carContext}` : "Talk to us"}
          </div>
        </div>

        {/* Voice orb */}
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${statusColor[voiceState]}`,
                opacity:
                  voiceState === "active" || voiceState === "agent-speaking"
                    ? 0.5
                    : 0,
                animation:
                  voiceState === "active" || voiceState === "agent-speaking"
                    ? `ring 2s ease-out ${i * 0.65}s infinite`
                    : "none",
                pointerEvents: "none",
              }}
            />
          ))}

          <button
            onClick={() => {
              if (voiceState === "idle" || voiceState === "error") connect(carContext);
            }}
            disabled={
              voiceState === "connecting" ||
              voiceState === "active" ||
              voiceState === "agent-speaking"
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "none",
              background:
                voiceState === "idle" || voiceState === "error"
                  ? "linear-gradient(145deg, #00A8E8, #004E8C)"
                  : voiceState === "connecting"
                    ? "linear-gradient(145deg, #F59E0B, #92400E)"
                    : "linear-gradient(145deg, #22C55E, #166534)",
              cursor:
                voiceState === "idle" || voiceState === "error"
                  ? "pointer"
                  : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 40px ${statusColor[voiceState]}44`,
              transition: "all 0.4s ease",
              animation:
                voiceState === "active"
                  ? "pulseGlow 2s ease-in-out infinite"
                  : "none",
              position: "relative",
              zIndex: 1,
            }}
          >
            {(voiceState === "idle" || voiceState === "error") && (
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
            {voiceState === "connecting" && (
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="voice-dot-bounce"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "white",
                      animationDelay: `${i * 0.18}s`,
                    }}
                  />
                ))}
              </div>
            )}
            {voiceState === "active" && (
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
            {voiceState === "agent-speaking" && (
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                  height: 28,
                }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="voice-bar"
                    style={{
                      width: 4,
                      height: 20,
                      background: "white",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: statusColor[voiceState],
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 13,
              color: statusColor[voiceState],
              letterSpacing: "0.02em",
            }}
          >
            {statusLabel[voiceState]}
          </span>
        </div>

        {/* Volume bar */}
        <div
          style={{
            width: 200,
            height: 3,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            marginBottom: 20,
            overflow: "hidden",
            opacity: voiceState === "active" ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${volumeLevel}%`,
              background: "linear-gradient(90deg, #22C55E, #00A8E8)",
              borderRadius: 2,
              transition: "width 0.08s ease",
            }}
          />
        </div>

        {/* Transcript scroll area */}
        <div
          style={{
            width: "100%",
            flex: 1,
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: "auto",
            maxHeight: 220,
          }}
        >
          {transcriptLog.length === 0 &&
            (voiceState === "active" ||
              voiceState === "agent-speaking" ||
              voiceState === "connecting") && (
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  color: "#374151",
                  fontStyle: "italic",
                  padding: "16px 0",
                }}
              >
                {voiceState === "connecting"
                  ? "Connecting, please wait…"
                  : "The assistant will greet you shortly…"}
              </div>
            )}

          {transcriptLog.map((entry, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: entry.role === "user" ? "row-reverse" : "row",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "8px 13px",
                  borderRadius:
                    entry.role === "user"
                      ? "14px 14px 3px 14px"
                      : "3px 14px 14px 14px",
                  background:
                    entry.role === "user"
                      ? "rgba(0,168,232,0.15)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    entry.role === "user"
                      ? "1px solid rgba(0,168,232,0.25)"
                      : "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12.5,
                  color: entry.role === "user" ? "#93C5FD" : "#9CA3AF",
                  lineHeight: 1.55,
                }}
              >
                {entry.text}
              </div>
            </div>
          ))}

          {/* Live streaming agent transcript */}
          {agentTranscript && voiceState === "agent-speaking" && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "8px 13px",
                  borderRadius: "3px 14px 14px 14px",
                  background: "rgba(0,168,232,0.08)",
                  border: "1px solid rgba(0,168,232,0.18)",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12.5,
                  color: "#93C5FD",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                }}
              >
                {agentTranscript}
                <span style={{ opacity: 0.5 }}>▋</span>
              </div>
            </div>
          )}

          {/* Live user transcript */}
          {userTranscript && (
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                gap: 8,
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "8px 13px",
                  borderRadius: "14px 14px 3px 14px",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12.5,
                  color: "#86EFAC",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                }}
              >
                {userTranscript}
              </div>
            </div>
          )}

          <div ref={transcriptEndRef} />
        </div>

        {/* End call */}
        <button
          onClick={handleClose}
          style={{
            marginTop: 20,
            padding: "11px 36px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 50,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#EF4444",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(239,68,68,0.22)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(239,68,68,0.1)";
          }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}

// ─── Share Modal ──────────────────────────────────────────────────────────────
function ShareModal({
  onClose,
  conversationSummary: _conversationSummary,
}: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
              boxSizing: "border-box",
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
            }}
          >
            {sent ? "✓  Sent Successfully" : "Send to Email"}
          </button>
        </div>
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
  const renderContent = (text: string) =>
    text.split("\n").map((line, i, arr) => {
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
          WebkitOverflowScrolling: "touch" as any,
          paddingBottom: 4,
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
              lineHeight: 1.3,
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
  const [showVoice, setShowVoice] = useState(false);
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
    if (!isOpen || messages.length > 0) return;

    if (carContext) {
      // Fire API call immediately so backend knows which car we're discussing
      setIsLoading(true);
      fetch("https://byd-backend.omnisuiteai.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `I am interested in the ${carContext}. Please greet me and let me know how you can help.`,
          conversationHistory: [],
          carContext: carContext,
          initialGreeting: true,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const welcomeContent =
            data.success && data.response
              ? data.response
              : `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carContext}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`;

          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: welcomeContent,
              timestamp: new Date(),
            },
          ]);

          // Seed conversation history so follow-up messages have car context
          setConversationHistory([
            {
              role: "user",
              content: `I am interested in the ${carContext}. Please greet me and let me know how you can help.`,
            },
            { role: "assistant", content: welcomeContent },
          ]);
        })
        .catch(() => {
          // Fallback to static welcome on network error
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: `Hi! I'm your BYD assistant.\n\nI see you're exploring the **${carContext}** — great choice! I can help with specs, pricing, features, comparisons, and anything else.\n\n**What would you like to know?**`,
              timestamp: new Date(),
            },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // No car context — show static general welcome
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hi! I'm your BYD assistant.\n\nI'm here to help you explore our full range of electric and hybrid vehicles — from specs and pricing to comparisons and features.\n\n**What would you like to know?**",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (suggestionContext)
      setCurrentSuggestions(
        CONTEXT_SUGGESTIONS[suggestionContext] ?? CONTEXT_SUGGESTIONS.default,
      );
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
        } else throw new Error(data.error || "Unknown error");
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
          content: `Fresh start! What would you like to explore about the ${carContext ?? "BYD range"}?`,
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
        @keyframes msgIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes dotBounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-6px); opacity: 1; } }
        @keyframes chatPanelUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes voiceButtonPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,168,232,0.5); } 50% { box-shadow: 0 0 0 8px rgba(0,168,232,0); } }
        .byd-input:focus { outline: none; }
        .byd-input::placeholder { color: rgba(255,255,255,0.18); }
        .byd-scroll::-webkit-scrollbar { width: 2px; }
        .byd-scroll::-webkit-scrollbar-track { background: transparent; }
        .byd-scroll::-webkit-scrollbar-thumb { background: rgba(0,168,232,0.18); border-radius: 2px; }
        .byd-send:not(:disabled):hover { background: #0090CC !important; }
        .byd-icon-btn:hover { background: rgba(255,255,255,0.08) !important; color: #E8ECF0 !important; }
        .byd-suggestions-scroll::-webkit-scrollbar { height: 2px; }
        .byd-voice-btn:hover { background: rgba(0,168,232,0.15) !important; border-color: rgba(0,168,232,0.5) !important; }
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
            {/* Voice button */}
            <button
              onClick={() => setShowVoice(true)}
              className="byd-voice-btn"
              title="Start voice call"
              style={{
                background: "rgba(0,168,232,0.08)",
                border: "1px solid rgba(0,168,232,0.25)",
                borderRadius: 8,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#00A8E8",
                transition: "all 0.2s",
                animation: "voiceButtonPulse 3s ease-in-out infinite",
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
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              Voice
            </button>

            {hasStarted && (
              <button
                onClick={() => setShowShare(true)}
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
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
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

        {/* Journey Guide + Voice CTA */}
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
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "rgba(0,168,232,0.06)",
                border: "1px solid rgba(0,168,232,0.12)",
                borderRadius: 10,
                cursor: "pointer",
              }}
              onClick={() => setShowVoice(true)}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00A8E8, #0066B3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#E8ECF0",
                    letterSpacing: "0.06em",
                  }}
                >
                  Prefer to talk? Try our Voice Assistant
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 11,
                    color: "#4B5563",
                    marginTop: 2,
                  }}
                >
                  Speak naturally — ask anything about any BYD model
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00A8E8"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "auto", flexShrink: 0 }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
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

        {/* Suggestions */}
        {showSuggestions && !isLoading && messages.length > 0 && (
          <SuggestionPills
            label={hasStarted ? "Follow-up questions" : "Common questions"}
            suggestions={currentSuggestions}
            onSelect={sendMessage}
          />
        )}

        {/* Input bar */}
        <div
          style={{
            padding: "10px 14px 18px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,10,14,0.98)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            {/* Inline mic button */}
            <button
              onClick={() => setShowVoice(true)}
              title="Voice call"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "1px solid rgba(0,168,232,0.2)",
                background: "rgba(0,168,232,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s",
                color: "#00A8E8",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(0,168,232,0.16)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(0,168,232,0.07)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>

            <div
              style={{
                flex: 1,
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
      {showVoice && (
        <VoiceModal
          onClose={() => setShowVoice(false)}
          carContext={carContext}
        />
      )}
    </>
  );
}

// ─── Floating FAB ─────────────────────────────────────────────────────────────
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
        @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.5; } 70% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1.6); opacity: 0; } }
        .byd-fab-ring { position: absolute; inset: -2px; border-radius: 50%; border: 2px solid rgba(0,168,232,0.5); animation: ringPulse 2s ease-out 0.5s 2 forwards; pointer-events: none; }
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
          boxShadow: "0 4px 20px rgba(0,168,232,0.35)",
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

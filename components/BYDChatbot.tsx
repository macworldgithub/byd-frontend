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

// ─── Suggested Questions ─────────────────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  "Which BYD model suits a family of 4?",
  "What's the range on the BYD Seal?",
  "Tell me about BYD Blade Battery",
  "Compare Atto 3 vs Sealion 7",
  "How fast does the Shark 6 charge?",
  "What's the cheapest BYD available?",
];

// ─── Buyer Journey Prompts ────────────────────────────────────────────────────
const JOURNEY_STAGES = [
  { label: "Discover", prompt: "Help me find the right BYD for my lifestyle" },
  { label: "Explore", prompt: "Tell me about BYD model ranges and pricing" },
  { label: "Compare", prompt: "What are the differences between BYD models?" },
  { label: "Configure", prompt: "Help me configure and personalise a BYD" },
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

  const qrUrl = `https://bydfairfield.com.au?ref=kiosk`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "flex-end",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "#0D1117",
          border: "1px solid rgba(0,168,232,0.2)",
          borderRadius: "16px 16px 0 0",
          padding: "24px 20px 40px",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 36,
            height: 4,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />

        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#E8ECF0",
            marginBottom: 6,
          }}
        >
          Continue Your Journey
        </h3>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            color: "#6B7280",
            marginBottom: 20,
          }}
        >
          Send this conversation to your device to continue exploring later.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 20,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 6,
            padding: 4,
          }}
        >
          {(["email", "sms", "qr"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "7px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeTab === tab ? "#00A8E8" : "transparent",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            >
              {tab === "qr" ? "QR Code" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "email" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,168,232,0.2)",
                borderRadius: 6,
                padding: "12px 14px",
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
                background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "13px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: email && !sent ? "pointer" : "default",
                transition: "all 0.2s",
              }}
            >
              {sent ? "✓ Sent!" : "Send to Email"}
            </button>
          </div>
        )}

        {activeTab === "sms" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,168,232,0.2)",
                borderRadius: 6,
                padding: "12px 14px",
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
                background: sent ? "rgba(0,168,232,0.3)" : "#00A8E8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "13px 0",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: phone && !sent ? "pointer" : "default",
                transition: "all 0.2s",
              }}
            >
              {sent ? "✓ Sent!" : "Send via SMS"}
            </button>
          </div>
        )}

        {activeTab === "qr" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 12,
                display: "inline-block",
              }}
            >
              {/* QR placeholder — replace with an actual QR library if needed */}
              <svg
                width={120}
                height={120}
                viewBox="0 0 120 120"
                style={{ display: "block" }}
              >
                {/* Simple QR code placeholder pattern */}
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
                {/* Data dots */}
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
                  y={110}
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
                color: "#6B7280",
                textAlign: "center",
                maxWidth: 240,
              }}
            >
              Scan to open BYD Fairfield on your phone and continue your
              journey.
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: 16,
            padding: "10px 14px",
            background: "rgba(0,168,232,0.06)",
            border: "1px solid rgba(0,168,232,0.12)",
            borderRadius: 6,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 11,
              color: "#6B7280",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            📞 Call us:{" "}
            <strong style={{ color: "#00A8E8" }}>03 4110 8888</strong>
            &nbsp;·&nbsp;415 Heidelberg Road, Fairfield VIC 3078
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

  // Simple markdown-like rendering for bold and line breaks
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} style={{ color: "#E8ECF0", fontWeight: 700 }}>
                {part}
              </strong>
            ) : (
              part
            ),
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 12,
        animation: isLatest ? "fadeSlideIn 0.3s ease forwards" : "none",
      }}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00A8E8, #0077B6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 2,
            fontSize: 12,
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          B
        </div>
      )}

      {/* Bubble */}
      <div
        style={{
          maxWidth: "80%",
          padding: isUser ? "9px 14px" : "11px 14px",
          borderRadius: isUser ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
          background: isUser
            ? "linear-gradient(135deg, #00A8E8, #0077B6)"
            : "rgba(255,255,255,0.05)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.07)",
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13.5,
          lineHeight: 1.65,
          color: isUser ? "#fff" : "#B0BAC4",
          fontWeight: 400,
        }}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00A8E8, #0077B6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        B
      </div>
      <div
        style={{
          padding: "11px 14px",
          borderRadius: "4px 14px 14px 14px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00A8E8",
              animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
interface BYDChatbotProps {
  /** Whether the chatbot panel is open */
  isOpen: boolean;
  /** Callback to close the chatbot */
  onClose: () => void;
  /** Optional car context to pre-seed the conversation */
  carContext?: string;
}

export default function BYDChatbot({
  isOpen,
  onClose,
  carContext,
}: BYDChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    ConversationHistoryItem[]
  >([]);
  const [hasStarted, setHasStarted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: "welcome",
        role: "assistant",
        content: carContext
          ? `Hi! I'm your BYD assistant. I see you're looking at the **${carContext}** — great choice! Ask me anything about specs, pricing, features, or how it compares to other models. What would you like to know?`
          : "Hi! I'm your BYD assistant 👋\n\nI'm here to help you explore our full range of electric and hybrid vehicles — from performance specs to pricing and everything in between.\n\n**What would you like to know?**",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setHasStarted(true);
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
              conversationHistory: conversationHistory,
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

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
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        const errMsg: Message = {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            "I'm having a moment — please try again, or call us directly on **03 4110 8888** and our team will be happy to help.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, conversationHistory],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setConversationHistory([]);
    setHasStarted(false);
    setInput("");
    // Re-trigger welcome message
    setTimeout(() => {
      const welcomeMsg: Message = {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Conversation reset! What would you like to explore about our BYD range?",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
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
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes panelSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .byd-chat-input:focus {
          outline: none;
          border-color: rgba(0,168,232,0.5) !important;
        }
        .byd-chat-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .byd-suggestion:hover {
          background: rgba(0,168,232,0.12) !important;
          border-color: rgba(0,168,232,0.35) !important;
          color: #E8ECF0 !important;
        }
        .byd-journey-btn:hover {
          background: rgba(0,168,232,0.15) !important;
          border-color: rgba(0,168,232,0.4) !important;
        }
        .byd-send-btn:not(:disabled):hover {
          background: #0077B6 !important;
        }
        .byd-chat-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .byd-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .byd-chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,168,232,0.2);
          border-radius: 2px;
        }
      `}</style>

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 900,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
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
          height: "90dvh",
          maxHeight: 700,
          background: "#080A0E",
          border: "1px solid rgba(0,168,232,0.15)",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Barlow Condensed', sans-serif",
          animation: "panelSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(13,17,23,0.9)",
            backdropFilter: "blur(12px)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* BYD logo badge */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00A8E8, #0077B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
                color: "#fff",
                letterSpacing: "0.05em",
                flexShrink: 0,
              }}
            >
              B
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: "0.08em",
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
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "typingBounce 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 11,
                    color: "#6B7280",
                    fontWeight: 400,
                  }}
                >
                  Online · BYD Fairfield
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {/* Share button */}
            {hasStarted && (
              <button
                onClick={() => setShowShare(true)}
                title="Share this conversation"
                style={{
                  background: "rgba(0,168,232,0.1)",
                  border: "1px solid rgba(0,168,232,0.25)",
                  borderRadius: 6,
                  padding: "7px 12px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#00A8E8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
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
                Share
              </button>
            )}

            {/* Reset button */}
            {hasStarted && (
              <button
                onClick={handleReset}
                title="New conversation"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                <svg
                  width="14"
                  height="14"
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

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6B7280",
              }}
            >
              <svg
                width="14"
                height="14"
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

        {/* Journey Guide Bar — shown before conversation starts */}
        {!hasStarted && (
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 10,
                color: "#6B7280",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 7,
              }}
            >
              Where are you in your journey?
            </div>
            <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
              {JOURNEY_STAGES.map((stage) => (
                <button
                  key={stage.label}
                  className="byd-journey-btn"
                  onClick={() => sendMessage(stage.prompt)}
                  style={{
                    flexShrink: 0,
                    padding: "6px 12px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 20,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#A0A8B0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div
          className="byd-chat-scroll"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px",
          }}
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

        {/* Suggested Questions — shown after welcome, before real conversation */}
        {messages.length === 1 && !isLoading && (
          <div
            style={{
              padding: "0 14px 10px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 10,
                color: "#6B7280",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 7,
              }}
            >
              Common questions
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="byd-suggestion"
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "6px 11px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 12,
                    color: "#7A8490",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div
          style={{
            padding: "10px 14px 16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,10,14,0.95)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 10,
              padding: "8px 8px 8px 14px",
              transition: "border-color 0.2s",
            }}
          >
            <textarea
              ref={inputRef}
              className="byd-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about BYD vehicles…"
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
                lineHeight: 1.5,
                maxHeight: 80,
                overflowY: "auto",
                paddingTop: 2,
              }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = `${Math.min(t.scrollHeight, 80)}px`;
              }}
            />
            <button
              className="byd-send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              style={{
                width: 34,
                height: 34,
                borderRadius: 7,
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
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={input.trim() && !isLoading ? "#fff" : "#3A4050"}
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
              marginTop: 7,
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.05em",
            }}
          >
            BYD Fairfield · 03 4110 8888 · bydfairfield.com.au
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
          conversationSummary={conversationSummary}
        />
      )}
    </>
  );
}

// ─── Chatbot Trigger Button ───────────────────────────────────────────────────
// Drop this anywhere in your layout to open the chatbot
export function BYDChatbotButton({ carContext }: { carContext?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          background: "linear-gradient(135deg, #00A8E8, #0077B6)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,168,232,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 28px rgba(0,168,232,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(0,168,232,0.35)";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
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
      />
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";

// NexusAi — AI Chat Assistant
// Signature element: a "nexus" node-network that pulses live as messages
// travel between user and assistant — visualizing the brand name itself.

const ACCENT = "#5EEAD4"; // mint/teal — the "signal"
const ACCENT_SOFT = "rgba(94, 234, 212, 0.14)";
const USER_ACCENT = "#818CF8"; // indigo — the "human" node

function NodePulse({ active }) {
  // Small animated network glyph used in the header — pulses while
  // the assistant is "thinking", idles otherwise.
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="6" r="2.4" fill={ACCENT} opacity={active ? 1 : 0.5}>
        {active && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.1s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="6" cy="24" r="2.4" fill={USER_ACCENT} opacity={active ? 1 : 0.5}>
        {active && (
          <animate attributeName="opacity" values="1;0.4;1" dur="1.1s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="28" cy="24" r="2.4" fill={ACCENT} opacity={active ? 1 : 0.5}>
        {active && (
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.1s" begin="0.35s" repeatCount="indefinite" />
        )}
      </circle>
      <line x1="17" y1="6" x2="6" y2="24" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="17" y1="6" x2="28" y2="24" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="6" y1="24" x2="28" y2="24" stroke={ACCENT} strokeOpacity="0.2" strokeWidth="1.2" />
    </svg>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm the NexusAi assistant — a live demo built to show how we wire conversational AI into real products. Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I couldn't generate a reply just now — try again." },
      ]);
    } catch (err) {
      setError("Connection hiccup — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      style={{
        minHeight: "100%",
        background: "#0A0E12",
        color: "#E5E9EE",
        fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        maxWidth: 720,
        margin: "0 auto",
        border: "1px solid #1B222B",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "18px 22px",
          borderBottom: "1px solid #1B222B",
          background: "linear-gradient(180deg, #10151C 0%, #0A0E12 100%)",
        }}
      >
        <NodePulse active={loading} />
        <div>
          <div
            style={{
              fontFamily: "'Sora', 'IBM Plex Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 0.2,
            }}
          >
            NexusAi Assistant
          </div>
          <div style={{ fontSize: 12, color: "#8B95A1", marginTop: 2 }}>
            {loading ? "thinking…" : "AI Projects — live demo"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minHeight: 420,
          maxHeight: 480,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "78%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 10.5,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: m.role === "user" ? USER_ACCENT : ACCENT,
                paddingLeft: m.role === "user" ? 0 : 2,
                textAlign: m.role === "user" ? "right" : "left",
              }}
            >
              {m.role === "user" ? "You" : "NexusAi"}
            </span>
            <div
              style={{
                background: m.role === "user" ? "rgba(129,140,248,0.12)" : ACCENT_SOFT,
                border: `1px solid ${m.role === "user" ? "rgba(129,140,248,0.3)" : "rgba(94,234,212,0.3)"}`,
                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                padding: "10px 14px",
                fontSize: 14.5,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 5, padding: "4px 2px" }}>
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: ACCENT,
                  animation: `nexusDot 1s ${d * 0.15}s infinite ease-in-out`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {error && (
        <div style={{ padding: "0 22px 10px", fontSize: 12.5, color: "#F87171" }}>{error}</div>
      )}

      {/* Composer */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "16px 18px",
          borderTop: "1px solid #1B222B",
          background: "#0C1117",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask the NexusAi assistant something…"
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            background: "#131820",
            border: "1px solid #232B36",
            borderRadius: 10,
            color: "#E5E9EE",
            padding: "10px 12px",
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#1B222B" : ACCENT,
            color: loading || !input.trim() ? "#5A6472" : "#06110F",
            border: "none",
            borderRadius: 10,
            padding: "0 20px",
            fontWeight: 700,
            fontSize: 13.5,
            cursor: loading || !input.trim() ? "default" : "pointer",
          }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes nexusDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        textarea::placeholder { color: #5A6472; }
        div::-webkit-scrollbar { width: 6px; }
        div::-webkit-scrollbar-thumb { background: #232B36; border-radius: 6px; }
      `}</style>
    </div>
  );
}

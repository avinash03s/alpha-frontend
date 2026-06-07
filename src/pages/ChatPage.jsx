import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/chat.css";
import logoSvg from "../assets/logo.svg";

const API_URL = "/api/ai/ask";

const CHIP_MAP = [
  { id: "chip1", label: "Summarize", prompt: "Summarize something for me" },
  { id: "chip2", label: "Brainstorm", prompt: "Help me brainstorm ideas" },
  { id: "chip3", label: "Write email", prompt: "Write a professional email" },
  { id: "chip4", label: "Explain", prompt: "Explain a concept to me" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLight, setIsLight] = useState(() => localStorage.getItem("theme") === "light");
  const [popupOpen, setPopupOpen] = useState(false);

  const navigate = useNavigate();
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);
  const popupRef = useRef(null);
  const brandBtnRef = useRef(null);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle("light-theme", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close popup on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        brandBtnRef.current &&
        !brandBtnRef.current.contains(e.target)
      ) {
        setPopupOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function handleTextareaInput(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  async function sendMessage(text) {
    const question = text.trim();
    if (!question || isSending) return;

    setMessages((prev) => [...prev, { type: "user", text: question }]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsTyping(true);
    setIsSending(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      setIsTyping(false);
      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Something went wrong. Please try again." },
        ]);
        return;
      }
      const answer = await response.text();
      setMessages((prev) => [...prev, { type: "bot", text: answer }]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Unable to connect to Alpha. Check your connection." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleLogout() {
    // Clear auth tokens / session if any
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  }

  function clearChat() {
    setMessages([]);
    setIsTyping(false);
    setPopupOpen(false);
  }

  const showHero = messages.length === 0 && !isTyping;

  return (
    <div className="chat-container">
      <div className="chat-background" />

      {/* Header */}
      <header className="chat-header">
        <div
          className="chat-brand"
          id="brandBtn"
          ref={brandBtnRef}
          onClick={(e) => {
            e.stopPropagation();
            setPopupOpen((v) => !v);
          }}
        >
          <img src={logoSvg} alt="Alpha" />
          <span className="chat-brand-name">Alpha</span>
          <span className="chat-brand-badge">Beta</span>
        </div>

        {/* Brand Popup */}
        <div
          className={`brand-popup${popupOpen ? " open" : ""}`}
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-logo">
            <img src={logoSvg} alt="Alpha" />
          </div>
          <h3 className="popup-title">Alpha</h3>
          <p className="popup-dev">
            Developed by <span>Avinash</span>
          </p>
          <div className="popup-divider" />
          <div className="popup-row">
            <i className="ti ti-sparkles" /> AI-powered assistant
          </div>
          <div className="popup-row">
            <i className="ti ti-shield-check" /> Private &amp; secure
          </div>
          <div className="popup-row">
            <i className="ti ti-versions" /> Version 1.0 Beta
          </div>
        </div>

        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">Online</span>
          </div>
          <button
            className="icon-btn"
            aria-label="Clear chat"
            title="Clear chat"
            onClick={clearChat}
          >
            <i className="ti ti-refresh" />
          </button>
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => setIsLight((v) => !v)}
          >
            <i className={`ti ${isLight ? "ti-moon" : "ti-sun"}`} />
          </button>
          <button
            className="icon-btn"
            aria-label="Logout"
            title="Logout"
            onClick={handleLogout}
          >
            <i className="ti ti-logout" />
          </button>
        </div>
      </header>

      {/* Chat Wrapper */}
      <main className="chat-wrapper">
        <div className="chat-body" ref={chatBodyRef}>
          {/* Hero */}
          {showHero && (
            <div className="chat-hero">
              <img src={logoSvg} alt="Alpha" className="hero-logo" />
              <h1>Alpha</h1>
              <p>
                Your AI assistant for questions, ideas, research, learning,
                productivity, and everyday work.
              </p>
              <div className="hero-chips">
                {CHIP_MAP.map((chip) => (
                  <button
                    key={chip.id}
                    className="chip"
                    onClick={() => sendMessage(chip.prompt)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.type}`}>
              <div className="msg-avatar">{msg.type === "bot" ? "A" : "U"}</div>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="message bot">
              <div className="msg-avatar">A</div>
              <div className="bubble">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="input-wrapper">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Message Alpha..."
              aria-label="Message input"
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
            />
            <button
              aria-label="Send message"
              disabled={isSending}
              onClick={() => sendMessage(input)}
            >
              <i className="ti ti-send" />
            </button>
          </div>
          <p className="footer-hint">Alpha can make mistakes. Verify important info.</p>
        </div>
      </main>
    </div>
  );
}
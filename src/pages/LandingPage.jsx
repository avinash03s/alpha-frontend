import { useState, useEffect } from "react";
import "../css/landing.css";
import logoSvg from "../assets/logo.svg";

const demoMessages = [
  { role: "ai",   text: "Hi! I'm Alpha, your AI assistant. How can I help you today?" },
  { role: "user", text: "Write a professional email to my client about a project delay." },
  { role: "ai",   text: "Sure! Here's a professional email:\n\n<em>Subject: Project Timeline Update</em>\n\nDear [Client Name],\nI wanted to proactively update you regarding our project timeline. Due to unforeseen circumstances, we need a short extension..." },
];

const usecaseTags = [
  "📧 Email writing", "📚 Learning & education", "💼 Business reports", "🎯 Goal planning",
  "🧠 Concept explanation", "💻 Coding help", "🌍 Translation", "📝 Summarization",
  "🎨 Creative writing", "🔍 Fact checking", "📊 Data analysis", "🗣️ Interview prep",
];

const features = [
  { icon: "bi-chat-dots-fill", iconClass: "icon-purple", title: "Intelligent Q&A",    desc: "Ask anything — from science to history, coding to cooking. Alpha gives clear, accurate answers instantly." },
  { icon: "bi-pencil-fill",    iconClass: "icon-blue",   title: "Write & Edit",        desc: "Emails, essays, reports, social posts — Alpha writes and refines content in your voice, your style." },
  { icon: "bi-search",         iconClass: "icon-green",  title: "Deep Research",       desc: "Summarize long documents, explain complex topics, and get concise insights without the rabbit hole." },
  { icon: "bi-lightbulb-fill", iconClass: "icon-pink",   title: "Brainstorm Ideas",    desc: "Stuck on a problem? Alpha generates creative ideas, perspectives, and solutions you haven't thought of." },
  { icon: "bi-lightning-fill", iconClass: "icon-amber",  title: "Productivity Boost",  desc: "Plan your day, draft meeting agendas, create to-do lists — Alpha helps you get more done, faster." },
  { icon: "bi-shield-lock-fill", iconClass: "icon-red",  title: "Private & Secure",    desc: "Your conversations stay yours. Alpha is built with privacy in mind — no tracking, no data selling." },
];

const steps = [
  { num: "01", title: "Open Alpha",   desc: "No signup, no waiting. Just open the app and you're ready to go instantly." },
  { num: "02", title: "Ask anything", desc: "Type your question in plain language. Alpha understands context and intent." },
  { num: "03", title: "Get results",  desc: "Receive smart, accurate responses in seconds. Refine and continue the conversation." },
];

const stats = [
  { num: "∞",       label: "Questions answered" },
  { num: "100%",    label: "Private & secure" },
  { num: "24/7",    label: "Always available" },
  { num: "1-click", label: "Instant access" },
];

/* ── Chat Demo Component ── */
function ChatDemo() {
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    function showNext() {
      if (i >= demoMessages.length) {
        setShowTyping(true);
        return;
      }
      const msg = demoMessages[i];
      setMessages((prev) => [...prev, msg]);
      i++;
      setTimeout(showNext, 900);
    }
    const t = setTimeout(showNext, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-window-bar">
        <span className="win-dot red"></span>
        <span className="win-dot yellow"></span>
        <span className="win-dot green"></span>
        <span className="win-title">Alpha — AI Assistant</span>
      </div>

      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.role === "user" ? "user" : ""}`}>
            <div className={`chat-avatar ${msg.role === "user" ? "user-av" : "ai"}`}>
              {msg.role === "user" ? "U" : "α"}
            </div>
            <div
              className="chat-bubble"
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }}
            />
          </div>
        ))}
        {showTyping && (
          <div className="chat-msg">
            <div className="chat-avatar ai">α</div>
            <div className="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-fake-input"
          placeholder="Ask Alpha anything..."
          readOnly
        />
        <button className="chat-send-btn">
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
  );
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  const [navShadow, setNavShadow] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Fix: chat.css sets body overflow:clip — reset it for landing page
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height   = "auto";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height   = "";
    };
  }, []);

  // Navbar scroll shadow
  useEffect(() => {
    const handler = () => setNavShadow(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-el");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        className="alpha-navbar"
        style={{ boxShadow: navShadow ? "0 4px 24px rgba(0,0,0,0.4)" : "none" }}
      >
        <div className="navbar-inner">
          <a href="#hero" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
            <img src={logoSvg} alt="Alpha" className="nav-logo-img" />
            <span className="brand-name">Alpha</span>
            <span className="badge-beta">Beta</span>
          </a>

          <ul className="nav-links">
            <li><a className="nav-link" href="#hero"     onClick={(e) => { e.preventDefault(); scrollTo("hero");     }}>Home</a></li>
            <li><a className="nav-link" href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>Features</a></li>
            <li><a className="nav-link" href="#usecases" onClick={(e) => { e.preventDefault(); scrollTo("usecases"); }}>Use Cases</a></li>
            <li><a className="nav-link" href="#about"    onClick={(e) => { e.preventDefault(); scrollTo("about");    }}>About</a></li>
            <li><a className="nav-link" href="#contact"  onClick={(e) => { e.preventDefault(); scrollTo("contact");  }}>Contact</a></li>
            <li style={{ marginLeft: 12 }}>
              <a href="/chat" className="btn-alpha-primary">
                Try Alpha <i className="bi bi-arrow-right"></i>
              </a>
            </li>
          </ul>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-toggle">
            <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
        </div>

        {menuOpen && (
          <div className="nav-mobile-menu">
            <a className="nav-link" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>Home</a>
            {["features", "usecases", "about", "contact"].map((id) => (
              <a key={id} className="nav-link" href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                {id === "usecases" ? "Use Cases" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a href="/chat" className="btn-alpha-primary" style={{ marginTop: 8, display: "inline-flex" }}>
              Try Alpha <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" id="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-cols">
            <div className="hero-col-text">
              <div className="eyebrow-badge">
                <span className="dot-pulse"></span>
                AI-Powered &nbsp;·&nbsp; Private &amp; Secure
              </div>
              <h1 className="hero-heading">
                Your intelligent<br />
                <span className="text-gradient">AI companion</span><br />
                for everything
              </h1>
              <p className="hero-sub">
                Ask questions, brainstorm ideas, write emails, research topics,
                and get things done — all in one place.
              </p>
              <div className="hero-btns">
                <a href="/chat" className="btn-alpha-primary btn-lg">
                  <i className="bi bi-lightning-charge-fill"></i>Start for free
                </a>
                <a href="#features" className="btn-alpha-ghost btn-lg"
                  onClick={(e) => { e.preventDefault(); scrollTo("features"); }}>
                  See features <i className="bi bi-chevron-down"></i>
                </a>
              </div>
              <p className="disclaimer">
                <i className="bi bi-shield-check" style={{ marginRight: 4 }}></i>
                No account needed &nbsp;·&nbsp; Always free to try
              </p>
            </div>

            <div className="hero-col-chat">
              <ChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-cols">
            {stats.map((s, i) => (
              <div key={i} className="stat-col reveal-el">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section-pad" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">What Alpha can do</div>
            <h2 className="section-title">Everything you need,<br />powered by AI</h2>
            <p className="section-sub">From quick questions to deep research — Alpha handles it all with speed and precision.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-col">
                <div className="feat-card reveal-el">
                  <div className={`feat-icon ${f.iconClass}`}>
                    <i className={`bi ${f.icon}`}></i>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="section-pad bg-dark-secondary" id="usecases">
        <div className="container">
          <div className="section-eyebrow">Use cases</div>
          <h2 className="section-title">Works for every situation</h2>
          <div className="uc-tags">
            {usecaseTags.map((tag, i) => (
              <span key={i} className="uc-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-pad" id="about">
        <div className="container">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>Simple. Fast. Powerful.</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-col">
                <div className="step-card reveal-el">
                  <div className="step-num">{s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <div className="container" style={{ position: "relative" }}>
          <h2 className="cta-heading">
            Ready to meet <span className="text-gradient">Alpha?</span>
          </h2>
          <p className="cta-sub">
            Join users who already use Alpha every day.<br />
            No signup required — just start talking.
          </p>
          <a href="/chat" className="btn-alpha-primary btn-cta">
            <i className="bi bi-lightning-charge-fill"></i>Open Alpha — it's free
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section-pad" id="contact">
        <div className="container">
          <div className="section-eyebrow">Get in touch</div>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Contact Us</h2>
          <p className="section-sub" style={{ marginBottom: "2.5rem" }}>
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
          <div className="contact-info">
            <div className="contact-card reveal-el">
              <div className="feat-icon icon-purple"><i className="bi bi-person-fill"></i></div>
              <div>
                <div className="contact-card-label">Founder</div>
                <div className="contact-card-value">Avinash Surwase</div>
              </div>
            </div>
            <div className="contact-card reveal-el">
              <div className="feat-icon icon-blue"><i className="bi bi-people-fill"></i></div>
              <div>
                <div className="contact-card-label">Organization</div>
                <div className="contact-card-value">Alpha Group</div>
              </div>
            </div>
            <div className="contact-card reveal-el">
              <div className="feat-icon icon-green"><i className="bi bi-envelope-fill"></i></div>
              <div>
                <div className="contact-card-label">Email</div>
                <a href="mailto:surwaseavinash85@gmail.com" className="contact-card-link">
                  surwaseavinash85@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
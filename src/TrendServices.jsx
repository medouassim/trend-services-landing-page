import { useState, useEffect, useRef } from "react";

const LOGO_URL = "https://trend-algeria-connect.lovable.app/favicon.ico";

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(48px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const services = [
  { icon: "🖨️", ar: "طباعة ونسخ", fr: "Impression & copie", desc_ar: "طباعة عالية الجودة", desc_fr: "Impression professionnelle" },
  { icon: "📄", ar: "استخراج وثائق رسمية", fr: "Documents officiels", desc_ar: "كل الوثائق الإدارية", desc_fr: "Tous documents officiels" },
  { icon: "🗂️", ar: "تقديم ملفات إدارية", fr: "Dépôt de dossiers", desc_ar: "نتولى تقديم ملفاتك", desc_fr: "Nous gérons vos dossiers" },
  { icon: "🏢", ar: "سجل تجاري وضرائب", fr: "Registre de commerce", desc_ar: "تأسيس ومتابعة", desc_fr: "Création & suivi fiscal" },
  { icon: "📝", ar: "ملء استمارات", fr: "Remplissage de formulaires", desc_ar: "بدقة واحترافية", desc_fr: "Avec précision" },
  { icon: "🚢", ar: "ملفات استيراد وتصدير", fr: "Import & Export", desc_ar: "متابعة كاملة لملفاتك", desc_fr: "Suivi complet" },
  { icon: "🚗", ar: "تنقل للإدارات", fr: "Déplacement administratif", desc_ar: "نتنقل بدلاً عنك", desc_fr: "Nous nous déplaçons" },
  { icon: "✍️", ar: "كاتبة عمومية معتمدة", fr: "Écrivain public agréé", desc_ar: "منذ 2024 — معتمدة", desc_fr: "Depuis 2024 — agréé" },
];

const steps = [
  { num: "01", ar: "تواصل معنا", fr: "Contactez-nous", icon: "📞" },
  { num: "02", ar: "أخبرنا بملفك", fr: "Décrivez votre dossier", icon: "📋" },
  { num: "03", ar: "نحن نتكفل بالباقي", fr: "On s'occupe du reste", icon: "✅" },
];

export default function TrendServices() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", background: "#FDFAF5", color: "#1C1C1C", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --burgundy: #6B1E2E;
          --wine: #8B2635;
          --maroon: #3D0F1A;
          --cream: #F5EDD6;
          --gold: #C9A84C;
          --gold-light: #E8C96A;
          --offwhite: #FDFAF5;
          --sage: #f0f4f1;
          --charcoal: #1C1C1C;
        }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        .gold-btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--maroon);
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 4px;
          font-family: 'Cairo', sans-serif;
          font-size: 16px;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.5px;
        }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.4); }
        .outline-btn {
          background: transparent;
          color: var(--cream);
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 4px;
          font-family: 'Cairo', sans-serif;
          font-size: 16px;
          cursor: pointer;
          border: 2px solid var(--cream);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .outline-btn:hover { background: rgba(245,237,214,0.1); transform: translateY(-2px); }
        .nav-link {
          color: var(--cream);
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 0; height: 2px;
          background: var(--gold);
          transition: width 0.3s;
        }
        .nav-link:hover { color: var(--gold); }
        .nav-link:hover::after { width: 100%; }
        .service-card {
          background: white;
          border: 1px solid rgba(107,30,46,0.08);
          border-radius: 8px;
          padding: 28px 24px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 4px;
          height: 0;
          background: var(--gold);
          transition: height 0.3s;
        }
        .service-card:hover {
          transform: translateY(-6px);
          border-color: var(--burgundy);
          box-shadow: 0 20px 40px rgba(107,30,46,0.12);
        }
        .service-card:hover::before { height: 100%; }
        .step-line {
          position: absolute;
          top: 50%;
          left: -50%;
          width: 100%;
          height: 2px;
          background: linear-gradient(to left, var(--gold), transparent);
        }
        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 8px;
          padding: 36px 24px;
          text-align: center;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--gold);
          transform: translateY(-4px);
        }
        .floating-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,237,214,0.12);
          border: 1px solid rgba(201,168,76,0.4);
          color: var(--cream);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          backdrop-filter: blur(8px);
          animation: float 3s ease-in-out infinite;
        }
        .floating-badge:nth-child(2) { animation-delay: 1s; }
        .floating-badge:nth-child(3) { animation-delay: 2s; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(201,168,76,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245,237,214,0.06) 0%, transparent 50%),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.015) 40px,
              rgba(255,255,255,0.015) 41px
            );
        }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 2px;
          background: var(--gold);
        }
        .contact-pill {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(245,237,214,0.2);
          border-radius: 8px;
          padding: 18px 24px;
          transition: all 0.3s;
          color: var(--cream);
          font-size: 15px;
        }
        .contact-pill:hover {
          background: rgba(201,168,76,0.15);
          border-color: var(--gold);
          transform: translateX(-4px);
        }
        .contact-icon {
          width: 42px;
          height: 42px;
          background: rgba(201,168,76,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .hero-btns { flex-direction: column; align-items: stretch; }
          .hero-btns a, .hero-btns button { text-align: center; justify-content: center; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .map-section-inner { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .mobile-menu { display: block !important; }
        }
        .mobile-menu { display: none; }
        .hamburger { 
          background: none; border: none; cursor: pointer;
          color: var(--cream); font-size: 26px; padding: 4px;
        }
        .mobile-nav {
          position: fixed;
          top: 70px; left: 0; right: 0;
          background: var(--maroon);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 999;
          border-top: 1px solid rgba(201,168,76,0.3);
          transform: ${menuOpen ? 'translateY(0)' : 'translateY(-120%)'};
          transition: transform 0.35s ease;
        }
        .divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(to left, var(--gold), var(--gold-light));
          margin: 16px auto 0;
          border-radius: 2px;
        }
        .map-iframe {
          width: 100%;
          height: 380px;
          border: none;
          border-radius: 8px;
          filter: sepia(20%) saturate(0.9);
        }
        .whatsapp-float {
          position: fixed;
          bottom: 28px;
          left: 28px;
          z-index: 1000;
          width: 58px;
          height: 58px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 6px 24px rgba(37,211,102,0.4);
          animation: pulse-wa 2.5s infinite;
          transition: transform 0.2s;
        }
        .whatsapp-float:hover { transform: scale(1.1); }
        @keyframes pulse-wa {
          0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 6px 32px rgba(37,211,102,0.7); }
        }
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000,
        background: scrolled ? "rgba(61,15,26,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img style={{width: "3rem", borderRadius: "10px"}} src="./logo.png"/>
            <div>
              <div style={{ color: "#F5EDD6", fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Trend Services</div>
              <div style={{ color: "rgba(201,168,76,0.8)", fontSize: 11, fontWeight: 400 }}>مكتب خدمات</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <span className="nav-link" onClick={() => scrollTo("services")}>الخدمات / Services</span>
            <span className="nav-link" onClick={() => scrollTo("about")}>من نحن / À propos</span>
            <span className="nav-link" onClick={() => scrollTo("contact")}>اتصل بنا / Contact</span>
            <a href="https://wa.me/213675554833" className="gold-btn" style={{ padding: "10px 22px", fontSize: 14 }}>
              💬 واتساب
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="hamburger mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-nav" style={{ transform: menuOpen ? "translateY(0)" : "translateY(-120%)", transition: "transform 0.35s ease", position: "fixed", top: 70, left: 0, right: 0, background: "var(--maroon)", padding: "24px", display: "flex", flexDirection: "column", gap: 20, zIndex: 999, borderTop: "1px solid rgba(201,168,76,0.3)" }}>
        {["services", "about", "contact"].map((id, i) => (
          <span key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ fontSize: 18, color: "#F5EDD6" }}>
            {["الخدمات / Services", "من نحن / À propos", "اتصل بنا / Contact"][i]}
          </span>
        ))}
        <a href="https://wa.me/213675554833" className="gold-btn" style={{ textAlign: "center", justifyContent: "center" }}>💬 واتساب / WhatsApp</a>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, #3D0F1A 0%, #6B1E2E 50%, #8B2635 100%)`,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 70,
      }}>
        <div className="hero-pattern" />

        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -50, left: -50, width: 250, height: 250, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -120, right: -80, width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(245,237,214,0.06)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5%", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            {["✓ توجد دائماً / Toujours ouvert", "✓ كاتبة عمومية معتمدة", "📍 Médéa 26000"].map((b, i) => (
              <div key={i} className="floating-badge">{b}</div>
            ))}
          </div>

          {/* Main heading */}
          <div style={{ maxWidth: 800 }}>
            <div className="section-label">مكتب خدمات ترند سرفيس · Bureau de Services</div>
            <h1 style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              color: "#F5EDD6",
              lineHeight: 1.2,
              marginBottom: 12,
              fontFamily: "'Cairo', sans-serif",
            }}>
              نحن هنا لتسهيل<br />
              <span style={{ color: "#C9A84C" }}>كل إجراءاتك الإدارية</span>
            </h1>
            <p style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(245,237,214,0.75)",
              marginBottom: 40,
              fontWeight: 400,
              lineHeight: 1.7,
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              direction: "ltr",
              textAlign: "right",
            }}>
              Votre partenaire de confiance pour toutes vos démarches administratives à Médéa
            </p>

            <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="tel:+213675554833" className="gold-btn">📞 اتصل بنا</a>
              <a href="https://wa.me/213675554833" className="outline-btn">💬 واتساب / WhatsApp</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(245,237,214,0.4)", fontSize: 12 }}>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.5))", animation: "float 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 5%", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>خدماتنا · Nos Services</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#3D0F1A", marginBottom: 12 }}>
              كل ما تحتاجه في مكان واحد
            </h2>
            <p style={{ color: "#666", fontSize: 17, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Tous vos services administratifs sous un même toit
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div
                  className="service-card"
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#3D0F1A", marginBottom: 4 }}>{s.ar}</h3>
                  <p style={{ fontSize: 13, color: "#8B2635", fontWeight: 600, marginBottom: 10, direction: "ltr" }}>{s.fr}</p>
                  <div style={{ width: "100%", height: 1, background: "rgba(107,30,46,0.08)", margin: "10px 0" }} />
                  <p style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>{s.desc_ar}</p>
                  <p style={{ fontSize: 12, color: "#999", direction: "ltr" }}>{s.desc_fr}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="about" style={{ padding: "100px 5%", background: "#3D0F1A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>لماذا نحن · Pourquoi nous</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#F5EDD6", marginBottom: 12 }}>
              لماذا تختارنا؟
            </h2>
            <p style={{ color: "rgba(201,168,76,0.7)", fontSize: 17, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Pourquoi nous choisir ?
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 60 }}>
            {[
              { val: 2, suffix: "+ ans", ar: "خبرة معتمدة", fr: "Expérience certifiée" },
              { val: 100, suffix: "%", ar: "خدمة موثوقة", fr: "Service de confiance" },
              { val: 24, suffix: "/7", ar: "متاحون دائماً", fr: "Toujours disponibles" },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="stat-card">
                  <div style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, color: "#C9A84C", fontFamily: "Cormorant Garamond, serif", lineHeight: 1 }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ color: "#F5EDD6", fontSize: 18, fontWeight: 700, marginTop: 12 }}>{s.ar}</div>
                  <div style={{ color: "rgba(201,168,76,0.6)", fontSize: 14, direction: "ltr", marginTop: 4 }}>{s.fr}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Quote */}
          <AnimatedSection delay={0.3}>
            <div style={{
              textAlign: "center", padding: "36px 40px",
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 8,
            }}>
              <div style={{ fontSize: 36, color: "#C9A84C", fontFamily: "Cormorant Garamond, serif", marginBottom: 12 }}>"</div>
              <p style={{ color: "#F5EDD6", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 600, lineHeight: 1.7, marginBottom: 8 }}>
                انضموا إلينا وكونوا جزءاً من نجاحنا
              </p>
              <p style={{ color: "rgba(245,237,214,0.6)", fontSize: 15, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
                Rejoignez-nous et faites partie de notre succès
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 5%", background: "#F5EDD6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>كيف نعمل · Comment ça marche</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#3D0F1A", marginBottom: 12 }}>
              كيف نعمل؟
            </h2>
            <p style={{ color: "#8B2635", fontSize: 17, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Comment ça marche ?
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.2}>
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div style={{
                    width: 80, height: 80,
                    background: "#3D0F1A",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 32,
                    boxShadow: "0 8px 24px rgba(61,15,26,0.25)",
                    transition: "transform 0.3s",
                  }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#C9A84C", letterSpacing: 2, marginBottom: 8 }}>{s.num}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#3D0F1A", marginBottom: 6 }}>{s.ar}</h3>
                  <p style={{ fontSize: 14, color: "#8B2635", direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>{s.fr}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ padding: "100px 5%", background: "#FDFAF5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>موقعنا · Notre emplacement</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#3D0F1A", marginBottom: 12 }}>
              نحن في خدمتكم بالمدية
            </h2>
            <p style={{ color: "#666", fontSize: 17, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Retrouvez-nous à Médéa
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="map-section-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start" }}>
            {/* Info */}
            <AnimatedSection>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📍", label: "العنوان / Adresse", val: "المدية 26000، الجزائر — Médéa, Algérie 26000" },
                  { icon: "🕐", label: "أوقات العمل / Horaires", val: "متاح دائماً — Toujours ouvert" },
                  { icon: "📞", label: "الهاتف / Téléphone", val: "0675 55 48 33", href: "tel:+213675554833" },
                  { icon: "✉️", label: "البريد / Email", val: "trendservices127@gmail.com", href: "mailto:trendservices127@gmail.com" },
                  { icon: "📸", label: "إنستغرام / Instagram", val: "@services.trend", href: "https://instagram.com/services.trend" },
                  { icon: "🎵", label: "تيك توك / TikTok", val: "@trend.services", href: "https://tiktok.com/@trend.services" },
                ].map((item, i) => (
                  <a key={i} href={item.href || "#"} className="contact-pill" style={{ textDecoration: "none", background: "white", border: "1px solid rgba(107,30,46,0.1)", color: "#1C1C1C" }}>
                    <div className="contact-icon" style={{ background: "rgba(107,30,46,0.08)" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#999", fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#3D0F1A", direction: "ltr" }}>{item.val}</div>
                    </div>
                  </a>
                ))}
                <a href="https://maps.app.goo.gl/ozbFkG6jCcPtdBss7" target="_blank" rel="noreferrer" className="gold-btn" style={{ justifyContent: "center", marginTop: 8 }}>
                  🗺️ افتح في خرائط جوجل / Google Maps
                </a>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 20px 60px rgba(61,15,26,0.12)", border: "2px solid rgba(201,168,76,0.3)" }}>
                <iframe
                  className="map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.123456!2d2.7!3d36.267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb3a6c7a8b1a1%3A0x0!2zTcOpZMOpYSwgQWxnZXJpYQ!5e0!3m2!1sen!2sdz!4v1"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trend Services Location"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={{ padding: "100px 5%", background: "#6B1E2E", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <div className="section-label" style={{ justifyContent: "center" }}>اتصل بنا · Contactez-nous</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#F5EDD6", marginBottom: 12 }}>
              هل أنت مستعد للبدء؟
            </h2>
            <p style={{ color: "rgba(245,237,214,0.7)", fontSize: 18, marginBottom: 48, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Prêt à commencer ? Contactez-nous dès maintenant
            </p>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              <a href="https://wa.me/213675554833" className="gold-btn" style={{ justifyContent: "center", padding: "18px 24px", fontSize: 17 }}>
                💬 واتساب الآن / WhatsApp
              </a>
              <a href="tel:+213675554833" className="outline-btn" style={{ justifyContent: "center", padding: "18px 24px", fontSize: 17 }}>
                📞 0675 55 48 33
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
              {[
                { icon: "✉️", val: "trendservices127@gmail.com", href: "mailto:trendservices127@gmail.com" },
                { icon: "📸", val: "@services.trend", href: "https://instagram.com/services.trend" },
                { icon: "🎵", val: "@trend.services", href: "https://tiktok.com/@trend.services" },
              ].map((c, i) => (
                <a key={i} href={c.href} style={{ color: "rgba(245,237,214,0.6)", fontSize: 14, display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C9A84C"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(245,237,214,0.6)"}>
                  {c.icon} {c.val}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#3D0F1A", padding: "48px 5% 24px", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#F5EDD6", marginBottom: 4 }}>Trend Services</div>
            <div style={{ fontSize: 18, color: "#C9A84C", marginBottom: 8 }}>مكتب خدمات إدارية</div>
            <p style={{ color: "rgba(245,237,214,0.5)", fontSize: 13, direction: "ltr", fontFamily: "Cormorant Garamond, serif", fontStyle: "italic" }}>
              Votre partenaire de confiance à Médéa
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
            {[
              { icon: "📸", href: "https://instagram.com/services.trend" },
              { icon: "🎵", href: "https://tiktok.com/@trend.services" },
              { icon: "💬", href: "https://wa.me/213675554833" },
              { icon: "✉️", href: "mailto:trendservices127@gmail.com" },
              { icon: "📞", href: "tel:+213675554833" },
            ].map((s, i) => (
              <a key={i} href={s.href} style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.25)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >{s.icon}</a>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: 24, textAlign: "center", color: "rgba(245,237,214,0.3)", fontSize: 13, direction: "ltr" }}>
            © 2026 Trend Services — مكتب خدمات — Médéa, Algérie 26000
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/213675554833" className="whatsapp-float" title="WhatsApp">
        💬
      </a>
    </div>
  );
}

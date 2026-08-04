"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Code2,
  Database,
  FileText,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  Lock,
  Mail,
  Menu,
  Orbit,
  Server,
  Sparkles,
  Terminal,
  User,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

// Project Data for Hayrunnisa Erdem
const projects = [
  {
    id: "MODULE_01",
    title: "Bitcoin Volatilite Tahmini",
    version: "v1.2.0",
    status: "PRODUCTION",
    subtitle: "Multimodal Deep Learning & NLP",
    description:
      "Bitcoin fiyat dinamikleri ile FinBERT tabanlı sosyal medya duyarlılığını birleştirerek saatlik volatilite tahmini yapan, Streamlit paneli içeren yapay zekâ sistemi.",
    tech: ["PyTorch", "FinBERT", "LSTM", "CNN-BiLSTM", "Streamlit", "Python"],
    href: "https://github.com/H-ERDEM/yzproje",
    accent: "#3b82f6",
    highlight: true,
  },
  {
    id: "MODULE_02",
    title: "Maaş Araştırma Projesi",
    version: "v1.0.1",
    status: "RELEASED",
    subtitle: "Computer Vision & Data Science",
    description:
      "Sektörel verilerin analizi, temizlenmesi ve görselleştirilmesi süreçlerini Jupyter Notebook ortamında uçtan uca ele alan araştırma projesi.",
    tech: ["Python", "Jupyter", "Pandas", "Matplotlib", "Data Analysis"],
    href: "https://github.com/H-ERDEM/maas_arastirma_1",
    accent: "#06b6d4",
    highlight: false,
  },
  {
    id: "MODULE_03",
    title: "Uçak Bilet Rezervasyon Sistemi",
    version: "v1.0.0",
    status: "STABLE",
    subtitle: "Object Oriented Desktop App",
    description:
      "Rezervasyon, uçuş seferleri ve kullanıcı erişim yönetimini güvenli ve modüler bir mimaride sunan nesne yönelimli Java uygulaması.",
    tech: ["Java", "OOP", "Desktop App", "Data Structures"],
    href: "https://github.com/H-ERDEM/UcakBiletRezervasyonSistemi",
    accent: "#a855f7",
    highlight: false,
  },
  {
    id: "MODULE_04",
    title: "Bus Management System",
    version: "v1.1.0",
    status: "COMPLETED",
    subtitle: "Database Architecture & PL/pgSQL",
    description:
      "Otobüs filosu yönetimi, bilet işlemleri ve operasyonel süreçler için tasarlanmış ilişkisel PostgreSQL ve PL/pgSQL veritabanı sistemi.",
    tech: ["PostgreSQL", "PL/pgSQL", "Database Design", "SQL"],
    href: "https://github.com/H-ERDEM/bus-management-system",
    accent: "#ec4899",
    highlight: false,
  },
];

const skills = [
  { name: "Python", level: "ADVANCED", icon: Code2, desc: "Machine learning, PyTorch, Data Analysis" },
  { name: "Machine Learning", level: "BUILDING", icon: BrainCircuit, desc: "Deep Learning, NLP, FinBERT, CNN-LSTM" },
  { name: "Data Systems", level: "BUILDING", icon: Database, desc: "PostgreSQL, PL/pgSQL, Data Pipelines" },
  { name: "Next.js & React", level: "GROWING", icon: Orbit, desc: "Modern UI/UX, TypeScript, Web Apps" },
  { name: "Quantum Computing", level: "EXPLORING", icon: Atom, desc: "Qiskit, Quantum Algorithms, Theory" },
  { name: "Research & Innovation", level: "ALWAYS", icon: Sparkles, desc: "Paper Reading, LLMs, RAG Architectures" },
];

const researchList = [
  { num: "01", title: "Quantum Computing", tag: "THEORY & ALGORITHMS" },
  { num: "02", title: "Machine Learning & Neural Nets", tag: "DEEP LEARNING" },
  { num: "03", title: "Large Language Models & FinBERT", tag: "NLP / SENTIMENT" },
  { num: "04", title: "RAG (Retrieval-Augmented Generation)", tag: "AI INFRASTRUCTURE" },
  { num: "05", title: "Computer Vision & Image Processing", tag: "PATTERN RECOGNITION" },
];

const blogs = [
  { id: "NOTE-01", title: "BERT Nasıl Çalışır? Transformer Mimarisi ve FinBERT", category: "NLP", read: "6 MIN READ" },
  { id: "NOTE-02", title: "Kuantum Bilgisayarlar Neyi Değiştirebilir?", category: "QUANTUM", read: "8 MIN READ" },
  { id: "NOTE-03", title: "Bir ML Yarışmasında Validation Neden Kritik?", category: "MACHINE LEARNING", read: "7 MIN READ" },
];

const techStack = [
  { name: "Python", category: "LANGUAGE", icon: "🐍" },
  { name: "PyTorch", category: "AI FRAMEWORK", icon: "🔥" },
  { name: "FinBERT", category: "NLP MODEL", icon: "🤖" },
  { name: "Next.js", category: "WEB FRAMEWORK", icon: "⚛️" },
  { name: "PostgreSQL", category: "DATABASE", icon: "🐘" },
  { name: "TypeScript", category: "LANGUAGE", icon: "💙" },
  { name: "Java", category: "LANGUAGE", icon: "☕" },
  { name: "Streamlit", category: "UI/DASHBOARD", icon: "📊" },
  { name: "Jupyter", category: "DATA ANALYSIS", icon: "🪐" },
  { name: "Tailwind CSS", category: "STYLING", icon: "🎨" },
  { name: "Git", category: "VERSION CONTROL", icon: "🌿" },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rx = -((event.clientY - rect.top) / rect.height - 0.5) * 6;
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    element.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={move}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      }}
    >
      {children}
    </div>
  );
}

export default function PortfolioOS() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1400);

    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const systemNodes = useMemo(
    () => [
      { id: "ai", label: "AI / PyTorch", x: "20%", y: "20%", icon: BrainCircuit, color: "#3b82f6" },
      { id: "nlp", label: "FinBERT NLP", x: "80%", y: "20%", icon: Terminal, color: "#06b6d4" },
      { id: "db", label: "Data Systems", x: "20%", y: "80%", icon: Database, color: "#a855f7" },
      { id: "quantum", label: "Quantum", x: "80%", y: "80%", icon: Atom, color: "#84cc16" },
      { id: "web", label: "Next.js Web", x: "50%", y: "8%", icon: Orbit, color: "#3b82f6" },
      { id: "sql", label: "PostgreSQL", x: "50%", y: "92%", icon: Server, color: "#ec4899" },
    ],
    []
  );

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="loader-inner text-center font-mono">
              <span className="text-[11px] text-primary tracking-[0.25em] uppercase">&gt; INITIALIZING SYSTEM_</span>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-on-surface my-4 uppercase">
                HAYRUNNISA BÜŞRA<br />
                <span className="text-primary">ERDEM</span>
              </h1>
              <div className="loader-bar">
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: "easeInOut" }} />
              </div>
              <p className="text-[11px] text-on-surface-variant tracking-widest mt-4">DIGITAL LABORATORY // 2026</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grain" aria-hidden="true" />
      <div className="mouse-glow" />

      {/* TOP APP BAR */}
      <header className="top-nav fixed top-0 left-0 right-0 z-50 bg-[#090b10]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-2.5 hover:opacity-85 transition-opacity shrink-0">
            <span className="w-7 h-7 bg-primary/10 border border-primary/40 rounded flex items-center justify-center font-bold text-primary text-[11px]">
              HE
            </span>
            <span className="font-semibold text-on-surface text-[13px]">hayrunnisa.dev</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-[12px]">
            <a href="#projects" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              Projects
            </a>
            <a href="#architecture" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              Architecture
            </a>
            <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              About
            </a>
            <a href="#research" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              Research
            </a>
            <a href="#skills" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              Capabilities
            </a>
            <a href="#contact" className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
              Contact
            </a>
          </nav>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <a
              href="https://github.com/H-ERDEM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-primary text-on-surface-variant hover:text-primary transition-colors rounded-sm"
              aria-label="GitHub Profile"
            >
              <GitBranch size={13} />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/hayrunnisa-büşra-erdem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-primary text-on-surface-variant hover:text-primary transition-colors rounded-sm"
              aria-label="LinkedIn Profile"
            >
              <Globe size={13} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <button className="md:hidden p-2 text-on-surface-variant hover:text-primary" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#090b10] px-6 py-4 flex flex-col gap-4 font-mono text-[12px] uppercase tracking-wider"
            >
              <a href="#projects" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>Projects</span> <ArrowUpRight size={14} />
              </a>
              <a href="#architecture" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>Architecture</span> <ArrowUpRight size={14} />
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>About</span> <ArrowUpRight size={14} />
              </a>
              <a href="#research" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>Research</span> <ArrowUpRight size={14} />
              </a>
              <a href="#skills" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>Capabilities</span> <ArrowUpRight size={14} />
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                <span>Contact</span> <ArrowUpRight size={14} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#090b10]/95 backdrop-blur-lg border-t border-white/10 py-2 px-4" aria-label="Mobile Navigation">
        <div className="grid grid-cols-5 max-w-md mx-auto text-center font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
          <a
            href="#top"
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 py-1 ${activeTab === "home" ? "text-primary font-semibold" : ""}`}
          >
            <User size={18} />
            <span>Home</span>
          </a>
          <a
            href="#projects"
            onClick={() => setActiveTab("projects")}
            className={`flex flex-col items-center gap-1 py-1 ${activeTab === "projects" ? "text-primary font-semibold" : ""}`}
          >
            <LayoutGrid size={18} />
            <span>Projects</span>
          </a>
          <a
            href="#architecture"
            onClick={() => setActiveTab("arch")}
            className={`flex flex-col items-center gap-1 py-1 ${activeTab === "arch" ? "text-primary font-semibold" : ""}`}
          >
            <Workflow size={18} />
            <span>Flow</span>
          </a>
          <a
            href="#research"
            onClick={() => setActiveTab("research")}
            className={`flex flex-col items-center gap-1 py-1 ${activeTab === "research" ? "text-primary font-semibold" : ""}`}
          >
            <BrainCircuit size={18} />
            <span>Research</span>
          </a>
          <a
            href="#contact"
            onClick={() => setActiveTab("contact")}
            className={`flex flex-col items-center gap-1 py-1 ${activeTab === "contact" ? "text-primary font-semibold" : ""}`}
          >
            <Mail size={18} />
            <span>Contact</span>
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* HERO SECTION */}
        <section id="top" className="relative w-full border-b border-white/10 overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="aurora" aria-hidden="true" />
          <div className="schematic-grid" aria-hidden="true" />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column: Copy */}
              <div className="lg:col-span-6 flex flex-col items-start">
                {/* Live Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-[#10131d] font-mono text-[11px] text-on-surface-variant mb-6">
                  <span className="relative w-2 h-2 bg-green-500 rounded-full pulse-ring" />
                  <span>
                    &gt; STATUS: Computer Engineering Student @ HE LAB<span className="blink text-primary ml-1">_</span>
                  </span>
                </div>

                {/* Big Headline */}
                <h1 className="font-bold text-on-surface mb-6 tracking-tight uppercase text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
                  I BUILD <br />
                  <span className="text-primary drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">INTELLIGENT</span> <br />
                  SYSTEMS.
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-on-surface-variant text-base sm:text-lg mb-8 max-w-lg border-l-2 border-primary pl-4 leading-relaxed">
                  Yapay zekâ, FinBERT tabanlı doğal dil işleme, veri mimarileri ve kuantum teknolojilerinin kesişiminde araştırıyor ve yüksek performanslı sistemler geliştiriyorum.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold border border-primary accent-glow hover:bg-blue-600 transition-all"
                  >
                    <LayoutGrid size={16} />
                    <span>View Projects</span>
                  </a>
                  <a
                    href="#architecture"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all"
                  >
                    <Workflow size={16} />
                    <span>Explore System Flow</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Schematic Node Graphic (Desktop) */}
              <div className="lg:col-span-6 relative h-[450px] hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full max-w-[500px] mx-auto">
                  <div className="scan-line" />

                  {/* Central Node: Profile Avatar / Initials */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 border border-primary bg-[#090b10] p-1.5 accent-glow flex flex-col items-center justify-center text-center">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-900/30 border border-primary/40 flex flex-col items-center justify-center p-2">
                      <span className="font-mono text-2xl font-black text-primary tracking-widest">HE</span>
                      <span className="font-mono text-[9px] text-on-surface-variant mt-1">H. B. ERDEM</span>
                    </div>
                    <div className="absolute -bottom-5 font-mono text-[10px] text-primary whitespace-nowrap bg-[#090b10] px-2 py-0.5 border border-white/10">
                      [SYS_ADMIN]
                    </div>
                  </div>

                  {/* SVG Connecting Dashed Lines */}
                  <svg className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none" viewBox="0 0 500 450">
                    <path className="animate-dash" d="M250,225 L100,90" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
                    <path d="M250,225 L400,90" fill="none" stroke="#06b6d4" strokeWidth="1" />
                    <path d="M250,225 L100,360" fill="none" stroke="#a855f7" strokeWidth="1" />
                    <path className="animate-dash" d="M250,225 L400,360" fill="none" stroke="#84cc16" strokeWidth="1.2" />
                    <path d="M250,225 L250,36" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    <path className="animate-dash" d="M250,225 L250,414" fill="none" stroke="#ec4899" strokeWidth="1" />
                  </svg>

                  {/* Surrounding Interactive Domain Nodes */}
                  {systemNodes.map((node) => {
                    const Icon = node.icon;
                    const isHovered = activeNode === node.id;
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                        style={{ left: node.x, top: node.y }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 bg-[#10131d] border ${
                          isHovered ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-white/10"
                        } px-3 py-2 flex items-center gap-2 cursor-pointer transition-all duration-300`}
                      >
                        <Icon size={15} style={{ color: node.color }} />
                        <span className="font-mono text-[10px] text-on-surface uppercase tracking-wider whitespace-nowrap">{node.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile/Tablet Graphic Alternative */}
              <div className="lg:hidden relative col-span-1">
                <div className="border border-white/10 bg-[#10131d] p-5">
                  <div className="flex items-center justify-between mb-4 font-mono text-[10px]">
                    <span className="text-on-surface-variant uppercase tracking-widest">[SYSTEM_GRAPH]</span>
                    <span className="text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Status
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 border border-primary bg-[#090b10] p-1 shrink-0 accent-glow flex items-center justify-center font-mono text-xl font-bold text-primary">
                      HE
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-primary uppercase tracking-widest">[SYS_ADMIN]</div>
                      <div className="font-sans text-sm font-semibold text-on-surface">Hayrunnisa Büşra Erdem</div>
                      <div className="font-mono text-[10px] text-on-surface-variant">Computer Engineering Student</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {systemNodes.map((node) => {
                      const Icon = node.icon;
                      return (
                        <div key={node.id} className="border border-white/10 bg-[#090b10] px-2.5 py-2 flex items-center gap-2">
                          <Icon size={14} style={{ color: node.color }} />
                          <span className="font-mono text-[10px] text-on-surface uppercase tracking-wider truncate">{node.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof / Artifacts Bar */}
            <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-on-surface-variant">
                <span className="text-primary uppercase tracking-widest font-bold">[ARTIFACTS]</span>
                <span className="flex items-center gap-1 text-on-surface">
                  <GitBranch size={13} className="text-primary" /> 21+ Repositories
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-on-surface">PyTorch · FinBERT · LSTM</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-on-surface">PostgreSQL & PL/pgSQL</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-on-surface">Quantum Computing Theory</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED ARCHITECTURE FLOW SECTION */}
        <section id="architecture" className="w-full border-b border-white/10 py-16 sm:py-20 bg-[#07080d]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-8">
              <Workflow className="text-primary" size={22} />
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface uppercase tracking-tight">Featured System Architecture</h2>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest ml-auto">[FLOW_01]</span>
            </div>

            {/* Architecture Card */}
            <div className="bg-[#090b10] border border-white/10 hover:border-primary transition-colors">
              {/* Card Metadata Bar */}
              <div className="border-b border-white/10 grid grid-cols-2 md:grid-cols-4 bg-[#10131d] font-mono text-[10px] sm:text-[11px] text-on-surface-variant uppercase tracking-widest">
                <div className="p-3 border-r border-white/10 flex items-center gap-2">
                  <span className="text-primary font-bold">[MODULE_01]</span> BITCOIN_VOLATILITY
                </div>
                <div className="p-3 border-r-0 md:border-r border-white/10">VERSION: 1.2.0</div>
                <div className="p-3 border-r border-white/10 border-t md:border-t-0">STAGE: PRODUCTION</div>
                <div className="p-3 flex justify-between items-center border-t md:border-t-0">
                  <span className="text-primary">Streamlit Dashboard</span>
                  <span className="relative w-2 h-2 rounded-full bg-green-500 pulse-ring" />
                </div>
              </div>

              {/* 4-Step Diagram Flow */}
              <div className="p-6 sm:p-10 relative flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0c0e15]">
                {/* Horizontal line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-16 right-16 h-px bg-white/10 -translate-y-1/2 z-0" />

                {/* Step 1 */}
                <div className="relative z-10 bg-[#10131d] border border-white/10 p-4 w-full md:w-52 text-center hover:border-primary transition-colors">
                  <div className="w-10 h-10 mx-auto bg-[#090b10] border border-white/10 mb-3 flex items-center justify-center text-primary">
                    <Database size={18} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-primary">STEP 01</div>
                  <div className="font-mono text-[12px] font-semibold text-on-surface">Data Feed & Sentiment</div>
                  <p className="text-[10px] text-on-surface-variant mt-1 font-sans">Hourly BTC rates & Social text streams</p>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 bg-[#10131d] border border-white/10 p-4 w-full md:w-52 text-center hover:border-primary transition-colors">
                  <div className="w-10 h-10 mx-auto bg-[#090b10] border border-white/10 mb-3 flex items-center justify-center text-cyan-400">
                    <Terminal size={18} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-cyan-400">STEP 02</div>
                  <div className="font-mono text-[12px] font-semibold text-on-surface">FinBERT NLP Processing</div>
                  <p className="text-[10px] text-on-surface-variant mt-1 font-sans">Financial sentiment score extraction</p>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 bg-[#10131d] border border-white/10 p-4 w-full md:w-52 text-center hover:border-primary transition-colors">
                  <div className="w-10 h-10 mx-auto bg-[#090b10] border border-white/10 mb-3 flex items-center justify-center text-purple-400">
                    <BrainCircuit size={18} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-purple-400">STEP 03</div>
                  <div className="font-mono text-[12px] font-semibold text-on-surface">CNN-BiLSTM / PyTorch</div>
                  <p className="text-[10px] text-on-surface-variant mt-1 font-sans">Multimodal volatility forecasting</p>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 bg-[#10131d] border border-white/10 p-4 w-full md:w-52 text-center hover:border-primary transition-colors">
                  <div className="w-10 h-10 mx-auto bg-[#090b10] border border-white/10 mb-3 flex items-center justify-center text-green-400">
                    <Orbit size={18} />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-green-400">STEP 04</div>
                  <div className="font-mono text-[12px] font-semibold text-on-surface">Streamlit UI Analytics</div>
                  <p className="text-[10px] text-on-surface-variant mt-1 font-sans">Real-time charts & prediction logs</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/10 p-4 flex justify-between items-center bg-[#10131d] font-mono text-[11px]">
                <span className="text-on-surface-variant uppercase tracking-wider">
                  Deep Learning & NLP model for crypto volatility estimation.
                </span>
                <a
                  href="https://github.com/H-ERDEM/yzproje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 shrink-0 font-semibold"
                >
                  View Repository <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="w-full border-b border-white/10 py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">[PROJECT_UNIVERSE]</div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-on-surface">Selected Systems & Repositories</h2>
              </div>
              <p className="text-on-surface-variant max-w-md font-sans text-sm">
                Farklı problemleri çözmek için geliştirdiğim yapay zekâ, masaüstü uygulamaları ve veritabanı projelerim.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#0c0e15] border border-white/10 hover:border-primary transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Project Header Bar */}
                    <div className="border-b border-white/10 p-3.5 bg-[#10131d] flex items-center justify-between font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">[{project.id}]</span>
                        <span className="text-on-surface font-semibold uppercase">{project.title}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant bg-white/5 px-2 py-0.5 border border-white/10">
                        {project.version}
                      </span>
                    </div>

                    {/* Project Body */}
                    <div className="p-6">
                      <p className="font-mono text-[11px] text-primary uppercase tracking-wider mb-2">{project.subtitle}</p>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-sans">{project.description}</p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-4 font-mono text-[10px]">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 bg-[#10131d] border border-white/10 text-on-surface-variant">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Footer Link */}
                  <div className="border-t border-white/10 p-4 bg-[#10131d] flex justify-between items-center font-mono text-[11px]">
                    <span className="text-green-400 text-[10px] flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {project.status}
                    </span>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-surface group-hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                    >
                      VIEW ON GITHUB <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKED WITH / TECH INTEGRATIONS MARQUEE */}
        <section className="w-full border-b border-white/10 py-10 bg-[#07080d] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 mb-6 flex items-center gap-4">
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest">[INTEGRATIONS]</span>
            <div className="h-px bg-white/10 flex-grow" />
            <span className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">Technologies & Tools</span>
          </div>

          {/* Marquee Track */}
          <div className="relative w-full overflow-hidden py-3">
            <div className="marquee-track gap-4 items-stretch">
              {[...techStack, ...techStack].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="brand-tile shrink-0 border border-white/10 bg-[#10131d] p-4 flex flex-col items-center justify-center gap-2 min-w-[150px] transition-all duration-300"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-mono text-[12px] font-semibold text-on-surface uppercase tracking-wider">{item.name}</span>
                  <span className="font-mono text-[9px] text-on-surface-variant">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full border-b border-white/10 py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-3">[01 / ABOUT_ME]</div>
                <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface leading-tight">
                  Merakla başlayan,<br />
                  <span className="text-primary">üretimle büyüyen</span><br />
                  bir yolculuk.
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6 text-on-surface-variant text-base sm:text-lg leading-relaxed font-sans border-l-2 border-primary/40 pl-6">
                <p className="text-on-surface font-medium">
                  Ben <strong className="text-primary">Hayrunnisa Büşra Erdem</strong>. Bilgisayar mühendisliği öğrencisiyim. Yapay zekâ, veri bilimi, FinBERT tabanlı doğal dil işleme ve kuantum teknolojileri üzerine çalışıyorum.
                </p>
                <p>
                  Teknolojiyi sadece tüketen değil, yenilikçi mimariler tasarlayarak problem çözen tarafta olmayı hedefliyorum. Uzun vadede uluslararası ölçekte katma değer sunan teknoloji girişimleri geliştirmeyi amaçlıyorum.
                </p>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono">
                  <div>
                    <span className="text-3xl font-bold text-primary block">21+</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">GitHub Repos</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-cyan-400 block">5+</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Focus Areas</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-purple-400 block">∞</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Curiosity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH SECTION */}
        <section id="research" className="w-full border-b border-white/10 py-16 sm:py-24 bg-[#07080d]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">[RESEARCH_LAB]</div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-on-surface">Currently Exploring</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10131d] border border-white/10 font-mono text-[11px] text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>RESEARCH MODE: ACTIVE</span>
              </div>
            </div>

            <div className="border-t border-white/10 divide-y divide-white/10 font-mono">
              {researchList.map((item) => (
                <div
                  key={item.num}
                  className="py-5 px-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-default group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-primary font-bold text-sm">{item.num}</span>
                    <h3 className="text-lg sm:text-2xl font-semibold text-on-surface group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[10px] text-on-surface-variant bg-white/5 px-2.5 py-1 border border-white/10 uppercase">
                      {item.tag}
                    </span>
                    <ArrowUpRight size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES & SKILLS */}
        <section id="skills" className="w-full border-b border-white/10 py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="mb-12">
              <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">[CAPABILITIES]</div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-on-surface">Tools & Technical Domain</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <TiltCard key={skill.name} className="bg-[#0c0e15] border border-white/10 p-6 flex flex-col justify-between hover:border-primary">
                    <div>
                      <div className="flex justify-between items-center mb-6 font-mono text-[11px]">
                        <span className="text-primary font-bold">0{index + 1}</span>
                        <span className="text-on-surface-variant bg-white/5 px-2 py-0.5 border border-white/10 uppercase">
                          {skill.level}
                        </span>
                      </div>
                      <Icon size={32} className="text-primary mb-4" />
                      <h3 className="text-xl font-bold text-on-surface mb-2">{skill.name}</h3>
                      <p className="text-on-surface-variant text-xs font-sans leading-relaxed">{skill.desc}</p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* NOTES / BLOG */}
        <section id="blog" className="w-full border-b border-white/10 py-16 sm:py-24 bg-[#07080d]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="mb-12">
              <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">[NOTES]</div>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-on-surface">Thoughts & Technical Notes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-[#090b10] border border-white/10 p-6 flex flex-col justify-between hover:border-primary transition-colors">
                  <div>
                    <div className="flex justify-between items-center font-mono text-[10px] text-on-surface-variant mb-6">
                      <span className="text-primary font-bold">{blog.id}</span>
                      <span>{blog.read}</span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-2">{blog.category}</span>
                    <h3 className="text-lg font-bold text-on-surface leading-snug mb-4">{blog.title}</h3>
                  </div>
                  <a href="#" className="font-mono text-[11px] text-primary hover:underline inline-flex items-center gap-1.5 mt-6 font-semibold">
                    READ ARTICLE <ArrowUpRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full py-20 sm:py-32 relative overflow-hidden bg-radial from-primary/10 via-transparent to-transparent">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center relative z-10">
            <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-4">[LET'S_CONNECT]</div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-on-surface mb-8">
              LET&apos;S BUILD <br />
              <span className="text-primary">SOMETHING</span> <br />
              AMAZING.
            </h2>

            {/* Contact Terminal Buttons */}
            <div className="flex flex-wrap justify-center gap-4 font-mono text-[12px] uppercase tracking-wider mb-16">
              <a
                href="https://github.com/H-ERDEM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all"
              >
                <GitBranch size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="https://www.linkedin.com/in/hayrunnisa-büşra-erdem"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all"
              >
                <Globe size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="mailto:hbusraerdemmmm@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all"
              >
                <Mail size={16} />
                <span>Mail Me</span>
              </a>

              <a
                href="https://docs.google.com/document/d/1JqUn_FUpGePrVbspQ-RWUIAHfFGZMpBB/edit?usp=sharing&ouid=102143341472325807196&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold border border-primary hover:bg-blue-600 transition-all"
              >
                <FileText size={16} />
                <span>View CV</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] text-on-surface-variant gap-4">
              <span>© 2026 HAYRUNNISA ERDEM // ALL RIGHTS RESERVED</span>
              <span>DESIGNED & BUILT WITH SCHEMATIC AESTHETICS</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

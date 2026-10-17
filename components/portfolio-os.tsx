"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Code2,
  Database,
  FileText,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  Mail,
  Menu,
  Monitor,
  Server,
  Terminal,
  User,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONTENT — edit these lists to update the site                      */
/* ------------------------------------------------------------------ */

const LINKS = {
  github: "https://github.com/H-ERDEM",
  linkedin: "https://www.linkedin.com/in/hayrunnisa-b%C3%BC%C5%9Fra-erdem-92846332a/",
  email: "mailto:hbusraerdemmmm@gmail.com",
  cv: "https://docs.google.com/document/d/1JqUn_FUpGePrVbspQ-RWUIAHfFGZMpBB/edit?usp=sharing&ouid=102143341472325807196&rtpof=true&sd=true",
};

type Category = "software" | "ai";

const projects: {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  points: string[];
  tech: string[];
  href?: string;
  badge?: string;
}[] = [
  {
    id: "rag",
    title: "Offline Document Q&A Assistant",
    subtitle: "RAG · Local LLMs",
    category: "ai",
    badge: "Microsoft AI Innovators Capstone",
    description:
      "An end-to-end offline Retrieval-Augmented Generation assistant that ingests unstructured documents and answers questions with grounded context.",
    points: [
      "Custom semantic chunking, vector retrieval and dynamic prompt routing to reduce hallucinations",
      "Local models on edge devices via Microsoft Foundry Local, with a responsive QA interface",
    ],
    tech: ["Python", "RAG", "Local LLMs", "Vector Embeddings", "Foundry Local"],
  },
  {
    id: "01",
    title: "KitapStore",
    subtitle: "Book Management Web App",
    category: "software",
    description:
      "A book catalog and management application built on the MVC architecture with the Repository Pattern.",
    points: [
      "Search, category filtering and detail views",
      "Admin panel with full CRUD, image upload and active/passive status control",
    ],
    tech: ["C#", ".NET", "ASP.NET Core MVC", "Repository Pattern", "Bootstrap 5"],
    href: "https://github.com/H-ERDEM/KitapStore",
  },
  {
    id: "02",
    title: "Flight Reservation System",
    subtitle: "Desktop Application",
    category: "software",
    description:
      "A desktop application that digitalizes airline ticket management, designed around object-oriented principles.",
    points: [
      "Secure admin login and full CRUD for tickets",
      "Screens for search, sorting, updates and transaction history",
    ],
    tech: ["Java", "JavaFX", "OOP", "Desktop UI"],
    href: "https://github.com/H-ERDEM/UcakBiletRezervasyonSistemi",
  },
  {
    id: "03",
    title: "OrtakSepet",
    subtitle: "Collaborative Shopping Platform",
    category: "software",
    description:
      "A layered full-stack platform for group-based shared shopping, price tracking and stock management.",
    points: [
      "Shared carts, real-time group chat and stock threshold alerts",
      "Google OAuth2 + Gmail API shipment tracking, Playwright price-tracking bot",
    ],
    tech: ["Java 17", "Spring Boot", "React", "PostgreSQL", "Playwright"],
    href: "https://github.com/H-ERDEM/Ortak-Sepet",
  },
  {
    id: "04",
    title: "Bitcoin Volatility Prediction",
    subtitle: "Multimodal Deep Learning",
    category: "ai",
    description:
      "An end-to-end pipeline that aligns ~200,000 tweets with 1-minute BTC data to forecast volatility.",
    points: [
      "FinBERT sentiment features fused with market data",
      "LSTM / CNN-BiLSTM models and an interactive Streamlit dashboard",
    ],
    tech: ["Python", "PyTorch", "FinBERT", "Streamlit"],
    href: "https://github.com/H-ERDEM/yzproje",
  },
  {
    id: "05",
    title: "Financial Fraud Detection",
    subtitle: "Machine Learning",
    category: "ai",
    description:
      "Fraud detection models for highly imbalanced transaction data, optimized for Recall and F1-score.",
    points: ["XGBoost, Isolation Forest and Autoencoder comparison", "SMOTE-based class balancing"],
    tech: ["Python", "XGBoost", "Scikit-learn", "SMOTE"],
    href: "https://github.com/H-ERDEM/credit_card_fraud_detection",
  },
  {
    id: "06",
    title: "Bus Management System",
    subtitle: "Database Architecture",
    category: "software",
    description:
      "A normalized relational database for fleet, ticket and balance operations with ACID guarantees.",
    points: ["PL/pgSQL triggers for real-time balance updates", "Functions and views for automated reporting"],
    tech: ["PostgreSQL", "PL/pgSQL", "SQL"],
    href: "https://github.com/H-ERDEM/bus-management-system",
  },
];

const experience = [
  {
    org: "FlyRank AI",
    role: "Backend AI Engineering Intern",
    date: "07/2026 – 2026",
    place: "Remote",
    points: [
      "Built backend services integrating LLM capabilities into internal pipelines.",
      "Developed modular API workflows, data ingestion routines and output validation steps.",
    ],
  },
  {
    org: "Microsoft AI Innovators Program",
    role: "AI Engineering Intern",
    date: "07/2026 – 08/2026",
    place: "Remote",
    points: [
      "Selected for a competitive program; delivered an end-to-end offline document Q&A (RAG) capstone with its own interface.",
      "Deployed local language models on edge environments with Microsoft Foundry Local.",
    ],
  },
  {
    org: "TNC Group & Software Persona",
    role: "Software Professional Development Program",
    date: "Completed with high distinction",
    place: "",
    points: [
      "Databases & SQL, JavaScript web development, Figma UI/UX design and Android/iOS development.",
      "Delivered an end-to-end capstone from user experience design to database architecture.",
    ],
  },
  {
    org: "IBM SkillsBuild",
    role: "Student Ambassador, Türkiye",
    date: "04/2026 – Present",
    place: "Volunteer",
    points: ["Organize workshops and mentor peers on development tools, cloud platforms and modern software practices."],
  },
];

const skills = [
  { name: "AI & LLM Systems", icon: BrainCircuit, items: ["LLM Integration", "RAG", "AI Agents", "Prompt Engineering & Evaluation", "Semantic Search", "Vector Databases", "Local LLMs"] },
  { name: "Machine Learning", icon: Terminal, items: ["PyTorch", "FinBERT / NLP", "LSTM / CNN-BiLSTM", "Scikit-learn", "XGBoost"] },
  { name: "Software Engineering", icon: Layers, items: ["OOP", "Layered Architecture", "Design Patterns", "SOLID & Clean Code", "RESTful APIs"] },
  { name: "Languages", icon: Code2, items: ["C#", "Java", "Python", "SQL / PL/pgSQL", "JavaScript", "TypeScript"] },
  { name: "Frameworks & UI", icon: Monitor, items: [".NET", "ASP.NET Core MVC", "JavaFX", "Spring Boot", "React / Next.js", "Figma"] },
  { name: "Data & Tools", icon: Database, items: ["PostgreSQL", "Data Pipelines", "FastAPI", "Streamlit", "Git / GitHub", "Playwright"] },
];

const interests = ["AI Agents", "Retrieval-Augmented Generation", "LLM Evaluation", "NLP & FinBERT", "Quantum Computing"];

/* ------------------------------------------------------------------ */

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rx = -((event.clientY - rect.top) / rect.height - 0.5) * 5;
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    element.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  };
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={move}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "none";
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ tag, title, aside }: { tag: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-2">{tag}</div>
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-on-surface">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function PortfolioOS() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Category>("all");

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const systemNodes = useMemo(
    () => [
      { id: "llm", label: "LLM Integration", x: "20%", y: "20%", icon: BrainCircuit, color: "#84cc16" },
      { id: "rag", label: "RAG Systems", x: "80%", y: "20%", icon: Database, color: "#06b6d4" },
      { id: "dl", label: "PyTorch / NLP", x: "20%", y: "80%", icon: Terminal, color: "#ec4899" },
      { id: "cs", label: "C# / .NET", x: "80%", y: "80%", icon: Code2, color: "#a855f7" },
      { id: "agents", label: "AI Agents", x: "50%", y: "8%", icon: Workflow, color: "#3b82f6" },
      { id: "api", label: "Backend & UI", x: "50%", y: "92%", icon: Server, color: "#3b82f6" },
    ],
    []
  );

  const ordered = [...projects.filter((p) => p.category === "ai"), ...projects.filter((p) => p.category === "software")];
  const visibleProjects = filter === "all" ? ordered : ordered.filter((p) => p.category === filter);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="mouse-glow" aria-hidden="true" />

      {/* TOP APP BAR */}
      <header className="top-nav fixed top-0 left-0 right-0 z-50 bg-[#090b10]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-2.5 hover:opacity-85 transition-opacity shrink-0">
            <span className="w-7 h-7 bg-primary/10 border border-primary/40 rounded flex items-center justify-center font-bold text-primary text-[11px]">HE</span>
            <span className="font-semibold text-on-surface text-[13px] normal-case tracking-normal">Hayrunnisa Büşra Erdem</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 font-mono text-[12px]" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <a
              href={LINKS.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white border border-primary hover:bg-blue-600 transition-colors rounded-sm"
            >
              <FileText size={13} />
              <span>CV</span>
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-primary text-on-surface-variant hover:text-primary transition-colors rounded-sm"
              aria-label="GitHub Profile"
            >
              <GitBranch size={13} />
              <span className="hidden lg:inline">GitHub</span>
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-primary text-on-surface-variant hover:text-primary transition-colors rounded-sm"
              aria-label="LinkedIn Profile"
            >
              <Globe size={13} />
              <span className="hidden lg:inline">LinkedIn</span>
            </a>
            <button className="md:hidden p-2 text-on-surface-variant hover:text-primary" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#090b10] px-6 py-4 flex flex-col gap-4 font-mono text-[12px] uppercase tracking-wider"
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="py-1 text-on-surface hover:text-primary flex items-center justify-between">
                  <span>{item.label}</span> <ArrowUpRight size={14} />
                </a>
              ))}
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className="py-1 text-primary flex items-center justify-between">
                <span>View CV</span> <ArrowUpRight size={14} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#090b10]/95 backdrop-blur-lg border-t border-white/10 py-2 px-4" aria-label="Mobile navigation">
        <div className="grid grid-cols-5 max-w-md mx-auto text-center font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
          {[
            { id: "home", href: "#top", label: "Home", icon: User },
            { id: "exp", href: "#experience", label: "Work", icon: Briefcase },
            { id: "projects", href: "#projects", label: "Projects", icon: LayoutGrid },
            { id: "skills", href: "#skills", label: "Skills", icon: Workflow },
            { id: "contact", href: "#contact", label: "Contact", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-1 ${activeTab === tab.id ? "text-primary font-semibold" : ""}`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 pb-16 md:pb-0 relative">
        {/* HERO */}
        <section id="top" className="relative w-full border-b border-white/10 overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="aurora" aria-hidden="true" />
          <div className="schematic-grid" aria-hidden="true" />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-[#10131d] font-mono text-[11px] text-on-surface-variant mb-6">
                  <span className="relative w-2 h-2 bg-green-500 rounded-full pulse-ring" />
                  <span>
                    Open to internships · Spring 2027<span className="blink text-primary ml-1">_</span>
                  </span>
                </div>

                <h1 className="font-bold text-on-surface mb-6 tracking-tight uppercase text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
                  I build <br />
                  <span className="text-primary drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">intelligent</span> <br />
                  software.
                </h1>

                <p className="font-sans text-on-surface-variant text-base sm:text-lg mb-8 max-w-lg border-l-2 border-primary pl-4 leading-relaxed">
                  Computer Engineering senior at İnönü University. I build LLM pipelines, RAG systems and AI agents, and turn them into
                  real products with solid backends, clean architecture and usable interfaces in C#, Java and Python.
                </p>

                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold border border-primary accent-glow hover:bg-blue-600 transition-all">
                    <LayoutGrid size={16} />
                    <span>View Projects</span>
                  </a>
                  <a
                    href={LINKS.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all"
                  >
                    <FileText size={16} />
                    <span>View CV</span>
                  </a>
                  <a href={LINKS.email} className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all">
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Node graphic (desktop) */}
              <div className="lg:col-span-6 relative h-[450px] hidden lg:flex items-center justify-center" aria-hidden="true">
                <div className="relative w-full h-full max-w-[500px] mx-auto">
                  <div className="scan-line" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 border border-primary bg-[#090b10] p-1.5 accent-glow flex flex-col items-center justify-center text-center">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-900/30 border border-primary/40 flex flex-col items-center justify-center p-2">
                      <span className="font-mono text-2xl font-black text-primary tracking-widest">HE</span>
                      <span className="font-mono text-[9px] text-on-surface-variant mt-1">H. B. ERDEM</span>
                    </div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none" viewBox="0 0 500 450">
                    <path className="animate-dash" d="M250,225 L100,90" fill="none" stroke="#a855f7" strokeWidth="1.2" />
                    <path d="M250,225 L400,90" fill="none" stroke="#06b6d4" strokeWidth="1" />
                    <path d="M250,225 L100,360" fill="none" stroke="#ec4899" strokeWidth="1" />
                    <path className="animate-dash" d="M250,225 L400,360" fill="none" stroke="#84cc16" strokeWidth="1.2" />
                    <path d="M250,225 L250,36" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    <path className="animate-dash" d="M250,225 L250,414" fill="none" stroke="#3b82f6" strokeWidth="1" />
                  </svg>
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
                        } px-3 py-2 flex items-center gap-2 transition-all duration-300`}
                      >
                        <Icon size={15} style={{ color: node.color }} />
                        <span className="font-mono text-[10px] text-on-surface uppercase tracking-wider whitespace-nowrap">{node.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Node graphic (mobile) */}
              <div className="lg:hidden relative col-span-1">
                <div className="border border-white/10 bg-[#10131d] p-5">
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

            {/* Highlights bar */}
            <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-on-surface-variant">
                <span className="text-on-surface">Microsoft AI Innovators Program</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-on-surface">FlyRank AI</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="text-on-surface">IBM SkillsBuild Ambassador</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-1 text-on-surface">
                  <GitBranch size={13} className="text-primary" /> 45+ repositories
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="w-full border-b border-white/10 py-16 sm:py-24 bg-[#07080d] scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <SectionHeader tag="[EXPERIENCE]" title="Where I've Worked" />
            <ol className="relative border-l border-white/10 ml-2 flex flex-col gap-8">
              {experience.map((item) => (
                <li key={item.org} className="pl-6 sm:pl-8 relative">
                  <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-primary accent-glow" />
                  <div className="bg-[#0c0e15] border border-white/10 hover:border-primary/60 transition-colors p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-6 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-on-surface">{item.org}</h3>
                        <p className="font-mono text-[12px] text-primary uppercase tracking-wider mt-1">{item.role}</p>
                      </div>
                      <div className="font-mono text-[11px] text-on-surface-variant sm:text-right shrink-0">
                        <div>{item.date}</div>
                        {item.place && <div>{item.place}</div>}
                      </div>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-sm text-on-surface-variant leading-relaxed">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-primary shrink-0">›</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="w-full border-b border-white/10 py-16 sm:py-24 scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <SectionHeader
              tag="[PROJECTS]"
              title="Selected Projects"
              aside={
                <div className="flex gap-2 font-mono text-[11px] uppercase tracking-wider" role="tablist" aria-label="Filter projects">
                  {[
                    { id: "all", label: "All" },
                    { id: "software", label: "Software" },
                    { id: "ai", label: "AI" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      role="tab"
                      aria-selected={filter === f.id}
                      onClick={() => setFilter(f.id as typeof filter)}
                      className={`px-3.5 py-2 border transition-colors ${
                        filter === f.id ? "bg-primary text-white border-primary" : "bg-[#10131d] border-white/10 text-on-surface-variant hover:border-primary hover:text-primary"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              }
            />

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <motion.a
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    href={project.href ?? undefined}
                    target={project.href ? "_blank" : undefined}
                    rel={project.href ? "noopener noreferrer" : undefined}
                    className="bg-[#0c0e15] border border-white/10 hover:border-primary transition-colors duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="border-b border-white/10 p-3.5 bg-[#10131d] flex items-center justify-between font-mono text-[11px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-primary font-bold">{String(index + 1).padStart(2, "0")}</span>
                          <span className="text-on-surface font-semibold uppercase truncate">{project.title}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant bg-white/5 px-2 py-0.5 border border-white/10 uppercase shrink-0 ml-2">
                          {project.category === "ai" ? "AI" : "Software"}
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="font-mono text-[11px] text-primary uppercase tracking-wider mb-2">{project.subtitle}</p>
                        <p className="text-on-surface text-sm leading-relaxed mb-3 font-sans">{project.description}</p>
                        <ul className="flex flex-col gap-1 text-[13px] text-on-surface-variant mb-5">
                          {project.points.map((p) => (
                            <li key={p} className="flex gap-2">
                              <span className="text-primary shrink-0">›</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2.5 py-1 bg-[#10131d] border border-white/10 text-on-surface-variant">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-4 bg-[#10131d] flex justify-end items-center font-mono text-[11px]">
                      {project.href ? (
                        <span className="text-on-surface group-hover:text-primary transition-colors flex items-center gap-1 font-semibold">
                          VIEW SOURCE ON GITHUB <ArrowUpRight size={14} />
                        </span>
                      ) : (
                        <span className="text-primary uppercase tracking-wider">{project.badge}</span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="mt-8 text-center">
              <a
                href={`${LINKS.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              >
                All repositories on GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="w-full border-b border-white/10 py-16 sm:py-24 bg-[#07080d] scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <SectionHeader tag="[SKILLS]" title="Tools & Technical Domain" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <TiltCard key={skill.name} className="bg-[#0c0e15] border border-white/10 p-6 hover:border-primary">
                    <Icon size={28} className="text-primary mb-4" />
                    <h3 className="text-lg font-bold text-on-surface mb-3">{skill.name}</h3>
                    <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                      {skill.items.map((i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#10131d] border border-white/10 text-on-surface-variant">
                          {i}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="w-full border-b border-white/10 py-16 sm:py-24 scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-3">[ABOUT]</div>
                <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-on-surface leading-tight">
                  Driven by curiosity,<br />
                  <span className="text-primary">grown by building.</span>
                </h2>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6 text-on-surface-variant text-base sm:text-lg leading-relaxed font-sans border-l-2 border-primary/40 pl-6">
                <p className="text-on-surface font-medium">
                  I&apos;m <strong className="text-primary">Hayrunnisa Büşra Erdem</strong>, a Computer Engineering senior at İnönü University.
                  I build AI-powered systems and enjoy turning them into software that is well-structured underneath and easy to use on the surface.
                </p>
                <p>
                  My work spans LLM pipelines, RAG architectures and deep learning, alongside C# and Java applications and relational databases.
                  I care about reliable AI outputs, clean architecture and interfaces that help people make decisions quickly. As an IBM SkillsBuild Student Ambassador, I also run workshops and help peers learn modern tools.
                </p>
                <div>
                  <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BookOpen size={13} /> Currently exploring
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                    {interests.map((i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#10131d] border border-white/10 text-on-surface-variant">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono">
                  <div>
                    <span className="text-3xl font-bold text-primary block">2</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Internships</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-cyan-400 block">45+</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">GitHub Repos</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-purple-400 block">EN · TR</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Fluent · Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="w-full py-20 sm:py-28 relative overflow-hidden scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center relative z-10">
            <div className="font-mono text-[11px] text-primary uppercase tracking-widest mb-4">[CONTACT]</div>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-on-surface mb-4">
              Let&apos;s build <span className="text-primary">something</span> together.
            </h2>
            <p className="text-on-surface-variant mb-10 font-sans">
              <a href={LINKS.email} className="hover:text-primary transition-colors">hbusraerdemmmm@gmail.com</a>
              <span className="mx-2 text-white/20">·</span>Ankara, Türkiye
            </p>
            <div className="flex flex-wrap justify-center gap-4 font-mono text-[12px] uppercase tracking-wider mb-16">
              <a href={LINKS.email} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all">
                <Mail size={16} /> <span>Email</span>
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all">
                <GitBranch size={16} /> <span>GitHub</span> <ArrowUpRight size={14} />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#10131d] border border-white/15 text-on-surface hover:border-primary hover:text-primary transition-all">
                <Globe size={16} /> <span>LinkedIn</span> <ArrowUpRight size={14} />
              </a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold border border-primary hover:bg-blue-600 transition-all">
                <FileText size={16} /> <span>View CV</span> <ArrowUpRight size={14} />
              </a>
            </div>
            <footer className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] text-on-surface-variant gap-4">
              <span>© 2026 Hayrunnisa Büşra Erdem</span>
              <span className="flex items-center gap-1.5"><Terminal size={12} /> Built with Next.js & Tailwind CSS</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

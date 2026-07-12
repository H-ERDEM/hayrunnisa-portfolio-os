"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Stars } from "@react-three/drei";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Code2,
  Database,
  FileText,
  Mail,
  Menu,
  Orbit,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { MagneticLink } from "@/components/ui/magnetic-link";

const palette = {
  blue: "#2b00ff",
  lime: "#e3ff30",
  magenta: "#8e047e",
  cyan: "#068aff",
  muted: "#362f4f",
  violet: "#5b23ff",
};

const projects = [
  {
    title: "Bitcoin Volatilite Tahmini",
    subtitle: "Multimodal Deep Learning",
    description: "Bitcoin fiyat dinamikleri ile FinBERT tabanlı sosyal medya duyarlılığını birleştirerek saatlik volatilite tahmini yapan, Streamlit paneli içeren yapay zekâ sistemi.",
    tech: ["PyTorch", "FinBERT", "LSTM", "CNN-BiLSTM", "Streamlit"],
    href: "https://github.com/H-ERDEM/yzproje",
    accent: palette.lime,
    position: "top",
  },
  {
    title: "Maaş Araştırma Projesi",
    subtitle: "Computer Vision & Data",
    description: "Veri analizi ve görselleştirme süreçlerini Jupyter Notebook ortamında ele alan araştırma odaklı çalışma.",
    tech: ["Python", "Jupyter", "Data Analysis"],
    href: "https://github.com/H-ERDEM/maas_arastirma_1",
    accent: palette.cyan,
    position: "left",
  },
  {
    title: "Uçak Bilet Rezervasyon Sistemi",
    subtitle: "Java Application",
    description: "Rezervasyon, sefer ve kullanıcı işlemlerini yöneten nesne yönelimli Java uygulaması.",
    tech: ["Java", "OOP", "Desktop App"],
    href: "https://github.com/H-ERDEM/UcakBiletRezervasyonSistemi",
    accent: palette.violet,
    position: "right",
  },
  {
    title: "Bus Management System",
    subtitle: "Database Systems",
    description: "Otobüs yönetimi ve operasyon süreçleri için PostgreSQL ve PL/pgSQL tabanlı veri yönetim sistemi.",
    tech: ["PostgreSQL", "PL/pgSQL", "Database"],
    href: "https://github.com/H-ERDEM/bus-management-system",
    accent: palette.magenta,
    position: "bottom",
  },
];

const skills = [
  { name: "Python", level: "ADVANCED", icon: Code2 },
  { name: "Machine Learning", level: "BUILDING", icon: BrainCircuit },
  { name: "Next.js", level: "GROWING", icon: Orbit },
  { name: "Data Systems", level: "BUILDING", icon: Database },
  { name: "Quantum", level: "EXPLORING", icon: Atom },
  { name: "Research", level: "ALWAYS", icon: Sparkles },
];

const research = ["Quantum Computing", "Machine Learning", "Large Language Models", "RAG Systems", "Computer Vision"];
const blogs = [
  { title: "BERT Nasıl Çalışır?", category: "NLP", read: "6 dk" },
  { title: "Kuantum Bilgisayarlar Neyi Değiştirebilir?", category: "Quantum", read: "8 dk" },
  { title: "Bir ML Yarışmasında Validation Neden Kritik?", category: "Machine Learning", read: "7 dk" },
];

function QuantumObject() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.x += delta * 0.11;
    group.current.rotation.y += delta * 0.17;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.16;
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <Icosahedron args={[1.25, 2]}>
          <meshStandardMaterial color={palette.blue} wireframe emissive={palette.violet} emissiveIntensity={1.2} />
        </Icosahedron>
        {[0, 1, 2].map((ring) => (
          <mesh key={ring} rotation={[ring * 0.7, ring * 0.9, ring * 0.4]}>
            <torusGeometry args={[1.8 + ring * 0.18, 0.012, 12, 180]} />
            <meshBasicMaterial color={ring === 1 ? palette.lime : palette.cyan} transparent opacity={0.7} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 3, 4]} color={palette.lime} intensity={24} />
      <pointLight position={[-3, -2, 3]} color={palette.magenta} intensity={20} />
      <Stars radius={45} depth={30} count={1000} factor={2.5} saturation={0.3} fade speed={0.6} />
      <QuantumObject />
    </Canvas>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rx = -((event.clientY - rect.top) / rect.height - 0.5) * 8;
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    element.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };
  return <div ref={ref} className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)"; }}>{children}</div>;
}

export default function PortfolioOS() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const cursor = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1700);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      if (cursor.current) gsap.to(cursor.current, { x: event.clientX - 9, y: event.clientY - 9, duration: 0.22, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); lenis.destroy(); window.removeEventListener("mousemove", onMove); };
  }, []);

  const marquee = useMemo(() => ["NEXT.JS", "PYTHON", "PYTORCH", "FINBERT", "POSTGRESQL", "QUANTUM", "TYPESCRIPT", "MACHINE LEARNING"], []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="loader-inner">
              <span className="loader-index">HE // 2026</span>
              <h1>HAYRUNNISA<br />ERDEM</h1>
              <div className="loader-bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.35, ease: "easeInOut" }} /></div>
              <p>LOADING DIGITAL LABORATORY...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={cursor} className="custom-cursor" />
      <div className="noise" />
      <div className="mouse-glow" />
      <div className="moving-grid" />
      <div className="blob blob-one" />
      <div className="blob blob-two" />

      <header className="floating-nav-wrap">
        <div className="floating-nav">
          <a href="#top" className="logo"><span>HE</span><small>DIGITAL LAB</small></a>
          <nav className="desktop-nav">
            {["About", "Projects", "Research", "Skills", "Blog", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <MagneticLink href="#contact" className="available"><i /> Available</MagneticLink>
          <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>{menuOpen && <motion.nav className="mobile-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{["About", "Projects", "Research", "Skills", "Blog", "Contact"].map((item) => <a onClick={() => setMenuOpen(false)} key={item} href={`#${item.toLowerCase()}`}>{item}<ArrowUpRight size={16} /></a>)}</motion.nav>}</AnimatePresence>
      </header>

      <main id="top">
        <motion.section ref={heroRef} className="hero" style={{ opacity: heroOpacity }}>
          <motion.div className="hero-copy" style={{ y: heroY }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={!loading ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="eyebrow"><span /> COMPUTER ENGINEERING STUDENT</motion.p>
            <motion.h1 initial={{ opacity: 0 }} animate={!loading ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}>
              <span>HELLO.</span>
              <span>I BUILD</span>
              <span className="hero-gradient">INTELLIGENT</span>
              <span>SYSTEMS.</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={!loading ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 }} className="hero-bottom">
              <p>Yapay zekâ, veri sistemleri ve kuantum teknolojilerinin kesişiminde öğreniyor, araştırıyor ve ürünler geliştiriyorum.</p>
              <MagneticLink href="#projects" className="explore-button">EXPLORE <ArrowDown size={18} /></MagneticLink>
            </motion.div>
          </motion.div>
          <div className="hero-scene"><Scene /></div>
          <div className="hero-code">while (alive) &#123; code(); learn(); build(); &#125;</div>
        </motion.section>

        <div className="tech-marquee"><div>{[...marquee, ...marquee].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>

        <section id="about" className="section about-section">
          <div className="section-kicker">01 / ABOUT</div>
          <div className="about-grid">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}>
              <h2>Merakla başlayan,<br /><em>üretimle büyüyen</em><br />bir yolculuk.</h2>
            </motion.div>
            <motion.div className="about-copy" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
              <p>Ben Hayrunnisa Büşra Erdem. Bilgisayar mühendisliği öğrencisiyim. Yapay zekâ, veri bilimi, Web3 ve kuantum teknolojileri üzerine çalışıyorum.</p>
              <p>Uzun vadede gerçek problemlere çözüm üreten, uluslararası ölçekte rekabet edebilen teknoloji girişimleri kurmayı hedefliyorum.</p>
              <div className="stats"><div><strong>21</strong><span>GitHub Repo</span></div><div><strong>5+</strong><span>Focus Areas</span></div><div><strong>∞</strong><span>Curiosity</span></div></div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-kicker">02 / SELECTED WORK</div>
          <div className="section-heading-row"><h2>PROJECT<br /><em>CONSTELLATION</em></h2><p>Her nokta, farklı bir problemi çözmek için geliştirdiğim bir çalışma. Projeye dokun ve ayrıntıları keşfet.</p></div>
          <div className="project-universe">
            <div className="orbit-line orbit-a" /><div className="orbit-line orbit-b" />
            <div className="project-center"><span>HE</span><small>LAB</small></div>
            {projects.map((project, index) => (
              <button key={project.title} className={`project-node node-${project.position} ${activeProject === index ? "active" : ""}`} onClick={() => setActiveProject(index)} style={{ "--accent": project.accent } as React.CSSProperties}>
                <i /><span>{project.title}</span>
              </button>
            ))}
            <AnimatePresence mode="wait">
              <motion.article key={activeProject} className="project-detail" initial={{ opacity: 0, scale: 0.94, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }} style={{ "--accent": projects[activeProject].accent } as React.CSSProperties}>
                <div className="project-number">0{activeProject + 1}</div>
                <p>{projects[activeProject].subtitle}</p><h3>{projects[activeProject].title}</h3><div className="project-line" />
                <p className="description">{projects[activeProject].description}</p>
                <div className="tags">{projects[activeProject].tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <a href={projects[activeProject].href} target="_blank" rel="noreferrer">VIEW ON GITHUB <ArrowUpRight size={17} /></a>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <section id="research" className="section research-section">
          <div className="section-kicker">03 / RESEARCH</div>
          <div className="research-title"><h2>CURRENTLY<br /><em>EXPLORING</em></h2><div className="research-pulse"><span /><small>RESEARCH MODE: ON</small></div></div>
          <div className="research-list">{research.map((item, index) => <motion.div key={item} initial={{ opacity: 0, x: index % 2 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} whileHover={{ x: 18 }}><span>0{index + 1}</span><h3>{item}</h3><ArrowUpRight /></motion.div>)}</div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-kicker">04 / CAPABILITIES</div>
          <div className="section-heading-row"><h2>TOOLS I USE<br /><em>TO BUILD</em></h2><p>Yüzdeler yerine, bugün hangi alanlarda ürettiğimi ve hangi alanları aktif olarak geliştirdiğimi gösteren canlı bir yetenek haritası.</p></div>
          <div className="skills-grid">{skills.map((skill, index) => { const Icon = skill.icon; return <TiltCard key={skill.name} className={index === 1 || index === 4 ? "skill-featured" : ""}><div className="skill-index">0{index + 1}</div><Icon /><h3>{skill.name}</h3><p>{skill.level}</p><div className="skill-glow" /></TiltCard>; })}</div>
        </section>

        <section id="blog" className="section blog-section">
          <div className="section-kicker">05 / NOTES</div>
          <div className="section-heading-row"><h2>THOUGHTS<br /><em>& NOTES</em></h2><p>Öğrendiklerimi sadeleştirdiğim, araştırma notlarımı ve teknik deneyimlerimi paylaştığım alan.</p></div>
          <div className="blog-grid">{blogs.map((blog, index) => <motion.article key={blog.title} whileHover={{ y: -12 }}><div className="blog-top"><span>0{index + 1}</span><small>{blog.read}</small></div><p>{blog.category}</p><h3>{blog.title}</h3><a href="#">READ ARTICLE <ArrowUpRight size={16} /></a></motion.article>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-orbit" /><p>06 / LET'S CONNECT</p><h2>LET&apos;S BUILD<br /><span>SOMETHING</span><br />AMAZING.</h2>
          <div className="contact-links">
            <MagneticLink href="https://github.com/H-ERDEM" external className="contact-link">GITHUB <ArrowUpRight /></MagneticLink>
            <MagneticLink href="https://www.linkedin.com/in/hayrunnisa-büşra-erdem" external className="contact-link">LINKEDIN <ArrowUpRight /></MagneticLink>
            <MagneticLink href="mailto:hbusraerdemmmm@gmail.com" className="contact-link">MAIL <Mail /></MagneticLink>
            <MagneticLink href="https://docs.google.com/document/d/1JqUn_FUpGePrVbspQ-RWUIAHfFGZMpBB/edit?usp=sharing&ouid=102143341472325807196&rtpof=true&sd=true" external className="contact-link">CV <FileText /></MagneticLink>
          </div>
          <footer><span>© 2026 HAYRUNNISA ERDEM</span><span>DESIGNED & BUILT WITH CURIOSITY</span></footer>
        </section>
      </main>
    </>
  );
}

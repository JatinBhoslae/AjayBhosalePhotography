import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { photographer } from "./data/portfolio";
import { useLenis } from "./hooks/useLenis.js";
import GalleryPage from "./pages/GalleryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import StoryPage from "./pages/StoryPage.jsx";

function CinematicBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        size: 40 + ((index * 17) % 90),
        left: `${(index * 11) % 100}%`,
        top: `${(index * 19) % 100}%`,
        duration: 10 + (index % 8),
        delay: (index % 7) * 0.7,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,145,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(87,125,255,0.14),transparent_30%),linear-gradient(180deg,#070707_0%,#080808_45%,#030303_100%)]" />
      <div className="ray ray-left" />
      <div className="ray ray-right" />
      <div className="noise-overlay" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="dust-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function IntroExperience({ onComplete }) {
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    if (!isEnding) {
      return undefined;
    }

    const timeout = window.setTimeout(onComplete, 1600);
    return () => window.clearTimeout(timeout);
  }, [isEnding, onComplete]);

  const handleSkip = () => {
    setIsEnding(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[110] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isEnding ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.video
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={() => setIsEnding(true)}
        onError={() => setIsEnding(true)}
        animate={{
          scale: isEnding ? 1.05 : 1,
          filter: isEnding ? "brightness(0.6)" : "brightness(0.9)",
        }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        src={photographer.introVideo}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.2),rgba(0,0,0,0.72))]" />

      <motion.button
        type="button"
        onClick={handleSkip}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isEnding ? 0 : 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 hover:text-white"
      >
        Skip Intro
      </motion.button>

      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnding ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      <div className="absolute bottom-8 left-0 right-0 z-10 text-center sm:bottom-10">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isEnding ? 0 : 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-3xl text-white sm:text-4xl"
        >
          {photographer.name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isEnding ? 0 : 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-2 text-xs uppercase tracking-[0.45em] text-white/70"
        >
          Visual Storyteller
        </motion.p>
      </div>
    </motion.div>
  );
}

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const sections = [
      "home",
      "about",
      "captured",
      "projects",
      "gallery-trigger",
      "contact",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible in the viewport
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-20% 0px -20% 0px", // Tighten detection area to center of screen
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleAnchor = (section) => {
    if (location.pathname !== "/") {
      sessionStorage.setItem("scroll-target", section);
      navigate("/");
      return;
    }

    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { label: "Home", section: "home" },
    { label: "About", section: "about" },
    { label: "Gallery", section: "captured" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[101] px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => handleAnchor("home")}
          className="font-display text-2xl tracking-tighter text-white transition hover:opacity-70"
        >
          {photographer.name}
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isGallery = item.section === "captured";
            const isProjects = item.section === "projects";
            const active =
              (item.path && location.pathname === item.path) ||
              (isGallery && location.pathname === "/gallery") ||
              (isProjects && location.pathname === "/projects") ||
              (location.pathname === "/" && activeSection === item.section);
            const classes = `rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
              active
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`;

            if (item.path) {
              return (
                <Link key={item.label} to={item.path} className={classes}>
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleAnchor(item.section)}
                className={classes}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // If user clicked 'Back' (POP), don't force scroll to top
    // Let the browser/Lenis handle scroll restoration
    if (navType === "POP") return;

    // Immediate scroll for both standard and Lenis scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // Backup scroll with a tiny delay to ensure content has rendered and Lenis is reset
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // If Lenis is active, this helps reset its internal state
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = "";
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname, navType]);

  return null;
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-amber-200/50 hover:bg-white/20 hover:text-amber-200 active:scale-95 sm:bottom-10 sm:right-10 sm:h-14 sm:w-14"
          aria-label="Scroll to top"
        >
          <IoArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  const [introComplete, setIntroComplete] = useState(false);

  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <ScrollToTop />
      <CinematicBackground />
      <ScrollToTopButton />
      <div className="relative z-10">
        {introComplete && <Navigation />}
        <AnimatePresence mode="wait">
          {!introComplete && (
            <IntroExperience
              key="intro"
              onComplete={() => setIntroComplete(true)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {introComplete && (
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/story/:slug" element={<StoryPage />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

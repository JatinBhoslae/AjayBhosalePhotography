import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import {
  IoArrowUp,
  IoMenuOutline,
  IoCloseOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
  IoLogoWhatsapp,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { Component } from "react";
import { photographer } from "./data/portfolio";
import { useLenis } from "./hooks/useLenis.js";
import { useTheme } from "./ThemeContext.jsx";

// App-level Error Boundary — catches render crashes and shows a fallback UI
// instead of a white screen.
class AppErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("AppErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-200/60">
            Something went wrong
          </p>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            An unexpected error occurred
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/40">
            {this.state.error?.message || "Please try refreshing the page."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 rounded-full border border-white/15 bg-white/[0.05] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import GalleryPage from "./pages/GalleryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import VideosPage from "./pages/VideosPage.jsx";

function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-200/60">
        404 — Page Not Found
      </p>
      <h1 className="font-display text-5xl text-white sm:text-7xl">
        Lost in the frame.
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/40">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-10 rounded-full border border-white/15 bg-white/[0.05] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200"
      >
        Back to Home
      </Link>
    </div>
  );
}

function BackgroundMusic({ isVisible, videoIsActive }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isVisible && !videoIsActive) {
        audioRef.current.volume = 0.25;
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked or audio error:", err);
        });
      } else if (videoIsActive) {
        audioRef.current.pause();
      }
    }
  }, [isVisible, videoIsActive]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/backgroundmusic.mp3"
        loop
        muted={isMuted}
        preload="metadata"
      />
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            onClick={toggleMute}
            className="fixed bottom-20 right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-amber-200/50 hover:bg-white/20 hover:text-amber-200 active:scale-95 sm:bottom-28 sm:right-10 sm:h-14 sm:w-14"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <IoVolumeMuteOutline size={24} />
            ) : (
              <IoVolumeHighOutline size={24} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppButton({ isVisible }) {
  const whatsappUrl = `https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I'm interested in booking a photography session.")}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          className="fixed bottom-[8.5rem] right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all hover:scale-110 hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] active:scale-95 sm:bottom-[11.5rem] sm:right-10 sm:h-14 sm:w-14"
          aria-label="Chat on WhatsApp"
        >
          <IoLogoWhatsapp size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const [scaleX, setScaleX] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScaleX(latest);
  });

  return (
    <div
      className="scroll-progress-bar"
      style={{
        width: "100%",
        transform: `scaleX(${scaleX})`,
      }}
    />
  );
}

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
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      // Start muted as a background preview only initially
      video.muted = true;
      video.play().catch(() => {});
    }

    const handleTimeUpdate = () => {
      // End after 15 seconds if it has started
      if (hasStarted && video.currentTime >= 15) {
        setIsEnding(true);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [hasStarted]);

  useEffect(() => {
    if (!isEnding) {
      return undefined;
    }

    if (videoRef.current) {
      videoRef.current.pause();
    }

    const timeout = window.setTimeout(onComplete, 1600);
    return () => window.clearTimeout(timeout);
  }, [isEnding, onComplete]);

  const handleStartIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsVideoMuted(false);
      videoRef.current.play().catch(() => {});
    }
    setHasStarted(true);
  };

  const handleSkipIntro = () => {
    setIsEnding(true);
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[110] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isEnding ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{
            scale: isEnding ? 1.3 : (hasStarted ? 1 : 1.1),
            filter: isEnding
              ? "brightness(0.6) blur(10px)"
              : (hasStarted ? "brightness(1) blur(0px)" : "brightness(0.8) blur(0px)"),
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781466800/akshay_pooja_mix_vertical_kmbven.mp4"
            playsInline
            preload="auto"
            loop={!hasStarted}
            className="absolute top-1/2 left-1/2 object-cover origin-center"
            style={{
              width: "100vh",
              height: "100vw",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.65),rgba(0,0,0,0.35),rgba(0,0,0,0.8))]" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center sm:px-10">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
                className="mb-8"
              >
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="h-24 w-24 rounded-full border-2 border-amber-200/30 object-cover shadow-[0_0_40px_rgba(255,210,145,0.15)] sm:h-28 sm:w-28"
                />
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: "0.3em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className="font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl"
              >
                {photographer.name.toUpperCase()}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                className="mt-4 text-sm font-medium uppercase tracking-[0.5em] text-amber-200/70 sm:text-base"
              >
                Visual Storyteller
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
                className="mt-6 max-w-md text-lg text-white/70 sm:text-xl"
              >
                Capturing moments that become memories.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="mt-12 flex flex-col items-center gap-6"
              >
                <motion.button
                  type="button"
                  onClick={handleStartIntro}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255,210,145,0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-amber-200/30 bg-gradient-to-r from-amber-200/10 via-white/5 to-amber-200/10 px-10 py-4 backdrop-blur-md transition-all duration-500"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-amber-200/5 to-amber-200/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />

                  <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
                    Play Intro
                  </span>
                  <motion.span
                    className="relative z-10 text-amber-200"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🔊
                  </motion.span>
                </motion.button>
                
                <button
                  onClick={handleSkipIntro}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
                >
                  Skip to Website
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound Toggle */}
      <AnimatePresence>
        {hasStarted && (
          <motion.button
            type="button"
            onClick={toggleVideoMute}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isEnding ? 0 : 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-8 left-8 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-md transition hover:border-amber-200/40 hover:bg-white/10 hover:text-white"
          >
            {isVideoMuted ? "🔇 Unmute" : "🔊 Mute"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ending Overlay */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnding ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/70 backdrop-blur-md transition-all hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "dark" ? (
            <IoSunnyOutline size={16} />
          ) : (
            <IoMoonOutline size={16} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      return undefined;
    }

    const sections = [
      "home",
      "about",
      "captured",
      "services",
      "gallery-trigger",
      "contact",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleAnchor = (section) => {
    setIsMobileMenuOpen(false);

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
    { label: "Photos", section: "captured" },
    { label: "Videos", section: "videos" },
    { label: "Services", section: "services" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[101] transition-all duration-500 ease-out ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 sm:px-10 ${
            isScrolled
              ? "rounded-2xl border border-white/[0.08] bg-black/40 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
              : "rounded-none border-transparent bg-transparent py-4"
          }`}
        >
          {/* Logo / Brand */}
          <button
            type="button"
            onClick={() => handleAnchor("home")}
            className="group flex items-center gap-3 transition-all duration-300 hover:opacity-80"
          >
            <div className="relative">
              <img
                src="/logo.jpg"
                alt={photographer.name}
                className={`rounded-full object-cover ring-1 ring-white/20 transition-all duration-500 group-hover:ring-amber-200/40 ${
                  isScrolled ? "h-8 w-8" : "h-10 w-10"
                }`}
              />
            </div>
            <div className="flex flex-col items-start">
              <span
                className={`font-display font-semibold tracking-wide text-white transition-all duration-500 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                {photographer.name}
              </span>
              <span
                className={`text-[9px] font-medium uppercase tracking-[0.35em] text-white/40 transition-all duration-500 ${
                  isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                }`}
              >
                {photographer.subtitle}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isGallery = item.section === "captured";
              const isVideos = item.section === "videos";
              const isContact = item.section === "contact";
              let active = false;
              if (isContact) {
                // Check if contact section is in view
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  const rect = contactSection.getBoundingClientRect();
                  const isInView =
                    rect.top < window.innerHeight / 2 &&
                    rect.bottom > window.innerHeight / 2;
                  active = isInView && location.pathname === "/";
                }
              } else if (isGallery) {
                active = location.pathname === "/gallery";
              } else if (isVideos) {
                active = location.pathname === "/videos";
              } else {
                active =
                  location.pathname === "/" && activeSection === item.section;
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    handleAnchor(item.section);
                  }}
                  className="group relative px-4 py-2"
                >
                  <span
                    className={`relative z-10 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                      active
                        ? "text-white"
                        : "text-white/50 group-hover:text-white/90"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent transition-all duration-500 ease-out ${
                      active
                        ? "w-3/4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60"
                    }`}
                  />
                  {/* Active dot indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-amber-200/90"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Separator + Theme Toggle + CTA */}
            <div className="ml-2 h-5 w-px bg-white/10" />
            <div className="ml-2">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => handleAnchor("contact")}
              className="ml-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:hidden"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="flex flex-col items-center justify-center gap-[5px]"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0, width: 18 },
                  open: { rotate: 45, y: 3.5, width: 18 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-[1.5px] rounded-full bg-white"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, width: 14 },
                  open: { opacity: 0, width: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] rounded-full bg-white"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0, width: 18 },
                  open: { rotate: -45, y: -3.5, width: 18 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block h-[1.5px] rounded-full bg-white"
              />
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="fixed inset-y-0 right-0 z-[102] flex w-full max-w-sm flex-col bg-[#080808]/98 shadow-2xl backdrop-blur-3xl md:hidden"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-8 py-6">
                <span className="font-display text-lg tracking-wide text-white/80">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:text-white"
                >
                  <IoCloseOutline size={20} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-1 flex-col justify-center px-8">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    const isGallery = item.section === "captured";
                    const isVideos = item.section === "videos";
                    const isContact = item.section === "contact";
                    let active = false;
                    if (isContact) {
                      // Check if contact section is in view
                      const contactSection = document.getElementById("contact");
                      if (contactSection) {
                        const rect = contactSection.getBoundingClientRect();
                        const isInView =
                          rect.top < window.innerHeight / 2 &&
                          rect.bottom > window.innerHeight / 2;
                        active = isInView && location.pathname === "/";
                      }
                    } else if (isGallery) {
                      active = location.pathname === "/gallery";
                    } else if (isVideos) {
                      active = location.pathname === "/videos";
                    } else {
                      active =
                        location.pathname === "/" &&
                        activeSection === item.section;
                    }

                    return (
                      <motion.button
                        key={item.label}
                        type="button"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          duration: 0.5,
                          ease: [0.65, 0, 0.35, 1],
                        }}
                        onClick={() => {
                          handleAnchor(item.section);
                        }}
                        className={`group flex items-center justify-between border-b border-white/[0.04] py-5 text-left transition-all duration-300 ${
                          active
                            ? "text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        <span className="font-display text-2xl font-semibold uppercase tracking-[0.15em]">
                          {item.label}
                        </span>
                        {active && (
                          <span className="h-[3px] w-[3px] rounded-full bg-amber-200/80" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Theme Toggle in Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <ThemeToggle />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Toggle Theme
                  </span>
                </motion.div>

                {/* Book Now CTA in mobile */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  type="button"
                  onClick={() => handleAnchor("contact")}
                  className="mt-10 w-full rounded-full border border-amber-200/20 bg-amber-200/[0.06] py-4 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200/80 transition-all hover:bg-amber-200/[0.12] hover:text-amber-200"
                >
                  Book a Session
                </motion.button>
              </div>

              {/* Mobile footer */}
              <div className="border-t border-white/[0.06] px-8 py-8">
                <div className="mb-6 flex justify-center">
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-6">
                  <a
                    href={photographer.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-amber-200/70"
                  >
                    Instagram
                  </a>
                  <span className="h-3 w-px bg-white/10" />
                  <a
                    href={photographer.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-amber-200/70"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
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
          className="fixed bottom-6 right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-amber-200/50 hover:bg-white/20 hover:text-amber-200 active:scale-95 sm:bottom-10 sm:right-10 sm:h-14 sm:w-14"
          aria-label="Scroll to top"
        >
          <IoArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only activate on desktop (fine pointer)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "a, button, input, textarea, [role='button'], [data-cursor='hover']",
      );
      setIsHovering(!!target);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Only render on desktop
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "cursor-hover" : ""}`}
    />
  );
}

// Create a context for video state
const VideoContext = createContext(null);

function App() {
  const location = useLocation();
  // Intro plays only once per session — skip on refresh
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem("introPlayed") === "true",
  );
  const [videoIsActive, setVideoIsActive] = useState(false);

  useLenis();

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setIntroComplete(true);
  };

  const setVideoActive = (active) => {
    setVideoIsActive(active);
  };

  return (
    <VideoContext.Provider value={{ videoIsActive, setVideoActive }}>
      <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
        <AppErrorBoundary>
          <CustomCursor />
          <ScrollProgressBar />
          <ScrollToTop />
          <CinematicBackground />
          <ScrollToTopButton />
          <BackgroundMusic
            isVisible={introComplete}
            videoIsActive={videoIsActive}
          />
          <WhatsAppButton isVisible={introComplete} />
          <div className="relative z-10">
            {introComplete && <Navigation />}
            <AnimatePresence mode="wait">
              {!introComplete && (
                <IntroExperience key="intro" onComplete={handleIntroComplete} />
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {introComplete && (
                <motion.div
                  key={location.pathname}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {
                      opacity: 0,
                      clipPath: "inset(0 0 0 0)",
                      filter: "brightness(1.6) blur(6px)",
                    },
                    visible: {
                      opacity: 1,
                      clipPath: "inset(0 0 0 0)",
                      filter: "brightness(1) blur(0px)",
                      transition: {
                        duration: 0.7,
                        ease: [0.65, 0, 0.35, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      filter: "brightness(0.6) blur(4px)",
                      transition: {
                        duration: 0.35,
                        ease: [0.65, 0, 0.35, 1],
                      },
                    },
                  }}
                >
                  {/* Cinematic wipe overlay */}
                  <motion.div
                    className="pointer-events-none fixed inset-0 z-[200]"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{
                      duration: 0.8,
                      times: [0, 0.45, 1],
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-black via-amber-950/30 to-black" />
                  </motion.div>

                  {/* Film grain flash */}
                  <motion.div
                    className="pointer-events-none fixed inset-0 z-[199]"
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,210,145,0.08), transparent 70%)",
                    }}
                  />

                  <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AppErrorBoundary>
      </div>
    </VideoContext.Provider>
  );
}

export { VideoContext };
export default App;

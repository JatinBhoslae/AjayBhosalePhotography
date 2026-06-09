import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoLogoInstagram,
  IoLogoYoutube,
  IoMailOutline,
  IoCallOutline,
  IoStar,
  IoCopyOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { HeroCameraCanvas } from "../components/CameraScene.jsx";
import {
  categories,
  photographer,
  photos,
  projects,
  testimonials,
} from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function SectionShell({ id, eyebrow, title, copy, children, className = "" }) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {(eyebrow || title || copy) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-200/70">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-4xl leading-none text-white sm:text-5xl">
                {title}
              </h2>
            )}
            {copy && (
              <p className="mt-4 max-w-2xl text-base text-white/65 sm:text-lg">
                {copy}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, y = 48, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedHeadline() {
  const lines = ["Moments Fade.", "Stories Remain."];

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => (
        <div key={line} className="overflow-hidden">
          <div className="flex flex-wrap gap-x-3 gap-y-0">
            {line.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${lineIndex}`}
                className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-[-0.05em] text-white"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + lineIndex * 0.15 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 text-center sm:min-h-screen sm:px-8"
    >
      <Reveal>
        <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
          Photography & Cinematography
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="max-w-5xl font-display text-5xl leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl">
          Capturing the <br />
          <span className="text-white/40 italic">essence of life.</span>
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/50 sm:mt-10 sm:text-lg">
          Specializing in luxury documentaries and cinematic visual storytelling
          for global audiences.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-6">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("captured")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full rounded-full bg-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition hover:bg-amber-100 sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
          >
            Explore Gallery
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full rounded-full border border-white/20 bg-white/5 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
          >
            Work with me
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
                About the artist
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                Every photograph is a <br />
                <span className="text-white/40 italic">
                  frozen piece of time.
                </span>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-white/60 sm:text-lg">
                I believe that photography is more than just an image; it's a
                narrative that lives forever. My approach combines technical
                precision with a deep appreciation for authentic emotion.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                    Experience
                  </p>
                  <p className="mt-2 text-xl font-medium text-white sm:text-2xl">
                    10+ Years
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                    Location
                  </p>
                  <p className="mt-2 text-xl font-medium text-white sm:text-2xl">
                    Worldwide
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 sm:rounded-[2.5rem]">
                <img
                  src={photographer.portrait}
                  alt={photographer.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/20 bg-black/80 p-5 backdrop-blur-xl sm:-bottom-6 sm:-left-6 sm:rounded-3xl sm:p-8">
                <p className="font-display text-2xl text-amber-200 sm:text-4xl">
                  {photographer.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">
                  Cinematographer
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapturedMomentsSection() {
  const displayPhotos = photos.slice(0, 10);

  return (
    <section id="captured" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
              Portfolio
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Captured moments.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10 sm:text-xs"
            >
              View Full Gallery
              <IoArrowForward />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {displayPhotos.map((photo, index) => (
            <Reveal
              key={photo.slug || index}
              delay={index * 0.05}
              className={`${
                index % 5 === 0 ? "col-span-2 row-span-2" : ""
              } overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl`}
            >
              <img
                src={photo.image}
                alt={photo.title || "Photography"}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <SectionShell
      id="gallery-trigger"
      eyebrow="Genres & Expertise"
      title="Diverse narratives, unified by style."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {categories.map((category, index) => (
          <Reveal key={category.name} delay={index * 0.05}>
            <Link
              to={`/gallery?category=${category.name}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="font-display text-2xl text-white transition-transform duration-500 group-hover:scale-110">
                  {category.name}
                </h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function FeaturedProjectsSection() {
  const displayProjects = projects.slice(0, 2);
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
            Thematic Work
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Selected narratives.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {displayProjects.map((project, index) => (
            <div
              key={project.name}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Reveal>
                  <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
                    {project.location}
                  </p>
                  <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
                    {project.story}
                  </p>
                  <div className="mt-8 sm:mt-10">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200 transition hover:gap-4 sm:text-xs"
                    >
                      View Project Case Study <IoArrowForward />
                    </button>
                  </div>
                </Reveal>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Reveal className="col-span-2 overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </Reveal>
                  <Reveal
                    delay={0.1}
                    className="overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl"
                  >
                    <img
                      src={project.images[1]}
                      alt={project.name}
                      className="aspect-square w-full object-cover"
                    />
                  </Reveal>
                  <Reveal
                    delay={0.2}
                    className="overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl"
                  >
                    <img
                      src={project.images[2]}
                      alt={project.name}
                      className="aspect-square w-full object-cover"
                    />
                  </Reveal>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center sm:mt-20">
          <Link
            to="/projects"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-5 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10 sm:w-auto sm:py-4 sm:text-xs"
          >
            View All Projects
            <IoArrowForward />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="Voices of those who lived the journey."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, index) => (
          <Reveal
            key={t.name}
            delay={index * 0.1}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10"
          >
            <div className="absolute right-10 top-10 text-6xl text-white/5">
              "
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full border border-white/20">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display text-xl text-white">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-white/40">
                  {t.role}
                </p>
              </div>
            </div>
            <p className="mt-8 text-lg italic leading-relaxed text-white/70">
              "{t.review}"
            </p>
            <div className="mt-6 flex gap-1 text-amber-200/60">
              {Array.from({ length: t.rating }).map((_, i) => (
                <IoStar key={i} size={14} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(photographer.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pb-32 pt-24 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
            Work With Me
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Let's build your story.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <Reveal>
            <div className="space-y-10">
              <div className="space-y-8">
                <a
                  href={`mailto:${photographer.email}`}
                  className="group flex items-center gap-5 transition-transform hover:translate-x-2"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    <IoMailOutline size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Email Me
                    </p>
                    <p className="truncate text-base text-white sm:text-lg">
                      {photographer.email}
                    </p>
                  </div>
                </a>

                <div className="group flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    {copied ? (
                      <IoCheckmarkOutline size={24} />
                    ) : (
                      <IoCallOutline size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Phone Number
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base text-white sm:text-lg">
                        {photographer.phone}
                      </p>
                      <button
                        onClick={copyToClipboard}
                        className="shrink-0 text-[10px] uppercase tracking-widest text-amber-200/60 transition-colors hover:text-amber-200"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div className="flex flex-col gap-6">
                <a
                  href={photographer.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 transition-transform hover:translate-x-2"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    <IoLogoInstagram size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Instagram
                    </p>
                    <p className="text-base text-white sm:text-lg">
                      @{photographer.instagram}
                    </p>
                  </div>
                </a>

                <a
                  href={photographer.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 transition-transform hover:translate-x-2"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    <IoLogoYoutube size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      YouTube
                    </p>
                    <p className="text-base text-white sm:text-lg">
                      {photographer.youtube}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-white/20 focus:border-amber-200/50 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-white/20 focus:border-amber-200/50 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your vision..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-white/20 focus:border-amber-200/50 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-white py-5 text-[10px] font-bold uppercase tracking-[0.45em] text-black transition hover:bg-amber-100 sm:py-6 sm:text-xs"
                >
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const target = sessionStorage.getItem("scroll-target");
    if (target) {
      sessionStorage.removeItem("scroll-target");
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden selection:bg-white/10">
      {/* Luxury Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Gradient Radial Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-60" />

        {/* Soft Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[120px] opacity-20 animate-pulse" />

        {/* Film Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Dust Particles (Simplified CSS Animation) */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full blur-[1px] animate-float-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDelay: `${-Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      </div>

      <HeroCameraCanvas scrollProgress={scrollYProgress} />

      <main className="relative z-20">
        <HeroSection />
        <AboutSection />
        <CapturedMomentsSection />
        <FeaturedProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

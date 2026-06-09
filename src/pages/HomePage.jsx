import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoLogoInstagram,
  IoMailOutline,
  IoStar,
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
      className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,208,127,0.22),transparent_52%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-center">
        <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
              <img
                src={photographer.portrait}
                alt={photographer.name}
                className="h-[22rem] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.42em] text-amber-200/65">
                Hello, I am {photographer.name}
              </p>
              <h1 className="mt-3 font-display text-4xl text-white">
                {photographer.role}
              </h1>
              <p className="mt-2 text-lg text-white/70">
                {photographer.subtitle}
              </p>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">
                {photographer.shortBio}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-200 px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                Explore Gallery
                <IoArrowForward />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Book a Shoot
              </a>
            </div>
          </div>
        </Reveal>

        <div className="relative z-10">
          <Reveal>
            <p className="mb-5 text-xs uppercase tracking-[0.55em] text-white/45">
              Visual Documentary Portfolio
            </p>
            <AnimatedHeadline />
            <motion.p
              className="mt-6 max-w-xl text-lg leading-8 text-white/62 sm:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8 }}
            >
              Every photograph is a frozen piece of time.
            </motion.p>
          </Reveal>
        </div>

        <Reveal className="relative lg:pl-4" delay={0.2}>
          <div className="absolute inset-0 -z-10 rounded-full bg-amber-100/10 blur-3xl" />
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl" />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.32em] text-white/40">
            Scroll to see the lens come alive
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="The Photographer"
      title="A visual practice built on emotion, patience, and lived moments."
      copy="From editorial portraiture to slow documentary projects, Ajay's work focuses on atmosphere first and spectacle second."
    >
      <div className="relative mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="space-y-8">
          <div className="space-y-6">
            <h3 className="font-display text-3xl text-white sm:text-4xl italic">
              "Photography is the art of observation. It’s about finding
              something interesting in an ordinary place..."
            </h3>
            <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
              Ajay's journey began with observing ordinary life closely: train
              stations in the rain, families between conversations, streets
              after festivals, and the silence right before sunrise in the
              mountains.
            </p>
            <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
              That instinct evolved into a luxury documentary style where every
              frame feels editorial, but never detached from human emotion. His
              work is a testament to the beauty found in the quiet intervals of
              existence.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex flex-col border-l border-amber-200/20 pl-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Philosophy
              </span>
              <span className="mt-2 text-sm text-white/80 font-medium">
                Emotional Minimalism
              </span>
            </div>
            <div className="flex flex-col border-l border-amber-200/20 pl-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Approach
              </span>
              <span className="mt-2 text-sm text-white/80 font-medium">
                Authentic Documentary
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="relative group">
          <div className="absolute inset-0 -z-10 bg-amber-200/5 blur-3xl rounded-full scale-150" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
            <img
              src={photographer.portrait}
              alt={photographer.name}
              className="w-full aspect-[4/5] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-display text-2xl text-white">
                {photographer.name}
              </p>
              <p className="text-xs uppercase tracking-widest text-amber-200/60 mt-1">
                Founder & Lead Photographer
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function CapturedMomentsSection() {
  const featuredPhotos = photos.filter((p) => p.featured);

  return (
    <SectionShell
      id="captured"
      eyebrow="Captured Moments"
      title="Stories told through a single heartbeat."
      copy="A selection of moments that refuse to fade. Each frame is a frozen piece of time, captured with intent and emotion."
    >
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {featuredPhotos.map((photo, index) => (
          <Reveal
            key={photo.slug}
            delay={index * 0.1}
            className="mb-6 break-inside-avoid"
          >
            <Link
              to={`/story/${photo.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-black"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/80">
                  {photo.category}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">
                  {photo.title}
                </h3>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">
                    {photo.location}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">
                    {photo.date}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
        >
          View Full Gallery
          <IoArrowForward />
        </Link>
      </div>
    </SectionShell>
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
  return (
    <SectionShell
      id="projects"
      eyebrow="Featured Projects"
      title="Thematic explorations and commissioned narratives."
    >
      <div className="space-y-24 sm:space-y-32">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
              index % 2 === 1 ? "lg:direction-rtl" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70">
                  {project.location}
                </p>
                <h3 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                  {project.name}
                </h3>
                <p className="mt-6 text-lg leading-8 text-white/65">
                  {project.story}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Client
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      {project.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Equipment
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      {project.equipment}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-200 transition hover:gap-4"
                  >
                    View Project Case Study <IoArrowForward />
                  </button>
                </div>
              </Reveal>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="grid grid-cols-2 gap-4">
                <Reveal className="col-span-2 overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </Reveal>
                <Reveal
                  delay={0.1}
                  className="overflow-hidden rounded-3xl border border-white/10"
                >
                  <img
                    src={project.images[1]}
                    alt={project.name}
                    className="aspect-square w-full object-cover"
                  />
                </Reveal>
                <Reveal
                  delay={0.2}
                  className="overflow-hidden rounded-3xl border border-white/10"
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
    </SectionShell>
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
  return (
    <SectionShell
      id="contact"
      eyebrow="Work With Me"
      title="Let's build your story together."
      className="pb-32 sm:pb-40"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <div className="space-y-10">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-amber-200">
                <IoMailOutline size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">
                  Email Me
                </p>
                <p className="text-lg text-white">{photographer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-amber-200">
                <IoLogoInstagram size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">
                  Follow Me
                </p>
                <p className="text-lg text-white">{photographer.instagram}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                Pune Studio
              </p>
              <p className="mt-4 text-white/70">
                Available for worldwide assignments and luxury documentary
                projects.
              </p>
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
                className="w-full rounded-full bg-white py-5 text-sm font-bold uppercase tracking-[0.45em] text-black transition hover:bg-amber-100"
              >
                Send Message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();

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
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoArrowForward,
  IoLogoInstagram,
  IoLogoYoutube,
  IoMailOutline,
  IoCallOutline,
  IoStar,
  IoCopyOutline,
  IoCheckmarkOutline,
  IoHeartOutline,
  IoCameraOutline,
  IoStarOutline,
  IoDiamondOutline,
  IoCheckmarkCircle,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { HeroCameraCanvas } from "../components/CameraScene.jsx";
import Reveal from "../components/Reveal.jsx";
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

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 text-center sm:min-h-screen sm:px-8"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/home image 1.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <Reveal>
          <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
            Photography & Cinematography
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto max-w-5xl font-display text-5xl leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Capturing the <br />
            <span className="text-white/40 italic">essence of life.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:mt-10 sm:text-lg">
            Specializing in luxury documentaries and cinematic visual
            storytelling for global audiences.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-6">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fffbeb", // amber-50
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() =>
                document
                  .getElementById("captured")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative w-full overflow-hidden rounded-full bg-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
            >
              <span className="relative z-10">Explore Gallery</span>
              <motion.div className="absolute inset-0 z-0 bg-gradient-to-r from-amber-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative w-full overflow-hidden rounded-full border border-white/20 bg-white/5 px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
            >
              <span className="relative z-10">Work with me</span>
              <motion.div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AnimatedCounter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const numericEnd = parseInt(end, 10);
    const steps = 60;
    const stepTime = (duration * 1000) / steps;
    let current = 0;
    const increment = numericEnd / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const statsDisplay = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Orders Delivered" },
  { value: 85, suffix: "+", label: "Global Projects" },
  { value: 14, suffix: "", label: "Awards Won" },
];

function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {statsDisplay.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:border-amber-200/20 hover:bg-white/[0.04] sm:p-8">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <p className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </p>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
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
              <div className="mt-10 border-t border-white/10 pt-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                    Experience
                  </p>
                  <p className="mt-2 text-xl font-medium text-white sm:text-2xl">
                    5+ Years
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
                  loading="lazy"
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
              } overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:rounded-3xl`}
            >
              <img
                src={photo.image}
                alt={photo.title || "Photography"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                onLoad={(e) => {
                  e.target.classList.remove("opacity-0");
                  e.target.classList.add("opacity-100");
                }}
                style={{ opacity: 0, transition: "opacity 0.6s ease" }}
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
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                onLoad={(e) => {
                  e.target.classList.remove("opacity-0");
                  e.target.classList.add("opacity-100");
                }}
                style={{ opacity: 0, transition: "opacity 0.6s ease" }}
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
  const navigate = useNavigate();
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
                      onClick={() => {
                        const firstPhoto = photos.find((p) =>
                          project.images.includes(p.image),
                        );
                        if (firstPhoto) navigate(`/story/${firstPhoto.slug}`);
                      }}
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
                      loading="lazy"
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
                      loading="lazy"
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
                      loading="lazy"
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

const servicePlans = [
  {
    name: "Silver",
    icon: IoCameraOutline,
    price: "₹15,000",
    unit: "per session",
    description:
      "Perfect for portraits, maternity shoots, and personal branding.",
    features: [
      "Up to 2 hours shoot",
      "50+ edited photos",
      "Online gallery delivery",
      "Digital delivery in 7 days",
    ],
    border: "border-white/10",
    accent: "from-white/10 to-white/[0.03]",
  },
  {
    name: "Gold",
    icon: IoStarOutline,
    price: "₹35,000",
    unit: "per event",
    description:
      "Ideal for weddings, engagements, and small events with cinematic coverage.",
    features: [
      "Up to 6 hours coverage",
      "200+ edited photos",
      "Highlight video (2–3 min)",
      "Online gallery + USB delivery",
    ],
    border: "border-amber-200/20",
    accent: "from-amber-200/[0.12] to-amber-200/[0.03]",
    badge: "Most Popular",
  },
  {
    name: "Diamond",
    icon: IoDiamondOutline,
    price: "₹75,000",
    unit: "per project",
    description:
      "Full-scale luxury documentary — multi-day events, films, and premium albums.",
    features: [
      "Full-day / multi-day coverage",
      "500+ edited photos",
      "Cinematic film (5–10 min)",
      "Premium leather photo album",
    ],
    border: "border-violet-300/20",
    accent: "from-violet-300/[0.10] to-violet-300/[0.02]",
    badge: "Premium",
  },
];

function ServicesPreviewSection() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
              Services & Pricing
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Packages for every story.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10 sm:text-xs"
            >
              View All Services
              <IoArrowForward />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {servicePlans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <Reveal key={plan.name} delay={i * 0.12}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border ${plan.border} bg-gradient-to-b ${plan.accent} p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 sm:p-10`}
                >
                  {plan.badge && (
                    <span className="absolute right-6 top-6 rounded-full border border-amber-200/30 bg-amber-200/[0.10] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-amber-200">
                      {plan.badge}
                    </span>
                  )}

                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-2">
                    <span className="font-display text-4xl font-bold text-white sm:text-5xl">
                      {plan.price}
                    </span>
                  </div>
                  <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/30">
                    {plan.unit}
                  </p>

                  <p className="mb-8 text-sm leading-relaxed text-white/45">
                    {plan.description}
                  </p>

                  <div className="mb-8 h-px w-full bg-white/[0.06]" />

                  <ul className="mb-10 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/60"
                      >
                        <IoCheckmarkCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-amber-200/60"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/#contact"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200 sm:text-xs"
                  >
                    Book {plan.name}
                    <IoArrowForward
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-amber-200/[0.04] to-transparent p-10 text-center backdrop-blur-xl sm:p-14">
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Need a custom package?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/40 sm:text-base">
              Every story is unique. Let's design a bespoke package tailored to
              your vision, timeline, and budget.
            </p>
            <Link
              to="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/[0.08] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200 transition-all hover:bg-amber-200/[0.14] hover:text-amber-200 sm:text-xs"
            >
              Get in Touch <IoArrowForward size={14} />
            </Link>
          </div>
        </Reveal>
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
                  loading="lazy"
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

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <Reveal>
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-10">
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

                <a
                  href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 transition-transform hover:translate-x-2"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-black">
                    <IoLogoWhatsapp size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      WhatsApp Me
                    </p>
                    <p className="text-base text-white sm:text-lg">
                      Quick reply guaranteed
                    </p>
                  </div>
                </a>
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
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black/40 py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt={photographer.name}
                className="h-10 w-10 rounded-full border border-white/10 object-cover"
              />
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  {photographer.name}
                </p>
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                  {photographer.subtitle}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              {photographer.shortBio}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Gallery", to: "/gallery" },
                { label: "Projects", to: "/projects" },
                { label: "Services", to: "/services" },
                { label: "Contact", to: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-white/40 transition-colors hover:text-amber-200/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={photographer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-amber-200/70"
              >
                <IoLogoInstagram size={16} /> Instagram
              </a>
              <a
                href={photographer.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-amber-200/70"
              >
                <IoLogoYoutube size={16} /> YouTube
              </a>
              <a
                href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#25D366]"
              >
                <IoLogoWhatsapp size={16} /> WhatsApp
              </a>
              <a
                href={`mailto:${photographer.email}`}
                className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-amber-200/70"
              >
                <IoMailOutline size={16} /> {photographer.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {photographer.name}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-white/25">
            Made with <IoHeartOutline size={12} /> in {photographer.location}
          </p>
        </div>
      </div>
    </footer>
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

      {/* 3D Camera only on large screens - rendered inside HeroSection for large screens */}
      <div className="hidden lg:block">
        <HeroCameraCanvas scrollProgress={scrollYProgress} />
      </div>

      <main className="relative z-20">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <CapturedMomentsSection />
        <FeaturedProjectsSection />
        <ServicesPreviewSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

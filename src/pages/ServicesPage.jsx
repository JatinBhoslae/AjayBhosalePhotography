import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IoCameraOutline,
  IoFilmOutline,
  IoImagesOutline,
  IoSparklesOutline,
  IoStarOutline,
  IoDiamondOutline,
  IoCheckmarkCircle,
  IoArrowForward,
} from "react-icons/io5";
import Reveal from "../components/Reveal.jsx";

const plans = [
  {
    name: "Silver",
    icon: IoCameraOutline,
    price: "₹15,000",
    unit: "per session",
    description:
      "Perfect for portraits, maternity shoots, and personal branding.",
    features: [
      "Up to 2 hours shoot",
      "1 location",
      "50+ edited photos",
      "Online gallery delivery",
      "Basic retouching included",
      "Digital delivery in 7 days",
    ],
    accent: "from-white/10 to-white/[0.03]",
    border: "border-white/10",
    badge: null,
    cta: "Book Silver",
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
      "Multiple locations",
      "200+ edited photos",
      "Highlight video (2–3 min)",
      "Advanced retouching & color grading",
      "Online gallery + USB delivery",
      "Delivery within 14 days",
      "1 complimentary pre-shoot consultation",
    ],
    accent: "from-amber-200/[0.12] to-amber-200/[0.03]",
    border: "border-amber-200/20",
    badge: "Most Popular",
    cta: "Book Gold",
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
      "Unlimited locations",
      "500+ edited photos",
      "Cinematic film (5–10 min)",
      "Teaser video for social media",
      "Premium leather photo album",
      "Drone aerial coverage",
      "Priority delivery within 21 days",
      "Dedicated project manager",
      "2 pre-shoot consultations",
    ],
    accent: "from-violet-300/[0.10] to-violet-300/[0.02]",
    border: "border-violet-300/20",
    badge: "Premium",
    cta: "Book Diamond",
  },
];

const addOns = [
  { icon: IoFilmOutline, title: "Extra Cinematic Film", price: "₹12,000" },
  { icon: IoImagesOutline, title: "Drone Aerial Coverage", price: "₹8,000" },
  { icon: IoSparklesOutline, title: "Premium Photo Album", price: "₹10,000" },
];

export default function ServicesPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-6 pb-24 pt-32 sm:px-8 sm:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Reveal>
          <div className="mb-20 max-w-3xl sm:mb-24">
            <p className="text-[10px] uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
              Services
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-white sm:text-7xl">
              Packages &amp; <br />
              <span className="italic text-white/40">pricing.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
              Transparent pricing tailored to your story. Every package includes
              a personal touch, professional editing, and timeless delivery.
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <Reveal key={plan.name} delay={i * 0.12}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border ${plan.border} bg-gradient-to-b ${plan.accent} p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 sm:p-10`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span className="absolute right-6 top-6 rounded-full border border-amber-200/30 bg-amber-200/[0.10] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-amber-200">
                      {plan.badge}
                    </span>
                  )}

                  {/* Icon + Name */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="font-display text-4xl font-bold text-white sm:text-5xl">
                      {plan.price}
                    </span>
                  </div>
                  <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/30">
                    {plan.unit}
                  </p>

                  {/* Description */}
                  <p className="mb-8 text-sm leading-relaxed text-white/45">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="mb-8 h-px w-full bg-white/[0.06]" />

                  {/* Features */}
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

                  {/* CTA */}
                  <Link
                    to="/#contact"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200 sm:text-xs"
                  >
                    {plan.cta}
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

        {/* Add-ons Section */}
        <Reveal>
          <div className="mt-24 sm:mt-32">
            <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
              Enhance Your Package
            </p>
            <h2 className="mb-12 font-display text-3xl font-semibold text-white sm:text-4xl">
              Add-ons
            </h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {addOns.map((addon) => {
                const AddonIcon = addon.icon;
                return (
                  <div
                    key={addon.title}
                    className="flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md transition hover:border-white/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60">
                      <AddonIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        {addon.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-amber-200/60">
                        {addon.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal>
          <div className="mt-24 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-amber-200/[0.04] to-transparent p-10 text-center backdrop-blur-xl sm:mt-32 sm:p-16">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Need a custom package?
            </h2>
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
    </motion.main>
  );
}

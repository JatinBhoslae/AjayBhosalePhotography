import { motion } from "framer-motion";
import {
  IoCameraOutline,
  IoFilmOutline,
  IoImagesOutline,
  IoSparklesOutline,
  IoStarOutline,
  IoDiamondOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoLogoWhatsapp,
} from "react-icons/io5";
import Reveal from "../components/Reveal.jsx";
import { photographer } from "../data/portfolio";

const plans = [
  {
    name: "Silver",
    icon: IoCameraOutline,
    price: "₹35,000",
    unit: "per session",
    description:
      "Perfect for portraits, maternity shoots, and personal branding.",
    features: [
      "All Traditional Photos",
      "(Couple 10 pic edit)",
      "Full HD Traditional Video ",
      "(Couple Reel)",
      "(Cinematic Highlight Video)",
      "25 Page Album",
      "(Mini Album)",
      "(Couple Calender)",
      "(Leather Bag)",
    ],
    accent: "from-white/10 to-white/[0.03]",
    border: "border-white/10",
    badge: null,
    cta: "Book Silver",
  },
  {
    name: "Gold",
    icon: IoStarOutline,
    price: "₹65,000",
    unit: "per event",
    description:
      "Ideal for weddings, engagements, and small events with cinematic coverage.",
    features: [
      "All Traditional Photos",
      "Full HD Traditional Video ",
      "(Gavdev Reel)",
      "(Couple Reel)",
      "(Cinematic Highlight Video)",
      "Candid Photos",
      "(With 25 Pic Edit)",
      "30 Page Album",
      "(Mini Album)",
      "(Couple Calender)",
      "(Leather Bag)",
    ],
    accent: "from-amber-200/[0.12] to-amber-200/[0.03]",
    border: "border-amber-200/20",
    badge: "Most Popular",
    specialOffer: "Free Drone Shoot",
    cta: "Book Gold",
  },
  {
    name: "Diamond",
    icon: IoDiamondOutline,
    price: "₹95,000",
    unit: "per project",
    description:
      "Full-scale luxury documentary — multi-day events, films, and premium albums.",
    features: [
      "All Traditional Photos",
      "Full HD Traditional Video ",
      "Candid Photos",
      "(With 25 Pic Edit)",
      "Drone Shoot",
      "Cinematic Video",
      "(Gavdev Reel)",
      "(Couple Reel)",
      "30 Page Album",
      "(Mini Album)",
      "(Couple Calender)",
      "(Leather Bag)",
    ],
    accent: "from-violet-300/[0.10] to-violet-300/[0.02]",
    border: "border-violet-300/20",
    badge: "Premium",
    specialOffer: "Pre-Wedding Shoot Free",
    cta: "Book Diamond",
  },
];

const addOns = [
  { icon: IoFilmOutline, title: "Extra Cinematic Film", price: "₹20,000" },
  { icon: IoImagesOutline, title: "Drone Aerial Coverage", price: "₹15,000" },
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
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-white/60"
                      >
                        <IoCheckmarkCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-amber-200/60"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {/* Highlighted Special Offer */}
                    {plan.specialOffer && (
                      <li className="flex items-start gap-3 text-sm">
                        <IoStarOutline
                          size={18}
                          className={`mt-0.5 shrink-0 ${
                            plan.name === "Gold"
                              ? "text-amber-400 animate-pulse"
                              : "text-violet-400 animate-pulse"
                          }`}
                        />
                        <span
                          className={`font-semibold flex items-center gap-2 ${
                            plan.name === "Gold"
                              ? "text-amber-300"
                              : "text-violet-300"
                          }`}
                        >
                          <span
                            className={`px-2 py-0.5 rounded-lg border ${
                              plan.name === "Gold"
                                ? "bg-amber-500/20 border-amber-400/30"
                                : "bg-violet-500/20 border-violet-400/30"
                            }`}
                          >
                            🌟 {plan.specialOffer}
                          </span>
                        </span>
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.name} package (${plan.price}). Let's discuss booking.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/20 bg-[#25D366]/[0.06] py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/[0.14] hover:text-[#25D366] sm:text-xs"
                  >
                    <IoLogoWhatsapp size={14} />
                    {plan.cta}
                    <IoArrowForward
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </a>
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
            <a
              href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I'm interested in a custom photography package. Let's discuss my requirements.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/[0.10] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#25D366] transition-all hover:bg-[#25D366]/[0.20] hover:text-[#25D366] sm:text-xs"
            >
              <IoLogoWhatsapp size={16} />
              Get in Touch on WhatsApp <IoArrowForward size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </motion.main>
  );
}

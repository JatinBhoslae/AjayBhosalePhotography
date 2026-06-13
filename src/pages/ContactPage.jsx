import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { photographer } from "../data/portfolio";

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

// Helper to get today's date as a string key
const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

const getEnquiryData = () => {
  const stored = localStorage.getItem("enquiryData");
  if (stored) {
    try {
      const data = JSON.parse(stored);
      if (data.date !== getTodayKey()) {
        // Reset if date changed
        return { date: getTodayKey(), count: 0 };
      }
      return data;
    } catch (e) {
      return { date: getTodayKey(), count: 0 };
    }
  }
  return { date: getTodayKey(), count: 0 };
};

const saveEnquiryData = (data) => {
  localStorage.setItem("enquiryData", JSON.stringify(data));
};

const MAX_ENQUIRIES_PER_DAY = 5;

export default function ContactPage() {
  // Debug: Log environment variables
  console.log("EmailJS Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
  console.log("EmailJS Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  console.log("EmailJS Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shoot_type: "",
    date: "",
    location: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryData, setEnquiryData] = useState(getEnquiryData());

  const shootTypes = [
    "Wedding Photography",
    "Pre-Wedding Shoot",
    "Portrait Session",
    "Event Photography",
    "Fashion Shoot",
    "Travel Photography",
    "Commercial Photography",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, phone, shoot_type, date, location, message } =
      formData;

    if (!name.trim()) {
      return { valid: false, message: "Please enter your full name." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    if (!phone.trim()) {
      return { valid: false, message: "Please enter your phone number." };
    }

    if (!shoot_type) {
      return { valid: false, message: "Please select a shoot type." };
    }

    if (!date) {
      return { valid: false, message: "Please select a preferred date." };
    }

    if (!location.trim()) {
      return { valid: false, message: "Please enter the shoot location." };
    }

    if (!message.trim()) {
      return { valid: false, message: "Please enter a message." };
    }

    return { valid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check daily limit
    const currentData = getEnquiryData();
    if (currentData.count >= MAX_ENQUIRIES_PER_DAY) {
      setStatus("error");
      setStatusMessage(
        `You've reached the daily enquiry limit of ${MAX_ENQUIRIES_PER_DAY}. Please try again tomorrow or contact directly via WhatsApp.`,
      );
      return;
    }

    const validation = validateForm();
    if (!validation.valid) {
      setStatus("error");
      setStatusMessage(validation.message);
      return;
    }

    if (
      !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      setStatus("error");
      setStatusMessage(
        "EmailJS configuration is missing. Please contact directly via WhatsApp.",
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("submitting");

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          shoot_type: formData.shoot_type,
          date: formData.date,
          location: formData.location,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      console.log("EmailJS result:", result);

      // Increment count and save
      const newData = {
        date: getTodayKey(),
        count: currentData.count + 1,
      };
      saveEnquiryData(newData);
      setEnquiryData(newData);

      setStatus("success");
      setStatusMessage(
        `Thank you! Your photography enquiry has been sent successfully. I will contact you shortly. (${MAX_ENQUIRIES_PER_DAY - newData.count} enquiries remaining today)`,
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        shoot_type: "",
        date: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS full error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setStatus("error");
      setStatusMessage(
        `Something went wrong. Please try again or contact me directly via WhatsApp. ${error.text || error.message || ""}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const phoneNumber = photographer.phone.replace(/[^0-9]/g, "");
    const message = `Hello, I want to book a photography shoot.

Name: ${formData.name || ""}
Email: ${formData.email || ""}
Phone: ${formData.phone || ""}
Shoot Type: ${formData.shoot_type || ""}
Preferred Date: ${formData.date || ""}
Location: ${formData.location || ""}
Message: ${formData.message || ""}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <CinematicBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-[101] py-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10">
            <Link
              to="/"
              className="group flex items-center gap-3 transition-all duration-300 hover:opacity-80"
            >
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt={photographer.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20 transition-all duration-500 group-hover:ring-amber-200/40"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-display text-xl font-semibold tracking-wide text-white transition-all duration-500">
                  {photographer.name}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/40 transition-all duration-500">
                  {photographer.subtitle}
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/[0.08] hover:text-amber-200"
            >
              <IoArrowBackOutline size={14} />
              Back Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-32 pb-20 px-6 sm:px-10">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-16 text-center"
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-200/60">
                Let's Create Magic Together
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-semibold text-white">
                Book Your Shoot
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-sm text-white/50">
                Fill out the form below to enquire about your photography
                session. I'll get back to you within 24 hours.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-28">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
                    <h2 className="font-display text-xl font-semibold text-white mb-8">
                      Contact Details
                    </h2>

                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200/80">
                          <IoMailOutline size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                            Email
                          </p>
                          <a
                            href={`mailto:${photographer.email}`}
                            className="text-sm text-white/70 hover:text-amber-200 transition-colors"
                          >
                            {photographer.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200/80">
                          <IoLogoWhatsapp size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                            WhatsApp
                          </p>
                          <a
                            href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 hover:text-amber-200 transition-colors"
                          >
                            {photographer.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200/80">
                          <IoLocationOutline size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                            Location
                          </p>
                          <p className="text-sm text-white/70">
                            {photographer.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-200/80">
                          <IoLogoInstagram size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">
                            Instagram
                          </p>
                          <a
                            href={photographer.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 hover:text-amber-200 transition-colors"
                          >
                            @{photographer.instagram}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 sm:p-10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  {/* Enquiry Count Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10">
                      <IoAlertCircleOutline
                        size={16}
                        className="text-amber-200/70"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Daily Enquiries
                      </p>
                      <p className="text-sm text-white/70">
                        <span className="font-bold text-amber-200">
                          {MAX_ENQUIRIES_PER_DAY - enquiryData.count}
                        </span>{" "}
                        of {MAX_ENQUIRIES_PER_DAY} remaining today
                      </p>
                    </div>
                  </motion.div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mb-8 flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-4"
                      >
                        <IoCheckmarkCircleOutline
                          size={24}
                          className="text-green-400 flex-shrink-0"
                        />
                        <p className="text-sm text-green-300/90">
                          {statusMessage}
                        </p>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4"
                      >
                        <IoAlertCircleOutline
                          size={24}
                          className="text-red-400 flex-shrink-0"
                        />
                        <p className="text-sm text-red-300/90">
                          {statusMessage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                        />
                      </div>
                    </div>

                    {/* Shoot Type & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="shoot_type"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                        >
                          Shoot Type *
                        </label>
                        <select
                          id="shoot_type"
                          name="shoot_type"
                          value={formData.shoot_type}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                        >
                          <option value="" className="bg-[#050505]">
                            Select shoot type
                          </option>
                          {shootTypes.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-[#050505]"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="date"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                        >
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label
                        htmlFor="location"
                        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                      >
                        Shoot Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Venue, or Address"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell me about your vision, requirements, and any special requests..."
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-amber-200/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-amber-200/20 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 rounded-full border border-amber-200/20 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#25D366]/90 transition-all duration-300 hover:bg-[#25D366]/20 hover:text-[#25D366]"
                      >
                        <IoLogoWhatsapp size={18} />
                        WhatsApp
                      </a>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

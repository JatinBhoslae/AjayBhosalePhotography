import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import { VideoContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
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
  IoChevronDownOutline,
  IoSparklesOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoLocationOutline,
  IoPlayOutline,
  IoPauseOutline,
  IoExpandOutline,
  IoContractOutline,
  IoEllipsisVertical,
  IoDownloadOutline,
} from "react-icons/io5";
import { HeroCameraCanvas } from "../components/CameraScene.jsx";
import Reveal from "../components/Reveal.jsx";
import BeforeAfterSlider from "../components/BeforeAfterSlider.jsx";
import { cloudinaryImage } from "../lib/cloudinary.js";
import {
  categories,
  faqs,
  photographer,
  photos,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/home image 1.jpg", "/home image 2.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 text-center sm:min-h-screen sm:px-8"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Cinematic background photo"
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
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
          <h1 className="mx-auto max-w-5xl font-display text-4xl min-[380px]:text-5xl leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl">
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
              className="group relative w-full overflow-hidden rounded-full bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
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
              className="group relative w-full overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all sm:w-auto sm:px-8 sm:py-4 sm:text-xs"
            >
              <span className="relative z-10">Work with me</span>
              <motion.div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </motion.button>
          </div>
        </Reveal>
      </div>

      {/* Scroll-down indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <IoChevronDownOutline
          size={28}
          className="animate-bounce-chevron text-white/40"
        />
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
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Orders Delivered" },
];

// Stats are rendered inline inside AboutSection beside Experience

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
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
                  {statsDisplay.map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.08}>
                      <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm transition-all hover:border-amber-200/20 hover:bg-white/[0.04]">
                        <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                          <AnimatedCounter
                            end={stat.value}
                            suffix={stat.suffix}
                            duration={2}
                          />
                        </p>
                        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
                          {stat.label}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 sm:rounded-[2.5rem]">
                <img
                  src="/home image 2.jpg"
                  alt={photographer.name}
                  loading="lazy"
                  className="blur-placeholder h-full w-full object-cover"
                  onLoad={(e) => e.target.classList.add("loaded")}
                />
              </div>
              <div className="absolute -bottom-2 -left-2 rounded-xl border border-white/20 bg-black/80 p-4 backdrop-blur-xl sm:-bottom-6 sm:-left-6 sm:rounded-3xl sm:p-8">
                <p className="font-display text-xl text-amber-200 sm:text-4xl">
                  {photographer.name}
                </p>
                <p className="text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
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

// const stories = [
//   {
//     id: 1,
//     title: "Couple Portrait at Sunset",
//     location: "Marine Drive, Mumbai",
//     camera: "Sony A7 IV",
//     time: "Golden Hour – 6:42 PM",
//     category: "Portrait Photography",
//     image: "/home image 1.jpg",
//     story:
//       "The sky had been cloudy throughout the day. Just a few minutes before sunset, the clouds opened and created a soft golden light across the entire coastline. We had only a short window to capture the moment before the light disappeared. The resulting photograph became one of the most memorable images from the session.",
//   },
//   {
//     id: 2,
//     title: "Street Photography in Mumbai",
//     location: "Chor Bazaar, Mumbai",
//     camera: "Sony A7R V",
//     time: "Blue Hour – 7:15 PM",
//     category: "Street Photography",
//     image: "/home image 2.jpg",
//     story:
//       "The bustling streets of Chor Bazaar came alive as evening approached. I was drawn to the interplay of neon signs and rain-soaked pavements. A vendor arranging his vintage goods caught my eye — his expression told a story of years of dedication to his craft. I waited for the perfect moment when a passing car's headlights illuminated the scene.",
//   },
//   {
//     id: 3,
//     title: "Monsoon Reflection Shot",
//     location: "Gateway of India, Mumbai",
//     camera: "Sony A7S III",
//     time: "Rainy Evening – 8:00 PM",
//     category: "Landscape & Architecture",
//     image: "/images/3.jpg",
//     story:
//       "Monsoon rains had just passed, leaving beautiful reflections on the wet pavement. The Gateway of India stood majestically against the dramatic sky. I positioned my camera low to the ground to capture the symmetry between the monument and its reflection — a timeless moment frozen in time.",
//   },
//   {
//     id: 4,
//     title: "Mountain Landscape at Sunrise",
//     location: "Lonavala Ghats, Maharashtra",
//     camera: "Sony A1",
//     time: "Sunrise – 6:05 AM",
//     category: "Landscape Photography",
//     image: "/images/4.jpg",
//     story:
//       "Waking up at 4 AM was definitely worth it. The mist was rolling through the valleys as the first rays of sun peeked over the mountains. The temperature was crisp, and the silence was only broken by the sound of birds. I set up my tripod and waited for that magical moment when the light hit the peaks just right — pure magic.",
//   },
// ];
//
// function StoriesBehindTheShot() {
//   const [activeStoryIndex, setActiveStoryIndex] = useState(0);
//   const containerRef = useRef(null);
//
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const container = containerRef.current;
//     if (!container) return;
//
//     const storyPanels = container.querySelectorAll(".story-panel");
//     storyPanels.forEach((panel, index) => {
//       ScrollTrigger.create({
//         trigger: panel,
//         start: "top center",
//         onEnter: () => setActiveStoryIndex(index),
//         onEnterBack: () => setActiveStoryIndex(index),
//       });
//     });
//
//     return () => ScrollTrigger.getAll().forEach((st) => st.kill());
//   }, []);
//
//   const activeStory = stories[activeStoryIndex];
//
//   return (
//     <section id="stories" className="relative py-24 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-amber-200/5"
//             style={{
//               width: Math.random() * 40 + 10,
//               height: Math.random() * 40 + 10,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0.2, 0.5, 0.2],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: Math.random() * 5,
//             }}
//           />
//         ))}
//       </div>
//
//       <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
//         <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
//           <div className="relative order-2 lg:order-1">
//             <Reveal>
//               <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeStory.id}
//                     initial={{ opacity: 0, scale: 1.1 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
//                     className="absolute inset-0"
//                   >
//                     <img
//                       src={activeStory.image}
//                       alt={activeStory.title}
//                       className="h-full w-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//                   </motion.div>
//                 </AnimatePresence>
//
//                 <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-amber-200/10 blur-3xl" />
//               </div>
//
//               <motion.div
//                 className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 rounded-2xl border border-white/20 bg-black/80 p-6 backdrop-blur-xl"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <p className="font-display text-lg text-amber-200 sm:text-xl">
//                   {activeStory.title}
//                 </p>
//                 <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">
//                   {activeStory.location}
//                 </p>
//               </motion.div>
//             </Reveal>
//           </div>
//
//           <div className="order-1 lg:order-2">
//             <Reveal>
//               <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
//                 STORY BEHIND THE SHOT
//               </p>
//               <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
//                 Every photograph has a <br />
//                 <span className="text-white/40 italic">story.</span>
//               </h2>
//               <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
//                 A great photograph is more than composition and lighting. It is
//                 a memory, an emotion, and a moment that can never be recreated.
//                 Explore the stories behind some of my favorite captures.
//               </p>
//             </Reveal>
//
//             <div className="mt-10 space-y-8" ref={containerRef}>
//               {stories.map((story, index) => (
//                 <div
//                   key={story.id}
//                   className={`story-panel rounded-3xl border transition-all duration-500 ${
//                     activeStoryIndex === index
//                       ? "border-amber-200/30 bg-gradient-to-b from-amber-200/10 to-white/[0.02]"
//                       : "border-white/10 bg-white/[0.02]"
//                   } p-6 sm:p-8 backdrop-blur-xl`}
//                 >
//                   <div className="grid gap-4 sm:grid-cols-2 mb-6">
//                     <div>
//                       <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
//                         📍 Location
//                       </p>
//                       <p className="mt-1 text-sm text-white/80">
//                         {story.location}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
//                         📷 Camera
//                       </p>
//                       <p className="mt-1 text-sm text-white/80">
//                         {story.camera}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
//                         🕒 Capture Time
//                       </p>
//                       <p className="mt-1 text-sm text-white/80">{story.time}</p>
//                     </div>
//                     <div>
//                       <p className="text-[9px] uppercase tracking-[0.3em] text-amber-200/60">
//                         🎯 Category
//                       </p>
//                       <p className="mt-1 text-sm text-white/80">
//                         {story.category}
//                       </p>
//                     </div>
//                   </div>
//
//                   <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//
//                   <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/60 mb-3">
//                     THE STORY
//                   </p>
//                   <p className="text-sm leading-relaxed text-white/70 sm:text-base">
//                     {story.story}
//                   </p>
//
//                   <div className="mt-6 mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//                 </div>
//               ))}
//             </div>
//
//             <Reveal delay={0.1}>
//               <Link
//                 to="/gallery"
//                 className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white transition-all hover:bg-amber-200/20 hover:border-amber-200/40 sm:text-xs"
//               >
//                 View Full Gallery
//                 <IoArrowForward />
//               </Link>
//             </Reveal>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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
              onClick={() => sessionStorage.setItem("scroll-target", "captured")}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10 sm:text-xs"
            >
              View Full Gallery
              <IoArrowForward />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense">
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
                className="blur-placeholder h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const videos = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781462754/akshay_pooja_mix_vertical_v3gtwj.mp4",
    title: "Akshay & Pooja Wedding",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781462735/Sequence_01_1-1_fqe1fx.mp4",
    title: "Prewedding Sequence",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461839/shoeab_and_aaisha_p5y2qc.mp4",
    title: "Shoeb & Aaisha",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461833/sk_prewedding_satara_02_vr_el5lsz.mp4",
    title: "SK Prewedding Satara",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461832/piyush_haldi_cinematic_fhczmn.mp4",
    title: "Piyush Haldi Cinematic",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781461816/akshay_haldi_blqcvc.mp4",
    title: "Akshay Haldi",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dd4dobz2c/video/upload/q_auto/f_auto/v1781620008/sachin_03_western_pemht1.mp4",
    title: "Sachin Western",
  },
];

function VideosSection() {
  const { setVideoActive } = useContext(VideoContext);
  const videoRefs = useRef([]);
  const [activeVideosCount, setActiveVideosCount] = useState(0);
  const [playingVideos, setPlayingVideos] = useState(videos.map(() => false));
  const [videoProgress, setVideoProgress] = useState(videos.map(() => 0));
  const [videoDuration, setVideoDuration] = useState(videos.map(() => 0));
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const containerRefs = useRef([]);

  const checkActiveVideos = () => {
    let count = 0;
    videoRefs.current.forEach((video) => {
      if (video && !video.muted && !video.paused) {
        count++;
      }
    });
    setActiveVideosCount(count);
    setVideoActive(count > 0);
  };

  const handleVideoPlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = false;
      setPlayingVideos((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = true;
        return newPlaying;
      });
      checkActiveVideos();
    }
  };

  const handleVideoPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true;
      setPlayingVideos((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = false;
        return newPlaying;
      });
      checkActiveVideos();
    }
  };

  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      setVideoProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = video.currentTime;
        return newProgress;
      });
    }
  };

  const handleLoadedMetadata = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      setVideoDuration((prev) => {
        const newDuration = [...prev];
        newDuration[index] = video.duration;
        return newDuration;
      });
    }
  };

  const handleSeek = (index, e) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = Number(e.target.value);
      setVideoProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = Number(e.target.value);
        return newProgress;
      });
    }
  };

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const toggleFullscreen = (index) => {
    const container = containerRefs.current[index];
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreenIndex(null);
    } else {
      container.requestFullscreen().then(() => setFullscreenIndex(index)).catch(() => {});
    }
  };

  const handleDownload = (url, title) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = title || 'video';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setMenuOpenIndex(null);
  };

  const handlePiP = async (index) => {
    const video = videoRefs.current[index];
    if (video && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await video.requestPictureInPicture();
        }
      } catch (e) { console.log('PiP error:', e); }
    }
    setMenuOpenIndex(null);
  };

  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement) setFullscreenIndex(null);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="videos" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
              Cinematography
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Motion stories.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/videos"
              onClick={() => sessionStorage.setItem("scroll-target", "videos")}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white/10 sm:text-xs"
            >
              View All Videos
              <IoArrowForward />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video, index) => (
            <Reveal
              key={video.id}
              delay={index * 0.05}
              className="aspect-video col-span-2 md:col-span-2 lg:col-span-2"
            >
              <div
                ref={(el) => (containerRefs.current[index] = el)}
                className="group relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl"
              >
              <div className="w-full h-full flex items-center justify-center">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.url}
                  muted
                  playsInline
                  preload="metadata"
                  className={index < 4 ? "object-cover" : "w-full h-full object-contain"}
                  style={index < 4 ? { width: "56.25%", aspectRatio: "16 / 9", transform: "rotate(-90deg)" } : {}}
                  onPlay={() => handleVideoPlay(index)}
                  onPause={() => handleVideoPause(index)}
                  onTimeUpdate={() => handleTimeUpdate(index)}
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onVolumeChange={checkActiveVideos}
                />
              </div>

              {/* Custom play/pause overlay */}
              <div
                className="video-controls-overlay"
                onClick={() => togglePlay(index)}
              >
                <button
                  type="button"
                  className="video-play-btn"
                  aria-label={playingVideos[index] ? "Pause video" : "Play video"}
                >
                  {playingVideos[index] ? (
                    <IoPauseOutline size={28} />
                  ) : (
                    <IoPlayOutline size={28} />
                  )}
                </button>
              </div>

              {/* Bottom control bar */}
              <div className="video-bottom-bar">
                <button
                  type="button"
                  className="video-bar-btn"
                  onClick={(e) => { e.stopPropagation(); togglePlay(index); }}
                  aria-label={playingVideos[index] ? "Pause" : "Play"}
                >
                  {playingVideos[index] ? <IoPauseOutline size={16} /> : <IoPlayOutline size={16} />}
                </button>

                <span className="video-bar-time">
                  {formatTime(videoProgress[index])}
                </span>

                <div className="video-bar-progress">
                  <div
                    className="video-bar-progress-fill"
                    style={{ width: videoDuration[index] ? `${(videoProgress[index] / videoDuration[index]) * 100}%` : '0%' }}
                  />
                </div>

                <span className="video-bar-time">
                  {formatTime(videoDuration[index])}
                </span>

                <button
                  type="button"
                  className="video-bar-btn"
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(index); }}
                  aria-label={fullscreenIndex === index ? "Exit fullscreen" : "Fullscreen"}
                >
                  {fullscreenIndex === index ? <IoContractOutline size={16} /> : <IoExpandOutline size={16} />}
                </button>

                <div className="video-bar-menu-wrap">
                  <button
                    type="button"
                    className="video-bar-btn"
                    onClick={(e) => { e.stopPropagation(); setMenuOpenIndex(menuOpenIndex === index ? null : index); }}
                    aria-label="More options"
                  >
                    <IoEllipsisVertical size={16} />
                  </button>
                  {menuOpenIndex === index && (
                    <div className="video-bar-dropdown">
                      <button type="button" onClick={(e) => { e.stopPropagation(); handleDownload(video.url, video.title); }}>
                        <IoDownloadOutline size={14} /> Download
                      </button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); handlePiP(index); }}>
                        <IoExpandOutline size={14} /> Picture-in-Picture
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </div>
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
                className="blur-placeholder h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                onLoad={(e) => e.target.classList.add("loaded")}
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

// Removed FeaturedProjectsSection

const servicePlans = [
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
    border: "border-white/10",
    accent: "from-white/10 to-white/[0.03]",
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
    border: "border-amber-200/20",
    accent: "from-amber-200/[0.12] to-amber-200/[0.03]",
    badge: "Most Popular",
    specialOffer: "Free Drone Shoot",
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
    border: "border-violet-300/20",
    accent: "from-violet-300/[0.10] to-violet-300/[0.02]",
    badge: "Premium",
    specialOffer: "Pre-Wedding Shoot Free",
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
              onClick={() => sessionStorage.setItem("scroll-target", "services")}
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

                  <a
                    href={`https://wa.me/${photographer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.name} package (${plan.price}). Let's discuss booking.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/20 bg-[#25D366]/[0.06] py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/[0.14] hover:text-[#25D366] sm:text-xs"
                  >
                    <IoLogoWhatsapp size={14} />
                    Book {plan.name}
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

        <Reveal>
          <div className="mt-16 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-amber-200/[0.04] to-transparent p-10 text-center backdrop-blur-xl sm:p-14">
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Need a custom package?
            </h3>
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
    </section>
  );
}

function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="Voices of those who lived the journey."
    >
      {/* Desktop grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
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

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-[2.5rem]">
          <div
            className="testimonials-carousel"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
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
                    <h4 className="font-display text-xl text-white">
                      {t.name}
                    </h4>
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
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeSlide ? "w-6 bg-amber-200" : "w-2 bg-white/20"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-200/70">
              FAQ
            </p>
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Common questions.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-white sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-white/40"
                  >
                    <IoChevronDownOutline size={18} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/50">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  formData,
  setFormData,
  handleSubmit,
  status,
  statusMessage,
  isSubmitting,
  handleChange,
  shootTypes,
  getWhatsAppUrl,
  minDate,
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(photographer.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pb-32 pt-24 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70 sm:text-xs">
            Work With Me
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Let's build your story.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <Reveal className="min-w-0 w-full">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-8 space-y-10">
              <div className="space-y-8">
                <a
                  href={`mailto:${photographer.email}`}
                  className="group flex items-center gap-4 sm:gap-5 transition-transform hover:translate-x-2 min-w-0 w-full"
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

                <div className="group flex items-center gap-4 sm:gap-5 min-w-0 w-full">
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
                    <div className="flex flex-wrap items-center justify-between gap-2">
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
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 sm:gap-5 transition-transform hover:translate-x-2 min-w-0 w-full"
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
                  className="group flex items-center gap-4 sm:gap-5 transition-transform hover:translate-x-2 min-w-0 w-full"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    <IoLogoInstagram size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      Instagram
                    </p>
                    <p className="truncate text-base text-white sm:text-lg">
                      @{photographer.instagram}
                    </p>
                  </div>
                </a>

                <a
                  href={photographer.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 sm:gap-5 transition-transform hover:translate-x-2 min-w-0 w-full"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-amber-200 transition-colors group-hover:bg-amber-200 group-hover:text-black">
                    <IoLogoYoutube size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      YouTube
                    </p>
                    <p className="truncate text-base text-white sm:text-lg">
                      {photographer.youtube}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 w-full" delay={0.15}>
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-8 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Shoot Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="shoot_type"
                      value={formData.shoot_type}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        Select type of shoot
                      </option>
                      {shootTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Preferred Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="City / Venue"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your vision, requirements, or any special requests..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-amber-200/50 focus:outline-none focus:ring-0 sm:px-6 sm:py-4 transition-all resize-none"
                  />
                </div>

                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`rounded-2xl border p-4 sm:p-6 flex items-start gap-3 ${
                        status === "success"
                          ? "border-green-500/30 bg-green-500/10"
                          : status === "error"
                            ? "border-red-500/30 bg-red-500/10"
                            : "border-amber-200/30 bg-amber-200/10"
                      }`}
                    >
                      {status === "success" ? (
                        <IoCheckmarkCircleOutline
                          size={20}
                          className="mt-0.5 shrink-0 text-green-400"
                        />
                      ) : status === "error" ? (
                        <IoAlertCircleOutline
                          size={20}
                          className="mt-0.5 shrink-0 text-red-400"
                        />
                      ) : (
                        <IoSparklesOutline
                          size={20}
                          className="mt-0.5 shrink-0 text-amber-200 animate-pulse"
                        />
                      )}
                      <p
                        className={`text-sm leading-relaxed ${
                          status === "success"
                            ? "text-green-200"
                            : status === "error"
                              ? "text-red-200"
                              : "text-amber-100"
                        }`}
                      >
                        {statusMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-full border border-amber-200/20 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <IoLogoWhatsapp size={16} />
                    WhatsApp Instead
                  </a>
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

  // Calculate tomorrow's date for min attribute
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minDate = getTomorrowDate();

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

    // Check enquiry count for this email
    const emailKey = `enquiry_count_${email.toLowerCase()}`;
    const currentCount = parseInt(localStorage.getItem(emailKey) || "0");
    if (currentCount >= 10) {
      return {
        valid: false,
        message:
          "You have reached the maximum limit of 10 enquiries. Please contact directly via WhatsApp.",
      };
    }

    return { valid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Increment and save the enquiry count
      const emailKey = `enquiry_count_${formData.email.toLowerCase()}`;
      const currentCount = parseInt(localStorage.getItem(emailKey) || "0");
      localStorage.setItem(emailKey, (currentCount + 1).toString());

      setStatus("success");
      setStatusMessage(
        "Thank you! Your photography enquiry has been sent successfully. I will contact you shortly.",
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
    const message = `Hello, I want to book a photography shoot.\n\nName: ${formData.name || ""}\nEmail: ${formData.email || ""}\nPhone: ${formData.phone || ""}\nShoot Type: ${formData.shoot_type || ""}\nPreferred Date: ${formData.date || ""}\nLocation: ${formData.location || ""}\nMessage: ${formData.message || ""}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

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
        {/* <StoriesBehindTheShot /> */}
        <CapturedMomentsSection />
        <VideosSection />
        <ServicesPreviewSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          status={status}
          statusMessage={statusMessage}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          shootTypes={shootTypes}
          getWhatsAppUrl={getWhatsAppUrl}
          minDate={minDate}
        />
        <Footer />
      </main>
    </div>
  );
}

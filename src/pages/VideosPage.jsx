import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
];

export default function VideosPage() {
  const videoRefs = useRef([]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-6 pb-20 pt-32 sm:px-8 sm:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl sm:mb-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-200/60 sm:text-xs">
            Motion Gallery
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-white sm:text-7xl">
            Moments in <br />
            <span className="text-white/40 italic">motion.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
            Cinematic highlights and wedding films that tell a story beyond
            still frames.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:rounded-3xl"
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                muted
                playsInline
                loop
                preload="metadata"
                className="w-full aspect-video object-cover transition-all duration-700 group-hover:scale-105"
                onMouseEnter={() => videoRefs.current[index]?.play()}
                onMouseLeave={() => {
                  const el = videoRefs.current[index];
                  if (el) {
                    el.pause();
                    el.currentTime = 0;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 right-4 text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-display text-sm font-medium">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}

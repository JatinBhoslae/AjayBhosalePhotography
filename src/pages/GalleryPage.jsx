import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "../components/Lightbox.jsx";
import { photos } from "../data/portfolio";

const filters = [
  "All",
  ...Array.from(new Set(photos.map((photo) => photo.category))),
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef(null);

  const visiblePhotos = useMemo(
    () => photos.slice(0, visibleCount),
    [visibleCount],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < photos.length) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

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
            Archive
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-white sm:text-7xl">
            A life through the <br />
            <span className="text-white/40 italic">cinematic lens.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
            A curated selection of moments, characters, and atmosphere captured
            across various commissions and personal explorations.
          </p>
        </div>

        <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4 sm:gap-6 sm:space-y-6">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 8) * 0.05 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:rounded-3xl"
            >
              <img
                src={photo.url || photo.image}
                alt={photo.title || "Gallery"}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div
          ref={sentinelRef}
          className="flex h-32 items-center justify-center text-[10px] uppercase tracking-[0.4em] text-white/20 sm:text-xs"
        >
          {visibleCount < photos.length
            ? "Loading More Frames"
            : "End Of Collection"}
        </div>
      </div>

      <Lightbox
        items={visiblePhotos}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onChange={setSelectedIndex}
      />
    </motion.main>
  );
}

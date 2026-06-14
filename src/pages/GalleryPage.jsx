import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import { photos } from "../data/portfolio";

const filters = [
  "All",
  ...Array.from(new Set(photos.map((photo) => photo.category))),
];

export default function GalleryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = searchParams.get("category") || "All";
  const [activeFilter, setActiveFilter] = useState(
    filters.includes(initialCategory) ? initialCategory : "All",
  );
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef(null);

  // Keep selectedIndex in sync with searchParams
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const photoParam = searchParams.get("photo");
    const newIndex = photoParam !== null ? parseInt(photoParam, 10) : null;
    setSelectedIndex(newIndex);
  }, [searchParams]);

  const filteredPhotos = useMemo(
    () =>
      activeFilter === "All"
        ? photos
        : photos.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  const visiblePhotos = useMemo(
    () => filteredPhotos.slice(0, visibleCount),
    [filteredPhotos, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(12);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredPhotos.length) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 0.1 },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredPhotos.length]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const newSearchParams = new URLSearchParams(searchParams);
    if (filter === "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", filter);
    }
    newSearchParams.delete("photo");
    navigate({ search: newSearchParams.toString() }, { replace: true });
  };

  const handlePhotoClick = (index) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("photo", index.toString());
    navigate({ search: newSearchParams.toString() }); // Push new history entry
  };

  const handleLightboxClose = () => {
    // Check if we came to this page with a photo param already (from a direct link)
    // or if we added it by clicking (so back button is safe)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("photo");
      navigate({ search: newSearchParams.toString() }, { replace: true });
    }
  };

  const handleLightboxChange = (newIndex) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("photo", newIndex.toString());
    navigate({ search: newSearchParams.toString() }, { replace: true });
  };

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

        {/* Category Filter Buttons */}
        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterClick(filter)}
              className={`rounded-full border px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 sm:text-xs ${
                activeFilter === filter
                  ? "border-amber-200/40 bg-amber-200/[0.12] text-amber-200"
                  : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4 sm:gap-6 sm:space-y-6">
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 8) * 0.05 }}
              onClick={() => handlePhotoClick(index)}
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:rounded-3xl break-inside-avoid inline-block w-full"
            >
              <img
                src={photo.url || photo.image}
                alt={photo.title || "Gallery"}
                loading="lazy"
                className="w-full transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div
          ref={sentinelRef}
          className="flex h-32 items-center justify-center text-[10px] uppercase tracking-[0.4em] text-white/20 sm:text-xs"
        >
          {visibleCount < filteredPhotos.length
            ? "Loading More Frames"
            : "End Of Collection"}
        </div>
      </div>

      <Lightbox
        items={visiblePhotos}
        index={selectedIndex}
        onClose={handleLightboxClose}
        onChange={handleLightboxChange}
      />
    </motion.main>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoClose,
  IoCameraOutline,
  IoApertureOutline,
  IoSpeedometerOutline,
  IoFlashOutline,
} from "react-icons/io5";

/** Parse "1/320 sec, f/2.8, ISO 800" into structured EXIF fields */
function parseSettings(settings) {
  if (!settings) return null;
  const parts = settings.split(",").map((s) => s.trim());
  const shutter = parts[0] || null;
  const aperture = parts[1] || null;
  const iso = parts[2] || null;
  return { shutter, aperture, iso };
}

export default function Lightbox({ items, index, onClose, onChange }) {
  const touchStartX = useRef(null);

  useEffect(() => {
    if (index === null) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % items.length);
      }
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onChange, onClose]);

  if (index === null) {
    return null;
  }

  const item = items[index];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (diff > threshold) {
      onChange((index - 1 + items.length) % items.length);
    } else if (diff < -threshold) {
      onChange((index + 1) % items.length);
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-xl overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="absolute right-6 top-6 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/15"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <IoClose size={22} />
        </button>

        {/* Photo Counter */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-widest text-white/50 backdrop-blur-md sm:top-8">
          {index + 1} / {items.length}
        </div>

        <button
          type="button"
          className="hidden md:flex absolute left-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/15 sm:left-8"
          onClick={() => onChange((index - 1 + items.length) % items.length)}
          aria-label="Previous image"
        >
          <IoArrowBack size={20} />
        </button>

        <motion.figure
          key={item.slug}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="mx-auto max-w-6xl"
        >
          <img
            src={item.altImage ?? item.image}
            alt={item.title}
            className="max-h-[70vh] md:max-h-[78vh] w-auto h-auto mx-auto rounded-2xl md:rounded-[2rem] object-contain shadow-2xl"
          />
          <figcaption className="mt-5 flex flex-col gap-4 text-white/80 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">
                {item.category}
              </p>
              <h3 className="font-display text-3xl text-white">{item.title}</h3>
            </div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/55">
              {item.location} / {item.date}
            </p>
          </figcaption>

          {/* EXIF / Camera Settings Bar */}
          {(item.settings || item.equipment) &&
            (() => {
              const exif = parseSettings(item.settings);
              return (
                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  {exif?.shutter && (
                    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                      <IoSpeedometerOutline
                        size={14}
                        className="text-amber-200/60"
                      />
                      <span className="text-[11px] font-medium tracking-wide text-white/60">
                        {exif.shutter}
                      </span>
                    </div>
                  )}
                  {exif?.aperture && (
                    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                      <IoApertureOutline
                        size={14}
                        className="text-amber-200/60"
                      />
                      <span className="text-[11px] font-medium tracking-wide text-white/60">
                        {exif.aperture}
                      </span>
                    </div>
                  )}
                  {exif?.iso && (
                    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                      <IoFlashOutline size={14} className="text-amber-200/60" />
                      <span className="text-[11px] font-medium tracking-wide text-white/60">
                        {exif.iso}
                      </span>
                    </div>
                  )}
                  {item.equipment && (
                    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                      <IoCameraOutline
                        size={14}
                        className="text-amber-200/60"
                      />
                      <span className="text-[11px] font-medium tracking-wide text-white/60">
                        {item.equipment}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
        </motion.figure>

        <button
          type="button"
          className="hidden md:flex absolute right-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/15 sm:right-8"
          onClick={() => onChange((index + 1) % items.length)}
          aria-label="Next image"
        >
          <IoArrowForward size={20} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

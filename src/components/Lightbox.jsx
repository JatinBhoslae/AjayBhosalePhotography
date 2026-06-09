import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoArrowBack, IoArrowForward, IoClose } from "react-icons/io5";

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
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 px-4 py-8 backdrop-blur-xl"
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

        <button
          type="button"
          className="absolute left-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/15 sm:left-8"
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
            className="max-h-[78vh] w-full rounded-[2rem] object-cover shadow-2xl"
          />
          <figcaption className="mt-5 flex flex-col gap-2 text-white/80 sm:flex-row sm:items-end sm:justify-between">
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
        </motion.figure>

        <button
          type="button"
          className="absolute right-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/15 sm:right-8"
          onClick={() => onChange((index + 1) % items.length)}
          aria-label="Next image"
        >
          <IoArrowForward size={20} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from '../components/Lightbox.jsx';
import { photos } from '../data/portfolio';

const filters = ['All', ...Array.from(new Set(photos.map((photo) => photo.category)))];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const sentinelRef = useRef(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'All') {
      return photos;
    }

    return photos.filter((photo) => photo.category === activeFilter);
  }, [activeFilter]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeFilter]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((current) => Math.min(current + 4, filteredPhotos.length));
          }
        });
      },
      { rootMargin: '300px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredPhotos.length]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-5 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-200/70">Gallery</p>
          <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-7xl">
            A flowing wall of atmosphere and memory.
          </h1>
          <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
            Filter by genre, open a cinematic lightbox, and keep scrolling as new frames load into view.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const active = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-3 text-sm uppercase tracking-[0.22em] transition ${
                  active
                    ? 'border-amber-200/30 bg-amber-200 text-black'
                    : 'border-white/12 bg-white/[0.04] text-white/68 hover:bg-white/[0.08]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.slug}
              type="button"
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] text-left"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                style={{ minHeight: index % 2 === 0 ? '28rem' : '22rem' }}
              />
              <div className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/45">
                  <span>{photo.category}</span>
                  <span>{photo.date}</span>
                </div>
                <h2 className="font-display text-3xl text-white">{photo.title}</h2>
                <p className="text-sm text-white/55">{photo.location}</p>
              </div>
            </button>
          ))}
        </div>

        <div ref={sentinelRef} className="flex h-16 items-center justify-center text-sm uppercase tracking-[0.35em] text-white/35">
          {visibleCount < filteredPhotos.length ? 'Loading More Frames' : 'End Of Collection'}
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

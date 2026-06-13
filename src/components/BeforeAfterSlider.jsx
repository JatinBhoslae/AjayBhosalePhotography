import { useState, useRef, useCallback, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "RAW / LOG",
  afterLabel = "CINEMATIC GRADE",
}) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const getPositionFromEvent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      setPosition(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPosition(getPositionFromEvent(e.clientX));
    },
    [isDragging, getPositionFromEvent],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className="before-after-slider group relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden rounded-2xl border border-white/10 sm:aspect-[16/10] sm:rounded-3xl"
      onPointerDown={handlePointerDown}
      style={{ touchAction: "none" }}
    >
      {/* After image (full width, behind) */}
      <img
        src={afterSrc}
        alt="Cinematic graded"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt="Raw ungraded"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Slider line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 w-0.5 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Drag handle */}
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md sm:h-12 sm:w-12">
          <IoChevronBack size={14} className="opacity-80" />
          <IoChevronForward size={14} className="opacity-80" />
        </div>
      </div>

      {/* Labels */}
      <div
        className={`absolute left-3 top-3 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-opacity duration-300 sm:left-5 sm:top-5 sm:px-3 sm:py-2 sm:text-[10px] ${isDragging ? "opacity-30" : "opacity-100"}`}
      >
        {beforeLabel}
      </div>
      <div
        className={`absolute right-3 top-3 rounded-lg border border-white/10 bg-black/50 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-200/80 backdrop-blur-sm transition-opacity duration-300 sm:right-5 sm:top-5 sm:px-3 sm:py-2 sm:text-[10px] ${isDragging ? "opacity-30" : "opacity-100"}`}
      >
        {afterLabel}
      </div>

      {/* Instruction hint (fades after interaction) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-widest text-white/40 backdrop-blur-sm transition-opacity duration-500 sm:bottom-5 sm:px-4 sm:py-2 sm:text-[10px] ${position !== 50 ? "opacity-0" : "opacity-100"}`}
      >
        ← Drag to compare →
      </div>
    </div>
  );
}

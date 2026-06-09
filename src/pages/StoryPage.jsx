import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { photos } from "../data/portfolio";

export default function StoryPage() {
  const { slug } = useParams();
  const photo = photos.find((item) => item.slug === slug) ?? photos[0];
  const related = photos.filter((item) => item.slug !== photo.slug).slice(0, 3);

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-32 sm:px-8">
        <div className="absolute inset-0">
          <img
            src={photo.altImage}
            alt={photo.title}
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-[#050505]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/gallery"
            className="text-xs uppercase tracking-[0.35em] text-white/55 transition hover:text-white"
          >
            Back To Gallery
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
                {photo.category}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-7xl">
                {photo.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                {photo.location} / {photo.date}
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
              <div className="grid gap-4 text-sm text-white/65">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Camera Settings
                  </p>
                  <p className="mt-2">{photo.settings}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Equipment Used
                  </p>
                  <p className="mt-2">{photo.equipment}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Challenge During Capture
                  </p>
                  <p className="mt-2">{photo.challenges}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="story-prose rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-10">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              Story Behind The Shot
            </p>
            {photo.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="space-y-5">
            <img
              src={photo.image}
              alt={photo.title}
              className="h-96 sm:h-[32rem] w-full rounded-[2rem] object-cover"
            />
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                Editor's Notes
              </p>
              <p className="mt-4 text-base leading-8 text-white/65">
                This layout is intentionally paced like a photography magazine
                article, allowing the image to breathe before the technical
                details arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
            Related Stories
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/story/${item.slug}`}
                className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                    {item.category}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-white">
                    {item.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}

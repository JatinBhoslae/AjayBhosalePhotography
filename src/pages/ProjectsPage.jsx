import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { IoArrowForward } from "react-icons/io5";

function Reveal({ children, y = 48, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative px-5 pb-20 pt-32 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-200/70">
            Projects
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-7xl">
            Thematic explorations and narratives.
          </h1>
          <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
            A comprehensive collection of thematic series, editorial
            commissions, and visual documentaries.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Reveal>
                  <p className="text-[10px] uppercase tracking-[0.45em] text-amber-200/70">
                    {project.location}
                  </p>
                  <h3 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-6 text-lg leading-8 text-white/65">
                    {project.story}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">
                        Client
                      </p>
                      <p className="mt-1 text-sm text-white/80">
                        {project.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">
                        Equipment
                      </p>
                      <p className="mt-1 text-sm text-white/80">
                        {project.equipment}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-amber-200 transition hover:gap-4"
                    >
                      View Project Case Study <IoArrowForward />
                    </button>
                  </div>
                </Reveal>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="grid grid-cols-2 gap-4">
                  <Reveal className="col-span-2 overflow-hidden rounded-3xl border border-white/10">
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </Reveal>
                  <Reveal
                    delay={0.1}
                    className="overflow-hidden rounded-3xl border border-white/10"
                  >
                    <img
                      src={project.images[1]}
                      alt={project.name}
                      className="aspect-square w-full object-cover"
                    />
                  </Reveal>
                  <Reveal
                    delay={0.2}
                    className="overflow-hidden rounded-3xl border border-white/10"
                  >
                    <img
                      src={project.images[2]}
                      alt={project.name}
                      className="aspect-square w-full object-cover"
                    />
                  </Reveal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}

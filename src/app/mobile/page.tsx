"use client";
import Navbar from "@/componets/navbar";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiSmartphone, FiRefreshCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseconfig";

type MobileProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  live?: string;
  github?: string;
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function Mobile() {
  const [projects, setProjects] = useState<MobileProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const snap = await getDocs(collection(db, "mobileProjects"));
      const data = snap.docs.map(doc => {
        const d = doc.data();
        if (!d.title || !d.description || !d.image) return null;
        return {
          id: doc.id,
          title: d.title,
          description: d.description,
          image: d.image,
          tags: Array.isArray(d.tags) ? d.tags.filter((t: any) => typeof t === "string") : [],
          live: typeof d.live === "string" ? d.live : undefined,
          github: typeof d.github === "string" ? d.github : undefined,
        };
      }).filter(Boolean) as MobileProject[];
      data.sort((a, b) => b.id.localeCompare(a.id));
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* ── Hero ── */}
        <motion.section
          className="text-center mb-14 md:mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none rounded-3xl" />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-5"
            >
              <FiSmartphone size={14} />
              Mobile Development
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Mobile{" "}
              <span className="gradient-text">App Projects</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed"
            >
              Apps crafted with Flutter and Firebase — beautiful, fast, and cross-platform.
            </motion.p>
          </div>
        </motion.section>

        {/* ── Projects Grid ── */}
        <section className="mb-16 md:mb-20">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card overflow-hidden">
                  <div className="skeleton h-48 rounded-none" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-5 w-3/4" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="card p-12 text-center border-red-100 bg-red-50">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={fetchProjects} className="btn-primary !bg-red-500 inline-flex items-center gap-2">
                <FiRefreshCw size={14} /> Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="card p-16 text-center border-dashed">
              <FiSmartphone size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-400">No mobile projects found. Check back later!</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={item}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    className="card overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="h-48 sm:h-52 relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={projects.indexOf(project) <= 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />
                    </div>

                    <div className="p-5">
                      <h2 className="font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {project.title}
                      </h2>
                      <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>

                      {/* Links */}
                      {(project.live || project.github) && (
                        <div className="flex gap-4 pt-3 border-t border-slate-50">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 2 }}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              <FiGithub size={13} /> Code
                            </motion.a>
                          )}
                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 2 }}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-auto"
                            >
                              <FiExternalLink size={13} /> Live Demo
                            </motion.a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* ── CTA ── */}
        <motion.section
          id="contact"
          className="card bg-gradient-to-br from-blue-600 to-sky-500 border-0 !rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">📱</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a mobile app idea?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Let's work together to bring it to life. From concept to App Store — I've got you covered.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:shadow-xl transition-all"
          >
            Get in Touch →
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
"use client";
import { motion } from "framer-motion";
import Navbar from "@/componets/navbar";
import Image from "next/image";
import { BsDatabase, BsBook, BsCheckCircleFill, BsCircleHalf, BsCircle } from "react-icons/bs";
import { FiGithub, FiRefreshCw, FiExternalLink } from "react-icons/fi";
import { TbFileDelta } from "react-icons/tb";
import { JSX, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseconfig";

type LearningProject = {
  id: string; title: string; description: string; image: string;
  status: "Not Started" | "Ongoing" | "Completed" | "Completed: still refining";
  tags: string[]; github?: string; createdAt?: string;
};

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const ci = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } };
const scaleUp = { hidden: { scale: 0.94, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } } };

const statusConfig: Record<string, { label: string; cls: string; icon: JSX.Element; pct: number }> = {
  "Completed":               { label: "Completed",      cls: "status-completed",  icon: <BsCheckCircleFill className="text-green-500" />, pct: 100 },
  "Ongoing":                 { label: "In Progress",    cls: "status-ongoing",    icon: <BsCircleHalf className="text-yellow-500" />,     pct: 60  },
  "Completed: still refining":{ label: "Refining",      cls: "status-refining",   icon: <BsCircleHalf className="text-orange-400" />,     pct: 85  },
  "Not Started":             { label: "Not Started",    cls: "status-notstarted", icon: <BsCircle className="text-slate-300" />,           pct: 0   },
};

// Learning path with per-topic progress metadata
const learningPath = [
  { topic: "R Programming",             status: "Completed",  pct: 100 },
  { topic: "Mathematics for ML",        status: "Completed",  pct: 100 },
  { topic: "Python for Data Science",   status: "Ongoing",    pct: 75  },
  { topic: "Data Analysis with Pandas", status: "Ongoing",    pct: 60  },
  { topic: "Supervised Learning",       status: "Ongoing",    pct: 40  },
  { topic: "Unsupervised Learning",     status: "Not Started",pct: 0   },
];

// Resource cards
const resources = [
  {
    title: "Hands-On ML with R",
    author: "Bradley Boehmke",
    href: "https://bradleyboehmke.github.io/HOML/",
    type: "Book",
    color: "bg-blue-50 border-blue-100",
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "fast.ai Practical Deep Learning",
    author: "fast.ai",
    href: "https://course.fast.ai",
    type: "Course",
    color: "bg-sky-50 border-sky-100",
    iconColor: "bg-sky-100 text-sky-600",
  },
  {
    title: "Kaggle Learn",
    author: "Kaggle",
    href: "https://www.kaggle.com/learn",
    type: "Platform",
    color: "bg-indigo-50 border-indigo-100",
    iconColor: "bg-indigo-100 text-indigo-600",
  },
];

const skills = [
  { name: "R", icon: "/r.webp" },
  { name: "Python", icon: "/python.png" },
  { name: "Pandas", icon: "/pandas.png" },
  { name: "NumPy", icon: "/numpy.png" },
  { name: "Matplotlib", icon: "/mat.jpeg" },
  { name: "Scikit-learn", icon: "/sci.webp" },
  { name: "Jupyter", icon: "/jp.webp" },
];

function ProgressBar({ pct, status }: { pct: number; status: string }) {
  const barColor =
    status === "Completed" ? "bg-green-400" :
    status === "Ongoing" ? "bg-blue-400" :
    status === "Completed: still refining" ? "bg-orange-400" : "bg-slate-200";

  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${barColor}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default function ML() {
  const [learningProjects, setLearningProjects] = useState<LearningProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true); setErrorProjects(null);
      const snap = await getDocs(collection(db, "learningProjects"));
      const data = snap.docs.map(doc => {
        const d = doc.data();
        if (!d.title || !d.description) return null;
        return {
          id: doc.id, title: d.title, description: d.description,
          image: d.image ?? "/default-project.png",
          status: ["Not Started", "Ongoing", "Completed", "Completed: still refining"].includes(d.status)
            ? d.status as LearningProject["status"] : "Not Started",
          tags: Array.isArray(d.tags) ? d.tags.filter((t: any) => typeof t === "string") : [],
          github: typeof d.github === "string" ? d.github : undefined,
          createdAt: d.createdAt?.toDate()?.toISOString() ?? new Date().toISOString(),
        };
      }).filter(Boolean) as LearningProject[];
      data.sort((a, b) => (b.createdAt ?? b.id).localeCompare(a.createdAt ?? a.id));
      setLearningProjects(data);
    } catch (err) {
      setErrorProjects(err instanceof Error ? err.message : "Failed to load projects.");
    } finally { setLoadingProjects(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16 md:space-y-24"
        initial="hidden" animate="visible" variants={cv}
      >
        {/* ── HERO ── */}
        <motion.section variants={fadeIn} className="text-center relative py-4">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none rounded-3xl" />
          <div className="relative">
            <motion.div variants={ci}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-5">
              <BsDatabase size={14} /> Learning Journey
            </motion.div>
            <motion.h1 variants={ci} className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
              My <span className="gradient-text">Data Science</span> Path
            </motion.h1>
            <motion.p variants={ci} className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Documenting my progress as I learn Machine Learning and Data Science — the wins, the struggles, and everything between.
            </motion.p>
          </div>
        </motion.section>

        {/* ── LEARNING FOCUS — progress tracker ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="mb-8">
            <p className="section-label">Roadmap</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Current Learning Focus</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Progress tracker — 3/5 wide */}
            <div className="lg:col-span-3 card p-6 sm:p-8 bg-white">
              <h3 className="text-sm font-bold text-slate-500 mb-6 section-label">Topics & Progress</h3>
              <div className="space-y-5">
                {learningPath.map((item, i) => {
                  const cfg = statusConfig[item.status] ?? statusConfig["Not Started"];
                  return (
                    <motion.div key={i} variants={ci} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex-shrink-0 text-base">{cfg.icon}</span>
                          <span className="text-sm font-semibold text-slate-700 truncate">{item.topic}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>
                          <span className="text-xs text-slate-400 w-8 text-right">{item.pct}%</span>
                        </div>
                      </div>
                      <ProgressBar pct={item.pct} status={item.status} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Overall progress summary */}
              <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Overall progress</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
                      initial={{ width: 0 }} whileInView={{ width: "63%" }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }} />
                  </div>
                  <span className="text-sm font-bold gradient-text">63%</span>
                </div>
              </div>
            </div>

            {/* Resources — 2/5 wide */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-slate-500 section-label">Learning Resources</h3>
              {resources.map((r) => (
                <motion.a
                  key={r.title}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={ci}
                  whileHover={{ y: -2 }}
                  className={`card flex items-start gap-4 p-4 border ${r.color} hover:shadow-md group block`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${r.iconColor}`}>
                    <BsBook size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">{r.title}</p>
                      <FiExternalLink size={13} className="text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{r.author}</p>
                    <span className="tag mt-2 inline-flex">{r.type}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── LEARNING PROJECTS ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="mb-8">
            <p className="section-label">Projects</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Learning Projects</h2>
          </div>

          {loadingProjects ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="card overflow-hidden">
                  <div className="skeleton h-44 rounded-none" />
                  <div className="p-5 space-y-3"><div className="skeleton h-5 w-3/4" /><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-5/6" /></div>
                </div>
              ))}
            </div>
          ) : errorProjects ? (
            <div className="card p-10 text-center border-red-100 bg-red-50">
              <p className="text-red-500 mb-4">{errorProjects}</p>
              <button onClick={fetchProjects} className="btn-primary !bg-red-500 inline-flex items-center gap-2"><FiRefreshCw size={14} /> Retry</button>
            </div>
          ) : learningProjects.length === 0 ? (
            <div className="card p-16 text-center border-dashed">
              <p className="text-slate-400">No projects found. Check back later!</p>
            </div>
          ) : (
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {learningProjects.map(project => {
                const cfg = statusConfig[project.status] ?? statusConfig["Not Started"];
                return (
                  <motion.article key={project.id} variants={scaleUp} whileHover={{ y: -4 }} className="card overflow-hidden group">
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100">
                      <Image src={project.image} alt={project.title} fill
                        className="object-contain transition-transform group-hover:scale-105 duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">{project.title}</h3>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.cls}`}>{cfg.label}</span>
                      </div>

                      {/* Inline progress bar on card */}
                      <ProgressBar pct={cfg.pct} status={project.status} />

                      <p className="text-sm text-slate-500 mt-3 mb-3 line-clamp-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">{project.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}</div>

                      {project.github && project.github !== "#" && (
                        <div className="pt-3 border-t border-slate-50">
                          <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ x: 2 }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors">
                            <FiGithub size={13} /> View Code
                          </motion.a>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </motion.section>

        {/* ── SKILLS / TOOLKIT ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-100 p-8 md:p-10">
          <div className="text-center mb-10">
            <p className="section-label">Toolkit</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">My Data Toolkit</h2>
            <p className="text-slate-400 text-sm mt-2">Technologies I use to explore and build data projects</p>
          </div>
          <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4" variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {skills.map((skill, i) => (
              <motion.div key={i} variants={scaleUp} whileHover={{ y: -3, scale: 1.04 }}
                className="card p-3 flex flex-col items-center gap-2 cursor-default">
                <div className="w-10 h-10 relative">
                  <Image src={skill.icon} alt={skill.name} fill className="object-contain" sizes="40px" />
                </div>
                <span className="text-xs font-semibold text-slate-600 text-center">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="card bg-gradient-to-br from-blue-600 to-sky-500 border-0 !rounded-3xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Follow My Learning Journey</h3>
          <p className="text-blue-100 text-sm max-w-xl mx-auto mb-7 leading-relaxed">
            Documenting my entire learning process — the successes, the failures, and everything in between.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <motion.a href="#" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:shadow-xl transition-all">
              Subscribe to Updates
            </motion.a>
            <motion.a href="/contact" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-block border-2 border-white/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
              Contact Me
            </motion.a>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
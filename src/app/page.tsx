"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/componets/navbar";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseconfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface Experience {
  id: string; title: string; company: string; type: string;
  period: string; description: string; icon: string; tags: string[];
}
interface Project {
  id: string; title: string; description: string; image: string;
  tags: string[]; projectUrl?: string; githubUrl?: string;
}
interface ResumeData {
  resumeUrl: string; fileName: string; lastUpdated: string; version: string;
}

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const ci = { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const slideLeft = { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } } };
const slideRight = { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } } };
const scaleUp = { hidden: { scale: 0.94, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } } };

const skillCategories = [
  {
    label: "Flutter & Mobile",
    emoji: "📱",
    badgeClass: "bg-blue-50 text-blue-700 border border-blue-100",
    description: "Cross-platform apps that feel truly native on every device.",
    skills: [
      { name: "Flutter", icon: "/flutter.png" },
      { name: "Dart", icon: "/dart.png" },
      { name: "Firebase", icon: "/firebase.png" },
    ],
    tags: ["GetX", "BLoC", "Riverpod", "Hive", "Dio", "Play Store"],
  },
  {
    label: "Fullstack & Web",
    emoji: "🌐",
    badgeClass: "bg-sky-50 text-sky-700 border border-sky-100",
    description: "End-to-end web products — from pixel-perfect UIs to robust APIs.",
    skills: [
      { name: "Next.js", icon: "/next.svg" },
      { name: "React", icon: "/react.png" },
      { name: "Node.js", icon: "/node.png" },
      { name: "JavaScript", icon: "/js.png" },
    ],
    tags: ["TypeScript", "PostgreSQL", "REST", "GraphQL", "Docker"],
  },
  {
    label: "AI & Data Science",
    emoji: "🤖",
    badgeClass: "bg-indigo-50 text-indigo-700 border border-indigo-100",
    description: "Turning raw data into intelligent, data-driven products.",
    skills: [
      { name: "Figma", icon: "/figma.png" },
    ],
    tags: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "BigQuery", "R"],
  },
];

const statBar = [
  { value: "3+", label: "Years of experience" },
  { value: "10+", label: "Projects shipped" },
  { value: "3", label: "Core specialties" },
];

export default function Home() {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loadingExperience, setLoadingExperience] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingResume, setLoadingResume] = useState(true);
  const [errorExperience, setErrorExperience] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const snap = await getDocs(query(collection(db, "experience"), orderBy("id", "asc")));
        setExperienceData(snap.docs.map(d => ({ id: d.id, ...d.data() } as Experience)));
      } catch { setErrorExperience("Failed to load experience"); }
      finally { setLoadingExperience(false); }
    };
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(query(collection(db, "projects"), orderBy("id", "asc")));
        setProjectsData(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      } catch { setErrorProjects("Failed to load projects"); }
      finally { setLoadingProjects(false); }
    };
    const fetchResume = async () => {
      try {
        const resumeDoc = await getDoc(doc(db, "projects", "resume"));
        if (resumeDoc.exists()) {
          setResumeData(resumeDoc.data() as ResumeData);
        } else {
          const url = await getDownloadURL(ref(getStorage(), "portfolio/resume.pdf"));
          setResumeData({ resumeUrl: url, fileName: "MOBISA KWAMBOKA RESUME.pdf", lastUpdated: new Date().toISOString(), version: "1.0.0" });
        }
      } catch {
        setResumeData({ resumeUrl: "/resume1.pdf", fileName: "MOBISA KWAMBOKA RESUME.pdf", lastUpdated: new Date().toISOString(), version: "1.0.0" });
      } finally { setLoadingResume(false); }
    };
    fetchExperience(); fetchProjects(); fetchResume();
  }, []);

  const handleResumeDownload = () => {
    if (!resumeData) return;
    const a = document.createElement("a");
    a.href = resumeData.resumeUrl; a.download = resumeData.fileName;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
    catch { return "Recent"; }
  };

  const socials = [
    { href: "https://x.com/kwamboka_012", icon: <FiTwitter size={16} />, label: "Twitter" },
    { href: "https://github.com/mobisa-012", icon: <FiGithub size={16} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/mobisa-kwamboka-a56691223/", icon: <FiLinkedin size={16} />, label: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        className="relative overflow-hidden px-4 sm:px-6 pt-24 pb-16 md:py-32"
        initial="hidden" animate="visible" variants={cv}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-50 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          <motion.div className="md:col-span-3 space-y-6" variants={slideLeft}>
            <motion.div variants={ci}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </motion.div>

            <motion.h1 variants={ci}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-slate-900">
              Hi, I'm{" "}<span className="gradient-text">Mobisa Kwamboka</span>
            </motion.h1>

            <motion.div variants={ci} className="flex flex-wrap gap-2">
              {["Software Engineer", "Flutter Developer", "Data Scientist"].map(r => (
                <span key={r} className="tag !text-sm !px-3 !py-1">{r}</span>
              ))}
            </motion.div>

            <motion.p variants={ci} className="text-slate-500 text-lg leading-relaxed max-w-xl">
              I transform data into impactful products. Combining machine learning expertise with design
              sensibility, I build scalable applications that bridge insights with exceptional user experiences.
            </motion.p>

            <motion.div variants={ci} className="flex flex-wrap gap-3 pt-2">
              <a href="#projects" className="btn-primary">View My Work →</a>
              <a href="/contact" className="btn-outline">Contact Me</a>
              {!loadingResume && (
                <button onClick={handleResumeDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm relative group">
                  <FiDownload size={15} className="group-hover:animate-bounce" />
                  Download CV
                  {resumeData && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">New</span>
                  )}
                </button>
              )}
            </motion.div>

            <motion.div variants={ci} className="flex items-center gap-4 pt-2">
              <span className="flex items-center gap-1.5 text-sm text-slate-400"><FiMapPin size={13} /> Nairobi, Kenya</span>
              <span className="w-px h-4 bg-slate-200" />
              <div className="flex gap-3">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div className="md:col-span-2 hidden md:flex justify-end" variants={slideRight}>
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-blue-100/60">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/our-forest-400420.appspot.com/o/portfolio%2Fbio.jpg?alt=media&token=8816fc92-45fd-42bf-af21-052714afd4fd"
                  alt="Mobisa Kwamboka" fill className="object-cover" priority sizes="320px"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-lg rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-sm font-semibold text-slate-700">Nairobi, Kenya</span>
              </div>
              <div className="absolute -top-5 -right-5 bg-white border border-slate-100 shadow-lg rounded-2xl px-4 py-2.5 text-center">
                <p className="text-2xl font-black gradient-text">3+</p>
                <p className="text-xs text-slate-500 font-medium">Specialties</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SKILLS — 3 discipline cards + stat bar ───────────────────────── */}
      <motion.section
        className="py-20 px-4 sm:px-6 bg-white border-y border-slate-100"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={ci} className="mb-12">
            <p className="section-label">Toolkit</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Skills & Technologies</h2>
            <p className="text-slate-400 text-sm mt-1.5">Three disciplines, one engineer</p>
          </motion.div>

          {/* 3-column discipline cards */}
          <motion.div className="grid md:grid-cols-3 gap-5" variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {skillCategories.map((cat) => (
              <motion.div key={cat.label} variants={scaleUp} whileHover={{ y: -4 }}
                className="card p-6 flex flex-col gap-4 group hover:border-blue-200 hover:shadow-blue-50">
                {/* Badge */}
                <div className={`self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${cat.badgeClass}`}>
                  <span>{cat.emoji}</span>{cat.label}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.description}</p>

                {/* Icon row for key tools */}
                {cat.skills.length > 0 && (
                  <div className="flex flex-wrap gap-3 py-2">
                    {cat.skills.map(s => (
                      <div key={s.name} className="flex flex-col items-center gap-1.5">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                          <Image src={s.icon} alt={s.name} width={26} height={26} className="object-contain" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{s.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Other tools as pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-50">
                  {cat.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stat bar */}
          <motion.div variants={ci}
            className="mt-6 grid grid-cols-3 divide-x divide-slate-100 bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {statBar.map(stat => (
              <div key={stat.label} className="py-5 text-center hover:bg-blue-50 transition-colors cursor-default">
                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <motion.section
        className="py-20 px-4 sm:px-6"
        style={{ background: "var(--background)" }}
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={ci} className="mb-10">
            <p className="section-label">Journey</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Work Experience</h2>
          </motion.div>

          {loadingExperience ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-6 flex gap-4">
                  <div className="skeleton w-16 h-16 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="skeleton h-5 w-3/4" /><div className="skeleton h-4 w-1/2" /><div className="skeleton h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : errorExperience ? (
            <div className="card p-8 text-center border-red-100 bg-red-50">
              <p className="text-red-500 mb-3">{errorExperience}</p>
              <button onClick={() => window.location.reload()} className="btn-primary !bg-red-500">Retry</button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-5 top-2 bottom-2 w-px timeline-line" />
              <motion.div className="space-y-5" variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {experienceData.map(exp => (
                  <motion.div key={exp.id} variants={scaleUp} whileHover={{ y: -2 }} className="relative pl-14">
                    <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow ring-4 ring-blue-50" />
                    <div className="card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2 flex-shrink-0">
                          <Image src={exp.icon} alt={exp.company} width={36} height={36} className="object-contain" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h3 className="font-bold text-slate-900">{exp.title}</h3>
                            <span className="text-xs font-mono text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                          </div>
                          <p className="text-blue-600 text-sm font-medium mb-2">{exp.company} · {exp.type}</p>
                          <p className="text-slate-500 text-sm leading-relaxed mb-3">{exp.description}</p>
                          <div className="flex flex-wrap gap-1.5">{exp.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <motion.section
        id="projects"
        className="py-20 px-4 sm:px-6 bg-white border-t border-slate-100"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={ci} className="mb-10">
            <p className="section-label">Portfolio</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Featured Projects</h2>
          </motion.div>

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
            <div className="card p-8 text-center border-red-100 bg-red-50">
              <p className="text-red-500 mb-3">{errorProjects}</p>
              <button onClick={() => window.location.reload()} className="btn-primary !bg-red-500">Retry</button>
            </div>
          ) : (
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {projectsData.map(project => (
                <motion.div key={project.id} variants={scaleUp} whileHover={{ y: -4 }} className="card overflow-hidden group">
                  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100">
                    <Image src={project.image} alt={project.title} fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">{project.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
                    <div className="flex gap-3 pt-3 border-t border-slate-50">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors">
                          <FiGithub size={13} /> Code
                        </a>
                      )}
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-auto">
                          Live Demo <FiArrowRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div variants={ci} className="text-center mt-10">
            <a href="https://github.com/mobisa-012" target="_blank" rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2">
              <FiGithub size={15} /> View All on GitHub
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-100 py-8 px-4 sm:px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Mobisa Kwamboka. All rights reserved.</p>
            {resumeData && <p className="text-xs text-slate-400 mt-0.5">CV v{resumeData.version} · Updated {formatDate(resumeData.lastUpdated)}</p>}
          </div>
          <div className="flex gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
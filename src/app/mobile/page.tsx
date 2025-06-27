'use client';

import Navbar from "@/componets/navbar";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiSmartphone, FiCode } from "react-icons/fi";
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
};

export default function Mobile() {
  const [projects, setProjects] = useState<MobileProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const querySnapshot = await getDocs(collection(db, "mobileProjects"));
      const projectsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        if (!data.title || !data.description || !data.image) {
          console.warn(`Project ${doc.id} is missing required fields`);
          return null;
        }
        
        return {
          id: doc.id,
          title: typeof data.title === 'string' ? data.title : '',
          description: typeof data.description === 'string' ? data.description : '',
          image: typeof data.image === 'string' ? data.image : '/default-mobile.png',
          tags: Array.isArray(data.tags) 
            ? data.tags.filter((tag: any) => typeof tag === 'string')
            : [],
          live: typeof data.live === 'string' ? data.live : undefined,
          github: typeof data.github === 'string' ? data.github : undefined,
          createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        };
      }).filter(project => project !== null) as MobileProject[];
      
      // Sort projects by createdAt or id if needed
      projectsData.sort((a, b) => (b.id).localeCompare(a.id));
      
      setProjects(projectsData);
    } catch (err) {
      console.error("Error fetching mobile projects:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to load projects. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 scroll-smooth">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="text-center mb-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4 bg-gray-800 text-gray-300 px-4 py-2 md:px-6 md:py-3 rounded-full"
          >
            <FiSmartphone className="mr-2 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Mobile Development</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Mobile <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">App Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Explore apps crafted with modern technologies like Flutter and Firebase.
          </motion.p>
        </section>

        {/* Projects Grid */}
        <section className="mb-16 md:mb-20">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-center">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={fetchProjects}
                className="mt-2 px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <p className="text-gray-400">No mobile projects found. Check back later!</p>
            </div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="group bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-transparent hover:border-transparent"
                  >
                    <div className="h-48 sm:h-56 relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-700 ease-in-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={projects.indexOf(project) <= 2}
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <motion.h2 
                        className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                      >
                        {project.title}
                      </motion.h2>
                      <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex gap-3 sm:gap-4 items-center text-xs sm:text-sm">
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent flex items-center transition-all"
                            whileHover={{ x: 2 }}
                          >
                            <FiExternalLink className="mr-1" size={14} />
                            Live
                          </motion.a>
                        )}
                        {/* {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent flex items-center transition-all"
                            whileHover={{ x: 2 }}
                          >
                            <FiGithub className="mr-1" size={14} />
                            Code
                          </motion.a>
                        )} */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* CTA Section */}
        <motion.section 
          id="contact"
          className="text-center scroll-mt-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Have a mobile app idea?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's work together to bring it to life.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
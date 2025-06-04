'use client';

import Navbar from "@/componets/navbar";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiSmartphone, FiCode } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Zingo Kenya",
    description: "E-commerce platform with M-Pesa integration for seamless mobile payments",
    tags: ["Flutter", "Firebase", "M-Pesa API"],
    image: "/me2.jpg",
    github: "https://github.com/yourusername/zingo",
    live: "https://play.google.com/store/apps/details?id=com.zingo.kenya",
  },
  {
    id: 4,
    title: "Tasky",
    description: "A productivity app that helps users build daily habits with streaks, reminders, and charts.",
    tags: ["Flutter", "Cloud Firestore", "Cloud Functions"],
    image: "/me2.jpg",
    github: "https://github.com/yourusername/habit-tracker",
    live: "",
  },
  {
    id: 5,
    title: "Budget Buddy",
    description: "An intuitive expense tracker with category insights and monthly spending summaries. Offline-first.",
    tags: ["Flutter", "SQLite", "Provider"],
    image: "/me2.jpg",
    github: "https://github.com/yourusername/budget-buddy",
    live: "",
  },
  {
    id: 2,
    title: "HealthTrack Pro",
    description: "Fitness and health monitoring app with wearable integration",
    tags: ["Flutter", "BLoC", "Firebase"],
    image: "/me2.jpg",
    github: "https://github.com/yourusername/healthtrack",
    live: "https://apps.apple.com/us/app/healthtrack-pro/id123456789",
  },
  {
    id: 3,
    title: "Urban Transit",
    description: "Public transportation navigation app with real-time updates",
    tags: ["Flutter", "BLoC", "Mapbox"],
    image: "/me2.jpg",
    github: "https://github.com/yourusername/urbantransit",
    live: "https://play.google.com/store/apps/details?id=com.urban.transit",
  },
];

export default function Mobile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white scroll-smooth">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="text-center mb-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4 bg-purple-100 text-purple-800 px-4 py-2 md:px-6 md:py-3 rounded-full"
          >
            <FiSmartphone className="mr-2 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Mobile Development</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Mobile <span className="text-purple-600">App Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore apps crafted with modern technologies like Flutter and Firebase.
          </motion.p>
        </section>

        {/* Projects Grid */}
        <section className="mb-16 md:mb-20">
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
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-purple-200"
                >
                  <div className="h-48 sm:h-56 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={project.id <= 3} // Only prioritize first 3 images
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {project.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 sm:gap-4 items-center text-xs sm:text-sm">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-purple-600 flex items-center transition-colors"
                        >
                          <FiGithub className="mr-1" size={14} />
                          Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-purple-600 flex items-center transition-colors"
                        >
                          <FiExternalLink className="mr-1" size={14} />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Have a mobile app idea?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's work together to bring it to life.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
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
"use client";
import { motion } from "framer-motion";
import Navbar from "@/componets/navbar";
import Image from "next/image";
import { BsDatabase, BsBook } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";
import { TbFileDelta } from "react-icons/tb";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseconfig";

type LearningProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "Not Started" | "Ongoing" | "Completed" | "Completed: still refining";
  tags: string[];
  github?: string;
  createdAt?: string;
};

export default function ML() {
  const [learningProjects, setLearningProjects] = useState<LearningProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setErrorProjects(null);
      
      const querySnapshot = await getDocs(collection(db, "learningProjects"));
      
      const projectsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Validate required fields
        if (!data.title || !data.description) {
          console.warn(`Project ${doc.id} is missing required fields`);
          return null;
        }
        
        return {
          id: doc.id,
          title: typeof data.title === 'string' ? data.title : '',
          description: typeof data.description === 'string' ? data.description : '',
          image: typeof data.image === 'string' ? data.image : '/default-project.png',
          status: typeof data.status === 'string' ? 
            (["Not Started", "Ongoing", "Completed", "Completed: still refining"].includes(data.status) 
              ? data.status as LearningProject["status"] 
              : "Not Started") 
            : "Not Started",
          tags: Array.isArray(data.tags) 
            ? data.tags.filter((tag: any) => typeof tag === 'string')
            : [],
          github: typeof data.github === 'string' ? data.github : undefined,
          createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        };
      }).filter(project => project !== null) as LearningProject[];
      
      // Sort projects by createdAt or id if needed
      projectsData.sort((a, b) => (b.createdAt || b.id).localeCompare(a.createdAt || a.id));
      
      setLearningProjects(projectsData);
    } catch (err) {
      console.error("Error fetching learning projects:", err);
      setErrorProjects(
        err instanceof Error 
          ? err.message 
          : "Failed to load projects. Please try again later."
      );
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const skills = [
    { name: "R", icon: "/r.webp" },
    { name: "Python", icon: "/python.png" },
    { name: "Pandas", icon: "/pandas.png" },
    { name: "NumPy", icon: "/numpy.png" },
    { name: "Matplotlib", icon: "/mat.jpeg" },
    { name: "Scikit-learn", icon: "/sci.webp" },
    { name: "Jupyter", icon: "/jp.webp" },
  ];

  const learningPath = [
    "R Programming",
    "Mathematics for ML",
    "Python for Data Science",
    "Data Analysis with Pandas",
    "Supervised Learning",
    "Unsupervised Learning",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section
          className="text-center mb-8 sm:mb-12 md:mb-20 px-2"
          variants={fadeInVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-3 sm:mb-4 bg-gray-800 text-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BsDatabase className="mr-1.5 sm:mr-2 text-sm sm:text-base md:text-lg" />
            <span>Learning Journey</span>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4"
            variants={itemVariants}
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              Data Science
            </span>{" "}
            Path
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2"
            variants={itemVariants}
          >
            Documenting my progress as I learn Machine Learning and Data Science
          </motion.p>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          className="mb-12 sm:mb-16 md:mb-20 bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-800"
          variants={fadeInVariants}
        >
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center"
            variants={itemVariants}
          >
            <TbFileDelta className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" />
            Current Learning Focus
          </motion.h2>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2 sm:mb-3">
                Topics
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {learningPath.map((topic, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-sm sm:text-base"
                    variants={itemVariants}
                  >
                    <span className="flex-shrink-0 mt-1.5 mr-2 sm:mr-3 h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                      {topic}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2 sm:mb-3">
                Resources
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <motion.a
                  href="https://bradleyboehmke.github.io/HOML/"
                  className="flex items-center text-sm sm:text-base text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <BsBook className="mr-1.5 sm:mr-2" />
                  Hands-On Machine Learning with R
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Learning Projects */}
        <motion.section
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          variants={fadeInVariants}
        >
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 flex items-center"
            variants={itemVariants}
          >
            <BsDatabase className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" />
            Learning Projects
          </motion.h2>

          {loadingProjects ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : errorProjects ? (
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-center">
              <p className="text-red-400">{errorProjects}</p>
              <button 
                onClick={fetchProjects}
                className="mt-2 px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : learningProjects.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/50 rounded-lg">
              <p className="text-gray-400">No projects found. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {learningProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className="group bg-gray-900 rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-transparent"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  {/* Project Image */}
                  <div className="relative pt-[56.25%] overflow-hidden">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-gray-800"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex justify-between items-start mb-1.5 sm:mb-2">
                      <motion.h2
                        className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-1"
                      >
                        {project.title}
                      </motion.h2>
                      <span
                        className={`text-[12px] px-2 py-1 rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-900 text-green-300"
                            : project.status === "Ongoing"
                            ? "bg-yellow-900 text-yellow-300"
                            : project.status === "Completed: still refining"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-2 sm:mb-3 md:mb-4 line-clamp-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                      {project.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                      {project.github && project.github !== "#" && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all"
                          aria-label={`View ${project.title} code on GitHub`}
                          whileHover={{ x: 3 }}
                        >
                          <FiGithub className="mr-1" size={14} />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 max-w-6xl mx-auto px-2 sm:px-4"
          variants={fadeInVariants}
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-14">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3"
              variants={itemVariants}
            >
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Toolkit
              </span>
            </motion.h2>
            <motion.p
              className="text-xs sm:text-sm md:text-base text-gray-400 max-w-xs sm:max-w-md md:max-w-lg mx-auto"
              variants={itemVariants}
            >
              Technologies and tools I use daily to bring ideas to life
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="group bg-gray-900 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center border border-gray-800 hover:border-transparent"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative mb-1.5 sm:mb-2 md:mb-3 transition-transform group-hover:scale-110">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50px, 80px"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8 text-center border border-gray-800"
          variants={fadeInVariants}
        >
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3"
            variants={itemVariants}
          >
            Follow My Learning Journey
          </motion.h3>
          <motion.p
            className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 md:mb-6 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I'm documenting my entire learning process - the successes, the
            failures, and everything in between.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3"
            variants={containerVariants}
          >
            <motion.a
              href="#"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe to Updates
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-block border border-indigo-500 text-indigo-400 hover:bg-gray-800 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
}
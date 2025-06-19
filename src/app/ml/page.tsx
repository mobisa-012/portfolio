"use client";
import { motion } from "framer-motion";
import Navbar from "@/componets/navbar";
import Image from "next/image";
import { BsDatabase, BsBook } from "react-icons/bs";
import { FiGithub, FiExternalLink, FiCalendar, FiArrowRight, FiTag, FiClock, FiUser } from "react-icons/fi";
import { TbFileDelta } from "react-icons/tb";

export default function ML() {
  const learningProjects = [
    {
      id: 0,
      title: "KNN Classifier",
      description: "Implementing K-Nearest Neighbors algorithm from scratch with visualization",
      tags: ["Machine Learning", "Python", "Algorithms", "Seaborn"],
      status: "Completed: still refining",
      image: "/knn.png",
      github: "https://github.com/mobisa-012/Machine-Learning/blob/main/Unsupervised%20Learning/Data%20Science%20Semester%20project%20Unsupervised%20Learning.ipynb"
    },
    {
      id: 1,
      title: "Data Cleaning Practice",
      description: "Working with messy datasets to learn preprocessing techniques",
      tags: ["Data Cleaning", "Pandas", "Feature Engineering"],
      status: "In Progress",
      image: "/learning4.jpg",
      github: "https://github.com/yourusername/data-cleaning"
    },
  ];

  const skills = [
    {name: "R", icon: "/r.webp"},
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
        delayChildren: 0.3
      }
    }
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
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
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
          className="text-center mb-12 md:mb-20 px-2"
          variants={fadeInVariants}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4 bg-gray-800 text-gray-300 px-4 py-2 md:px-6 md:py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BsDatabase className="mr-2 text-lg md:text-xl" />
            <span className="font-medium text-sm md:text-base">Learning Journey</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
            variants={itemVariants}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Data Science</span> Path
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Documenting my progress as I learn Machine Learning and Data Science
          </motion.p>
        </motion.section>

        {/* Current Focus */}
        <motion.section 
          className="mb-16 md:mb-20 bg-gray-900 rounded-xl p-6 md:p-8 shadow-sm border border-gray-800"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center"
            variants={itemVariants}
          >
            <TbFileDelta className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" />
            Current Learning Focus
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Topics</h3>
              <ul className="space-y-2">
                {learningPath.map((topic, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="flex-shrink-0 mt-1 mr-3 h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                      {topic}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Resources</h3>
              <div className="space-y-3">
                <motion.a 
                  href="https://bradleyboehmke.github.io/HOML/" 
                  className="flex items-center text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <BsBook className="mr-2" />
                  Hands-On Machine Learning with R
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Learning Projects */}
        <motion.section 
          className="mb-16 md:mb-24"
          variants={fadeInVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center"
            variants={itemVariants}
          >
            <BsDatabase className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" />
            Learning Projects
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {learningProjects.map((project) => (
              <motion.article 
                key={project.id}
                className="group bg-gray-900 rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-transparent"
                variants={itemVariants}
                whileHover="hover"
              >
                {/* Project Image */}
                <div className="h-40 sm:h-48 relative overflow-hidden">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <motion.h2 
                      className="text-lg sm:text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                    >
                      {project.title}
                    </motion.h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Completed" ? "bg-green-900 text-green-300" :
                      project.status === "In Progress" ? "bg-yellow-900 text-yellow-300" :
                      project.status === "Completed: still refining" ? "bg-yellow-900 text-yellow-300" :
                      "bg-gray-800 text-gray-300"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag, index) => (
                      <motion.span 
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2 sm:gap-3 text-sm sm:text-base">
                    {project.github && project.github !== "#" && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all"
                        aria-label={`View ${project.title} code on GitHub`}
                        whileHover={{ x: 3 }}
                      >
                        <FiGithub className="mr-1" size={16} />
                        Code
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all"
                        aria-label={`View ${project.title} demo`}
                        whileHover={{ x: 3 }}
                      >
                        <FiExternalLink className="mr-1" size={16} />
                        Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          className="mb-16 md:mb-24 max-w-6xl mx-auto px-4"
          variants={fadeInVariants}
        >
          <div className="text-center mb-10 md:mb-14">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              variants={itemVariants}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Toolkit</span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-lg mx-auto"
              variants={itemVariants}
            >
              Technologies and tools I use daily to bring ideas to life
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                className="group bg-gray-900 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center border border-gray-800 hover:border-transparent"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative mb-3 transition-transform group-hover:scale-110">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50px, 80px"
                  />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg md:rounded-xl p-6 md:p-8 text-center border border-gray-800"
          variants={fadeInVariants}
        >
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3"
            variants={itemVariants}
          >
            Follow My Learning Journey
          </motion.h3>
          <motion.p 
            className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I'm documenting my entire learning process - the successes, the failures, and everything in between.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3"
            variants={containerVariants}
          >
            <motion.a
              href="#"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base shadow-md hover:shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe to Updates
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-block border border-indigo-500 text-indigo-400 hover:bg-gray-800 px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
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
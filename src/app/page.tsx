"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/componets/navbar";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseconfig";

// Define the Experience type
interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  period: string;
  description: string;
  icon: string;
  tags: string[];
}

// Define the Project type
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default function Home() {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loadingExperience, setLoadingExperience] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorExperience, setErrorExperience] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoadingExperience(true);
        const experiencesRef = collection(db, "experience");
        const q = query(experiencesRef, orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);
        
        const experiences: Experience[] = [];
        querySnapshot.forEach((doc) => {
          experiences.push({
            id: doc.id,
            ...doc.data()
          } as Experience);
        });
        
        setExperienceData(experiences);
        setErrorExperience(null);
      } catch (err) {
        console.error("Error fetching experience data:", err);
        setErrorExperience("Failed to load experience data");
        setExperienceData([]);
      } finally {
        setLoadingExperience(false);
      }
    };

    const fetchProjectsData = async () => {
      try {
        setLoadingProjects(true);
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);
        
        const projects: Project[] = [];
        querySnapshot.forEach((doc) => {
          projects.push({
            id: doc.id,
            ...doc.data()
          } as Project);
        });
        
        setProjectsData(projects);
        setErrorProjects(null);
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setErrorProjects("Failed to load projects data");
        setProjectsData([]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchExperienceData();
    fetchProjectsData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const scaleUpVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      } 
    }
  };

  const slideInVariants = {
    hidden: (direction: 'left' | 'right' | undefined) => ({
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <motion.main 
        className="flex-grow"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative overflow-hidden">
          <motion.div 
            className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 w-40 h-40 sm:w-64 sm:h-64 bg-purple-900/20 rounded-full filter blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-900/20 rounded-full filter blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />

          {/* Content: name etc */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6 sm:space-y-8 relative z-10 text-center md:text-left"
            custom="left"
            variants={slideInVariants}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500">Mobisa Kwamboka</span>
            </motion.h1>

            {/* roles */}
            <motion.h2
              className="sm:text-2xl md:text-xl text-gray-300 font-bold flex flex-wrap gap-x-3 gap-y-1 items-center"
              variants={itemVariants}
            >
              <span>Software Engineer</span>
              <span className="hidden sm:inline">|</span>
              <span>Flutter Mobile Developer</span>
              <span className="hidden sm:inline">|</span>
              <span>Data Scientist</span>
            </motion.h2>

            {/* intro*/}
            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              I transform data into impactful products. Combining machine learning expertise with 
              design sensibility, I build scalable applications that bridge insights with 
              exceptional user experiences. Let's create something meaningful.
            </motion.p>
            
            {/* CTA */}
            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4 pt-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.a 
                href="#projects" 
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-sm sm:text-base"
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View My Work
              </motion.a>
              
              <motion.a 
                href="/contact" 
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 border-2 border-purple-600 text-purple-400 hover:bg-purple-900/20 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Contact Me
              </motion.a>
              <motion.a 
                href="/resume1.pdf" 
                download="MOBISA KWAMBOKA RESUME.pdf"
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex items-center gap-2"
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiDownload />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image - Responsive sizing */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative z-10"
            custom="right"
            variants={slideInVariants}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-xl opacity-20"
              />
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-full h-full"
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/our-forest-400420.appspot.com/o/portfolio%2Fbio.jpg?alt=media&token=8816fc92-45fd-42bf-af21-052714afd4fd"
                  alt="Mobisa Kwamboka"
                  fill
                  className="object-cover rounded-full border-4 border-purple-500/20 shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 80vw, 50vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* Skills Section */}
        <motion.section 
          className="bg-gray-900 py-16 sm:py-20 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 bg-[length:30px_30px] sm:bg-[length:50px_50px]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16"
              variants={itemVariants}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Skills</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { name: "Flutter", icon: "/flutter.png" },
                { name: "React", icon: "/react.png" },
                { name: "Next.js", icon: "/next.svg" },
                { name: "Firebase", icon: "/firebase.png" },
                { name: "Dart", icon: "/dart.png" },
                { name: "JavaScript", icon: "/js.png" },
                { name: "UI/UX Design", icon: "/figma.png" },
                { name: "Node.js", icon: "/node.png" },
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 hover:shadow-lg hover:shadow-purple-500/10"
                  variants={scaleUpVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center p-2">
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      width={30}
                      height={30}
                      className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                  <h3 className="text-white font-medium text-sm sm:text-base md:text-lg text-center">{skill.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          className="py-12 sm:py-20 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 bg-[length:30px_30px] sm:bg-[length:50px_50px]" />
          
          <div className="container mx-auto px-4 sm:px-6 relative">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16"
              variants={itemVariants}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Experience</span>
            </motion.h2>
            
            {loadingExperience ? (
              <motion.div 
                className="max-w-4xl mx-auto space-y-8 sm:space-y-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Loading skeletons */}
                {[1, 2, 3].map((item) => (
                  <motion.div 
                    key={item}
                    className="bg-gray-800/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-gray-700"
                    variants={scaleUpVariants}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-700 animate-pulse"></div>
                      </div>
                      <div className="flex-grow space-y-3">
                        <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : errorExperience ? (
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                variants={itemVariants}
              >
                <p className="text-gray-400 text-lg">{errorExperience}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Retry
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="max-w-4xl mx-auto space-y-8 sm:space-y-10 pb-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {experienceData.map((exp) => (
                  <motion.div 
                    key={exp.id}
                    className="bg-gray-800/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
                    variants={scaleUpVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center p-2">
                          <Image
                            src={exp.icon}
                            alt={`${exp.company} logo`}
                            width={40}
                            height={40}
                            className="object-contain w-10 h-10"
                          />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-white">{exp.title}</h3>
                          <span className="text-sm text-purple-400 font-medium">{exp.period}</span>
                        </div>
                        <h4 className="text-sm sm:text-base text-gray-300 font-medium mb-3">
                          {exp.company} · {exp.type}
                        </h4>
                        <p className="text-gray-400 text-sm sm:text-base mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
        
        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-16 sm:py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true,}}
          variants={fadeInVariants}
        >
          <div className="absolute -top-20 sm:-top-32 left-0 w-full h-20 sm:h-32 bg-gradient-to-b " />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16"
              variants={itemVariants}
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Projects</span>
            </motion.h2>
            
            {loadingProjects ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Loading skeletons for projects */}
                {[1, 2, 3].map((item) => (
                  <motion.div 
                    key={item}
                    className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
                    variants={scaleUpVariants}
                  >
                    <div className="h-40 sm:h-48 bg-gray-800 animate-pulse"></div>
                    <div className="p-4 sm:p-6 space-y-3">
                      <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-800 rounded animate-pulse w-full"></div>
                      <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6"></div>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((tag) => (
                          <div key={tag} className="w-12 h-6 bg-gray-800 rounded-full animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : errorProjects ? (
              <motion.div 
                className="text-center py-8"
                variants={itemVariants}
              >
                <p className="text-gray-400 text-lg">{errorProjects}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Retry
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {projectsData.map((project) => (
                  <motion.div 
                    key={project.id}
                    className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
                    variants={scaleUpVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-40 sm:h-48 bg-gray-800 relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Project Links */}
                      <div className="flex flex-wrap gap-2">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiGithub className="mr-1" />
                            Code
                          </motion.a>
                        )}
                        {project.projectUrl && (
                          <motion.a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs sm:text-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiArrowRight className="mr-1" />
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            <motion.div 
              className="text-center mt-12 sm:mt-16"
              variants={itemVariants}
            >
              <motion.a 
                href="https://github.com/mobisa-012" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3.5 border border-purple-600 text-purple-400 hover:bg-purple-900/20 rounded-lg font-medium transition-all group text-sm sm:text-base"
                whileHover={{ 
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                View All Projects on GitHub
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
      
      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 p-6 sm:p-8 border-t border-gray-800 relative z-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="mb-4 sm:mb-6 md:mb-0"
              variants={itemVariants}
            >
              <p className="text-gray-400 text-sm sm:text-base">
                © {new Date().getFullYear()} Mobisa Kwamboka. All rights reserved.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex space-x-4 sm:space-x-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="Twitter"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              
              <motion.a
                href="https://github.com/mobisa-012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="GitHub"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/mobisa-kwamboka-a56691223/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="LinkedIn"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
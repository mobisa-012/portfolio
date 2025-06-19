"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/componets/navbar";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiDownload } from "react-icons/fi";

export default function Home() {
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Animation variants
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

  const tapVariants = {
    tap: { scale: 0.95 }
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
          {/* Background elements - Responsive positioning */}
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

          {/* Left Column - Text Content */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6 sm:space-y-8 relative z-10 text-center md:text-left"
            custom="left"
            variants={slideInVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Mobisa Kwamboka</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-medium"
              variants={itemVariants}
            >
              Software Developer | Flutter & React Specialist
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto md:mx-0"
              variants={itemVariants}
            >
              I build beautiful, performant applications that solve real problems.
              Passionate about creating seamless user experiences across mobile and web platforms.
            </motion.p>
            
            {/* Call to Action Buttons - Responsive sizing */}
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
                href="/resume.pdf" 
                download="Mobisa_Kwamboka_Resume.pdf"
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
                  src="/me.jpg"
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
        
        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-16 sm:py-20 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          <div className="absolute -top-20 sm:-top-32 left-0 w-full h-20 sm:h-32 bg-gradient-to-b from-gray-900/80 to-transparent z-0" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16"
              variants={itemVariants}
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Projects</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[1, 2, 3].map((project) => (
                <motion.div 
                  key={project}
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
                        src={`/project-${project}.jpg`}
                        alt={`Project ${project}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      Zingo Kenya {project}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                      E-Commerce Platform with MPESA Integration. Built a seamless platform enabling users to shop, pay bills, and buy airtime—powered by fast, secure MPESA payments.
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm">Flutter</span>
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm">Firebase</span>
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm">UI/UX</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
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
"use-client";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/componets/navbar";
import Contact from "./contact/page";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemFromTop = {
    hidden: { opacity: 0, y: -50 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const itemFromLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const itemFromRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const itemFromBottom = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  },
  tap: {
    scale: 0.98
  }
};
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          {/* Left Column - Text Content */}
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Hi, I'm <span className="text-purple-400">Mobisa Kwamboka</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300">
              Software Developer | Flutter & React Specialist
            </h2>
            <p className="text-lg text-gray-400">
              I build beautiful, performant applications that solve real problems.
              Passionate about creating seamless user experiences across mobile and web platforms.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 border-2 border-purple-600 text-purple-400 hover:bg-purple-900/30 rounded-lg font-medium transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Right Column - Image/Illustration */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src="/me.jpg" // Replace with your image
                alt="Developer illustration"
                layout="fill"
                objectFit="contain"
                className="filter drop-shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="bg-gray-800 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              My <span className="text-purple-400">Skills</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "Flutter", icon: "/flutter.png", },
                { name: "React", icon: "/react.png",},
                { name: "Next.js", icon: "/next.svg",},
                { name: "Firebase", icon: "/firebase.png", },
                { name: "Dart", icon: "/dart.png", },
                { name: "JavaScript", icon: "/js.png", },
                { name: "UI/UX Design", icon: "/figma.png",},
                { name: "Node.js", icon: "/node.png",},
              ].map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center gap-4"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center`}>
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Featured <span className="text-purple-400">Projects</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((project) => (
                <div 
                  key={project}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <div className="h-48 bg-gray-700 relative">
                    <Image
                      src={`/project-${project}.jpg`}
                      alt={`Project ${project}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Zingo Kenya{project}</h3>
                    <p className="text-gray-400 mb-4">
                      E-Commerce Platform with MPESA Integration
Built a seamless platform enabling users to shop, pay bills, and buy airtime—powered by fast, secure MPESA payments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Flutter</span>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Firebase</span>
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">UI/UX</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://github.com/mobisa-012" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-400 hover:bg-purple-900/30 rounded-lg font-medium transition-all"
              >
                View All Projects on GitHub
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 p-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Mobisa Kwamboka. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              {/* Social Links */}
              <a
                href="https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a
                href="https://github.com/mobisa-012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a
                href="https://www.linkedin.com/in/mobisa-kwamboka-a56691223/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
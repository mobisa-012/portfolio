"use client";
import Navbar from "@/componets/navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useState } from "react";
import {db} from "@/lib/firebaseconfig";
import { collection, addDoc } from "firebase/firestore"; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        createdAt: new Date().toISOString(),
        emailSent: false
      });
      
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully!. We will get in touch soon😊'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Animation variants
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

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      {/* Navbar - animates from top */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <Navbar />
      </motion.div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 gap-8 sm:gap-10 lg:gap-12"
      >
        {/* Left Side - Contact Info - animates from left */}
        <motion.div
          variants={itemFromLeft}
          className="flex-1 space-y-4 sm:space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Talk <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">to me</span>
          </h2>

          <p className="uppercase text-gray-400 text-xs sm:text-sm">Get In Touch</p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16">
            Let's Talk about your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Next Project</span>
          </h1>

          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg">
            <motion.div 
              variants={itemFromLeft}
              className="flex items-start sm:items-center gap-3 sm:gap-4 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300"
            >
              <IoLocationOutline className="mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
              <span>Nairobi, Kenya</span>
            </motion.div>
            <motion.div 
              variants={itemFromLeft}
              className="flex items-start sm:items-center gap-3 sm:gap-4 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300"
            >
              <MdOutlineEmail className="mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
              <span>mobisakwamboka@gmail.com</span>
            </motion.div>
            <motion.div 
              variants={itemFromLeft}
              className="flex items-start sm:items-center gap-3 sm:gap-4 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300"
            >
              <FaPhone className="mt-0.5 sm:mt-0 flex-shrink-0" size={20} />
              <span>+254 796 116 642</span>
            </motion.div>
          </div>

          {/* Socials */}
          <motion.div 
            variants={itemFromLeft}
            className="pt-4 sm:pt-6 mt-8 sm:mt-10"
          >
            <p className="font-semibold text-gray-300 text-sm sm:text-base">Follow Me</p>
            <div className="flex gap-3 sm:gap-4 pt-2">
              <motion.a
                href="https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300 flex items-center p-1 sm:p-2 gap-2 sm:gap-3 text-gray-400 text-lg sm:text-xl"
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/mobisa-012"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300 flex items-center p-1 sm:p-2 gap-2 sm:gap-3 text-gray-400 text-lg sm:text-xl"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mobisa-kwamboka-a56691223/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300 flex items-center p-1 sm:p-2 gap-2 sm:gap-3 text-gray-400 text-lg sm:text-xl"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form - animates from right */}
        <motion.div
          variants={itemFromRight}
          className="flex-1 min-w-0" // Changed from min-w-[60%] to min-w-0 for better responsiveness
        >
          <form onSubmit={handleSubmit} className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl space-y-4 sm:space-y-6 shadow-md w-full border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              <motion.div variants={itemFromRight}>
                <label className="block mb-1 sm:mb-2 font-medium text-gray-300 text-sm sm:text-base">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemFromRight}>
                <label className="block mb-1 sm:mb-2 font-medium text-gray-300 text-sm sm:text-base">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemFromRight}>
                <label className="block mb-1 sm:mb-2 font-medium text-gray-300 text-sm sm:text-base">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemFromRight}>
                <label className="block mb-1 sm:mb-2 font-medium text-gray-300 text-sm sm:text-base">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </motion.div>
            </div>

            <motion.div variants={itemFromRight}>
              <label className="block mb-1 sm:mb-2 font-medium text-gray-300 text-sm sm:text-base">Message *</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                required
              ></textarea>
            </motion.div>

            {/* Status message */}
            {submitStatus && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded ${
                  submitStatus.success 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-red-900 text-red-200'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.div
              variants={itemFromRight}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded transition-all duration-300 w-full shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Me a Message →'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.main>

      {/* Footer - animates from bottom */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-2 sm:p-4"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="md:mb-0">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} Mobisa Kwamboka. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-3 sm:gap-4 md:gap-6">
              {/* Social Links */}
              <motion.a
                href="https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300"
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-10 h-10 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              
              <motion.a
                href="https://github.com/mobisa-012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-500"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-10 h-10 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/mobisa-kwamboka-a56691223/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-purple-600 transition-all duration-300"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-10 h-10 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
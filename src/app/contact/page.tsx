"use client";
import Navbar from "@/componets/navbar";
import { motion } from "framer-motion";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FiTwitter, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { useState } from "react";
import { db } from "@/lib/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fromLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const fromRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const fromTop = { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fromBottom = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const socials = [
  { href: "https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09", icon: <FiTwitter size={18} />, label: "Twitter" },
  { href: "https://github.com/mobisa-012", icon: <FiGithub size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mobisa-kwamboka-a56691223/", icon: <FiLinkedin size={18} />, label: "LinkedIn" },
];

const contactInfo = [
  { icon: <IoLocationOutline size={18} />, text: "Nairobi, Kenya" },
  { icon: <MdOutlineEmail size={18} />, text: "mobisakwamboka@gmail.com" },
  { icon: <FaPhone size={16} />, text: "+254 796 116 642" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contactSubmissions"), {
        ...formData,
        createdAt: new Date().toISOString(),
        emailSent: false,
      });
      setSubmitStatus({ success: true, message: "Message sent! We'll get in touch soon 😊" });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({ success: false, message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Navbar />
      </motion.div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        {/* ── Left: Contact Info ── */}
        <motion.div variants={fromLeft} className="space-y-8">
          {/* Header */}
          <div>
            <p className="section-label">Contact</p>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2 leading-tight">
              Let's Talk About Your{" "}
              <span className="gradient-text">Next Project</span>
            </h1>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed">
            Open to freelance projects, full-time roles, and exciting collaborations. Drop me a message and I'll get back to you within 24 hours.
          </p>

          {/* Contact details */}
          <div className="space-y-3">
            {contactInfo.map(({ icon, text }) => (
              <div key={text}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50 transition-all group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  {icon}
                </div>
                <span className="text-slate-700 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-3">Follow Me</p>
            <div className="flex gap-3">
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability card */}
          <div className="card p-5 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-slate-700">Available for work</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Currently open to freelance projects and full-time opportunities. Response time: within 24 hours.
            </p>
          </div>
        </motion.div>

        {/* ── Right: Form ── */}
        <motion.div variants={fromRight}>
          <form
            onSubmit={handleSubmit}
            className="card p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Subject", name: "subject", type: "text" },
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1.5 text-sm font-semibold text-slate-700">
                    {field.label} <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-blue-200 transition-all"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700">
                Message <span className="text-blue-400">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-blue-200 transition-all resize-none"
              />
            </div>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-medium ${
                  submitStatus.success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2 !py-3 !text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.main>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-t border-slate-100 py-6 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Mobisa Kwamboka. All rights reserved.</p>
          <div className="flex gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -2 }}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
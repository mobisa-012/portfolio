"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleContactClick = () => {
    console.log("Contact button clicked");
    router.push("/contact");
  };

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener('routeChangeComplete', handleRouteChange);
    return () => window.removeEventListener('routeChangeComplete', handleRouteChange);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/blog", label: "Blog" },
    { path: "/mobile", label: "Mobile Development" },
    { path: "/ml", label: "Machine Learning Projects" },
  ];

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-lg' : 'bg-black'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold leading-tight">MOBISA</h1>
              <h1 className="text-2xl font-bold leading-tight text-purple-400">KWAMBOKA</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-lg font-semibold hover:text-purple-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleContactClick}
              className="bg-purple-400 text-black font-semibold py-2 px-6 rounded hover:bg-white hover:text-amber-400 transition-all duration-300"
            >
              LET'S TALK MORE
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-purple-400 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-4 space-y-2 bg-black/95">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-purple-400 hover:bg-gray-900"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              handleContactClick();
              setIsOpen(false);
            }}
            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-purple-400 text-black hover:bg-white hover:text-amber-400"
          >
            LET'S TALK MORE
          </button>
        </div>
      </div>
    </nav>
  );
}
import { getMediumPosts } from "@/lib/getMediumPosts";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiUser, FiTag } from "react-icons/fi";
import Image from "next/image";
import Navbar from "@/componets/navbar";

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Hero Header with Animation */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6">
            <span className="text-gray-300">My</span>{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Medium
            </span>{' '}
            <span className="text-gray-300">Blog</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Sharing insights on Flutter development, Machine Learning concepts, and tech discoveries
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-transparent flex flex-col transform hover:-translate-y-1"
            >
              {/* Featured Image with fallback and animation */}
              <div className="h-48 sm:h-56 relative overflow-hidden">
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110 duration-700 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center animate-pulse-slow">
                    <span className="text-white text-sm sm:text-base font-medium">Featured Image</span>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 md:p-7 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm text-gray-300 flex-wrap">
                  <span className="flex items-center transition-colors group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                    <FiCalendar className="mr-1.5" size={14} />
                    {new Date(post.pubDate ?? "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center transition-colors group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                    <FiClock className="mr-1.5" size={14} />
                    {post.readingTime || "5 min read"}
                  </span>
                  {post.author && (
                    <span className="flex items-center transition-colors group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
                      <FiUser className="mr-1.5" size={14} />
                      {post.author}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5 line-clamp-3 flex-grow">
                  {post.content}
                </p>

                {/* Categories/Tags */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-4 sm:mb-5 flex flex-wrap gap-2">
                    {post.categories.slice(0, 3).map((category, i) => (
                      <span 
                        key={i} 
                        className="flex items-center text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-colors"
                      >
                        <FiTag className="mr-1.5" size={12} />
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto">
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm sm:text-base font-medium text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all"
                  >
                    Read on Medium
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1 duration-300" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA with Animation */}
        <div className="mt-20 md:mt-24 bg-gray-900 rounded-xl p-8 md:p-10 text-center border border-gray-800 hover:shadow-lg transition-shadow duration-500">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Stay Updated with My Latest Articles
            </h3>
            <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
              Get notified when I publish new content on Medium, delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base transition-all duration-300 hover:border-indigo-500"
              />
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
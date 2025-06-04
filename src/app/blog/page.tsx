import { getMediumPosts } from "@/lib/getMediumPosts";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiUser, FiTag } from "react-icons/fi";
import Image from "next/image";
import Navbar from "@/componets/navbar";

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Hero Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            My <span className="text-purple-600">Medium</span> Blog
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Latest articles on Flutter, React, and modern web development
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-100 flex flex-col"
            >
              {/* Featured Image with fallback */}
              <div className="h-40 sm:h-48 relative overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3} // Only prioritize first few images
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-base font-medium">Featured Image</span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center">
                    <FiCalendar className="mr-1" size={12} />
                    {new Date(post.pubDate ?? "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center">
                    <FiClock className="mr-1" size={12} />
                    {post.readingTime || "5 min read"}
                  </span>
                  {post.author && (
                    <span className="flex items-center">
                      <FiUser className="mr-1" size={12} />
                      {post.author}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                  {post.contentSnippet}
                </p>

                {/* Categories/Tags */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
                    {post.categories.slice(0, 3).map((category, i) => (
                      <span 
                        key={i} 
                        className="flex items-center text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        <FiTag className="mr-1" size={10} />
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
                    className="inline-flex items-center text-sm sm:text-base text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    Read on Medium
                    <FiArrowRight className="ml-1 sm:ml-2" size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 md:mt-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg md:rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Want more content like this?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Subscribe to get notified when I publish new articles on Medium.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap text-sm sm:text-base">
              Get Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
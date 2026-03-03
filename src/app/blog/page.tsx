import { getMediumPosts } from "@/lib/getMediumPosts";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiUser, FiTag } from "react-icons/fi";
import Image from "next/image";
import Navbar from "@/componets/navbar";

export default async function BlogPage() {
  const posts = await getMediumPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* ── PAGE HEADER ── */}
        <div className="mb-12 md:mb-16">
          <p className="section-label">Writing</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
            My <span className="gradient-text">Medium</span> Blog
          </h1>
          <p className="text-slate-500 text-lg mt-3 max-w-xl leading-relaxed">
            Sharing insights on Flutter development, Machine Learning, and tech discoveries.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="card text-center py-24 border-dashed">
            <p className="text-slate-400 text-lg">No blog posts found. Check back later!</p>
          </div>
        ) : (
          <>
            {/* ── FEATURED POST — full width hero card ── */}
            {featured && (
              <Link
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block mb-10"
              >
                <div className="card overflow-hidden grid md:grid-cols-5 hover:border-blue-200 hover:shadow-blue-50">
                  {/* Thumbnail — 3/5 */}
                  <div className="md:col-span-3 relative h-56 sm:h-72 md:h-full bg-gradient-to-br from-blue-50 to-sky-100">
                    {featured.thumbnail ? (
                      <Image
                        src={featured.thumbnail}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">📝</div>
                    )}

                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        ✦ Featured Post
                      </span>
                    </div>
                  </div>

                  {/* Content — 2/5 */}
                  <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={11} />
                          {new Date(featured.pubDate ?? "").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiClock size={11} />
                          {featured.readingTime || "5 min read"}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 mb-5">
                        {featured.content}
                      </p>

                      {/* Categories */}
                      {featured.categories && featured.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {featured.categories.slice(0, 4).map((cat, i) => (
                            <span key={i} className="tag"><FiTag size={10} />{cat}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                      Read on Medium
                      <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── SECTION DIVIDER ── */}
            {rest.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <span className="section-label">All Posts</span>
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-slate-400">{rest.length} article{rest.length !== 1 ? "s" : ""}</span>
              </div>
            )}

            {/* ── POSTS GRID ── */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {rest.map((post, index) => (
                  <article key={index} className="card flex flex-col overflow-hidden group hover:border-blue-200">
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">📝</div>
                      )}
                      {post.categories?.[0] && (
                        <div className="absolute top-3 left-3">
                          <span className="tag bg-white/90 backdrop-blur-sm !border-white/60 !text-slate-700">
                            {post.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-2.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><FiCalendar size={11} />
                          {new Date(post.pubDate ?? "").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5"><FiClock size={11} />{post.readingTime || "5 min read"}</span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-3 flex-1 leading-relaxed">{post.content}</p>

                      {/* Extra tags */}
                      {post.categories && post.categories.length > 1 && (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {post.categories.slice(1, 3).map((cat, i) => (
                            <span key={i} className="tag"><FiTag size={10} />{cat}</span>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-50 mt-auto">
                        <Link href={post.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link">
                          Read on Medium
                          <FiArrowRight size={13} className="transition-transform group-hover/link:translate-x-1 duration-200" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── CTA ── */}
        <div className="card bg-gradient-to-br from-blue-600 to-sky-500 border-0 !rounded-3xl p-8 md:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Have an idea: mobile app, web app?
          </h3>
          <p className="text-blue-100 text-base sm:text-lg mb-7">Let's work together</p>
          <a href="/contact"
            className="inline-block bg-white text-blue-600 font-bold px-7 py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Get in Touch →
          </a>
        </div>
      </div>
    </div>
  );
}
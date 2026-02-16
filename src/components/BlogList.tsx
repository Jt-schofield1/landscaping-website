"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-brand-dark pt-28 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Blog
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Landscaping tips, seasonal guides, and property maintenance advice
              from the Adjacent Property Management team.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-brand-green/5 hover:border-brand-green/15 transition-all duration-500 hover:shadow-xl hover:shadow-brand-green/5 hover:-translate-y-1"
                >
                  {/* Image */}
                  {post.image_url && (
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-brand-muted text-xs font-medium mb-3">
                      <Calendar size={13} />
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="font-display text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-green-dark transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-brand-muted text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-brand-green-dark text-sm font-semibold mt-4 group-hover:gap-3 transition-all duration-300">
                      Read More
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

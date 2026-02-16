"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

function renderContent(content: string) {
  return content.split("\n\n").map((paragraph, i) => {
    // Check if paragraph starts with bold (**) - treat as subheading
    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      const text = paragraph.slice(2, -2);
      return (
        <h3
          key={i}
          className="font-display text-xl font-bold text-brand-dark mt-8 mb-3"
        >
          {text}
        </h3>
      );
    }

    // Process inline bold within paragraphs
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-brand-dark/80 leading-relaxed mb-4">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-brand-dark">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });
}

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header image */}
      {post.image_url && (
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-cream" />
          <div className="absolute top-0 left-0 right-0 pt-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <ArrowLeft size={16} />
                All Posts
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={post.image_url ? "-mt-20 relative z-10" : "pt-28"}
        >
          {/* Title card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-black/5 border border-brand-green/5 mb-8">
            {!post.image_url && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green-dark text-sm font-medium transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                All Posts
              </Link>
            )}
            <div className="flex items-center gap-2 text-brand-muted text-sm font-medium mb-4">
              <Calendar size={15} />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-brand-green/5 mb-8">
            <div className="prose-custom">{renderContent(post.content)}</div>
          </div>

          {/* CTA */}
          <div className="bg-brand-green-dark rounded-2xl p-8 sm:p-10 text-center mb-16">
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Need Help With Your Property?
            </h3>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Adjacent Property Management serves the greater Rochester area.
              Get a free quote today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="relative overflow-hidden bg-white text-brand-green-dark px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2 group"
                style={{ borderRadius: "12px 24px 12px 24px" }}
              >
                <span className="relative z-10">Get a Free Quote</span>
              </Link>
              <a
                href="tel:5857699008"
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <Phone size={16} />
                (585) 769-9008
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

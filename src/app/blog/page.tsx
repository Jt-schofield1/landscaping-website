import { getAllPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Adjacent Property Management",
  description:
    "Landscaping tips, property maintenance advice, and seasonal guides from Adjacent Property Management in Rochester, NY.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogList posts={posts} />;
}

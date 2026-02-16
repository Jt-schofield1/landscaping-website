import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Adjacent Property Management",
  description:
    "Landscaping tips, property maintenance advice, and seasonal guides from Adjacent Property Management in Rochester, NY.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return <BlogList posts={posts || []} />;
}

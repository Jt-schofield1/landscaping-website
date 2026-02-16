import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostView from "@/components/BlogPostView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  return (posts || []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Adjacent Property Management Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}

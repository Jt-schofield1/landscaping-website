"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  FileText,
  Leaf,
  Loader2,
  ExternalLink,
} from "lucide-react";
import type { BlogPost } from "@/lib/supabase";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("admin_token");
  };

  const fetchPosts = useCallback(async () => {
    const token = getToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const res = await fetch("/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const togglePublished = async (post: BlogPost) => {
    const token = getToken();
    if (!token) return;

    await fetch("/api/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This cannot be undone."
      )
    )
      return;

    const token = getToken();
    if (!token) return;

    setDeleting(id);
    await fetch(`/api/admin?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleting(null);
    fetchPosts();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/30">
          <Loader2 size={18} className="animate-spin" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <div className="bg-[#161821] border-b border-white/[0.06] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <Leaf size={16} className="text-emerald-400" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white leading-none">
                  Blog Manager
                </h1>
                <p className="text-[11px] text-white/25 mt-0.5">
                  Adjacent Property Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                <ExternalLink size={12} />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-white/25 hover:text-red-400 transition-colors"
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats + Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">All Posts</h2>
            <p className="text-sm text-white/25 mt-1">
              {posts.length} post{posts.length !== 1 ? "s" : ""} &middot;{" "}
              <span className="text-emerald-400/60">
                {posts.filter((p) => p.published).length} published
              </span>{" "}
              &middot;{" "}
              <span className="text-amber-400/60">
                {posts.filter((p) => !p.published).length} draft
                {posts.filter((p) => !p.published).length !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-[#161821] rounded-2xl border border-white/[0.06] p-16 text-center">
            <div className="w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-white/10" />
            </div>
            <p className="text-white/40 text-lg font-medium mb-2">
              No blog posts yet
            </p>
            <p className="text-white/15 text-sm mb-8">
              Create your first post to get started.
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Plus size={16} />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`bg-[#161821] rounded-xl border transition-all duration-200 hover:border-white/[0.1] ${
                  deleting === post.id
                    ? "border-red-500/20 opacity-50"
                    : "border-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  {/* Status dot */}
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      post.published ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                    title={post.published ? "Published" : "Draft"}
                  />

                  {/* Thumbnail */}
                  {post.image_url && (
                    <div className="hidden sm:block w-12 h-12 rounded-lg overflow-hidden bg-white/[0.03] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Post info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white/80 text-sm truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/20 mt-0.5">
                      {post.published ? (
                        <span className="text-emerald-400/50">Published</span>
                      ) : (
                        <span className="text-amber-400/50">Draft</span>
                      )}
                      {" \u00b7 "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {post.updated_at !== post.created_at && (
                        <>
                          {" \u00b7 "}
                          <span className="text-white/15">
                            Edited{" "}
                            {new Date(post.updated_at).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePublished(post)}
                      className={`p-2 rounded-lg transition-all ${
                        post.published
                          ? "text-amber-400/40 hover:text-amber-400 hover:bg-amber-500/10"
                          : "text-emerald-400/40 hover:text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                      title={
                        post.published ? "Unpublish post" : "Publish post"
                      }
                    >
                      {post.published ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="p-2 rounded-lg text-white/20 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                      title="Edit post"
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      title="Delete post"
                    >
                      {deleting === post.id ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

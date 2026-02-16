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
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

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
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-brand-muted animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-green/10 rounded-xl flex items-center justify-center">
                <Leaf size={18} className="text-brand-green-dark" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold text-brand-dark leading-none">
                  Blog Manager
                </h1>
                <p className="text-xs text-brand-muted">
                  Adjacent Property Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs text-brand-muted hover:text-brand-dark transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-red-500 transition-colors"
              >
                <LogOut size={14} />
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
            <h2 className="text-2xl font-display font-bold text-brand-dark">
              All Posts
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              {posts.length} post{posts.length !== 1 ? "s" : ""} total &middot;{" "}
              {posts.filter((p) => p.published).length} published &middot;{" "}
              {posts.filter((p) => !p.published).length} draft
              {posts.filter((p) => !p.published).length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FileText
              size={40}
              className="text-brand-muted/30 mx-auto mb-4"
            />
            <p className="text-brand-muted text-lg font-medium mb-2">
              No blog posts yet
            </p>
            <p className="text-brand-muted/60 text-sm mb-6">
              Create your first post to get started.
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <Plus size={16} />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-100 hover:border-brand-green/10 transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Status indicator */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      post.published ? "bg-brand-green" : "bg-amber-400"
                    }`}
                    title={post.published ? "Published" : "Draft"}
                  />

                  {/* Post info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-brand-dark text-sm truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      {post.published ? "Published" : "Draft"} &middot;{" "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {post.updated_at !== post.created_at && (
                        <>
                          {" "}
                          &middot; Edited{" "}
                          {new Date(post.updated_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </>
                      )}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => togglePublished(post)}
                      className={`p-2 rounded-lg transition-all text-xs ${
                        post.published
                          ? "text-amber-600 hover:bg-amber-50"
                          : "text-brand-green-dark hover:bg-brand-green/5"
                      }`}
                      title={
                        post.published ? "Unpublish post" : "Publish post"
                      }
                    >
                      {post.published ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="p-2 rounded-lg text-brand-muted hover:text-brand-green-dark hover:bg-brand-green/5 transition-all"
                      title="Edit post"
                    >
                      <Edit3 size={16} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 rounded-lg text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
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

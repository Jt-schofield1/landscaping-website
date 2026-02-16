"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  FileText,
  Type,
  AlignLeft,
  Link2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  published: boolean;
}

const emptyForm: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  published: false,
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogEditor({ postId }: { postId?: string }) {
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!postId);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const isEdit = !!postId;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("admin_token");
  };

  const fetchPost = useCallback(async () => {
    if (!postId) return;
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
        router.push("/admin");
        return;
      }
      const posts = await res.json();
      const post = posts.find((p: { id: string }) => p.id === postId);
      if (post) {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image_url: post.image_url || "",
          published: post.published,
        });
        setAutoSlug(false);
      }
    } catch {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [postId, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: autoSlug ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSave = async (publish?: boolean) => {
    const token = getToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError("Please fill in all required fields (title, slug, excerpt, content).");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const body = {
      ...form,
      published: publish !== undefined ? publish : form.published,
      ...(isEdit ? { id: postId } : {}),
    };

    try {
      const res = await fetch("/api/admin", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save post");
      } else {
        setSuccess(isEdit ? "Post updated!" : "Post created!");
        if (!isEdit) {
          router.push(`/admin/blog/${data.id}`);
        } else {
          setForm((prev) => ({
            ...prev,
            published: data.published,
          }));
        }
      }
    } catch {
      setError("Failed to save post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-brand-muted animate-pulse">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-dark transition-colors"
            >
              <ArrowLeft size={16} />
              All Posts
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  preview
                    ? "bg-brand-green/10 text-brand-green-dark"
                    : "text-brand-muted hover:text-brand-dark hover:bg-gray-50"
                }`}
              >
                <Eye size={14} />
                Preview
              </button>
              {form.published ? (
                <button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 transition-all disabled:opacity-50"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-brand-green-dark bg-brand-green/10 hover:bg-brand-green/20 transition-all disabled:opacity-50"
                >
                  <Globe size={14} />
                  Publish
                </button>
              )}
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl mb-6 border border-green-100">
            {success}
          </div>
        )}

        {preview ? (
          /* Preview Mode */
          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10">
            <div className="text-xs text-brand-muted font-medium mb-4 flex items-center gap-2">
              <Eye size={13} />
              Preview
            </div>
            <h1 className="font-display text-3xl font-bold text-brand-dark mb-4">
              {form.title || "Untitled Post"}
            </h1>
            <p className="text-brand-muted text-sm italic mb-6">
              {form.excerpt || "No excerpt"}
            </p>
            <div className="prose-custom">
              {form.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3
                      key={i}
                      className="font-display text-xl font-bold text-brand-dark mt-6 mb-2"
                    >
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p
                    key={i}
                    className="text-brand-dark/80 leading-relaxed mb-4"
                  >
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
              })}
            </div>
          </div>
        ) : (
          /* Editor Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main editor */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
                  <Type size={13} />
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="w-full text-lg font-display font-bold text-brand-dark placeholder:text-gray-300 focus:outline-none border-none p-0"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
                  <FileText size={13} />
                  Content *
                </label>
                <div className="mb-2 text-[11px] text-brand-muted">
                  Use **bold text** for emphasis. Separate paragraphs with blank
                  lines. Use **heading** on its own line for subheadings.
                </div>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Write your blog post content here...

Separate paragraphs with a blank line.

**Use double asterisks for bold text**

Start a line with **Heading Text** for a subheading."
                  rows={20}
                  className="w-full text-sm text-brand-dark leading-relaxed placeholder:text-gray-300 focus:outline-none border border-gray-100 rounded-lg p-4 resize-y font-mono"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Slug */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
                  <Link2 size={13} />
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-muted shrink-0">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setForm((prev) => ({
                        ...prev,
                        slug: generateSlug(e.target.value),
                      }));
                    }}
                    placeholder="your-post-url"
                    className="w-full text-sm text-brand-dark placeholder:text-gray-300 focus:outline-none border-none p-0"
                  />
                </div>
                {autoSlug && (
                  <p className="text-[10px] text-brand-green-dark mt-1">
                    Auto-generated from title
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
                  <AlignLeft size={13} />
                  Excerpt *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="A short summary that appears on the blog listing page..."
                  rows={3}
                  className="w-full text-sm text-brand-dark placeholder:text-gray-300 focus:outline-none border border-gray-100 rounded-lg p-3 resize-none"
                />
              </div>

              {/* Image URL */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-brand-dark mb-2">
                  <ImageIcon size={13} />
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  placeholder="/images/your-photo.jpg or https://..."
                  className="w-full text-sm text-brand-dark placeholder:text-gray-300 focus:outline-none border border-gray-100 rounded-lg p-3"
                />
                <p className="text-[10px] text-brand-muted mt-1">
                  Optional. Use a local path like /images/photo.jpg or a full
                  URL.
                </p>
                {form.image_url && (
                  <div className="mt-3 relative h-32 bg-gray-50 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-dark">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      form.published
                        ? "bg-brand-green/10 text-brand-green-dark"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        form.published ? "bg-brand-green" : "bg-amber-400"
                      }`}
                    />
                    {form.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

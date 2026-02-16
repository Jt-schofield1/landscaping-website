"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  Upload,
  X,
  ImageIcon,
  Loader2,
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
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = async (file: File) => {
    const token = getToken();
    if (!token) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use JPG, PNG, WebP, or GIF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        setForm((prev) => ({ ...prev, image_url: data.url }));
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    e.target.value = "";
  };

  const handleSave = async (publish?: boolean) => {
    const token = getToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError(
        "Please fill in all required fields (title, slug, excerpt, content)."
      );
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
          setForm((prev) => ({ ...prev, published: data.published }));
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
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40">
          <Loader2 size={18} className="animate-spin" />
          Loading post...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <div className="bg-[#161821] border-b border-white/[0.06] sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <ArrowLeft size={16} />
              All Posts
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  preview
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-white/40 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                <Eye size={14} />
                Preview
              </button>
              {form.published ? (
                <button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-all disabled:opacity-50"
                >
                  Unpublish
                </button>
              ) : (
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <Globe size={14} />
                  Publish
                </button>
              )}
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 border border-red-500/20">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-6 border border-emerald-500/20">
            {success}
          </div>
        )}

        {preview ? (
          /* Preview Mode */
          <div className="bg-[#161821] rounded-2xl border border-white/[0.06] p-8 sm:p-10">
            <div className="text-xs text-white/30 font-medium mb-6 flex items-center gap-2">
              <Eye size={13} />
              Preview
            </div>
            {form.image_url && (
              <div className="relative h-52 rounded-xl overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image_url}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="font-display text-3xl font-bold text-white mb-4">
              {form.title || "Untitled Post"}
            </h1>
            <p className="text-white/40 text-sm italic mb-6 pb-6 border-b border-white/[0.06]">
              {form.excerpt || "No excerpt"}
            </p>
            <div className="prose-custom">
              {form.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3
                      key={i}
                      className="text-xl font-bold text-white mt-6 mb-2"
                    >
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={i} className="text-white/60 leading-relaxed mb-4">
                    {parts.map((part, j) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={j} className="font-semibold text-white/80">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main editor */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                  <Type size={12} />
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="w-full text-xl font-bold text-white bg-transparent placeholder:text-white/15 focus:outline-none border-none p-0"
                />
              </div>

              {/* Content */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2">
                  <FileText size={12} />
                  Content *
                </label>
                <div className="mb-3 text-[11px] text-white/20 leading-relaxed">
                  Use **bold text** for emphasis. Separate paragraphs with blank
                  lines. Use **Heading** on its own line for subheadings.
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
                  rows={22}
                  className="w-full text-sm text-white/70 leading-relaxed bg-[#0f1117] placeholder:text-white/10 focus:outline-none border border-white/[0.06] rounded-lg p-4 resize-y font-mono focus:border-emerald-500/30 transition-colors"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Cover Image Upload */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                  <ImageIcon size={12} />
                  Cover Image
                </label>

                {form.image_url ? (
                  <div className="relative group">
                    <div className="relative h-40 bg-[#0f1117] rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.image_url}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <button
                      onClick={() =>
                        setForm((prev) => ({ ...prev, image_url: "" }))
                      }
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-500 text-white rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 w-full text-xs text-white/30 hover:text-white/50 transition-colors text-center py-1.5"
                    >
                      Click to replace
                    </button>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragOver
                        ? "border-emerald-500/50 bg-emerald-500/5"
                        : "border-white/[0.08] bg-[#0f1117] hover:border-white/15 hover:bg-[#0f1117]/80"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2
                          size={24}
                          className="text-emerald-400 animate-spin mb-2"
                        />
                        <span className="text-xs text-white/30">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload
                          size={22}
                          className={`mb-2 transition-colors ${
                            dragOver ? "text-emerald-400" : "text-white/15"
                          }`}
                        />
                        <span className="text-xs text-white/30 font-medium">
                          Drop an image here
                        </span>
                        <span className="text-[10px] text-white/15 mt-1">
                          or click to browse
                        </span>
                        <span className="text-[10px] text-white/10 mt-2">
                          JPG, PNG, WebP &middot; Max 10MB
                        </span>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Slug */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                  <Link2 size={12} />
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/20 shrink-0">/blog/</span>
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
                    className="w-full text-sm text-white/60 bg-transparent placeholder:text-white/10 focus:outline-none border-none p-0"
                  />
                </div>
                {autoSlug && (
                  <p className="text-[10px] text-emerald-400/50 mt-2">
                    Auto-generated from title
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <label className="flex items-center gap-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">
                  <AlignLeft size={12} />
                  Excerpt *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="A short summary for the blog listing..."
                  rows={3}
                  className="w-full text-sm text-white/60 bg-[#0f1117] placeholder:text-white/10 focus:outline-none border border-white/[0.06] rounded-lg p-3 resize-none focus:border-emerald-500/30 transition-colors"
                />
              </div>

              {/* Status */}
              <div className="bg-[#161821] rounded-xl border border-white/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      form.published
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        form.published ? "bg-emerald-400" : "bg-amber-400"
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

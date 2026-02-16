"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        sessionStorage.setItem("admin_token", password);
        router.push("/admin/blog");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf size={28} className="text-brand-green-dark" />
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-dark mb-2">
            Admin Dashboard
          </h1>
          <p className="text-brand-muted text-sm">
            Adjacent Property Management
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-brand-green/5"
        >
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-brand-dark mb-2"
          >
            Password
          </label>
          <div className="relative mb-4">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

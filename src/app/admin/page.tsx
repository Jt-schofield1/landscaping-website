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
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      {/* Subtle gradient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Leaf size={24} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1.5">
            Admin Dashboard
          </h1>
          <p className="text-white/30 text-sm">
            Adjacent Property Management
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#161821] rounded-2xl p-7 border border-white/[0.06]"
        >
          <label
            htmlFor="password"
            className="block text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2.5"
          >
            Password
          </label>
          <div className="relative mb-5">
            <Lock
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-10 pr-11 py-3 bg-[#0f1117] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-emerald-500/30 transition-all"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 px-4 py-2.5 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/10 text-[11px] mt-6">
          Secure admin access only
        </p>
      </div>
    </div>
  );
}

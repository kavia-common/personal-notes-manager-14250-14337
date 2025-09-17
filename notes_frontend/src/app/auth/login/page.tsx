"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/store/useAuth";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try {
      await login({ email, password });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      setErr(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-blue-600 text-xl font-bold">N</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
        <p className="mt-1 text-slate-500">Sign in to continue to your notes.</p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm text-slate-600">Email</label>
          <input
            className="input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-600">Password</label>
          <input
            className="input"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button className="btn btn-primary w-full" disabled={loading} type="submit">
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

"use client";

import { useAuth } from "@/store/useAuth";
import Link from "next/link";
import { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * UserMenu shows the user info and account actions (login/logout).
 */
export function UserMenu() {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link className="btn btn-ghost" href="/auth/login">Login</Link>
        <Link className="btn btn-primary" href="/auth/signup">Sign up</Link>
      </div>
    );
  }

  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((s: string) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-3 rounded-xl border border-subtle bg-white px-3 py-2 shadow-sm transition-base hover:bg-slate-50"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
          {initials}
        </span>
        <div className="hidden text-left sm:block">
          <div className="text-sm font-medium text-slate-800">{user.name || "User"}</div>
          <div className="text-xs text-slate-500">{user.email}</div>
        </div>
        <span className="text-slate-500">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-subtle bg-white p-2 shadow-lg">
          <Link href="/notes" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">Your Notes</Link>
          <button
            className="btn btn-ghost w-full justify-start rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            onClick={() => logout()}
            disabled={loading}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

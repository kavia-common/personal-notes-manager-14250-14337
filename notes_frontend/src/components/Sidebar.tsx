"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotes } from "@/store/useNotes";

const nav = [
  { href: "/notes", label: "Notes", icon: "🗒️" },
  { href: "/auth/login", label: "Login", icon: "🔐" },
  { href: "/auth/signup", label: "Sign up", icon: "✨" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { notes } = useNotes();

  return (
    <div className="p-3">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-600">Navigation</h2>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-base ${
                active ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-lg border border-subtle p-3">
        <div className="text-xs uppercase tracking-wide text-slate-500">Stats</div>
        <div className="mt-2 text-sm text-slate-700">
          Notes: <span className="badge ml-1">{notes.length}</span>
        </div>
      </div>
    </div>
  );
}

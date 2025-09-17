import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Providers } from "@/providers/Providers";
import { UserMenu } from "@/components/UserMenu";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "Create, edit, and manage personal notes with a modern ocean-inspired UI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="ocean-gradient min-h-screen">
        <Providers>
          <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-subtle bg-white/70 backdrop-blur-md">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="group inline-flex items-center gap-3">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 shadow-sm">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-amber-400/20" />
                    <span className="relative text-lg font-bold text-blue-600">N</span>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Ocean Notes</span>
                    <span className="text-xs text-slate-500">Personal notes manager</span>
                  </div>
                </Link>
                <UserMenu />
              </div>
            </header>

            {/* Content Area */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
              {/* Sidebar */}
              <aside className="card h-fit lg:sticky lg:top-20">
                <Sidebar />
              </aside>

              {/* Main Content */}
              <main className="card min-h-[60vh] p-4 sm:p-6">{children}</main>
            </div>

            <footer className="mt-10 border-t border-subtle bg-white/60">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-slate-500 sm:px-6 lg:px-8">
                <span>© {new Date().getFullYear()} Ocean Notes</span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(245,158,11,0.2)]" />
                  Ocean Professional
                </span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

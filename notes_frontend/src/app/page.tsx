"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) router.replace("/notes");
      else router.replace("/auth/login");
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-blue-600 text-xl font-bold">N</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">Ocean Notes</h1>
        <p className="mt-1 text-slate-500">Redirecting to your workspace…</p>
        <div className="mt-4">
          <Link href="/auth/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

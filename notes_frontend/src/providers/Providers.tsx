"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/store/useAuth";
import { NotesProvider } from "@/store/useNotes";

/**
 * PUBLIC_INTERFACE
 * Providers wraps global app contexts (Auth, Notes) so all pages can access them.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NotesProvider>{children}</NotesProvider>
    </AuthProvider>
  );
}

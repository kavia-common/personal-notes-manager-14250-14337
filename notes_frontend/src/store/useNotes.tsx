"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Note } from "@/types";
import { NotesAPI } from "@/lib/api";
import { useAuth } from "./useAuth";

type NotesContextType = {
  notes: Note[];
  loading: boolean;
  fetchNotes: () => Promise<void>;
  createNote: (data: Partial<Note>) => Promise<Note>;
  updateNote: (id: string, data: Partial<Note>) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

/**
 * PUBLIC_INTERFACE
 * NotesProvider manages notes list and exposes CRUD operations.
 */
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await NotesAPI.list(token);
      // Optional: sort by updatedAt desc
      const sorted = [...res.data].sort((a, b) => {
        const aT = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const bT = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return bT - aT;
      });
      setNotes(sorted);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createNote = useCallback(async (data: Partial<Note>) => {
    if (!token) throw new Error("Unauthorized");
    const res = await NotesAPI.create(token, data);
    setNotes((prev) => [res.data, ...prev]);
    return res.data;
  }, [token]);

  const updateNote = useCallback(async (id: string, data: Partial<Note>) => {
    if (!token) throw new Error("Unauthorized");
    const res = await NotesAPI.update(token, id, data);
    setNotes((prev) => prev.map((n) => (n.id === id ? res.data : n)));
    return res.data;
  }, [token]);

  const deleteNote = useCallback(async (id: string) => {
    if (!token) throw new Error("Unauthorized");
    await NotesAPI.remove(token, id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, [token]);

  const value = useMemo<NotesContextType>(() => ({
    notes, loading, fetchNotes, createNote, updateNote, deleteNote
  }), [notes, loading, fetchNotes, createNote, updateNote, deleteNote]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes returns the notes context, ensuring provider is present.
 */
export function useNotes(): NotesContextType {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}

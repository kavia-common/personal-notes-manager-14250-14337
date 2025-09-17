"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useNotes } from "@/store/useNotes";
import { NoteEditor } from "@/components/NoteEditor";
import { NoteListItem } from "@/components/NoteListItem";

export default function NotesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { notes, fetchNotes, createNote, updateNote, deleteNote, loading } = useNotes();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.replace("/auth/login");
      else fetchNotes();
    }
  }, [user, authLoading, fetchNotes, router]);

  const selected = useMemo(() => notes.find((n) => n.id === selectedId) || null, [notes, selectedId]);
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return notes;
    return notes.filter((n) => (n.title || "").toLowerCase().includes(s) || (n.content || "").toLowerCase().includes(s));
  }, [notes, search]);

  const onCreate = async () => {
    const newNote = await createNote({ title: "Untitled", content: "" });
    setSelectedId(newNote.id);
  };

  const onSave = async (data: { title: string; content: string }) => {
    if (!selected) return;
    await updateNote(selected.id, data);
  };

  const onDelete = async () => {
    if (!selected) return;
    await deleteNote(selected.id);
    setSelectedId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
      {/* Notes list */}
      <section className="rounded-xl border border-subtle bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <input
            className="input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <button onClick={onCreate} className="btn btn-primary whitespace-nowrap">
            New Note
          </button>
        </div>
        <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
          {loading && notes.length === 0 ? (
            <div className="text-sm text-slate-500">Loading notes…</div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-slate-500">No notes found.</div>
          ) : (
            filtered.map((n) => (
              <NoteListItem
                key={n.id}
                note={n}
                active={n.id === selectedId}
                onClick={() => setSelectedId(n.id)}
              />
            ))
          )}
        </div>
      </section>

      {/* Editor */}
      <section className="rounded-xl border border-subtle bg-white p-4 shadow-sm">
        {selected ? (
          <NoteEditor
            key={selected.id}
            note={selected}
            onSave={onSave}
            onDelete={onDelete}
          />
        ) : (
          <div className="flex h-full min-h-[50vh] items-center justify-center text-slate-500">
            Select a note from the list or create a new one.
          </div>
        )}
      </section>
    </div>
  );
}

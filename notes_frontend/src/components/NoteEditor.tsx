"use client";

import { Note } from "@/types";
import { useEffect, useState } from "react";

export function NoteEditor({
  note,
  onSave,
  onDelete,
}: {
  note: Note;
  onSave: (data: { title: string; content: string }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
    setDirty(false);
  }, [note.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    setSaving(true);
    try {
      await onSave({ title, content });
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          className="input"
          placeholder="Note title"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
            setDirty(true);
          }}
        />
        <button onClick={save} className="btn btn-primary" disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onDelete} className="btn btn-danger ml-auto">
          Delete
        </button>
      </div>
      <textarea
        className="textarea min-h-[45vh]"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => {
          setContent(e.currentTarget.value);
          setDirty(true);
        }}
      />
    </div>
  );
}

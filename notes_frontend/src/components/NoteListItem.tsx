"use client";

import { Note } from "@/types";

export function NoteListItem({
  note,
  active,
  onClick,
}: {
  note: Note;
  active?: boolean;
  onClick?: () => void;
}) {
  const updated = note.updatedAt ? new Date(note.updatedAt) : null;

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border px-3 py-2 text-left transition-base ${
        active
          ? "border-blue-200 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="line-clamp-1 text-sm font-medium text-slate-800">
          {note.title || "Untitled"}
        </div>
        {updated && (
          <div className="ml-2 text-xs text-slate-500">
            {updated.toLocaleDateString()}
          </div>
        )}
      </div>
      {note.content && (
        <div className="mt-1 line-clamp-2 text-xs text-slate-500 whitespace-pre-wrap">
          {note.content}
        </div>
      )}
    </button>
  );
}

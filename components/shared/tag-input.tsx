"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean; // default false
  onBlur?: () => void;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add style and press Space",
  maxTags,
  allowDuplicates = false,
  onBlur,
}: TagInputProps) {
  const [text, setText] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Utility: normalize and validate a single tag
  const normalize = (raw: string) => raw.trim().replace(/\s+/g, " ");
  const exists = (tag: string) =>
    value.some((v) => v.toLowerCase() === tag.toLowerCase());

  const canAddMore = () =>
    typeof maxTags === "number" ? value.length < maxTags : true;

  const addTag = (raw: string) => {
    const tag = normalize(raw);
    if (!tag) return;
    if (!canAddMore()) return;
    if (!allowDuplicates && exists(tag)) return;
    onChange([...value, tag]);
  };

  const addMany = (raw: string) => {
    // Split on comma or any whitespace, collapse empties
    const parts = raw
      .split(/[,\s]+/)
      .map(normalize)
      .filter(Boolean);

    if (!parts.length) return;
    const next = [...value];
    for (const p of parts) {
      if (
        !allowDuplicates &&
        next.some((v) => v.toLowerCase() === p.toLowerCase())
      )
        continue;
      if (typeof maxTags === "number" && next.length >= maxTags) break;
      next.push(p);
    }
    if (next.length !== value.length) onChange(next);
  };

  const commit = () => {
    if (text.trim()) {
      addTag(text);
      setText("");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // triggers: Space, Enter, comma
    if (e.key === " " || e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
      return;
    }
    // Backspace on empty input removes last tag
    if (e.key === "Backspace" && !text && value.length) {
      e.preventDefault();
      const next = [...value];
      next.pop();
      onChange(next);
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (/[,\s]/.test(pasted)) {
      e.preventDefault();
      addMany(pasted);
      setText("");
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    // commit any leftover text on blur
    if (text.trim()) {
      commit();
    }
    onBlur?.();
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {value.map((t) => (
        <Badge
          key={`${t}`}
          variant="secondary"
          className={`px-3 py-1 text-sm bg-gray-100 text-gray-700`}
        >
          {t}
          <X
            className="w-3 h-3 ml-1 cursor-pointer"
            onClick={() => removeTag(t)}
          />
        </Badge>
      ))}

      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="h-8 w-44 bg-gray-50 border-gray-300 focus:bg-white text-sm"
      />
    </div>
  );
}

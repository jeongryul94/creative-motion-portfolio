"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-lime hover:text-lime"
    >
      {state === "copied" ? <Check className="size-4 text-lime" /> : <Copy className="size-4" />}
      <span aria-live="polite">
        {state === "copied" ? "복사됨" : state === "error" ? "복사 실패 — 직접 선택해 주세요" : "이메일 복사"}
      </span>
    </button>
  );
}

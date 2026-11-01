"use client";

import { useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const types = ["기업 홍보영상", "광고 · 브랜드", "유튜브 콘텐츠", "교육 콘텐츠", "모션그래픽", "3D · AI", "기타"];

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "이름을 입력해 주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "올바른 이메일 주소를 입력해 주세요.";
    if ((data.message ?? "").trim().length < 10) next.message = "문의 내용을 10자 이상 입력해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "전송에 실패했습니다.");
      setStatus({ kind: "success" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "전송에 실패했습니다." });
    }
  }

  const field =
    "w-full border-b border-line bg-transparent py-3 text-base text-fg placeholder:text-fg/30 transition-colors focus:border-lime focus:outline-none aria-[invalid=true]:border-red-400";

  if (status.kind === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-sm border border-lime/40 bg-lime/[0.05] p-8">
        <CircleCheck className="size-8 text-lime" aria-hidden />
        <p className="text-xl font-semibold">문의가 전송되었습니다.</p>
        <p className="text-muted">확인 후 남겨주신 이메일로 회신드리겠습니다.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-2 text-sm text-lime underline-offset-4 hover:underline">
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7" aria-describedby="form-status">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow">
            이름 *
          </label>
          <input id="cf-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined} />
          {errors.name && <p id="cf-name-err" className="mt-2 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow">
            이메일 *
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "cf-email-err" : undefined} />
          {errors.email && <p id="cf-email-err" className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-company" className="eyebrow">
            회사 / 소속
          </label>
          <input id="cf-company" name="company" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="cf-type" className="eyebrow">
            문의 유형
          </label>
          <select id="cf-type" name="type" className={`${field} appearance-none`} defaultValue="">
            <option value="" className="bg-ink">
              선택해 주세요
            </option>
            {types.map((t) => (
              <option key={t} value={t} className="bg-ink">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="eyebrow">
          문의 내용 *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="프로젝트 목적, 일정, 예산 범위 등을 알려주세요."
          className={`${field} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && <p id="cf-message-err" className="mt-2 text-sm text-red-400">{errors.message}</p>}
      </div>
      {/* 스팸 방지용 숨김 필드 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div id="form-status" aria-live="polite">
        {status.kind === "error" && (
          <p className="flex items-start gap-2 rounded-sm border border-red-400/40 bg-red-400/[0.06] p-4 text-sm text-red-300">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              {status.message} 급한 문의는{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-2">
                {email}
              </a>
              로 보내주세요.
            </span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-fg font-semibold text-ink transition-colors hover:bg-lime disabled:opacity-60 sm:w-auto sm:justify-self-start sm:px-8"
      >
        {status.kind === "sending" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden /> 전송 중…
          </>
        ) : (
          <>
            문의 보내기 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

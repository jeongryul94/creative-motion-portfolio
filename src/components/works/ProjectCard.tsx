"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatDuration } from "@/lib/video";
import { canHover, playExclusive, prefersReducedMotion, prefersSaveData, release } from "@/components/video/playback";
import { SampleBadge } from "@/components/ui/SampleBadge";

type Props = { project: Project; index: number; featured?: boolean };

export function ProjectCard({ project, index, featured = false }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false); // 미리보기 src는 처음 활성화될 때만 붙입니다.
  const [hoverMode, setHoverMode] = useState(true);

  // 커서를 따라다니는 "View" 라벨
  const cx = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const cy = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const [cursorOn, setCursorOn] = useState(false);

  const previewAllowed = () => !!project.previewUrl && !prefersReducedMotion() && !prefersSaveData();

  useEffect(() => setHoverMode(canHover()), []);

  // 터치 기기: hover 대신 화면 중앙에 들어온 카드의 미리보기를 재생 (한 번에 1개)
  useEffect(() => {
    if (hoverMode || !cardRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!previewAllowed()) return;
        setActive(e.isIntersecting);
        if (e.isIntersecting) setLoaded(true);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    io.observe(cardRef.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverMode]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loaded) return;
    if (active) {
      v.currentTime = 0;
      playExclusive(v);
    } else release(v);
  }, [active, loaded]);

  function onEnter(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    setCursorOn(true);
    if (!previewAllowed()) return;
    setLoaded(true);
    setActive(true);
  }
  function onLeave() {
    setCursorOn(false);
    setActive(false);
  }
  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
  }

  const meta = [project.year, project.role ?? project.category].filter(Boolean).join(" · ");

  return (
    <Link
      ref={cardRef}
      href={`/works/${project.slug}`}
      className="group block focus-visible:outline-none"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      onFocus={() => previewAllowed() && (setLoaded(true), setActive(true))}
      onBlur={() => setActive(false)}
      aria-label={`${project.title} — 프로젝트 자세히 보기`}
    >
      <div
        className={`relative overflow-hidden rounded-sm bg-ink-2 ring-lime/0 transition-[box-shadow] duration-300 group-focus-visible:ring-2 group-focus-visible:ring-lime ${
          featured ? "aspect-[4/5] sm:aspect-video lg:aspect-[21/9]" : "aspect-video"
        }`}
        style={{ cursor: cursorOn ? "none" : undefined }}
      >
        <Image
          src={project.thumbnail}
          alt={`${project.title} 대표 장면`}
          fill
          sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          priority={featured}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
        {loaded && project.previewUrl && (
          <video
            ref={videoRef}
            src={project.previewUrl}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />

        {/* 상단 정보 */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
          <span className="font-mono text-xs text-fg/80">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex items-center gap-2">
            {project.isSample && <SampleBadge label="SAMPLE" />}
            {featured && (
              <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
                Featured
              </span>
            )}
            {project.duration != null && (
              <span className="rounded-full bg-ink/60 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-fg/90 backdrop-blur">
                {formatDuration(project.duration)}
              </span>
            )}
          </div>
        </div>

        {/* 커서 라벨 (마우스 전용) */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime font-mono text-xs font-medium uppercase tracking-wider text-ink md:grid"
          style={{ x: cx, y: cy }}
          initial={false}
          animate={{ scale: cursorOn ? 1 : 0, opacity: cursorOn ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          View
        </motion.span>

        {featured && (
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <p className="eyebrow mb-3 text-fg/70">{meta}</p>
            <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-fg/75 md:text-base">{project.summary}</p>
          </div>
        )}
      </div>

      {!featured && (
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{project.title}</h3>
            <p className="mt-1 truncate text-sm text-fg/75">{project.summary}</p>
            <p className="mt-1 text-sm text-muted">{meta}</p>
          </div>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-lime"
            aria-hidden
          />
        </div>
      )}
    </Link>
  );
}

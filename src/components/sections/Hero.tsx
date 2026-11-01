"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { site } from "@/data/site";
import { prefersReducedMotion, prefersSaveData } from "@/components/video/playback";
import { formatTimecode } from "@/lib/video";
import { Magnetic } from "@/components/ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const userPaused = useRef(false);
  const reduce = useReducedMotion();

  // 마우스 위치에 따라 타이포가 미세하게 움직입니다.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => v * -14);
  const ty = useTransform(sy, (v) => v * -10);

  // 화면 크기에 맞는 해상도 선택 + 자동재생 (모션 감소·데이터 절약 시 자동재생 안 함)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    v.src = wide ? site.hero.video : site.hero.videoMobile;
    if (prefersReducedMotion() || prefersSaveData()) {
      userPaused.current = true;
      return;
    }
    v.play().catch(() => setPlaying(false)); // 자동재생 차단 → 포스터 + 재생 버튼
  }, []);

  // 히어로가 화면 밖으로 나가면 일시정지
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      aria-label="쇼릴"
      onPointerMove={onPointerMove}
      className="grain relative isolate flex h-[100svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      {/* 포스터: LCP 이미지 / 영상 재생 불가 시 대체 */}
      <Image
        src={site.hero.poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
        poster={site.hero.poster}
        aria-hidden
        onPlaying={() => {
          setReady(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
      {/* 가독성용 그라디언트 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,9,9,.55)_0%,rgba(9,9,9,.1)_35%,rgba(9,9,9,.35)_65%,#090909_100%)]" />

      <div className="container-x pb-24 md:pb-28">
        <motion.p
          className="eyebrow mb-5 flex items-center gap-3 text-fg/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <span className="inline-block size-2 rounded-full bg-lime" />
          Showreel · Video &amp; Motion
        </motion.p>

        <motion.h1 style={{ x: tx, y: ty }} className="display text-[clamp(3.4rem,13.5vw,13.5rem)] will-change-transform">
          {site.hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "text-lime" : ""}`}
                initial={{ y: "102%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 1.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-base leading-relaxed text-fg/80 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease }}
          >
            {site.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease }}
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-lime py-3.5 pl-6 pr-3.5 text-sm font-semibold text-ink"
              >
                View My Work
                <span className="grid size-8 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowDown className="size-4" />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* 하단 바: 타임코드 · 스크롤 안내 · 영상 컨트롤 */}
      <div className="container-x absolute inset-x-0 bottom-0 flex h-16 items-center justify-between border-t border-fg/10 md:h-20">
        <p className="hidden font-mono text-xs tabular-nums text-fg/60 md:block" aria-hidden>
          REEL&nbsp;&nbsp;{formatTimecode(time)}
        </p>
        <a href="#work" className="flex items-center gap-3 text-xs text-fg/60 transition-colors hover:text-fg">
          <span className="relative block h-8 w-px overflow-hidden bg-fg/20">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-lime" />
          </span>
          <span className="font-mono uppercase tracking-[0.16em]">Scroll</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="grid size-11 place-items-center rounded-full border border-fg/20 bg-ink/30 backdrop-blur transition-colors hover:border-lime hover:text-lime"
            aria-label={playing ? "쇼릴 일시정지" : "쇼릴 재생"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="flex h-11 items-center gap-2 rounded-full border border-fg/20 bg-ink/30 px-4 text-xs backdrop-blur transition-colors hover:border-lime hover:text-lime"
            aria-pressed={!muted}
            aria-label={muted ? "쇼릴 소리 켜기" : "쇼릴 소리 끄기"}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            <span className="hidden font-mono uppercase tracking-wider sm:inline">Sound {muted ? "Off" : "On"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

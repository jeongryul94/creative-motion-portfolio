"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { site } from "@/data/site";
import { prefersReducedMotion, prefersSaveData } from "@/components/video/playback";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);


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


  return (
    <section
      ref={sectionRef}
      aria-label="쇼릴"
      className="relative isolate flex h-[92svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-[#111] text-white"
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
      />
      {/* 가독성용 그라디언트 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.35)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,.65)_100%)]" />

      <div className="container-x pb-24 md:pb-28">
        <motion.p
          className="mb-4 text-sm text-white/75 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          정률 · 영상 편집자
        </motion.p>

        <motion.h1 className="display text-[clamp(2.8rem,8vw,7.5rem)]">
          {site.hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
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
            className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
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
            <a
              href="#work"
              className="inline-flex items-center gap-2 border-b border-white/70 pb-1 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              작업 보러 가기 ↓
            </a>
          </motion.div>
        </div>
      </div>

      {/* 영상 컨트롤 */}
      <div className="container-x absolute inset-x-0 bottom-0 flex h-16 items-center justify-end md:h-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/20 transition-colors hover:bg-black/40"
            aria-label={playing ? "쇼릴 일시정지" : "쇼릴 재생"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="flex h-10 items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 text-xs transition-colors hover:bg-black/40"
            aria-pressed={!muted}
            aria-label={muted ? "쇼릴 소리 켜기" : "쇼릴 소리 끄기"}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            <span className="hidden sm:inline">{muted ? "소리 켜기" : "소리 끄기"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

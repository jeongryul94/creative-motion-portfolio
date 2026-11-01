"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Scene } from "@/lib/types";
import { formatTimecode, parseVideoUrl } from "@/lib/video";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title: string;
  /** 플레이어와 주요 장면 사이에 들어갈 콘텐츠 */
  children?: React.ReactNode;
  videoUrl: string;
  poster: string;
  scenes?: Scene[];
};

/**
 * 대표 영상 플레이어 + 주요 장면.
 * - MP4: 네이티브 컨트롤, 장면 클릭 시 해당 시점으로 이동
 * - YouTube / Vimeo: 클릭 전까지 iframe을 불러오지 않는 경량 방식
 */
export function ProjectMedia({ title, videoUrl, poster, scenes, children }: Props) {
  const source = parseVideoUrl(videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [embedStart, setEmbedStart] = useState<number | null>(null);

  function seek(t: number) {
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (source.kind === "file") {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = t;
      v.play().catch(() => {});
    } else {
      setEmbedStart(Math.floor(t));
    }
  }

  let embedSrc = "";
  if (source.kind !== "file" && embedStart !== null) {
    embedSrc =
      source.kind === "youtube"
        ? `${source.embedUrl}&start=${embedStart}`
        : `${source.embedUrl}#t=${embedStart}s`;
  }

  return (
    <>
      <div ref={playerRef} className="relative aspect-video w-full overflow-hidden rounded-sm bg-ink-2">
        {source.kind === "file" ? (
          <video
            ref={videoRef}
            className="size-full bg-black"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={`${title} 영상`}
          >
            <source src={source.src} type="video/mp4" />
            브라우저가 영상 재생을 지원하지 않습니다.{" "}
            <a href={source.src} className="underline">
              영상 파일 열기
            </a>
          </video>
        ) : embedStart === null ? (
          <button
            type="button"
            onClick={() => setEmbedStart(0)}
            className="group absolute inset-0"
            aria-label={`${title} 영상 재생`}
          >
            <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
            <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
            <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 size-7" />
            </span>
          </button>
        ) : (
          <iframe
            key={embedSrc}
            src={embedSrc}
            title={`${title} 영상`}
            className="absolute inset-0 size-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      {children}

      {scenes && scenes.length > 0 && (
        <section aria-labelledby="scenes-title" className="mt-24 md:mt-32">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 id="scenes-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
              주요 장면
            </h2>
            <p className="hidden text-sm text-muted sm:block">장면을 누르면 해당 시점부터 재생됩니다.</p>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scenes.map((s, i) => (
              <Reveal as="li" key={s.image} delay={i * 0.06}>
                <button type="button" onClick={() => seek(s.time)} className="group block w-full text-left">
                  <span className="relative block aspect-video overflow-hidden rounded-sm bg-ink-2">
                    <Image
                      src={s.image}
                      alt={s.caption}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-sm bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-fg/90 backdrop-blur">
                      {formatTimecode(s.time)}
                    </span>
                    <span className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="grid size-11 place-items-center rounded-full bg-lime text-ink">
                        <Play className="ml-0.5 size-4" />
                      </span>
                    </span>
                  </span>
                  <span className="mt-3 block text-sm text-fg/80">{s.caption}</span>
                </button>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

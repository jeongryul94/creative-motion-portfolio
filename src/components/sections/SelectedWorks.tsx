"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, CATEGORY_LABEL, type Category, type Project } from "@/lib/types";
import { ProjectCard } from "@/components/works/ProjectCard";
import { RevealWords } from "@/components/ui/Reveal";

type Filter = "All" | Category;

/** 접힌 상태에서 보여줄 작품 수 (대표작 포함) */
const COLLAPSED_COUNT = 5;

export function SelectedWorks({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    for (const cat of CATEGORIES) c[cat] = projects.filter((p) => p.category === cat).length;
    return c;
  }, [projects]);

  const list = useMemo(() => {
    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    // 대표 작품을 맨 앞에
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [filter, projects]);

  const featured = list.find((p) => p.featured);
  const allRest = list.filter((p) => p !== featured);
  const limit = COLLAPSED_COUNT - (featured ? 1 : 0);
  const canCollapse = allRest.length > limit;
  const rest = expanded || !canCollapse ? allRest : allRest.slice(0, limit);
  const hiddenCount = allRest.length - rest.length;

  const toggle = () => {
    if (expanded) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setExpanded((v) => !v);
  };

  return (
    <section ref={sectionRef} id="work" aria-labelledby="work-title" className="container-x py-24 md:py-36">
      <div className="mb-10 flex flex-col gap-8 md:mb-16">
        <div>
          <h2 id="work-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
            <RevealWords text="작업" />
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg/75">
            회사 다니면서 만든 기업 영상이랑 유튜브 편집, 그리고 요즘 AI로 이것저것 만들어 본 것들이에요. 썸네일에 마우스를 올리면 미리보기가 재생됩니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="카테고리 필터" className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as Filter[]).map((f) => {
            const n = counts[f] ?? 0;
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                disabled={n === 0}
                title={n === 0 ? "작품 준비 중" : undefined}
                onClick={() => {
                  setFilter(f);
                  setExpanded(false);
                }}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                  on
                    ? "border-lime bg-lime text-ink"
                    : "border-line text-fg/80 hover:border-fg/50 hover:text-fg",
                  n === 0 ? "cursor-not-allowed opacity-35 hover:border-line" : "",
                ].join(" ")}
              >
                {f === "All" ? "전체" : CATEGORY_LABEL[f]}
                <span className="ml-1.5 text-xs opacity-60">{n}</span>
              </button>
            );
          })}
          </div>
          <p className="text-sm text-muted" aria-hidden>
            {list.length}편
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filter === "All" ? "전체" : CATEGORY_LABEL[filter]} 작업 {list.length}편
      </p>

      <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8 lg:gap-x-10 lg:gap-y-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {featured && (
            <motion.div
              key={featured.id}
              layout
              className="md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={featured} index={0} featured />
            </motion.div>
          )}
          {rest.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              // 비대칭 그리드: 오른쪽 열을 아래로 내려 리듬을 만듭니다.
              className={i % 2 === 1 ? "md:mt-28" : ""}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} index={i + (featured ? 1 : 0)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {canCollapse && (
        <div className="relative mt-16 flex justify-center md:mt-24">
          {!expanded && (
            <div
              className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent to-ink"
              aria-hidden
            />
          )}
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            className="group relative inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            {expanded ? "접기" : `${hiddenCount}편 더 보기`}
            <ChevronDown
              className={`size-4 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        </div>
      )}
    </section>
  );
}

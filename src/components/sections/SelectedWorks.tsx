"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, type Category, type Project } from "@/lib/types";
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
          <p className="eyebrow mb-4">(01) — Selected Works</p>
          <h2 id="work-title" className="display text-[clamp(3rem,9vw,8rem)]">
            <RevealWords text="Selected Works" />
          </h2>
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
                {f}
                <sup className="ml-1 font-mono text-[10px]">{n}</sup>
              </button>
            );
          })}
          </div>
          <p className="font-mono text-xs text-muted" aria-hidden>
            {String(list.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} Projects
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filter} 카테고리 작품 {list.length}개
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
              className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-ink"
              aria-hidden
            />
          )}
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            className="group relative inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            {expanded ? "접기" : `작품 더보기`}
            {!expanded && <span className="font-mono text-xs text-muted group-hover:text-lime">+{hiddenCount}</span>}
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

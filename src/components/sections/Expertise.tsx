"use client";

import { motion } from "motion/react";
import { Box, Clapperboard, Shapes, SlidersHorizontal, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { expertise, type ExpertiseItem } from "@/data/expertise";
import { RevealWords } from "@/components/ui/Reveal";

const icons: Record<ExpertiseItem["key"], LucideIcon> = {
  production: Clapperboard,
  editing: SlidersHorizontal,
  motion: Shapes,
  "3d": Box,
  ai: Sparkles,
  automation: Workflow,
};

const marquee = ["Video Production", "Color Grading", "Motion Graphics", "3D", "Generative AI", "Automation"];

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="overflow-hidden border-t border-line py-24 md:py-36">
      <div className="container-x">
        <p className="eyebrow mb-4">(03) — Expertise</p>
        <h2 id="expertise-title" className="display max-w-5xl text-[clamp(3rem,9vw,8rem)]">
          <RevealWords text="What I Do" />
        </h2>
      </div>

      {/* 흐르는 키워드 띠 */}
      <div className="mt-12 border-y border-line py-5 md:mt-16" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="display flex items-center gap-10 text-3xl text-fg/25 md:text-5xl">
              {m}
              <span className="size-2 rounded-full bg-lime/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-x mt-12 md:mt-16">
      <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item, i) => {
          const Icon = icons[item.key];
          return (
            <motion.li
              key={item.key}
              className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 md:p-8 lg:min-h-[19rem]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-line text-fg transition-all duration-500 group-hover:rotate-[-12deg] group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.description}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <li key={t} className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-xs text-fg/70">
                    {t}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </motion.li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}

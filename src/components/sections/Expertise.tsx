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


export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="overflow-hidden border-t border-line py-24 md:py-36">
      <div className="container-x">
        <h2 id="expertise-title" className="display max-w-5xl text-[clamp(2.4rem,6vw,5rem)]">
          <RevealWords text="할 수 있는 일" />
        </h2>
      </div>

      <div className="container-x mt-12 md:mt-16">
      <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item, i) => {
          const Icon = icons[item.key];
          return (
            <motion.li
              key={item.key}
              className="group relative bg-ink p-6 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="flex items-center gap-3 text-xl font-bold tracking-[-0.02em] md:text-2xl">
                <Icon className="size-5 text-lime" aria-hidden />
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/75 md:text-base">{item.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <li key={t} className="text-xs text-muted after:ml-1.5 after:content-['·'] last:after:content-none">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}

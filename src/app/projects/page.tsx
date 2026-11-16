import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamProjects } from "@/data/teamProjects";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "팀 프로젝트와 창업 도전을 문제 · 해결 · 내가 맡은 일 · 결과 순서로 정리했습니다.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="container-x pb-24 pt-32 md:pb-36 md:pt-44">
      <p className="eyebrow mb-4">Team Projects · Startup</p>
      <h1 className="display text-[clamp(3rem,9vw,8rem)]">
        <RevealWords text="Projects" />
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/75">
        영상 밖에서 한 작업들입니다. 데이터 분석, 창업 기획, AI 자동화 서비스를
        문제 → 해결 → 내가 맡은 일 → 결과 순서로 정리했습니다.
      </p>

      <ol className="mt-16 border-t border-line md:mt-24">
        {teamProjects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.06} className="border-b border-line">
            <Link
              href={`/projects/${p.slug}`}
              className="group grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-14"
            >
              <span className="font-mono text-xs text-muted md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative aspect-video overflow-hidden rounded-sm bg-ink-2 md:col-span-4">
                <Image
                  src={p.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="md:col-span-6">
                <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
                  <span className="text-lime">{p.stage}</span>
                  <span>{p.period}</span>
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
                  {p.title}
                  <span className="mt-1 block text-[0.55em] font-medium tracking-[-0.02em] text-fg/70">
                    {p.subtitle}
                  </span>
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted">팀</dt>
                    <dd>{p.team}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted">역할</dt>
                    <dd>{p.role}</dd>
                  </div>
                </dl>
              </div>

              <span className="hidden justify-self-end md:col-span-1 md:block" aria-hidden>
                <span className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

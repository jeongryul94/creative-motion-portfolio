import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamProjects } from "@/data/teamProjects";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

/** 홈 화면용 프로젝트 섹션 — 영상 작품 아래에서 팀 프로젝트 · 창업 도전을 함께 보여줍니다. */
export function HomeProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="container-x scroll-mt-20 py-24 md:py-36">
      <div className="mb-10 flex flex-col gap-8 md:mb-16">
        <div>
          <p className="eyebrow mb-4">(02) — Projects</p>
          <h2 id="projects-title" className="display text-[clamp(3rem,9vw,8rem)]">
            <RevealWords text="Projects" />
          </h2>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-fg/75">
            영상 밖에서 한 작업들입니다. 데이터 분석, AI 창업 기획, n8n 자동화 서비스를
            문제 → 해결 → 내가 한 일 → 결과 순서로 정리했습니다.
          </p>
          <p className="font-mono text-xs text-muted" aria-hidden>
            {String(teamProjects.length).padStart(2, "0")} Projects
          </p>
        </div>
      </div>

      <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-8">
        {teamProjects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.08}>
            <Link href={`/projects/${p.slug}`} className="group block">
              <span className="relative block aspect-video overflow-hidden rounded-sm bg-ink-2">
                <Image
                  src={p.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] text-fg/90 backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-lime text-ink opacity-0 transition-all duration-500 group-hover:opacity-100"
                  aria-hidden
                >
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
              <span className="mt-5 block font-mono text-xs text-lime">{p.stage}</span>
              <span className="mt-2 block text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-snug tracking-[-0.03em] transition-colors group-hover:text-lime">
                {p.title}
              </span>
              <span className="mt-1.5 block leading-relaxed text-fg/70">{p.subtitle}</span>
              <span className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <span>{p.period}</span>
                <span>{p.team}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 flex justify-center md:mt-20">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm transition-colors duration-300 hover:border-lime hover:text-lime"
        >
          프로젝트 전체 보기
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

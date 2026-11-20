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
          <h2 id="projects-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
            <RevealWords text="프로젝트" />
          </h2>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-fg/75">
            영상 말고 다른 걸 만들어 본 기록이에요. 팀으로 한 데이터 분석이랑 자동화 서비스,
            그리고 혼자 준비하고 있는 창업 아이템이 있습니다.
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

              </span>
              <span className="mt-5 block text-sm font-medium text-lime">{p.stage}</span>
              <span className="mt-2 block text-[clamp(1.35rem,2vw,1.75rem)] font-bold leading-snug tracking-[-0.03em] underline-offset-4 group-hover:underline">
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
          className="group inline-flex items-center gap-2 border-b border-fg pb-1 text-sm font-semibold"
        >
          프로젝트 목록 보기
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

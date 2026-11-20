import { about } from "@/data/site";
import { projects } from "@/data/projects";
import { CATEGORIES } from "@/lib/types";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

const specialties = [
  "기업 홍보영상",
  "광고 · 브랜드 영상",
  "유튜브 콘텐츠",
  "교육 · 온라인 강의",
  "모션그래픽",
  "3D · AI 콘텐츠",
];

export function About() {
  // 수치는 실제 등록된 작품 데이터에서만 계산합니다.
  const totalSec = projects.reduce((s, p) => s + (p.duration ?? 0), 0);
  const usedCats = CATEGORIES.filter((c) => projects.some((p) => p.category === c)).length;
  const stats = [
    { value: String(projects.length).padStart(2, "0"), label: "공개 작품" },
    { value: `${Math.round(totalSec / 60)}′`, label: "총 러닝타임(분)" },
    { value: String(usedCats).padStart(2, "0"), label: "작업 카테고리" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-ink-2/40 py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">(03) — About</p>
            <h2 id="about-title" className="display text-[clamp(3rem,9vw,8rem)]">
              <RevealWords text="About Me" />
            </h2>
            <Reveal className="mt-8 flex items-center gap-3">
              <p className="text-xl font-semibold">{about.name.value}</p>
              {about.name.sample && <SampleBadge />}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-2 text-muted">Video Director · Editor · Motion Designer</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="whitespace-pre-line text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
              {about.headline}
            </p>
          </Reveal>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/75 md:text-lg">
            {about.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-3 border-y border-line">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className={`py-6 ${i > 0 ? "border-l border-line pl-4 md:pl-6" : ""}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-5xl text-lime md:text-7xl">{s.value}</dd>
                <dd className="mt-2 text-xs text-muted md:text-sm">{s.label}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="eyebrow mb-5">전문 분야</h3>
              <ul className="space-y-2.5">
                {specialties.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-fg/90">
                    <span className="h-px w-4 bg-lime" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="eyebrow mb-5">제작 철학</h3>
              <ol className="space-y-4">
                {about.philosophy.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[2rem_1fr]">
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    <div>
                      <p className="font-semibold">{p.title}</p>
                      <p className="mt-1 text-sm text-muted">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <h3 className="eyebrow">경력</h3>
              {about.career.sample && <SampleBadge />}
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {about.career.items.map((c) => (
                <li key={c.title} className="grid gap-1 py-4 md:grid-cols-[10rem_1fr_1fr] md:gap-6">
                  <span className="font-mono text-xs text-muted md:pt-1">{c.period}</span>
                  <span className="font-semibold">{c.title}</span>
                  <span className="text-sm text-muted">{c.body}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <h3 className="eyebrow">사용 소프트웨어</h3>
              {about.software.sample && <SampleBadge />}
            </div>
            <ul className="flex flex-wrap gap-2">
              {about.software.items.map((s) => (
                <li key={s} className="rounded-full border border-line px-4 py-2 text-sm text-fg/85">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-sm border border-lime/30 bg-lime/[0.04] p-6 md:p-8">
              <p className="eyebrow mb-3 text-lime">Differentiator</p>
              <p className="text-xl font-semibold md:text-2xl">{about.edge.title}</p>
              <p className="mt-3 leading-relaxed text-fg/75">{about.edge.body}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

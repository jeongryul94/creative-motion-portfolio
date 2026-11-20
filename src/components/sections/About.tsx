import { about } from "@/data/site";
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
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-ink-2/40 py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="about-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
              <RevealWords text="소개" />
            </h2>
            <Reveal className="mt-8 flex items-center gap-3">
              <p className="text-xl font-semibold">{about.name.value}</p>
              {about.name.sample && <SampleBadge />}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-2 text-muted">영상 편집 · 모션 · 데이터 분석과 자동화 공부 중</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="whitespace-pre-line text-2xl font-bold leading-snug tracking-[-0.03em] md:text-[2.25rem]">
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

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="eyebrow mb-5">전문 분야</h3>
              <ul className="space-y-2.5">
                {specialties.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-fg/90">
                    <span className="text-muted" aria-hidden>·</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="eyebrow mb-5">일할 때 지키는 것</h3>
              <ul className="space-y-5">
                {about.philosophy.map((p) => (
                  <li key={p.title}>
                    <p className="font-semibold">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                  </li>
                ))}
              </ul>
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
                  <span className="text-sm text-muted">{c.period}</span>
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
            <div className="border-l-2 border-lime pl-5 md:pl-6">
              <p className="text-xl font-bold tracking-[-0.02em] md:text-2xl">{about.edge.title}</p>
              <p className="mt-3 leading-relaxed text-fg/75">{about.edge.body}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

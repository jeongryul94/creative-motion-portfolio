import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText, Link2, PlayCircle, ShieldCheck } from "lucide-react";
import { getTeamProject, teamProjects } from "@/data/teamProjects";
import { ProjectMedia } from "@/components/video/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return teamProjects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getTeamProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, images: [{ url: p.thumbnail, width: 1600, height: 900 }] },
  };
}

function Block({ label, children, id }: { label: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mt-20 grid scroll-mt-28 gap-8 md:mt-28 lg:grid-cols-12">
      <h2 className="eyebrow lg:col-span-4">{label}</h2>
      <div className="min-w-0 lg:col-span-8">{children}</div>
    </section>
  );
}

function DataTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead className="bg-ink-2">
          <tr>
            {cols.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-mono text-xs font-normal uppercase tracking-wider text-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              {r.map((cell, j) => (
                <td key={j} className={`px-4 py-3 leading-relaxed ${j === 0 ? "font-semibold text-fg" : "text-fg/80"}`}>
                  {cell === "PASS" ? <span className="font-mono text-lime">PASS</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Figure({ src, caption, portrait }: { src: string; caption?: string; portrait?: boolean }) {
  return (
    <figure>
      <a href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-sm border border-line bg-white">
        <Image
          src={src}
          alt={caption ?? ""}
          width={portrait ? 780 : 1600}
          height={portrait ? 1688 : 1000}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`h-auto transition-transform duration-700 group-hover:scale-[1.015] ${portrait ? "mx-auto max-h-[640px] w-auto" : "w-full"}`}
        />
      </a>
      {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

const RESOURCE_ICON = { pdf: FileText, video: PlayCircle, link: Link2 } as const;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li key={t} className="flex gap-4 border-b border-line pb-4 text-lg leading-relaxed text-fg/85">
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function TeamProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getTeamProject(slug);
  if (!p) notFound();
  const idx = teamProjects.indexOf(p);
  const next = teamProjects[(idx + 1) % teamProjects.length];

  const meta = [
    { label: "Period", value: p.period },
    { label: "Team", value: p.team },
    { label: "With", value: p.partner },
    { label: "My role", value: p.role },
  ].filter((x): x is { label: string; value: string } => !!x.value);

  // 섹션 번호는 있는 섹션만 차례로 매깁니다.
  let count = 0;
  const n = () => String(++count).padStart(2, "0");

  const toc = [
    p.architecture && { id: "architecture", label: "시스템 구조" },
    p.deepDives?.length && { id: "deep-dive", label: "핵심 설계" },
    p.automation && { id: "automation", label: "자동화 실행 화면" },
    p.troubleshooting && { id: "troubleshooting", label: "트러블슈팅" },
    { id: "ownership", label: "내가 한 일 / 협업" },
    { id: "results", label: "결과" },
    p.resources?.length && { id: "resources", label: "자료 · 링크" },
  ].filter((x): x is { id: string; label: string } => !!x);

  return (
    <article className="pt-28 md:pt-36">
      <div className="container-x">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        <header className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-5 text-lime">{p.stage}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">{p.title}</h1>
              <p className="mt-3 text-[clamp(1.2rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-fg/70">{p.subtitle}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="self-end lg:col-span-4">
            <p className="text-lg leading-relaxed text-fg/75">{p.summary}</p>
          </Reveal>
        </header>

        <div className="mt-12 md:mt-16">
          {p.video ? (
            <ProjectMedia title={`${p.title} ${p.video.label}`} videoUrl={p.video.src} poster={p.thumbnail} scenes={p.video.scenes}>
              <p className="mt-3 text-sm text-muted">▶ {p.video.label}</p>
            </ProjectMedia>
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-sm bg-ink-2">
              <Image src={p.thumbnail} alt="" fill sizes="100vw" className="object-cover" priority />
            </div>
          )}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-8 lg:grid-cols-4">
          {meta.map((x) => (
            <div key={x.label}>
              <dt className="eyebrow">{x.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg/90">{x.value}</dd>
            </div>
          ))}
        </dl>

        {/* 이 페이지 목차 — 제출용으로 바로 이동 */}
        <nav aria-label="이 페이지 목차" className="mt-10 flex flex-wrap gap-2">
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-fg/80 transition-colors hover:border-lime hover:text-lime"
            >
              {t.label}
            </a>
          ))}
        </nav>

        <Block label={`${n()} · 문제`}>
          <Bullets items={p.problem} />
        </Block>

        <Block label={`${n()} · 해결`}>
          <Bullets items={p.solution} />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
            {p.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.05} className="bg-ink p-6 md:p-7">
                <span className="font-mono text-xs text-lime">FEATURE {String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-lg font-semibold">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </Block>

        {p.architecture && (
          <Block id="architecture" label={`${n()} · 시스템 구조`}>
            <Figure src={p.architecture.image} caption={p.architecture.caption} />
            <ol className="mt-8 space-y-3">
              {p.architecture.points.map((t, i) => (
                <li key={t} className="flex gap-4 leading-relaxed text-fg/85">
                  <span className="font-mono text-sm text-lime">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ol>
          </Block>
        )}

        {p.deepDives && p.deepDives.length > 0 && (
          <Block id="deep-dive" label={`${n()} · 핵심 설계`}>
            <div className="space-y-16">
              {p.deepDives.map((d) => (
                <Reveal key={d.title}>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-fg/80">{d.body}</p>
                  {d.table && (
                    <div className="mt-6">
                      <DataTable cols={d.table.cols} rows={d.table.rows} />
                    </div>
                  )}
                  {d.image && (
                    <div className="mt-6">
                      <Figure src={d.image.src} caption={d.image.caption} />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </Block>
        )}

        <Block label={`${n()} · 진행 과정`}>
          <ol className="relative space-y-8 border-l border-line pl-8">
            {p.process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-lime" aria-hidden />
                <span className="font-mono text-xs text-muted">STEP {String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-lg font-semibold">{s.title}</p>
                <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          {p.milestones && (
            <div className="mt-12">
              <p className="eyebrow mb-5">진행 현황</p>
              <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
                {p.milestones.map((m) => (
                  <li key={m.title} className="bg-ink p-5">
                    <p className="flex items-center gap-2 font-mono text-xs">
                      <span className={`size-2 rounded-full ${m.done ? "bg-lime" : "border border-lime"}`} aria-hidden />
                      <span className={m.done ? "text-lime" : "text-muted"}>{m.date}</span>
                      <span className="text-muted">{m.done ? "완료" : "예정"}</span>
                    </p>
                    <p className="mt-2 font-semibold">{m.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{m.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Block>
      </div>

      {p.automation && (
        <section id="automation" aria-labelledby="automation-title" className="mt-24 scroll-mt-28 border-y border-line bg-ink-2/60 py-20 md:mt-32 md:py-28">
          <div className="container-x">
            <p className="eyebrow mb-4 text-lime">{n()} · 자동화 시스템 실행 화면</p>
            <h2 id="automation-title" className="max-w-3xl text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
              {p.slug === "in2us-inventory-check" ? "사진 한 장이 재고가 되기까지" : "AI로 혼자서 빠르게 반복하는 법"}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg/75">{p.automation.intro}</p>

            <ol className="mt-16 space-y-20 md:space-y-28">
              {p.automation.steps.map((s, i) => (
                <Reveal as="li" key={s.title} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                  {s.image && (
                    <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                      <Figure src={s.image} portrait={s.portrait} />
                    </div>
                  )}
                  <div className={s.image ? `lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}` : "lg:col-span-8"}>
                    <p className="font-mono text-xs text-lime">
                      {String(i + 1).padStart(2, "0")} · {s.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-fg/75">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <div className="container-x">
        {p.troubleshooting && (
          <Block id="troubleshooting" label={`${n()} · 트러블슈팅`}>
            <ul className="grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2">
              {p.troubleshooting.map((t, i) => (
                <Reveal as="li" key={t.title} delay={(i % 2) * 0.05} className="bg-ink p-6 md:p-7">
                  <span className="font-mono text-xs text-lime">#{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-lg font-semibold leading-snug">{t.title}</p>
                  <dl className="mt-4 space-y-2 text-sm leading-relaxed">
                    <div className="flex gap-3">
                      <dt className="w-10 shrink-0 text-muted">원인</dt>
                      <dd className="text-fg/80">{t.cause}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-10 shrink-0 text-muted">해결</dt>
                      <dd className="text-fg/80">{t.fix}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-10 shrink-0 text-lime">결과</dt>
                      <dd className="text-fg">{t.result}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </ul>
          </Block>
        )}

        <Block id="ownership" label={`${n()} · 내가 한 일 / 협업`}>
          {p.ownership ? (
            <div className="grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-2">
              <div className="bg-ink p-6 md:p-8">
                <p className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">직접 작업</p>
                <ul className="mt-5 space-y-3">
                  {p.ownership.mine.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-fg/90">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-ink p-6 md:p-8">
                <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-semibold text-fg/80">협업 · 다른 사람 작업</p>
                <ul className="mt-5 space-y-4">
                  {p.ownership.team.map((t) => (
                    <li key={t.who} className="leading-relaxed">
                      <span className="block text-sm font-semibold text-fg/90">{t.who}</span>
                      <span className="text-sm text-muted">{t.what}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <Bullets items={p.contributions} />
          )}
          {p.ownership?.note && <p className="mt-4 text-sm text-muted">※ {p.ownership.note}</p>}
        </Block>

        <Block id="results" label={`${n()} · 결과`}>
          <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-3">
            {p.results.map((r) => (
              <li key={r.label} className="bg-ink p-6 md:p-8">
                <p className="display text-[clamp(2.2rem,4vw,3.4rem)] text-lime">{r.value}</p>
                <p className="mt-2 text-sm text-fg/80">{r.label}</p>
              </li>
            ))}
          </ul>
          {p.resultNote && <p className="mt-4 text-sm text-muted">※ {p.resultNote}</p>}
          {p.tests && (
            <div className="mt-10">
              <p className="eyebrow mb-4">자동 시험 주요 단계</p>
              <DataTable cols={["단계", "확인한 것", "결과"]} rows={p.tests.map((t) => [t.step, t.check, t.result])} />
            </div>
          )}
        </Block>

        {p.limits && (
          <Block id="limits" label={`${n()} · 한계와 다음 단계`}>
            <Bullets items={p.limits.now} />
            <ol className="mt-8 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
              {p.limits.next.map((x, i) => (
                <li key={x.title} className="bg-ink p-6">
                  <span className="font-mono text-xs text-lime">NEXT {String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-semibold">{x.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{x.body}</p>
                </li>
              ))}
            </ol>
          </Block>
        )}

        <Block label={`${n()} · 기술 스택`}>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-4 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        {p.resources && p.resources.length > 0 && (
          <Block id="resources" label={`${n()} · 자료 · 링크`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.resources.map((r) => {
                const Icon = RESOURCE_ICON[r.kind];
                const external = r.kind !== "link" || r.href.startsWith("http");
                return (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-sm border border-line p-5 transition-colors hover:border-lime"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-2 text-lime">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold leading-snug">{r.label}</span>
                        {r.note && <span className="mt-0.5 block text-sm text-muted">{r.note}</span>}
                      </span>
                      <ArrowUpRight className="size-5 shrink-0 text-muted transition-all group-hover:rotate-45 group-hover:text-lime" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
            {p.privacyNote && (
              <p className="mt-6 flex gap-3 rounded-sm border border-line bg-ink-2 p-5 text-sm leading-relaxed text-fg/80">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden />
                {p.privacyNote}
              </p>
            )}
          </Block>
        )}

        {p.gallery && p.gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="mt-24 md:mt-32">
            <h2 id="gallery-title" className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
              화면 · 자료
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.gallery.map((g, i) => (
                <Reveal as="li" key={g.src} delay={i * 0.05}>
                  <a href={g.src} target="_blank" rel="noreferrer" className="group block">
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-white">
                      <Image
                        src={g.src}
                        alt={g.caption}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="mt-3 block text-sm text-fg/80">{g.caption}</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Link
        href={`/projects/${next.slug}`}
        className="group relative mt-28 block overflow-hidden border-t border-line md:mt-40"
        aria-label={`다음 프로젝트: ${next.title}`}
      >
        <Image
          src={next.thumbnail}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-[2px] transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-40 group-hover:blur-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="container-x relative flex min-h-[40vh] flex-col justify-center py-20">
          <p className="eyebrow mb-4">Next project</p>
          <p className="flex items-center gap-4 text-[clamp(2rem,6vw,5rem)] font-bold leading-tight tracking-[-0.03em]">
            {next.title}
            <ArrowUpRight className="size-[0.8em] shrink-0 text-lime transition-transform duration-500 group-hover:rotate-45" aria-hidden />
          </p>
          <p className="mt-3 text-muted">{next.subtitle}</p>
        </div>
      </Link>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-12">
      <h2 className="eyebrow lg:col-span-4">{label}</h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

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

        <Block label="01 · 문제">
          <Bullets items={p.problem} />
        </Block>

        <Block label="02 · 해결">
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

        <Block label="03 · 진행 과정">
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
        </Block>

        <Block label="04 · 내가 맡은 일">
          <Bullets items={p.contributions} />
        </Block>

        <Block label="05 · 결과">
          <ul className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-3">
            {p.results.map((r) => (
              <li key={r.label} className="bg-ink p-6 md:p-8">
                <p className="display text-[clamp(2.2rem,4vw,3.4rem)] text-lime">{r.value}</p>
                <p className="mt-2 text-sm text-fg/80">{r.label}</p>
              </li>
            ))}
          </ul>
          {p.resultNote && <p className="mt-4 text-sm text-muted">※ {p.resultNote}</p>}
        </Block>

        <Block label="06 · 기술 스택">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-4 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Block>

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

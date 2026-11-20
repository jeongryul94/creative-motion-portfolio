import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/projects";
import { formatDuration } from "@/lib/video";
import { CATEGORY_LABEL } from "@/lib/types";
import { ProjectMedia } from "@/components/video/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/works/${p.slug}` },
    openGraph: {
      type: "video.other",
      title: p.title,
      description: p.summary,
      images: [{ url: p.thumbnail, width: 1600, height: 900 }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  const meta = [
    { label: "클라이언트", value: project.client },
    { label: "연도", value: project.year?.toString() },
    { label: "기간", value: project.period },
    { label: "분야", value: CATEGORY_LABEL[project.category] },
    { label: "역할", value: project.role },
    { label: "길이", value: formatDuration(project.duration) },
  ].filter((m): m is { label: string; value: string } => !!m.value);

  // 검색엔진용 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.description,
    thumbnailUrl: project.thumbnail,
    contentUrl: project.videoUrl,
    ...(project.duration ? { duration: `PT${Math.floor(project.duration / 60)}M${project.duration % 60}S` } : {}),
  };

  return (
    <article className="pt-28 md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-x">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> 작업 목록
        </Link>

        {/* 1. 제목 및 소개 */}
        <header className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-5 flex flex-wrap items-center gap-3">
                <span>{CATEGORY_LABEL[project.category]}</span>
                {project.year && <span>· {project.year}</span>}
                {project.isSample && <SampleBadge />}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">{project.title}</h1>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="self-end lg:col-span-4">
            <p className="text-lg leading-relaxed text-fg/75">{project.summary}</p>
          </Reveal>
        </header>

        {/* 2. 대표 영상 · 6. 주요 장면 */}
        <div className="mt-12 md:mt-16">
          <ProjectMedia title={project.title} videoUrl={project.videoUrl} poster={project.thumbnail} scenes={project.scenes}>
            {/* 3–4. 크레딧 */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line pb-8 sm:grid-cols-3 lg:grid-cols-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-2 text-sm text-fg/90">{m.value}</dd>
                </div>
              ))}
              {project.tools.length > 0 && (
                <div className="col-span-2 sm:col-span-3 lg:col-span-6">
                  <dt className="eyebrow">사용한 툴</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            {/* 5. 소개 · 기획 의도 */}
            <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
              <h2 className="eyebrow lg:col-span-4">{project.brief ? "기획 의도" : "소개"}</h2>
              <div className="space-y-6 text-lg leading-relaxed text-fg/80 md:text-xl lg:col-span-8">
                <Reveal>
                  <p>{project.description}</p>
                </Reveal>
                {project.brief && (
                  <Reveal>
                    <p>{project.brief}</p>
                  </Reveal>
                )}
              </div>
            </div>

            {/* 6. 제작 과정 / 구성 */}
            {project.process && project.process.length > 0 && (
              <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
                <h2 className="eyebrow lg:col-span-4">영상 구성</h2>
                <ol className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:col-span-8">
                  {project.process.map((step, i) => (
                    <Reveal as="li" key={step.title} delay={i * 0.06} className="bg-ink p-6 md:p-7">
                      <p className="text-lg font-semibold">
                        <span className="mr-2 text-lime">{i + 1}.</span>
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                    </Reveal>
                  ))}
                </ol>
              </div>
            )}
          </ProjectMedia>
        </div>

        {/* 7. 결과 및 성과 (검증된 데이터가 있을 때만) */}
        {project.outcomes.length > 0 && (
          <section aria-labelledby="outcome-title" className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12">
            <h2 id="outcome-title" className="eyebrow lg:col-span-4">
              결과 및 성과
            </h2>
            <ul className="space-y-4 lg:col-span-8">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-4 border-b border-line pb-4 text-lg">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-lime" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* 8. 다음 프로젝트 */}
      <Link
        href={`/works/${next.slug}`}
        className="group relative mt-28 block overflow-hidden border-t border-line md:mt-40"
        aria-label={`다음 작업: ${next.title}`}
      >
        <Image
          src={next.thumbnail}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-[2px] transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-40 group-hover:blur-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="container-x relative flex min-h-[46vh] flex-col justify-center py-20">
          <p className="eyebrow mb-4">다음 작업</p>
          <p className="flex items-center gap-4 text-[clamp(2rem,6vw,5rem)] font-bold leading-tight tracking-[-0.03em]">
            {next.title}
            <ArrowUpRight
              className="size-[0.8em] shrink-0 text-lime transition-transform duration-500 group-hover:rotate-45"
              aria-hidden
            />
          </p>
          <p className="mt-3 text-muted">{next.summary}</p>
        </div>
      </Link>
    </article>
  );
}

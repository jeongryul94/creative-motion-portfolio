import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { brandIcon } from "@/components/ui/BrandIcons";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { SampleBadge } from "@/components/ui/SampleBadge";

export function Contact() {
  const { email, emailIsSample, links } = site.contact;
  const activeLinks = links.filter((l) => l.href);

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <p className="eyebrow mb-4">(05) — Contact</p>
        <h2 id="contact-title" className="display text-[clamp(3.2rem,11vw,11rem)]">
          <RevealWords text="Have a project" />
          <br />
          <span className="text-lime">
            <RevealWords text="in mind?" />
          </span>
        </h2>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-fg/75">
              기업 홍보영상, 광고, 유튜브·교육 콘텐츠, 모션그래픽, 3D·AI 영상 제작을 함께합니다. 아이디어 단계라도 편하게 연락 주세요.
            </p>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">Email</p>
                {emailIsSample && <SampleBadge />}
              </div>
              <a
                href={`mailto:${email}`}
                className="group mt-3 inline-flex items-center gap-2 break-all text-2xl font-semibold tracking-tight transition-colors hover:text-lime md:text-3xl"
              >
                {email}
                <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:rotate-45" aria-hidden />
              </a>
              <div className="mt-5">
                <CopyEmailButton email={email} />
              </div>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-3">Channels</p>
              {activeLinks.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {activeLinks.map((l) => {
                    const Icon = brandIcon[l.label as keyof typeof brandIcon];
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-lime hover:text-lime"
                        >
                          {Icon && <Icon className="size-4" />}
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted">GitHub · YouTube · Instagram 링크는 환경변수로 추가하면 표시됩니다.</p>
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ContactForm email={email} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

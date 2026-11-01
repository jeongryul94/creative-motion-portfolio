import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-4">404 — Scene not found</p>
      <h1 className="display text-[clamp(4rem,14vw,12rem)]">Cut.</h1>
      <p className="mt-4 text-muted">찾으시는 페이지가 없습니다.</p>
      <Link href="/" className="mt-8 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink">
        홈으로
      </Link>
    </section>
  );
}

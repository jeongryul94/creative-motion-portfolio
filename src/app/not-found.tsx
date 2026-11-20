import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display text-[clamp(2.6rem,7vw,5rem)]">페이지를 찾을 수 없어요.</h1>
      <p className="mt-4 text-muted">주소가 바뀌었거나 지워진 페이지입니다.</p>
      <Link href="/" className="mt-8 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-ink">
        홈으로
      </Link>
    </section>
  );
}

/** 샘플(교체 필요) 콘텐츠를 실제 정보와 구분하기 위한 배지 */
export function SampleBadge({ label = "SAMPLE · 교체 필요" }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-lime/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-lime"
      title="실제 정보가 아닌 샘플입니다. src/data 파일에서 교체하세요."
    >
      <span className="size-1.5 rounded-full bg-lime" aria-hidden />
      {label}
    </span>
  );
}

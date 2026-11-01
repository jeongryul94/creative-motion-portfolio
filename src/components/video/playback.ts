/**
 * 동시 재생 제한: 미리보기 영상은 한 번에 하나만 재생합니다.
 * 새 영상이 재생을 요청하면 이전 영상은 일시정지됩니다.
 */
let current: HTMLVideoElement | null = null;

export function playExclusive(video: HTMLVideoElement) {
  if (current && current !== video) current.pause();
  current = video;
  const p = video.play();
  if (p) p.catch(() => {}); // 자동재생 차단 시 조용히 무시 (포스터가 남음)
}

export function release(video: HTMLVideoElement) {
  video.pause();
  if (current === video) current = null;
}

/** 마우스처럼 정밀한 hover가 가능한 기기인지 */
export function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 데이터 절약 모드 또는 느린 네트워크 */
export function prefersSaveData() {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
}

export const CATEGORIES = ["Commercial", "YouTube", "Education", "Motion", "AI & 3D"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Scene = {
  /** 영상 내 위치(초). MP4 영상이면 클릭 시 해당 지점으로 이동합니다. */
  time: number;
  image: string;
  caption: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

/**
 * 프로젝트 1건의 데이터.
 * 선택 필드(?)는 비워두면 화면에서 자동으로 숨겨집니다.
 * 이 형태 그대로 Supabase 테이블 컬럼으로 옮길 수 있게 평평하게 유지합니다.
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  /** 카드·상세 상단의 한 줄 소개 */
  summary: string;
  category: Category;
  year?: number;
  client?: string;
  role?: string;
  /** 상세 페이지 본문 소개 */
  description: string;
  /** 포스터/썸네일 이미지 (public 기준 경로 또는 원격 URL) */
  thumbnail: string;
  /** YouTube, Vimeo 링크 또는 MP4 경로 */
  videoUrl: string;
  /** Hover 미리보기용 짧은 무음 MP4 (선택) */
  previewUrl?: string;
  featured: boolean;
  tools: string[];
  /** 검증된 성과만 입력하세요. 비어 있으면 성과 섹션이 표시되지 않습니다. */
  outcomes: string[];
  /** 러닝타임(초) */
  duration?: number;
  /** 제작 기간 (예: "2025.03 – 2025.04") */
  period?: string;
  /** 기획 의도 및 해결 과제 */
  brief?: string;
  /** 제작 과정 / 영상 구성 */
  process?: ProcessStep[];
  scenes?: Scene[];
  /** true면 샘플 데이터로 표시됩니다. 실제 작업과 구분하기 위한 표시입니다. */
  isSample?: boolean;
};

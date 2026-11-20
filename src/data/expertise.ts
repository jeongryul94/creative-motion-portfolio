export type ExpertiseItem = {
  key: "production" | "editing" | "motion" | "3d" | "ai" | "automation";
  title: string;
  description: string;
  tags: string[];
};

export const expertise: ExpertiseItem[] = [
  {
    key: "production",
    title: "영상 기획 · 촬영",
    description: "기획안과 콘티부터 촬영 현장 운영까지, 메시지가 장면이 되는 과정을 설계합니다.",
    tags: ["기획", "콘티", "촬영"],
  },
  {
    key: "editing",
    title: "편집 · 색보정",
    description: "리듬감 있는 컷 편집과 일관된 톤의 색보정으로 브랜드의 무드를 완성합니다.",
    tags: ["편집", "컬러", "사운드"],
  },
  {
    key: "motion",
    title: "모션그래픽",
    description: "키네틱 타이포그래피, UI 모션, 인포그래픽으로 복잡한 정보를 쉽게 전달합니다.",
    tags: ["타이포", "UI 모션", "인포그래픽"],
  },
  {
    key: "3d",
    title: "3D",
    description: "제품과 공간을 3D로 시각화해 촬영으로 담기 어려운 장면을 만듭니다.",
    tags: ["제품", "공간", "렌더링"],
  },
  {
    key: "ai",
    title: "AI로 만드는 콘텐츠",
    description: "생성형 AI와 Claude 같은 도구로 3D 장면, 게임, 인터랙티브 페이지까지 직접 만들어 보고 있습니다.",
    tags: ["생성형 영상", "AI 협업 개발", "인터랙티브"],
  },
  {
    key: "automation",
    title: "반복 작업 자동화",
    description: "n8n과 코드로 반복되는 작업 흐름을 자동화합니다. 팀 프로젝트에서 워크플로 9개짜리 서비스를 만들었습니다.",
    tags: ["워크플로우", "템플릿", "배치 처리"],
  },
];

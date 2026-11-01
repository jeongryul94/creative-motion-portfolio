export type ExpertiseItem = {
  key: "production" | "editing" | "motion" | "3d" | "ai" | "automation";
  title: string;
  description: string;
  tags: string[];
};

export const expertise: ExpertiseItem[] = [
  {
    key: "production",
    title: "Video Production",
    description: "기획안과 콘티부터 촬영 현장 운영까지, 메시지가 장면이 되는 과정을 설계합니다.",
    tags: ["기획", "콘티", "촬영"],
  },
  {
    key: "editing",
    title: "Editing & Color Grading",
    description: "리듬감 있는 컷 편집과 일관된 톤의 색보정으로 브랜드의 무드를 완성합니다.",
    tags: ["편집", "컬러", "사운드"],
  },
  {
    key: "motion",
    title: "Motion Graphics",
    description: "키네틱 타이포그래피, UI 모션, 인포그래픽으로 복잡한 정보를 쉽게 전달합니다.",
    tags: ["타이포", "UI 모션", "인포그래픽"],
  },
  {
    key: "3d",
    title: "3D Visualization",
    description: "제품과 공간을 3D로 시각화해 촬영으로 담기 어려운 장면을 만듭니다.",
    tags: ["제품", "공간", "렌더링"],
  },
  {
    key: "ai",
    title: "AI-Powered Content",
    description: "생성형 이미지·영상·음성 도구를 제작 파이프라인에 결합해 표현의 폭을 넓힙니다.",
    tags: ["생성형 영상", "보이스", "업스케일"],
  },
  {
    key: "automation",
    title: "Creative Automation",
    description: "반복되는 자막, 리사이즈, 버전 관리 작업을 자동화해 제작 시간을 줄입니다.",
    tags: ["워크플로우", "템플릿", "배치 처리"],
  },
];

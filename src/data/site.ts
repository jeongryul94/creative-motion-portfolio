/**
 * 사이트 전역 설정 · About 콘텐츠
 *
 * 연락처는 환경변수(.env.local / Vercel 환경변수)로 관리합니다.
 * `sample: true`인 항목은 화면에 "SAMPLE" 배지가 붙습니다.
 * 실제 정보로 교체한 뒤 sample 값을 false로 바꾸거나 지워 주세요.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "Creative Motion Portfolio",
  shortName: "CMP",
  description:
    "기업 홍보영상, 광고, 모션그래픽, 3D·AI 콘텐츠까지. 영상으로 이야기를 설계하고 기술로 가능성을 확장하는 영상 제작자 포트폴리오.",
  hero: {
    title: ["VISUAL STORIES.", "REAL IMPACT."],
    subtitle: "영상으로 이야기를 설계하고, 기술로 가능성을 확장합니다.",
    video: "/media/videos/showreel.mp4",
    videoMobile: "/media/videos/showreel-720.mp4",
    poster: "/media/posters/showreel.jpg",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jeongryul94@gmail.com",
    emailIsSample: false,
    links: [
      { label: "GitHub", href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "" },
      { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "" },
      { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
    ],
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Contact", href: "/#contact" },
] as const;

export const about = {
  /** TODO: 실제 이름으로 교체 */
  name: { value: "Your Name", sample: true },
  headline: "기획부터 촬영, 편집, 모션, AI까지\n이야기가 끝까지 전달되도록 설계합니다.",
  intro: [
    "기업 홍보영상과 광고, 유튜브·교육 콘텐츠, 모션그래픽을 만듭니다. 한 편의 영상이 보는 사람에게 무엇을 남겨야 하는지에서 출발해 구성, 촬영, 편집, 후반 작업까지 하나의 흐름으로 다룹니다.",
    "최근에는 3D와 생성형 AI 도구를 제작 과정에 결합해, 촬영만으로는 어렵던 장면을 만들고 반복 작업을 자동화하는 방법을 실험하고 있습니다.",
  ],
  philosophy: [
    { title: "메시지가 먼저", body: "화려한 효과보다 한 문장으로 요약되는 메시지를 먼저 정합니다." },
    { title: "근거 있는 장면", body: "모든 컷은 이야기를 한 걸음 앞으로 옮기는 이유가 있어야 합니다." },
    { title: "기술은 도구", body: "AI와 3D는 표현의 폭을 넓히고 제작 시간을 줄이는 데 씁니다." },
  ],
  /** 확인되지 않은 수치·성과는 넣지 마세요. */
  career: {
    sample: false,
    items: [
      { period: "2024 — 현재", title: "데이터분석 영상제작", body: "데이터 분석 기반 영상 제작" },
      { period: "2022 — 2023", title: "YATA 외 구독자 20만 채널", body: "유튜브 영상편집자" },
      { period: "2019 — 2021", title: "(주)머니업", body: "기업영상 제작 (3년)" },
    ],
  },
  /** TODO: 실제 사용하는 툴로 교체 */
  software: {
    sample: true,
    items: [
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Cinema 4D",
      "Blender",
      "Photoshop",
      "Runway",
      "Midjourney",
    ],
  },
  edge: {
    title: "영상 제작 × AI 기술",
    body: "기획과 편집의 감각 위에 생성형 AI, 3D, 업무 자동화를 더해 같은 예산과 일정 안에서 더 많은 시안과 더 높은 완성도를 만드는 것을 목표로 합니다.",
  },
};

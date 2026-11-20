/**
 * 사이트 전역 설정 · About 콘텐츠
 *
 * 연락처는 환경변수(.env.local / Vercel 환경변수)로 관리합니다.
 * `sample: true`인 항목은 화면에 "SAMPLE" 배지가 붙습니다.
 * 실제 정보로 교체한 뒤 sample 값을 false로 바꾸거나 지워 주세요.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "정률 포트폴리오",
  shortName: "정률",
  description:
    "기업 영상과 유튜브 편집을 해 온 정률의 포트폴리오. 영상 작업과 데이터 분석, AI 자동화 프로젝트를 모았습니다.",
  hero: {
    title: ["Video, motion", "& a bit of code."],
    subtitle:
      "기업 홍보영상 3년, 유튜브 편집 2년을 했어요. 요즘은 데이터 분석이랑 AI 자동화를 배워서 영상 작업에 하나씩 붙여 보는 중입니다.",
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
  { label: "작업", href: "/#work" },
  { label: "프로젝트", href: "/#projects" },
  { label: "소개", href: "/#about" },
  { label: "할 수 있는 일", href: "/#expertise" },
  { label: "연락", href: "/#contact" },
] as const;

export const about = {
  name: { value: "정률", sample: false },
  headline: "영상 편집으로 5년,\n지금은 거기에 데이터랑 자동화를 얹는 중이에요.",
  /** 사실만 적은 초안입니다. 본인 말투로 다듬어 주세요. */
  intro: [
    "(주)머니업에서 3년 동안 기업 홍보영상을 만들었고, 그다음 2년은 구독자 20만 명 정도 되는 유튜브 채널에서 편집을 맡았어요.",
    "지금은 스마트인재개발원에서 데이터 분석과 AI 자동화를 배우고 있어요. 팀 프로젝트로 데이터 분석이랑 n8n 자동화 서비스를 만들었고, 그때 찾은 문제를 창업 아이템으로 키워서 모두의 창업 2기 1라운드에 붙었습니다.",
  ],
  philosophy: [
    { title: "한 문장부터 정해요", body: "이 영상이 뭘 남겨야 하는지 한 문장으로 정리되면 그때 편집을 시작합니다." },
    { title: "애매한 컷은 뺍니다", body: "이야기를 앞으로 밀어주지 않는 컷은 아깝더라도 빼는 편이에요." },
    { title: "도구는 시간 벌려고 써요", body: "AI나 자동화는 반복 작업을 줄이고, 그 시간에 시안 하나 더 만들려고 씁니다." },
  ],
  /** 확인되지 않은 수치·성과는 넣지 마세요. */
  career: {
    sample: false,
    items: [
      { period: "2024 ~ 현재", title: "데이터 분석 영상 제작", body: "데이터 분석 기반 영상 제작" },
      { period: "2022 ~ 2023", title: "유튜브 편집자", body: "YATA 외 구독자 20만 명 규모 채널" },
      { period: "2019 ~ 2021", title: "(주)머니업", body: "기업 홍보영상 제작" },
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
    title: "요즘 하고 있는 일",
    body: "세방전지랑 연계한 팀 프로젝트에서 n8n과 Supabase로 손글씨 재고 실사표를 검증하는 서비스를 만들었어요. 저는 DB 설계와 수량 검사 규칙을 맡았습니다.",
  },
};

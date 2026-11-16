import type { Project } from "@/lib/types";

/**
 * ───────────────────────────────────────────────────────────────
 *  작품 데이터
 *  새 작품은 배열에 객체 하나만 추가하면 목록·필터·상세 페이지·sitemap에
 *  자동으로 반영됩니다. (UI 코드 수정 불필요)
 *
 *  ⚠️ 아래 5개 작품의 영상은 실제 업로드된 파일이지만,
 *     연도·클라이언트·담당 역할·사용 툴·성과는 아직 제공되지 않아 비워 두었습니다.
 *     TODO 표시된 필드를 실제 정보로 채워 주세요. 비어 있는 필드는 화면에 표시되지 않습니다.
 * ───────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: "p01",
    slug: "solaseado-city-of-sun",
    title: "태양이 만드는 도시, 솔라시도",
    summary: "친환경 에너지 도시 솔라시도의 비전을 담은 브랜드 필름",
    category: "Commercial",
    featured: true,
    // year: TODO,
    // client: "TODO",
    // role: "TODO — 예: 기획 · 편집 · 모션그래픽",
    description:
      "태양의 이미지로 문을 열어 사업의 연혁, 국내 최대 규모의 태양광 발전단지, 태양의 정원 디자인, 탄소제로·RE100 비전, 스마트시티와 자율주행 교통까지. 햇빛도시 솔라시도가 그리는 미래를 내레이션과 시네마틱한 항공 영상으로 엮은 약 5분 분량의 브랜드 필름입니다.",
    thumbnail: "/media/posters/solaseado-city-of-sun.jpg",
    videoUrl: "/media/videos/solaseado-city-of-sun.mp4",
    previewUrl: "/media/previews/solaseado-city-of-sun.mp4",
    duration: 307,
    tools: [], // TODO
    outcomes: [], // TODO: 검증된 성과만
    process: [
      { title: "태양에서 출발", body: "태양, 꽃, 해바라기 들판으로 '햇빛도시'라는 정체성을 감각적으로 먼저 세웁니다." },
      { title: "연혁과 근거", body: "사업 연혁과 태양광 발전설비 규모 등 도시의 근거를 아카이브 화면과 타이포로 제시합니다." },
      { title: "에너지와 기술", body: "태양광 단지 항공 숏, 자율주행·5G·스마트시티 그래픽으로 미래 기술을 보여줍니다." },
      { title: "사람이 사는 도시", body: "정원과 주거, 가족의 일상을 거쳐 '미래도시의 표준' 메시지와 로고로 마무리합니다." },
    ],
    scenes: [
      { time: 4.2, image: "/media/scenes/solaseado-city-of-sun-1.jpg", caption: "태양으로 여는 오프닝 · 내레이션 크레딧" },
      { time: 46.8, image: "/media/scenes/solaseado-city-of-sun-2.jpg", caption: "“우리가 그리는 미래입니다”" },
      { time: 106.2, image: "/media/scenes/solaseado-city-of-sun-3.jpg", caption: "국내 최대 규모 태양광 발전설비 항공 숏" },
      { time: 208.2, image: "/media/scenes/solaseado-city-of-sun-4.jpg", caption: "친환경 공유교통·자율주행 그래픽" },
    ],
  },
  {
    id: "p02",
    slug: "why-solaseado",
    title: "우리는 왜 솔라시도에 주목해야 할까",
    summary: "ESG·RE100 시대, 솔라시도에 주목해야 할 이유를 담은 기업 홍보영상",
    category: "Commercial",
    featured: false,
    description:
      "RE100과 ESG 관련 뉴스 헤드라인으로 시대적 배경을 제시하고, 토지 이용 계획도와 라이프스타일 컨셉 다이어그램, 스마트시티·투자협약 소식, 골프 앤 빌리지와 RE100 산업단지 계획을 차례로 보여주며 솔라시도에 주목해야 하는 이유를 풀어낸 약 4분 분량의 설명형 홍보영상입니다.",
    thumbnail: "/media/posters/why-solaseado.jpg",
    videoUrl: "/media/videos/why-solaseado.mp4",
    previewUrl: "/media/previews/why-solaseado.mp4",
    duration: 234,
    tools: [],
    outcomes: [],
    process: [
      { title: "문제 제기", body: "ESG·RE100 뉴스 헤드라인 몽타주로 기업들이 처한 환경을 제시합니다." },
      { title: "해답으로서의 입지", body: "토지 이용 계획도와 컨셉 다이어그램 인포그래픽으로 솔라시도를 해답으로 연결합니다." },
      { title: "근거 쌓기", body: "스마트시티 선정, 투자협약, 탄소중립 에듀센터, 골프 앤 빌리지 등 사례를 카드형 레이아웃으로 이어갑니다." },
      { title: "결론", body: "자연·친환경 에너지·미래 기술이 함께하는 도시라는 메시지로 마무리합니다." },
    ],
    scenes: [
      { time: 42.9, image: "/media/scenes/why-solaseado-1.jpg", caption: "ESG·RE100 뉴스 헤드라인 몽타주" },
      { time: 81.9, image: "/media/scenes/why-solaseado-2.jpg", caption: "토지 이용 계획도 인포그래픽" },
      { time: 128.7, image: "/media/scenes/why-solaseado-3.jpg", caption: "지역거점 스마트시티 선정 소개" },
      { time: 167.7, image: "/media/scenes/why-solaseado-4.jpg", caption: "솔라시도 골프 앤 빌리지" },
    ],
  },
  {
    id: "p03",
    slug: "judang-bichaek-tvc",
    title: "주당비책 TV 광고",
    summary: "흩어진 글자가 제품명으로 완성되는 숙취해소제 30초 TV 광고",
    category: "Commercial",
    featured: false,
    description:
      "사무실에서 오가는 대화 속에 제품명을 한 글자씩 흩어 놓는 키네틱 타이포그래피로 호기심을 만들고, 제품 패키지 숏과 회식 장면으로 사용 상황을 자연스럽게 연결한 30초 실사 광고입니다.",
    thumbnail: "/media/posters/judang-bichaek-tvc.jpg",
    videoUrl: "/media/videos/judang-bichaek-tvc.mp4",
    previewUrl: "/media/previews/judang-bichaek-tvc.mp4",
    duration: 30,
    tools: [],
    outcomes: [],
    process: [
      { title: "상황극 도입", body: "사무실 대화 장면 위로 글자가 하나씩 떠오르는 타이포그래피로 궁금증을 만듭니다." },
      { title: "제품 공개", body: "글자가 모여 제품명이 완성되고, 깔끔한 패키지 숏으로 전환합니다." },
      { title: "사용 상황", body: "회식 장면으로 '음주 전후 숙취관리'라는 사용 맥락을 보여줍니다." },
    ],
    scenes: [
      { time: 4.2, image: "/media/scenes/judang-bichaek-tvc-1.jpg", caption: "대사 사이로 떠오르는 글자" },
      { time: 14.2, image: "/media/scenes/judang-bichaek-tvc-2.jpg", caption: "제품명이 완성되는 순간" },
      { time: 19.2, image: "/media/scenes/judang-bichaek-tvc-3.jpg", caption: "패키지 제품 숏" },
      { time: 24.2, image: "/media/scenes/judang-bichaek-tvc-4.jpg", caption: "회식 장면으로 사용 맥락 연결" },
    ],
  },
  {
    id: "p04",
    slug: "perfect-fit-app-ad",
    title: "PERFECT FIT 앱 광고",
    summary: "AI 맞춤형 속옷 추천 앱의 기능을 16초에 담은 모션그래픽 광고",
    category: "Motion",
    featured: false,
    description:
      "스마트폰 목업 위에서 앱 화면이 전환되는 UI 모션으로 '10초 핏파인더', 타입별 추천, 홈웨어·레깅스·월경용품까지 확장된 추천 기능을 빠른 호흡으로 소개하고, 앱 아이콘과 다운로드 CTA로 마무리한 16초 앱 프로모션 영상입니다.",
    thumbnail: "/media/posters/perfect-fit-app-ad.jpg",
    videoUrl: "/media/videos/perfect-fit-app-ad.mp4",
    previewUrl: "/media/previews/perfect-fit-app-ad.mp4",
    duration: 16,
    tools: [],
    outcomes: [],
    process: [
      { title: "앱 소개", body: "'나만의 AI 맞춤형 속옷추천 앱' 카피와 목업으로 정체성을 바로 전달합니다." },
      { title: "핵심 기능 시연", body: "목업 속 화면 전환으로 핏파인더와 추천 흐름을 보여줍니다." },
      { title: "CTA", body: "앱 아이콘, 스토어 배지, 쿠폰 혜택으로 다운로드를 유도합니다." },
    ],
    scenes: [
      { time: 0.7, image: "/media/scenes/perfect-fit-app-ad-1.jpg", caption: "앱 소개 오프닝" },
      { time: 3.3, image: "/media/scenes/perfect-fit-app-ad-2.jpg", caption: "10초 핏파인더 기능 소개" },
      { time: 10.0, image: "/media/scenes/perfect-fit-app-ad-3.jpg", caption: "추천 카테고리 확장" },
      { time: 14.0, image: "/media/scenes/perfect-fit-app-ad-4.jpg", caption: "다운로드 CTA 엔딩" },
    ],
  },
  {
    id: "p05",
    slug: "presidential-speech-contest",
    title: "대통령 영어 스피치대회 홍보영상",
    summary: "강렬한 타이포그래피로 참가를 독려하는 대회 홍보 모션그래픽",
    category: "Motion",
    year: 2021, // 영상 속 대회일시(2021.06.19) 기준. 실제 제작 연도와 다르면 수정하세요.
    featured: false,
    description:
      "'2021 대통령 연설문'을 주제로 한 영어 스피치대회 홍보영상입니다. 블랙·레드 대비와 글리치 효과를 쓴 키네틱 타이포그래피로 '감동을 준 리더십'이라는 메시지를 전달하고, 심사·참가자격·발표장소·대회일시 같은 실용 정보까지 30초 안에 정리했습니다.",
    thumbnail: "/media/posters/presidential-speech-contest.jpg",
    videoUrl: "/media/videos/presidential-speech-contest.mp4",
    previewUrl: "/media/previews/presidential-speech-contest.mp4",
    duration: 30,
    tools: [],
    outcomes: [],
    process: [
      { title: "메시지", body: "연설과 리더십 키워드를 큰 타이포와 글리치 효과로 강조합니다." },
      { title: "정보 전달", body: "심사, 참가자격, 발표장소, 대회일시를 한 화면 한 정보 원칙으로 정리합니다." },
      { title: "참여 유도", body: "'당신의 재능을 보여주세요' 카피와 반복되는 원형 그래픽으로 행동을 유도합니다." },
    ],
    scenes: [
      { time: 2.5, image: "/media/scenes/presidential-speech-contest-1.jpg", caption: "2021 대통령 연설문 타이틀" },
      { time: 9.2, image: "/media/scenes/presidential-speech-contest-2.jpg", caption: "글리치 키네틱 타이포그래피" },
      { time: 17.5, image: "/media/scenes/presidential-speech-contest-3.jpg", caption: "네온 라인 그래픽" },
      { time: 24.2, image: "/media/scenes/presidential-speech-contest-4.jpg", caption: "참여를 독려하는 원형 그래픽" },
    ],
  },
  {
    id: "p10",
    slug: "greyhaven-battle-royale",
    title: "GREYHAVEN — 최후의 생존",
    summary: "Claude와 함께 블렌더 섬 맵부터 멀티플레이 웹 게임까지 만든 3인칭 배틀로얄",
    category: "AI & 3D",
    year: 2026,
    period: "2026.11",
    role: "기획 · 디렉팅 · AI 협업 개발",
    description:
      "버려진 섬에 투입된 20명이 보급 상자를 찾아 무장하고, 좁혀오는 자기장 안에서 최후의 1인을 가리는 3인칭 서바이벌 웹 게임입니다. 블렌더로 약 1.6km 규모의 섬(폐도시·항구·언덕 마을·발전소·무선탑)을 구성하고, 이를 Three.js로 옮겨 브라우저에서 바로 플레이할 수 있게 만들었습니다. 낙하산 강하, 무기·인벤토리, AI 봇, 슬라이딩·점프 이동, 채팅과 관전 모드를 갖추었고, 외부 패키지 없이 Node.js 서버 하나로 친구들과 멀티플레이할 수 있습니다.",
    brief:
      "코드를 직접 짜는 대신 Claude Code에게 기획 의도와 피드백을 전달하며 함께 만든 프로젝트입니다. 블렌더 MCP로 맵을 자동 생성·보정하고, 친구들과 실제로 플레이하며 나온 '불편하다'는 의견을 반영해 인벤토리·드롭 시스템과 카툰풍 비주얼로 개선했습니다. 영상은 실제 게임 화면 녹화와 블렌더 렌더로 구성했습니다.",
    thumbnail: "/media/posters/greyhaven-battle-royale.jpg",
    videoUrl: "/media/videos/greyhaven-battle-royale.mp4",
    previewUrl: "/media/previews/greyhaven-battle-royale.mp4",
    duration: 30,
    featured: false,
    tools: ["Claude Code", "Blender", "Blender MCP", "Three.js", "Node.js", "WebSocket"],
    outcomes: [],
    process: [
      { title: "섬 맵 생성", body: "블렌더에서 지형·도로·건물 배치를 스크립트로 생성하고, CC0 에셋(Kenney 등)을 조합해 지역별 분위기를 만들었습니다." },
      { title: "웹으로 이식", body: "지형·건물·충돌 데이터를 내보내 Three.js 3인칭 게임으로 옮기고, 캐릭터 애니메이션과 카메라를 붙였습니다." },
      { title: "게임 시스템", body: "낙하산 강하, 무기 12종, 인벤토리, 자기장, AI 봇, 멀티플레이 로비와 관전 모드를 구현했습니다." },
      { title: "플레이 테스트", body: "친구들과 직접 플레이하며 받은 피드백으로 조작감과 UI, 카툰풍 비주얼을 반복 개선했습니다." },
    ],
    scenes: [
      { time: 1.5, image: "/media/scenes/greyhaven-battle-royale-1.jpg", caption: "낙하산으로 섬에 강하" },
      { time: 7.0, image: "/media/scenes/greyhaven-battle-royale-2.jpg", caption: "착지 후 3인칭 이동" },
      { time: 15.6, image: "/media/scenes/greyhaven-battle-royale-3.jpg", caption: "언덕 마을 상공" },
      { time: 20.6, image: "/media/scenes/greyhaven-battle-royale-4.jpg", caption: "블렌더로 만든 섬 전경 렌더" },
    ],
  },
  {
    id: "p11",
    slug: "threshold-portal-walk",
    title: "THRESHOLD — 포털로 가는 길",
    summary: "Claude와 블렌더로 만든 3인칭 탐험 시네마틱 애니메이션",
    category: "AI & 3D",
    year: 2026,
    period: "2026.11",
    role: "기획 · 디렉팅 · AI 협업 3D 제작",
    description:
      "어두운 기둥 숲 사이로 놓인 다리를 따라 한 탐험가가 빛나는 원형 포털 앞까지 걸어가는 24초 분량의 3인칭 시네마틱입니다. 인물의 어깨 너머를 따라가는 카메라, 관절형 걷기 동작, 주변을 둘러보는 연기, 포털 안을 떠다니는 불티까지 모든 오브젝트와 재질을 블렌더 안에서 절차적으로 제작했습니다.",
    brief:
      "Claude Code가 블렌더 MCP로 장면 생성·애니메이션·렌더 스크립트를 작성하고, 저는 연출 방향과 구도를 지시하며 결과를 다듬었습니다. 외부 모델을 가져오지 않고 장면 전체를 코드로 만들어, 언제든 다시 생성하고 수정할 수 있습니다.",
    thumbnail: "/media/posters/threshold-portal-walk.jpg",
    videoUrl: "/media/videos/threshold-portal-walk.mp4",
    previewUrl: "/media/previews/threshold-portal-walk.mp4",
    duration: 24,
    featured: false,
    tools: ["Claude Code", "Blender", "Blender MCP", "Cycles", "FFmpeg"],
    outcomes: [],
    process: [
      { title: "출발", body: "다리 바깥쪽 끝에서 탐험가가 잠시 멈춰 서며 장면을 엽니다." },
      { title: "다리 걷기", body: "어깨 너머 카메라가 걷는 리듬을 따라가며 공간의 깊이를 보여줍니다." },
      { title: "둘러보기", body: "중간에서 주변을 둘러보는 동작으로 기둥 숲의 스케일을 전달합니다." },
      { title: "포털 도착", body: "빛나는 포털 앞에 다가서며 불티가 흩날리는 장면으로 마무리합니다." },
    ],
    scenes: [
      { time: 1, image: "/media/scenes/threshold-portal-walk-1.jpg", caption: "다리 끝에서 출발" },
      { time: 9, image: "/media/scenes/threshold-portal-walk-2.jpg", caption: "어깨 너머 3인칭 카메라" },
      { time: 15, image: "/media/scenes/threshold-portal-walk-3.jpg", caption: "포털로 다가가는 길" },
      { time: 22, image: "/media/scenes/threshold-portal-walk-4.jpg", caption: "빛나는 포털 앞 도착" },
    ],
  },
  {
    id: "p06",
    slug: "yata-ev6-owner-interview",
    title: "EV6 오너 인터뷰",
    summary: "EV6를 1년간 운행한 차주의 솔직한 후기를 담은 유튜브 인터뷰 콘텐츠",
    category: "YouTube",
    featured: false,
    // year: TODO,
    client: "YATA", // 유튜브 채널명. 클라이언트가 다르면 수정하세요.
    // role: "TODO — 예: 촬영 · 편집 · 자막",
    description:
      "자동차 유튜브 채널 YATA에 업로드된 차주 인터뷰 영상입니다. EV6를 1년간 운행한 게스트가 실제로 타면서 느낀 장단점과 전기차 구매에 대한 솔직한 생각을 이야기합니다.", // TODO: 작업 내용에 맞게 다듬어 주세요.
    thumbnail: "https://i.ytimg.com/vi/Lvc99mGFZfQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Lvc99mGFZfQ",
    tools: [],
    outcomes: [],
  },
  {
    id: "p07",
    slug: "kmooc-communication-for-teens",
    title: "발달지연 청소년의 참 세상살이를 위한 의사소통4",
    summary: "대구대학교 K-MOOC 강좌 소개 영상 (김화수 교수)",
    category: "Education",
    featured: false,
    // year: TODO,
    client: "대구대학교 K-MOOC",
    // role: "TODO",
    description:
      "대구대학교 K-MOOC 온라인 강좌 '발달지연 청소년의 참 세상살이를 위한 의사소통4'(김화수 교수)의 강좌 소개 영상입니다.", // TODO: 작업 내용에 맞게 다듬어 주세요.
    thumbnail: "https://i.ytimg.com/vi/PxKz6uvHkEg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=PxKz6uvHkEg",
    tools: [],
    outcomes: [],
  },
  {
    id: "p08",
    slug: "kmooc-korean-society-and-administration",
    title: "한국사회와 행정",
    summary: "대구대학교 K-MOOC 강좌 소개 영상 (함요상 교수)",
    category: "Education",
    featured: false,
    // year: TODO,
    client: "대구대학교 K-MOOC",
    // role: "TODO",
    description:
      "대구대학교 K-MOOC 온라인 강좌 '한국사회와 행정'(함요상 교수)의 강좌 소개 영상입니다.", // TODO: 작업 내용에 맞게 다듬어 주세요.
    thumbnail: "https://i.ytimg.com/vi/BCqFtXD0l1c/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BCqFtXD0l1c",
    tools: [],
    outcomes: [],
  },
  {
    id: "p09",
    slug: "kmooc-big-data-visualization-r",
    title: "빅데이터 시각화 R",
    summary: "대구대학교 K-MOOC 강좌 소개 영상 (윤상후 교수)",
    category: "Education",
    featured: false,
    // year: TODO,
    client: "대구대학교 K-MOOC",
    // role: "TODO",
    description:
      "대구대학교 K-MOOC 온라인 강좌 '빅데이터 시각화 R'(윤상후 교수)의 강좌 소개 영상입니다.", // TODO: 작업 내용에 맞게 다듬어 주세요.
    thumbnail: "https://i.ytimg.com/vi/9j57g4yXSgA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=9j57g4yXSgA",
    tools: [],
    outcomes: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

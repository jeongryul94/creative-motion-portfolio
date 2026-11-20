import type { Scene } from "@/lib/types";

/**
 * Projects 탭에 들어가는 팀 프로젝트 · 창업 도전.
 * 영상 작품(Selected Works)과 달리 "문제 → 해결 → 내가 한 일 → 결과" 순서로 정리합니다.
 * 모의데이터·가정치로 얻은 수치는 note 에 근거를 함께 적어 둡니다.
 */
export type TeamProject = {
  slug: string;
  /** 목록·상세 상단 라벨 (예: "1차 프로젝트") */
  stage: string;
  title: string;
  subtitle: string;
  summary: string;
  period: string;
  team: string;
  /** 연계 기관 · 대상 */
  partner?: string;
  role: string;
  thumbnail: string;
  video?: { src: string; label: string; scenes?: Scene[] };
  problem: string[];
  solution: string[];
  features: { title: string; body: string }[];
  process: { title: string; body: string }[];
  /** 내가 맡은 일 */
  contributions: string[];
  results: { value: string; label: string }[];
  resultNote?: string;
  stack: string[];
  gallery?: { src: string; caption: string }[];

  /* ── 상세 보강 필드 (비워 두면 해당 섹션이 숨겨집니다) ── */
  /** 시스템 구조도 + 설명 */
  architecture?: { image: string; caption: string; points: string[] };
  /** 핵심 설계 깊이 보기 (표 · 그림 포함 가능) */
  deepDives?: {
    title: string;
    body: string;
    table?: { cols: string[]; rows: string[][] };
    image?: { src: string; caption: string };
  }[];
  /** 자동화 시스템 실행 화면 — 캡처 + 설명 */
  automation?: {
    intro: string;
    steps: { tag: string; title: string; body: string; image?: string; portrait?: boolean }[];
  };
  /** 트러블슈팅 */
  troubleshooting?: { title: string; cause: string; fix: string; result: string }[];
  /** 본인이 직접 한 작업 vs 협업 — 제출 기준에 맞춰 구분 */
  ownership?: { mine: string[]; team: { who: string; what: string }[]; note?: string };
  /** 자동 시험 등 검증 내역 */
  tests?: { step: string; check: string; result: string }[];
  /** 진행 현황 타임라인 */
  milestones?: { date: string; title: string; body: string; done: boolean }[];
  /** 한계와 다음 단계 */
  limits?: { now: string[]; next: { title: string; body: string }[] };
  /** 자료 · 링크 (PDF, 영상, 사이트) */
  resources?: { kind: "pdf" | "video" | "link"; label: string; href: string; note?: string }[];
  /** 보안 · 개인정보 처리 안내 */
  privacyNote?: string;
  /** 발표 · 피치 슬라이드 (16:9) */
  slides?: { src: string; caption: string }[];
};

const m = (slug: string, file: string) => `/media/projects/${slug}/${file}`;

export const teamProjects: TeamProject[] = [
  {
    slug: "smhrd-dropout-guard",
    stage: "1차 프로젝트 · 미니 데이터분석",
    title: "훈련생 중도탈락 조기 감지",
    subtitle: "출결 · 학습 데이터로 이탈 신호를 먼저 잡는 위험 예측 서비스",
    summary:
      "국비 훈련기관의 중도탈락을 결석이 쌓인 뒤가 아니라 이탈 신호가 보일 때 잡아내는 위험 예측 · 관리 서비스를 기획하고 데이터로 가설을 검증했습니다.",
    period: "2026.09.08 – 09.15",
    team: "5직 직진 · 5명",
    partner: "스마트인재개발원",
    role: "사용자 조사(페르소나 설계) · 데이터 수집 · 발표자료",
    thumbnail: m("smhrd-dropout-guard", "poster-v2.jpg"),
    video: {
      src: m("smhrd-dropout-guard", "video-v2.mp4"),
      label: "최종 발표 영상",
      scenes: [
        { time: 34, image: m("smhrd-dropout-guard", "scene-1.jpg"), caption: "훈련 결과가 곧 기관 평가로 이어지는 구조" },
        { time: 58, image: m("smhrd-dropout-guard", "scene-2.jpg"), caption: "직원 설문: 훈련생 이탈 위험 신호" },
        { time: 76.5, image: m("smhrd-dropout-guard", "scene-3.jpg"), caption: "중도포기 직전의 학습 행동 변화" },
        { time: 100.5, image: m("smhrd-dropout-guard", "scene-4.jpg"), caption: "위험군별 인원과 실제 이탈률" },
      ],
    },
    problem: [
      "훈련생의 결석과 과제 미제출이 쌓인 뒤에야 상담이 이뤄지는 사후 대응 구조였습니다.",
      "담당자 한 명이 30명 안팎의 출결부와 과제 현황을 엑셀·LMS에서 직접 확인해야 해 위험 신호를 놓치기 쉬웠습니다.",
      "출석률은 훈련비 지원액과 수료율, 기관 평가로 이어져 중도탈락은 곧 기관의 손실이 됩니다.",
    ],
    solution: [
      "출석률 · 과제제출률 · LMS 로그인 · 상담 경과일을 묶어 0~100점 이탈위험도를 계산합니다.",
      "위험도 60점을 넘는 훈련생은 담당자에게 자동으로 알리고 상담 일정까지 바로 잡게 합니다.",
      "반복되는 출결·서류 문의는 챗봇이 24시간 응대해 담당자가 상담에 집중하도록 합니다.",
    ],
    features: [
      { title: "이탈위험도 스코어링", body: "학습 데이터를 결합해 훈련생별 위험 점수를 산출" },
      { title: "위험군 자동 알림", body: "60점 이상이면 담당자에게 즉시 알림 · 상담 연결" },
      { title: "담당자 대시보드", body: "그린 · 옐로우 · 레드로 위험 현황을 한눈에" },
      { title: "출결 · 서류 챗봇", body: "공결 서류 안내, 훈련장려금 문의 등 반복 질문 자동 응대" },
    ],
    process: [
      { title: "가설 설정", body: "출석률↑ → 중도탈락↓ → 수료율↑ → 기관 예산↑ 선순환 구조를 세우고 법규·통계로 근거 확인" },
      { title: "데이터 수집", body: "직원 업무 불편 설문(19건), 공개 통계, 기관 예산 자료 수집" },
      { title: "분석 · 검증", body: "Python으로 모의 학사 데이터 30,000건을 만들고 가설검정 · 로지스틱 회귀로 검증" },
      { title: "기획 · MVP", body: "페르소나와 유사 서비스 비교로 기능 우선순위를 정하고 웹 프로토타입으로 시연" },
    ],
    contributions: [
      "교육운영 담당자 페르소나 2명(한민서 · 이기영)을 설계해 Pain Point와 Needs를 정리했습니다.",
      "설문 응답과 공개 자료를 모아 문제 정의에 쓸 데이터를 수집했습니다.",
      "최종 발표 PPT를 구성하고 발표 영상을 함께 만들었습니다.",
    ],
    results: [
      { value: "p<0.001", label: "출석률과 중도탈락의 관계 검증" },
      { value: "73.6%", label: "고위험군 이탈률 (정상군 6.7%)" },
      { value: "30,000건", label: "모의 학사 데이터 분석" },
    ],
    resultNote: "수치는 실제 기관 데이터가 아닌 모의 데이터 분석 결과입니다.",
    stack: ["Python", "pandas", "scipy", "statsmodels", "Jupyter", "HTML/JS 프로토타입"],
  },
  {
    slug: "smart-attendance-ai",
    stage: "창업 도전 · 모두의 창업 2기 1라운드 진출",
    title: "국비훈련 출결 · 서류 관리 AI 플랫폼",
    subtitle: "스마트출결AI — 결석해도, 뒤처지지 않게",
    summary:
      "1차 프로젝트에서 찾은 문제를 창업 아이템으로 발전시켜, 국비 훈련기관을 위한 출결 · 서류 · 학습 보강 통합 플랫폼을 사업화 관점으로 설계했습니다.",
    period: "2026.09 – 진행 중",
    team: "창업 아이디어",
    partner: "모두의 창업 2기 · 1라운드 진출, 2라운드 평가 준비 중",
    role: "사업 기획 · AI 사업계획서 프롬프트 설계 · 피치 데모 페이지 · 보강 영상 모션 제작",
    thumbnail: m("smart-attendance-ai", "poster.jpg"),
    video: {
      src: m("smart-attendance-ai", "video.mp4"),
      label: "결석 보강 콘텐츠 모션 샘플",
    },
    problem: [
      "국비 훈련 제도는 정확한 출결 · 서류 데이터를 전제로 설계돼 있지만, 대리출석 같은 부정훈련 사각지대가 남아 있습니다.",
      "한 번의 결석이 진도 누락으로, 다시 다음 결석과 중도포기로 이어지는 악순환이 생깁니다.",
      "담임매니저는 출결 확인, 증빙서류 검토, 반복 문의 응대를 여러 시스템을 오가며 처리합니다.",
    ],
    solution: [
      "챗봇 상담부터 서류 승인, 부정 감지, 결석 보강까지 하나의 흐름으로 묶었습니다.",
      "결석이 확인되면 놓친 강의를 원하는 분량의 영상 · 문서로 요약해 학습 공백을 메웁니다.",
      "보강 영상은 코드로 좌표와 타이밍을 지정해 그려서 몇 번을 다시 만들어도 결과가 같습니다.",
    ],
    features: [
      { title: "24시간 출결 상담 챗봇", body: "공결 신청, 훈련수당 안내, 비콘 오류를 즉시 처리하고 어려운 상담은 매니저에게 연결" },
      { title: "실시간 통합 대시보드", body: "출결 현황 · 서류 검토 · 수료 위험군을 한 화면에서 승인 · 반려" },
      { title: "부정훈련 실시간 감지", body: "얼굴인증 · 비콘 데이터를 교차 검증해 이상 징후 표시" },
      { title: "결석 시 자동 보강 콘텐츠", body: "해당 강의를 요약한 영상 · 문서를 자동 생성" },
    ],
    process: [
      { title: "문제 재정의", body: "1차 프로젝트의 중도탈락 문제를 출결 · 서류 · 부정훈련까지 넓혀 정리" },
      { title: "제품 설계", body: "담임매니저 업무 흐름에 맞춘 4가지 기능과 대시보드 화면 설계" },
      { title: "비즈니스 모델", body: "훈련생 규모별 월 구독형 SaaS (Basic 29 · Pro 59 · Enterprise 150만 원~)" },
      { title: "로드맵", body: "1~2년 차 중소형 기관 PMF 검증 → 3~4년 차 B2G 진입 → 5년 차 표준 솔루션" },
    ],
    contributions: [
      "사업 아이템의 문제 정의와 기능 구성을 정리했습니다.",
      "투자자 · 심사위원용 피치 데모 페이지를 만들었습니다.",
      "HTML · CSS 키프레임으로 보강 영상 샘플을 만들고 Playwright · FFmpeg로 렌더링했습니다.",
    ],
    results: [
      { value: "1R 진출", label: "모두의 창업 2기 · 2라운드 평가 준비 중" },
      { value: "4개", label: "핵심 기능을 하나의 흐름으로 통합" },
      { value: "10 → 100", label: "3년 내 도입 기관 수 목표" },
    ],
    stack: ["HTML/CSS", "JavaScript", "Playwright", "FFmpeg", "AI 챗봇 설계"],
    gallery: [
      { src: m("smart-attendance-ai", "dashboard_home.jpg"), caption: "담임매니저 통합 대시보드" },
      { src: m("smart-attendance-ai", "chatbot_screen.jpg"), caption: "24시간 출결 상담 챗봇" },
      { src: m("smart-attendance-ai", "documents_review.jpg"), caption: "증빙서류 검토 · 승인" },
      { src: m("smart-attendance-ai", "vicious_cycle_diagram.jpg"), caption: "결석 → 중도포기 악순환" },
      { src: m("smart-attendance-ai", "fraud_types_diagram.jpg"), caption: "3대 부정훈련 사각지대" },
      { src: m("smart-attendance-ai", "comparison_table.jpg"), caption: "기존 대체재와 비교" },
      { src: m("smart-attendance-ai", "infographic_incentive.jpg"), caption: "훈련장려금 · 출결 구조" },
    ],
    deepDives: [
      {
        title: "누가 무엇 때문에 힘든가",
        body: "담임매니저 한 명이 출결 확인, 공결 서류 검토, 훈련장려금 문의를 서로 다른 시스템에서 처리합니다. 반복 문의는 챗봇이, 서류 판단은 대시보드가, 부정 의심은 교차 검증이 맡도록 업무를 나눴습니다.",
        table: {
          cols: ["업무", "지금", "스마트출결AI"],
          rows: [
            ["반복 문의", "전화 · 메신저로 같은 질문에 반복 응대", "24시간 챗봇이 1차 응대, 어려운 건만 매니저 연결"],
            ["공결 서류", "메일 · 종이로 받아 눈으로 확인", "대시보드에서 서류와 출결을 나란히 보고 승인 · 반려"],
            ["부정 출결", "대리출석 등 사각지대가 남음", "얼굴인증 · 비콘 기록을 교차 비교해 이상 징후 표시"],
            ["결석 후", "놓친 진도를 훈련생 혼자 따라잡아야 함", "해당 강의를 요약한 보강 영상 · 문서 제공"],
          ],
        },
      },
      {
        title: "돈을 버는 방식",
        body: "훈련기관이 훈련생 규모에 맞춰 월 구독료를 내는 SaaS 모델로 설계했습니다. 금액은 초기 가정치이며 2라운드 활동에서 기관 인터뷰로 검증할 항목입니다.",
        table: {
          cols: ["요금제", "대상", "월 구독료(가정)"],
          rows: [
            ["Basic", "중소형 훈련기관", "29만 원~"],
            ["Pro", "다반 운영 기관", "59만 원~"],
            ["Enterprise", "대형 · 다지점 기관", "150만 원~"],
          ],
        },
      },
    ],
    automation: {
      intro:
        "혼자서 사업계획서와 피치 자료를 빠르게 반복해 다듬기 위해 두 가지 작업 흐름을 직접 만들었습니다. 하나는 AI가 공모 양식에 맞춰 사업계획서를 한 목차씩 써 주는 프롬프트이고, 다른 하나는 코드로 그린 보강 영상을 자동으로 렌더링하는 흐름입니다.",
      steps: [
        {
          tag: "AI 프롬프트",
          title: "사업계획서 자동생성 프롬프트 (v2)",
          body: "AI에게 정부지원사업 심사위원 겸 창업 컨설턴트 역할을 주고, 모두의 창업 2기 양식의 목차별 작성 의도와 가이드를 넣었습니다. 아이디어 메모를 주면 공모 양식에 맞는 초안을 만듭니다.",
          image: m("smart-attendance-ai", "prompt-p1.jpg"),
          portrait: true,
        },
        {
          tag: "AI 프롬프트",
          title: "한 번에 목차 하나, 사람이 확인하고 다음으로",
          body: "한 번에 전부 쓰게 하면 검토가 안 되어서 '목차 1개 생성 → 수정 요청 또는 다음' 흐름을 규칙으로 정했습니다. 100자 항목은 80~100자, 2,000자 항목은 1,500~1,900자로 글자 수를 지키고, 사진 첨부 칸에는 넣을 도표 목록까지 제안하게 했습니다.",
          image: m("smart-attendance-ai", "prompt-p2.jpg"),
          portrait: true,
        },
        {
          tag: "모션 렌더링",
          title: "보강 영상 자동 렌더링",
          body: "보강 콘텐츠 샘플은 HTML · CSS 키프레임으로 좌표와 타이밍을 지정해 그리고, Playwright로 브라우저 화면을 프레임 단위로 녹화한 뒤 FFmpeg로 MP4를 만듭니다. 문구만 바꿔 다시 돌리면 같은 품질의 영상이 나옵니다.",
        },
      ],
    },
    milestones: [
      { date: "2026.09", title: "1차 프로젝트에서 문제 발견", body: "중도탈락 분석 중 출결 · 서류 업무의 비효율을 확인", done: true },
      { date: "2026.09", title: "모두의 창업 2기 지원", body: "AI 프롬프트로 사업계획서 초안을 만들고 다듬어 제출", done: true },
      { date: "2026.10", title: "1라운드 진출", body: "1라운드 진출자 지원 프로그램 시작", done: true },
      { date: "~ 2026.12.01", title: "1R 활동보고서 · 사업계획서 제출", body: "활동 결과를 반영한 사업계획서로 2라운드 평가 준비", done: false },
    ],
    ownership: {
      mine: [
        "창업 아이템의 문제 정의, 기능 구성, 비즈니스 모델 정리",
        "사업계획서 자동생성 AI 프롬프트(v2) 설계와 사업계획서 작성",
        "투자자 · 심사위원용 피치 데모 페이지 제작",
        "보강 영상 모션 샘플 제작 (HTML/CSS → Playwright → FFmpeg)",
      ],
      team: [
        { who: "1차 프로젝트 팀 (5직 직진)", what: "출발점이 된 중도탈락 문제 정의, 직원 설문 데이터, 페르소나 조사" },
      ],
      note: "모두의 창업은 개인 명의로 지원한 과제이며, 1차 팀 프로젝트에서 함께 찾은 문제를 사업 아이템으로 발전시켰습니다.",
    },
    slides: [1, 2, 3, 4, 5, 6].map((i) => ({
      src: m("smart-attendance-ai", `pitch-v2-${i}.jpg`),
      caption: ["표지", "문제", "해결 흐름", "Before / After", "비즈니스 모델 · 로드맵", "진행 현황 · 다음 단계"][i - 1],
    })),
    resources: [
      { kind: "pdf", label: "사업 요약 피치 슬라이드", href: m("smart-attendance-ai", "smart-attendance-pitch-summary-v2.pdf"), note: "PDF · 6장" },
      { kind: "pdf", label: "사업계획서 자동생성 프롬프트 v2", href: m("smart-attendance-ai", "business-plan-prompt-v2.pdf"), note: "PDF · 6쪽" },
      { kind: "video", label: "결석 보강 콘텐츠 모션 샘플", href: m("smart-attendance-ai", "video.mp4"), note: "MP4" },
      { kind: "link", label: "1차 프로젝트: 훈련생 중도탈락 조기 감지", href: "/projects/smhrd-dropout-guard", note: "문제를 처음 발견한 프로젝트" },
    ],
  },
  {
    slug: "in2us-inventory-check",
    stage: "2차 프로젝트 · 핵심 프로젝트",
    title: "AI 손글씨 재고실사 검증 자동화",
    subtitle: "손글씨 실사표 한 장을 믿고 쓰는 재고 데이터로",
    summary:
      "배터리 제조사 물류 창고의 재고 실사 문제를 다뤘습니다. 현장 손글씨 실사표 사진을 AI가 읽고, DB 규칙이 숫자를 검사하고, 사람이 승인하는 재고 검수 서비스를 만들었습니다.",
    period: "2026.10 – 2026.11",
    team: "IN2US · 6명",
    partner: "세방전지 연계",
    role: "데이터 엔지니어 — DB 스키마 · 수량 규칙 · 발주 · 검토 함수",
    thumbnail: m("in2us-inventory-check", "poster.jpg"),
    video: {
      src: m("in2us-inventory-check", "video.mp4"),
      label: "시연 영상 · 숫자의 이동",
      scenes: [
        { time: 28, image: m("in2us-inventory-check", "scene-1.jpg"), caption: "사진 한 장으로 실사 시작" },
        { time: 46, image: m("in2us-inventory-check", "scene-2.jpg"), caption: "원본 사진과 판독 결과 대조" },
        { time: 91, image: m("in2us-inventory-check", "scene-3.jpg"), caption: "확정 수량이 재고에 반영" },
        { time: 118, image: m("in2us-inventory-check", "scene-4.jpg"), caption: "기준 엑셀과 다시 비교" },
      ],
    },
    problem: [
      "바코드 리더기가 놓친 칸을 현장에서 종이에 한 번 더 적고, 관리자는 매일 저녁 종이와 전산을 눈으로 대조했습니다.",
      "납축전지 창고는 충전 중 수소가 나와 전자기기 사용이 어렵고, 장갑 착용과 보안 때문에 종이가 가장 현실적인 도구였습니다.",
      "AI가 숫자를 하나라도 지어내면 재고 전체가 틀어지고, 재고 · 발주 정보는 회사 밖으로 나가면 안 됩니다.",
    ],
    solution: [
      "종이는 그대로 두고, 창고 밖에서 실사표 사진 한 장으로 전산까지 잇습니다.",
      "AI는 보이는 그대로 읽어 제안하고, DB 규칙이 숫자를 검사하고, 최종 판단은 사람이 승인합니다.",
      "관리자는 전체가 아니라 규칙에 걸린 줄만 원본 사진과 비교하면 되고, 잘못된 값이 남으면 승인이 막힙니다.",
    ],
    features: [
      { title: "사진 판독", body: "멀티모달 AI가 기준 목록(RAG)을 참고해 손글씨 실사표를 판독" },
      { title: "수량 규칙 검사", body: "쉼표 · 자릿수 · 소수 · 최대값 규칙을 DB에서 검사하고 문제 줄을 표시" },
      { title: "관리자 검수 · 승인", body: "빨간 줄만 확인 · 수정, 수정한 값도 규칙을 다시 통과해야 승인" },
      { title: "AI 재고 매니저", body: "재고를 말로 묻고 답하며, 답의 숫자는 항상 DB 조회값만 사용" },
    ],
    process: [
      { title: "문제 정의", body: "현장 관리자 · 작업자 페르소나로 '도구가 놓친 빈칸을 사람이 메우는' 구조를 정의" },
      { title: "설계 변경", body: "같은 사진도 결과가 흔들려 AI의 범위를 판독으로 줄이고, 검사는 DB · 판단은 사람에게" },
      { title: "자동화 구축", body: "n8n에서 LangChain 블록으로 워크플로 9개를 조립하고 텔레그램 · 디스코드 알림 연동" },
      { title: "자동 시험", body: "일부러 틀린 값을 넣고 승인을 시도해 막혀야 할 곳이 막히는지 20단계로 검증" },
    ],
    contributions: [
      "Supabase(PostgreSQL) 스키마와 창고 · 위치 · 품목 시드 데이터를 설계했습니다.",
      "쉼표 · 자릿수 · 소수 · 최대값을 다루는 수량 해석 규칙(parse_qty)을 만들었습니다.",
      "발주 요청 · 승인과 실사 검토 · 승인을 처리하는 DB 함수를 구현했습니다.",
    ],
    results: [
      { value: "20/20", label: "전체 흐름 자동 시험 PASS" },
      { value: "0건", label: "틀린 값이 승인된 경우" },
      { value: "9개", label: "n8n 자동화 워크플로" },
    ],
    resultNote: "시연용 가상 데이터와 로컬 시험 환경 기준이며, 실제 현장 사진 · ERP 연동은 다음 단계 과제입니다.",
    stack: ["n8n", "LangChain", "Supabase · PostgreSQL", "pgvector RAG", "OpenAI 멀티모달", "Docker", "Netlify"],
    architecture: {
      image: m("in2us-inventory-check", "arch.jpg"),
      caption: "화면 3개 · n8n 워크플로 9개 · 서비스 6개",
      points: [
        "현장 · 관리자 · 발주 화면은 n8n Webhook만 부릅니다. Supabase나 OpenAI를 직접 부르지 않습니다.",
        "n8n이 업로드 · 판독 · 검토 · 발주 · RAG · 챗봇 · 브리핑 · 오류 알림을 9개 워크플로로 나눠 처리합니다.",
        "DB · 사진 저장소 · 벡터 · OpenAI · 텔레그램 · 디스코드 키는 n8n Credential 안에만 있습니다.",
      ],
    },
    deepDives: [
      {
        title: "DB 설계 — 실사표 한 장을 재고 위치 한 줄씩으로 쪼갠다",
        body: "제가 맡은 부분입니다. 테이블 8개 · 뷰 2개 · 업무 함수 12개로 설계했습니다. 재고는 저장하지 않고 '가장 최근에 승인된 실사'에서 매번 계산하는 뷰(v_stock_lots)로 만들어, 승인을 철회하면 이전 값으로 저절로 돌아갑니다.",
        image: { src: m("in2us-inventory-check", "erd.jpg"), caption: "테이블 관계도 · count_lines가 실사표와 재고 위치를 잇는다" },
      },
      {
        title: "수량 규칙 parse_qty — 숫자는 AI가 아니라 DB가 지킨다",
        body: "AI는 적힌 글자를 그대로(qty_text) 넘기고, 숫자로 바꾸는 일과 규칙 검사는 DB 함수 parse_qty가 합니다. 화면에서 고친 값이든 챗봇이 넣은 값이든 같은 규칙을 통과해야 하고, 오류 줄이 하나라도 남아 있으면 DB가 승인을 거부합니다.",
        table: {
          cols: ["규칙", "내용", "통과", "거부"],
          rows: [
            ["쉼표", "천 단위 구분일 때만 허용", "1,200 → 1200", "1,2 · 1200,5"],
            ["소수", "품목별 소수 자릿수 이하 (EA 0자리, kg · L 1자리)", "kg 12.50 → 12.5", "kg 12.55 · EA 12.5"],
            ["글자", "숫자 외 글자 · 띄어쓰기 거부, 전각 · 앞자리 0 정리", "１２０ → 120", "12개 · 3 4"],
            ["빈칸", "빈칸은 '세지 않음', 0은 0으로 적기", "- · 없음 → 0", "(빈칸)"],
            ["최대값", "정수 7자리, 품목별 qty_max 초과 거부", "EA 4,800 → 4800", "EA 123456"],
          ],
        },
      },
      {
        title: "AI는 제안, 결정은 사람 — 승인 · 반려 · 철회",
        body: "판독 결과는 무조건 '대기(pending)'로 들어가고 관리자가 승인해야만 재고가 바뀝니다. 반려와 철회는 사유가 필수이고, 승인 · 반려 · 철회 · 수정 · 발주는 누가 언제 했는지 감사 로그(audit_logs)에 자동으로 남습니다. AI가 처음 읽은 값(ai_qty)도 따로 보존합니다.",
      },
    ],
    automation: {
      intro:
        "실제로 실행한 n8n 화면입니다. 실사표 사진 한 장이 업로드되면 n8n이 사진 저장 → 기준목록 조회 → AI 판독 → DB 규칙 검사 → 알림까지 자동으로 처리하고, 관리자는 규칙에 걸린 줄만 확인해 승인합니다.",
      steps: [
        {
          tag: "입력 자료",
          title: "현장 실사표 (테스트용 합성 사진)",
          body: "손글씨 수량 15줄을 적은 원자재 실사표 예시입니다. WH-0005는 57에 줄을 긋고 62로 고쳐 썼습니다. 실제 현장 사진이 아닌 시연용 가상 데이터입니다.",
          image: m("in2us-inventory-check", "sheet-sample.jpg"),
        },
        {
          tag: "n8n 워크플로",
          title: "워크플로 9개 (조회 · 업로드 · 검토 · 발주 · RAG · AI 매니저 · 브리핑 · 오류 알림)",
          body: "역할별로 워크플로를 나눠 한 곳이 실패해도 다른 기능에 영향이 없게 했습니다. 팀원 PC마다 같은 결과가 나오도록 가져오기용 JSON 9개로 통일했습니다.",
          image: m("in2us-inventory-check", "n8n-overview.jpg"),
        },
        {
          tag: "n8n · WF-02",
          title: "실사표 업로드 · AI 판독 — 시스템의 심장",
          body: "Webhook → 사진 준비 → 저장소 업로드 → 기준목록 조회 → AI 요청 → 결과 정리 → DB 저장 → 응답. 응답 정리 뒤에서 선을 두 갈래로 나눠 화면 응답이 알림을 기다리지 않게 했습니다.",
          image: m("in2us-inventory-check", "n8n-wf02.jpg"),
        },
        {
          tag: "n8n 실행 기록",
          title: "모든 노드 성공, 기준목록 150개가 함께 흘러감",
          body: "Executions 탭에서 노드마다 초록 체크와 지나간 아이템 수를 확인할 수 있습니다. 업로드부터 응답까지 한 번의 실행으로 끝납니다.",
          image: m("in2us-inventory-check", "n8n-executions.jpg"),
        },
        {
          tag: "n8n → DB",
          title: "AI가 본 글자 → DB 규칙 검사 결과",
          body: "왼쪽은 AI가 본 그대로의 글자(\"1,250\", \"34,5\"), 오른쪽은 제가 만든 DB 함수가 돌려준 결과입니다. 17줄 중 3줄을 규칙 위반으로 잡아 사유를 한국어로 남겼습니다. (텔레그램 ID는 가렸습니다)",
          image: m("in2us-inventory-check", "n8n-dbsave.jpg"),
        },
        {
          tag: "화면 · 현장 담당자",
          title: "현장 담당자 화면 — 업로드 직후 결과",
          body: "구분을 고르고 사진을 올리면 접수 줄 수, 규칙 오류 줄 수, 확인할 점이 바로 표시됩니다.",
          image: m("in2us-inventory-check", "screen-worker.jpg"),
          portrait: true,
        },
        {
          tag: "화면 · 재고 관리자",
          title: "재고 관리자 화면 — 빨간 줄만 고치고 승인",
          body: "원본 사진과 판독 결과를 나란히 봅니다. 빨간 줄은 규칙 위반, 노란 줄은 AI 신뢰도 80% 미만입니다. 고친 값도 DB 규칙을 다시 통과해야 승인됩니다.",
          image: m("in2us-inventory-check", "screen-admin.jpg"),
        },
        {
          tag: "알림",
          title: "텔레그램 · 디스코드 자동 알림",
          body: "승인 · 반려 결과와 반려 사유가 현장 담당자 휴대폰으로, 새 실사표 · 발주 요청 · 아침 브리핑은 관리자 디스코드 채널로 갑니다. 관리자가 전화로 다시 확인할 필요가 없습니다.",
          image: m("in2us-inventory-check", "alert-discord.jpg"),
        },
        {
          tag: "n8n · WF-07",
          title: "AI 재고 매니저 '한결' — LangChain 에이전트",
          body: "재고 검색 · 위치 · 발주 목록 · 발주 등록 · 현황 · 매뉴얼 도구 6개와 대화 기억(Postgres Chat Memory)을 붙였습니다. 답의 숫자는 도구로 조회한 값만 쓰고, 발주는 '요청' 상태로만 넣어 관리자 승인을 거칩니다.",
          image: m("in2us-inventory-check", "n8n-wf07.jpg"),
        },
        {
          tag: "화면 · 발주 담당자",
          title: "발주 담당자 화면 + 한결",
          body: "바뀐 재고로 바로 발주하고, 말로 묻고 말로 요청합니다. 운영 매뉴얼은 RAG(pgvector)로 찾아 그대로 인용합니다.",
          image: m("in2us-inventory-check", "screen-buyer.jpg"),
        },
      ],
    },
    troubleshooting: [
      { title: "AI가 \"1,2\" · \"34,5\"를 마음대로 숫자로 바꿈", cause: "숫자 해석을 AI에 맡기면 12인지 1.2인지 바뀌어도 알 수 없음", fix: "적힌 글자 그대로(qty_text) 받고, 변환 · 검사는 DB 함수 parse_qty가 담당", result: "관리자 화면 '적힌 글자' 열로 원본 확인" },
      { title: "DB 규칙 위반 시 화면엔 '서버 오류'만 보임", cause: "Supabase가 400을 주면 n8n HTTP 노드가 멈춰 친절한 문구가 사라짐", fix: "Never Error + 공통 '응답 정리' 노드로 {ok:false, message}를 한국어 그대로 전달", result: "\"쉼표는 천 단위 구분에만…\"이 화면 토스트로 표시" },
      { title: "service_role 키가 화면 코드에 들어갈 뻔함", cause: "화면에서 Supabase를 직접 부르면 키가 그대로 노출", fix: "화면은 n8n만 호출, 모든 테이블 RLS + anon의 함수 실행 권한 회수", result: "anon으로 직접 호출 시 permission denied 확인" },
      { title: "AI 응답에 설명 문장이 섞여 JSON 파싱 실패", cause: "자유 형식 응답은 칸 이름 · 모양이 매번 달라짐", fix: "Structured Outputs(json_schema, strict) 적용", result: "정해진 JSON 모양 외 응답 차단" },
      { title: "업로드 응답이 디스코드 알림을 기다리며 늦어짐", cause: "응답 노드가 알림 노드 뒤에 직렬로 연결됨", fix: "응답 먼저 보내고, 알림은 별도 갈래 + On Error Continue", result: "알림이 실패해도 업로드는 성공으로 남음" },
      { title: "챗봇이 \"박관리 이름으로 발주해\"를 그대로 처리", cause: "AI가 발주자와 발주 시점을 정할 수 있었음", fix: "발주자를 로그인 정보로 고정, 동의한 다음 턴에만 발주 등록, DB가 역할을 다시 검사", result: "챗봇 발주도 '요청' 상태, 관리자 승인 필수" },
    ],
    tests: [
      { step: "승인 시도 (수정 전)", check: "빨간 줄 3개가 남은 채 승인 → 400 \"먼저 고쳐 주세요\"", result: "PASS" },
      { step: "수정값 재검사", check: "'1,2'로 고침 → 400 쉼표 규칙 / 34.5 · 12 · 12로 고침 → 200", result: "PASS" },
      { step: "중복 승인 · 권한", check: "이미 승인된 실사표 재승인 거부, 발주 담당자의 발주 승인 거부", result: "PASS" },
      { step: "발주 수량 규칙", check: "셀 캔(EA) 10.5개 발주 → \"소수 0자리까지만\"", result: "PASS" },
      { step: "철회 후 재고", check: "승인 철회 → LFP 양극 활물질 340 kg → 0 (이전 값 복구)", result: "PASS" },
    ],
    ownership: {
      mine: [
        "Supabase(PostgreSQL) 스키마 설계 — 테이블 8 · 뷰 2 · 업무 함수 12, 창고 · 위치 · 품목 시드 데이터",
        "수량 해석 규칙 parse_qty — 쉼표 · 자릿수 · 소수 · 빈칸 · 최대값 검사와 한국어 거절 사유",
        "실사 검토 · 승인 · 반려 · 철회(review_sheet), 발주 요청 · 승인 DB 함수 구현",
        "재고 계산 뷰(v_stock_lots)와 감사 로그 자동 기록, RLS · 함수 권한 회수로 직접 접근 차단",
        "n8n 워크플로가 부르는 DB 함수(RPC)의 입출력 규격을 맞추고 자동 시험으로 검증",
      ],
      team: [
        { who: "PM", what: "일정 · 회의록, 승인 규칙 · 상태 흐름 설계, 최종 PPT 총괄" },
        { who: "AI 엔지니어 A", what: "n8n 워크플로 9개 구축, 텔레그램 · 디스코드 연동, 오류 알림" },
        { who: "AI 엔지니어 B", what: "판독 모델 비교 · 전환, 이미지 전처리, 자동 시험 · 성능 측정" },
        { who: "프론트엔드", what: "현장 · 관리자 · 발주 화면 3개, MOCK → 실연결, Netlify 배포" },
        { who: "프롬프트 엔지니어", what: "판독 프롬프트, AI 매니저 한결 페르소나 · 도구 설명, 품질 시험" },
      ],
      note: "6명 팀 프로젝트입니다. 팀원 이름은 개인정보 보호를 위해 역할로만 표기했습니다.",
    },
    limits: {
      now: [
        "실제 세방전지 SCM/ERP 연동은 미검증 — Supabase 가상 ERP로 검증",
        "시연 데이터는 가상 데이터 (위치 330 · 품목 150)",
        "실제 OpenAI 판독 정확도는 손글씨 시험셋으로 추가 측정 필요",
        "외부 클라우드 AI 사용 — 사내 보안 정책상 온프레미스 모델 검토 필요",
      ],
      next: [
        { title: "손글씨 시험셋 실측", body: "오염 · 구김 · 필기체별 칸 정확도와 AI 일치율 측정" },
        { title: "실제 SCM 파일 연동", body: "승인 결과를 CSV/Excel로 내보내 기존 시스템에 반영" },
        { title: "누락 원인 분석", body: "구역 · 품목별 리더기 누락을 쌓아 라벨 교체 우선순위 제시" },
        { title: "알림톡 · 사내 모델", body: "카카오 알림톡 확장, 온프레미스 VL 모델 비교" },
      ],
    },
    resources: [
      { kind: "pdf", label: "최종 발표자료 · AI 재고실사 검증", href: m("in2us-inventory-check", "IN2US_final_presentation.pdf"), note: "PDF · 26쪽 · 팀원 이름 가림" },
      { kind: "video", label: "시연 영상 · 숫자의 이동", href: m("in2us-inventory-check", "video.mp4"), note: "MP4 · 약 2분" },
    ],
    privacyNote:
      "기업 연계 프로젝트라 실제 재고 · 거래 정보는 쓰지 않았고, 화면의 품목 · 수량 · 계정(김현장, 박관리 등)은 모두 시연용 가상 데이터입니다. 캡처 속 메신저 ID와 발표자료의 팀원 이름은 가렸습니다.",
  },
];

export const getTeamProject = (slug: string) => teamProjects.find((p) => p.slug === slug);

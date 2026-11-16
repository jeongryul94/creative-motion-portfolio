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
};

const m = (slug: string, file: string) => `/media/projects/${slug}/${file}`;

export const teamProjects: TeamProject[] = [
  {
    slug: "smhrd-dropout-guard",
    stage: "1차 프로젝트 · 미니 데이터분석",
    title: "스인개를 지켜라",
    subtitle: "데이터로 미리 감지하는 훈련생 중도탈락",
    summary:
      "국비 훈련기관의 중도탈락을 결석이 쌓인 뒤가 아니라 이탈 신호가 보일 때 잡아내는 위험 예측 · 관리 서비스를 기획하고 데이터로 가설을 검증했습니다.",
    period: "2026.09.08 – 09.15",
    team: "5직 직진 · 5명",
    partner: "스마트인재개발원",
    role: "사용자 조사(페르소나 설계) · 데이터 수집 · 발표자료",
    thumbnail: m("smhrd-dropout-guard", "poster.jpg"),
    video: {
      src: m("smhrd-dropout-guard", "video.mp4"),
      label: "최종 발표 영상",
      scenes: [
        { time: 60, image: m("smhrd-dropout-guard", "scene-1.jpg"), caption: "직원 설문으로 찾은 핵심 문제점" },
        { time: 84, image: m("smhrd-dropout-guard", "scene-2.jpg"), caption: "교육운영 담당자 페르소나 2명" },
        { time: 108, image: m("smhrd-dropout-guard", "scene-3.jpg"), caption: "중도포기 직전의 데이터 변화" },
        { time: 132, image: m("smhrd-dropout-guard", "scene-4.jpg"), caption: "해결 방안 · 챗봇 MVP" },
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
    stage: "창업 도전 · 모두의 창업 2기 2라운드",
    title: "스마트출결AI",
    subtitle: "결석해도, 뒤처지지 않게",
    summary:
      "1차 프로젝트에서 찾은 문제를 창업 아이템으로 발전시켜, 국비 훈련기관을 위한 출결 · 서류 · 학습 보강 통합 플랫폼을 사업화 관점으로 설계했습니다.",
    period: "2026.09 – 진행 중",
    team: "창업 아이디어",
    partner: "모두의 창업 2기 · 1라운드 진출, 2라운드 진행 중",
    role: "사업 기획 · 피치 데모 페이지 · 보강 영상 모션 제작",
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
      { value: "1R 진출", label: "모두의 창업 2기 · 현재 2라운드 진행 중" },
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
    ],
  },
  {
    slug: "in2us-inventory-check",
    stage: "2차 프로젝트 · 핵심 프로젝트",
    title: "IN2US",
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
  },
];

export const getTeamProject = (slug: string) => teamProjects.find((p) => p.slug === slug);

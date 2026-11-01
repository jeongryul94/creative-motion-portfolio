# Creative Motion Portfolio

영상 제작자 개인 포트폴리오 웹사이트입니다.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide

```
Hero / Showreel  →  Selected Works (필터)  →  About  →  Expertise  →  Contact
                         └→ /works/[slug] 프로젝트 상세 페이지
```

---

## 1. 로컬 실행

Node.js 20.9 이상이 필요합니다.

```bash
npm install
cp .env.example .env.local   # 연락처·웹훅 입력
npm run dev                  # http://localhost:3000
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run typecheck` | TypeScript 검사 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 빌드 결과 실행 |

---

## 2. 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx            # 폰트, 메타데이터, 헤더/푸터
│  ├─ page.tsx              # 홈 (섹션 조립)
│  ├─ works/[slug]/page.tsx # 프로젝트 상세 (정적 생성)
│  ├─ api/contact/route.ts  # 문의 폼 → 웹훅 전달
│  ├─ sitemap.ts, robots.ts, not-found.tsx
│  └─ globals.css           # 디자인 토큰(@theme), 공통 스타일
├─ components/
│  ├─ layout/    Header(스크롤 반응·모바일 메뉴), Footer
│  ├─ sections/  Hero, SelectedWorks, About, Expertise, Contact
│  ├─ works/     ProjectCard (hover/터치 미리보기)
│  ├─ video/     ProjectMedia(플레이어+주요장면), playback(동시재생 제한)
│  ├─ contact/   ContactForm, CopyEmailButton
│  └─ ui/        Reveal, Magnetic, SampleBadge, BrandIcons, MotionProvider
├─ data/
│  ├─ projects.ts   # ★ 작품 데이터
│  ├─ site.ts       # ★ 사이트 설정, 히어로 문구, About 콘텐츠
│  └─ expertise.ts  # 서비스 6종
└─ lib/  types.ts, video.ts (YouTube/Vimeo/MP4 판별)

public/media/
├─ videos/    풀버전 MP4 + showreel(1080p) + showreel-720(모바일)
├─ previews/  카드 hover용 5초 무음 MP4 (480p)
├─ posters/   썸네일/포스터 JPG
└─ scenes/    상세 페이지 주요 장면 스틸
```

---

## 3. 작품 추가·수정 가이드

`src/data/projects.ts` 배열에 객체 하나만 추가하면 목록, 필터, 상세 페이지, sitemap에 자동 반영됩니다. UI 코드는 건드릴 필요가 없습니다.

```ts
{
  id: "p06",
  slug: "my-new-project",            // URL: /works/my-new-project
  title: "프로젝트 제목",
  summary: "카드·상세 상단 한 줄 소개",
  category: "YouTube",               // Commercial | YouTube | Education | Motion | AI & 3D
  year: 2026,
  client: "클라이언트명",
  role: "기획 · 촬영 · 편집",
  period: "2026.01 – 2026.02",
  description: "상세 페이지 본문",
  brief: "기획 의도 및 해결 과제",      // 선택
  thumbnail: "/media/posters/my-new-project.jpg",
  videoUrl: "https://youtu.be/XXXXXXXXXXX",   // YouTube · Vimeo · MP4 모두 가능
  previewUrl: "/media/previews/my-new-project.mp4", // 선택 (없으면 hover 미리보기 없음)
  featured: false,                   // true면 대형 Featured 카드 (1개 권장)
  duration: 95,                      // 초
  tools: ["Premiere Pro", "After Effects"],
  outcomes: ["검증된 성과만 입력"],     // 비우면 성과 섹션이 숨겨집니다
  process: [{ title: "기획", body: "..." }],
  scenes: [{ time: 12, image: "/media/scenes/my-new-project-1.jpg", caption: "장면 설명" }],
}
```

- 선택 필드(`?`)를 비워두면 해당 정보는 화면에서 자동으로 숨겨집니다.
- 실제 작업이 아닌 예시 데이터에는 `isSample: true`를 넣으면 **SAMPLE** 배지가 붙습니다.
- 작품 수가 0인 카테고리 필터는 비활성으로 표시됩니다.

### 영상 파일 준비 (ffmpeg)

```bash
# 풀버전: H.264 + faststart (바로 재생 시작)
ffmpeg -i input.mov -vf scale=-2:1080 -c:v libx264 -preset slow -crf 24 \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/media/videos/SLUG.mp4

# hover 미리보기: 5초, 무음, 480p (100~300KB 목표)
ffmpeg -ss 10 -t 5 -i input.mov -vf scale=-2:480 -an -c:v libx264 -crf 30 \
  -pix_fmt yuv420p -movflags +faststart public/media/previews/SLUG.mp4

# 포스터
ffmpeg -ss 10 -i input.mov -frames:v 1 -vf scale=1600:-2 -q:v 3 public/media/posters/SLUG.jpg
```

> 3분 이상의 긴 영상은 YouTube/Vimeo에 올리고 `videoUrl`에 링크를 넣는 것을 권장합니다.
> 상세 페이지는 클릭 전까지 iframe을 불러오지 않아 초기 로딩이 가볍습니다.

> ⚠️ `/media` 파일은 브라우저에 1년간 캐시(immutable)됩니다. 영상·이미지를 **교체할 때는 파일명을 바꾸세요** (예: `slug-v2.mp4`).

### 쇼릴 교체
`src/data/site.ts` → `hero.video`(데스크톱), `hero.videoMobile`(모바일 720p), `hero.poster`를 바꾸세요.
쇼릴 위에 큰 타이포가 올라가므로 **자막이 박혀 있지 않은 컷**을 쓰는 것이 좋습니다.

---

## 4. 반드시 채워야 할 정보 (TODO)

현재 수록된 5개 영상은 업로드된 실제 영상이지만, 아래 정보는 제공되지 않아 비워 두었거나 SAMPLE로 표시했습니다.
확인되지 않은 성과·수치는 넣지 마세요.

- [ ] `projects.ts` — 각 작품의 `year`, `client`, `role`, `tools`, `period`, `brief`, `outcomes`
- [ ] `projects.ts` — 대통령 영어 스피치대회 `year: 2021`은 영상 속 대회일시 기준 추정값 → 확인
- [ ] `site.ts` — `about.name`, `about.career`, `about.software` (SAMPLE 배지 표시 중)
- [ ] `.env.local` — 이메일, SNS 링크, 문의 웹훅
- [ ] 수록 영상의 포트폴리오 게시 권한 확인 (클라이언트 작업물)

---

## 5. 환경변수

`.env.example` 참고. Vercel에서는 Project → Settings → Environment Variables에 입력합니다.

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포 주소 (sitemap, OG 이미지 절대경로) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 공개 이메일. 비우면 `hello@example.com` + SAMPLE 배지 |
| `NEXT_PUBLIC_GITHUB_URL` / `YOUTUBE_URL` / `INSTAGRAM_URL` | 값이 있는 링크만 표시 |
| `CONTACT_WEBHOOK_URL` | 문의 폼을 JSON으로 POST할 웹훅 (n8n, Make, Zapier, Slack 등). 비우면 폼이 "연결되지 않음" 오류와 이메일 안내를 표시 |

웹훅으로 전달되는 JSON: `{ name, email, company, type, message, source, receivedAt }`

---

## 6. Vercel 배포

1. GitHub 저장소에 push
2. [vercel.com/new](https://vercel.com/new)에서 저장소 Import (Framework: Next.js 자동 인식)
3. 환경변수 입력 후 Deploy
4. 도메인 연결 후 `NEXT_PUBLIC_SITE_URL`을 실제 주소로 수정하고 재배포

> GitHub는 50MB 이상 파일에 경고, 100MB 이상은 거부합니다. 현재 가장 큰 영상은 약 35MB입니다.
> 영상이 많아지면 Vercel Blob, Cloudflare R2, Bunny Stream, Mux 같은 외부 스토리지/스트리밍으로 옮기고
> `videoUrl`에 해당 URL을 넣으면 됩니다.

### Supabase로 확장할 때
`Project` 타입은 평평한 구조라 그대로 테이블 컬럼이 됩니다(`tools`, `outcomes`는 `text[]`, `process`, `scenes`는 `jsonb`).
`src/data/projects.ts`의 `projects`, `getProject`, `getNextProject`를 Supabase 조회 함수로 바꾸고, 상세 페이지에 `export const revalidate = 3600`을 추가하면 됩니다.

---

## 7. 구현 메모

**성능**
- 히어로: 포스터를 `next/image priority`로 먼저 그리고(LCP), 영상은 화면 폭에 따라 1080p/720p 선택. 화면 밖으로 나가면 일시정지
- 카드 미리보기: 처음 hover(터치 기기는 화면 중앙 진입) 시에만 파일을 불러옴. **동시에 1개만 재생**
- 모든 MP4는 `+faststart` 인코딩, 상세 플레이어는 `preload="metadata"`
- 데이터 절약 모드·2G에서는 자동재생과 미리보기를 끔
- 폰트(Pretendard, Anton, JetBrains Mono)는 npm 패키지로 자체 호스팅

**접근성**
- `prefers-reduced-motion`: 모든 모션 축소 + 쇼릴·미리보기 자동재생 안 함
- 쇼릴 재생/정지·사운드 버튼, 본문 건너뛰기 링크, 키보드 포커스 표시
- 폼 라벨·오류 메시지 연결(`aria-describedby`), 결과 `aria-live` 안내
- 모바일 메뉴 Esc 닫기, 스크롤 잠금

**반응형** — 360 / 768 / 1024 / 1440px 기준, 가로 스크롤 없음 확인. 터치 기기는 hover에 의존하지 않음.

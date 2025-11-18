## ⚙️ React.js → Next.js 마이그레이션 비교

### 📁 폴더 구조 비교

| 구분 | React.js 버전 | Next.js 버전 |
|------|-------------------------------------------------------------|--------------------------------|
| **최상위 구조** | `App.jsx`, `main.jsx`, `router.jsx`, `pages/`, `components/`, `hooks/` | `src/app/`, `src/components/`, `src/hooks/`, `src/images/` |
| **페이지 구성** | `pages/Gallery.jsx`, `pages/Playlist.jsx`, `pages/TodoList.jsx` → 라우터 연결 | `app` 디렉토리 내 자동 라우팅 구조 (각 폴더 = 페이지) |
| **타입 지원** | JS 중심 구성 | TypeScript(`.ts`, `.d.ts`) 기반으로 전환 |

---

### 🔄 주요 코드 변화

| 항목 | React.js 버전 | Next.js 버전 |
|------|----------------|---------------|
| **라우팅 방식** | `react-router-dom`으로 `<Route>` 구성 | 파일/폴더 구조 자동 라우팅 (`/app/page.tsx`) |
| **렌더링 방식** | CSR(Client Side Rendering)만 가능 | SSR(Server Side Rendering) + SSG(Static Site Generation) 지원 |
| **엔트리 포인트** | `index.js` → `App.jsx` → 라우터 연결 | `app/layout.tsx` + `app/page.tsx`로 자동 구성 |
| **이미지 처리** | `<img src="..." />` | `<Image src="..." />`로 최적화 및 lazy loading 내장 |
| **배포 방식** | 수동 빌드(`npm run build`) 후 정적 배포 | Vercel과 Github 연동으로 자동 빌드 및 배포 |
| **환경 설정** | CRA가 설정 자동 처리 | `next.config.js`로 직접 설정 가능 |
| **SEO 대응** | CSR 특성상 검색엔진 노출 약함 | SSR로 HTML 미리 생성 → SEO 최적화 가능 |

## 🌐 배포 링크  

🔗 **Vercel:** https://vercel.com/seooyuuns-projects/my-app

🔗 **Deploy:** https://my-app-six-jet.vercel.app/


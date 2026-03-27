# airport-pos-monitor

공항 입점 매장의 `매출신고`, `POS`, `VAN/PG` 데이터를 비교해 이상 징후를 빠르게 식별하기 위한 관리자용 모니터링 프로젝트입니다.  
현재 저장소에는 기획 문서와 함께 `React + Vite` 기반의 초기 프론트엔드 구현이 포함되어 있습니다.

## 프로젝트 목적

- 공항 입점 매장의 월간 매출 신고 이상 징후를 조기에 식별
- 운영 담당자가 `위험도`, `상태`, `차이 규모`, `판단 근거`를 한 화면에서 빠르게 검토
- `매출신고 vs POS 기준 매출` 비교와 `POS 전자결제 vs VAN/PG 승인금액` 대사를 분리해 확인
- 외부 데이터는 이상 판정값이 아니라 매출 변동 해석용 참고 정보로 활용

## 현재 구현 범위

- 로그인 화면
- 메인 대시보드
- 매장 상세 화면
- 매출신고 수기 등록 화면
- 매출신고 엑셀 업로드 화면
- 더미 데이터 기반 상태/위험도 모니터링 UI

현재 단계는 `기획 문서 + 프론트엔드 MVP 화면 구현` 상태이며, 백엔드/API 연동은 아직 포함되어 있지 않습니다.

## 기술 스택

| 영역 | 스택 |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 |
| Chart | Recharts |
| Icons | Lucide React |
| Lint | ESLint |

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버 주소:

```text
http://127.0.0.1:5173/
```

## 사용 가능한 스크립트

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 라우트 구조

| 경로 | 설명 |
| --- | --- |
| `/login` | 관리자 로그인 |
| `/dashboard` | 메인 대시보드 |
| `/stores/:storeCode` | 매장 상세 |
| `/reports/new` | 매출신고 수기 등록 |
| `/reports/upload` | 매출신고 엑셀 업로드 |

## 주요 화면 설명

### 1. 메인 대시보드

- 상태별 요약 카드
- 매장 검색 및 필터
- 위험도 순 매장 목록
- 누락 데이터 경고
- 매장 노출 설정 모달

### 2. 매장 상세

- 핵심 비교 수치 카드
- 판단 근거 패널
- 최근 12개월 추이 차트
- 일별 신호 캘린더
- 대사 이슈 목록
- 외부 참고 데이터 패널

### 3. 신고 입력

- 수기 등록 화면
- 엑셀 업로드 및 검증 결과 확인

## 디렉터리 구조

```text
airport-pos-monitor/
├── docs/
│   ├── design/
│   └── planning/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   └── pages/
├── package.json
└── vite.config.ts
```

## 문서

기획 및 설계 문서는 `docs` 디렉터리에 정리되어 있습니다.

- `docs/planning/요구사항정의_pos-system.md`
- `docs/planning/업무일지_2026-03-27_pos-monitor.md`
- `docs/design/화면설계서_pos-monitor.md`
- `docs/design/와이어프레임_pos-monitor.md`
- `docs/design/UI디자인시안_pos-monitor.md`
- `docs/design/피그마초안작업명세_pos-monitor.md`
- `docs/design/피그마전환명세_pos-monitor.md`

## 구현 시 반영한 기준

- 기존 기획 문서의 화면 구조와 운영 흐름
- 제공받은 퍼블리싱 시안의 정보 배치와 UI 톤
- 대시보드에서 위험도 우선 검토
- 상세 화면에서 그래프보다 `판단 근거`를 먼저 노출

## 다음 단계

- 실제 인증 연동
- 백엔드/API 연결
- 업로드 검증 로직 구현
- 상태 판정 규칙과 이상 감지 로직 연결
- 대시보드/상세 데이터 실데이터 기반 전환

## 저장소 성격

이 저장소는 단순 문서 보관용이 아니라, 아래 두 축을 함께 관리합니다.

- 공항 POS 이상 감지 시스템 기획/설계 문서
- 프론트엔드 MVP 구현 코드

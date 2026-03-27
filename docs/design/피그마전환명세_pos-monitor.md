# 공항 POS 시스템 피그마 전환 명세

## 1. 문서 목적

- 기준 문서:
  - `docs/design/화면설계서_pos-monitor.md`
  - `docs/design/와이어프레임_pos-monitor.md`
  - `docs/design/UI디자인시안_pos-monitor.md`
- 목적:
  - 현재 작성된 화면설계서, 와이어프레임, UI 디자인 시안을 바탕으로 피그마에서 바로 고해상도 시안을 제작할 수 있도록 프레임 구조, 그리드, 간격, 컴포넌트, variants, 레이어 네이밍 규칙을 정의한다.
- 이번 범위:
  - `DSH-01 메인 대시보드`
  - `STD-01 매장 상세`

## 2. 피그마 파일 구조

### 2.1 페이지 구성

1. `00 Cover`
2. `01 Foundations`
3. `02 Components`
4. `03 Screens Desktop`
5. `04 Screens Mobile`
6. `05 Archive`

### 2.2 페이지별 포함 내용

- `00 Cover`
  - 프로젝트 제목
  - 버전
  - 기준 문서 링크 또는 파일명
- `01 Foundations`
  - 컬러 스타일
  - 타이포 스타일
  - spacing scale
  - radius/shadow 규칙
- `02 Components`
  - 버튼
  - 상태 배지
  - 입력 필드
  - 요약 카드
  - 테이블 헤더/행
  - 필터 chips
  - 섹션 패널
- `03 Screens Desktop`
  - `DSH-01` 데스크톱 고해상도 시안
  - `STD-01` 데스크톱 고해상도 시안
- `04 Screens Mobile`
  - 대시보드 카드형 목록 시안
  - 매장 상세 세로 적층 시안

## 3. 프레임 기준값

### 3.1 데스크톱 기본 프레임

| 항목 | 값 |
| --- | --- |
| 기준 프레임 크기 | `1440 x 1400` |
| 배경색 | `bg.canvas #F4F7FB` |
| 좌측 사이드바 폭 | `240` |
| 글로벌 헤더 높이 | `72` |
| 본문 좌우 패딩 | `32` |
| 본문 상단 패딩 | `24` |
| 주요 섹션 간 세로 간격 | `24` |

참고:

- 시안 작업 시 높이는 화면별로 늘어나도 무방하다.
- 초기 프레임은 `1440 x 1400`으로 시작하고, 상세 화면은 필요 시 `1440 x 1800` 이상으로 확장한다.

### 3.2 모바일 기본 프레임

| 항목 | 값 |
| --- | --- |
| 기준 프레임 크기 | `390 x 844` |
| 상단 헤더 높이 | `64` |
| 본문 좌우 패딩 | `16` |
| 본문 상단 패딩 | `16` |
| 주요 섹션 간 세로 간격 | `16` |

## 4. 그리드 시스템

### 4.1 데스크톱 콘텐츠 그리드

- 전체 폭 `1440`
- 사이드바 `240`
- 우측 콘텐츠 영역 `1200`
- 콘텐츠 내부 유효 폭 `1136`
- 컬럼 수 `12`
- gutter `16`
- 컬럼 폭 `80`

### 4.2 모바일 그리드

- 유효 폭 `358`
- 컬럼 수 `4`
- gutter `12`
- 컬럼 폭 `80.5`

### 4.3 spacing scale

| 토큰 | 값 |
| --- | --- |
| `sp-4` | `4` |
| `sp-8` | `8` |
| `sp-12` | `12` |
| `sp-16` | `16` |
| `sp-20` | `20` |
| `sp-24` | `24` |
| `sp-32` | `32` |
| `sp-40` | `40` |

권장:

- 컴포넌트 내부 패딩은 `12`, `16`, `24` 위주로 사용
- 카드 간 간격은 `24`
- 표 내부 셀 패딩은 `12` 또는 `16`

## 5. Foundations 세팅값

### 5.1 Color styles

| 이름 | 값 |
| --- | --- |
| `bg/canvas` | `#F4F7FB` |
| `bg/surface` | `#FFFFFF` |
| `bg/header` | `#0F2747` |
| `bg/subtle` | `#EAF1F8` |
| `text/primary` | `#17263C` |
| `text/secondary` | `#5B6B81` |
| `line/default` | `#D7E0EA` |
| `accent/primary` | `#0D6EFD` |
| `status/wait` | `#7E8795` |
| `status/normal` | `#1F8A5B` |
| `status/review` | `#D89216` |
| `status/alert` | `#D6453D` |
| `status/wait-bg` | `#EEF1F5` |
| `status/normal-bg` | `#E8F5EE` |
| `status/review-bg` | `#FFF4DF` |
| `status/alert-bg` | `#FDEBE9` |

### 5.2 Text styles

| 이름 | 폰트 | 값 |
| --- | --- | --- |
| `display/page-title` | `SUIT Variable` | `28/36 700` |
| `title/section` | `SUIT Variable` | `18/26 700` |
| `title/card-label` | `SUIT Variable` | `12/18 600` |
| `body/default` | `SUIT Variable` | `14/22 500` |
| `body/secondary` | `SUIT Variable` | `13/20 500` |
| `number/metric-lg` | `IBM Plex Sans KR` | `30/34 700` |
| `number/metric-md` | `IBM Plex Sans KR` | `20/26 700` |
| `table/body` | `IBM Plex Sans KR` | `14/20 500` |

### 5.3 Radius and shadow

| 토큰 | 값 |
| --- | --- |
| `radius/sm` | `12` |
| `radius/md` | `16` |
| `radius/lg` | `20` |

Shadow:

- `shadow/card`
  - `0 8 24 0 rgba(15, 39, 71, 0.06)`
- `shadow/floating`
  - `0 12 32 0 rgba(15, 39, 71, 0.10)`

## 6. Auto Layout 규칙

- 화면은 모두 `Auto Layout` 기반으로 구성한다.
- 큰 구조는 `Vertical Auto Layout`
- 좌우 분할 영역은 `Horizontal Auto Layout`
- 텍스트가 변할 수 있는 카드/패널은 `Hug contents + Fill container`를 적절히 사용

권장 구조:

- `Frame / Desktop / Dashboard`
  - `Sidebar`
  - `ContentShell`
    - `GlobalHeader`
    - `PageBody`
- `PageBody`
  - `PageHeader`
  - `SummaryRow`
  - `FilterBar`
  - `TablePanel`
  - `SupportRow`

## 7. 컴포넌트 명세

### 7.1 버튼

#### `Button / Primary`

| 속성 | 값 |
| --- | --- |
| 높이 | `40` |
| 좌우 패딩 | `16` |
| radius | `12` |
| 배경 | `accent/primary` |
| 텍스트 | `14/20 600` |

Variants:

- `type=primary`
- `type=secondary`
- `type=ghost`
- `size=md`
- `state=default, hover, disabled`

### 7.2 상태 배지

#### `Badge / Status`

| 속성 | 값 |
| --- | --- |
| 높이 | `28` |
| 좌우 패딩 | `10` |
| 내부 간격 | `6` |
| radius | `999` |

Variants:

- `status=wait`
- `status=normal`
- `status=review`
- `status=alert`

내부 구조:

- `Dot 8x8`
- `Label`

### 7.3 요약 카드

#### `Card / Summary Metric`

| 속성 | 값 |
| --- | --- |
| 권장 폭 | `204` |
| 높이 | `116` |
| 내부 패딩 | `20` |
| radius | `16` |
| 배경 | `bg/surface` |

내부 구조:

- Label
- Metric
- Helper text

Variants:

- `kind=total`
- `kind=wait`
- `kind=normal`
- `kind=review`
- `kind=alert`

### 7.4 필터 필드

#### `Field / Select`

| 속성 | 값 |
| --- | --- |
| 높이 | `40` |
| 최소 폭 | `140` |
| radius | `12` |
| 배경 | `#FFFFFF` |
| border | `1 / line/default` |

#### `Field / Search`

| 속성 | 값 |
| --- | --- |
| 높이 | `40` |
| 권장 폭 | `280` |
| radius | `12` |

### 7.5 테이블

#### `Table / Header Cell`

| 속성 | 값 |
| --- | --- |
| 높이 | `44` |
| 좌우 패딩 | `12` |
| 배경 | `bg/subtle` |

#### `Table / Row`

| 속성 | 값 |
| --- | --- |
| 높이 | `56` |
| 좌우 패딩 | `12` |
| 배경 | `#FFFFFF` |
| hover | `#F4F9FF` |

Variants:

- `status=default`
- `status=wait`
- `status=normal`
- `status=review`
- `status=alert`

표현 방식:

- 행 전체 배경색 변경은 최소화
- 좌측 4px 상태 컬러 바를 기본 강조 장치로 사용

### 7.6 판단 근거 패널

#### `Panel / Insight`

| 속성 | 값 |
| --- | --- |
| 내부 패딩 | `24` |
| radius | `16` |
| 배경 | `#F6FAFE` |
| border | `1 / #DCE7F3` |

내부 구조:

- Panel title
- Insight items 3개
- Exception tags row

### 7.7 캘린더 셀

#### `Calendar / Day Cell`

| 속성 | 값 |
| --- | --- |
| 데스크톱 셀 크기 | `132 x 104` |
| 모바일 셀 크기 | `80 x 74` |
| 내부 패딩 | `8` |
| radius | `12` |

내부 구조:

- Day number
- `P`
- `V`
- `D`

Variants:

- `state=default`
- `state=selected`
- `state=warning`
- `state=alert`
- `state=empty`

## 8. `DSH-01` 데스크톱 고해상도 시안 스펙

### 8.1 프레임 구조

- Frame: `1440 x 1400`
- Sidebar: `240 x 1400`
- Content: `1200 x 1400`
- Global Header: `1200 x 72`
- Page Body inner: `1136` width

### 8.2 레이아웃 순서

1. `PageHeader`
2. `SummaryRow`
3. `FilterBar`
4. `TablePanel`
5. `SupportCardsRow`

### 8.3 상세 치수

#### Sidebar

| 항목 | 값 |
| --- | --- |
| 폭 | `240` |
| 내부 패딩 | `24` |
| 메뉴 아이템 높이 | `40` |
| 메뉴 간 간격 | `8` |

#### Global Header

| 항목 | 값 |
| --- | --- |
| 높이 | `72` |
| 좌우 패딩 | `32` |
| 콘텐츠 정렬 | `space-between` |

#### Page Header

| 항목 | 값 |
| --- | --- |
| 높이 | `72` |
| 내부 패딩 | `0` |
| 제목-설명 간격 | `6` |
| 우측 버튼 간격 | `12` |

#### Summary Row

| 항목 | 값 |
| --- | --- |
| 카드 개수 | `5` |
| 카드 폭 | `204` |
| 카드 간격 | `16` |
| 전체 높이 | `116` |

#### Filter Bar

| 항목 | 값 |
| --- | --- |
| 높이 | `64` |
| 내부 패딩 | `12` |
| 배경 | `bg/subtle` |
| 검색창 폭 | `280` |
| 일반 셀렉트 폭 | `140` |
| 정렬 셀렉트 폭 | `180` |

#### Table Panel

| 항목 | 값 |
| --- | --- |
| 폭 | `1136` |
| 패널 패딩 | `0` |
| 헤더 높이 | `44` |
| 행 높이 | `56` |
| 기본 표시 행 수 | `10` |

권장 컬럼 폭:

| 컬럼 | 폭 |
| --- | --- |
| 순위 | `56` |
| 상태 | `112` |
| 매장명 | `180` |
| 코드 | `92` |
| 신고기준 | `96` |
| 신고금액 | `136` |
| 비교 기준값 | `136` |
| 차이금액 | `136` |
| 차이율 | `96` |
| 정합성 | `140` |
| 내부 상태 | `120` |
| 갱신일시 | `140` |

#### Support Cards Row

| 항목 | 값 |
| --- | --- |
| 카드 수 | `3` |
| 카드 폭 | `368` |
| 카드 높이 | `96` |
| 간격 | `16` |

### 8.4 피그마 레이어 네이밍 예시

- `Frame/Desktop/Dashboard`
- `Shell/Sidebar`
- `Shell/Content`
- `Section/PageHeader`
- `Card/Summary/Alert`
- `Panel/Table/StoreRanking`
- `Row/Table/Alert`

## 9. `STD-01` 데스크톱 고해상도 시안 스펙

### 9.1 프레임 구조

- 시작 프레임: `1440 x 1800`
- Sidebar: `240`
- Content: `1200`
- Inner width: `1136`

### 9.2 레이아웃 순서

1. `PageHeader`
2. `MetricCards`
3. `InsightRow`
4. `TrendChartPanel`
5. `CalendarAndDayDetail`
6. `IssueTablePanel`
7. `ExternalDataPanel`

### 9.3 상세 치수

#### Page Header

| 항목 | 값 |
| --- | --- |
| 최소 높이 | `76` |
| 제목-메타 간격 | `8` |
| 상태 배지와 제목 간격 | `12` |

#### Metric Cards

| 항목 | 값 |
| --- | --- |
| 카드 수 | `5` |
| 카드 폭 | `204` |
| 카드 높이 | `108` |
| 간격 | `16` |

#### Insight Row

| 항목 | 값 |
| --- | --- |
| 좌측 판단 근거 패널 폭 | `760` |
| 우측 운영 정보 패널 폭 | `360` |
| 높이 | `180` |
| 간격 | `16` |

#### Trend Chart Panel

| 항목 | 값 |
| --- | --- |
| 폭 | `1136` |
| 높이 | `320` |
| 패딩 | `24` |

#### Calendar + Day Detail

| 항목 | 값 |
| --- | --- |
| 좌측 캘린더 폭 | `760` |
| 우측 선택 일자 패널 폭 | `360` |
| 높이 | `420` |
| 간격 | `16` |

캘린더 상세:

- 7열 그리드
- 셀 폭 `96`
- 셀 높이 `92`
- 셀 간 간격 `8`

#### Issue Table Panel

| 항목 | 값 |
| --- | --- |
| 폭 | `1136` |
| 높이 | `280` |
| 헤더 높이 | `44` |
| 행 높이 | `52` |

#### External Data Panel

| 항목 | 값 |
| --- | --- |
| 카드 수 | `4` |
| 카드 폭 | `272` |
| 카드 높이 | `116` |
| 간격 | `16` |

### 9.4 레이어 네이밍 예시

- `Frame/Desktop/StoreDetail`
- `Section/MetricCards`
- `Panel/Insight/Main`
- `Panel/Insight/Meta`
- `Panel/Chart/Trend`
- `Panel/Calendar`
- `Panel/IssueTable`
- `Panel/ExternalData`

## 10. 모바일 시안 최소 스펙

### 10.1 대시보드 모바일

- Frame: `390 x 844`
- Header: `64`
- Summary cards:
  - 2열 그리드
  - 카드 높이 `92`
  - 간격 `12`
- Store list card:
  - 폭 `358`
  - 높이 `104`
  - 내부 패딩 `16`

### 10.2 매장 상세 모바일

- Header: `64`
- Metric cards:
  - 2열 그리드
  - 카드 높이 `92`
- Insight panel:
  - 폭 `358`
  - 높이 `auto`
- Trend chart:
  - 높이 `240`
- Calendar:
  - 높이 `320`

## 11. 상태 Variant 적용 규칙

- 대시보드 요약 카드와 테이블 행은 동일한 상태 컬러 매핑을 사용한다.
- 매장 상세 화면의 상단 상태 배지와 판단 근거 패널의 좌측 액센트 바도 동일 상태 매핑을 사용한다.
- `대기`는 회색 계열만 사용하고 주황/빨강과 혼합하지 않는다.
- `확인 필요`는 주황, `이상 의심`은 빨강으로 고정한다.

## 12. 피그마 제작 순서 추천

1. `01 Foundations`에서 컬러/타입/spacing styles를 먼저 만든다.
2. `02 Components`에서 버튼, 배지, 카드, 필터, 테이블, 패널을 만든다.
3. `03 Screens Desktop`에서 `DSH-01`을 먼저 완성한다.
4. 같은 컴포넌트를 재사용해 `STD-01`을 만든다.
5. 마지막에 `04 Screens Mobile`로 재배치한다.

## 13. 체크리스트

- 상태 4단계가 모든 화면에서 동일한 의미와 색으로 보이는가
- 대시보드 첫 화면에서 위험도와 차이 규모가 즉시 읽히는가
- 매장 상세에서 판단 근거가 그래프보다 먼저 보이는가
- 기준 월과 `전월 대비` 문구가 혼동 없이 읽히는가
- 외부 데이터 미연동 상태가 빈 화면처럼 보이지 않는가
- 모든 주요 영역이 auto layout 기반으로 재사용 가능하게 설계되었는가

## 14. 다음 확장 범위

- `LGN-01 로그인`
- `RPT-01 수기 등록`
- `RPT-02 엑셀 업로드`
- 공통 `디자인시스템_foundation` 문서 분리

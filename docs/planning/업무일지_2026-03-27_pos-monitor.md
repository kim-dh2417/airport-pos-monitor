# 2026-03-27 업무일지

## 1. 개요

- 프로젝트: `airport-pos-monitor`
- 작업 주제: POS 모니터링 화면 설계 문서 확인 및 Figma 초안 착수

## 2. 오늘 수행한 업무

### 2.1 설계 문서 위치 및 파일 확인

- 화면 설계 관련 문서 위치를 확인했다.
- 확인 경로:
  - `C:\dev\airport-pos-monitor\docs\design`
- 확인 파일:
  - `화면설계서_pos-monitor.md`
  - `피그마전환명세_pos-monitor.md`
  - `UI디자인시안_pos-monitor.md`
  - `와이어프레임_pos-monitor.md`

### 2.2 문서 검토 및 화면 초안 방향 정리

- `피그마전환명세_pos-monitor.md`를 기준으로 Figma 전환 범위를 확인했다.
- `DSH-01 메인 대시보드`, `STD-01 매장 상세`를 우선 화면으로 잡았다.
- `UI디자인시안`, `와이어프레임`, `화면설계서`를 함께 읽고 아래 방향으로 초안 구성을 정리했다.
  - 밝은 캔버스 기반 운영형 대시보드 톤 적용
  - 상태 4단계(`대기 / 정상 / 확인 필요 / 이상 의심`) 일관성 유지
  - 대시보드는 위험도, 상태, 차이 규모가 먼저 읽히도록 배치
  - 매장 상세는 차트보다 `판단 근거`가 먼저 보이도록 구성

### 2.3 Figma 파일 생성 및 초안 착수

- Figma MCP를 통해 신규 디자인 파일을 생성했다.
- 생성 파일:
  - `POS Monitor Draft 2026-03-27`
- 파일 링크:
  - `https://www.figma.com/design/Wd2KwP74F1n3iSPlfDePlg`

### 2.4 Figma 작업 중 확인된 제약사항

- Starter 플랜 제약으로 페이지를 3개까지만 생성할 수 있음을 확인했다.
- 따라서 원래 의도한 아래 6페이지 구조를 그대로 적용하지 못했다.
  - `00 Cover`
  - `01 Foundations`
  - `02 Components`
  - `03 Screens Desktop`
  - `04 Screens Mobile`
  - `05 Archive`
- 대응 방향으로 아래와 같이 압축 운영하기로 정리했다.
  - `00 Cover + Foundations`
  - `01 Components`
  - `02 Screens`

### 2.5 Figma MCP 한도 이슈

- 추가 작업 중 Figma MCP tool call limit에 도달했다.
- 이로 인해 화면 초안 생성 및 최종 상태 검증을 이번 세션 내에서 끝까지 진행하지 못했다.

## 3. 오늘 산출물

- 검토 문서:
  - `docs/design/화면설계서_pos-monitor.md`
  - `docs/design/피그마전환명세_pos-monitor.md`
  - `docs/design/UI디자인시안_pos-monitor.md`
  - `docs/design/와이어프레임_pos-monitor.md`
- 신규 업무일지:
  - `docs/planning/업무일지_2026-03-27_pos-monitor.md`
- Figma 초안 파일:
  - `https://www.figma.com/design/Wd2KwP74F1n3iSPlfDePlg`

## 4. 이슈 및 리스크

- Figma Starter 플랜의 페이지 수 제한으로 원본 명세 구조를 그대로 반영하기 어렵다.
- Figma MCP 호출 한도로 인해 화면 자동 생성 작업이 중간에 중단되었다.
- 현재 세션에서는 Figma 캔버스 최종 상태를 추가 검증하지 못했다.

## 5. 다음 액션

- Figma MCP 한도 해제 이후 `02 Screens` 페이지에 아래 초안을 우선 완성한다.
  - `DSH-01` 데스크톱 화면
  - `STD-01` 데스크톱 화면
  - 모바일 대시보드 화면
  - 모바일 매장 상세 화면
- Starter 플랜 제약을 반영해 압축된 페이지 구조 기준으로 시안 파일을 정리한다.
- 필요 시 다음 라운드에서 `로그인`, `수기 등록`, `엑셀 업로드` 화면까지 확장한다.

# airport-pos-monitor

공항 입점 매장의 `매출신고`, `POS`, `VAN/PG` 데이터를 비교해 매출 이상 징후를 감지하고, 관리자 대시보드에서 매장별 위험도를 확인할 수 있도록 기획한 프로젝트입니다.

## 프로젝트 개요

- 목적: 공항 입점 매장의 매출 이상 징후를 조기에 식별하고 운영자가 빠르게 검토할 수 있도록 지원
- 핵심 관점: `이상 감지`가 1차 목표이며, 외부 데이터는 `추가 참고 정보`로 활용
- 현재 단계: 기획 및 요구사항 정의 단계

## 주요 기능

- 월간 기준 매출 이상 감지
- `대기 / 정상 / 확인 필요 / 이상 의심` 4단계 상태 관리
- 메인 대시보드에서 매장별 위험도 우선순위 확인
- 매장 상세 화면에서 `금월 대비 전월` 매출 비교
- 월별 매출 그래프 및 일별 매출 캘린더 조회
- 외부 데이터 기반 매출 변동 참고 정보 제공 가능성 검토

## AI · 데이터 활용 포인트

- 임계치 기반 이상 감지 로직 설계
- 매출 추이 및 증감률 분석
- 외부 데이터 연계 시 매출 변동 해석 보조
- 이상 판단 근거를 함께 제공하는 설명 가능한 분석 구조

주의:
- 현재 저장소는 구현 완료본이 아니라 기획/설계 단계 문서를 관리합니다.
- 아래 기술 스택은 포트폴리오 및 구현 방향성을 위한 `제안 스택`입니다.

## 제안 기술 스택

| 영역 | 스택 |
| --- | --- |
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python |
| Data Processing | Pandas, Python Batch |
| Database | PostgreSQL |
| Visualization | ECharts 또는 Recharts |
| Infra | Docker, GitHub Actions |
| File Handling | Excel Upload, CSV Parsing |

## 사용 툴

- GitHub: 문서 및 변경 이력 관리
- Notion: 기획 검토 및 공유
- Markdown: 요구사항/설계 문서 관리
- Codex: 문서 구조화 및 초안 작성 보조

## 문서

- [요구사항정의_pos-system.md](docs/planning/%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD%EC%A0%95%EC%9D%98_pos-system.md)

## 저장소 목적

- 공항 POS 이상 감지 요구사항 관리
- 화면/기능/운영 정책 문서의 버전 관리
- 포트폴리오용 프로젝트 설명과 문서 자산 정리

import {
  ArrowLeft,
  Cloud,
  Plane,
  TrendingDown,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ButtonLink } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { StatusBadge } from '../components/common/StatusBadge'
import { Header } from '../components/layout/Header'
import {
  dailySales,
  formatCurrency,
  formatNumber,
  formatPercent,
  getStoreByCode,
  issues,
  monthlySales,
  reviewLogs,
  statusHistory,
} from '../data/mockData'

export function StoreDetailPage() {
  const { storeCode } = useParams()
  const store = getStoreByCode(storeCode)
  const weekdayLabels = ['월', '화', '수', '목', '금', '토', '일']
  const externalReferences: Array<[string, string, LucideIcon]> = [
    ['탑승객', `${formatNumber(124000)}명`, Users],
    ['항공편', '지연 14편 / 결항 0편', Plane],
    ['날씨', '강풍 주의, 평균 4°C', Cloud],
    ['매장 상태', '프로모션 행사 운영', TrendingDown],
  ]

  const chartData = monthlySales.map((item) => ({
    month: item.month.slice(5),
    신고금액: item.reportAmount / 1000000,
    비교기준값: item.comparisonAmount / 1000000,
  }))

  const calendarData = dailySales.map((day) => {
    const date = new Date(`${day.date}T00:00:00`)
    const normalizedDayIndex = (date.getDay() + 6) % 7

    return {
      ...day,
      dayLabel: weekdayLabels[normalizedDayIndex],
      dayIndex: normalizedDayIndex,
    }
  })

  const leadingEmptyCellCount = calendarData[0]?.dayIndex ?? 0
  const trailingEmptyCellCount =
    calendarData.length === 0
      ? 0
      : (7 - ((leadingEmptyCellCount + calendarData.length) % 7 || 7)) % 7
  const calendarBorderClassName: Record<
    (typeof calendarData)[number]['signalLevel'],
    string
  > = {
    neutral: 'border-white/10',
    normal: 'border-success/45',
    review: 'border-warning/45',
    suspicious: 'border-danger/45',
  }
  const signalLegendItems = [
    {
      label: '차이 없음',
      borderClassName: 'border-white/18',
      helpText: '비교 불가 또는 데이터 없음',
    },
    {
      label: '정상',
      borderClassName: 'border-success/45',
      helpText: '차이율 3% 이하',
    },
    {
      label: '확인 필요',
      borderClassName: 'border-warning/45',
      helpText: '차이율 3% 초과 10% 이하',
    },
    {
      label: '이상 의심',
      borderClassName: 'border-danger/45',
      helpText: '차이율 10% 초과',
    },
  ] as const
  const comparisonBreakdownItems = [
    { label: '총 POS 금액', value: store.posAmount, operator: 'base' },
    { label: 'VAN', value: store.vanAmount, operator: 'plus' },
    { label: 'PG', value: store.pgAmount, operator: 'plus' },
    { label: '현금', value: store.cashAmount, operator: 'plus' },
    { label: '할인', value: store.discountAmount, operator: 'minus' },
    { label: '취소/환불', value: store.refundAmount, operator: 'minus' },
  ] as const
  const statusTextClassName = {
    waiting: 'text-waiting',
    normal: 'text-success',
    review: 'text-warning',
    suspicious: 'text-danger',
  } as const
  const statusLabelMap = {
    waiting: '대기',
    normal: '정상',
    review: '확인 필요',
    suspicious: '이상 의심',
  } as const
  return (
    <>
      <Header month="2024년 1월">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink to="/dashboard" variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4" />
            대시보드
          </ButtonLink>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{store.name}</h1>
              <StatusBadge status={store.status} />
            </div>
            <p className="text-sm text-muted">{store.posCode}</p>
          </div>
        </div>
      </Header>

      <div className="space-y-6 px-4 py-6 md:px-6">
        <Card>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">Comparison Breakdown</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">비교 대상 금액 상세</h2>
            <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs text-muted">
              비교 기준: {store.reportBasis}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            업체 신고금액보다 먼저 검증해야 하는 POS 기준 금액 구성을 한 번에 확인할 수 있도록 실제 금액을 그대로 보여줍니다.
          </p>
          <div className="mt-4 grid gap-3 xl:grid-cols-2">
            <div className="rounded-2xl border border-primary/18 bg-primary/8 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">신고금액</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(store.reportAmount)}</p>
              <p className="mt-2 text-xs text-muted">업체 제출 기준 금액</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">비교 기준값</p>
              <p className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(store.comparisonAmount)}</p>
              <p className="mt-2 text-xs text-muted">{store.reportBasis} 기준 비교값</p>
            </div>
            <div className="rounded-2xl border border-danger/18 bg-danger/6 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">차이금액</p>
              <p className="mt-2 text-xl font-semibold text-danger">{formatCurrency(store.differenceAmount)}</p>
              <p className="mt-2 text-xs text-muted">신고금액과 비교 기준값의 차이</p>
            </div>
            <div className="rounded-2xl border border-warning/18 bg-warning/6 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">차이율</p>
              <p className="mt-2 text-xl font-semibold text-warning">{formatPercent(store.differenceRate)}</p>
              <p className="mt-2 text-xs text-muted">현재 임시 기준상 10% 초과 시 이상 의심</p>
            </div>
            <div className="rounded-2xl border border-primary/18 bg-primary/8 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">최종 판정</p>
              <p className={`mt-2 text-2xl font-semibold ${statusTextClassName[store.status]}`}>
                {statusLabelMap[store.status]}
              </p>
              <p className="mt-2 text-xs text-muted">
                차이금액 {formatCurrency(store.differenceAmount)}, 차이율 {formatPercent(store.differenceRate)} 기준 결과
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {comparisonBreakdownItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-muted">{item.label}</p>
                  {item.operator === 'base' ? (
                    <span className="rounded-full border border-white/8 bg-white/6 px-2.5 py-1 text-[11px] text-muted">
                      기준값
                    </span>
                  ) : null}
                </div>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    item.operator === 'plus'
                      ? 'text-success'
                      : item.operator === 'minus'
                        ? 'text-danger'
                        : 'text-foreground'
                  }`}
                >
                  {item.operator === 'plus'
                    ? `+${formatCurrency(item.value)}`
                    : item.operator === 'minus'
                      ? `-${formatCurrency(item.value).replace(/^₩/, '₩')}`
                      : formatCurrency(item.value)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-warning/20">
          <p className="text-sm uppercase tracking-[0.24em] text-warning">Judgement Basis</p>
          <h2 className="mt-2 text-xl font-semibold">판단 근거 패널</h2>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="text-sm text-muted">상태 판정 사유</p>
              <p className="mt-2 text-base font-medium">
                신고 금액이 POS 기준 대비 {formatPercent(store.differenceRate)} 만큼 낮습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="text-sm text-muted">확인된 불일치 포인트</p>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                <li>VAN/PG 승인금액 불일치 4건</li>
                <li>현금 비중 전월 대비 15% 증가</li>
                <li>자정 경계 거래 3건 발생</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="text-sm text-muted">예외 가능성</p>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                <li>1월 15일~20일 할인 행사 운영</li>
                <li>항공편 지연으로 심야 고객 증가</li>
                <li>POS 취소 반영 시점 차이 가능</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Operation History</p>
            <h2 className="mt-2 text-xl font-semibold">상태 전이 이력</h2>
            <div className="mt-5 space-y-4">
              {statusHistory.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{item.occurredAt}</p>
                    <span className="text-xs text-muted">{item.actor}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={item.fromStatus} />
                    <span className="text-sm text-muted">→</span>
                    <StatusBadge status={item.toStatus} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Review History</p>
            <h2 className="mt-2 text-xl font-semibold">확인 이력</h2>
            <div className="mt-5 space-y-4">
              {reviewLogs.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{item.summary}</p>
                    <span className="text-xs text-muted">{item.occurredAt}</span>
                  </div>
                  <p className="mt-2 text-sm text-primary">{item.actor}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Monthly Trend</p>
            <h2 className="mt-2 text-xl font-semibold">월별 매출 추이</h2>
            <p className="mt-2 text-sm text-muted">최근 12개월 신고금액 vs 비교 기준값 (단위: 백만원)</p>
            <div className="mt-5 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="#8da0b8" />
                  <YAxis stroke="#8da0b8" />
                  <Tooltip
                    contentStyle={{
                      background: '#09111c',
                      border: '1px solid rgba(160,180,210,0.2)',
                      borderRadius: '16px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="신고금액" stroke="#6eb9ff" strokeWidth={3} />
                  <Line type="monotone" dataKey="비교기준값" stroke="#33d69f" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">External Reference</p>
            <h2 className="mt-2 text-xl font-semibold">외부 참고 데이터</h2>
            <div className="mt-5 space-y-4">
              {externalReferences.map(([label, value, Icon]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="rounded-2xl bg-primary/10 p-3">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{label}</p>
                    <p className="mt-1 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Daily Signal</p>
            <h2 className="mt-2 text-xl font-semibold">일별 매출 캘린더</h2>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 text-muted">
                  <span className="h-3 w-1 rounded-full bg-[#ffb366]" />
                  신고금액
                </span>
                <span className="inline-flex items-center gap-2 text-muted">
                  <span className="h-3 w-1 rounded-full bg-[#3dd6c1]" />
                  POS
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {signalLegendItems.map((item) => (
                  <span key={item.label} className="group relative inline-flex items-center gap-2 text-muted">
                    <span className={`h-2.5 w-5 rounded-full border bg-white/3 ${item.borderClassName}`} />
                    {item.label}
                    <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#0b1320] px-3 py-2 text-[11px] text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover:block">
                      {item.helpText}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted">
                  {weekdayLabels.map((label) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-white/4 px-2 py-2">
                      {label}
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-2">
                  {Array.from({ length: leadingEmptyCellCount }).map((_, index) => (
                    <div
                      key={`leading-empty-${index}`}
                      className="min-h-[128px] rounded-2xl border border-transparent"
                      aria-hidden="true"
                    />
                  ))}
                  {calendarData.map((day) => (
                    <div
                      key={day.date}
                      className={`min-h-[128px] rounded-2xl border bg-white/4 p-3 ${
                        calendarBorderClassName[day.signalLevel]
                      }`}
                    >
                      <p className="text-sm font-medium">{day.date.slice(8)}일</p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] leading-5 text-foreground">
                        <span className="h-4 w-1 rounded-full bg-[#ffb366]" />
                        <span>{formatNumber(day.reported)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] leading-5 text-foreground">
                        <span className="h-4 w-1 rounded-full bg-[#3dd6c1]" />
                        <span>{formatNumber(day.pos)}</span>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: trailingEmptyCellCount }).map((_, index) => (
                    <div
                      key={`trailing-empty-${index}`}
                      className="min-h-[128px] rounded-2xl border border-transparent"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Issue List</p>
            <h2 className="mt-2 text-xl font-semibold">대사 이슈 목록</h2>
            <div className="mt-5 overflow-hidden rounded-3xl border border-white/8">
              <table className="min-w-full divide-y divide-white/8 text-sm">
                <thead className="bg-white/4 text-left text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">일자</th>
                    <th className="px-4 py-3 font-medium">이슈 유형</th>
                    <th className="px-4 py-3 font-medium">영향금액</th>
                    <th className="px-4 py-3 font-medium">설명 가능성</th>
                    <th className="px-4 py-3 font-medium">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="px-4 py-3">{issue.date}</td>
                      <td className="px-4 py-3">{issue.type}</td>
                      <td className="px-4 py-3">{formatCurrency(issue.amount)}</td>
                      <td className="px-4 py-3">{issue.explainability}</td>
                      <td className="px-4 py-3">{issue.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

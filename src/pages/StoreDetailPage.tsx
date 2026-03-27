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
        <div className="section-grid">
          {[
            ['신고금액', formatCurrency(store.reportAmount)],
            ['비교 기준값', formatCurrency(store.comparisonAmount)],
            ['차이금액', formatCurrency(store.differenceAmount)],
            ['차이율', formatPercent(store.differenceRate)],
          ].map(([label, value]) => (
            <Card key={label}>
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-3 text-3xl font-semibold">{value}</p>
            </Card>
          ))}
        </div>

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

import {
  AlertTriangle,
  CalendarDays,
  Eye,
  Plus,
  Search,
  Settings2,
  Upload,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Button, ButtonLink } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Modal } from '../components/common/Modal'
import { StoresTable } from '../components/dashboard/StoresTable'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { getStatusSummary, stores } from '../data/mockData'

export function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showHidden, setShowHidden] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      if (statusFilter && store.status !== statusFilter) return false
      if (!showHidden && store.hidden) return false
      if (search) {
        const query = search.toLowerCase()
        if (
          !store.name.toLowerCase().includes(query) &&
          !store.posCode.toLowerCase().includes(query)
        ) {
          return false
        }
      }
      return true
    })
  }, [search, showHidden, statusFilter])

  const summary = getStatusSummary(stores)

  return (
    <>
      <Header title="메인 대시보드" description="위험도와 상태 기준으로 매장별 이상 징후를 우선 검토합니다.">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm text-muted">
            <CalendarDays className="h-4 w-4 text-primary" />
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="bg-transparent text-foreground outline-none"
            >
              <option value="2024-01">2024년 1월</option>
              <option value="2023-12">2023년 12월</option>
              <option value="2023-11">2023년 11월</option>
            </select>
          </div>
          <span className="rounded-xl border border-primary/20 bg-primary/8 px-3 py-2 text-sm text-primary">
            신고금액 vs POS 기준 매출, POS 전자결제 vs VAN/PG 대사 분리 검토
          </span>
        </div>
      </Header>

      <div className="space-y-6 px-4 py-6 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Monitoring Overview</p>
            <h2 className="mt-2 text-2xl font-semibold">위험도 우선 검토 허브</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <ButtonLink to="/reports/new">
              <Plus className="h-4 w-4" />
              수기 등록
            </ButtonLink>
            <ButtonLink to="/reports/upload" variant="secondary">
              <Upload className="h-4 w-4" />
              엑셀 업로드
            </ButtonLink>
            <Button variant="secondary" size="icon" onClick={() => setSettingsOpen(true)}>
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SummaryCards
          summary={summary}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        <Card className="space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid gap-3 md:grid-cols-2 xl:flex xl:flex-1">
              <label className="relative xl:max-w-sm xl:flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="매장명 또는 POS 코드 검색"
                  className="h-12 w-full rounded-2xl border border-border bg-white/4 pl-11 pr-4 outline-none transition focus:border-primary"
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-3 text-sm">
                <span className="flex items-center gap-2 text-muted">
                  <Eye className="h-4 w-4" />
                  숨김 매장 표시
                </span>
                <input
                  checked={showHidden}
                  onChange={(event) => setShowHidden(event.target.checked)}
                  type="checkbox"
                  className="h-4 w-4 accent-[#6eb9ff]"
                />
              </label>
            </div>
            <div className="rounded-2xl border border-warning/20 bg-warning/8 px-4 py-3 text-sm text-warning">
              최근 재비교 발생 3건, 누락 데이터 경고 2건
            </div>
          </div>

          <StoresTable stores={filteredStores} />
        </Card>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Execution Note</p>
            <h3 className="mt-3 text-lg font-semibold">월간 비교 실행 기준</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>신고금액과 POS 기준 매출 차이를 1차 비교합니다.</li>
              <li>전자결제는 POS 합계와 VAN/PG 승인 합계를 별도로 확인합니다.</li>
              <li>외부 데이터는 이상 판정이 아니라 변동 해석을 위한 참고 정보로 사용합니다.</li>
            </ul>
          </Card>

          <Card className="border-danger/18">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-danger/10 p-3">
                <AlertTriangle className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-danger/80">Attention</p>
                <h3 className="mt-2 text-lg font-semibold">누락 데이터 경고</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  매출신고 누락 2건, POS 데이터 누락 1건이 존재합니다. 대기 상태 매장은 상세 검토 전 접수 현황을 우선 확인해야 합니다.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="매장 노출 설정"
        description="대시보드에 우선 표시할 매장을 관리합니다."
      >
        <div className="space-y-3">
          {stores.slice(0, 6).map((store) => (
            <label
              key={store.id}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3"
            >
              <div>
                <p className="font-medium">{store.name}</p>
                <p className="text-sm text-muted">{store.posCode}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={!store.hidden}
                className="h-4 w-4 accent-[#6eb9ff]"
              />
            </label>
          ))}
        </div>
      </Modal>
    </>
  )
}

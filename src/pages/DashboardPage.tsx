import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Eye,
  Plus,
  Search,
  Settings,
  Upload,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Button, ButtonLink } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Modal } from '../components/common/Modal'
import {
  NotificationToastStack,
  type PrototypeNotificationItem,
} from '../components/dashboard/NotificationToastStack'
import { StoresTable } from '../components/dashboard/StoresTable'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { getStatusSummary, stores } from '../data/mockData'

const NOTIFICATION_STORAGE_KEY = 'airport-pos-monitor:pc-alerts-enabled'

export function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showHidden, setShowHidden] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [pcAlertsEnabled, setPcAlertsEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(NOTIFICATION_STORAGE_KEY) === 'true'
  })
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | 'unsupported'
  >(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported'
    }
    return Notification.permission
  })
  const [toastItems, setToastItems] = useState<PrototypeNotificationItem[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(NOTIFICATION_STORAGE_KEY, String(pcAlertsEnabled))
  }, [pcAlertsEnabled])

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
  const permissionLabel =
    notificationPermission === 'unsupported'
      ? '미지원 브라우저'
      : notificationPermission === 'granted'
        ? '허용됨'
        : notificationPermission === 'denied'
          ? '차단됨'
          : '권한 요청 필요'
  const permissionToneClassName =
    notificationPermission === 'granted'
      ? 'border-success/25 bg-success/10 text-success'
      : notificationPermission === 'denied'
        ? 'border-danger/25 bg-danger/10 text-danger'
        : 'border-warning/25 bg-warning/10 text-warning'

  const dismissToast = (id: string) => {
    setToastItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const pushPrototypeNotification = (title: string, message: string) => {
    const notificationId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`

    setToastItems((currentItems) => [
      {
        id: notificationId,
        title,
        message,
        timeLabel: '방금 수신됨',
      },
      ...currentItems,
    ])

    window.setTimeout(() => {
      dismissToast(notificationId)
    }, 5000)

    if (
      pcAlertsEnabled &&
      notificationPermission === 'granted' &&
      typeof window !== 'undefined' &&
      'Notification' in window
    ) {
      new Notification(title, {
        body: message,
        tag: notificationId,
      })
    }
  }

  const handleRequestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationPermission('unsupported')
      return
    }

    const result = await Notification.requestPermission()
    setNotificationPermission(result)

    if (result === 'granted') {
      setPcAlertsEnabled(true)
      pushPrototypeNotification(
        'PC 알림이 활성화되었습니다',
        '이제 신고 데이터 수신 시 브라우저 알림과 인앱 알림을 함께 받을 수 있습니다.',
      )
    }
  }

  const handleSendPrototypeNotification = () => {
    pushPrototypeNotification(
      '스카이라운지 면세점 신고 데이터 수신',
      'A업체의 금월 신고 데이터가 접수되어 비교 준비 상태로 전환되었습니다.',
    )
  }

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
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="운영 설정"
              title="운영 설정"
            >
              <Settings className="h-4 w-4" />
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
        title="운영 설정"
        description="시연용 PC 알림과 대시보드 노출 설정을 함께 관리합니다."
      >
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/10 p-3">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Alert Channel</p>
                <h3 className="mt-2 text-lg font-semibold">PC 알림 설정</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  시연용 프로토타입입니다. 담당자가 브라우저 권한을 허용하면 신고 데이터 수신 시
                  시스템 알림과 인앱 토스트를 함께 확인할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
              <label className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#0b1320]/70 px-4 py-3">
                <div>
                  <p className="font-medium">PC 알림 수신</p>
                  <p className="mt-1 text-sm text-muted">
                    브라우저 알림 권한이 허용된 경우에만 실제 시스템 알림이 표시됩니다.
                  </p>
                </div>
                <input
                  checked={pcAlertsEnabled}
                  onChange={(event) => setPcAlertsEnabled(event.target.checked)}
                  type="checkbox"
                  className="h-4 w-4 accent-[#6eb9ff]"
                />
              </label>

              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${permissionToneClassName}`}
              >
                권한 상태: {permissionLabel}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={handleRequestNotificationPermission}
                disabled={notificationPermission === 'unsupported'}
              >
                권한 요청
              </Button>
              <Button
                onClick={handleSendPrototypeNotification}
                disabled={notificationPermission === 'unsupported'}
              >
                테스트 알림 보내기
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-3">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Store Visibility</p>
              <h3 className="mt-2 text-lg font-semibold">매장 노출 설정</h3>
            </div>
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
          </section>
        </div>
      </Modal>

      <NotificationToastStack items={toastItems} onDismiss={dismissToast} />
    </>
  )
}

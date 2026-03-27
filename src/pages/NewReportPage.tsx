import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Modal } from '../components/common/Modal'
import { Header } from '../components/layout/Header'
import { stores } from '../data/mockData'

export function NewReportPage() {
  const [posCode, setPosCode] = useState('')
  const [reportMonth, setReportMonth] = useState('2024-01')
  const [reportBasis, setReportBasis] = useState<'총매출' | '순매출'>('총매출')
  const [reportAmount, setReportAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [isCorrection, setIsCorrection] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const matchedStore = useMemo(
    () => stores.find((store) => store.posCode.toLowerCase() === posCode.toLowerCase()),
    [posCode],
  )

  function formatAmount(value: string) {
    const digits = value.replace(/[^\d]/g, '')
    return digits ? new Intl.NumberFormat('ko-KR').format(Number(digits)) : ''
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitting(false)
    setSuccessOpen(true)
  }

  return (
    <>
      <Header title="매출신고 수기 등록" description="단건 신고 접수 및 정정 입력">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm transition hover:bg-white/8"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드
        </Link>
      </Header>

      <div className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Single Report Intake</p>
            <h2 className="mt-2 text-2xl font-semibold">신고 정보를 직접 등록합니다.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              POS 매장코드를 기준으로 매장을 식별하고, 신고 기준과 신고금액을 입력합니다. 비교 데이터가 충분하면 자동으로 상태가 갱신됩니다.
            </p>
          </Card>

          <form className="space-y-6" onSubmit={onSubmit}>
            <Card className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">신고대상월</span>
                  <input
                    value={reportMonth}
                    onChange={(event) => setReportMonth(event.target.value)}
                    type="month"
                    className="h-12 w-full rounded-2xl border border-border bg-white/4 px-4 outline-none focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">POS 매장코드</span>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      value={posCode}
                      onChange={(event) => setPosCode(event.target.value)}
                      placeholder="예: POS-A1001"
                      className="h-12 w-full rounded-2xl border border-border bg-white/4 pl-11 pr-4 outline-none focus:border-primary"
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">매장명</span>
                  <input
                    value={matchedStore?.name ?? ''}
                    readOnly
                    placeholder="매장코드를 입력하면 자동 조회됩니다"
                    className="h-12 w-full rounded-2xl border border-border bg-white/3 px-4 text-muted outline-none"
                  />
                </label>
                <div>
                  <span className="mb-2 block text-sm text-muted">신고 기준</span>
                  <div className="grid grid-cols-2 gap-3">
                    {(['총매출', '순매출'] as const).map((basis) => (
                      <label
                        key={basis}
                        className={`rounded-2xl border px-4 py-3 text-sm ${
                          reportBasis === basis
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-white/4 text-muted'
                        }`}
                      >
                        <input
                          checked={reportBasis === basis}
                          onChange={() => setReportBasis(basis)}
                          type="radio"
                          className="sr-only"
                        />
                        {basis}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-muted">신고금액 (원)</span>
                <input
                  value={reportAmount}
                  onChange={(event) => setReportAmount(formatAmount(event.target.value))}
                  placeholder="0"
                  className="h-14 w-full rounded-2xl border border-border bg-white/4 px-4 text-right font-mono text-2xl outline-none focus:border-primary"
                />
              </label>

              <label className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-4">
                <div>
                  <p className="font-medium">정정 등록</p>
                  <p className="text-sm text-muted">기존 신고 내역을 수정하는 경우 사용합니다.</p>
                </div>
                <input
                  checked={isCorrection}
                  onChange={(event) => setIsCorrection(event.target.checked)}
                  type="checkbox"
                  className="h-4 w-4 accent-[#6eb9ff]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-muted">접수 메모</span>
                <textarea
                  value={memo}
                  onChange={(event) => setMemo(event.target.value)}
                  rows={4}
                  placeholder="필요 시 접수 배경이나 특이사항을 기록합니다."
                  className="w-full rounded-2xl border border-border bg-white/4 px-4 py-3 outline-none focus:border-primary"
                />
              </label>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <h3 className="text-lg font-semibold">저장 후 예상 처리</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  <li>필수 비교 데이터가 부족하면 대기 상태로 표시됩니다.</li>
                  <li>비교 조건을 만족하면 자동으로 월간 비교가 실행됩니다.</li>
                  <li>기존 접수와 중복될 경우 운영자 검토 후 정정 등록으로 관리합니다.</li>
                </ul>
              </Card>

              <Card className="flex flex-col justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Validation Hint</p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    매장코드가 정확하지 않으면 자동 조회가 되지 않습니다. 신고기준은 운영 정책에 따라 총매출 또는 순매출을 선택합니다.
                  </p>
                </div>
                <Button type="submit" className="mt-5 w-full" disabled={submitting}>
                  {submitting ? '저장 중...' : '신고 접수 저장'}
                </Button>
              </Card>
            </div>
          </form>
        </div>
      </div>

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="신고 접수가 완료되었습니다."
        description="저장된 데이터는 다음 비교 배치 또는 즉시 비교 로직에 반영됩니다."
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-success/20 bg-success/10 p-4 text-sm text-success">
            {matchedStore?.name ?? '미확인 매장'} / {reportMonth} / {reportBasis} 기준으로 접수되었습니다.
          </div>
          <Button className="w-full" onClick={() => setSuccessOpen(false)}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

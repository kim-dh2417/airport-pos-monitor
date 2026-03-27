import { KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showLocalLogin, setShowLocalLogin] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function simulateLogin() {
    setIsLoading(true)
    setError(null)
    await new Promise((resolve) => setTimeout(resolve, 900))
    navigate('/dashboard')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
      <section className="hidden flex-col justify-between border-r border-white/8 px-12 py-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-slate-950">
            <span className="text-lg font-black">P</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Airport</p>
            <h1 className="text-2xl font-semibold">POS Monitor</h1>
          </div>
        </div>

        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/80">Risk Detection Console</p>
          <h2 className="mt-6 text-5xl font-semibold leading-tight">
            공항 입점 매장 매출 이상 감지 관리자 시스템
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            매출신고, POS, VAN/PG 데이터를 함께 보고 이상 징후를 빠르게 선별하는 운영 화면입니다.
          </p>

          <div className="mt-10 grid gap-4">
            {[
              ['실시간 이상 감지', '신고금액과 POS 기준 매출 차이를 우선 분석합니다.'],
              ['정합성 검토', '전자결제 수단별로 POS와 VAN/PG 승인 합계를 별도 검토합니다.'],
              ['판단 근거 제공', '상태만이 아니라 왜 확인이 필요한지 근거를 함께 노출합니다.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-3xl border border-white/8 bg-white/4 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-2xl bg-primary/12 p-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted">공항 운영 담당자 · 감사/정산 담당자 · 시스템 운영자 전용</p>
      </section>

      <section className="flex items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md rounded-[32px] px-6 py-8 md:px-8">
          <p className="text-sm uppercase tracking-[0.32em] text-primary">Sign In</p>
          <h2 className="mt-4 text-3xl font-semibold">관리자 로그인</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            기본은 SSO 진입이며, 테스트를 위해 일반 로그인 폼도 함께 제공합니다.
          </p>

          <div className="mt-8 space-y-4">
            <Button className="w-full" onClick={simulateLogin} disabled={isLoading}>
              <KeyRound className="h-4 w-4" />
              {isLoading ? '인증 중...' : 'SSO 로그인'}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-x-0 top-1/2 border-t border-white/8" />
              <span className="relative mx-auto block w-fit bg-card px-3 text-xs uppercase tracking-[0.24em] text-muted">
                또는
              </span>
            </div>

            {!showLocalLogin ? (
              <Button variant="secondary" className="w-full" onClick={() => setShowLocalLogin(true)}>
                일반 로그인 사용
              </Button>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault()
                  await simulateLogin()
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">이메일</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      className="h-12 w-full rounded-2xl border border-border bg-white/4 pl-11 pr-4 outline-none transition focus:border-primary"
                      type="email"
                      defaultValue="ops@airport.co.kr"
                      required
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">비밀번호</span>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      className="h-12 w-full rounded-2xl border border-border bg-white/4 pl-11 pr-4 outline-none transition focus:border-primary"
                      type="password"
                      defaultValue="airport1234"
                      required
                    />
                  </div>
                </label>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>
              </form>
            )}

            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <p className="text-center text-xs leading-5 text-muted">
              운영자 권한이 없는 계정은 접근할 수 없습니다.
            </p>
          </div>
        </Card>
      </section>
    </div>
  )
}

import { FileSpreadsheet, FileText, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navigation = [
  { label: '메인 대시보드', to: '/dashboard', icon: LayoutDashboard },
  { label: '매출신고 수기 등록', to: '/reports/new', icon: FileText },
  { label: '엑셀 업로드', to: '/reports/upload', icon: FileSpreadsheet },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-lg lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-label="메뉴 열기"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <button
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="메뉴 닫기"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-[#08111d]/95 px-4 py-5 backdrop-blur-xl transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/6 bg-white/4 px-4 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-slate-950">
            <span className="text-lg font-black">P</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-primary">Airport</p>
            <h1 className="text-base font-semibold">POS Monitor</h1>
            <p className="text-xs text-muted">공항 입점 매장 이상 감지</p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/8 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Ops Snapshot</p>
          <p className="mt-2 text-2xl font-semibold">2024.01</p>
          <p className="mt-1 text-sm text-muted">신고 데이터와 POS/VAN 정합성 검토</p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-white/10 text-foreground shadow-inner'
                      : 'text-muted hover:bg-white/6 hover:text-foreground',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/8 bg-white/4 p-4 text-sm text-muted">
          <p className="font-medium text-foreground">운영 메모</p>
          <p className="mt-2 leading-6">
            대시보드에서는 위험도 순 정렬을 기본값으로 유지하고, 상세 화면에서 판단 근거를 먼저 노출합니다.
          </p>
        </div>
      </aside>
    </>
  )
}

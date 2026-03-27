import type { ReactNode } from 'react'
import { Bell, CalendarDays, ChevronDown } from 'lucide-react'

interface HeaderProps {
  title?: string
  description?: string
  month?: string
  children?: ReactNode
}

export function Header({ title, description, month = '2024년 1월', children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {title ? (
            <div className="min-w-[180px]">
              <h1 className="text-xl font-semibold">{title}</h1>
              {description ? <p className="text-sm text-muted">{description}</p> : null}
            </div>
          ) : null}
          {children}
        </div>

        <div className="flex items-center gap-3 self-end xl:self-auto">
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm text-muted md:flex">
            <CalendarDays className="h-4 w-4 text-primary" />
            기준 월 {month}
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/5 text-muted transition hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
              김
            </span>
            <span className="hidden md:block">
              <strong className="block text-left font-medium">김운영</strong>
              <span className="text-xs text-muted">운영 담당자</span>
            </span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>
    </header>
  )
}

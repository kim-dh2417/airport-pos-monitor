import { AlertTriangle, Building2, CheckCircle2, Clock3, Search } from 'lucide-react'
import { Card } from '../common/Card'
import { cn } from '../../lib/utils'

interface Summary {
  total: number
  waiting: number
  normal: number
  review: number
  suspicious: number
}

interface SummaryCardsProps {
  summary: Summary
  activeFilter: string | null
  onFilterChange: (value: string | null) => void
}

const items = [
  { key: 'total', label: '전체 매장', color: 'text-foreground', icon: Building2 },
  { key: 'waiting', label: '대기', color: 'text-waiting', icon: Clock3 },
  { key: 'normal', label: '정상', color: 'text-success', icon: CheckCircle2 },
  { key: 'review', label: '확인 필요', color: 'text-warning', icon: Search },
  { key: 'suspicious', label: '이상 의심', color: 'text-danger', icon: AlertTriangle },
] as const

export function SummaryCards({ summary, activeFilter, onFilterChange }: SummaryCardsProps) {
  return (
    <div className="section-grid">
      {items.map((item) => {
        const Icon = item.icon
        const value =
          item.key === 'total'
            ? summary.total
            : summary[item.key as Exclude<keyof Summary, 'total'>]
        const isActive = activeFilter === item.key || (!activeFilter && item.key === 'total')

        return (
          <button
            key={item.key}
            onClick={() => onFilterChange(item.key === 'total' ? null : item.key)}
            className="text-left"
          >
            <Card
              className={cn(
                'h-full border transition duration-150 hover:border-primary/45',
                isActive && 'border-primary/55 bg-primary/8',
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted">{item.label}</p>
                  <p className={cn('mt-3 text-4xl font-semibold', item.color)}>{value}</p>
                </div>
                <span className={cn('rounded-2xl p-3', isActive ? 'bg-white/10' : 'bg-white/5')}>
                  <Icon className={cn('h-5 w-5', item.color)} />
                </span>
              </div>
            </Card>
          </button>
        )
      })}
    </div>
  )
}

import { AlertTriangle, CheckCircle2, Clock3, Search } from 'lucide-react'
import type { StoreStatus } from '../../data/mockData'
import { cn } from '../../lib/utils'

const config = {
  waiting: {
    label: '대기',
    icon: Clock3,
    className: 'border-white/10 bg-white/6 text-waiting',
  },
  normal: {
    label: '정상',
    icon: CheckCircle2,
    className: 'border-success/25 bg-success/10 text-success',
  },
  review: {
    label: '확인 필요',
    icon: Search,
    className: 'border-warning/25 bg-warning/10 text-warning',
  },
  suspicious: {
    label: '이상 의심',
    icon: AlertTriangle,
    className: 'border-danger/25 bg-danger/10 text-danger',
  },
}

export function StatusBadge({ status }: { status: StoreStatus }) {
  const item = config[status]
  const Icon = item.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        item.className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </span>
  )
}

import { Bell, X } from 'lucide-react'
import { Button } from '../common/Button'

export interface PrototypeNotificationItem {
  id: string
  title: string
  message: string
  timeLabel: string
}

interface NotificationToastStackProps {
  items: PrototypeNotificationItem[]
  onDismiss: (id: string) => void
}

export function NotificationToastStack({
  items,
  onDismiss,
}: NotificationToastStackProps) {
  if (items.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="toast-enter pointer-events-auto rounded-2xl border border-primary/20 bg-[#0c1728]/96 p-4 shadow-[0_18px_40px_rgba(3,8,17,0.45)] backdrop-blur"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/12 p-2">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.timeLabel}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  aria-label="알림 닫기"
                  onClick={() => onDismiss(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground">{item.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { AlertCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Store } from '../../data/mockData'
import { formatCurrency, formatPercent } from '../../data/mockData'
import { cn } from '../../lib/utils'
import { StatusBadge } from '../common/StatusBadge'

export function StoresTable({ stores }: { stores: Store[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/6 text-sm">
          <thead className="bg-white/3 text-left text-muted">
            <tr>
              <th className="px-4 py-4 font-medium">순위</th>
              <th className="px-4 py-4 font-medium">상태</th>
              <th className="px-4 py-4 font-medium">매장명</th>
              <th className="px-4 py-4 font-medium">POS 코드</th>
              <th className="px-4 py-4 font-medium">신고 기준</th>
              <th className="px-4 py-4 text-right font-medium">신고금액</th>
              <th className="px-4 py-4 text-right font-medium">비교 기준값</th>
              <th className="px-4 py-4 text-right font-medium">차이율</th>
              <th className="px-4 py-4 font-medium">정합성</th>
              <th className="px-4 py-4 text-right font-medium">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-white/3">
                <td className="px-4 py-4 text-muted">#{store.rank}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={store.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">{store.name}</div>
                  {store.missingData ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-warning">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {store.missingData.join(', ')} 누락
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-4 font-mono text-muted">{store.posCode}</td>
                <td className="px-4 py-4">{store.reportBasis}</td>
                <td className="px-4 py-4 text-right font-mono">
                  {store.status === 'waiting' ? '-' : formatCurrency(store.reportAmount)}
                </td>
                <td className="px-4 py-4 text-right font-mono">
                  {store.comparisonAmount ? formatCurrency(store.comparisonAmount) : '-'}
                </td>
                <td
                  className={cn(
                    'px-4 py-4 text-right font-mono',
                    store.differenceRate <= -10 && 'text-danger',
                    store.differenceRate > -10 && store.differenceRate < -3 && 'text-warning',
                    store.differenceRate >= -3 && 'text-success',
                  )}
                >
                  {store.status === 'waiting' ? '-' : formatPercent(store.differenceRate)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-xs',
                      store.paymentConsistency === '정합'
                        ? 'border-success/20 bg-success/10 text-success'
                        : 'border-danger/20 bg-danger/10 text-danger',
                    )}
                  >
                    {store.paymentConsistency}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    to={`/stores/${store.posCode}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-muted transition hover:bg-white/6 hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

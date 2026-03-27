export type StoreStatus = 'waiting' | 'normal' | 'review' | 'suspicious'

export interface Store {
  id: string
  rank: number
  status: StoreStatus
  name: string
  posCode: string
  reportBasis: '총매출' | '순매출'
  reportAmount: number
  comparisonAmount: number
  differenceAmount: number
  differenceRate: number
  paymentConsistency: '정합' | '불일치'
  internalStatus: '접수완료' | '대기' | '비교완료' | '재비교필요'
  lastUpdated: string
  hidden?: boolean
  missingData?: string[]
}

export interface Issue {
  id: string
  date: string
  type: string
  amount: number
  explainability: '높음' | '중간' | '낮음'
  status: '미확인' | '확인중' | '해결됨'
}

export interface DailySales {
  date: string
  pos: number
  van: number
  reported: number
  signalLevel: 'neutral' | 'normal' | 'review' | 'suspicious'
}

export interface MonthlySales {
  month: string
  reportAmount: number
  comparisonAmount: number
}

export const stores: Store[] = [
  {
    id: '1',
    rank: 1,
    status: 'suspicious',
    name: '스카이라운지 면세점',
    posCode: 'POS-A1001',
    reportBasis: '총매출',
    reportAmount: 125000000,
    comparisonAmount: 158000000,
    differenceAmount: -33000000,
    differenceRate: -20.89,
    paymentConsistency: '불일치',
    internalStatus: '비교완료',
    lastUpdated: '2024-01-15 14:30',
  },
  {
    id: '2',
    rank: 2,
    status: 'suspicious',
    name: '에어포트 카페',
    posCode: 'POS-B2034',
    reportBasis: '순매출',
    reportAmount: 45000000,
    comparisonAmount: 52000000,
    differenceAmount: -7000000,
    differenceRate: -13.46,
    paymentConsistency: '불일치',
    internalStatus: '비교완료',
    lastUpdated: '2024-01-15 14:25',
  },
  {
    id: '3',
    rank: 3,
    status: 'review',
    name: '글로벌 편의점 T1',
    posCode: 'POS-C1022',
    reportBasis: '총매출',
    reportAmount: 32000000,
    comparisonAmount: 35000000,
    differenceAmount: -3000000,
    differenceRate: -8.57,
    paymentConsistency: '정합',
    internalStatus: '비교완료',
    lastUpdated: '2024-01-15 14:20',
  },
  {
    id: '4',
    rank: 4,
    status: 'review',
    name: '트래블 서점',
    posCode: 'POS-D3011',
    reportBasis: '순매출',
    reportAmount: 18500000,
    comparisonAmount: 19600000,
    differenceAmount: -1100000,
    differenceRate: -5.61,
    paymentConsistency: '정합',
    internalStatus: '재비교필요',
    lastUpdated: '2024-01-15 14:18',
  },
  {
    id: '5',
    rank: 5,
    status: 'normal',
    name: '면세 화장품 부티크',
    posCode: 'POS-E4410',
    reportBasis: '총매출',
    reportAmount: 86000000,
    comparisonAmount: 87200000,
    differenceAmount: -1200000,
    differenceRate: -1.38,
    paymentConsistency: '정합',
    internalStatus: '비교완료',
    lastUpdated: '2024-01-15 14:15',
  },
  {
    id: '6',
    rank: 6,
    status: 'normal',
    name: '활주로 패션 편집숍',
    posCode: 'POS-F5501',
    reportBasis: '순매출',
    reportAmount: 57000000,
    comparisonAmount: 56500000,
    differenceAmount: 500000,
    differenceRate: 0.88,
    paymentConsistency: '정합',
    internalStatus: '접수완료',
    lastUpdated: '2024-01-15 14:08',
    hidden: true,
  },
  {
    id: '7',
    rank: 7,
    status: 'waiting',
    name: '플라이트 델리',
    posCode: 'POS-G7782',
    reportBasis: '총매출',
    reportAmount: 0,
    comparisonAmount: 28000000,
    differenceAmount: 0,
    differenceRate: 0,
    paymentConsistency: '정합',
    internalStatus: '대기',
    lastUpdated: '2024-01-15 14:00',
    missingData: ['매출신고'],
  },
  {
    id: '8',
    rank: 8,
    status: 'waiting',
    name: '제트 스낵바',
    posCode: 'POS-H2019',
    reportBasis: '순매출',
    reportAmount: 0,
    comparisonAmount: 0,
    differenceAmount: 0,
    differenceRate: 0,
    paymentConsistency: '정합',
    internalStatus: '대기',
    lastUpdated: '2024-01-15 13:55',
    missingData: ['매출신고', 'POS 데이터'],
  },
]

export const monthlySales: MonthlySales[] = [
  { month: '2023-02', reportAmount: 95000000, comparisonAmount: 98000000 },
  { month: '2023-03', reportAmount: 102000000, comparisonAmount: 105000000 },
  { month: '2023-04', reportAmount: 110000000, comparisonAmount: 112000000 },
  { month: '2023-05', reportAmount: 98000000, comparisonAmount: 100000000 },
  { month: '2023-06', reportAmount: 115000000, comparisonAmount: 118000000 },
  { month: '2023-07', reportAmount: 125000000, comparisonAmount: 130000000 },
  { month: '2023-08', reportAmount: 135000000, comparisonAmount: 140000000 },
  { month: '2023-09', reportAmount: 120000000, comparisonAmount: 125000000 },
  { month: '2023-10', reportAmount: 118000000, comparisonAmount: 122000000 },
  { month: '2023-11', reportAmount: 130000000, comparisonAmount: 135000000 },
  { month: '2023-12', reportAmount: 145000000, comparisonAmount: 150000000 },
  { month: '2024-01', reportAmount: 125000000, comparisonAmount: 158000000 },
]

export const dailySales: DailySales[] = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1
  const basePos = 4200000 + day * 118000
  const baseVan = Math.round(basePos * (day % 2 === 0 ? 0.98 : 1.02))
  const signalLevel =
    [5, 18, 25].includes(day)
      ? 'suspicious'
      : [12, 19, 24].includes(day)
        ? 'review'
        : [2, 9, 16, 23, 30].includes(day)
          ? 'normal'
          : 'neutral'
  const baseReported =
    signalLevel === 'suspicious'
      ? Math.round(basePos * 0.84)
      : signalLevel === 'review'
        ? Math.round(basePos * 0.93)
        : signalLevel === 'normal'
          ? Math.round(basePos * 1.0)
          : Math.round(basePos * 0.985)

  return {
    date: `2024-01-${String(day).padStart(2, '0')}`,
    pos: basePos,
    van: baseVan,
    reported: baseReported,
    signalLevel,
  }
})

export const issues: Issue[] = [
  {
    id: '1',
    date: '2024-01-25',
    type: '현금 비중 급증',
    amount: 8500000,
    explainability: '낮음',
    status: '미확인',
  },
  {
    id: '2',
    date: '2024-01-18',
    type: '할인 급증',
    amount: 5200000,
    explainability: '중간',
    status: '확인중',
  },
  {
    id: '3',
    date: '2024-01-12',
    type: '자정 경계 거래',
    amount: 3100000,
    explainability: '높음',
    status: '해결됨',
  },
  {
    id: '4',
    date: '2024-01-05',
    type: 'VAN/PG 불일치',
    amount: 12000000,
    explainability: '낮음',
    status: '미확인',
  },
]

export function getStoreByCode(storeCode?: string) {
  return stores.find((store) => store.posCode === storeCode) ?? stores[0]
}

export function getStatusSummary(source = stores) {
  return {
    total: source.length,
    waiting: source.filter((store) => store.status === 'waiting').length,
    normal: source.filter((store) => store.status === 'normal').length,
    review: source.filter((store) => store.status === 'review').length,
    suspicious: source.filter((store) => store.status === 'suspicious').length,
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

export function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

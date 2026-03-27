import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  Trash2,
  Upload,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Modal } from '../components/common/Modal'
import { Header } from '../components/layout/Header'
import { cn } from '../lib/utils'

interface ValidationResult {
  totalRows: number
  validRows: number
  errorRows: number
  warningRows: number
  errors: Array<{
    row: number
    field: string
    value: string
    message: string
    type: 'error' | 'warning'
  }>
}

export function UploadReportPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [doneOpen, setDoneOpen] = useState(false)

  const validateFile = useCallback(async (selectedFile: File) => {
    setIsValidating(true)
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setResult({
      totalRows: 25,
      validRows: 22,
      errorRows: 2,
      warningRows: 1,
      errors: [
        {
          row: 8,
          field: '신고금액',
          value: 'abc',
          message: '숫자 형식이 아닙니다.',
          type: 'error',
        },
        {
          row: 15,
          field: 'POS 매장코드',
          value: 'POS-Z9999',
          message: '등록되지 않은 매장코드입니다.',
          type: 'error',
        },
        {
          row: 20,
          field: '신고금액',
          value: '0',
          message: '0원 신고입니다. 확인이 필요합니다.',
          type: 'warning',
        },
      ],
    })
    setIsValidating(false)
    setFile(selectedFile)
  }, [])

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragging(false)
      const dropped = event.dataTransfer.files[0]
      if (dropped) {
        await validateFile(dropped)
      }
    },
    [validateFile],
  )

  async function submit() {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setDoneOpen(true)
  }

  return (
    <>
      <Header title="매출신고 엑셀 업로드" description="다건 신고를 한 번에 검증하고 접수합니다.">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-3 py-2 text-sm transition hover:bg-white/8"
        >
          <ArrowLeft className="h-4 w-4" />
          대시보드
        </Link>
      </Header>

      <div className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Upload Guide</p>
              <h2 className="mt-2 text-2xl font-semibold">템플릿 기반 일괄 업로드</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                신고대상월, POS 매장코드, 신고기준, 신고금액 컬럼을 포함한 엑셀 파일을 업로드합니다.
              </p>
              <Button variant="secondary" className="mt-5">
                <Download className="h-4 w-4" />
                템플릿 다운로드
              </Button>
            </Card>

            <Card
              className={cn(
                'flex min-h-[260px] flex-col items-center justify-center border-2 border-dashed text-center transition',
                isDragging ? 'border-primary bg-primary/10' : 'border-border',
              )}
            >
              {!file ? (
                <div
                  className="w-full"
                  onDragOver={(event) => {
                    event.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault()
                    setIsDragging(false)
                  }}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-11 w-11 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">파일을 드래그하거나 선택하세요</h3>
                  <p className="mt-2 text-sm text-muted">허용 형식: .xlsx, .xls</p>
                  <label className="mt-5 inline-block">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      onChange={(event) => {
                        const selected = event.target.files?.[0]
                        if (selected) {
                          void validateFile(selected)
                        }
                      }}
                    />
                    <span className="inline-flex h-11 items-center rounded-xl border border-border bg-white/5 px-4 text-sm font-medium transition hover:bg-white/8">
                      파일 선택
                    </span>
                  </label>
                </div>
              ) : (
                <div className="w-full rounded-2xl border border-white/8 bg-white/4 p-5 text-left">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-success/12 p-3">
                        <FileSpreadsheet className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setFile(null)
                        setResult(null)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      파일 제거
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {isValidating ? (
            <Card>파일 구조와 필수 컬럼을 검증하는 중입니다...</Card>
          ) : null}

          {result ? (
            <Card className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ['전체 행', result.totalRows],
                  ['정상 행', result.validRows],
                  ['오류 행', result.errorRows],
                  ['경고 행', result.warningRows],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <p className="text-sm text-muted">{label}</p>
                    <p className="mt-3 text-3xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/8">
                <table className="min-w-full divide-y divide-white/8 text-sm">
                  <thead className="bg-white/4 text-left text-muted">
                    <tr>
                      <th className="px-4 py-3 font-medium">행</th>
                      <th className="px-4 py-3 font-medium">필드</th>
                      <th className="px-4 py-3 font-medium">값</th>
                      <th className="px-4 py-3 font-medium">메시지</th>
                      <th className="px-4 py-3 font-medium">구분</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {result.errors.map((item) => (
                      <tr key={`${item.row}-${item.field}`}>
                        <td className="px-4 py-3">{item.row}</td>
                        <td className="px-4 py-3">{item.field}</td>
                        <td className="px-4 py-3">{item.value}</td>
                        <td className="px-4 py-3">{item.message}</td>
                        <td
                          className={cn(
                            'px-4 py-3 font-medium',
                            item.type === 'error' ? 'text-danger' : 'text-warning',
                          )}
                        >
                          {item.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <Button onClick={submit} disabled={result.errorRows > 0 || isSubmitting}>
                  {isSubmitting ? '업로드 중...' : '정상 행만 접수'}
                </Button>
              </div>
            </Card>
          ) : null}
        </div>
      </div>

      <Modal
        open={doneOpen}
        onClose={() => setDoneOpen(false)}
        title="업로드 접수가 완료되었습니다."
        description="오류 없는 행만 접수되고, 검증 결과는 운영 로그에 저장됩니다."
      >
        <Button className="w-full" onClick={() => setDoneOpen(false)}>
          확인
        </Button>
      </Modal>
    </>
  )
}

import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/common/Button'
import { Card } from '../components/common/Card'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-semibold">페이지를 찾을 수 없습니다.</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          요청한 경로가 존재하지 않거나 이동되었습니다. 대시보드로 돌아가 다시 접근하세요.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink to="/dashboard">대시보드로 이동</ButtonLink>
        </div>
        <p className="mt-4 text-xs text-muted">
          로그인부터 다시 시작하려면 <Link to="/login" className="text-primary">/login</Link> 으로 이동하세요.
        </p>
      </Card>
    </div>
  )
}

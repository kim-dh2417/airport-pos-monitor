import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { NewReportPage } from './pages/NewReportPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { StoreDetailPage } from './pages/StoreDetailPage'
import { UploadReportPage } from './pages/UploadReportPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/stores/:storeCode" element={<StoreDetailPage />} />
        <Route path="/reports/new" element={<NewReportPage />} />
        <Route path="/reports/upload" element={<UploadReportPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

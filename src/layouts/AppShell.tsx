import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'

export function AppShell() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="min-h-screen lg:pl-72">
        <Outlet />
      </main>
    </div>
  )
}

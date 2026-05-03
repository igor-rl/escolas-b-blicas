import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TitleBar } from '../../../layouts/TitleBar'
import { Sidebar } from './Sidebar'
import { NAV_ITEMS } from '../../Shared/components/NavbarItens'

export function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-base)',
        overflow: 'hidden',
      }}
    >
      <TitleBar />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar 
          items={NAV_ITEMS} 
          active={location.pathname} 
          onNavigate={(path) => navigate(path)} 
        />

        <main
          style={{
            flex: 1,
            overflow: 'auto',
            background: 'var(--bg-base)',
          }}
        >
          {/* As páginas como DashboardPage ou TurmasPage aparecem aqui */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
import type { ReactNode } from 'react'
import { TitleBar } from './TitleBar'
import { Sidebar, type NavItem } from './Sidebar'

interface AppLayoutProps {
  navItems: NavItem[]
  activeNav: string
  onNavigate: (id: string) => void
  children: ReactNode
}

export function AppLayout({ navItems, activeNav, onNavigate, children }: AppLayoutProps) {
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
        <Sidebar items={navItems} active={activeNav} onNavigate={onNavigate} />

        <main
          style={{
            flex: 1,
            overflow: 'auto',
            background: 'var(--bg-base)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
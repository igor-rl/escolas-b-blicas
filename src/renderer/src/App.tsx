import { useState } from 'react'
import { ThemeProvider } from './hooks/useTheme'
import { AppLayout } from './layouts/AppLayout'
import type { NavItem } from './layouts/Sidebar'
import { DashboardPage } from './modules/Dashboard/DashboardPage'
import { TurmasPage } from './modules/Turmas/TurmasPage'

// ── Icons ─────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const TurmasIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const AlunosIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const GradesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const RelatoriosIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'turmas', label: 'Turmas', icon: <TurmasIcon /> },
  { id: 'alunos', label: 'Alunos', icon: <AlunosIcon /> },
  { id: 'grades', label: 'Grades', icon: <GradesIcon /> },
  { id: 'relatorios', label: 'Relatórios', icon: <RelatoriosIcon /> },
]

// ── Page router ───────────────────────────────────────────────────────────────

function PageRouter({ page }: { page: string }) {
  switch (page) {
    case 'turmas': return <TurmasPage />
    case 'dashboard':
    default:
      return <DashboardPage />
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <ThemeProvider>
      <AppLayout
        navItems={NAV_ITEMS}
        activeNav={activePage}
        onNavigate={setActivePage}
      >
        <PageRouter page={activePage} />
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
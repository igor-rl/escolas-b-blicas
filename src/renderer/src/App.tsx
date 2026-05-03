import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'

// Layouts
import { DashboardLayout } from './modules/Dashboard/layout/DashboardLayout'

// Páginas (Módulos)
import { RootLayout } from './layouts/AppLayout'
import { DashboardPage } from './modules/Dashboard/DashboardPage'
import { TurmasPage } from './modules/Turmas/TurmasPage'
import { TurmaProvider } from './modules/Dashboard/context/TurmaContext'
import ProgramacaoPage from './modules/Dashboard/ProgramacaoPage'

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<TurmasPage/>} />
          </Route>

          {/* O DashboardLayout cuida da estrutura visual (Sidebar) */}
          <Route path="/dashboard/:turmaId" element={
            <TurmaProvider> 
              {/* Agora o Provider envolve o Layout, então a Sidebar pode usar useTurma() */}
              <DashboardLayout />
            </TurmaProvider>
          }>
            {/* O DashboardLayout deve ter um <Outlet /> onde as rotas abaixo serão renderizadas */}
            <Route index element={<DashboardPage />} />
            <Route path="programacao" element={<ProgramacaoPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
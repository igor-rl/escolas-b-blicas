import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout'

// Páginas (Módulos)
import { RootLayout } from './layouts/AppLayout'
import { DashboardPage } from './modules/Dashboard/DashboardPage'
import { TurmasPage } from './modules/Turmas/TurmasPage'

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          {/* Rota Raiz - Sem Sidebar */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<TurmasPage/>} />
          </Route>

          {/* Grupo Dashboard - Com Sidebar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* O "index" significa que esta é a página padrão ao entrar em /dashboard */}
            <Route index element={<DashboardPage />} />
            {/* Se amanhã criar /dashboard/alunos, é só adicionar aqui */}
          </Route>

          {/* Redireciona qualquer rota inexistente para a home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
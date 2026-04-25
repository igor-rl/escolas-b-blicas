import { HomePage } from './modules/Home/HomePage'

// ── App Root ─────────────────────────────────────────────────────────────────
// Container limpo. Nesta fase, renderiza o módulo Home diretamente.
// Quando react-router-dom for adicionado, este arquivo se tornará o
// provedor de rotas (BrowserRouter / Routes / Route).

function App() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <HomePage />
    </main>
  )
}

export default App
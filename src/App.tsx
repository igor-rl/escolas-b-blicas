import { useEffect, useState } from 'react'

type UpdaterStatus = {
  status: 'checking' | 'available' | 'up-to-date' | 'downloading' | 'downloaded' | 'error'
  version?: string
  percent?: number
  message?: string
}

function App() {
  const [appVersion, setAppVersion] = useState<string>('...')
  const [platform, setPlatform] = useState<string>('...')
  const [updater, setUpdater] = useState<UpdaterStatus | null>(null)

  useEffect(() => {
    let unsubscribeUpdater: (() => void) | undefined

    const api = window.electronAPI
    if (api) {
      api.appVersion().then(setAppVersion).catch(() => setAppVersion('n/d'))
      api.appPlatform().then(setPlatform).catch(() => setPlatform('n/d'))
      unsubscribeUpdater = api.onUpdaterStatus(setUpdater)
    }

    return () => unsubscribeUpdater?.()
  }, [])

  const updaterLabel = (() => {
    if (!updater) return 'Inicializando verificação de atualização...'
    if (updater.status === 'downloading') return `Baixando atualização: ${updater.percent ?? 0}%`
    if (updater.status === 'available') {
      if (platform === 'darwin') {
        return `Nova versao disponivel: ${updater.version ?? 'n/d'} (baixe a nova release para atualizar no macOS)`
      }
      return `Nova versao disponivel: ${updater.version ?? 'n/d'}`
    }
    if (updater.status === 'downloaded') return `Atualização pronta para instalar: ${updater.version ?? 'n/d'}`
    if (updater.status === 'up-to-date') return 'Aplicativo atualizado.'
    if (updater.status === 'error') return updater.message ?? 'Falha ao buscar atualização.'
    return 'Verificando atualizações...'
  })()

  return (
    <main className="w-screen h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">EB</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">Bem-vindo ao Escolas Biblicas</h1>
        <p className="mt-4 text-slate-300 leading-relaxed">
          Em breve você receberá novas atualizações do app.
        </p>

        <div className="mt-8 grid gap-3 text-sm">
          <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3">
            <span className="text-slate-400">Versao:</span> <span>{appVersion}</span>
          </div>
          <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3">
            <span className="text-slate-400">Plataforma:</span> <span>{platform}</span>
          </div>
          <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3">
            <span className="text-slate-400">Auto-update:</span> <span>{updaterLabel}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
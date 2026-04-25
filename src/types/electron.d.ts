import type { CreateTurmaInput, Turma } from '../shared/types'

// Como este arquivo tem um `import`, o TypeScript o trata como módulo ES.
// Para augmentar tipos globais (Window) a partir de um módulo, é obrigatório
// usar `declare global {}` — sem isso o augment fica scoped ao módulo e
// window.electronAPI aparece como "não existe" para o restante do projeto.

declare global {
  interface UpdaterStatus {
    status: 'checking' | 'available' | 'up-to-date' | 'downloading' | 'downloaded' | 'error'
    version?: string
    percent?: number
    message?: string
  }

  interface ElectronAPI {
    // App Info
    appVersion: () => Promise<string>
    appPlatform: () => Promise<string>
    onFullScreenChange: (cb: (isFS: boolean) => void) => () => void

    // Updater
    onUpdaterStatus: (cb: (payload: UpdaterStatus) => void) => () => void

    // Turmas — CRUD completo
    getTurmas: () => Promise<Turma[]>
    getTurmaById: (id: string) => Promise<Turma>
    createTurma: (data: CreateTurmaInput) => Promise<Turma>
    updateTurma: (id: string, data: Partial<CreateTurmaInput>) => Promise<Turma>
    deleteTurma: (id: string) => Promise<{ success: boolean }>
  }

  interface Window {
    electronAPI?: ElectronAPI
  }
}

// Necessário para que o TypeScript trate este arquivo como módulo
// e o `declare global` acima funcione corretamente.
export {}
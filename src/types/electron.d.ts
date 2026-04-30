import type { CreateTurmaInput, Turma } from '../shared/types'

declare global {
  interface UpdaterStatus {
    status: 'checking' | 'available' | 'up-to-date' | 'downloading' | 'downloaded' | 'error'
    version?: string
    percent?: number
    message?: string
  }

  interface ElectronAPI {
    appVersion: () => Promise<string>
    appPlatform: () => Promise<string>
    onFullScreenChange: (cb: (isFS: boolean) => void) => () => void
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

export {}
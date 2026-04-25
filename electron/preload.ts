import { contextBridge, ipcRenderer } from 'electron'
import type { CreateTurmaInput, Turma } from '../src/shared/types'

contextBridge.exposeInMainWorld('electronAPI', {
  // App Info
  appVersion: () => ipcRenderer.invoke('app:version'),
  appPlatform: () => ipcRenderer.invoke('app:platform'),

  onFullScreenChange: (cb: (isFullScreen: boolean) => void) => {
    const handler = (_: any, isFS: boolean) => cb(isFS)
    ipcRenderer.on('window:fullscreen', handler)
    return () => ipcRenderer.removeListener('window:fullscreen', handler)
  },

  // Updater
  onUpdaterStatus: (cb: (payload: UpdaterStatus) => void) => {
    const handler = (_: any, payload: UpdaterStatus) => cb(payload)
    ipcRenderer.on('updater:status', handler)
    return () => ipcRenderer.removeListener('updater:status', handler)
  },

  // Turmas — CRUD completo
  getTurmas: (): Promise<Turma[]> =>
    ipcRenderer.invoke('db:turma:get-all'),

  getTurmaById: (id: string): Promise<Turma> =>
    ipcRenderer.invoke('db:turma:get-by-id', id),

  createTurma: (data: CreateTurmaInput): Promise<Turma> =>
    ipcRenderer.invoke('db:turma:create', data),

  updateTurma: (id: string, data: Partial<CreateTurmaInput>): Promise<Turma> =>
    ipcRenderer.invoke('db:turma:update', id, data),

  deleteTurma: (id: string): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('db:turma:delete', id),
})

// ── Types ────────────────────────────────────────────────────────────────────

interface UpdaterStatus {
  status: 'checking' | 'available' | 'up-to-date' | 'downloading' | 'downloaded' | 'error'
  version?: string
  percent?: number
  message?: string
}
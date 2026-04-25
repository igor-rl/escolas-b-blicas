import { contextBridge, ipcRenderer } from 'electron'

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
})

// Tipo exportado para o renderer
interface UpdaterStatus {
  status: 'checking' | 'available' | 'up-to-date' | 'downloading' | 'downloaded' | 'error'
  version?: string
  percent?: number
  message?: string
}
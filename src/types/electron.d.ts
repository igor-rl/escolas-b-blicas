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
}

declare interface Window {
  electronAPI?: ElectronAPI
}
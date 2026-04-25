import { app, BrowserWindow, shell, ipcMain } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'

const isDev = !app.isPackaged

// ── Auto-updater ──────────────────────────────────────────────────────────────

function setupAutoUpdater(win: BrowserWindow) {
  if (isDev) {
    autoUpdater.setFeedURL({
      provider: 'generic',
      url: 'http://localhost:8080'
    })
  }

  const isMac = process.platform === 'darwin'
  const isWindows = process.platform === 'win32'

  // Windows: fluxo completo de auto-update (download + install no quit).
  // macOS: apenas notifica que existe nova versao.
  autoUpdater.autoDownload = isWindows
  autoUpdater.autoInstallOnAppQuit = isWindows

  if (isMac) {
    ;(autoUpdater as any).allowPrerelease = false
    ;(autoUpdater as any).fullChangelog = false
  }

  const sendStatus = (payload: any) => {
    if (!win.isDestroyed()) {
      win.webContents.send('updater:status', payload)
    }
  }

  autoUpdater.on('checking-for-update', () => {
    sendStatus({ status: 'checking' })
  })

  autoUpdater.on('update-available', (info) => {
    sendStatus({ status: 'available', version: info.version })
  })

  autoUpdater.on('update-not-available', () => {
    sendStatus({ status: 'up-to-date' })
  })

  autoUpdater.on('download-progress', (progress) => {
    sendStatus({
      status: 'downloading',
      percent: Math.round(progress.percent),
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    sendStatus({ status: 'downloaded', version: info.version })
  })

  autoUpdater.on('error', (err) => {
    console.error('Auto-updater error:', err)
    sendStatus({ status: 'error', message: err.message })
  })

  // Verifica na abertura e depois a cada 4h
  autoUpdater.checkForUpdates().catch(console.error)
  setInterval(() => autoUpdater.checkForUpdates().catch(console.error), 4 * 60 * 60 * 1000)
}

// ── IPC ───────────────────────────────────────────────────────────────────────

function registerIpcHandlers() {

  // ── App Info ──────────────────────────────────────────────────────────────

  ipcMain.handle('app:version', () => app.getVersion())
  ipcMain.handle('app:platform', () => process.platform)

}

// ── Window ────────────────────────────────────────────────────────────────────

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#020617',
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: { ...details.responseHeaders, 'Access-Control-Allow-Origin': ['*'] },
    })
  })

  // Inicializa o auto-updater após a janela estar pronta
  win.webContents.on('did-finish-load', () => {
    setupAutoUpdater(win)
  })

  win.on('enter-full-screen', () => {
    win.webContents.send('window:fullscreen', true)
  })

  win.on('leave-full-screen', () => {
    win.webContents.send('window:fullscreen', false)
  })

  return win
}

// ── Boot ──────────────────────────────────────────────────────────────────────

app.whenReady().then(() => {
  registerIpcHandlers()
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
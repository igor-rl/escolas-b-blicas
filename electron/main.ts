import { app, BrowserWindow, shell, ipcMain } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'
import { bootstrapDatabase } from '../src/main/index'
import { registerDomainHandlers } from '../src/main/ipcHandlers'

const isDev = !app.isPackaged

// ── Auto-updater ──────────────────────────────────────────────────────────────

function setupAutoUpdater(win: BrowserWindow) {
  if (isDev) {
    autoUpdater.setFeedURL({ provider: 'generic', url: 'http://localhost:8080' })
  }

  const isMac = process.platform === 'darwin'
  const isWindows = process.platform === 'win32'

  autoUpdater.autoDownload = isWindows
  autoUpdater.autoInstallOnAppQuit = isWindows

  if (isMac) {
    ;(autoUpdater as any).allowPrerelease = false
    ;(autoUpdater as any).fullChangelog = false
  }

  const sendStatus = (payload: any) => {
    if (!win.isDestroyed()) win.webContents.send('updater:status', payload)
  }

  autoUpdater.on('checking-for-update', () => sendStatus({ status: 'checking' }))
  autoUpdater.on('update-available', (info) => sendStatus({ status: 'available', version: info.version }))
  autoUpdater.on('update-not-available', () => sendStatus({ status: 'up-to-date' }))
  autoUpdater.on('download-progress', (p) => sendStatus({ status: 'downloading', percent: Math.round(p.percent) }))
  autoUpdater.on('update-downloaded', (info) => sendStatus({ status: 'downloaded', version: info.version }))
  autoUpdater.on('error', (err) => {
    console.error('Auto-updater error:', err)
    sendStatus({ status: 'error', message: err.message })
  })

  autoUpdater.checkForUpdates().catch(console.error)
  setInterval(() => autoUpdater.checkForUpdates().catch(console.error), 4 * 60 * 60 * 1000)
}

// ── IPC ───────────────────────────────────────────────────────────────────────

function registerIpcHandlers() {
  // App Info
  ipcMain.handle('app:version', () => app.getVersion())
  ipcMain.handle('app:platform', () => process.platform)

  // Domain handlers (Turmas, etc.)
  registerDomainHandlers()
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
    win.loadFile(path.join(__dirname, '../../dist/index.html'))
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

  win.webContents.on('did-finish-load', () => setupAutoUpdater(win))

  win.on('enter-full-screen', () => win.webContents.send('window:fullscreen', true))
  win.on('leave-full-screen', () => win.webContents.send('window:fullscreen', false))

  return win
}

// ── Boot ──────────────────────────────────────────────────────────────────────

app
  .whenReady()
  .then(async () => {
    await bootstrapDatabase()
    registerIpcHandlers()
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  .catch((error) => {
    console.error('[bootstrap] Failed to initialize main process', error)
    app.quit()
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
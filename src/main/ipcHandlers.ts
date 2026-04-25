import { ipcMain } from 'electron'
import { TurmaService } from './services/TurmaService'
import type { CreateTurmaInput } from '../shared/types'

// ── registerDomainHandlers ────────────────────────────────────────────────────
// Cada handler tem UMA responsabilidade: receber o IPC, delegar ao service
// correto e devolver o resultado. Nenhuma query Prisma vive aqui.

export function registerDomainHandlers() {

  // ── Turmas ──────────────────────────────────────────────────────────────────

  /** Lista todas as turmas */
  ipcMain.handle('db:turma:get-all', async () => {
    return TurmaService.getAll()
  })

  /** Busca turma por id */
  ipcMain.handle('db:turma:get-by-id', async (_e, id: string) => {
    return TurmaService.getById(id)
  })

  /** Cria uma nova turma */
  ipcMain.handle('db:turma:create', async (_e, data: CreateTurmaInput) => {
    return TurmaService.create(data)
  })

  /** Atualiza escola e/ou descrição de uma turma existente */
  ipcMain.handle('db:turma:update', async (_e, id: string, data: Partial<CreateTurmaInput>) => {
    return TurmaService.update(id, data)
  })

  /** Remove uma turma */
  ipcMain.handle('db:turma:delete', async (_e, id: string) => {
    await TurmaService.delete(id)
    return { success: true }
  })
}
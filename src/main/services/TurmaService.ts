import { prisma } from '../database/client'
import type { CreateTurmaInput, Turma } from '../../shared/types'

// ── TurmaService ─────────────────────────────────────────────────────────────
// Toda query Prisma relacionada a Turmas vive aqui.
// O ipcHandlers.ts apenas delega para este service — nunca acessa o Prisma diretamente.

export const TurmaService = {
  /**
   * Retorna todas as turmas, ordenadas da mais recente para a mais antiga.
   */
  async getAll(): Promise<Turma[]> {
    return prisma.turma.findMany({
      orderBy: { createdAt: 'desc' },
    })
  },

  /**
   * Busca uma única turma pelo seu UUID.
   * Lança erro se não encontrada (Prisma P2025).
   */
  async getById(id: string): Promise<Turma> {
    return prisma.turma.findUniqueOrThrow({
      where: { id },
    })
  },

  /**
   * Cria uma nova turma e retorna o registro persistido.
   */
  async create(data: CreateTurmaInput): Promise<Turma> {
    return prisma.turma.create({
      data: {
        escola: data.escola,
        descricao: data.descricao,
      },
    })
  },

  /**
   * Atualiza escola e/ou descrição de uma turma existente.
   * Lança erro se o id não existir.
   */
  async update(id: string, data: Partial<CreateTurmaInput>): Promise<Turma> {
    return prisma.turma.update({
      where: { id },
      data: {
        ...(data.escola !== undefined && { escola: data.escola }),
        ...(data.descricao !== undefined && { descricao: data.descricao }),
      },
    })
  },

  /**
   * Remove uma turma pelo UUID.
   * Retorna void — o caller decide o que responder ao renderer.
   */
  async delete(id: string): Promise<void> {
    await prisma.turma.delete({ where: { id } })
  },
}
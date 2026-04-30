import { prisma } from '../database/client'
import type { CreateTurmaInput, Turma } from '../../shared/types'

export const TurmaService = {
  async getAll(): Promise<Turma[]> {
    return prisma.turma.findMany({
      orderBy: { createdAt: 'desc' },
    }) as Promise<Turma[]>
  },

  async getById(id: string): Promise<Turma> {
    return prisma.turma.findUniqueOrThrow({
      where: { id },
    }) as Promise<Turma>
  },

  async create(data: CreateTurmaInput): Promise<Turma> {
    return prisma.turma.create({
      data: {
        escola: data.escola,
        descricao: data.descricao,
        dataInicio: data.dataInicio ?? null,
        dataTermino: data.dataTermino ?? null,
      },
    }) as Promise<Turma>
  },

  async update(id: string, data: Partial<CreateTurmaInput>): Promise<Turma> {
    return prisma.turma.update({
      where: { id },
      data: {
        ...(data.escola !== undefined && { escola: data.escola }),
        ...(data.descricao !== undefined && { descricao: data.descricao }),
        ...(data.dataInicio !== undefined && { dataInicio: data.dataInicio }),
        ...(data.dataTermino !== undefined && { dataTermino: data.dataTermino }),
      },
    }) as Promise<Turma>
  },

  async delete(id: string): Promise<void> {
    await prisma.turma.delete({ where: { id } })
  },
}
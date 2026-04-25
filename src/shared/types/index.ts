export type EscolaSigla = 'EER' | 'PSS' | 'EAC'

export const ESCOLA_LABELS: Record<EscolaSigla, string> = {
  EER: 'EER — Evangelizadores do Reino',
  PSS: 'PSS — Pioneiro',
  EAC: 'EAC — Ancião',
}

export interface CreateTurmaInput {
  escola: EscolaSigla
  descricao: string
}

export interface Turma {
  id: string
  escola: string
  descricao: string | null
  createdAt: Date | string
}
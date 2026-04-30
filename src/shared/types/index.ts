export type EscolaSigla = 'EER' | 'PSS' | 'EAC'

export const ESCOLA_LABELS: Record<EscolaSigla, string> = {
  EER: 'EER — Evangelizadores do Reino',
  PSS: 'PSS — Pioneiro',
  EAC: 'EAC — Ancião',
}

export const ESCOLA_DURACAO: Record<EscolaSigla, { semanas: number; termina: 'domingo' | 'sabado' }> = {
  EER: { semanas: 8, termina: 'domingo' },
  PSS: { semanas: 1, termina: 'sabado' },  // 6 dias: seg–sáb
  EAC: { semanas: 1, termina: 'sabado' },  // 6 dias: seg–sáb
}

/**
 * Calcula a data de término com base na escola e data de início.
 * Toda turma começa na segunda-feira.
 * EER: 8 semanas → termina no domingo da 8ª semana (início + 55 dias)
 * PSS/EAC: 6 dias → termina no sábado (início + 5 dias)
 */
export function calcularDataTermino(escola: EscolaSigla, dataInicio: Date): Date {
  const d = new Date(dataInicio)
  if (escola === 'EER') {
    d.setDate(d.getDate() + 55) // 8 semanas − 1 dia (seg → dom da 8ª)
  } else {
    d.setDate(d.getDate() + 5) // seg → sáb (6 dias)
  }
  return d
}

/** Retorna a próxima segunda-feira a partir de hoje */
export function proximaSegunda(): Date {
  const hoje = new Date()
  const dia = hoje.getDay() // 0=dom, 1=seg...
  const diff = dia === 1 ? 0 : dia === 0 ? 1 : 8 - dia
  const seg = new Date(hoje)
  seg.setDate(hoje.getDate() + diff)
  seg.setHours(0, 0, 0, 0)
  return seg
}

/** Formata Date para input[type=date] (YYYY-MM-DD) */
export function toDateInput(d: Date): string {
  return d.toISOString().split('T')[0]
}

/** Formata Date para exibição pt-BR */
export function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export interface CreateTurmaInput {
  escola: EscolaSigla
  descricao: string
  dataInicio?: string   // ISO date string YYYY-MM-DD
  dataTermino?: string  // calculado automaticamente
}

export interface Turma {
  id: string
  escola: string
  descricao: string | null
  dataInicio: string | null
  dataTermino: string | null
  createdAt: Date | string
}
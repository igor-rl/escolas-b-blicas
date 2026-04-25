import { useState } from 'react'
import type { CreateTurmaInput, EscolaSigla, Turma } from '../../../../../shared/types'
import { ESCOLA_LABELS } from '../../../../../shared/types'

interface TurmaFormProps {
  /** Se passado, o form opera em modo edição pré-populado */
  turma?: Turma
  isSaving: boolean
  onSave: (data: CreateTurmaInput) => void
  onCancel: () => void
}

const ESCOLAS: EscolaSigla[] = ['EER', 'PSS', 'EAC']

export function TurmaForm({ turma, isSaving, onSave, onCancel }: TurmaFormProps) {
  const isEditing = !!turma
  const [escola, setEscola] = useState<EscolaSigla>(
    (turma?.escola as EscolaSigla) ?? 'EER'
  )
  const [descricao, setDescricao] = useState(turma?.descricao ?? '')

  const handleSave = () => {
    const trimmed = descricao.trim()
    if (!trimmed) return
    onSave({ escola, descricao: trimmed })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Escola
        </label>
        <select
          value={escola}
          onChange={(e) => setEscola(e.target.value as EscolaSigla)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all cursor-pointer"
        >
          {ESCOLAS.map((s) => (
            <option key={s} value={s}>
              {ESCOLA_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Descrição
        </label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Ex: Turma 193 — Março 2025"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all"
          autoFocus
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSave}
          disabled={isSaving || !descricao.trim()}
          className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isSaving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:border-slate-500 hover:text-slate-200 disabled:opacity-40 active:scale-[0.98]"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
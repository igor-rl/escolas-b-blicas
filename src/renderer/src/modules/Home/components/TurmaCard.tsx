import type { Turma, CreateTurmaInput } from '../../../../../shared/types'
import { TurmaForm } from './TurmaCreateForm'
import type { ViewState } from '../hooks/useTurmas'

const ESCOLA_COLORS: Record<string, string> = {
  EER: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  PSS: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  EAC: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

// ── TurmaListItem ─────────────────────────────────────────────────────────────

interface TurmaListItemProps {
  turma: Turma
  onEdit: (turma: Turma) => void
  onDelete: (id: string) => void
}

function TurmaListItem({ turma, onEdit, onDelete }: TurmaListItemProps) {
  const colorClass =
    ESCOLA_COLORS[turma.escola] ?? 'bg-slate-700/30 text-slate-400 border-slate-700'
  const date = new Date(turma.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 transition-all hover:border-slate-700 hover:bg-slate-800/60">
      <span
        className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wider ${colorClass}`}
      >
        {turma.escola}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-200">{turma.descricao || '—'}</p>
        <p className="text-[11px] text-slate-600">{date}</p>
      </div>

      {/* Ações — visíveis no hover */}
      <div className="flex shrink-0 gap-1 opacity-0 transition-all group-hover:opacity-100">
        {/* Editar */}
        <button
          onClick={() => onEdit(turma)}
          className="rounded p-1.5 text-slate-600 transition-colors hover:bg-slate-700 hover:text-slate-200"
          title="Editar turma"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        {/* Excluir */}
        <button
          onClick={() => onDelete(turma.id)}
          className="rounded p-1.5 text-slate-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
          title="Excluir turma"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── TurmaCard ─────────────────────────────────────────────────────────────────

interface TurmaCardProps {
  turmas: Turma[]
  viewState: ViewState
  editingTurma: Turma | null
  isLoading: boolean
  isSaving: boolean
  error: string | null
  onNewTurma: () => void
  onCreate: (data: CreateTurmaInput) => void
  onUpdate: (id: string, data: CreateTurmaInput) => void
  onEdit: (turma: Turma) => void
  onCancel: () => void
  onDelete: (id: string) => void
}

const HEADER_TITLES: Record<ViewState, string> = {
  list: 'Turmas',
  create: 'Nova Turma',
  edit: 'Editar Turma',
}

export function TurmaCard({
  turmas,
  viewState,
  editingTurma,
  isLoading,
  isSaving,
  error,
  onNewTurma,
  onCreate,
  onUpdate,
  onEdit,
  onCancel,
  onDelete,
}: TurmaCardProps) {
  const isForm = viewState === 'create' || viewState === 'edit'

  const handleSave = (data: CreateTurmaInput) => {
    if (viewState === 'edit' && editingTurma) {
      onUpdate(editingTurma.id, data)
    } else {
      onCreate(data)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Módulo Acadêmico
          </p>
          <h2 className="mt-0.5 text-base font-semibold text-slate-100">
            {HEADER_TITLES[viewState]}
          </h2>
        </div>
        {viewState === 'list' && (
          <button
            onClick={onNewTurma}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-all hover:border-amber-500/40 hover:bg-amber-500/20 active:scale-95"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nova Turma
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        {isForm ? (
          <TurmaForm
            turma={editingTurma ?? undefined}
            isSaving={isSaving}
            onSave={handleSave}
            onCancel={onCancel}
          />
        ) : isLoading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-800/50" />
            ))}
          </div>
        ) : turmas.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Nenhuma turma cadastrada</p>
              <p className="mt-0.5 text-xs text-slate-600">Clique em "Nova Turma" para começar.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {turmas.map((t) => (
              <TurmaListItem key={t.id} turma={t} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {viewState === 'list' && turmas.length > 0 && (
        <div className="border-t border-slate-800 px-5 py-3">
          <p className="text-[11px] text-slate-600">
            {turmas.length} {turmas.length === 1 ? 'turma cadastrada' : 'turmas cadastradas'}
          </p>
        </div>
      )}
    </div>
  )
}
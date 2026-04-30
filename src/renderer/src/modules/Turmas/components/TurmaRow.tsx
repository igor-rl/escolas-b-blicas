import type { Turma } from '../../../../../shared/types'
import { formatDate } from '../../../../../shared/types'

interface TurmaRowProps {
  turma: Turma
  onEdit: (turma: Turma) => void
  onDelete: (id: string) => void
}

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
)

export function TurmaRow({ turma, onEdit, onDelete }: TurmaRowProps) {
  return (
    <div
      className="turma-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 5,
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        transition: 'border-color 0.12s, background 0.12s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-hover)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-strong)'
        const actions = e.currentTarget.querySelector('.row-actions') as HTMLElement
        if (actions) actions.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-surface)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
        const actions = e.currentTarget.querySelector('.row-actions') as HTMLElement
        if (actions) actions.style.opacity = '0'
      }}
    >
      {/* Badge escola */}
      <span className={`eb-badge badge-${turma.escola}`}>
        {turma.escola}
      </span>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {turma.descricao || '—'}
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-tertiary)', margin: '2px 0 0', display: 'flex', gap: 6 }}>
          {turma.dataInicio && (
            <>
              <span>{formatDate(turma.dataInicio)}</span>
              {turma.dataTermino && (
                <>
                  <span style={{ color: 'var(--text-disabled)' }}>→</span>
                  <span>{formatDate(turma.dataTermino)}</span>
                </>
              )}
            </>
          )}
          {!turma.dataInicio && (
            <span>{formatDate(turma.createdAt)}</span>
          )}
        </p>
      </div>

      {/* Actions */}
      <div
        className="row-actions"
        style={{
          display: 'flex',
          gap: 2,
          opacity: 0,
          transition: 'opacity 0.12s',
        }}
      >
        <button
          className="eb-icon-btn"
          onClick={() => onEdit(turma)}
          title="Editar"
        >
          <EditIcon />
        </button>
        <button
          className="eb-icon-btn danger"
          onClick={() => onDelete(turma.id)}
          title="Excluir"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}
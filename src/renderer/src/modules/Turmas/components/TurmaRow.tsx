import type { Turma } from '../../../../../shared/types'
import { formatDate } from '../../../../../shared/types'
import { useNavigate } from 'react-router-dom'

interface TurmaRowProps {
  turma: Turma
}

export function TurmaRow({ turma }: TurmaRowProps) {

  const handleClick = () => {
    navigate(`/dashboard/${turma.id}`)
  }

  const navigate = useNavigate()

  return (
    <div
      className="turma-row"
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 5,
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        transition: 'border-color 0.12s, background 0.12s',
        cursor: 'pointer',
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
    </div>
  )
}
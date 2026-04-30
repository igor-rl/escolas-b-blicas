import { useTurmas } from './hooks/useTurmas'
import { TurmaRow } from './components/TurmaRow'
import { TurmaForm } from './components/TurmaForm'
import type { CreateTurmaInput } from '../../../../shared/types'

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export function TurmasPage() {
  const {
    turmas, viewState, editingTurma,
    isLoading, isSaving, error,
    setViewState, createTurma,
    startEditing, updateTurma,
    deleteTurma, cancelForm,
  } = useTurmas()

  const isForm = viewState === 'create' || viewState === 'edit'

  const handleSave = (data: CreateTurmaInput) => {
    if (viewState === 'edit' && editingTurma) {
      updateTurma(editingTurma.id, data)
    } else {
      createTurma(data)
    }
  }

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '24px 24px' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isForm && (
            <button
              className="eb-icon-btn"
              onClick={cancelForm}
              title="Voltar"
            >
              <ArrowIcon />
            </button>
          )}
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
              Módulo Acadêmico
            </p>
            <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '2px 0 0', letterSpacing: '-0.01em' }}>
              {viewState === 'create' ? 'Nova Turma' : viewState === 'edit' ? 'Editar Turma' : 'Turmas'}
            </h1>
          </div>
        </div>

        {viewState === 'list' && (
          <button
            className="eb-btn eb-btn-primary"
            onClick={() => setViewState('create')}
          >
            <PlusIcon />
            Nova Turma
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            marginBottom: 14,
            padding: '8px 12px',
            borderRadius: 5,
            border: '1px solid var(--danger-border)',
            background: 'var(--danger-muted)',
            fontSize: 12,
            color: 'var(--danger)',
          }}
        >
          {error}
        </div>
      )}

      {/* Content */}
      {isForm ? (
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: 20,
          }}
        >
          <TurmaForm
            turma={editingTurma ?? undefined}
            isSaving={isSaving}
            onSave={handleSave}
            onCancel={cancelForm}
          />
        </div>
      ) : isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 52,
                borderRadius: 5,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                animation: 'pulse 1.5s ease-in-out infinite',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      ) : turmas.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-disabled)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', margin: 0 }}>
              Nenhuma turma cadastrada
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
              Clique em "Nova Turma" para começar.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {turmas.map((t) => (
            <TurmaRow
              key={t.id}
              turma={t}
              onEdit={startEditing}
              onDelete={deleteTurma}
            />
          ))}
        </div>
      )}

      {/* Footer count */}
      {viewState === 'list' && turmas.length > 0 && (
        <p style={{ marginTop: 14, fontSize: 11, color: 'var(--text-disabled)', textAlign: 'right' }}>
          {turmas.length} {turmas.length === 1 ? 'turma' : 'turmas'}
        </p>
      )}
    </div>
  )
}
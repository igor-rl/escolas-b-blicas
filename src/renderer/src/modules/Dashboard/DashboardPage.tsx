import { useParams } from 'react-router-dom'
import { StatCard } from './components/StartCard'


export function DashboardPage() {
  const { turmaId } = useParams()
  
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 24px' }}>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
          Visão Geral
        </p>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '2px 0 0', letterSpacing: '-0.01em' }}>
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
        <StatCard label="Turmas" value="—" sub="Total cadastrado" />
        <StatCard label="Alunos" value="—" sub="Enturmados" />
        <StatCard label="Em andamento" value="—" sub="Turmas ativas" />
      </div>

      {/* Quick access */}
      <div
        style={{
          borderRadius: 6,
          border: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>
            Acesso rápido
          </p>
        </div>
        <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { label: 'Gerenciar Turmas', sub: 'Criar e editar turmas' },
            { label: 'Alunos', sub: 'Enturmar e gerenciar alunos' },
            { label: 'Professores', sub: 'Designações e vínculos' },
            { label: 'Relatórios', sub: 'Exportar PDFs e frequências' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 5,
                cursor: 'default',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-hover)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
            >
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-tertiary)', margin: '1px 0 0' }}>
                  {item.sub}
                </p>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-disabled)' }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Version note */}
      <p style={{ marginTop: 20, fontSize: 11, color: 'var(--text-disabled)', textAlign: 'center' }}>
        EB · Escolas Bíblicas · sistema local offline-first
      </p>
    </div>
  )
}
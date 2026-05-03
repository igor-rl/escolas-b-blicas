import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTurma } from '../context/TurmaContext'
import { ArrowLeftRight, Plus, ChevronDown } from 'lucide-react'

export function TurmaSelector({ collapsed }: { collapsed: boolean }) {
  const { turma } = useTurma()
  const navigate = useNavigate()
  const [outrasTurmas, setOutrasTurmas] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getTurmas().then(setOutrasTurmas)
    }
  }, [])

  return (
    <div style={{ position: 'relative', padding: '0 8px', marginBottom: '12px' }}>
      {/* Botão Principal usando suas classes .eb-btn */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="eb-btn" // Sua classe global de botão
        style={{
          width: '100%',
          padding: collapsed ? '6px' : '6px 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderColor: isOpen ? 'var(--border-strong)' : 'var(--border)',
          background: isOpen ? 'var(--bg-hover)' : 'var(--bg-elevated)',
        }}
      >
        <ArrowLeftRight 
          size={14} 
          style={{ 
            flexShrink: 0, 
            color: 'var(--accent)',
            opacity: isOpen ? 1 : 0.8 
          }} 
        />
        
        {!collapsed && (
          <>
            <span style={{ 
              flex: 1, 
              textAlign: 'left', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              color: 'var(--text-primary)'
            }}>
              {turma.descricao}
            </span>
            <ChevronDown 
              size={12} 
              style={{ 
                color: 'var(--text-tertiary)',
                transition: 'transform 0.2s',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
              }} 
            />
          </>
        )}
      </button>

      {/* Dropdown Menu usando suas classes .eb-elevated */}
      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 999 }} 
            onClick={() => setIsOpen(false)} 
          />
          
          <div 
            className="eb-elevated" // Sua classe global de superfície elevada
            style={{
              position: 'absolute',
              left: collapsed ? '52px' : '8px',
              top: collapsed ? '0' : '100%',
              width: '200px',
              marginTop: collapsed ? '0' : '4px',
              borderRadius: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 1000,
              overflow: 'hidden',
              animation: 'fadeIn 0.1s ease-out'
            }}
          >
            {/* Seção de Ações Rápidas */}
            <div style={{ padding: '4px', borderBottom: '1px solid var(--border-subtle)' }}>
              <button 
                onClick={() => { navigate('/'); setIsOpen(false); }}
                className="eb-btn"
                style={{ 
                  width: '100%', 
                  border: 'none', 
                  background: 'transparent', 
                  justifyContent: 'flex-start',
                  padding: '6px 8px'
                }}
              >
                <Plus size={14} /> 
                <span>Nova Turma</span>
              </button>
            </div>

            {/* Lista de Turmas */}
            <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '4px' }}>
              <div className="eb-label" style={{ padding: '4px 8px', margin: 0, fontSize: '9px' }}>
                Trocar para
              </div>
              {outrasTurmas
                .filter(t => t.id !== turma.id)
                .map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      navigate(`/dashboard/${t.id}`)
                      setIsOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'block',
                      transition: 'background 0.1s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {t.descricao}
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
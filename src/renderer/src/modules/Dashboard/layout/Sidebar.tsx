import { useState } from 'react'
import { useTurma } from '../context/TurmaContext'
import { TurmaSelector } from './TurmaSelector'

export type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  items: NavItem[]
  active: string
  onNavigate: (id: string) => void
}

const ChevronIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{
      transition: 'transform 0.2s',
      transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
    }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export function Sidebar({ items, active, onNavigate }: SidebarProps) {

  const [collapsed, setCollapsed] = useState(false)

  const width = collapsed ? 48 : 188

  return (
    <aside
      style={{
        width,
        minWidth: width,
        height: '100%',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1), min-width 0.2s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Nav items */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
      <TurmaSelector collapsed={collapsed} />
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: collapsed ? '7px 0' : '7px 10px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive ? 'var(--bg-hover)' : 'transparent',
                border: 'none',
                borderRadius: 0,
                cursor: 'pointer',
                color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                fontSize: 12,
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.01em',
                transition: 'background 0.12s, color 0.12s',
                position: 'relative',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-tertiary)'
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 2,
                    height: 14,
                    background: 'var(--accent)',
                    borderRadius: '0 2px 2px 0',
                  }}
                />
              )}
              <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              {!collapsed && (
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '6px 0' }}>
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: collapsed ? '6px 0' : '6px 10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-disabled)',
            fontSize: 11,
            transition: 'color 0.12s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-tertiary)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-disabled)' }}
          title={collapsed ? 'Expandir' : 'Recolher'}
        >
          <ChevronIcon collapsed={collapsed} />
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </aside>
  )
}
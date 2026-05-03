
export const StatCard = ({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub?: string
}) => (
  <div
    style={{
      padding: '14px 16px',
      borderRadius: 6,
      border: '1px solid var(--border)',
      background: 'var(--bg-surface)',
    }}
  >
    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
      {label}
    </p>
    <p style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: '4px 0 0', letterSpacing: '-0.02em' }}>
      {value}
    </p>
    {sub && (
      <p style={{ fontSize: 11, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>{sub}</p>
    )}
  </div>
)
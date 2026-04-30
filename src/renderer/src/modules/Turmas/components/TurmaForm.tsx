import { useState, useEffect } from 'react'
import type { CreateTurmaInput, EscolaSigla } from '../../../../../shared/types'
import {
  ESCOLA_LABELS,
  calcularDataTermino,
  proximaSegunda,
  toDateInput,
  formatDate,
} from '../../../../../shared/types'

interface TurmaFormProps {
  turma?: {
    escola: string
    descricao: string | null
    dataInicio: string | null
    dataTermino: string | null
  }
  isSaving: boolean
  onSave: (data: CreateTurmaInput) => void
  onCancel: () => void
}

const ESCOLAS: EscolaSigla[] = ['EER', 'PSS', 'EAC']

const ESCOLA_DESC: Record<EscolaSigla, string> = {
  EER: '8 semanas · seg → dom',
  PSS: '6 dias · seg → sáb',
  EAC: '6 dias · seg → sáb',
}

export function TurmaForm({ turma, isSaving, onSave, onCancel }: TurmaFormProps) {
  const isEditing = !!turma

  const [escola, setEscola] = useState<EscolaSigla>(
    (turma?.escola as EscolaSigla) ?? 'EER'
  )
  const [descricao, setDescricao] = useState(turma?.descricao ?? '')
  const [dataInicio, setDataInicio] = useState<string>(
    turma?.dataInicio ?? toDateInput(proximaSegunda())
  )
  const [dataTermino, setDataTermino] = useState<string>('')

  // Recalcula término ao mudar escola ou data de início
  useEffect(() => {
    if (!dataInicio) { setDataTermino(''); return }
    const inicio = new Date(dataInicio + 'T00:00:00')
    const termino = calcularDataTermino(escola, inicio)
    setDataTermino(toDateInput(termino))
  }, [escola, dataInicio])

  // Quando muda escola, reseta data de início para próxima segunda
  const handleEscolaChange = (e: EscolaSigla) => {
    setEscola(e)
  }

  // Garante que a data selecionada é sempre uma segunda-feira
  const handleDataChange = (value: string) => {
    if (!value) { setDataInicio(''); return }
    const d = new Date(value + 'T00:00:00')
    // Ajusta para segunda-feira mais próxima
    const dow = d.getDay()
    if (dow !== 1) {
      const diff = dow === 0 ? 1 : 8 - dow
      d.setDate(d.getDate() + diff)
    }
    setDataInicio(toDateInput(d))
  }

  const canSave = descricao.trim() && dataInicio

  const handleSave = () => {
    if (!canSave) return
    onSave({
      escola,
      descricao: descricao.trim(),
      dataInicio,
      dataTermino,
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Escola */}
      <div>
        <label className="eb-label">Escola</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ESCOLAS.map((s) => (
            <label
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 10px',
                borderRadius: 5,
                border: `1px solid ${escola === s ? 'var(--accent-border)' : 'var(--border)'}`,
                background: escola === s ? 'var(--accent-muted)' : 'var(--bg-base)',
                cursor: 'pointer',
                transition: 'all 0.12s',
              }}
            >
              <input
                type="radio"
                name="escola"
                value={s}
                checked={escola === s}
                onChange={() => handleEscolaChange(s)}
                style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>
                  {ESCOLA_LABELS[s]}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 1 }}>
                  {ESCOLA_DESC[s]}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="eb-label">Descrição / Turma</label>
        <input
          className="eb-input"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Ex: Turma 193 — Março 2025"
          autoFocus
        />
      </div>

      {/* Data de início */}
      <div>
        <label className="eb-label">Data de início</label>
        <input
          className="eb-input"
          type="date"
          value={dataInicio}
          onChange={(e) => handleDataChange(e.target.value)}
          style={{ colorScheme: 'inherit' }}
        />
        <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 5 }}>
          Toda turma inicia na segunda-feira. Datas serão ajustadas automaticamente.
        </p>
      </div>

      {/* Data de término (calculada) */}
      {dataTermino && (
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 5,
            border: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Término calculado</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
            {formatDate(dataTermino)}
          </span>
        </div>
      )}

      {/* Ações */}
      <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
        <button
          className="eb-btn eb-btn-primary"
          onClick={handleSave}
          disabled={isSaving || !canSave}
          style={{ flex: 1 }}
        >
          {isSaving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar Turma'}
        </button>
        <button
          className="eb-btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
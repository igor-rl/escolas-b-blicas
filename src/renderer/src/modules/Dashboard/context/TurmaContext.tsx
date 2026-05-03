import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Turma } from '../../../../../shared/types'

interface TurmaContextData {
  turma: Turma
  loading: boolean
}

const TurmaContext = createContext<TurmaContextData | undefined>(undefined)

// Mudamos para receber children, assim ele funciona como um "wrapper" fixo
export function TurmaProvider({ children }: { children: React.ReactNode }) {
  const { turmaId } = useParams<{ turmaId: string }>()
  const navigate = useNavigate()
  const [turma, setTurma] = useState<Turma | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTurma() {
      if (!turmaId) {
        navigate('/', { replace: true })
        return
      }
  
      try {
        setLoading(true)
        if (window.electronAPI) {
          const data = await window.electronAPI.getTurmaById(turmaId)
          if (!data) throw new Error("Turma não encontrada")
          setTurma(data)
        }
      } catch (error) {
        console.error("Erro ao buscar turma no SQLite:", error)
        navigate('/', { replace: true })
      } finally {
        setLoading(false)
      }
    }
  
    loadTurma()
  }, [turmaId, navigate])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-background)]">
        <span className="text-[var(--text-tertiary)] animate-pulse">Carregando turma...</span>
      </div>
    )
  }

  if (!turma) return null

  return (
    <TurmaContext.Provider value={{ turma, loading }}>
      {children}
    </TurmaContext.Provider>
  )
}

export const useTurma = () => {
  const context = useContext(TurmaContext)
  if (context === undefined) {
    // Isso ajuda a debugar: se a tela ficar branca, você verá este erro no console
    throw new Error('useTurma deve ser usado dentro de um TurmaProvider')
  }
  return context
}
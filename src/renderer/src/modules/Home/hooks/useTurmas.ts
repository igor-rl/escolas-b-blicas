import { useState, useEffect, useCallback } from 'react'
import type { Turma, CreateTurmaInput } from '../../../../../shared/types'

// 'edit' carrega um turma existente no formulário para atualização
export type ViewState = 'list' | 'create' | 'edit'

export function useTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [viewState, setViewState] = useState<ViewState>('list')
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── READ ──────────────────────────────────────────────────────────────────

  const fetchTurmas = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      const data = await api.getTurmas()
      setTurmas(data)
    } catch (err) {
      setError('Falha ao carregar turmas.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTurmas()
  }, [fetchTurmas])

  // ── CREATE ────────────────────────────────────────────────────────────────

  const createTurma = useCallback(async (input: CreateTurmaInput) => {
    setIsSaving(true)
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      const nova = await api.createTurma(input)
      // Atualiza estado local sem refetch — otimistic update
      setTurmas((prev) => [nova, ...prev])
      setViewState('list')
    } catch (err) {
      setError('Falha ao criar turma.')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }, [])

  // ── UPDATE ────────────────────────────────────────────────────────────────

  const startEditing = useCallback((turma: Turma) => {
    setEditingTurma(turma)
    setViewState('edit')
    setError(null)
  }, [])

  const updateTurma = useCallback(async (id: string, data: Partial<CreateTurmaInput>) => {
    setIsSaving(true)
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      const atualizada = await api.updateTurma(id, data)
      // Substitui o item no array sem refetch
      setTurmas((prev) => prev.map((t) => (t.id === id ? atualizada : t)))
      setEditingTurma(null)
      setViewState('list')
    } catch (err) {
      setError('Falha ao atualizar turma.')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }, [])

  // ── DELETE ────────────────────────────────────────────────────────────────

  const deleteTurma = useCallback(async (id: string) => {
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      await api.deleteTurma(id)
      // Remove do estado local — sem refetch
      setTurmas((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError('Falha ao excluir turma.')
      console.error(err)
    }
  }, [])

  // ── Helpers ───────────────────────────────────────────────────────────────

  const cancelForm = useCallback(() => {
    setEditingTurma(null)
    setViewState('list')
    setError(null)
  }, [])

  return {
    turmas,
    viewState,
    editingTurma,
    isLoading,
    isSaving,
    error,
    setViewState,
    createTurma,
    startEditing,
    updateTurma,
    deleteTurma,
    cancelForm,
  }
}
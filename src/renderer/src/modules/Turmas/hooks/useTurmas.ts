import { useState, useEffect, useCallback } from 'react'
import type { Turma, CreateTurmaInput } from '../../../../../shared/types'

export type ViewState = 'list' | 'create' | 'edit'

export function useTurmas() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [viewState, setViewState] = useState<ViewState>('list')
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTurmas = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      const data = await api.getTurmas()
      setTurmas(data)
    } catch {
      setError('Falha ao carregar turmas.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchTurmas() }, [fetchTurmas])

  const createTurma = useCallback(async (input: CreateTurmaInput) => {
    setIsSaving(true)
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      const nova = await api.createTurma(input)
      setTurmas((prev) => [nova, ...prev])
      setViewState('list')
    } catch {
      setError('Falha ao criar turma.')
    } finally {
      setIsSaving(false)
    }
  }, [])

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
      setTurmas((prev) => prev.map((t) => (t.id === id ? atualizada : t)))
      setEditingTurma(null)
      setViewState('list')
    } catch {
      setError('Falha ao atualizar turma.')
    } finally {
      setIsSaving(false)
    }
  }, [])

  const deleteTurma = useCallback(async (id: string) => {
    setError(null)
    try {
      const api = window.electronAPI
      if (!api) return
      await api.deleteTurma(id)
      setTurmas((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Falha ao excluir turma.')
    }
  }, [])

  const cancelForm = useCallback(() => {
    setEditingTurma(null)
    setViewState('list')
    setError(null)
  }, [])

  return {
    turmas, viewState, editingTurma,
    isLoading, isSaving, error,
    setViewState, createTurma,
    startEditing, updateTurma,
    deleteTurma, cancelForm,
  }
}
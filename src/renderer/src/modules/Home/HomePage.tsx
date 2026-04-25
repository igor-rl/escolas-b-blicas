import { useTurmas } from './hooks/useTurmas'
import { TurmaCard } from './components/TurmaCard'

export function HomePage() {
  const {
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
  } = useTurmas()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-10">
      {/* Branding */}
      <div className="mb-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/70">
          Sistema EB
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">
          Escolas Bíblicas
        </h1>
        <p className="mt-1 text-sm text-slate-500">Gestão local · offline-first</p>
      </div>

      <TurmaCard
        turmas={turmas}
        viewState={viewState}
        editingTurma={editingTurma}
        isLoading={isLoading}
        isSaving={isSaving}
        error={error}
        onNewTurma={() => setViewState('create')}
        onCreate={createTurma}
        onUpdate={updateTurma}
        onEdit={startEditing}
        onCancel={cancelForm}
        onDelete={deleteTurma}
      />
    </div>
  )
}
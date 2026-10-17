/* Tengo personajes y quiero mostrarlos según determinados filtros. */
import { useState, useMemo } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'
import ConfirmationModal from './components/ConfirmationModal'
import { useCharacters } from './hooks/useCharacters'
import {
  filterCharacters,
  sortCharacters
} from './utils/characterUtils'

function App() {
  const {
    characters,
    newCharacter,
    editingId,
    errors,

    newAdaptation,
    editingAdaptationId,

    saveCharacter,
    updateCharacter,
    cancelUpdateCharacter,
    deleteCharacter,

    saveAdaptation,
    updateAdaptation,
    cancelUpdateAdaptation,
    deleteAdaptation,
    changeAdaptationSystem,

    setNewCharacter,
    setNewAdaptation
  } = useCharacters()

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('nameAsc')
  const [confirmation, setConfirmation] = useState(null)

  const filteredCharacters = useMemo(
    () => filterCharacters(characters, search),
    [characters, search]
  )

  const sortedCharacters = useMemo(
    () => sortCharacters(filteredCharacters, sortBy),
    [filteredCharacters, sortBy]
  )

  function requestDeleteCharacter(character) {
    setConfirmation({
      type: 'character',
      id: character.id,
      title: 'Eliminar personaje',
      message:
        `¿Querés eliminar el personaje "${character.name}"? ` +
        'También se eliminarán todas sus adaptaciones. ' +
        'Esta acción no se puede deshacer.',
      confirmLabel: 'Eliminar personaje'
    })
  }

  function requestDeleteAdaptation(adaptation) {
    const systemName =
      adaptation.system === 'dnd'
        ? 'D&D'
        : adaptation.system

    const adaptationName =
      `${systemName}` +
      (adaptation.version
        ? ` - ${adaptation.version}`
        : '')

    setConfirmation({
      type: 'adaptation',
      id: adaptation.id,
      title: 'Eliminar adaptación',
      message:
        `¿Querés eliminar la adaptación "${adaptationName}"? ` +
        'Esta acción no se puede deshacer.',
      confirmLabel: 'Eliminar adaptación'
    })
  }

  function confirmDeletion() {
    if (!confirmation) {
      return
    }

    if (confirmation.type === 'character') {
      deleteCharacter(confirmation.id)
    }

    if (confirmation.type === 'adaptation') {
      deleteAdaptation(confirmation.id)
    }

    setConfirmation(null)
  }

  function cancelConfirmation() {
    setConfirmation(null)
  }

  return (
    <div className="rpg-app">
      <main className="container py-4 py-lg-5">

        <header className="rpg-header text-center mb-5">
          <h1 className="display-6 fw-bold mb-2">
            Arca Vitarum Alternativarum
          </h1>

          <p className="mb-0">
            Gestión de personajes para sistemas de rol
          </p>
        </header>

        <CharacterFilters
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <CharacterForm
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
          saveCharacter={saveCharacter}
          editingId={editingId}
          cancelUpdateCharacter={cancelUpdateCharacter}
          errors={errors}
          newAdaptation={newAdaptation}
          setNewAdaptation={setNewAdaptation}
          editingAdaptationId={editingAdaptationId}
          saveAdaptation={saveAdaptation}
          updateAdaptation={updateAdaptation}
          cancelUpdateAdaptation={cancelUpdateAdaptation}
          onRequestDeleteAdaptation={requestDeleteAdaptation}
          changeAdaptationSystem={changeAdaptationSystem}
        />

        <CharacterList
          characters={sortedCharacters}
          updateCharacter={updateCharacter}
          onRequestDeleteCharacter={requestDeleteCharacter}
        />
      </main>

      <ConfirmationModal
        confirmation={confirmation}
        onCancel={cancelConfirmation}
        onConfirm={confirmDeletion}
      />
    </div>
  )
}

export default App

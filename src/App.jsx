/* Tengo personajes y quiero mostrarlos según determinados filtros. */
import { useEffect, useState, useMemo } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'
import ConfirmationModal from './components/ConfirmationModal'
import { useCharacters } from './hooks/useCharacters'
import {
  filterCharacters,
  sortCharacters
} from './utils/characterUtils'
import {
  downloadCharacterExport,
  validateCharacterImportPayload
} from './utils/characterExport'

function App() {
  const {
    characters,
    newCharacter,
    editingId,
    errors,
    newAdaptation,
    editingAdaptationId,

    hasUnsavedChanges,
    hasUnsavedCharacterChanges,
    hasUnsavedAdaptationChanges,

    saveCharacter,
    updateCharacter,
    cancelUpdateCharacter,
    deleteCharacter,
    importCharacters,

    saveAdaptation,
    updateAdaptation,
    cancelUpdateAdaptation,
    deleteAdaptation,
    changeAdaptationSystem,

    setNewCharacter,
    setNewAdaptation
  } = useCharacters()

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return
    }

    function handleBeforeUnload(event) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    )

    return () => {
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      )
    }
  }, [hasUnsavedChanges])

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('nameAsc')
  const [confirmation, setConfirmation] = useState(null)
  const [importNotice, setImportNotice] = useState(null)

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
      type: 'deleteCharacter',
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
      systemName +
      (adaptation.version
        ? ` - ${adaptation.version}`
        : '')

    setConfirmation({
      type: 'deleteAdaptation',
      id: adaptation.id,
      title: 'Eliminar adaptación',
      message:
        `¿Querés eliminar la adaptación "${adaptationName}"? ` +
        'Esta acción no se puede deshacer.',
      confirmLabel: 'Eliminar adaptación'
    })
  }

  function requestCancelCharacter() {
    if (!hasUnsavedChanges) {
      cancelUpdateCharacter()
      return
    }

    setConfirmation({
      type: 'discardCharacter',
      title: 'Descartar cambios del personaje',
      message:
        'Hay cambios sin guardar en el personaje o en su ' +
        'adaptación actual. Si continuás, se descartarán. ' +
        '¿Querés continuar?',
      confirmLabel: 'Descartar cambios'
    })
  }

  function requestCancelAdaptation() {
    if (!hasUnsavedAdaptationChanges) {
      cancelUpdateAdaptation()
      return
    }

    setConfirmation({
      type: 'discardAdaptation',
      title: 'Descartar cambios de la adaptación',
      message:
        'Hay cambios sin guardar en esta adaptación. ' +
        'Si continuás, se descartarán. ¿Querés continuar?',
      confirmLabel: 'Descartar cambios'
    })
  }

  function requestChangeAdaptationSystem(system) {
    if (system === '') {
      requestCancelAdaptation()
      return
    }

    if (system === newAdaptation.system) {
      return
    }

    const requiresConfirmation =
      hasUnsavedAdaptationChanges ||
      editingAdaptationId !== null

    if (!requiresConfirmation) {
      changeAdaptationSystem(system)
      return
    }

    setConfirmation({
      type: 'changeSystem',
      system,
      title: 'Cambiar de sistema',
      message:
        'Cambiar el sistema reiniciará los datos del ' +
        'formulario de adaptación actual. ¿Querés continuar?',
      confirmLabel: 'Cambiar sistema'
    })
  }

  function requestUpdateCharacter(id) {
    if (!hasUnsavedChanges) {
      updateCharacter(id)
      return
    }

    setConfirmation({
      type: 'updateCharacter',
      id,
      title: 'Descartar cambios',
      message:
        'Hay cambios sin guardar. Si abrís otro personaje, ' +
        'se descartarán. ¿Querés continuar?',
      confirmLabel: 'Descartar y abrir'
    })
  }

  function exportAllCharacters() {
    downloadCharacterExport(characters)
  }

  function exportSingleCharacter(character) {
    downloadCharacterExport([character])
  }

  async function requestImportFile(file) {
    setImportNotice(null)

    try {
      const fileContent = await file.text()
      const parsedFile = JSON.parse(fileContent)

      const importedData =
        validateCharacterImportPayload(parsedFile)

      setConfirmation({
        type: 'importCharacters',
        characters: importedData,
        title: 'Importar personajes',
        message:
          `El archivo contiene ${importedData.length} ` +
          `${importedData.length === 1 ? 'personaje' : 'personajes'}. ` +
          'Se agregarán como copias nuevas. No se reemplazarán ' +
          'los personajes que ya tenés guardados.',
        confirmLabel: 'Importar personajes'
      })
    } catch (error) {
      setImportNotice({
        type: 'danger',
        message: error instanceof Error
          ? error.message
          : 'No se pudo leer el archivo seleccionado.'
      })
    }
  }

  function confirmAction() {
    if (!confirmation) {
      return
    }

    switch (confirmation.type) {
      case 'deleteCharacter':
        deleteCharacter(confirmation.id)
        break

      case 'deleteAdaptation':
        deleteAdaptation(confirmation.id)
        break

      case 'discardCharacter':
        cancelUpdateCharacter()
        break

      case 'discardAdaptation':
        cancelUpdateAdaptation()
        break

      case 'changeSystem':
        changeAdaptationSystem(confirmation.system)
        break

      case 'updateCharacter':
        updateCharacter(confirmation.id)
        break

      case 'importCharacters': {
        const importedCount = importCharacters(
          confirmation.characters
        )

        setImportNotice({
          type: 'success',
          message:
            `Se importaron ${importedCount} ` +
            `${importedCount === 1 ? 'personaje' : 'personajes'}. ` +
            'Los personajes anteriores se conservaron.'
        })
        break
      }

      default:
        break
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
          errors={errors}
          newAdaptation={newAdaptation}
          setNewAdaptation={setNewAdaptation}
          editingAdaptationId={editingAdaptationId}
          saveAdaptation={saveAdaptation}
          updateAdaptation={updateAdaptation}
          hasUnsavedCharacterChanges={hasUnsavedCharacterChanges}
          onRequestDeleteAdaptation={requestDeleteAdaptation}
          onRequestCancelCharacter={requestCancelCharacter}
          onRequestCancelAdaptation={requestCancelAdaptation}
          onRequestChangeAdaptationSystem={requestChangeAdaptationSystem}
        />

        <CharacterList
          characters={sortedCharacters}
          onRequestUpdateCharacter={requestUpdateCharacter}
          onRequestDeleteCharacter={requestDeleteCharacter}
          onExportAllCharacters={exportAllCharacters}
          onExportCharacter={exportSingleCharacter}
          onImportFile={requestImportFile}
          importNotice={importNotice}
        />
      </main>

      <ConfirmationModal
        confirmation={confirmation}
        onCancel={cancelConfirmation}
        onConfirm={confirmAction}
      />
    </div>
  )
}

export default App

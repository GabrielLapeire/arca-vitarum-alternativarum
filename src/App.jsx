/* Tengo personajes y quiero mostrarlos según determinados filtros. */
import { useState, useMemo } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'
import { useCharacters } from './hooks/useCharacters'
import { filterCharacters, sortCharacters } from './utils/characterUtils'

function App() {
  /* Estados y hook personalizado para gestion de pj*/
  const {
    characters,
    newCharacter,
    editingId,
    errors,

    newAdaptation,
    editingAdaptationIndex,

    saveCharacter,
    updateCharacter,
    cancelUpdateCharacter,
    deleteCharacter,

    saveAdaptation,
    updateAdaptation,
    cancelUpdateAdaptation,
    deleteAdaptation,

    setNewCharacter,
    setNewAdaptation
  } = useCharacters()
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("nameAsc")

  /* Datos derivados*/
  const filteredCharacters = useMemo(() =>
    filterCharacters(characters, search),
    [characters, search]
  )
  const sortedCharacters = useMemo(() =>
    sortCharacters(filteredCharacters, sortBy),
    [filteredCharacters, sortBy]
  )

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        Arca Vitarum Alternativarum
      </h1>
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
        editingAdaptationIndex={editingAdaptationIndex}
        saveAdaptation={saveAdaptation}
        updateAdaptation={updateAdaptation}
        cancelUpdateAdaptation={cancelUpdateAdaptation}
        deleteAdaptation={deleteAdaptation}
      />
      <CharacterList
        characters={sortedCharacters}
        updateCharacter={updateCharacter}
        deleteCharacter={deleteCharacter}
      />
    </div>
  )
}

export default App

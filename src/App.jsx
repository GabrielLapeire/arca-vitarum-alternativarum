/* Tengo personajes y quiero mostrarlos según determinados filtros. */
import { useState, useMemo } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'
import { useCharacters } from './hooks/useCharacters'
import { getRaceOptions, getClassOptions, filterCharacters, sortCharacters } from './utils/characterUtils'

function App() {
  /* Estados y hook personalizado para gestion de pj*/
  const {
    characters,
    newCharacter,
    editingId,
    saveCharacter,
    updateCharacter,
    deleteCharacter,
    setNewCharacter
  } = useCharacters()
  const [search, setSearch] = useState("")
  const [raceFilter, setRaceFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [sortBy, setSortBy] = useState("nameAsc")

  /* Datos derivados*/
  const raceFilterOptions = useMemo(() =>
    getRaceOptions(characters),
    [characters]
  )
  const classFilterOptions = useMemo(() =>
    getClassOptions(characters),
    [characters]
  )
  const filteredCharacters = useMemo(() =>
    filterCharacters(characters, search, raceFilter, classFilter),
    [characters, search, raceFilter, classFilter]
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
        raceFilter={raceFilter}
        setRaceFilter={setRaceFilter}
        raceFilterOptions={raceFilterOptions}
        classFilter={classFilter}
        setClassFilter={setClassFilter}
        classFilterOptions={classFilterOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CharacterForm
        newCharacter={newCharacter}
        setNewCharacter={setNewCharacter}
        saveCharacter={saveCharacter}
        editingId={editingId}
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

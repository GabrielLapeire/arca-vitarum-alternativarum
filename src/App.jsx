import { useState, useMemo } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'
import { getRaceOptions, getClassOptions, filterCharacters, sortCharacters } from './utils/characterUtils'
import { useLocalStorage } from './hooks/useLocalStorage'

const emptyCharacter = {
  id: null,
  system: "dnd5e",
  data: {
    name: '',
    race: '',
    className: '',
    level: ''
  }
}

function App() {
  /* Estados y localStorage con useEffect */
  const [characters, setCharacters] = useLocalStorage(
    "characters",
    []
  )
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)
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

  function saveCharacter() {
    if (
      newCharacter.data.name.trim() === '' ||
      newCharacter.data.race.trim() === '' ||
      newCharacter.data.className.trim() === '' ||
      newCharacter.data.level === ''
    ) {
      return
    }

    if (editingId !== null) {
      setCharacters(previousCharacters =>
        previousCharacters.map(character =>
          character.id === editingId
            ? {
              ...newCharacter,
              id: editingId
            } : character
        )
      )
      setEditingId(null)
    } else {
      setCharacters(previousCharacters => [
        ...previousCharacters,
        {
          ...newCharacter,
          id: crypto.randomUUID()
        }
      ])
    }

    setNewCharacter({
      ...emptyCharacter
    })
  }

  function updateCharacter(id) {
    setEditingId(id)

    const character = characters.find(
      character => character.id === id
    )

    setNewCharacter({
      ...character
    })
  }

  function deleteCharacter(id) {
    setCharacters(previousCharacters =>
      previousCharacters.filter(
        character => character.id !== id
      )
    )

    if (editingId === id) {
      setEditingId(null)
      setNewCharacter({
        ...emptyCharacter
      })
    }
  }

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

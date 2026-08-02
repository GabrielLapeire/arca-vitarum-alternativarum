import { useState, useEffect, useRef } from 'react'
import CharacterFilters from './components/CharacterFilters'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'

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
  const [characters, setCharacters] = useState([])
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)

  const [search, setSearch] = useState("")
  const [raceFilter, setRaceFilter] = useState("all")
  const raceFilterOptions = [
    ...new Set(
      characters.map(character =>
        character.data.race
      )
    )
  ]
  const [classFilter, setClassFilter] = useState("all")
  const classFilterOptions = [
    ...new Set(
      characters.map(character =>
        character.data.className
      )
    )
  ]
  const [sortBy, setSortBy] = useState("nameAsc")

  const normalizedSearch = search.trim().toLowerCase()
  const filteredCharacters = characters.filter(character => {
    const searchableText = [
      character.data.name,
      character.data.race,
      character.data.className
    ].join(" ").toLowerCase()
    const matchesSearch =
      searchableText.includes(normalizedSearch)
    const matchesRace =
      raceFilter === "all" ||
      character.data.race === raceFilter
    const matchesClass =
      classFilter === "all" ||
      character.data.className === classFilter
    return (
      matchesSearch &&
      matchesRace &&
      matchesClass
    )
  })
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.data.name.localeCompare(b.data.name)
    }
    if (sortBy === "nameDesc") {
      return b.data.name.localeCompare(a.data.name)
    }
    if (sortBy === "levelDesc") {
      return Number(b.data.level) - Number(a.data.level)
    }
    return 0
  })

  const firstRender = useRef(true)
  useEffect(() => {
    const savedCharacters = JSON.parse(localStorage.getItem("characters"))
    if (savedCharacters !== null) {
      setCharacters(savedCharacters)
    }
  }, [])
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    localStorage.setItem("characters", JSON.stringify(characters))
  }, [characters])

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
      setCharacters(
        characters.map(character =>
          character.id === editingId
            ? newCharacter : character
        )
      )
      setEditingId(null)
    } else {
      setCharacters([
        ...characters,
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
    setCharacters(
      characters.filter(character => character.id !== id)
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

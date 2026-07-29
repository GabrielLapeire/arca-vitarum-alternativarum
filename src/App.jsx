import { useState, useEffect, useRef } from 'react'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'

const emptyCharacter = {
  id: null,
  name: '',
  race: '',
  className: '',
  level: ''
}

function App() {
  const [characters, setCharacters] = useState([])
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)

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
      newCharacter.name.trim() === '' ||
      newCharacter.race.trim() === '' ||
      newCharacter.className.trim() === '' ||
      newCharacter.level === ''
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
      <CharacterForm
        newCharacter={newCharacter}
        setNewCharacter={setNewCharacter}
        saveCharacter={saveCharacter}
        editingId={editingId}
      />
      <CharacterList
        characters={characters}
        updateCharacter={updateCharacter}
        deleteCharacter={deleteCharacter}
      />
    </div>
  )
}

export default App

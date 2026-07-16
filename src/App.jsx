import { useState } from 'react'
import CharacterForm from './components/CharacterForm'
import CharacterList from './components/CharacterList'

function App() {
  const [characters, setCharacters] = useState([])
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    race: '',
    className: '',
    level: 1
  })
  const [editingIndex, setEditingIndex] = useState(null)

  function saveCharacter() {
    if (
      newCharacter.name.trim() === '' ||
      newCharacter.race.trim() === '' ||
      newCharacter.className.trim() === ''
    ) {
      return
    }

    if (editingIndex !== null) {
      setCharacters(characters.map((character, characterIndex) => {
        if (characterIndex === editingIndex) {
          return newCharacter
        }
        setEditingIndex(null)
        return { ...newCharacter }
      }))
    } else {
      setCharacters([
        ...characters,
        newCharacter
      ])
    }

    setNewCharacter({
      name: '',
      race: '',
      className: '',
      level: 1
    })
  }

  function updateCharacter(index) {
    setEditingIndex(index)
    setNewCharacter({
      ...characters[index]
    })
  }

  function deleteCharacter(index) {
    setCharacters(characters.filter((character, characterIndex) => characterIndex !== index))
  }

  return (
    <div>
      <CharacterForm
        newCharacter={newCharacter}
        setNewCharacter={setNewCharacter}
        saveCharacter={saveCharacter}
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

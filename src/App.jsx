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

  function addCharacter() {
    if (
      newCharacter.name.trim() === '' ||
      newCharacter.race.trim() === '' ||
      newCharacter.className.trim() === ''
    ) {
      return
    }
    setCharacters([
      ...characters,
      newCharacter
    ])
    setNewCharacter({
      name: '',
      race: '',
      className: '',
      level: 1
    })
  }

  function deleteCharacter() {
    return
  }

  return (
    <div>
      <CharacterForm
        newCharacter={newCharacter}
        setNewCharacter={setNewCharacter}
        addCharacter={addCharacter}
      />
      <CharacterList
        characters={characters}
        deleteCharacter={deleteCharacter}
      />
    </div>
  )
}

export default App

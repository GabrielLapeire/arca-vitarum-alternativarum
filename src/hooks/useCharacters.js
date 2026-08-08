/* Yo me encargo de crear, editar, eliminar y mantener los personajes. */
import { useState } from "react"
import { useLocalStorage } from './useLocalStorage'

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

export function useCharacters() {
  /* Estados y localStorage con useEffect */
  const [characters, setCharacters] = useLocalStorage(
    "characters",
    []
  )
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)

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

  return {
    characters,
    newCharacter,
    editingId,
    saveCharacter,
    updateCharacter,
    deleteCharacter,
    setNewCharacter
  }
}

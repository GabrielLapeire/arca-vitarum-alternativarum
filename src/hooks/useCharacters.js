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
  const [errors, setErrors] = useState({})

  function saveCharacter() {
    const newErrors = {}
    if (newCharacter.data.name.trim() === '') {
      newErrors.name = "El nombre es un campo obligatorio"
    }
    if (newCharacter.data.race.trim() === '') {
      newErrors.race = "La raza es un campo obligatorio"
    }
    if (newCharacter.data.className.trim() === '') {
      newErrors.className = "La clase es un campo obligatorio"
    }
    if (newCharacter.data.level === '') {
      newErrors.level = "El nivel es un campo obligatorio"
    }
    if (newCharacter.data.level < 1 || newCharacter.data.level > 20) {
      newErrors.level = "El nivel debe estar entre 1 y 20"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
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
    setErrors({})
  }

  function updateCharacter(id) {
    setEditingId(id)

    const character = characters.find(
      character => character.id === id
    )

    setNewCharacter({
      ...character
    })

    setErrors({})
  }

  function cancelUpdateCharacter() {
    setEditingId(null)
    setNewCharacter({
      ...emptyCharacter
    })
    setErrors({})
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
      setErrors({})
    }
  }

  return {
    characters,
    newCharacter,
    editingId,
    errors,
    saveCharacter,
    updateCharacter,
    cancelUpdateCharacter,
    deleteCharacter,
    setNewCharacter
  }
}

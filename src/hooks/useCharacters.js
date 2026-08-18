/* Yo me encargo de crear, editar, eliminar y mantener los personajes. */
import { useState } from "react"
import { useLocalStorage } from './useLocalStorage'

const emptyCharacter = {
  id: null,
  name: '',
  adaptations: []
}

const emptyAdaptation = {
  system: '',
  version: '',
  data: {}
}

export function useCharacters() {
  /* Estados y localStorage con useEffect */
  const [characters, setCharacters] = useLocalStorage(
    "characters",
    []
  )
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)
  const [newAdaptation, setNewAdaptation] = useState(emptyAdaptation)
  const [editingAdaptationIndex, setEditingAdaptationIndex] = useState(null)
  const [errors, setErrors] = useState({})

  function saveCharacter() {
    const newErrors = {}
    if (newCharacter.name.trim() === '') {
      newErrors.name = "El nombre es un campo obligatorio"
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

  function saveAdaptation() {
    const newErrors = {}
    // Validaciones
    if (newAdaptation.system === '') {
      newErrors.system = "Debes seleccionar un sistema"
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingAdaptationIndex !== null) {
      setNewCharacter(previousCharacter => ({
        ...previousCharacter,
        adaptations: previousCharacter.adaptations.map(
          (adaptation, index) =>
            index === editingAdaptationIndex
              ? { ...newAdaptation }
              : adaptation
        )
      }))
      setEditingAdaptationIndex(null)
    } else {
      setNewCharacter(previousCharacter => ({
        ...previousCharacter,
        adaptations: [
          ...previousCharacter.adaptations,
          { ...newAdaptation }
        ]
      }))
    }

    setNewAdaptation({
      ...emptyAdaptation
    })

    setEditingAdaptationIndex(null)
    setErrors({})
  }

  function updateAdaptation(index) {
    setEditingAdaptationIndex(index)
    const adaptation = newCharacter.adaptations[index]
    setNewAdaptation({
      ...adaptation
    })
    setErrors({})
  }

  function cancelUpdateAdaptation() {
    setEditingAdaptationIndex(null)
    setNewAdaptation({
      ...emptyAdaptation
    })
    setErrors({})
  }

  function deleteAdaptation(index) {
    setNewCharacter(previousCharacter => ({
      ...previousCharacter,
      adaptations: previousCharacter.adaptations.filter(
        (adaptation, AdaptationIndex) =>
          AdaptationIndex !== index
      )
    }))

    if (editingAdaptationIndex === index) {
      setEditingAdaptationIndex(null)
      setNewAdaptation({
        ...emptyAdaptation
      })
      setErrors({})
    }
  }

  return {
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
  }
}

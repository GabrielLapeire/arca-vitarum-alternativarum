/* Yo me encargo de crear, editar, eliminar y mantener los personajes. */
import { useState } from "react"
import { useLocalStorage } from './useLocalStorage'

const emptyCharacter = {
  id: null,
  name: '',
  adaptations: []
}

const emptyAdaptation = {
  id: null,
  system: '',
  version: '',
  data: {}
}

export function useCharacters() {
  const [characters, setCharacters] = useLocalStorage(
    "characters",
    []
  )
  const [newCharacter, setNewCharacter] = useState(emptyCharacter)
  const [editingId, setEditingId] = useState(null)
  const [newAdaptation, setNewAdaptation] = useState(emptyAdaptation)
  const [editingAdaptationId, setEditingAdaptationId] = useState(null)
  const [errors, setErrors] = useState({})

  function saveCharacter() {
    const newErrors = {}
    if (newCharacter.name.trim() === '') {
      newErrors.name = "El nombre es un campo obligatorio"
    }
    if (newCharacter.adaptations.length === 0) {
      newErrors.adaptations = "Debe incluir al menos un sistema"
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

    if (newAdaptation.system === '') {
      newErrors.system = "Debes seleccionar un sistema"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingAdaptationId !== null) {
      setNewCharacter(previousCharacter => ({
        ...previousCharacter,
        adaptations: previousCharacter.adaptations.map(
          (adaptation, index) =>
            index === editingAdaptationId
              ? {
                ...newAdaptation,
                id: adaptation.id
              }
              : adaptation
        )
      }))
    } else {
      setNewCharacter(previousCharacter => ({
        ...previousCharacter,
        adaptations: [
          ...previousCharacter.adaptations,
          {
            ...newAdaptation,
            id: crypto.randomUUID()
          }
        ]
      }))
    }

    setNewAdaptation({
      ...emptyAdaptation
    })

    setEditingAdaptationId(null)
    setErrors({})
  }

  function updateAdaptation(index) {
    setEditingAdaptationId(index)
    const adaptation = newCharacter.adaptations[index]
    setNewAdaptation({
      ...adaptation
    })
    setErrors({})
  }

  function cancelUpdateAdaptation() {
    setEditingAdaptationId(null)
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

    if (editingAdaptationId === index) {
      setEditingAdaptationId(null)
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
    editingAdaptationId,

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

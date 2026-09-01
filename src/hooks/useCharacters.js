/* Yo me encargo de crear, editar, eliminar y mantener los personajes. */
import { useState } from "react"
import { useLocalStorage } from './useLocalStorage'
import { createEmptyDndData } from '../components/adaptations/dnd/dndData'

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
    setNewAdaptation({
      ...emptyAdaptation
    })
    setEditingAdaptationId(null)
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
    setEditingAdaptationId(null)
    setNewAdaptation({
      ...emptyAdaptation
    })
    setErrors({})
  }

  function cancelUpdateCharacter() {
    setEditingId(null)
    setNewCharacter({
      ...emptyCharacter
    })

    setEditingAdaptationId(null)
    setNewAdaptation({
      ...emptyAdaptation
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
      setEditingAdaptationId(null)
      setNewAdaptation({
        ...emptyAdaptation
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
          adaptation =>
            adaptation.id === editingAdaptationId
              ? { ...newAdaptation, id: editingAdaptationId }
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

  function updateAdaptation(id) {
    const adaptation = newCharacter.adaptations.find(
      adaptation => adaptation.id === id
    )
    if (!adaptation) {
      return
    }

    setEditingAdaptationId(id)
    setNewAdaptation({
      ...adaptation,
      data: adaptation.data
        ? { ...adaptation.data }
        : {}
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

  function deleteAdaptation(id) {
    setNewCharacter(previousCharacter => ({
      ...previousCharacter,
      adaptations: previousCharacter.adaptations.filter(
        adaptation => adaptation.id !== id
      )
    }))

    if (editingAdaptationId === id) {
      setEditingAdaptationId(null)
      setNewAdaptation({
        ...emptyAdaptation
      })
      setErrors({})
    }
  }

  function changeAdaptationSystem(system) {
    setNewAdaptation(previousAdaptation => ({
      ...previousAdaptation,
      system,
      version: system === 'dnd'
        ? '2024'
        : '',
      data: system === 'dnd'
        ? createEmptyDndData()
        : {}
    }))

    setErrors({})
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
    changeAdaptationSystem,

    saveAdaptation,
    updateAdaptation,
    cancelUpdateAdaptation,
    deleteAdaptation,

    setNewCharacter,
    setNewAdaptation
  }
}

/* Yo manejo los hechizos de D&D de la apie Open5e */
import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { getDndSpells } from '../api/dndApi'
import {
  normalizeDndSpells
} from '../components/adaptations/dnd/dndSpellUtils'

const CACHE_KEY = 'dndSpellCatalog'
const CACHE_DURATION = 24 * 60 * 60 * 1000

function isCacheValid(cache) {
  if (!cache?.fetchedAt) {
    return false
  }

  if (!Array.isArray(cache.spells)) {
    return false
  }

  const fetchedAt = Date.parse(cache.fetchedAt)

  if (Number.isNaN(fetchedAt)) {
    return false
  }

  return Date.now() - fetchedAt < CACHE_DURATION
}

export function useDndSpellCatalog() {
  const [cache, setCache] = useLocalStorage(
    CACHE_KEY,
    {
      fetchedAt: null,
      spells: []
    }
  )

  const [loading, setLoading] = useState(
    () => !isCacheValid(cache)
  )

  const [error, setError] = useState(null)

  const fetchingRef = useRef(false)

  useEffect(() => {
    if (isCacheValid(cache)) {
      setLoading(false)
      return
    }

    if (fetchingRef.current) {
      return
    }

    fetchingRef.current = true
    setLoading(true)
    setError(null)

    getDndSpells()
      .then(rawSpells => {
        const spells =
          normalizeDndSpells(rawSpells)

        setCache({
          fetchedAt: new Date().toISOString(),
          spells
        })
      })
      .catch(error => {
        console.error(
          'No se pudo actualizar el catálogo de hechizos.',
          error
        )

        setError(
          'No se pudo actualizar el catálogo de hechizos.'
        )
      })
      .finally(() => {
        fetchingRef.current = false
        setLoading(false)
      })
  }, [cache, setCache])

  return {
    spells: Array.isArray(cache.spells)
      ? cache.spells
      : [],
    loading,
    error
  }
}

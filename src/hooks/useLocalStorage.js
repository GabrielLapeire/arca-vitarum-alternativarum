/* Yo me encargo de persistir cualquier estado en localStorage. */
import { useState, useEffect } from "react"

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key)

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue
    } catch (error) {
      console.error(
        `No se pudo leer "${key}" desde localStorage.`,
        error
      )

      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      )
    } catch (error) {
      console.error(
        `No se pudo guardar "${key}" en localStorage.`,
        error
      )
    }
  }, [key, value])

  return [value, setValue]
}

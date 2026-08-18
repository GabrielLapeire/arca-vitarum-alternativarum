/* Yo hago cálculos sobre los personajes. */
export function filterCharacters(characters, search) {
  const normalizedSearch = search.trim().toLowerCase()

  return characters.filter(character => {
    const searchableText = [
      character.name,
    ].join(" ").toLowerCase()
    const matchesSearch =
      searchableText.includes(normalizedSearch)
    return (
      matchesSearch
    )
  })
}

export function sortCharacters(filteredCharacters, sortBy) {
  return [...filteredCharacters].sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === "nameDesc") {
      return b.name.localeCompare(a.name)
    }
    return 0
  })
}

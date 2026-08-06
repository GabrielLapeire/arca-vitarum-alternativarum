export function getRaceOptions(characters) {
  return [
    ...new Set(
      characters.map(character =>
        character.data.race
      )
    )
  ]
}

export function getClassOptions(characters) {
  return [
    ...new Set(
      characters.map(character =>
        character.data.className
      )
    )
  ]
}

export function filterCharacters(characters, search, raceFilter, classFilter) {
  const normalizedSearch = search.trim().toLowerCase()

  return characters.filter(character => {
    const searchableText = [
      character.data.name,
      character.data.race,
      character.data.className
    ].join(" ").toLowerCase()
    const matchesSearch =
      searchableText.includes(normalizedSearch)
    const matchesRace =
      raceFilter === "all" ||
      character.data.race === raceFilter
    const matchesClass =
      classFilter === "all" ||
      character.data.className === classFilter
    return (
      matchesSearch &&
      matchesRace &&
      matchesClass
    )
  })
}

export function sortCharacters(filteredCharacters, sortBy) {
  return [...filteredCharacters].sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.data.name.localeCompare(b.data.name)
    }
    if (sortBy === "nameDesc") {
      return b.data.name.localeCompare(a.data.name)
    }
    if (sortBy === "levelDesc") {
      return Number(b.data.level) - Number(a.data.level)
    }
    if (sortBy === "levelAsc") {
      return Number(a.data.level) - Number(b.data.level)
    }
    return 0
  })
}

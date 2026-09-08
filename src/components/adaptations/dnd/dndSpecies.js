/* Yo guardo las posibles razas de un personaje de D&D 2024. */

const SPECIES_DATA = {
  dragonborn: {
    speed: 30,
    size: 'Mediano'
  },

  dwarf: {
    speed: 30,
    size: 'Mediano'
  },

  elf: {
    speed: 30,
    size: 'Mediano'
  },

  gnome: {
    speed: 30,
    size: 'Pequeño'
  },

  goliath: {
    speed: 35,
    size: 'Mediano'
  },

  halfling: {
    speed: 30,
    size: 'Pequeño'
  },

  human: {
    speed: 30,
    size: 'Mediano'
  },

  orc: {
    speed: 30,
    size: 'Mediano'
  },

  tiefling: {
    speed: 30,
    size: 'Mediano'
  }
}

function normalizeSpeciesName(species) {
  return String(species || '')
    .trim()
    .toLowerCase()
}

export function getSpeciesData(species) {
  const normalizedSpecies =
    normalizeSpeciesName(species)

  return SPECIES_DATA[normalizedSpecies] || null
}
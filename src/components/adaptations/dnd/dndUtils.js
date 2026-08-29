/* Yo hago cálculos sobre los D&D. */
export function getAbilityModifier(score) {
  if (
    score === '' ||
    score === null ||
    score === undefined
  ) {
    return ''
  }

  const numericScore = Number(score)

  if (Number.isNaN(numericScore)) {
    return ''
  }

  return Math.floor((numericScore - 10) / 2)
}

export function formatModifier(modifier) {
  if (
    modifier === '' ||
    modifier === null ||
    modifier === undefined
  ) {
    return ''
  }

  return modifier >= 0
    ? `+${modifier}`
    : modifier
}

export function getProficiencyBonus(level) {
  if (
    level === '' ||
    level === null ||
    level === undefined
  ) {
    return ''
  }

  const numericLevel = Number(level)

  if (Number.isNaN(numericLevel)) {
    return ''
  }

  if (numericLevel <= 4) return 2
  if (numericLevel <= 8) return 3
  if (numericLevel <= 12) return 4
  if (numericLevel <= 16) return 5

  return 6
}

export function getSavingThrowModifier(
  ability,
  abilities,
  savingThrows,
  proficiencyBonus
) {
  const modifier = getAbilityModifier(
    abilities?.[ability]
  )

  if (modifier === '') {
    return ''
  }

  return modifier +
    (savingThrows?.[ability]
      ? Number(proficiencyBonus || 0)
      : 0)
}

export function getSkillModifier(
  skill,
  abilities,
  skills,
  proficiencyBonus
) {
  const modifier = getAbilityModifier(
    abilities?.[skill.ability]
  )

  if (modifier === '') {
    return ''
  }

  return modifier +
    (skills?.[skill.id]
      ? Number(proficiencyBonus || 0)
      : 0)
}
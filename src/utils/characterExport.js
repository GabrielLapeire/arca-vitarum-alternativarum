/* Exporto e importo personajes en un formato versionado. */

const EXPORT_FORMAT = 'arca-vitarum-character-export'
const SCHEMA_VERSION = 1

function isRecord(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
}

function getSafeFilename(value) {
  const slug = String(value || 'personajes')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'personajes'
}

function createPortableCharacter(character) {
  return {
    name: character.name,
    adaptations: character.adaptations.map(adaptation => ({
      system: adaptation.system,
      version: adaptation.version ?? '',
      data: isRecord(adaptation.data)
        ? adaptation.data
        : {}
    }))
  }
}

export function downloadCharacterExport(characters) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return
  }

  const payload = {
    format: EXPORT_FORMAT,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    characters: characters.map(createPortableCharacter)
  }

  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: 'application/json;charset=utf-8' }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)

  const filenamePart = characters.length === 1
    ? getSafeFilename(characters[0].name)
    : 'personajes'

  link.href = url
  link.download = `arca-vitarum-${filenamePart}-${date}.json`

  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/* Valido números sin impedir que una ficha quede incompleta. */
function validateIntegerValue(
  value,
  fieldLabel,
  {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    signed = false
  } = {}
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return
  }

  let numericValue

  if (typeof value === 'number') {
    numericValue = value
  } else if (typeof value === 'string') {
    const trimmedValue = value.trim()

    if (trimmedValue === '') {
      return
    }

    const pattern = signed
      ? /^[+-]?\d+$/
      : /^\d+$/

    if (!pattern.test(trimmedValue)) {
      throw new Error(
        `${fieldLabel}: debe ser un número entero válido.`
      )
    }

    numericValue = Number(trimmedValue)
  } else {
    throw new Error(
      `${fieldLabel}: debe ser un número entero válido.`
    )
  }

  if (
    !Number.isSafeInteger(numericValue) ||
    numericValue < min ||
    numericValue > max
  ) {
    const expected =
      min === Number.MIN_SAFE_INTEGER &&
        max === Number.MAX_SAFE_INTEGER
        ? 'un número entero válido'
        : min === Number.MIN_SAFE_INTEGER
          ? `un entero menor o igual que ${max}`
          : max === Number.MAX_SAFE_INTEGER
            ? `un entero mayor o igual que ${min}`
            : `un entero entre ${min} y ${max}`

    throw new Error(
      `${fieldLabel}: debe ser ${expected}.`
    )
  }
}

function validateIntegerField(
  record,
  field,
  fieldLabel,
  location,
  options
) {
  if (!Object.prototype.hasOwnProperty.call(record, field)) {
    return
  }

  validateIntegerValue(
    record[field],
    `${location} — ${fieldLabel}`,
    options
  )
}

function validateDndData(data, characterNumber, adaptationNumber) {
  const location =
    `Personaje ${characterNumber}, adaptación ${adaptationNumber}`

  const objectFields = [
    'abilities',
    'savingThrows',
    'skills',
    'combat',
    'spellcasting',
    'spellSlots',
    'equipment'
  ]

  for (const field of objectFields) {
    if (
      data[field] !== undefined &&
      !isRecord(data[field])
    ) {
      throw new Error(
        `${location}: el campo "${field}" debe ser un objeto.`
      )
    }
  }

  const arrayFields = [
    'spells',
    'attacks',
    'classFeatures',
    'speciesTraits',
    'feats'
  ]

  for (const field of arrayFields) {
    if (
      data[field] !== undefined &&
      (
        !Array.isArray(data[field]) ||
        !data[field].every(isRecord)
      )
    ) {
      throw new Error(
        `${location}: el campo "${field}" debe ser una lista de elementos válidos.`
      )
    }
  }

  // Nivel y experiencia.
  validateIntegerField(
    data,
    'level',
    'nivel',
    location,
    { min: 1, max: 20 }
  )

  validateIntegerField(
    data,
    'experience',
    'experiencia',
    location,
    { min: 0 }
  )

  // Características.
  if (isRecord(data.abilities)) {
    for (const [ability, score] of Object.entries(data.abilities)) {
      validateIntegerValue(
        score,
        `${location} — característica "${ability}"`,
        { min: 1, max: 30 }
      )
    }
  }

  // Datos de combate.
  const combat = data.combat

  if (isRecord(combat)) {
    const nonNegativeFields = [
      ['armorClass', 'clase de armadura'],
      ['shield', 'escudo'],
      ['currentHitPoints', 'puntos de golpe actuales'],
      ['maxHitPoints', 'puntos de golpe máximos'],
      ['temporaryHitPoints', 'puntos de golpe temporales'],
      ['hitDiceSpent', 'dados de golpe gastados'],
      ['passivePerception', 'percepción pasiva']
    ]

    for (const [field, label] of nonNegativeFields) {
      validateIntegerField(
        combat,
        field,
        label,
        location,
        { min: 0 }
      )
    }

    validateIntegerField(
      combat,
      'initiative',
      'iniciativa',
      location,
      { signed: true }
    )

    validateIntegerField(
      combat,
      'deathSavesSuccesses',
      'éxitos de salvaciones contra muerte',
      location,
      { min: 0, max: 3 }
    )

    validateIntegerField(
      combat,
      'deathSavesFailures',
      'fallos de salvaciones contra muerte',
      location,
      { min: 0, max: 3 }
    )
  }

  // Lanzamiento de conjuros.
  const spellcasting = data.spellcasting

  if (isRecord(spellcasting)) {
    validateIntegerField(
      spellcasting,
      'modifier',
      'modificador de lanzamiento',
      location,
      { signed: true }
    )

    validateIntegerField(
      spellcasting,
      'saveDC',
      'CD de salvación',
      location,
      { min: 0 }
    )

    validateIntegerField(
      spellcasting,
      'attackBonus',
      'bonificador de ataque de conjuros',
      location,
      { signed: true }
    )
  }

  // Espacios de conjuro.
  if (isRecord(data.spellSlots)) {
    for (const [level, slot] of Object.entries(data.spellSlots)) {
      if (!isRecord(slot)) {
        throw new Error(
          `${location}: los espacios de conjuro del nivel ${level} no son válidos.`
        )
      }

      validateIntegerField(
        slot,
        'total',
        `espacios totales de nivel ${level}`,
        location,
        { min: 0 }
      )

      validateIntegerField(
        slot,
        'expended',
        `espacios gastados de nivel ${level}`,
        location,
        { min: 0 }
      )
    }
  }

  // Hechizos registrados.
  if (Array.isArray(data.spells)) {
    for (const spell of data.spells) {
      if (typeof spell.spellKey !== 'string') {
        throw new Error(
          `${location}: se encontró un hechizo sin identificador válido.`
        )
      }
    }
  }

  // Equipo, cantidades y monedas.
  const equipment = data.equipment

  if (isRecord(equipment)) {
    if (
      equipment.items !== undefined &&
      (
        !Array.isArray(equipment.items) ||
        !equipment.items.every(isRecord)
      )
    ) {
      throw new Error(
        `${location}: la lista de objetos no es válida.`
      )
    }

    if (Array.isArray(equipment.items)) {
      equipment.items.forEach((item, index) => {
        validateIntegerField(
          item,
          'quantity',
          `cantidad del objeto ${index + 1}`,
          location,
          { min: 1 }
        )
      })
    }

    if (
      equipment.attunedItems !== undefined &&
      !Array.isArray(equipment.attunedItems)
    ) {
      throw new Error(
        `${location}: la lista de objetos sintonizados no es válida.`
      )
    }

    if (
      equipment.currency !== undefined &&
      !isRecord(equipment.currency)
    ) {
      throw new Error(
        `${location}: los datos de monedas no son válidos.`
      )
    }

    if (isRecord(equipment.currency)) {
      const denominations = [
        ['cp', 'cobre'],
        ['sp', 'plata'],
        ['ep', 'electro'],
        ['gp', 'oro'],
        ['pp', 'platino']
      ]

      for (const [field, label] of denominations) {
        validateIntegerField(
          equipment.currency,
          field,
          `monedas de ${label}`,
          location,
          { min: 0 }
        )
      }
    }
  }
}

export function validateCharacterImportPayload(payload) {
  if (!isRecord(payload) || payload.format !== EXPORT_FORMAT) {
    throw new Error(
      'El archivo no corresponde a una exportación de Arca Vitarum Alternativarum.'
    )
  }

  if (payload.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(
      `La versión del archivo (${payload.schemaVersion ?? 'desconocida'}) ` +
      'no es compatible con esta versión de la aplicación.'
    )
  }

  if (
    !Array.isArray(payload.characters) ||
    payload.characters.length === 0
  ) {
    throw new Error(
      'El archivo no contiene personajes para importar.'
    )
  }

  return payload.characters.map((character, characterIndex) => {
    const characterNumber = characterIndex + 1

    if (!isRecord(character)) {
      throw new Error(
        `El personaje ${characterNumber} no tiene una estructura válida.`
      )
    }

    if (
      typeof character.name !== 'string' ||
      character.name.trim() === ''
    ) {
      throw new Error(
        `El personaje ${characterNumber} no tiene un nombre válido.`
      )
    }

    if (
      !Array.isArray(character.adaptations) ||
      character.adaptations.length === 0
    ) {
      throw new Error(
        `El personaje "${character.name}" debe contener al menos una adaptación.`
      )
    }

    const adaptations = character.adaptations.map(
      (adaptation, adaptationIndex) => {
        const adaptationNumber = adaptationIndex + 1

        if (!isRecord(adaptation)) {
          throw new Error(
            `La adaptación ${adaptationNumber} de "${character.name}" no es válida.`
          )
        }

        if (
          typeof adaptation.system !== 'string' ||
          adaptation.system.trim() === ''
        ) {
          throw new Error(
            `La adaptación ${adaptationNumber} de "${character.name}" no tiene un sistema válido.`
          )
        }

        if (
          adaptation.version !== undefined &&
          typeof adaptation.version !== 'string'
        ) {
          throw new Error(
            `La versión de una adaptación de "${character.name}" no es válida.`
          )
        }

        if (!isRecord(adaptation.data)) {
          throw new Error(
            `Los datos de una adaptación de "${character.name}" no son válidos.`
          )
        }

        if (adaptation.system === 'dnd') {
          validateDndData(
            adaptation.data,
            characterNumber,
            adaptationNumber
          )
        }

        return {
          system: adaptation.system,
          version: adaptation.version ?? '',
          data: adaptation.data
        }
      }
    )

    return {
      name: character.name.trim(),
      adaptations
    }
  })
}

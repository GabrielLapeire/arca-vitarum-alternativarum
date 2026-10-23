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

  if (Array.isArray(data.spells)) {
    for (const spell of data.spells) {
      if (typeof spell.spellKey !== 'string') {
        throw new Error(
          `${location}: se encontró un hechizo sin identificador válido.`
        )
      }
    }
  }

  const equipment = data.equipment

  if (equipment) {
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

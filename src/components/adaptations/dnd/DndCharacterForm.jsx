/* Yo muestro y gestiono los datos específicos de una ficha de D&D 2024. */

const ABILITIES = [
  {
    id: 'strength',
    name: 'Fuerza',
    shortName: 'Fue'
  },
  {
    id: 'dexterity',
    name: 'Destreza',
    shortName: 'Des'
  },
  {
    id: 'constitution',
    name: 'Constitución',
    shortName: 'Con'
  },
  {
    id: 'intelligence',
    name: 'Inteligencia',
    shortName: 'Int'
  },
  {
    id: 'wisdom',
    name: 'Sabiduría',
    shortName: 'Sab'
  },
  {
    id: 'charisma',
    name: 'Carisma',
    shortName: 'Car'
  }
]

const SKILLS = [
  {
    id: 'acrobatics',
    name: 'Acrobacias',
    ability: 'dexterity'
  },
  {
    id: 'animalHandling',
    name: 'Trato con animales',
    ability: 'wisdom'
  },
  {
    id: 'arcana',
    name: 'Arcanos',
    ability: 'intelligence'
  },
  {
    id: 'athletics',
    name: 'Atletismo',
    ability: 'strength'
  },
  {
    id: 'deception',
    name: 'Engaño',
    ability: 'charisma'
  },
  {
    id: 'history',
    name: 'Historia',
    ability: 'intelligence'
  },
  {
    id: 'insight',
    name: 'Perspicacia',
    ability: 'wisdom'
  },
  {
    id: 'intimidation',
    name: 'Intimidación',
    ability: 'charisma'
  },
  {
    id: 'investigation',
    name: 'Investigación',
    ability: 'intelligence'
  },
  {
    id: 'medicine',
    name: 'Medicina',
    ability: 'wisdom'
  },
  {
    id: 'nature',
    name: 'Naturaleza',
    ability: 'intelligence'
  },
  {
    id: 'perception',
    name: 'Percepción',
    ability: 'wisdom'
  },
  {
    id: 'performance',
    name: 'Interpretación',
    ability: 'charisma'
  },
  {
    id: 'persuasion',
    name: 'Persuasión',
    ability: 'charisma'
  },
  {
    id: 'religion',
    name: 'Religión',
    ability: 'intelligence'
  },
  {
    id: 'sleightOfHand',
    name: 'Juego de manos',
    ability: 'dexterity'
  },
  {
    id: 'stealth',
    name: 'Sigilo',
    ability: 'dexterity'
  },
  {
    id: 'survival',
    name: 'Supervivencia',
    ability: 'wisdom'
  }
]

function getAbilityModifier(score) {
  if (score === '' || score === null || score === undefined) {
    return ''
  }

  const numericScore = Number(score)

  if (Number.isNaN(numericScore)) {
    return ''
  }

  return Math.floor((numericScore - 10) / 2)
}

function formatModifier(modifier) {
  if (modifier === '') {
    return ''
  }

  return modifier >= 0
    ? `+${modifier}`
    : modifier
}

function getProficiencyBonus(level) {
  if (level === '' || level === null || level === undefined) {
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

function DndCharacterForm({
  data = {},
  setData
}) {
  const abilities = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [ability.id, ''])
    ),
    ...(data.abilities || {})
  }

  const savingThrows = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [ability.id, false])
    ),
    ...(data.savingThrows || {})
  }

  const skills = {
    ...Object.fromEntries(
      SKILLS.map(skill => [skill.id, false])
    ),
    ...(data.skills || {})
  }

  const combat = {
    armorClass: '',
    currentHitPoints: '',
    maxHitPoints: '',
    temporaryHitPoints: '',
    hitDice: '',
    hitDiceSpent: '',
    initiative: '',
    speed: '',
    size: '',
    passivePerception: '',
    deathSavesSuccesses: 0,
    deathSavesFailures: 0,
    ...(data.combat || {})
  }

  const level = data.level
  const proficiencyBonus = getProficiencyBonus(level)

  function updateField(field, value) {
    setData(previousData => ({
      ...previousData,
      [field]: value
    }))
  }

  function updateAbility(ability, value) {
    setData(previousData => ({
      ...previousData,
      abilities: {
        ...(previousData.abilities || {}),
        [ability]: value
      }
    }))
  }

  function updateSavingThrow(ability, value) {
    setData(previousData => ({
      ...previousData,
      savingThrows: {
        ...(previousData.savingThrows || {}),
        [ability]: value
      }
    }))
  }

  function updateSkill(skill, value) {
    setData(previousData => ({
      ...previousData,
      skills: {
        ...(previousData.skills || {}),
        [skill]: value
      }
    }))
  }

  function updateCombat(field, value) {
    setData(previousData => ({
      ...previousData,
      combat: {
        ...(previousData.combat || {}),
        [field]: value
      }
    }))
  }

  function getSavingThrowModifier(ability) {
    const modifier = getAbilityModifier(
      abilities[ability]
    )

    if (modifier === '') {
      return ''
    }

    return modifier +
      (savingThrows[ability]
        ? Number(proficiencyBonus || 0)
        : 0)
  }

  function getSkillModifier(skill) {
    const skillData = SKILLS.find(
      currentSkill => currentSkill.id === skill
    )

    if (!skillData) {
      return ''
    }

    const modifier = getAbilityModifier(
      abilities[skillData.ability]
    )

    if (modifier === '') {
      return ''
    }

    return modifier +
      (skills[skill]
        ? Number(proficiencyBonus || 0)
        : 0)
  }

  const passivePerception =
    getSkillModifier('perception') === ''
      ? ''
      : 10 + getSkillModifier('perception')

  return (
    <div className="card border-primary mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="card-title mb-1">
              D&D 2024
            </h4>

            <p className="text-muted mb-0">
              Datos de la ficha
            </p>
          </div>

          <span className="badge text-bg-primary">
            D&D 2024
          </span>
        </div>

        {/* INFORMACIÓN BÁSICA */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Información básica</strong>
          </div>

          <div className="card-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Nombre del jugador
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={data.playerName || ''}
                  onChange={(e) =>
                    updateField(
                      'playerName',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Clase
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej.: Guerrero"
                  value={data.className || ''}
                  onChange={(e) =>
                    updateField(
                      'className',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Nivel
                </label>

                <input
                  type="number"
                  min="1"
                  max="20"
                  className="form-control"
                  value={data.level || ''}
                  onChange={(e) =>
                    updateField(
                      'level',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Subclase
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={data.subclass || ''}
                  onChange={(e) =>
                    updateField(
                      'subclass',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Experiencia
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={data.experience || ''}
                  onChange={(e) =>
                    updateField(
                      'experience',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Trasfondo
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={data.background || ''}
                  onChange={(e) =>
                    updateField(
                      'background',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Especie
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={data.species || ''}
                  onChange={(e) =>
                    updateField(
                      'species',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Alineamiento
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej.: Neutral bueno"
                  value={data.alignment || ''}
                  onChange={(e) =>
                    updateField(
                      'alignment',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Idiomas
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej.: Común, Elfo, Dracónico"
                  value={data.languages || ''}
                  onChange={(e) =>
                    updateField(
                      'languages',
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* CARACTERÍSTICAS */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Características</strong>
          </div>

          <div className="card-body">
            <div className="row g-3">

              {ABILITIES.map(ability => {
                const modifier = getAbilityModifier(
                  abilities[ability.id]
                )

                return (
                  <div
                    className="col-md-4"
                    key={ability.id}
                  >
                    <div className="border rounded p-3 h-100">
                      <label className="form-label fw-bold">
                        {ability.name}
                      </label>

                      <div className="input-group">
                        <input
                          type="number"
                          min="1"
                          max="30"
                          className="form-control"
                          value={abilities[ability.id]}
                          onChange={(e) =>
                            updateAbility(
                              ability.id,
                              e.target.value
                            )
                          }
                        />

                        <span className="input-group-text">
                          {formatModifier(modifier)}
                        </span>
                      </div>

                      <small className="text-muted">
                        Modificador
                      </small>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>

        {/* COMPETENCIA Y SALVACIONES */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>
              Competencias y tiradas de salvación
            </strong>
          </div>

          <div className="card-body">

            <div className="row mb-4">
              <div className="col-md-4">
                <label className="form-label">
                  Bonificador por competencia
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    proficiencyBonus === ''
                      ? ''
                      : formatModifier(
                        proficiencyBonus
                      )
                  }
                  readOnly
                />
              </div>
            </div>

            <h6>
              Tiradas de salvación
            </h6>

            <div className="row g-2 mb-4">
              {ABILITIES.map(ability => (
                <div
                  className="col-md-4"
                  key={ability.id}
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        Boolean(
                          savingThrows[ability.id]
                        )
                      }
                      onChange={(e) =>
                        updateSavingThrow(
                          ability.id,
                          e.target.checked
                        )
                      }
                    />

                    <label className="form-label mb-0 flex-grow-1">
                      {ability.name}
                    </label>

                    <span className="fw-bold">
                      {formatModifier(
                        getSavingThrowModifier(
                          ability.id
                        )
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h6>
              Habilidades
            </h6>

            <div className="row g-2">
              {SKILLS.map(skill => (
                <div
                  className="col-md-6"
                  key={skill.id}
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        Boolean(
                          skills[skill.id]
                        )
                      }
                      onChange={(e) =>
                        updateSkill(
                          skill.id,
                          e.target.checked
                        )
                      }
                    />

                    <label className="form-label mb-0 flex-grow-1">
                      {skill.name}

                      <small className="text-muted ms-1">
                        ({ABILITIES.find(
                          ability =>
                            ability.id === skill.ability
                        )?.shortName})
                      </small>
                    </label>

                    <span className="fw-bold">
                      {formatModifier(
                        getSkillModifier(
                          skill.id
                        )
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* COMBATE */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Combate</strong>
          </div>

          <div className="card-body">

            <div className="row g-3">

              <div className="col-md-3">
                <label className="form-label">
                  Clase de armadura
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={combat.armorClass}
                  onChange={(e) =>
                    updateCombat(
                      'armorClass',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  PG actuales
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={combat.currentHitPoints}
                  onChange={(e) =>
                    updateCombat(
                      'currentHitPoints',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  PG máximos
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={combat.maxHitPoints}
                  onChange={(e) =>
                    updateCombat(
                      'maxHitPoints',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  PG temporales
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={combat.temporaryHitPoints}
                  onChange={(e) =>
                    updateCombat(
                      'temporaryHitPoints',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Iniciativa
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={combat.initiative}
                  placeholder={
                    getAbilityModifier(
                      abilities.dexterity
                    ) === ''
                      ? ''
                      : formatModifier(
                        getAbilityModifier(
                          abilities.dexterity
                        )
                      )
                  }
                  onChange={(e) =>
                    updateCombat(
                      'initiative',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Velocidad
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={combat.speed}
                  placeholder="Ej.: 30 pies"
                  onChange={(e) =>
                    updateCombat(
                      'speed',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Tamaño
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={combat.size}
                  onChange={(e) =>
                    updateCombat(
                      'size',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">
                  Percepción pasiva
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={combat.passivePerception || ''}
                  placeholder={
                    passivePerception === ''
                      ? ''
                      : String(passivePerception)
                  }
                  onChange={(e) =>
                    updateCombat(
                      'passivePerception',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Dados de golpe
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej.: 1d10"
                  value={combat.hitDice}
                  onChange={(e) =>
                    updateCombat(
                      'hitDice',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Dados de golpe gastados
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={combat.hitDiceSpent}
                  onChange={(e) =>
                    updateCombat(
                      'hitDiceSpent',
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

            <hr />

            <div className="row">
              <div className="col-md-6">
                <h6>
                  Salvaciones contra muerte
                </h6>

                <div className="d-flex gap-4">

                  <div>
                    <label className="form-label">
                      Éxitos
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="3"
                      className="form-control"
                      value={
                        combat.deathSavesSuccesses
                      }
                      onChange={(e) =>
                        updateCombat(
                          'deathSavesSuccesses',
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Fallos
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="3"
                      className="form-control"
                      value={
                        combat.deathSavesFailures
                      }
                      onChange={(e) =>
                        updateCombat(
                          'deathSavesFailures',
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>
              </div>

              <div className="col-md-6 d-flex align-items-end">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="heroicInspiration"
                    checked={
                      Boolean(
                        data.heroicInspiration
                      )
                    }
                    onChange={(e) =>
                      updateField(
                        'heroicInspiration',
                        e.target.checked
                      )
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="heroicInspiration"
                  >
                    Inspiración heroica
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RASGOS Y COMPETENCIAS */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Rasgos y competencias</strong>
          </div>

          <div className="card-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Rasgos de clase
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={data.classFeatures || ''}
                  onChange={(e) =>
                    updateField(
                      'classFeatures',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Atributos de especie
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={data.speciesTraits || ''}
                  onChange={(e) =>
                    updateField(
                      'speciesTraits',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Dotes
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={data.feats || ''}
                  onChange={(e) =>
                    updateField(
                      'feats',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Entrenamiento con armaduras
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={data.armorTraining || ''}
                  onChange={(e) =>
                    updateField(
                      'armorTraining',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Competencias con armas
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={data.weaponProficiencies || ''}
                  onChange={(e) =>
                    updateField(
                      'weaponProficiencies',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Competencias con herramientas
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={data.toolProficiencies || ''}
                  onChange={(e) =>
                    updateField(
                      'toolProficiencies',
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* INFORMACIÓN DEL PERSONAJE */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Historia y personalidad</strong>
          </div>

          <div className="card-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Apariencia
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={data.appearance || ''}
                  onChange={(e) =>
                    updateField(
                      'appearance',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Personalidad
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={data.personality || ''}
                  onChange={(e) =>
                    updateField(
                      'personality',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Historia / trasfondo narrativo
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  value={data.backstory || ''}
                  onChange={(e) =>
                    updateField(
                      'backstory',
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* EQUIPO */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Equipo y recursos</strong>
          </div>

          <div className="card-body">

            <div className="mb-3">
              <label className="form-label">
                Equipo
              </label>

              <textarea
                className="form-control"
                rows="5"
                placeholder="Las armas, armaduras y objetos pueden detallarse aquí por ahora."
                value={data.equipment || ''}
                onChange={(e) =>
                  updateField(
                    'equipment',
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="form-label">
                Monedas
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Ej.: 15 po, 4 pp, 8 pc"
                value={data.coins || ''}
                onChange={(e) =>
                  updateField(
                    'coins',
                    e.target.value
                  )
                }
              />
            </div>

          </div>
        </div>

        {/* NOTAS */}

        <div className="card">
          <div className="card-header">
            <strong>Notas</strong>
          </div>

          <div className="card-body">
            <textarea
              className="form-control"
              rows="5"
              value={data.notes || ''}
              onChange={(e) =>
                updateField(
                  'notes',
                  e.target.value
                )
              }
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default DndCharacterForm
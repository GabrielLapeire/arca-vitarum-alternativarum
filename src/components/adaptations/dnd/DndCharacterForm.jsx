/* Yo muestro y gestiono los datos específicos de una ficha de D&D 2024. */
import {
  ABILITIES,
  SKILLS
} from './dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  getProficiencyBonus,
  getSavingThrowModifier,
  getSkillModifier,
  getPassivePerception
} from './dndUtils'

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

  function updateListItem(field, id, changes) {
    setData(previousData => ({
      ...previousData,
      [field]: (previousData[field] || []).map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    }))
  }

  function addListItem(field) {
    setData(previousData => ({
      ...previousData,
      [field]: [
        ...(previousData[field] || []),
        {
          id: crypto.randomUUID(),
          name: '',
          description: ''
        }
      ]
    }))
  }

  function deleteListItem(field, id) {
    setData(previousData => ({
      ...previousData,
      [field]: (previousData[field] || []).filter(
        item => item.id !== id
      )
    }))
  }

  function updateEquipmentItem(id, changes) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: (previousData.equipment?.items || []).map(item =>
          item.id === id
            ? { ...item, ...changes }
            : item
        )
      }
    }))
  }

  function addEquipmentItem() {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: [
          ...(previousData.equipment?.items || []),
          {
            id: crypto.randomUUID(),
            name: '',
            quantity: 1,
            equipped: false,
            description: ''
          }
        ]
      }
    }))
  }

  function deleteEquipmentItem(id) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: (previousData.equipment?.items || []).filter(
          item => item.id !== id
        )
      }
    }))
  }

  function updateCurrency(currency, value) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        currency: {
          ...(previousData.equipment?.currency || {}),
          [currency]: value
        }
      }
    }))
  }

  function updateAttack(id, changes) {
    setData(previousData => ({
      ...previousData,
      attacks: (previousData.attacks || []).map(attack =>
        attack.id === id
          ? { ...attack, ...changes }
          : attack
      )
    }))
  }

  function addAttack() {
    setData(previousData => ({
      ...previousData,
      attacks: [
        ...(previousData.attacks || []),
        {
          id: crypto.randomUUID(),
          name: '',
          attackBonus: '',
          damage: ''
        }
      ]
    }))
  }

  function deleteAttack(id) {
    setData(previousData => ({
      ...previousData,
      attacks: (previousData.attacks || []).filter(
        attack => attack.id !== id
      )
    }))
  }

  const passivePerception = getPassivePerception(
    SKILLS,
    abilities,
    skills,
    proficiencyBonus
  )

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
                          ability.id,
                          abilities,
                          savingThrows,
                          proficiencyBonus
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
                          skill,
                          abilities,
                          skills,
                          proficiencyBonus
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
            </div>

            <hr className="my-4" />

            {/* ATAQUES */}

            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">
                  Ataques
                </h6>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={addAttack}
                >
                  Agregar ataque
                </button>
              </div>

              {(!data.attacks ||
                data.attacks.length === 0) && (
                  <p className="text-muted mb-0">
                    No hay ataques cargados.
                  </p>
                )}

              <div className="d-flex flex-column gap-3">
                {(data.attacks || []).map(attack => (
                  <div
                    key={attack.id}
                    className="border rounded p-3"
                  >
                    <div className="row g-2 align-items-end">

                      <div className="col-md-4">
                        <label className="form-label">
                          Nombre
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej.: Espada larga"
                          value={attack.name}
                          onChange={(e) =>
                            updateAttack(
                              attack.id,
                              { name: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">
                          Bonificador de ataque / CD
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej.: +5"
                          value={attack.attackBonus}
                          onChange={(e) =>
                            updateAttack(
                              attack.id,
                              { attackBonus: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">
                          Daño y tipo
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej.: 1d8 + 3 cortante"
                          value={attack.damage}
                          onChange={(e) =>
                            updateAttack(
                              attack.id,
                              { damage: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteAttack(attack.id)
                          }
                        >
                          ×
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RECURSOS */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Recursos</strong>
          </div>

          <div className="card-body">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="heroicInspiration"
                checked={Boolean(data.heroicInspiration)}
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

        {/* RASGOS Y COMPETENCIAS */}

        <div className="card mb-4">
          <div className="card-header">
            <strong>Rasgos y competencias</strong>
          </div>

          <div className="card-body">

            {/* RASGOS DE CLASE */}

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">
                  Rasgos de clase
                </h6>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addListItem('classFeatures')}
                >
                  Agregar rasgo
                </button>
              </div>

              {(!data.classFeatures ||
                data.classFeatures.length === 0) && (
                  <p className="text-muted mb-0">
                    No hay rasgos de clase cargados.
                  </p>
                )}

              <div className="d-flex flex-column gap-3">
                {(data.classFeatures || []).map(feature => (
                  <div
                    key={feature.id}
                    className="border rounded p-3"
                  >
                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre del rasgo"
                          value={feature.name}
                          onChange={(e) =>
                            updateListItem(
                              'classFeatures',
                              feature.id,
                              { name: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-7">
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Descripción"
                          value={feature.description}
                          onChange={(e) =>
                            updateListItem(
                              'classFeatures',
                              feature.id,
                              { description: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-1 d-flex align-items-start">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteListItem(
                              'classFeatures',
                              feature.id
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RASGOS DE ESPECIE */}

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">
                  Rasgos de especie
                </h6>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addListItem('speciesTraits')}
                >
                  Agregar rasgo
                </button>
              </div>

              {(!data.speciesTraits ||
                data.speciesTraits.length === 0) && (
                  <p className="text-muted mb-0">
                    No hay rasgos de especie cargados.
                  </p>
                )}

              <div className="d-flex flex-column gap-3">
                {(data.speciesTraits || []).map(trait => (
                  <div
                    key={trait.id}
                    className="border rounded p-3"
                  >
                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre del rasgo"
                          value={trait.name}
                          onChange={(e) =>
                            updateListItem(
                              'speciesTraits',
                              trait.id,
                              { name: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-7">
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Descripción"
                          value={trait.description}
                          onChange={(e) =>
                            updateListItem(
                              'speciesTraits',
                              trait.id,
                              { description: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-1 d-flex align-items-start">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteListItem(
                              'speciesTraits',
                              trait.id
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOTES */}

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">
                  Dotes
                </h6>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addListItem('feats')}
                >
                  Agregar dote
                </button>
              </div>

              {(!data.feats ||
                data.feats.length === 0) && (
                  <p className="text-muted mb-0">
                    No hay dotes cargados.
                  </p>
                )}

              <div className="d-flex flex-column gap-3">
                {(data.feats || []).map(feat => (
                  <div
                    key={feat.id}
                    className="border rounded p-3"
                  >
                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre del dote"
                          value={feat.name}
                          onChange={(e) =>
                            updateListItem(
                              'feats',
                              feat.id,
                              { name: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-7">
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Descripción"
                          value={feat.description}
                          onChange={(e) =>
                            updateListItem(
                              'feats',
                              feat.id,
                              { description: e.target.value }
                            )
                          }
                        />
                      </div>

                      <div className="col-md-1 d-flex align-items-start">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteListItem(
                              'feats',
                              feat.id
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPETENCIAS */}

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">
                  Entrenamiento con armaduras
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={data.armorTraining || ''}
                  onChange={(e) =>
                    updateField(
                      'armorTraining',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Competencias con armas
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={data.weaponProficiencies || ''}
                  onChange={(e) =>
                    updateField(
                      'weaponProficiencies',
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">
                  Competencias con herramientas
                </label>

                <textarea
                  className="form-control"
                  rows="3"
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

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">
                Objetos
              </h6>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={addEquipmentItem}
              >
                Agregar objeto
              </button>
            </div>

            {(!data.equipment?.items ||
              data.equipment.items.length === 0) && (
                <p className="text-muted">
                  No hay objetos en el inventario.
                </p>
              )}

            <div className="d-flex flex-column gap-3">
              {(data.equipment?.items || []).map(item => (
                <div
                  key={item.id}
                  className="border rounded p-3"
                >
                  <div className="row g-2 align-items-start">

                    <div className="col-md-4">
                      <label className="form-label">
                        Nombre
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej.: Espada larga"
                        value={item.name}
                        onChange={(e) =>
                          updateEquipmentItem(
                            item.id,
                            { name: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Cantidad
                      </label>

                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) =>
                          updateEquipmentItem(
                            item.id,
                            { quantity: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Estado
                      </label>

                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={Boolean(item.equipped)}
                          onChange={(e) =>
                            updateEquipmentItem(
                              item.id,
                              { equipped: e.target.checked }
                            )
                          }
                        />

                        <label className="form-check-label">
                          Equipado
                        </label>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Descripción
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Detalles"
                        value={item.description}
                        onChange={(e) =>
                          updateEquipmentItem(
                            item.id,
                            { description: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-md-1">
                      <label className="form-label d-block">
                        &nbsp;
                      </label>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          deleteEquipmentItem(item.id)
                        }
                      >
                        ×
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            {/* MONEDAS */}

            <h6 className="mb-3">
              Monedas
            </h6>

            <div className="row g-3">
              {[
                ['cp', 'Cobre'],
                ['sp', 'Plata'],
                ['ep', 'Electro'],
                ['gp', 'Oro'],
                ['pp', 'Platino']
              ].map(([currency, label]) => (
                <div
                  className="col-6 col-md"
                  key={currency}
                >
                  <label className="form-label">
                    {label}
                  </label>

                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={
                      data.equipment?.currency?.[currency] ?? 0
                    }
                    onChange={(e) =>
                      updateCurrency(
                        currency,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
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
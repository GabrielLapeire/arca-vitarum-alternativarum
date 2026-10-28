/* COMBATE */
import {
  getAbilityModifier,
  formatModifier
} from '../dndUtils'
import {
  handleIntegerInput,
  clearIncompleteInteger
} from '../dndInputUtils'
import DeathSaveMarks from '../DeathSaveMarks'

function DndCombatSection({
  combat,
  abilities,
  calculatedSpeed,
  calculatedSize,
  passivePerception,
  attacks,
  updateCombat,
  updateAttack,
  addAttack,
  deleteAttack
}) {
  const dexterityModifier =
    getAbilityModifier(abilities.dexterity)

  const initiativePlaceholder =
    dexterityModifier === ''
      ? ''
      : formatModifier(dexterityModifier)

  function updateIntegerField(field, event, options) {
    handleIntegerInput(
      event,
      value => updateCombat(field, value),
      options
    )
  }

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Combate
      </div>

      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-armor-class"
              className="form-label"
            >
              Clase de armadura
            </label>

            <input
              id="dnd-armor-class"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.armorClass}
              onChange={e =>
                updateIntegerField(
                  'armorClass',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-shield"
              className="form-label"
            >
              Escudo
            </label>

            <input
              id="dnd-shield"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.shield}
              onChange={e =>
                updateIntegerField(
                  'shield',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-current-hit-points"
              className="form-label"
            >
              PG actuales
            </label>

            <input
              id="dnd-current-hit-points"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.currentHitPoints}
              onChange={e =>
                updateIntegerField(
                  'currentHitPoints',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-max-hit-points"
              className="form-label"
            >
              PG máximos
            </label>

            <input
              id="dnd-max-hit-points"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.maxHitPoints}
              onChange={e =>
                updateIntegerField(
                  'maxHitPoints',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-temporary-hit-points"
              className="form-label"
            >
              PG temporales
            </label>

            <input
              id="dnd-temporary-hit-points"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.temporaryHitPoints}
              onChange={e =>
                updateIntegerField(
                  'temporaryHitPoints',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-initiative"
              className="form-label"
            >
              Iniciativa
            </label>

            <input
              id="dnd-initiative"
              type="text"
              className="form-control"
              value={combat.initiative}
              placeholder={initiativePlaceholder}
              onChange={e =>
                updateIntegerField(
                  'initiative',
                  e,
                  {
                    allowNegative: true,
                    allowLeadingPlus: true,
                    allowIncompleteSign: true
                  }
                )
              }
              onBlur={e =>
                clearIncompleteInteger(
                  e,
                  value =>
                    updateCombat(
                      'initiative',
                      value
                    )
                )
              }
            />

            <small className="text-muted">
              Calculada según Destreza si se deja vacío.
            </small>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-speed"
              className="form-label"
            >
              Velocidad
            </label>

            <input
              id="dnd-speed"
              type="text"
              className="form-control"
              value={combat.speed}
              placeholder={
                calculatedSpeed === ''
                  ? 'Ej.: 30 pies'
                  : `${calculatedSpeed} pies`
              }
              onChange={e =>
                updateCombat(
                  'speed',
                  e.target.value
                )
              }
            />

            <small className="text-muted">
              Calculada según la especie si se deja vacío.
            </small>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-size"
              className="form-label"
            >
              Tamaño
            </label>

            <input
              id="dnd-size"
              type="text"
              className="form-control"
              value={combat.size}
              placeholder={
                calculatedSize === ''
                  ? 'Ej.: Mediano'
                  : calculatedSize
              }
              onChange={e =>
                updateCombat(
                  'size',
                  e.target.value
                )
              }
            />

            <small className="text-muted">
              Calculado según la especie si se deja vacío.
            </small>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <label
              htmlFor="dnd-passive-perception"
              className="form-label"
            >
              Percepción pasiva
            </label>

            <input
              id="dnd-passive-perception"
              type="text"
              min="0"
              step="1"
              className="form-control"
              value={combat.passivePerception || ''}
              placeholder={
                passivePerception === ''
                  ? ''
                  : String(passivePerception)
              }
              onChange={e =>
                updateIntegerField(
                  'passivePerception',
                  e,
                  { min: 0 }
                )
              }
            />

            <small className="text-muted">
              Calculada según Percepción si se deja vacío.
            </small>
          </div>

          <div className="col-12 col-md-6">
            <label
              htmlFor="dnd-hit-dice"
              className="form-label"
            >
              Dados de golpe
            </label>

            <input
              id="dnd-hit-dice"
              type="text"
              className="form-control"
              placeholder="Ej.: 1d10"
              value={combat.hitDice}
              onChange={e =>
                updateCombat(
                  'hitDice',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-12 col-md-6">
            <label
              htmlFor="dnd-hit-dice-spent"
              className="form-label"
            >
              Dados de golpe gastados
            </label>

            <input
              id="dnd-hit-dice-spent"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={combat.hitDiceSpent}
              onChange={e =>
                updateIntegerField(
                  'hitDiceSpent',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>
        </div>

        <div className="rpg-dnd-detail mt-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Salvaciones contra muerte
          </h6>

          <DeathSaveMarks
            successes={combat.deathSavesSuccesses}
            failures={combat.deathSavesFailures}
            editable
            onChange={updateCombat}
          />

          <small className="text-muted d-block mt-3">
            Seleccioná las marcas para registrar las salvaciones.
          </small>
        </div>

        <div className="mt-4 pt-4 border-top">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h6 className="rpg-dnd-detail-title mb-0">
              Ataques
            </h6>

            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={addAttack}
            >
              + Agregar ataque
            </button>
          </div>

          {(!attacks || attacks.length === 0) && (
            <div className="rpg-dnd-detail text-muted">
              No hay ataques cargados.
              Podés agregar armas o trucos de daño.
            </div>
          )}

          <div className="d-flex flex-column gap-3">
            {(attacks || []).map(attack => {
              const attackNameId =
                `dnd-attack-${attack.id}-name`

              const attackBonusId =
                `dnd-attack-${attack.id}-bonus`

              const attackDamageId =
                `dnd-attack-${attack.id}-damage`

              const attackNotesId =
                `dnd-attack-${attack.id}-notes`

              return (
                <div
                  key={attack.id}
                  className="rpg-dnd-detail"
                >
                  <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                    <strong className="rpg-dnd-detail-title">
                      {attack.name || 'Nuevo ataque'}
                    </strong>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      aria-label={
                        `Eliminar ataque ${attack.name || 'sin nombre'}`
                      }
                      title="Eliminar ataque"
                      onClick={() => deleteAttack(attack.id)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-lg-4">
                      <label
                        htmlFor={attackNameId}
                        className="form-label"
                      >
                        Nombre
                      </label>

                      <input
                        id={attackNameId}
                        type="text"
                        className="form-control"
                        placeholder="Ej.: Espada larga"
                        value={attack.name}
                        onChange={e =>
                          updateAttack(
                            attack.id,
                            { name: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                      <label
                        htmlFor={attackBonusId}
                        className="form-label"
                      >
                        Bonificador de ataque / CD
                      </label>

                      <input
                        id={attackBonusId}
                        type="text"
                        className="form-control"
                        placeholder="Ej.: +5"
                        value={attack.attackBonus}
                        onChange={e =>
                          updateAttack(
                            attack.id,
                            { attackBonus: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-12 col-md-6 col-lg-5">
                      <label
                        htmlFor={attackDamageId}
                        className="form-label"
                      >
                        Daño y tipo
                      </label>

                      <input
                        id={attackDamageId}
                        type="text"
                        className="form-control"
                        placeholder="Ej.: 1d8 + 3 cortante"
                        value={attack.damage}
                        onChange={e =>
                          updateAttack(
                            attack.id,
                            { damage: e.target.value }
                          )
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor={attackNotesId}
                        className="form-label"
                      >
                        Notas
                      </label>

                      <input
                        id={attackNotesId}
                        type="text"
                        className="form-control"
                        placeholder="Ej.: Alcance 6/18 m"
                        value={attack.notes || ''}
                        onChange={e =>
                          updateAttack(
                            attack.id,
                            { notes: e.target.value }
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndCombatSection

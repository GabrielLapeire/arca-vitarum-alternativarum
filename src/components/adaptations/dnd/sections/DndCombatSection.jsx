/* COMBATE */
import { getAbilityModifier, formatModifier } from "../dndUtils"
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
  return (
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
              Escudo
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              value={combat.shield}
              onChange={(e) =>
                updateCombat(
                  'shield',
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

            <small className="text-muted">
              Calculada según Destreza si se deja vacío.
            </small>
          </div>

          <div className="col-md-3">
            <label className="form-label">
              Velocidad
            </label>

            <input
              type="text"
              className="form-control"
              value={combat.speed}
              placeholder={
                calculatedSpeed === ''
                  ? 'Ej.: 30 pies'
                  : `${calculatedSpeed} pies`
              }
              onChange={(e) =>
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

          <div className="col-md-3">
            <label className="form-label">
              Tamaño
            </label>

            <input
              type="text"
              className="form-control"
              value={combat.size}
              placeholder={
                calculatedSize === ''
                  ? 'Ej.: Mediano'
                  : calculatedSize
              }
              onChange={(e) =>
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

            <small className="text-muted">
              Calculada según Percepción si se deja vacío.
            </small>
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

          {(!attacks ||
            attacks.length === 0) && (
              <p className="text-muted mb-0">
                No hay ataques cargados.
              </p>
            )}

          <div className="d-flex flex-column gap-3">
            {(attacks || []).map(attack => (
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
  )
}

export default DndCombatSection

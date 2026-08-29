/* Yo muestro una adaptación en modo de solo lectura. */
import {
  ABILITIES,
  SKILLS
} from './adaptations/dnd/dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  getProficiencyBonus,
  getSavingThrowModifier,
  getSkillModifier
} from './adaptations/dnd/dndUtils'

function formatValue(value) {
  if (
    value === '' ||
    value === null ||
    value === undefined
  ) {
    return '—'
  }

  return value
}

function CharacterAdaptationModal({
  adaptation,
  onClose
}) {
  if (!adaptation) {
    return null
  }

  const data = adaptation.data || {}
  const isDnd = adaptation.system === 'dnd'

  const proficiencyBonus =
    getProficiencyBonus(data.level)

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            {/* ENCABEZADO */}

            <div className="modal-header">
              <div>
                <h5 className="modal-title">
                  {isDnd ? 'D&D 2024' : adaptation.system}
                </h5>

                {adaptation.version && (
                  <small className="text-muted">
                    Versión {adaptation.version}
                  </small>
                )}
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
              />
            </div>

            {/* CONTENIDO */}

            <div className="modal-body">
              {isDnd ? (
                <>

                  {/* INFORMACIÓN BÁSICA */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Información básica</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">

                        <div className="col-md-6">
                          <strong>Jugador</strong>
                          <div>
                            {formatValue(data.playerName)}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>Clase</strong>
                          <div>
                            {formatValue(data.className)}
                          </div>
                        </div>

                        <div className="col-md-3">
                          <strong>Nivel</strong>
                          <div>
                            {formatValue(data.level)}
                          </div>
                        </div>

                        <div className="col-md-3">
                          <strong>Experiencia</strong>
                          <div>
                            {formatValue(data.experience)}
                          </div>
                        </div>

                        <div className="col-md-3">
                          <strong>Subclase</strong>
                          <div>
                            {formatValue(data.subclass)}
                          </div>
                        </div>

                        <div className="col-md-3">
                          <strong>Especie</strong>
                          <div>
                            {formatValue(data.species)}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Trasfondo</strong>
                          <div>
                            {formatValue(data.background)}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Alineamiento</strong>
                          <div>
                            {formatValue(data.alignment)}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Idiomas</strong>
                          <div>
                            {formatValue(data.languages)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARACTERÍSTICAS */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Características</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">

                        {ABILITIES.map(ability => {
                          const score =
                            data.abilities?.[ability.id]

                          const modifier =
                            getAbilityModifier(score)

                          return (
                            <div
                              className="col-6 col-md-4 col-lg-2"
                              key={ability.id}
                            >
                              <div className="border rounded p-2 text-center h-100">

                                <strong>
                                  {ability.name}
                                </strong>

                                <div className="fs-4 fw-bold">
                                  {formatValue(score)}
                                </div>

                                <small className="text-muted">
                                  {formatModifier(modifier)}
                                </small>

                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* COMPETENCIAS */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>
                        Competencias y tiradas de salvación
                      </strong>
                    </div>

                    <div className="card-body">
                      <div className="mb-4">
                        <strong>
                          Bonificador por competencia
                        </strong>

                        <span className="ms-2 badge text-bg-primary">
                          {formatModifier(
                            proficiencyBonus
                          )}
                        </span>
                      </div>

                      <div className="row g-2">
                        <div className="col-md-6">
                          <h6>
                            Tiradas de salvación
                          </h6>

                          <div className="list-group">
                            {ABILITIES.map(ability => (
                              <div
                                key={ability.id}
                                className="list-group-item d-flex justify-content-between"
                              >
                                <span>
                                  {ability.name}

                                  {data.savingThrows?.[
                                    ability.id
                                  ] && (
                                      <small className="text-muted ms-2">
                                        Competente
                                      </small>
                                    )}
                                </span>

                                <strong>
                                  {formatModifier(
                                    getSavingThrowModifier(
                                      ability.id,
                                      data.abilities,
                                      data.savingThrows,
                                      proficiencyBonus
                                    )
                                  )}
                                </strong>
                              </div>
                            ))}

                          </div>
                        </div>

                        <div className="col-md-6">
                          <h6>
                            Habilidades
                          </h6>

                          <div className="list-group">
                            {SKILLS.map(skill => (
                              <div
                                key={skill.id}
                                className="list-group-item d-flex justify-content-between"
                              >
                                <span>
                                  {skill.name}

                                  {data.skills?.[
                                    skill.id
                                  ] && (
                                      <small className="text-muted ms-2">
                                        Competente
                                      </small>
                                    )}
                                </span>

                                <strong>
                                  {formatModifier(
                                    getSkillModifier(
                                      skill,
                                      data.abilities,
                                      data.skills,
                                      proficiencyBonus
                                    )
                                  )}
                                </strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COMBATE */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Combate</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-6 col-md-3">
                          <strong>Clase de armadura</strong>
                          <div>
                            {formatValue(
                              data.combat?.armorClass
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Puntos de golpe</strong>
                          <div>
                            {formatValue(
                              data.combat?.currentHitPoints
                            )}

                            {data.combat?.maxHitPoints &&
                              ` / ${data.combat.maxHitPoints}`
                            }
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>PG temporales</strong>
                          <div>
                            {formatValue(
                              data.combat?.temporaryHitPoints
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Iniciativa</strong>
                          <div>
                            {formatValue(
                              data.combat?.initiative
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Velocidad</strong>
                          <div>
                            {formatValue(
                              data.combat?.speed
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Tamaño</strong>
                          <div>
                            {formatValue(
                              data.combat?.size
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Percepción pasiva</strong>
                          <div>
                            {formatValue(
                              data.combat?.passivePerception
                            )}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Dados de golpe</strong>
                          <div>
                            {formatValue(
                              data.combat?.hitDice
                            )}

                            {data.combat?.hitDiceSpent !== '' &&
                              data.combat?.hitDiceSpent !== undefined &&
                              ` (${data.combat.hitDiceSpent} gastados)`
                            }
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>
                            Salvaciones contra muerte
                          </strong>

                          <div className="mt-2">
                            Éxitos:{' '}
                            {formatValue(
                              data.combat?.deathSavesSuccesses
                            )}
                            {' — '}
                            Fallos:{' '}
                            {formatValue(
                              data.combat?.deathSavesFailures
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Inspiración heroica
                          </strong>

                          <div>
                            {data.heroicInspiration
                              ? 'Sí'
                              : 'No'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RASGOS Y COMPETENCIAS */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>
                        Rasgos y competencias
                      </strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">

                        <div className="col-md-6">
                          <strong>
                            Rasgos de clase
                          </strong>

                          <div className="mt-2">
                            {formatValue(
                              data.classFeatures
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Atributos de especie
                          </strong>

                          <div className="mt-2">
                            {formatValue(
                              data.speciesTraits
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Dotes
                          </strong>

                          <div className="mt-2">
                            {formatValue(data.feats)}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Entrenamiento con armaduras
                          </strong>

                          <div className="mt-2">
                            {formatValue(
                              data.armorTraining
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Competencias con armas
                          </strong>

                          <div className="mt-2">
                            {formatValue(
                              data.weaponProficiencies
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Competencias con herramientas
                          </strong>

                          <div className="mt-2">
                            {formatValue(
                              data.toolProficiencies
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HISTORIA Y PERSONALIDAD */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>
                        Historia y personalidad
                      </strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">

                        <div className="col-md-6">
                          <strong>
                            Apariencia
                          </strong>

                          <p className="mt-2 mb-0">
                            {formatValue(
                              data.appearance
                            )}
                          </p>
                        </div>

                        <div className="col-md-6">
                          <strong>
                            Personalidad
                          </strong>

                          <p className="mt-2 mb-0">
                            {formatValue(
                              data.personality
                            )}
                          </p>
                        </div>

                        <div className="col-12">
                          <strong>
                            Historia / trasfondo narrativo
                          </strong>

                          <p className="mt-2 mb-0">
                            {formatValue(
                              data.backstory
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EQUIPO */}

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>
                        Equipo y recursos
                      </strong>
                    </div>

                    <div className="card-body">
                      <div className="mb-3">
                        <strong>
                          Equipo
                        </strong>

                        <p className="mt-2 mb-0">
                          {formatValue(
                            data.equipment
                          )}
                        </p>
                      </div>

                      <div>
                        <strong>
                          Monedas
                        </strong>

                        <div className="mt-2">
                          {formatValue(data.coins)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NOTAS */}

                  <div className="card">
                    <div className="card-header">
                      <strong>Notas</strong>
                    </div>

                    <div className="card-body">
                      <p className="mb-0">
                        {formatValue(data.notes)}
                      </p>
                    </div>
                  </div>

                </>
              ) : (
                <div className="alert alert-secondary mb-0">
                  No hay una vista detallada disponible para este
                  sistema todavía.
                </div>
              )}
            </div>

            {/* PIE */}

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      />
    </>
  )
}

export default CharacterAdaptationModal

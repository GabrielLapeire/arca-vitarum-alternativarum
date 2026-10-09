/* Yo muestro los hechizos del formulario de D&D */
import { useMemo, useState } from 'react'
import {
  searchDndSpells,
  sortDndCharacterSpells
} from '../dndSpellUtils'
import {
  getDndSpellSchoolName
} from '../dndTranslations'
import DndSpellCard from './DndSpellCard'

function DndSpellForm({
  data,
  spellCatalog,
  spellsLoading,
  spellsError,
  addSpell,
  updateSpell,
  deleteSpell,
  updateSpellcasting,
  updateSpellSlot
}) {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('')

  const filteredSpells = useMemo(() => {
    let results = searchDndSpells(
      spellCatalog,
      search
    )

    if (levelFilter !== '') {
      results = results.filter(
        spell =>
          spell.level === Number(levelFilter)
      )
    }

    return results
  }, [spellCatalog, search, levelFilter])

  const characterSpells =
    data?.spells || []

  const preparedSpells =
    sortDndCharacterSpells(
      characterSpells.filter(
        spell =>
          spell.prepared ||
          spell.alwaysPrepared
      ),
      spellCatalog
    )

  const unpreparedSpells =
    sortDndCharacterSpells(
      characterSpells.filter(
        spell =>
          !spell.prepared &&
          !spell.alwaysPrepared
      ),
      spellCatalog
    )

  function renderCharacterSpell(spell) {
    const catalogSpell =
      spellCatalog.find(
        catalogItem =>
          catalogItem.key === spell.spellKey
      )

    return (
      <div
        key={spell.spellKey}
        className="col-12 col-lg-6"
      >
        <DndSpellCard
          spell={spell}
          catalogSpell={catalogSpell}
          editable={true}
          updateSpell={updateSpell}
          deleteSpell={deleteSpell}
        />
      </div>
    )
  }

  const spellcasting =
    data?.spellcasting || {}

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Magia
      </div>

      <div className="card-body p-4">

        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className="badge rpg-dnd-badge-muted">
            Catálogo: {spellCatalog.length} hechizos
          </span>

          <span className="badge rpg-dnd-badge">
            Personaje: {characterSpells.length}
          </span>
        </div>

        {spellsLoading && (
          <div className="alert alert-info">
            Cargando catálogo de hechizos...
          </div>
        )}

        {spellsError && (
          <div className="alert alert-warning">
            {spellsError}
          </div>
        )}

        {/* LANZAMIENTO DE CONJUROS */}

        <section className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Lanzamiento de conjuros
          </h6>

          <div className="row g-3">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="rpg-dnd-detail h-100">
                <label className="form-label">
                  Aptitud para lanzar conjuros
                </label>

                <select
                  className="form-select"
                  value={spellcasting.ability || ''}
                  onChange={e =>
                    updateSpellcasting(
                      'ability',
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Seleccionar
                  </option>

                  <option value="strength">
                    Fuerza
                  </option>

                  <option value="dexterity">
                    Destreza
                  </option>

                  <option value="constitution">
                    Constitución
                  </option>

                  <option value="intelligence">
                    Inteligencia
                  </option>

                  <option value="wisdom">
                    Sabiduría
                  </option>

                  <option value="charisma">
                    Carisma
                  </option>
                </select>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="rpg-dnd-detail h-100">
                <label className="form-label">
                  Modificador
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={spellcasting.modifier || ''}
                  onChange={e =>
                    updateSpellcasting(
                      'modifier',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="rpg-dnd-detail h-100">
                <label className="form-label">
                  CD de salvación
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={spellcasting.saveDC || ''}
                  onChange={e =>
                    updateSpellcasting(
                      'saveDC',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="rpg-dnd-detail h-100">
                <label className="form-label">
                  Bonificador de ataque
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={spellcasting.attackBonus || ''}
                  onChange={e =>
                    updateSpellcasting(
                      'attackBonus',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* ESPACIOS DE CONJURO */}

        <section className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Espacios de conjuro
          </h6>

          <div className="row g-3">
            {Array.from(
              { length: 9 },
              (_, index) => index + 1
            ).map(level => {
              const slot =
                data?.spellSlots?.[level] || {
                  total: '',
                  expended: ''
                }

              return (
                <div
                  key={level}
                  className="col-12 col-sm-6 col-xl-4"
                >
                  <div className="rpg-dnd-detail h-100">
                    <div className="rpg-dnd-detail-title mb-3">
                      Nivel {level}
                    </div>

                    <div className="row g-2">
                      <div className="col-6">
                        <label
                          className="form-label small"
                          htmlFor={`spell-slot-${level}-total`}
                        >
                          Total
                        </label>

                        <input
                          id={`spell-slot-${level}-total`}
                          type="number"
                          min="0"
                          className="form-control"
                          value={slot.total}
                          onChange={e =>
                            updateSpellSlot(
                              level,
                              'total',
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="col-6">
                        <label
                          className="form-label small"
                          htmlFor={`spell-slot-${level}-expended`}
                        >
                          Gastados
                        </label>

                        <input
                          id={`spell-slot-${level}-expended`}
                          type="number"
                          min="0"
                          className="form-control"
                          value={slot.expended}
                          onChange={e =>
                            updateSpellSlot(
                              level,
                              'expended',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* BUSCAR Y AGREGAR HECHIZOS */}

        <section className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Agregar hechizos
          </h6>

          <div className="row g-3">
            <div className="col-12 col-md-8">
              <label className="form-label">
                Buscar hechizo
              </label>

              <input
                type="text"
                className="form-control"
                value={search}
                onChange={e =>
                  setSearch(e.target.value)
                }
                placeholder="Ej.: Acid Arrow"
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">
                Nivel
              </label>

              <select
                className="form-select"
                value={levelFilter}
                onChange={e =>
                  setLevelFilter(e.target.value)
                }
              >
                <option value="">
                  Todos
                </option>

                <option value="0">
                  Trucos
                </option>

                <option value="1">
                  Nivel 1
                </option>

                <option value="2">
                  Nivel 2
                </option>

                <option value="3">
                  Nivel 3
                </option>

                <option value="4">
                  Nivel 4
                </option>

                <option value="5">
                  Nivel 5
                </option>

                <option value="6">
                  Nivel 6
                </option>

                <option value="7">
                  Nivel 7
                </option>

                <option value="8">
                  Nivel 8
                </option>

                <option value="9">
                  Nivel 9
                </option>
              </select>
            </div>
          </div>

          {(search.trim() !== '' ||
            levelFilter !== '') && (
              <div className="mt-3">
                <h6 className="rpg-dnd-detail-title mb-3">
                  Resultados ({filteredSpells.length})
                </h6>

                {filteredSpells.length === 0 && (
                  <div className="rpg-dnd-detail text-muted">
                    No se encontraron hechizos.
                  </div>
                )}

                <div className="d-flex flex-column gap-2">
                  {filteredSpells.map(spell => {
                    const alreadyAdded =
                      characterSpells.some(
                        characterSpell =>
                          characterSpell.spellKey ===
                          spell.key
                      )

                    return (
                      <div
                        key={spell.key}
                        className="rpg-dnd-list-item d-flex flex-wrap justify-content-between align-items-center gap-3"
                      >
                        <div className="flex-grow-1">
                          <strong>
                            {spell.name}
                          </strong>

                          <div className="small text-muted">
                            {spell.level === 0
                              ? 'Truco'
                              : `Nivel ${spell.level}`}
                            {' · '}
                            {getDndSpellSchoolName(
                              spell.school?.key
                            ) || 'Escuela desconocida'}
                          </div>
                        </div>

                        <button
                          type="button"
                          className={
                            alreadyAdded
                              ? 'btn btn-sm btn-outline-secondary'
                              : 'btn btn-sm btn-primary'
                          }
                          onClick={() =>
                            addSpell(spell.key)
                          }
                          disabled={alreadyAdded}
                        >
                          {alreadyAdded
                            ? 'Agregado'
                            : 'Agregar'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
        </section>

        {/* HECHIZOS DEL PERSONAJE */}

        <section>
          <h6 className="rpg-dnd-detail-title mb-3">
            Hechizos del personaje
          </h6>

          {characterSpells.length === 0 && (
            <div className="rpg-dnd-detail text-muted">
              Todavía no hay hechizos registrados.
              Usá el buscador para agregar los que necesites.
            </div>
          )}

          {preparedSpells.length > 0 && (
            <div className="mb-4">
              <h6 className="small fw-semibold mb-3">
                Preparados ({preparedSpells.length})
              </h6>

              <div className="row g-3">
                {preparedSpells.map(
                  renderCharacterSpell
                )}
              </div>
            </div>
          )}

          {unpreparedSpells.length > 0 && (
            <div>
              <h6 className="small fw-semibold mb-3">
                No preparados ({unpreparedSpells.length})
              </h6>

              <div className="row g-3">
                {unpreparedSpells.map(
                  renderCharacterSpell
                )}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default DndSpellForm

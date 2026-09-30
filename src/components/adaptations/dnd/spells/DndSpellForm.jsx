/* Yo muestro los hechizos del formulario de D&D */
import { useMemo, useState } from 'react'
import {
  searchDndSpells,
  sortDndCharacterSpells
} from '../dndSpellUtils'
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
          catalogItem.key ===
          spell.spellKey
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

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4>Magia</h4>

        <p>
          Hechizos disponibles en el catálogo:{' '}
          {spellCatalog.length}
        </p>

        <p>
          Hechizos del personaje:{' '}
          {characterSpells.length}
        </p>

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

        <div className="mt-4">
          <h5>Lanzamiento de conjuros</h5>

          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">
                Aptitud para lanzar conjuros
              </label>

              <select
                className="form-select"
                value={
                  data?.spellcasting?.ability ||
                  ''
                }
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

            <div className="col-md-3">
              <label className="form-label">
                Modificador
              </label>

              <input
                type="number"
                className="form-control"
                value={
                  data?.spellcasting
                    ?.modifier || ''
                }
                onChange={e =>
                  updateSpellcasting(
                    'modifier',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                CD de salvación
              </label>

              <input
                type="number"
                className="form-control"
                value={
                  data?.spellcasting?.saveDC ||
                  ''
                }
                onChange={e =>
                  updateSpellcasting(
                    'saveDC',
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                Bonificador de ataque
              </label>

              <input
                type="number"
                className="form-control"
                value={
                  data?.spellcasting
                    ?.attackBonus || ''
                }
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

        <div className="mt-4">
          <h5>Espacios de conjuro</h5>

          <div className="row g-2">
            <div className="col-4">
              <strong>Nivel</strong>
            </div>

            <div className="col-4">
              <strong>Total</strong>
            </div>

            <div className="col-4">
              <strong>Gastados</strong>
            </div>
          </div>

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
                className="row g-2 mt-1"
              >
                <div className="col-4 d-flex align-items-center">
                  Nivel {level}
                </div>

                <div className="col-4">
                  <input
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

                <div className="col-4">
                  <input
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
            )
          })}
        </div>

        <div className="mt-4">
          <h5>Agregar hechizos</h5>

          <div className="row g-3">
            <div className="col-md-8">
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

            <div className="col-md-4">
              <label className="form-label">
                Nivel
              </label>

              <select
                className="form-select"
                value={levelFilter}
                onChange={e =>
                  setLevelFilter(
                    e.target.value
                  )
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
        </div>

        {(search.trim() !== '' ||
          levelFilter !== '') && (
            <div className="mt-4">
              <h6>Resultados</h6>

              {filteredSpells.length === 0 && (
                <p className="text-muted">
                  No se encontraron hechizos.
                </p>
              )}

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
                    className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                  >
                    <div>
                      <strong>
                        {spell.name}
                      </strong>

                      <div className="small text-muted">
                        {spell.level === 0
                          ? 'Truco'
                          : `Nivel ${spell.level}`}
                        {' · '}
                        {spell.school?.name ||
                          'Escuela desconocida'}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
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
          )}

        {characterSpells.length > 0 && (
          <div className="mt-4">
            <h5>Hechizos del personaje</h5>

            {preparedSpells.length > 0 && (
              <div className="mt-3">
                <h6>Preparados</h6>

                <div className="row g-3">
                  {preparedSpells.map(
                    renderCharacterSpell
                  )}
                </div>
              </div>
            )}

            {unpreparedSpells.length > 0 && (
              <div className="mt-4">
                <h6>
                  No preparados
                </h6>

                <div className="row g-3">
                  {unpreparedSpells.map(
                    renderCharacterSpell
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DndSpellForm

/* Yo muestro los hechizos del formulario de D&D */
function DndSpellForm({
  data,
  spellCatalog,
  spellsLoading,
  spellsError,
  addSpell,
  updateSpell,
  deleteSpell
}) {
  const characterSpells =
    data?.spells || []

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

        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            addSpell('srd-2024_acid-arrow')
          }
          disabled={
            characterSpells.some(
              spell =>
                spell.spellKey ===
                'srd-2024_acid-arrow'
            )
          }
        >
          Agregar Acid Arrow
        </button>

        {characterSpells.length > 0 && (
          <div className="mt-4">
            <h5>Hechizos seleccionados</h5>

            {characterSpells.map(spell => {
              const catalogSpell =
                spellCatalog.find(
                  catalogItem =>
                    catalogItem.key ===
                    spell.spellKey
                )

              return (
                <div
                  key={spell.spellKey}
                  className="card mb-2"
                >
                  <div className="card-body">
                    <strong>
                      {catalogSpell?.name ||
                        spell.spellKey}
                    </strong>

                    <div className="mt-2">
                      <label className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={spell.prepared}
                          onChange={e =>
                            updateSpell(
                              spell.spellKey,
                              {
                                prepared:
                                  e.target.checked
                              }
                            )
                          }
                        />

                        <span className="form-check-label">
                          Preparado
                        </span>
                      </label>
                    </div>

                    <div className="mt-2">
                      <label className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            spell.alwaysPrepared
                          }
                          onChange={e =>
                            updateSpell(
                              spell.spellKey,
                              {
                                alwaysPrepared:
                                  e.target.checked
                              }
                            )
                          }
                        />

                        <span className="form-check-label">
                          Siempre preparado
                        </span>
                      </label>
                    </div>

                    <div className="mt-2">
                      <label className="form-label">
                        Notas
                      </label>

                      <textarea
                        className="form-control"
                        value={spell.notes}
                        onChange={e =>
                          updateSpell(
                            spell.spellKey,
                            {
                              notes:
                                e.target.value
                            }
                          )
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger mt-3"
                      onClick={() =>
                        deleteSpell(
                          spell.spellKey
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DndSpellForm

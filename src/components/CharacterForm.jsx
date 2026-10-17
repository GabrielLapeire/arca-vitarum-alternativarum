/* Yo muestro interfaz. */
import DndCharacterForm from './adaptations/dnd/DndCharacterForm'

function CharacterForm({
  newCharacter,
  setNewCharacter,
  saveCharacter,
  editingId,
  errors,
  newAdaptation,
  setNewAdaptation,
  editingAdaptationId,
  saveAdaptation,
  updateAdaptation,
  hasUnsavedCharacterChanges,
  onRequestCancelCharacter,
  onRequestCancelAdaptation,
  onRequestDeleteAdaptation,
  onRequestChangeAdaptationSystem
}) {
  const isAdaptationActive =
    editingAdaptationId !== null ||
    newAdaptation.system !== ''

  const isSupportedSystem =
    newAdaptation.system === 'dnd'

  function updateAdaptationData(updater) {
    setNewAdaptation(previousAdaptation => ({
      ...previousAdaptation,
      data: typeof updater === 'function'
        ? updater(previousAdaptation.data || {})
        : updater
    }))
  }

  return (
    <div className="card rpg-card mb-4">
      <div className="card-body p-4">
        <div className="mb-4">
          <h3 className="card-title mb-1">
            {editingId
              ? "Editar personaje"
              : "Crear personaje"}
          </h3>

          <p className="text-muted small mb-0">
            Datos básicos del personaje y sus adaptaciones.
          </p>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={newCharacter.name}
              onChange={(e) =>
                setNewCharacter({
                  ...newCharacter,
                  name: e.target.value
                })
              }
            />

            {errors.name && (
              <div className="text-danger">
                {errors.name}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={newAdaptation.system}
              onChange={(e) =>
                onRequestChangeAdaptationSystem(e.target.value)
              }
            >
              <option value="">
                Seleccionar sistema
              </option>

              <option value="dnd">
                D&D
              </option>

              <option value="daggerheart">
                DaggerHeart
              </option>
            </select>

            {errors.system && (
              <div className="text-danger">
                {errors.system}
              </div>
            )}

            {errors.adaptations && (
              <div className="text-danger">
                {errors.adaptations}
              </div>
            )}
          </div>
        </div>

        {newCharacter.adaptations.length > 0 && (
          <div className="col-12 mt-4">
            <h5>Adaptaciones</h5>

            <ul className="list-group">
              {newCharacter.adaptations.map(
                (adaptation) => {
                  const isEditing =
                    editingAdaptationId === adaptation.id

                  return (
                    <li
                      key={adaptation.id}
                      className={
                        `list-group-item d-flex ` +
                        `justify-content-between ` +
                        `align-items-center ` +
                        `${isEditing
                          ? 'list-group-item-warning'
                          : ''}`
                      }
                    >
                      <span>
                        {adaptation.system === 'dnd'
                          ? 'D&D'
                          : adaptation.system}

                        {adaptation.version &&
                          ` - ${adaptation.version}`}

                        {isEditing && (
                          <span className="badge text-bg-warning ms-2">
                            Editando
                          </span>
                        )}
                      </span>

                      {!isAdaptationActive && (
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateAdaptation(
                                adaptation.id
                              )
                            }
                            className="btn btn-sm btn-warning"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onRequestDeleteAdaptation(adaptation)
                            }
                            className="btn btn-sm btn-danger"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        )}

        {newAdaptation.system === 'dnd' && (
          <DndCharacterForm
            data={newAdaptation.data}
            setData={updateAdaptationData}
          />
        )}

        {newAdaptation.system !== '' &&
          !isSupportedSystem && (
            <div className="card rpg-card mt-4">
              <div className="card-body p-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                  <h4 className="rpg-dnd-form-title mb-0">
                    {newAdaptation.system === 'daggerheart'
                      ? 'DaggerHeart'
                      : newAdaptation.system}
                  </h4>

                  <span className="badge rpg-dnd-badge-muted">
                    En desarrollo
                  </span>
                </div>

                <p className="mb-2">
                  La ficha de este sistema todavía no está
                  implementada.
                </p>

                <p className="text-muted mb-0">
                  Por ahora, podés crear y editar adaptaciones
                  de D&D 2024. Elegí D&D en el selector superior
                  o cancelá la adaptación para continuar.
                </p>
              </div>
            </div>
          )}

        <div className="sticky-bottom rpg-form-actions mt-4 pt-3 pb-2">
          <div className="d-flex flex-wrap justify-content-end gap-2">

            {isAdaptationActive ? (
              <>
                <button
                  type="button"
                  onClick={onRequestCancelAdaptation}
                  className="btn btn-secondary"
                >
                  {editingAdaptationId !== null
                    ? 'Cancelar edición'
                    : 'Cancelar adaptación'}
                </button>

                <button
                  type="button"
                  onClick={saveAdaptation}
                  className="btn btn-primary"
                  disabled={!isSupportedSystem}
                >
                  {!isSupportedSystem
                    ? 'Sistema no disponible'
                    : editingAdaptationId !== null
                      ? 'Actualizar adaptación'
                      : 'Agregar adaptación'}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={saveCharacter}
                className="btn btn-primary"
              >
                {editingId !== null
                  ? 'Actualizar personaje'
                  : 'Guardar personaje'}
              </button>
            )}

            {(editingId !== null ||
              hasUnsavedCharacterChanges) && (
                <button
                  type="button"
                  onClick={onRequestCancelCharacter}
                  className="btn btn-secondary"
                >
                  {editingId !== null
                    ? 'Cancelar edición del personaje'
                    : 'Descartar personaje'}
                </button>
              )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterForm

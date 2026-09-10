/* Yo muestro interfaz. */
import DndCharacterForm from './adaptations/dnd/DndCharacterForm'

function CharacterForm({
  newCharacter,
  setNewCharacter,
  saveCharacter,
  editingId,
  cancelUpdateCharacter,
  errors,
  newAdaptation,
  setNewAdaptation,
  editingAdaptationId,
  saveAdaptation,
  updateAdaptation,
  cancelUpdateAdaptation,
  deleteAdaptation,
  changeAdaptationSystem
}) {
  const isAdaptationActive =
    editingAdaptationId !== null ||
    newAdaptation.system !== ''

  function updateAdaptationData(updater) {
    setNewAdaptation(previousAdaptation => ({
      ...previousAdaptation,
      data: typeof updater === 'function'
        ? updater(previousAdaptation.data || {})
        : updater
    }))
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h3 className="card-title mb-3">
          {editingId
            ? "Editar personaje"
            : "Crear personaje"}
        </h3>

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
                changeAdaptationSystem(e.target.value)
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
                              deleteAdaptation(
                                adaptation.id
                              )
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

        <div
          className="
            sticky-bottom
            bg-body
            border-top
            mt-4
            pt-3
            pb-2
          "
        >
          <div className="d-flex justify-content-end gap-2">
            {isAdaptationActive ? (
              <>
                <button
                  type="button"
                  onClick={cancelUpdateAdaptation}
                  className="btn btn-secondary"
                >
                  {editingAdaptationId !== null
                    ? "Cancelar edición"
                    : "Cancelar adaptación"}
                </button>

                <button
                  type="button"
                  onClick={saveAdaptation}
                  className="btn btn-success"
                >
                  {editingAdaptationId !== null
                    ? "Actualizar adaptación"
                    : "Agregar adaptación"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={saveCharacter}
                  className="btn btn-primary"
                >
                  {editingId
                    ? "Actualizar personaje"
                    : "Guardar personaje"}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={cancelUpdateCharacter}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterForm

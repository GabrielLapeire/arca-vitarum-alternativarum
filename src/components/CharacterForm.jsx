/* Yo muestro interfaz. */
function CharacterForm({
  newCharacter,
  setNewCharacter,
  saveCharacter,
  editingId,
  cancelUpdateCharacter,
  errors,
  newAdaptation,
  setNewAdaptation,
  editingAdaptationIndex,
  saveAdaptation,
  updateAdaptation,
  cancelUpdateAdaptation,
  deleteAdaptation
}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h3 className="card-title mb-3">
          {editingId ? "Editar personaje" : "Crear personaje"}
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
                setNewAdaptation({
                  ...newAdaptation,
                  system: e.target.value
                })
              }
            >
              <option value="">Seleccionar sistema</option>
              <option value="dnd5e">D&D</option>
              <option value="daggerheart">DaggerHeart</option>
              <option value="icons">Icons</option>
              <option value="vampire">Vampiro: La Mascarada</option>
              <option value="imperium-maledictum">Imperium Maledictum</option>
              <option value="wrath-glory">Wrath & Glory</option>
            </select>

            <button
              type="button"
              onClick={saveAdaptation}
              className="btn btn-success mt-2"
            >
              {editingAdaptationIndex !== null
                ? "Actualizar adaptación"
                : "Agregar adaptación"}
            </button>

            {newCharacter.adaptations.length > 0 && (
              <div className="col-12">
                <h5>Adaptaciones</h5>

                <ul className="list-group">
                  {newCharacter.adaptations.map((adaptation, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {adaptation.system}
                      </span>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateAdaptation(index)}
                          className="btn btn-sm btn-warning"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteAdaptation(index)}
                          className="btn btn-sm btn-danger"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <button
            onClick={saveCharacter}
            className="btn btn-primary"
          >
            {editingId ? "Actualizar personaje" : "Guardar personaje"}
          </button>

          {editingId !== null && (
            <button
              onClick={cancelUpdateCharacter}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterForm

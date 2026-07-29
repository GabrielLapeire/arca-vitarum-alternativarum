function CharacterForm({
  newCharacter,
  setNewCharacter,
  saveCharacter,
  editingId
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
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Raza"
              value={newCharacter.race}
              onChange={(e) =>
                setNewCharacter({
                  ...newCharacter,
                  race: e.target.value
                })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Clase"
              value={newCharacter.className}
              onChange={(e) =>
                setNewCharacter({
                  ...newCharacter,
                  className: e.target.value
                })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Nivel"
              value={newCharacter.level}
              onChange={(e) =>
                setNewCharacter({
                  ...newCharacter,
                  level: Number(e.target.value)
                })
              }
            />
          </div>
        </div>
        <button
          onClick={saveCharacter}
          className="btn btn-primary mt-4"
        >
          {editingId ? "Actualizar personaje" : "Guardar personaje"}
        </button>

      </div>
    </div>
  )
}

export default CharacterForm

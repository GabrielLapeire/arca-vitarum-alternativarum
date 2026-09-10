/* INFORMACIÓN BÁSICA */
function DndBasicInfoSection({
  data,
  updateField
}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Información básica</strong>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              Nombre del jugador
            </label>

            <input
              type="text"
              className="form-control"
              value={data.playerName || ''}
              onChange={(e) =>
                updateField(
                  'playerName',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Clase
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ej.: Guerrero"
              value={data.className || ''}
              onChange={(e) =>
                updateField(
                  'className',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Nivel
            </label>

            <input
              type="number"
              min="1"
              max="20"
              className="form-control"
              value={data.level || ''}
              onChange={(e) =>
                updateField(
                  'level',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Subclase
            </label>

            <input
              type="text"
              className="form-control"
              value={data.subclass || ''}
              onChange={(e) =>
                updateField(
                  'subclass',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Experiencia
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              value={data.experience || ''}
              onChange={(e) =>
                updateField(
                  'experience',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Trasfondo
            </label>

            <input
              type="text"
              className="form-control"
              value={data.background || ''}
              onChange={(e) =>
                updateField(
                  'background',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Especie
            </label>

            <input
              type="text"
              className="form-control"
              value={data.species || ''}
              onChange={(e) =>
                updateField(
                  'species',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Alineamiento
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ej.: Neutral bueno"
              value={data.alignment || ''}
              onChange={(e) =>
                updateField(
                  'alignment',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              Idiomas
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ej.: Común, Elfo, Dracónico"
              value={data.languages || ''}
              onChange={(e) =>
                updateField(
                  'languages',
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndBasicInfoSection

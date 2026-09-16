/* INFORMACIÓN BÁSICA */
import { formatValue } from '../dndUtils'
function DndBasicInfoView({
  characterName,
  data
}) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>Información básica</strong>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-6">
            <strong>Nombre</strong>
            <div>
              {formatValue(characterName)}
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
  )
}

export default DndBasicInfoView

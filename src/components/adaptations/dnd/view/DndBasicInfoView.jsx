/* INFORMACIÓN BÁSICA */
import { formatValue } from '../dndUtils'

function DndBasicInfoView({
  characterName,
  data
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Información básica
      </div>

      <div className="card-body p-4">
        <div className="row g-4">

          <div className="col-md-6">
            <span className="rpg-dnd-value-label">
              Nombre
            </span>

            <div className="rpg-dnd-value">
              {formatValue(characterName)}
            </div>
          </div>

          <div className="col-md-6">
            <span className="rpg-dnd-value-label">
              Clase
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.className)}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <span className="rpg-dnd-value-label">
              Nivel
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.level)}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <span className="rpg-dnd-value-label">
              Experiencia
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.experience)}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <span className="rpg-dnd-value-label">
              Subclase
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.subclass)}
            </div>
          </div>

          <div className="col-6 col-md-3">
            <span className="rpg-dnd-value-label">
              Especie
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.species)}
            </div>
          </div>

          <div className="col-md-4">
            <span className="rpg-dnd-value-label">
              Trasfondo
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.background)}
            </div>
          </div>

          <div className="col-md-4">
            <span className="rpg-dnd-value-label">
              Alineamiento
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.alignment)}
            </div>
          </div>

          <div className="col-md-4">
            <span className="rpg-dnd-value-label">
              Idiomas
            </span>

            <div className="rpg-dnd-value">
              {formatValue(data.languages)}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DndBasicInfoView

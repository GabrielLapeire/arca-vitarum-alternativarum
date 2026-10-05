/* HISTORIA Y PERSONALIDAD */
import { formatValue } from '../dndUtils'

function DndCharacterInfoView({
  data
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Historia y personalidad
      </div>

      <div className="card-body p-4">
        <div className="row g-3">

          <div className="col-md-6">
            <div className="rpg-dnd-text-block">
              <span className="rpg-dnd-value-label">
                Apariencia
              </span>

              <p className="mb-0">
                {formatValue(
                  data.appearance
                )}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="rpg-dnd-text-block">
              <span className="rpg-dnd-value-label">
                Personalidad
              </span>

              <p className="mb-0">
                {formatValue(
                  data.personality
                )}
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="rpg-dnd-text-block">
              <span className="rpg-dnd-value-label">
                Historia / trasfondo narrativo
              </span>

              <p className="mb-0">
                {formatValue(
                  data.backstory
                )}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DndCharacterInfoView

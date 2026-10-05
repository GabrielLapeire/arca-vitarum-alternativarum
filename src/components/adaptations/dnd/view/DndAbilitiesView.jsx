/* CARACTERÍSTICAS */
import { ABILITIES } from '../dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  formatValue
} from '../dndUtils'

function DndAbilitiesView({
  abilities
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Características
      </div>

      <div className="card-body p-4">
        <div className="row g-3">

          {ABILITIES.map(ability => {
            const score =
              abilities?.[ability.id]

            const modifier =
              getAbilityModifier(score)

            return (
              <div
                className="col-6 col-md-4 col-lg-2"
                key={ability.id}
              >
                <div className="rpg-dnd-stat">

                  <div className="rpg-dnd-stat-name">
                    {ability.name}
                  </div>

                  <div className="rpg-dnd-stat-score">
                    {formatValue(score)}
                  </div>

                  <div className="rpg-dnd-stat-modifier">
                    <span className="rpg-dnd-modifier">
                      {formatValue(
                        formatModifier(modifier)
                      )}
                    </span>
                  </div>

                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default DndAbilitiesView

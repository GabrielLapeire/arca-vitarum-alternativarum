/* CARACTERÍSTICAS */
import { ABILITIES } from '../dndConstants'
import {
  getAbilityModifier,
  formatModifier
} from '../dndUtils'

function DndAbilitiesSection({
  abilities,
  updateAbility
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Características
      </div>

      <div className="card-body p-4">
        <div className="row g-3">

          {ABILITIES.map(ability => {
            const modifier =
              getAbilityModifier(
                abilities[ability.id]
              )

            return (
              <div
                className="col-6 col-md-4"
                key={ability.id}
              >
                <div className="rpg-dnd-stat">

                  <label className="rpg-dnd-stat-name d-block mb-2">
                    {ability.name}
                  </label>

                  <div className="input-group">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      className="form-control"
                      value={abilities[ability.id]}
                      onChange={e =>
                        updateAbility(
                          ability.id,
                          e.target.value
                        )
                      }
                    />

                    <span className="input-group-text bg-transparent border-start-0">
                      <span className="rpg-dnd-modifier">
                        {formatModifier(modifier)}
                      </span>
                    </span>
                  </div>

                  <div className="text-muted small mt-1">
                    Modificador
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

export default DndAbilitiesSection

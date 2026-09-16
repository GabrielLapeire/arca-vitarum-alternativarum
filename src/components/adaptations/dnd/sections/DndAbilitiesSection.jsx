/* CARACTERÍSTICAS */
import { ABILITIES } from '../dndConstants'
import { getAbilityModifier, formatModifier } from '../dndUtils'
function DndAbilitiesSection({
  abilities,
  updateAbility
}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Características</strong>
      </div>

      <div className="card-body">
        <div className="row g-3">
          {ABILITIES.map(ability => {
            const modifier = getAbilityModifier(
              abilities[ability.id]
            )
            return (
              <div
                className="col-md-4"
                key={ability.id}
              >
                <div className="border rounded p-3 h-100">
                  <label className="form-label fw-bold">
                    {ability.name}
                  </label>

                  <div className="input-group">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      className="form-control"
                      value={abilities[ability.id]}
                      onChange={(e) =>
                        updateAbility(
                          ability.id,
                          e.target.value
                        )
                      }
                    />

                    <span className="input-group-text">
                      {formatModifier(modifier)}
                    </span>
                  </div>

                  <small className="text-muted">
                    Modificador
                  </small>
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

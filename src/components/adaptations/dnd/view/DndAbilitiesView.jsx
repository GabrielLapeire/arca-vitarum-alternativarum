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
    <div className="card mb-3">
      <div className="card-header">
        <strong>Características</strong>
      </div>

      <div className="card-body">
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
                <div className="border rounded p-2 text-center h-100">

                  <strong>
                    {ability.name}
                  </strong>

                  <div className="fs-4 fw-bold">
                    {formatValue(score)}
                  </div>

                  <small className="text-muted">
                    {formatModifier(modifier)}
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

export default DndAbilitiesView

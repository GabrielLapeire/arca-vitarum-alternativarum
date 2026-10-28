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
  function handleAbilityChange(abilityId, value) {
    if (value === '') {
      updateAbility(abilityId, '')
      return
    }

    // Solo acepto dígitos.
    if (!/^\d+$/.test(value)) {
      return
    }

    const score = Number(value)

    // Las características de D&D van de 1 a 30.
    if (score < 1 || score > 30) {
      return
    }

    updateAbility(abilityId, value)
  }

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Características
      </div>

      <div className="card-body p-4">
        <div className="row g-3">
          {ABILITIES.map(ability => {
            const inputId = `dnd-ability-${ability.id}`

            const modifier = getAbilityModifier(
              abilities[ability.id]
            )

            return (
              <div
                className="col-12 col-sm-6 col-md-4"
                key={ability.id}
              >
                <div className="rpg-dnd-stat">
                  <label
                    htmlFor={inputId}
                    className="rpg-dnd-stat-name d-block mb-2 text-nowrap"
                  >
                    {ability.name}
                  </label>

                  <div className="input-group">
                    <input
                      id={inputId}
                      name={`ability-${ability.id}`}
                      type="number"
                      min="1"
                      max="30"
                      step="1"
                      className="form-control"
                      value={abilities[ability.id]}
                      onChange={e =>
                        handleAbilityChange(
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

                  <div className="text-muted small mt-1 w-100 text-center text-nowrap">
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

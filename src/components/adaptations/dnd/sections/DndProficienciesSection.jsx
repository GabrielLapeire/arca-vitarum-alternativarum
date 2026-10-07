/* COMPETENCIA Y SALVACIONES */
import {
  ABILITIES,
  SKILLS
} from '../dndConstants'
import {
  formatModifier,
  getSavingThrowModifier,
  getSkillModifier
} from '../dndUtils'

function DndProficienciesSection({
  abilities,
  savingThrows,
  skills,
  proficiencyBonus,
  updateSavingThrow,
  updateSkill
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Competencias y tiradas de salvación
      </div>

      <div className="card-body p-4">

        <div className="mb-4">
          <label className="form-label d-block">
            Bonificador por competencia
          </label>

          <span className="badge rpg-dnd-badge">
            {formatModifier(proficiencyBonus)}
          </span>
        </div>

        <div className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Tiradas de salvación
          </h6>

          <div className="row g-2">
            {ABILITIES.map(ability => (
              <div
                key={ability.id}
                className="col-12 col-md-6"
              >
                <label className="rpg-dnd-list-item d-flex align-items-center gap-2 mb-0">
                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    checked={Boolean(
                      savingThrows[
                      ability.id
                      ]
                    )}
                    onChange={e =>
                      updateSavingThrow(
                        ability.id,
                        e.target.checked
                      )
                    }
                  />

                  <span className="flex-grow-1">
                    {ability.name}
                  </span>

                  <strong>
                    {formatModifier(
                      getSavingThrowModifier(
                        ability.id,
                        abilities,
                        savingThrows,
                        proficiencyBonus
                      )
                    )}
                  </strong>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h6 className="rpg-dnd-detail-title mb-3">
            Habilidades
          </h6>

          <div className="row g-2">
            {SKILLS.map(skill => (
              <div
                key={skill.id}
                className="col-12 col-md-6"
              >
                <label className="rpg-dnd-list-item d-flex align-items-center gap-2 mb-0">

                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    checked={Boolean(
                      skills[skill.id]
                    )}
                    onChange={e =>
                      updateSkill(
                        skill.id,
                        e.target.checked
                      )
                    }
                  />

                  <span className="flex-grow-1">
                    {skill.name}

                    <small className="text-muted ms-1">
                      ({ABILITIES.find(
                        ability =>
                          ability.id ===
                          skill.ability
                      )?.shortName})
                    </small>
                  </span>

                  <strong>
                    {formatModifier(
                      getSkillModifier(
                        skill,
                        abilities,
                        skills,
                        proficiencyBonus
                      )
                    )}
                  </strong>
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DndProficienciesSection

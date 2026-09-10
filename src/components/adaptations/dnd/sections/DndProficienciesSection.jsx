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
    <div className="card mb-4">
      <div className="card-header">
        <strong>
          Competencias y tiradas de salvación
        </strong>
      </div>

      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">
              Bonificador por competencia
            </label>

            <input
              type="text"
              className="form-control"
              value={
                proficiencyBonus === ''
                  ? ''
                  : formatModifier(
                    proficiencyBonus
                  )
              }
              readOnly
            />
          </div>
        </div>

        <h6>
          Tiradas de salvación
        </h6>

        <div className="row g-2 mb-4">
          {ABILITIES.map(ability => (
            <div
              className="col-md-4"
              key={ability.id}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Boolean(
                      savingThrows[ability.id]
                    )
                  }
                  onChange={(e) =>
                    updateSavingThrow(
                      ability.id,
                      e.target.checked
                    )
                  }
                />

                <label className="form-label mb-0 flex-grow-1">
                  {ability.name}
                </label>

                <span className="fw-bold">
                  {formatModifier(
                    getSavingThrowModifier(
                      ability.id,
                      abilities,
                      savingThrows,
                      proficiencyBonus
                    )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        <h6>
          Habilidades
        </h6>

        <div className="row g-2">
          {SKILLS.map(skill => (
            <div
              className="col-md-6"
              key={skill.id}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Boolean(
                      skills[skill.id]
                    )
                  }
                  onChange={(e) =>
                    updateSkill(
                      skill.id,
                      e.target.checked
                    )
                  }
                />

                <label className="form-label mb-0 flex-grow-1">
                  {skill.name}

                  <small className="text-muted ms-1">
                    ({ABILITIES.find(
                      ability =>
                        ability.id === skill.ability
                    )?.shortName})
                  </small>
                </label>

                <span className="fw-bold">
                  {formatModifier(
                    getSkillModifier(
                      skill,
                      abilities,
                      skills,
                      proficiencyBonus
                    )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DndProficienciesSection

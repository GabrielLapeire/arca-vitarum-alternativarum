/* COMPETENCIAS */
import { ABILITIES, SKILLS } from '../dndConstants'
import {
  getSavingThrowModifier,
  getSkillModifier,
  formatModifier
} from '../dndUtils'

function DndProficienciesView({
  abilities,
  savingThrows,
  skills,
  proficiencyBonus
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Competencias y tiradas de salvación
      </div>

      <div className="card-body p-4">
        <div className="mb-4">
          <span className="rpg-dnd-value-label">
            Bonificador por competencia
          </span>

          <span className="badge rpg-dnd-badge">
            {formatModifier(
              proficiencyBonus
            )}
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
                className="col-6 col-md-6"
              >
                <div className="rpg-dnd-list-item d-flex justify-content-between align-items-center">
                  <span>
                    {ability.name}

                    {savingThrows?.[
                      ability.id
                    ] && (
                        <small className="text-muted ms-2">
                          Competente
                        </small>
                      )}
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
                </div>
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
                className="col-6 col-md-6"
              >
                <div className="rpg-dnd-list-item d-flex justify-content-between align-items-center">
                  <span>
                    {skill.name}

                    {skills?.[
                      skill.id
                    ] && (
                        <small className="text-muted ms-2">
                          Competente
                        </small>
                      )}
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
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default DndProficienciesView

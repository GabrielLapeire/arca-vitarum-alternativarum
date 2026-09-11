/* COMPETENCIAS */
import { ABILITIES, SKILLS } from "../dndConstants"
import { getSavingThrowModifier, getSkillModifier } from "../dndUtils"
function DndProficienciesView({
  abilities,
  savingThrows,
  skills,
  proficiencyBonus,
  formatModifier
}) {
  return (
    < div className="card mb-3" >
      <div className="card-header">
        <strong>
          Competencias y tiradas de salvación
        </strong>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <strong>
            Bonificador por competencia
          </strong>

          <span className="ms-2 badge text-bg-primary">
            {formatModifier(
              proficiencyBonus
            )}
          </span>
        </div>

        <div className="row g-2">
          <div className="col-md-6">
            <h6>
              Tiradas de salvación
            </h6>

            <div className="list-group">
              {ABILITIES.map(ability => (
                <div
                  key={ability.id}
                  className="list-group-item d-flex justify-content-between"
                >
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
              ))}

            </div>
          </div>

          <div className="col-md-6">
            <h6>
              Habilidades
            </h6>

            <div className="list-group">
              {SKILLS.map(skill => (
                <div
                  key={skill.id}
                  className="list-group-item d-flex justify-content-between"
                >
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default DndProficienciesView

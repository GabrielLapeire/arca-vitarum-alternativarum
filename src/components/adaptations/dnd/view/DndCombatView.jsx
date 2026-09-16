/* COMBATE Y ATAQUES */
import { formatValue } from '../dndUtils'
function DndCombatView({
  data,
  effectiveInitiative,
  effectiveSpeed,
  effectiveSize,
  effectivePassivePerception
}) {
  return (

    <>
      <div className="card mb-3">
        <div className="card-header">
          <strong>Combate</strong>
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <strong>Clase de armadura</strong>
              <div>
                {formatValue(
                  data.combat?.armorClass
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Escudo</strong>
              <div>
                {formatValue(
                  data.combat?.shield
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Puntos de golpe</strong>
              <div>
                {formatValue(
                  data.combat?.currentHitPoints
                )}

                {data.combat?.maxHitPoints &&
                  ` / ${data.combat.maxHitPoints}`
                }
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>PG temporales</strong>
              <div>
                {formatValue(
                  data.combat?.temporaryHitPoints
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Iniciativa</strong>
              <div>
                {formatValue(
                  effectiveInitiative
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Velocidad</strong>
              <div>
                {formatValue(
                  effectiveSpeed
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Tamaño</strong>
              <div>
                {formatValue(
                  effectiveSize
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Percepción pasiva</strong>
              <div>
                {formatValue(
                  effectivePassivePerception
                )}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Dados de golpe</strong>
              <div>
                {formatValue(
                  data.combat?.hitDice
                )}

                {data.combat?.hitDiceSpent !== '' &&
                  data.combat?.hitDiceSpent !== undefined &&
                  ` (${data.combat.hitDiceSpent} gastados)`
                }
              </div>
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <strong>
                Salvaciones contra muerte
              </strong>

              <div className="mt-2">
                Éxitos:{' '}
                {formatValue(
                  data.combat?.deathSavesSuccesses
                )}
                {' — '}
                Fallos:{' '}
                {formatValue(
                  data.combat?.deathSavesFailures
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">
          <strong>Armas y trucos de daño</strong>
        </div>

        <div className="card-body">
          {data.attacks?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Bonif. atq./CD</th>
                    <th>Daño y tipo</th>
                    <th>Notas</th>
                  </tr>
                </thead>

                <tbody>
                  {data.attacks.map(attack => (
                    <tr key={attack.id}>
                      <td>{formatValue(attack.name)}</td>
                      <td>{formatValue(attack.attackBonus)}</td>
                      <td>{formatValue(attack.damage)}</td>
                      <td>{formatValue(attack.notes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-muted">
              No hay ataques cargados.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DndCombatView

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
      <div className="card rpg-card mb-4">
        <div className="card-header">
          Combate
        </div>

        <div className="card-body p-4">
          <div className="row g-3">

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Clase de armadura
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    data.combat?.armorClass
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Escudo
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    data.combat?.shield
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Puntos de golpe
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    data.combat?.currentHitPoints
                  )}

                  {data.combat?.maxHitPoints &&
                    ` / ${data.combat.maxHitPoints}`}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  PG temporales
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    data.combat?.temporaryHitPoints
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Iniciativa
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    effectiveInitiative
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Velocidad
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    effectiveSpeed
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Tamaño
                </span>

                <div className="rpg-dnd-value">
                  {formatValue(
                    effectiveSize
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Percepción pasiva
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    effectivePassivePerception
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Dados de golpe
                </span>

                <div className="rpg-dnd-value">
                  {formatValue(
                    data.combat?.hitDice
                  )}

                  {data.combat?.hitDiceSpent !== '' &&
                    data.combat?.hitDiceSpent !== undefined &&
                    ` (${data.combat.hitDiceSpent} gastados)`}
                </div>
              </div>
            </div>

          </div>

          <hr className="my-4" />

          <div>
            <span className="rpg-dnd-value-label">
              Salvaciones contra muerte
            </span>

            <div className="mt-2">
              Éxitos:{' '}
              <span className="rpg-dnd-modifier">
                {formatValue(
                  data.combat?.deathSavesSuccesses
                )}
              </span>

              {' '}

              Fallos:{' '}
              <span className="badge rpg-dnd-badge">
                {formatValue(
                  data.combat?.deathSavesFailures
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card rpg-card mb-4">
        <div className="card-header">
          Armas y trucos de daño
        </div>

        <div className="card-body p-4">
          {data.attacks?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
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

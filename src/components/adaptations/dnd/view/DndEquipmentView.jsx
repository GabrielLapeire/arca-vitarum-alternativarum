/* EQUIPO */
import { formatValue } from '../dndUtils'

function DndEquipmentView({
  data
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Equipo y recursos
      </div>

      <div className="card-body p-4">

        <div className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Objetos
          </h6>

          {data.equipment?.items?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Objeto</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                  </tr>
                </thead>

                <tbody>
                  {data.equipment.items.map(item => (
                    <tr key={item.id}>
                      <td>{formatValue(item.name)}</td>
                      <td>{formatValue(item.quantity)}</td>
                      <td>{item.equipped ? 'Equipado' : '—'}</td>
                      <td>{formatValue(item.description)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-muted">
              No hay objetos.
            </div>
          )}
        </div>

        <div className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Objetos sintonizados
          </h6>

          {data.equipment?.attunedItems?.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {data.equipment.attunedItems.map(
                itemId => {
                  const item =
                    data.equipment?.items?.find(
                      equipmentItem =>
                        equipmentItem.id ===
                        itemId
                    )

                  return (
                    <div
                      key={itemId}
                      className="rpg-dnd-list-item"
                    >
                      {formatValue(item?.name)}
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            <div className="text-muted">
              No hay objetos sintonizados.
            </div>
          )}
        </div>

        <div>
          <h6 className="rpg-dnd-detail-title mb-3">
            Monedas
          </h6>

          <div className="row g-3">
            <div className="col-6 col-md">
              <div className="rpg-dnd-detail text-center">
                <span className="rpg-dnd-value-label">
                  Cobre
                </span>

                <div className="rpg-dnd-value fs-5">
                  {data.equipment?.currency?.cp ?? 0}
                </div>
              </div>
            </div>

            <div className="col-6 col-md">
              <div className="rpg-dnd-detail text-center">
                <span className="rpg-dnd-value-label">
                  Plata
                </span>

                <div className="rpg-dnd-value fs-5">
                  {data.equipment?.currency?.sp ?? 0}
                </div>
              </div>
            </div>

            <div className="col-6 col-md">
              <div className="rpg-dnd-detail text-center">
                <span className="rpg-dnd-value-label">
                  Electro
                </span>

                <div className="rpg-dnd-value fs-5">
                  {data.equipment?.currency?.ep ?? 0}
                </div>
              </div>
            </div>

            <div className="col-6 col-md">
              <div className="rpg-dnd-detail text-center">
                <span className="rpg-dnd-value-label">
                  Oro
                </span>

                <div className="rpg-dnd-value fs-5">
                  {data.equipment?.currency?.gp ?? 0}
                </div>
              </div>
            </div>

            <div className="col-6 col-md">
              <div className="rpg-dnd-detail text-center">
                <span className="rpg-dnd-value-label">
                  Platino
                </span>

                <div className="rpg-dnd-value fs-5">
                  {data.equipment?.currency?.pp ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DndEquipmentView

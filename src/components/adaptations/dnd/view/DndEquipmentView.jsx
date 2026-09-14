/* EQUIPO */
import { formatValue } from '../dndUtils'
function DndEquipmentView({
  data
}) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>
          Equipo y recursos
        </strong>
      </div>

      <div className="card-body">

        <div className="mb-4">
          <strong>
            Objetos
          </strong>

          {data.equipment?.items?.length > 0 ? (
            <div className="table-responsive mt-2">
              <table className="table table-sm align-middle">
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
                      <td>
                        {formatValue(item.name)}
                      </td>

                      <td>
                        {formatValue(item.quantity)}
                      </td>

                      <td>
                        {item.equipped
                          ? 'Equipado'
                          : '—'
                        }
                      </td>

                      <td>
                        {formatValue(item.description)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-muted mt-2">
              No hay objetos.
            </div>
          )}
        </div>

        <div className="mb-4">
          <strong>
            Objetos sintonizados
          </strong>

          {data.equipment?.attunedItems?.length > 0 ? (
            <div className="mt-2 d-flex flex-column gap-2">
              {data.equipment.attunedItems.map(itemId => {
                const item =
                  data.equipment?.items?.find(
                    equipmentItem =>
                      equipmentItem.id === itemId
                  )

                return (
                  <div
                    key={itemId}
                    className="border rounded p-2"
                  >
                    {formatValue(item?.name)}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-muted mt-2">
              No hay objetos sintonizados.
            </div>
          )}
        </div>

        <div>
          <strong>
            Monedas
          </strong>

          <div className="row g-2 mt-1">
            <div className="col">
              <span className="text-muted">PC</span>
              <div>
                {data.equipment?.currency?.cp ?? 0}
              </div>
            </div>

            <div className="col">
              <span className="text-muted">PP</span>
              <div>
                {data.equipment?.currency?.sp ?? 0}
              </div>
            </div>

            <div className="col">
              <span className="text-muted">PE</span>
              <div>
                {data.equipment?.currency?.ep ?? 0}
              </div>
            </div>

            <div className="col">
              <span className="text-muted">PO</span>
              <div>
                {data.equipment?.currency?.gp ?? 0}
              </div>
            </div>

            <div className="col">
              <span className="text-muted">PPt</span>
              <div>
                {data.equipment?.currency?.pp ?? 0}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DndEquipmentView

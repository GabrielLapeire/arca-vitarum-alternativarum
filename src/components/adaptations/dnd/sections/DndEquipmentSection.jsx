/* EQUIPO */
function DndEquipmentSection({
  equipment,
  addEquipmentItem,
  updateEquipmentItem,
  deleteEquipmentItem,
  toggleAttunement,
  updateCurrency
}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Equipo y recursos</strong>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="mb-1">
              Objetos
            </h6>

            <span className="badge text-bg-secondary">
              Sintonización:{' '}
              {equipment?.attunedItems?.length || 0}/3
            </span>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={addEquipmentItem}
          >
            Agregar objeto
          </button>
        </div>

        {(!equipment?.items ||
          equipment.items.length === 0) && (
            <p className="text-muted">
              No hay objetos en el inventario.
            </p>
          )}

        <div className="d-flex flex-column gap-3">
          {(equipment?.items || []).map(item => (
            <div
              key={item.id}
              className="border rounded p-3"
            >
              <div className="row g-2 align-items-start">
                <div className="col-md-4">
                  <label className="form-label">
                    Nombre
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej.: Espada larga"
                    value={item.name}
                    onChange={(e) =>
                      updateEquipmentItem(
                        item.id,
                        { name: e.target.value }
                      )
                    }
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">
                    Cantidad
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      updateEquipmentItem(
                        item.id,
                        { quantity: e.target.value }
                      )
                    }
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">
                    Estado
                  </label>

                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={Boolean(item.equipped)}
                      onChange={(e) =>
                        updateEquipmentItem(
                          item.id,
                          { equipped: e.target.checked }
                        )
                      }
                    />

                    <label className="form-check-label">
                      Equipado
                    </label>
                  </div>

                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={
                        equipment?.attunedItems?.includes(
                          item.id
                        ) || false
                      }
                      disabled={
                        !equipment?.attunedItems?.includes(
                          item.id
                        ) &&
                        (equipment?.attunedItems?.length || 0) >= 3
                      }
                      onChange={() =>
                        toggleAttunement(item.id)
                      }
                    />

                    <label className="form-check-label">
                      Sintonizado
                    </label>
                  </div>
                </div>

                <div className="col-md-3">
                  <label className="form-label">
                    Descripción
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Detalles"
                    value={item.description}
                    onChange={(e) =>
                      updateEquipmentItem(
                        item.id,
                        { description: e.target.value }
                      )
                    }
                  />
                </div>

                <div className="col-md-1">
                  <label className="form-label d-block">
                    &nbsp;
                  </label>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      deleteEquipmentItem(item.id)
                    }
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        {/* MONEDAS */}
        <h6 className="mb-3">
          Monedas
        </h6>

        <div className="row g-3">
          {[
            ['cp', 'Cobre'],
            ['sp', 'Plata'],
            ['ep', 'Electro'],
            ['gp', 'Oro'],
            ['pp', 'Platino']
          ].map(([currency, label]) => (
            <div
              className="col-6 col-md"
              key={currency}
            >
              <label className="form-label">
                {label}
              </label>

              <input
                type="number"
                min="0"
                className="form-control"
                value={
                  equipment?.currency?.[currency] ?? 0
                }
                onChange={(e) =>
                  updateCurrency(
                    currency,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DndEquipmentSection

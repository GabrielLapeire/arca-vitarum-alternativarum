/* EQUIPO */
function DndEquipmentSection({
  equipment,
  addEquipmentItem,
  updateEquipmentItem,
  deleteEquipmentItem,
  toggleAttunement,
  updateCurrency
}) {
  const attunedItems = equipment?.attunedItems || []
  const items = equipment?.items || []
  const currency = equipment?.currency || {}

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Equipo y recursos
      </div>

      <div className="card-body p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div>
            <h6 className="rpg-dnd-detail-title mb-2">
              Objetos
            </h6>

            <span className="badge rpg-dnd-badge">
              Sintonización: {attunedItems.length}/3
            </span>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={addEquipmentItem}
          >
            + Agregar objeto
          </button>
        </div>

        {items.length === 0 && (
          <div className="rpg-dnd-detail text-muted mb-3">
            No hay objetos en el inventario.
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {items.map(item => {
            const isAttuned = attunedItems.includes(item.id)

            return (
              <div
                key={item.id}
                className="rpg-dnd-detail"
              >
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-lg-4">
                    <label className="form-label">
                      Nombre
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej.: Espada larga"
                      value={item.name}
                      onChange={e =>
                        updateEquipmentItem(
                          item.id,
                          { name: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-6 col-md-3 col-lg-2">
                    <label className="form-label">
                      Cantidad
                    </label>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={item.quantity}
                      onChange={e =>
                        updateEquipmentItem(
                          item.id,
                          { quantity: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-5 col-lg-2">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id={`equipped-${item.id}`}
                        className="form-check-input"
                        checked={Boolean(item.equipped)}
                        onChange={e =>
                          updateEquipmentItem(
                            item.id,
                            { equipped: e.target.checked }
                          )
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`equipped-${item.id}`}
                      >
                        Equipado
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id={`attuned-${item.id}`}
                        className="form-check-input"
                        checked={isAttuned}
                        disabled={
                          !isAttuned &&
                          attunedItems.length >= 3
                        }
                        onChange={() =>
                          toggleAttunement(item.id)
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`attuned-${item.id}`}
                      >
                        Sintonizado
                      </label>
                    </div>
                  </div>

                  <div className="col-12 col-lg-3">
                    <label className="form-label">
                      Descripción
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Detalles"
                      value={item.description}
                      onChange={e =>
                        updateEquipmentItem(
                          item.id,
                          { description: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-lg-1">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      aria-label={`Eliminar ${item.name || 'objeto'}`}
                      title="Eliminar objeto"
                      onClick={() =>
                        deleteEquipmentItem(item.id)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <hr className="my-4" />

        <h6 className="rpg-dnd-detail-title mb-3">
          Monedas
        </h6>

        <div className="row g-3">
          {[
            ['cp', 'Cobre'],
            ['sp', 'Plata'],
            ['ep', 'Electro'],
            ['gp', 'Oro'],
            ['pp', 'Platino']
          ].map(([currencyType, label]) => (
            <div
              className="col-6 col-md"
              key={currencyType}
            >
              <label className="form-label">
                {label}
              </label>

              <input
                type="number"
                min="0"
                className="form-control"
                value={currency[currencyType] ?? 0}
                onChange={e =>
                  updateCurrency(
                    currencyType,
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

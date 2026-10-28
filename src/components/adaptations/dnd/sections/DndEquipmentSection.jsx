/* EQUIPO */
import { handleIntegerInput } from '../dndInputUtils'

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

  function updateEquipmentInteger(
    itemId,
    field,
    event,
    options
  ) {
    handleIntegerInput(
      event,
      value =>
        updateEquipmentItem(
          itemId,
          { [field]: value }
        ),
      options
    )
  }

  function updateCurrencyInteger(
    currencyType,
    event
  ) {
    handleIntegerInput(
      event,
      value => updateCurrency(currencyType, value),
      { min: 0 }
    )
  }

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
            const isAttuned =
              attunedItems.includes(item.id)

            const nameId =
              `equipment-name-${item.id}`

            const quantityId =
              `equipment-quantity-${item.id}`

            const descriptionId =
              `equipment-description-${item.id}`

            const equippedId =
              `equipped-${item.id}`

            const attunedId =
              `attuned-${item.id}`

            return (
              <div
                key={item.id}
                className="rpg-dnd-detail"
              >
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-lg-3">
                    <label
                      htmlFor={nameId}
                      className="form-label"
                    >
                      Nombre
                    </label>

                    <input
                      id={nameId}
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
                    <label
                      htmlFor={quantityId}
                      className="form-label"
                    >
                      Cantidad
                    </label>

                    <input
                      id={quantityId}
                      type="number"
                      min="1"
                      step="1"
                      className="form-control"
                      value={item.quantity ?? ''}
                      onChange={e =>
                        updateEquipmentInteger(
                          item.id,
                          'quantity',
                          e,
                          { min: 1 }
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-5 col-lg-2">
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id={equippedId}
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
                        htmlFor={equippedId}
                      >
                        Equipado
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id={attunedId}
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
                        htmlFor={attunedId}
                      >
                        Sintonizado
                      </label>
                    </div>
                  </div>

                  <div className="col-12 col-lg-3">
                    <label
                      htmlFor={descriptionId}
                      className="form-label"
                    >
                      Descripción
                    </label>

                    <input
                      id={descriptionId}
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

                  <div className="col-12 col-lg-2 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger text-nowrap"
                      aria-label={
                        `Eliminar ${item.name || 'objeto'}`
                      }
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
          ].map(([currencyType, label]) => {
            const inputId =
              `dnd-currency-${currencyType}`

            return (
              <div
                className="col-6 col-md"
                key={currencyType}
              >
                <label
                  htmlFor={inputId}
                  className="form-label"
                >
                  {label}
                </label>

                <input
                  id={inputId}
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  value={currency[currencyType] ?? 0}
                  onChange={e =>
                    updateCurrencyInteger(
                      currencyType,
                      e
                    )
                  }
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DndEquipmentSection

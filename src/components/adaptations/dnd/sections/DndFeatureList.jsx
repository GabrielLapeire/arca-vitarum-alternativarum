/* Una lista de rasgos */
import { useState } from 'react'

function DndFeatureList({
  title,
  addLabel,
  emptyMessage,
  field,
  items,
  updateListItem,
  addListItem,
  deleteListItem
}) {
  const [collapsedItems, setCollapsedItems] = useState(
    () => new Set(items.map(item => item.id))
  )

  function toggleItem(itemId) {
    setCollapsedItems(previousItems => {
      const nextItems = new Set(previousItems)

      if (nextItems.has(itemId)) {
        nextItems.delete(itemId)
      } else {
        nextItems.add(itemId)
      }

      return nextItems
    })
  }

  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-start align-items-md-center gap-2 mb-3">
        <h6 className="rpg-dnd-detail-title mb-0">
          {title}
        </h6>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => addListItem(field)}
        >
          + {addLabel}
        </button>
      </div>

      {items.length === 0 && (
        <div className="rpg-dnd-detail text-muted mb-3">
          {emptyMessage}
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {items.map(item => (
          <div
            key={item.id}
            className="rpg-dnd-detail rpg-dnd-feature-card"
          >
            <div className="rpg-dnd-feature-header d-flex align-items-center gap-2">
              <div className="rpg-dnd-feature-heading flex-grow-1">
                <span className="rpg-dnd-feature-toggle-icon" aria-hidden="true">
                  {collapsedItems.has(item.id) ? '▸' : '▾'}
                </span>

                <span className="rpg-dnd-feature-name">
                  {item.name || 'Rasgo sin nombre'}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary rpg-dnd-feature-toggle-button"
                aria-expanded={!collapsedItems.has(item.id)}
                aria-controls={`${field}-content-${item.id}`}
                onClick={() => toggleItem(item.id)}
              >
                {collapsedItems.has(item.id) ? 'Expandir' : 'Contraer'}
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger rpg-dnd-feature-delete-button"
                aria-label={`Eliminar ${item.name || 'rasgo'}`}
                title="Eliminar"
                onClick={() => deleteListItem(field, item.id)}
              >
                ×
              </button>
            </div>

            {collapsedItems.has(item.id) && item.description && (
              <p className="rpg-dnd-feature-preview mb-0">
                {item.description}
              </p>
            )}

            <div
              id={`${field}-content-${item.id}`}
              className="rpg-dnd-feature-content"
              hidden={collapsedItems.has(item.id)}
            >
              <div className="row g-3 align-items-start">
                <div className="col-12 col-lg-4">
                  <label
                    className="form-label"
                    htmlFor={`${field}-name-${item.id}`}
                  >
                    Nombre
                  </label>

                  <input
                    id={`${field}-name-${item.id}`}
                    type="text"
                    className="form-control"
                    placeholder="Nombre del rasgo"
                    value={item.name}
                    onChange={e =>
                      updateListItem(
                        field,
                        item.id,
                        { name: e.target.value }
                      )
                    }
                  />
                </div>

                <div className="col-12 col-lg-7">
                  <label
                    className="form-label"
                    htmlFor={`${field}-description-${item.id}`}
                  >
                    Descripción
                  </label>

                  <textarea
                    id={`${field}-description-${item.id}`}
                    className="form-control"
                    rows="2"
                    placeholder="Descripción"
                    value={item.description}
                    onChange={e =>
                      updateListItem(
                        field,
                        item.id,
                        { description: e.target.value }
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DndFeatureList

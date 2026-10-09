/* Una lista de rasgos */
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
  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
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
            className="rpg-dnd-detail"
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

              <div className="col-12 col-lg-1 d-flex justify-content-lg-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  aria-label={`Eliminar ${item.name || 'rasgo'}`}
                  title="Eliminar"
                  onClick={() =>
                    deleteListItem(field, item.id)
                  }
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DndFeatureList

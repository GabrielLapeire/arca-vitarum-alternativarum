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
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          {title}
        </h6>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => addListItem(field)}
        >
          {addLabel}
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-muted mb-0">
          {emptyMessage}
        </p>
      )}

      <div className="d-flex flex-column gap-3">
        {items.map(item => (
          <div
            key={item.id}
            className="border rounded p-3"
          >
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={item.name}
                  onChange={(e) =>
                    updateListItem(
                      field,
                      item.id,
                      { name: e.target.value }
                    )
                  }
                />
              </div>

              <div className="col-md-7">
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Descripción"
                  value={item.description}
                  onChange={(e) =>
                    updateListItem(
                      field,
                      item.id,
                      { description: e.target.value }
                    )
                  }
                />
              </div>

              <div className="col-md-1 d-flex align-items-start">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
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

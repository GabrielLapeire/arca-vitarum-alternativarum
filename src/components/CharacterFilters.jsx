/* Yo muestro interfaz. */
function CharacterFilters({
  search,
  setSearch,
  sortBy,
  setSortBy
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-body p-4">
        <h5 className="card-title mb-1">
          Buscar y ordenar personajes
        </h5>

        <p className="text-muted small mb-4">
          Encontrá rápidamente un personaje y elegí
          cómo ordenar la lista.
        </p>

        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label className="form-label">
              Buscar
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Nombre del personaje..."
              value={search}
              onChange={e =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">
              Ordenar por
            </label>

            <select
              className="form-select"
              value={sortBy}
              onChange={e =>
                setSortBy(e.target.value)
              }
            >
              <option value="nameAsc">
                Nombre A-Z
              </option>

              <option value="nameDesc">
                Nombre Z-A
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterFilters

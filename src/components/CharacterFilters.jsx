/* Yo muestro interfaz. */
function CharacterFilters({
  search,
  setSearch,
  sortBy,
  setSortBy
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          Buscar y filtrar personajes
        </h5>

        <div className="row g-3">

          <div className="col-md-12">
            <label className="form-label">
              Buscar
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Ordenar por
            </label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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

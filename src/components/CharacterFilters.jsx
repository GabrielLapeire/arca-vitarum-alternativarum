function CharacterFilters({
  search,
  setSearch,
  raceFilter,
  setRaceFilter,
  raceFilterOptions,
  classFilter,
  setClassFilter,
  classFilterOptions,
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
              placeholder="Nombre, raza o clase..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>


          <div className="col-md-4">
            <label className="form-label">
              Raza
            </label>
            <select
              className="form-select"
              value={raceFilter}
              onChange={(e) => setRaceFilter(e.target.value)}
            >
              <option value="all">
                Todas las razas
              </option>

              {raceFilterOptions.map(race => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>


          <div className="col-md-4">
            <label className="form-label">
              Clase
            </label>
            <select
              className="form-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="all">
                Todas las clases
              </option>

              {classFilterOptions.map(className => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
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

              <option value="levelDesc">
                Nivel mayor a menor
              </option>

              <option value="levelAsc">
                Nivel menor a mayor
              </option>
            </select>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CharacterFilters

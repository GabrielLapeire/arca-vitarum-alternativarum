function CharacterFilters({
  search,
  setSearch
}) {
  return (
    <div className="card shadow mb-4">
      <div className="card-body">

        <label className="form-label">
          Buscar personaje
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
    </div>
  )
}

export default CharacterFilters

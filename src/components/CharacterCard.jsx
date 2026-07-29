function CharacterCard({
  character,
  updateCharacter,
  deleteCharacter
}) {
  return (
    <div className="card shadow h-100">
      <div className="card-body">
        <h5 className="card-title">
          {character.name}
        </h5>
        <p className="card-text">
          <strong>Raza:</strong> {character.race}
          <br />
          <strong>Clase:</strong> {character.className}
          <br />
          <strong>Nivel:</strong> {character.level}
        </p>
        <div className="d-flex gap-2">
          <button
            onClick={() => updateCharacter(character.id)}
            className="btn btn-warning"
          >
            Editar
          </button>

          <button
            onClick={() => deleteCharacter(character.id)}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard

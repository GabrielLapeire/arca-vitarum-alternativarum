/* Yo muestro interfaz. */
function CharacterCard({
  character,
  updateCharacter,
  deleteCharacter
}) {
  return (
    <div className="card shadow h-100">
      <div className="card-body">
        <h5 className="card-title">
          {character.data.name}
        </h5>
        <p className="card-text">
          <strong>Raza:</strong> {character.data.race}
          <br />
          <strong>Clase:</strong> {character.data.className}
          <br />
          <strong>Nivel:</strong> {character.data.level}
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

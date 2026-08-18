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
          {character.name}
        </h5>
        <div className="card-text">
          <strong>Adaptaciones:</strong>

          <ul className="mt-2">
            {character.adaptations.map((adaptation, index) => (
              <li key={index}>
                {adaptation.system}
                {adaptation.version && ` - ${adaptation.version}`}
              </li>
            ))}
          </ul>
        </div>
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

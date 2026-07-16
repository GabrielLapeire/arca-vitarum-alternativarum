function CharacterCard({ character, index, updateCharacter, deleteCharacter }) {
  return (
    <div>
      CharacterCard
      <div className="card">
        <p>
          Nombre: {character.name}
        </p>
        <p>
          Raza: {character.race}
        </p>
        <p>
          Clase: {character.className}
        </p>
        <p>
          Nivel: {character.level}
        </p>
      </div>
      <button
        onClick={() => updateCharacter(index)}
        className="btn btn-primary"
      >
        Editar
      </button>
      <button
        onClick={() => deleteCharacter(index)}
        className="btn btn-danger btn-sm"
      >
        Eliminar
      </button>
    </div>
  )
}

export default CharacterCard

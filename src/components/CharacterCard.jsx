function CharacterCard({ character, index, deleteCharacter }) {
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
      <button>
        Eliminar
      </button>
    </div>
  )
}

export default CharacterCard

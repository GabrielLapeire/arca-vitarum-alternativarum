function CharacterForm({ newCharacter, setNewCharacter, addCharacter }) {
  return (
    <div>
      CharacterForm
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newCharacter.name}
          onChange={(e) =>
            setNewCharacter({
              ...newCharacter,
              name: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Raza"
          value={newCharacter.race}
          onChange={(e) =>
            setNewCharacter({
              ...newCharacter,
              race: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Clase"
          value={newCharacter.className}
          onChange={(e) =>
            setNewCharacter({
              ...newCharacter,
              className: e.target.value
            })
          }
        />
        <input
          type="number"
          placeholder="Nivel"
          value={newCharacter.level}
          onChange={(e) =>
            setNewCharacter({
              ...newCharacter,
              level: e.target.value
            })
          }
        />
      </div>
      <button
        onClick={addCharacter}
        className="btn btn-primary"
      >
        Guardar Personaje
      </button>
    </div>
  )
}

export default CharacterForm

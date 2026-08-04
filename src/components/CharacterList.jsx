import CharacterCard from './CharacterCard'

function CharacterList({
  characters,
  updateCharacter,
  deleteCharacter
}) {

  if (characters.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        No se encontraron personajes.
      </div>
    )
  }

  return (
    <div className="row g-4">
      <h5 className="mb-3">
        Se encontraron {characters.length} personajes
      </h5>
      {characters.map((character) => (
        <div
          className="col-md-4"
          key={character.id}
        >
          <CharacterCard
            character={character}
            updateCharacter={updateCharacter}
            deleteCharacter={deleteCharacter}
          />
        </div>
      ))}
    </div>
  )
}

export default CharacterList

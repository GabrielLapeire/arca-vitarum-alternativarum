import CharacterCard from './CharacterCard'

function CharacterList({
  characters,
  updateCharacter,
  deleteCharacter
}) {

  if (characters.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        No hay personajes creados todavía.
      </div>
    )
  }

  return (
    <div className="row g-4">
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

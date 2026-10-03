/* Yo muestro interfaz. */
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
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="rpg-section-title mb-0">
          Personajes
        </h5>

        <span className="badge text-bg-secondary">
          {characters.length}
        </span>
      </div>

      <div className="row g-4">
        {characters.map(character => (
          <div
            className="col-12 col-md-6 col-xl-4"
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
    </section>
  )
}

export default CharacterList

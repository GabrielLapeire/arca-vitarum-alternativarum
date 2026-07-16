import CharacterCard from './CharacterCard'

function CharacterList({ characters, deleteCharacter }) {
  return (
    <div>
      CharacterList
      {characters.map((character, index) => (
        <CharacterCard
          key={index}
          character={character}
          index={index}
          deleteCharacter={deleteCharacter}
        />
      ))}
    </div>
  )
}

export default CharacterList

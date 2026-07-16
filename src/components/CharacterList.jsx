import CharacterCard from './CharacterCard'

function CharacterList({ characters, updateCharacter, deleteCharacter }) {
  return (
    <div>
      CharacterList
      {characters.map((character, index) => (
        <CharacterCard
          key={index}
          character={character}
          index={index}
          updateCharacter={updateCharacter}
          deleteCharacter={deleteCharacter}
        />
      ))}
    </div>
  )
}

export default CharacterList

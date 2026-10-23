/* Yo muestro la lista y las herramientas para gestionar archivos. */
import { useRef } from 'react'
import CharacterCard from './CharacterCard'

function CharacterList({
  characters,
  onRequestUpdateCharacter,
  onRequestDeleteCharacter,
  onExportAllCharacters,
  onExportCharacter,
  onImportFile,
  importNotice
}) {
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    // Permite seleccionar el mismo archivo otra vez.
    event.target.value = ''

    if (file) {
      onImportFile(file)
    }
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="rpg-section-title mb-0">
            Personajes
          </h5>

          <span className="badge text-bg-secondary">
            {characters.length}
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-warning"
            onClick={onExportAllCharacters}
            disabled={characters.length === 0}
          >
            Exportar todos
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            Importar JSON
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="d-none"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {importNotice && (
        <div
          className={`alert alert-${importNotice.type}`}
          role="status"
        >
          {importNotice.message}
        </div>
      )}

      {characters.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No se encontraron personajes.
        </div>
      ) : (
        <div className="row g-4">
          {characters.map(character => (
            <div
              className="col-12 col-md-6 col-xl-4"
              key={character.id}
            >
              <CharacterCard
                character={character}
                onRequestUpdateCharacter={onRequestUpdateCharacter}
                onRequestDeleteCharacter={onRequestDeleteCharacter}
                onExportCharacter={onExportCharacter}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CharacterList

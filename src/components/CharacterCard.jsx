/* Yo muestro interfaz. */
import { useState } from 'react'
import CharacterAdaptationModal from './CharacterAdaptationModal'

function CharacterCard({
  character,
  onRequestUpdateCharacter,
  onRequestDeleteCharacter
}) {
  const [selectedAdaptation, setSelectedAdaptation] =
    useState(null)

  return (
    <>
      <div className="card rpg-card h-100">
        <div className="card-body d-flex flex-column p-4">

          <h5 className="card-title mb-1">
            {character.name}
          </h5>

          <div className="text-muted small mb-3">
            {character.adaptations.length === 1
              ? '1 adaptación'
              : `${character.adaptations.length} adaptaciones`}
          </div>

          <div className="card-text flex-grow-1">
            <strong>Adaptaciones:</strong>

            <div className="list-group mt-2">
              {character.adaptations.map(adaptation => (
                <button
                  type="button"
                  key={adaptation.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() =>
                    setSelectedAdaptation(adaptation)
                  }
                >
                  <span>
                    {adaptation.system === 'dnd'
                      ? 'D&D'
                      : adaptation.system
                    }

                    {adaptation.version &&
                      ` - ${adaptation.version}`
                    }
                  </span>

                  <span className="badge rpg-view-badge">
                    Ver
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">

            <button
              type="button"
              onClick={() =>
                onRequestUpdateCharacter(character.id)
              }
              className="btn btn-warning"
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() =>
                onRequestDeleteCharacter(character)
              }
              className="btn btn-danger"
            >
              Eliminar
            </button>

          </div>

        </div>
      </div>

      {selectedAdaptation && (
        <CharacterAdaptationModal
          characterName={character.name}
          adaptation={selectedAdaptation}
          onClose={() =>
            setSelectedAdaptation(null)
          }
        />
      )}
    </>
  )
}

export default CharacterCard

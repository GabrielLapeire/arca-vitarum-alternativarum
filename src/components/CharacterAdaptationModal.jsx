/* Yo muestro una adaptación en modo de solo lectura. */
import DndCharacterView from './adaptations/dnd/view/DndCharacterView'

function CharacterAdaptationModal({
  characterName,
  adaptation,
  onClose
}) {
  if (!adaptation) {
    return null
  }

  const isDnd = adaptation.system === 'dnd'

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content rpg-modal">

            <div className="modal-header rpg-modal-header">
              <div>
                <h5 className="modal-title">
                  {isDnd
                    ? 'D&D 2024'
                    : adaptation.system}
                </h5>

                {adaptation.version && (
                  <small>
                    Versión {adaptation.version}
                  </small>
                )}
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={onClose}
              />
            </div>

            <div className="modal-body rpg-modal-body">
              {isDnd ? (
                <DndCharacterView
                  characterName={characterName}
                  data={adaptation.data}
                />
              ) : (
                <div className="alert alert-secondary mb-0">
                  No hay una vista detallada disponible
                  para este sistema todavía.
                </div>
              )}
            </div>

            <div className="modal-footer rpg-modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show rpg-modal-backdrop"
        onClick={onClose}
      />
    </>
  )
}

export default CharacterAdaptationModal

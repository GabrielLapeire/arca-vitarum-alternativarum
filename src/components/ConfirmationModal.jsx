/* Yo pido confirmación antes de realizar una acción destructiva. */
function ConfirmationModal({
  confirmation,
  onCancel,
  onConfirm
}) {
  if (!confirmation) {
    return null
  }

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-message"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rpg-modal">

            <div className="modal-header rpg-modal-header">
              <h5
                id="confirmation-modal-title"
                className="modal-title"
              >
                {confirmation.title}
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar"
                onClick={onCancel}
              />
            </div>

            <div className="modal-body rpg-modal-body">
              <p
                id="confirmation-modal-message"
                className="mb-0"
              >
                {confirmation.message}
              </p>
            </div>

            <div className="modal-footer rpg-modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                {confirmation.confirmLabel || 'Eliminar'}
              </button>
            </div>

          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show rpg-modal-backdrop"
        aria-hidden="true"
        onClick={onCancel}
      />
    </>
  )
}

export default ConfirmationModal

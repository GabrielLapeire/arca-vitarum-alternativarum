/* Yo muestro una adaptación en modo de solo lectura. */
function CharacterAdaptationModal({
  adaptation,
  onClose
}) {
  if (!adaptation) {
    return null
  }
  const data = adaptation.data || {}
  const isDnd = adaptation.system === 'dnd'
  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">
                  {isDnd ? 'D&D 2024' : adaptation.system}
                </h5>

                {adaptation.version && (
                  <small className="text-muted">
                    Versión {adaptation.version}
                  </small>
                )}
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              {isDnd ? (
                <>
                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Información básica</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <strong>Clase</strong>
                          <div>
                            {data.className || 'Sin especificar'}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <strong>Subclase</strong>
                          <div>
                            {data.subclass || 'Sin especificar'}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Nivel</strong>
                          <div>
                            {data.level || 'Sin especificar'}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Especie</strong>
                          <div>
                            {data.species || 'Sin especificar'}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <strong>Trasfondo</strong>
                          <div>
                            {data.background || 'Sin especificar'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Características</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">
                        {data.abilities && Object.entries(
                          data.abilities
                        ).map(([ability, value]) => (
                          <div
                            className="col-6 col-md-4"
                            key={ability}
                          >
                            <strong className="text-capitalize">
                              {ability}
                            </strong>

                            <div>
                              {value || '—'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      <strong>Combate</strong>
                    </div>

                    <div className="card-body">
                      <div className="row g-3">

                        <div className="col-6 col-md-3">
                          <strong>CA</strong>
                          <div>
                            {data.combat?.armorClass || '—'}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>PG</strong>
                          <div>
                            {data.combat?.currentHitPoints || '—'}

                            {data.combat?.maxHitPoints
                              ? ` / ${data.combat.maxHitPoints}`
                              : ''
                            }
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Iniciativa</strong>
                          <div>
                            {data.combat?.initiative || '—'}
                          </div>
                        </div>

                        <div className="col-6 col-md-3">
                          <strong>Velocidad</strong>
                          <div>
                            {data.combat?.speed || '—'}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {data.notes && (
                    <div className="card">
                      <div className="card-header">
                        <strong>Notas</strong>
                      </div>

                      <div className="card-body">
                        <p className="mb-0">
                          {data.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="alert alert-secondary mb-0">
                  No hay una vista detallada disponible para este
                  sistema todavía.
                </div>
              )}
            </div>

            <div className="modal-footer">
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
        className="modal-backdrop fade show"
        onClick={onClose}
      />
    </>
  )
}

export default CharacterAdaptationModal

/* HISTORIA Y PERSONALIDAD */
function DndCharacterInfoView({
  data,
  formatValue
}) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>
          Historia y personalidad
        </strong>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-6">
            <strong>
              Apariencia
            </strong>

            <p className="mt-2 mb-0">
              {formatValue(
                data.appearance
              )}
            </p>
          </div>

          <div className="col-md-6">
            <strong>
              Personalidad
            </strong>

            <p className="mt-2 mb-0">
              {formatValue(
                data.personality
              )}
            </p>
          </div>

          <div className="col-12">
            <strong>
              Historia / trasfondo narrativo
            </strong>

            <p className="mt-2 mb-0">
              {formatValue(
                data.backstory
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndCharacterInfoView

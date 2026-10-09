/* INFORMACIÓN DEL PERSONAJE */
function DndCharacterInfoSection({
  data,
  updateField
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Historia y personalidad
      </div>

      <div className="card-body p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label">
              Apariencia
            </label>

            <textarea
              className="form-control"
              rows="5"
              value={data.appearance || ''}
              onChange={e =>
                updateField(
                  'appearance',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Personalidad
            </label>

            <textarea
              className="form-control"
              rows="5"
              value={data.personality || ''}
              onChange={e =>
                updateField(
                  'personality',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              Historia / trasfondo narrativo
            </label>

            <textarea
              className="form-control"
              rows="5"
              value={data.backstory || ''}
              onChange={e =>
                updateField(
                  'backstory',
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndCharacterInfoSection

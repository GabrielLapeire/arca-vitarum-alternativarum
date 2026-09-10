/* RECURSOS */
function DndResourcesSection({
  heroicInspiration,
  updateField
}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Recursos</strong>
      </div>

      <div className="card-body">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="heroicInspiration"
            checked={Boolean(heroicInspiration)}
            onChange={(e) =>
              updateField(
                'heroicInspiration',
                e.target.checked
              )
            }
          />

          <label
            className="form-check-label"
            htmlFor="heroicInspiration"
          >
            Inspiración heroica
          </label>
        </div>
      </div>
    </div>
  )
}

export default DndResourcesSection

/* RECURSOS */
function DndResourcesSection({
  heroicInspiration,
  updateField
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Recursos
      </div>

      <div className="card-body p-4">
        <label
          className="rpg-dnd-list-item d-flex align-items-center gap-3 mb-0"
          htmlFor="heroicInspiration"
        >
          <input
            type="checkbox"
            className="form-check-input mt-0"
            id="heroicInspiration"
            checked={Boolean(heroicInspiration)}
            onChange={e =>
              updateField(
                'heroicInspiration',
                e.target.checked
              )
            }
          />

          <span className="flex-grow-1">
            Inspiración heroica
          </span>

          {heroicInspiration && (
            <span className="badge rpg-dnd-badge">
              Disponible
            </span>
          )}
        </label>
      </div>
    </div>
  )
}

export default DndResourcesSection

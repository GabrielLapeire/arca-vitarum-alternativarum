/* NOTAS */
function DndNotesSection({
  notes,
  updateField
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Notas
      </div>

      <div className="card-body p-4">
        <label
          className="form-label"
          htmlFor="dndCharacterNotes"
        >
          Notas adicionales del personaje
        </label>

        <textarea
          id="dndCharacterNotes"
          className="form-control"
          rows="5"
          placeholder="Anotá detalles que quieras recordar durante la partida..."
          value={notes || ''}
          onChange={e =>
            updateField(
              'notes',
              e.target.value
            )
          }
        />
      </div>
    </div>
  )
}

export default DndNotesSection

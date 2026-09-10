/* NOTAS */
function DndNotesSection({
  notes,
  updateField
}) {
  return (
    <div className="card">
      <div className="card-header">
        <strong>Notas</strong>
      </div>

      <div className="card-body">
        <textarea
          className="form-control"
          rows="5"
          value={notes || ''}
          onChange={(e) =>
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

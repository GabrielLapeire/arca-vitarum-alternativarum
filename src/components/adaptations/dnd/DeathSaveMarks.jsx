/* Yo represento las tiradas de salvación contra muerte. */
function normalizeCount(value) {
  if (value === '' || value === null || value === undefined) {
    return 0
  }

  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return 0
  }

  return Math.min(3, Math.max(0, Math.floor(numericValue)))
}

function DeathSaveMarks({
  successes = 0,
  failures = 0,
  editable = false,
  onChange
}) {
  const groups = [
    {
      field: 'deathSavesSuccesses',
      label: 'Éxitos',
      type: 'success',
      count: normalizeCount(successes)
    },
    {
      field: 'deathSavesFailures',
      label: 'Fallos',
      type: 'failure',
      count: normalizeCount(failures)
    }
  ]

  return (
    <div className="rpg-death-saves">
      {groups.map(group => (
        <div
          key={group.field}
          className="rpg-death-save-group"
        >
          <span className="rpg-death-save-label">
            {group.label}
          </span>

          <div
            className="rpg-death-save-marks"
            role={editable ? 'group' : undefined}
            aria-label={
              editable
                ? group.label
                : undefined
            }
          >
            {Array.from({ length: 3 }, (_, index) => {
              const marked = index < group.count

              const symbol = group.type === 'success'
                ? (marked ? '●' : '○')
                : (marked ? '×' : '○')

              const description =
                `${group.label}, marca ${index + 1}: ` +
                (marked ? 'marcada' : 'sin marcar')

              const className = [
                'rpg-death-save-marker',
                `rpg-death-save-${group.type}`,
                marked ? 'is-marked' : ''
              ].filter(Boolean).join(' ')

              if (!editable) {
                return (
                  <span
                    key={index}
                    className={className}
                    role="img"
                    aria-label={description}
                  >
                    {symbol}
                  </span>
                )
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={className}
                  aria-label={description}
                  aria-pressed={marked}
                  onClick={() => {
                    const nextCount =
                      group.count === index + 1
                        ? index
                        : index + 1

                    onChange(
                      group.field,
                      nextCount
                    )
                  }}
                >
                  {symbol}
                </button>
              )
            })}

            {editable && group.count > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() =>
                  onChange(group.field, 0)
                }
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeathSaveMarks

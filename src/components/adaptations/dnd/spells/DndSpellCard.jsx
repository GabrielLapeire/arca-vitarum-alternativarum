/* Tarjeta reutilizable para un hechizo de D&D */
import {
  getDndAbilityName,
  getDndSpellSchoolName,
  getDndDamageTypeNames,
  getDndAreaTypeName,
  getDndTargetTypeName,
  getDndCastingTimeName
} from '../dndTranslations'

function DndSpellCard({
  spell,
  catalogSpell,
  editable = false,
  updateSpell,
  deleteSpell
}) {
  if (!catalogSpell) {
    return (
      <div className="card rpg-card h-100">
        <div className="card-body py-3">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <strong>{spell.spellKey}</strong>

            {editable && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() =>
                  deleteSpell(spell.spellKey)
                }
              >
                Eliminar
              </button>
            )}
          </div>

          <div className="text-muted small mt-2">
            Este hechizo no está disponible en el catálogo actual.
          </div>
        </div>
      </div>
    )
  }

  const components = [
    catalogSpell.components?.verbal && 'V',
    catalogSpell.components?.somatic && 'S',
    catalogSpell.components?.material && 'M'
  ]
    .filter(Boolean)
    .join(', ')

  const damageTypes =
    getDndDamageTypeNames(
      catalogSpell.damage?.types
    ).join(', ')

  return (
    <div className="card rpg-card rpg-dnd-spell-card">
      <div className="card-body py-3">

        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <div className="rpg-dnd-spell-name">
              {catalogSpell.name}
            </div>

            <div className="small text-muted">
              {catalogSpell.level === 0
                ? 'Truco'
                : `Nivel ${catalogSpell.level}`}
              {' · '}
              {getDndSpellSchoolName(
                catalogSpell.school?.key
              ) || 'Escuela desconocida'}
            </div>
          </div>

          {editable && (
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() =>
                deleteSpell(spell.spellKey)
              }
            >
              Eliminar
            </button>
          )}
        </div>

        <div className="rpg-dnd-spell-details small">
          <div>
            <strong>Tiempo:</strong>{' '}
            {getDndCastingTimeName(
              catalogSpell.castingTime
            ) || '—'}
          </div>

          <div>
            <strong>Alcance:</strong>{' '}
            {catalogSpell.range?.text || '—'}
          </div>

          <div>
            <strong>Duración:</strong>{' '}
            {catalogSpell.duration || '—'}
          </div>

          <div>
            <strong>Componentes:</strong>{' '}
            {components || '—'}
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-3">
          {editable ? (
            <>
              <label className="form-check mb-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    spell.prepared ||
                    spell.alwaysPrepared
                  }
                  disabled={
                    spell.alwaysPrepared
                  }
                  onChange={e =>
                    updateSpell(
                      spell.spellKey,
                      {
                        prepared:
                          e.target.checked
                      }
                    )
                  }
                />

                <span className="form-check-label">
                  Preparado
                </span>
              </label>

              <label className="form-check mb-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    spell.alwaysPrepared
                  }
                  onChange={e =>
                    updateSpell(
                      spell.spellKey,
                      {
                        alwaysPrepared:
                          e.target.checked
                      }
                    )
                  }
                />

                <span className="form-check-label">
                  Siempre preparado
                </span>
              </label>
            </>
          ) : (
            <>
              {spell.alwaysPrepared && (
                <span className="badge rpg-dnd-badge-info">
                  Siempre preparado
                </span>
              )}

              {!spell.alwaysPrepared &&
                spell.prepared && (
                  <span className="badge rpg-dnd-badge">
                    Preparado
                  </span>
                )}
            </>
          )}

          {catalogSpell.concentration && (
            <span className="badge rpg-dnd-badge-gold">
              Concentración
            </span>
          )}

          {catalogSpell.ritual && (
            <span className="badge rpg-dnd-badge-muted">
              Ritual
            </span>
          )}
        </div>

        {(catalogSpell.description ||
          catalogSpell.higherLevel ||
          catalogSpell.components
            ?.materialDescription ||
          catalogSpell.attackRoll ||
          catalogSpell.savingThrowAbility ||
          damageTypes ||
          catalogSpell.area?.type ||
          catalogSpell.target?.type) && (
            <details className="rpg-dnd-spell-details">
              <summary>
                Ver detalles
              </summary>

              <div className="small mt-2">
                {catalogSpell.description && (
                  <div className="mb-2">
                    <strong>
                      Descripción
                    </strong>

                    <div className="mt-1">
                      {catalogSpell.description}
                    </div>
                  </div>
                )}

                {catalogSpell.components
                  ?.materialDescription && (
                    <div className="mb-2">
                      <strong>
                        Material:
                      </strong>{' '}
                      {
                        catalogSpell.components
                          .materialDescription
                      }
                    </div>
                  )}

                {catalogSpell.attackRoll && (
                  <div className="mb-2">
                    <strong>
                      Tirada de ataque:
                    </strong>{' '}
                    Sí
                  </div>
                )}

                {catalogSpell.savingThrowAbility && (
                  <div className="mb-2">
                    <strong>
                      Tirada de salvación:
                    </strong>{' '}
                    {getDndAbilityName(
                      catalogSpell.savingThrowAbility
                    )}
                  </div>
                )}

                {damageTypes && (
                  <div className="mb-2">
                    <strong>Daño:</strong>{' '}
                    {catalogSpell.damage.roll || '—'}
                    {' · '}
                    {damageTypes}
                  </div>
                )}

                {catalogSpell.area?.type && (
                  <div className="mb-2">
                    <strong>Área:</strong>{' '}
                    {getDndAreaTypeName(
                      catalogSpell.area.type
                    )}

                    {catalogSpell.area.size !== null &&
                      ` · ${catalogSpell.area.size}`}
                  </div>
                )}

                {catalogSpell.target?.type && (
                  <div className="mb-2">
                    <strong>
                      Objetivo:
                    </strong>{' '}

                    {getDndTargetTypeName(
                      catalogSpell.target.type
                    )}

                    {catalogSpell.target.count !== null &&
                      ` · ${catalogSpell.target.count}`}
                  </div>
                )}

                {catalogSpell.higherLevel && (
                  <div className="mb-2">
                    <strong>
                      A niveles superiores:
                    </strong>

                    <div className="mt-1">
                      {catalogSpell.higherLevel}
                    </div>
                  </div>
                )}
              </div>
            </details>
          )}

        {editable && (
          <div className="mt-3">
            <label className="form-label mb-1">
              Notas
            </label>

            <textarea
              className="form-control"
              rows="2"
              value={spell.notes}
              onChange={e =>
                updateSpell(
                  spell.spellKey,
                  {
                    notes: e.target.value
                  }
                )
              }
            />
          </div>
        )}

        {!editable && spell.notes && (
          <div className="mt-3 small">
            <strong>Notas:</strong>

            <div className="mt-1">
              {spell.notes}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DndSpellCard

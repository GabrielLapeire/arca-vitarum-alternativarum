/* Vista de hechizos de una adaptación de D&D */
import {
  getDndAbilityName
} from '../dndTranslations'
import {
  formatValue
} from '../dndUtils'
import {
  sortDndCharacterSpells
} from '../dndSpellUtils'
import {
  useDndSpellCatalog
} from '../../../../hooks/useDndSpellCatalog'
import DndSpellCard from './DndSpellCard'

function DndSpellView({
  data = {}
}) {
  const {
    spells: spellCatalog,
    loading: spellsLoading,
    error: spellsError
  } = useDndSpellCatalog()

  const characterSpells =
    data.spells || []

  const preparedSpells =
    sortDndCharacterSpells(
      characterSpells.filter(
        spell =>
          spell.prepared ||
          spell.alwaysPrepared
      ),
      spellCatalog
    )

  const unpreparedSpells =
    sortDndCharacterSpells(
      characterSpells.filter(
        spell =>
          !spell.prepared &&
          !spell.alwaysPrepared
      ),
      spellCatalog
    )

  const spellcasting =
    data.spellcasting || {}

  const spellcastingAbility =
    getDndAbilityName(
      spellcasting.ability
    ) || '—'

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Magia
      </div>

      <div className="card-body p-4">

        {spellsLoading && (
          <div className="alert alert-info">
            Cargando catálogo de hechizos...
          </div>
        )}

        {spellsError && (
          <div className="alert alert-warning">
            {spellsError}
          </div>
        )}

        <div className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Lanzamiento de conjuros
          </h6>

          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Aptitud
                </span>

                <div className="rpg-dnd-value">
                  {spellcastingAbility}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Modificador
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    spellcasting.modifier
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  CD de salvación
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    spellcasting.saveDC
                  )}
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="rpg-dnd-detail">
                <span className="rpg-dnd-value-label">
                  Bonificador de ataque
                </span>

                <div className="rpg-dnd-value fs-5">
                  {formatValue(
                    spellcasting.attackBonus
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="rpg-dnd-detail-title mb-3">
            Espacios de conjuro
          </h6>

          <div className="row g-2">
            {Array.from(
              { length: 9 },
              (_, index) => index + 1
            ).map(level => {
              const slot =
                data.spellSlots?.[level] || {
                  total: '',
                  expended: ''
                }

              return (
                <div
                  key={level}
                  className="col-6 col-md-4"
                >
                  <div className="rpg-dnd-detail">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="rpg-dnd-value-label mb-0">
                        Nivel {level}
                      </span>

                      <span className="small text-muted">
                        {formatValue(
                          slot.expended
                        )}
                        {' / '}
                        {formatValue(
                          slot.total
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h6 className="rpg-dnd-detail-title mb-3">
            Hechizos del personaje
          </h6>

          {characterSpells.length === 0 && (
            <p className="text-muted mb-0">
              No hay hechizos registrados.
            </p>
          )}

          {preparedSpells.length > 0 && (
            <div className="mb-4">
              <h6 className="small fw-semibold mb-3">
                Preparados
              </h6>

              <div className="row g-3">
                {preparedSpells.map(
                  spell => {
                    const catalogSpell =
                      spellCatalog.find(
                        catalogItem =>
                          catalogItem.key ===
                          spell.spellKey
                      )

                    return (
                      <div
                        key={spell.spellKey}
                        className="col-12 col-lg-6"
                      >
                        <DndSpellCard
                          spell={spell}
                          catalogSpell={catalogSpell}
                          editable={false}
                        />
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}

          {unpreparedSpells.length > 0 && (
            <div>
              <h6 className="small fw-semibold mb-3">
                No preparados
              </h6>

              <div className="row g-3">
                {unpreparedSpells.map(
                  spell => {
                    const catalogSpell =
                      spellCatalog.find(
                        catalogItem =>
                          catalogItem.key ===
                          spell.spellKey
                      )

                    return (
                      <div
                        key={spell.spellKey}
                        className="col-12 col-lg-6"
                      >
                        <DndSpellCard
                          spell={spell}
                          catalogSpell={catalogSpell}
                          editable={false}
                        />
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default DndSpellView

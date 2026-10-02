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
    <div className="card mb-3">
      <div className="card-body">
        <h4>Magia</h4>

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

        <div className="mt-4">
          <h5>Lanzamiento de conjuros</h5>

          <div className="row g-3">
            <div className="col-md-3">
              <div className="small text-muted">
                Aptitud
              </div>

              <strong>
                {spellcastingAbility}
              </strong>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                Modificador
              </div>

              <strong>
                {formatValue(spellcasting.modifier)}
              </strong>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                CD de salvación
              </div>

              <strong>
                {formatValue(spellcasting.saveDC)}
              </strong>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                Bonificador de ataque
              </div>

              <strong>
                {formatValue(spellcasting.attackBonus)}
              </strong>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5>Espacios de conjuro</h5>

          <div className="row g-2">
            <div className="col-4">
              <strong>Nivel</strong>
            </div>

            <div className="col-4">
              <strong>Total</strong>
            </div>

            <div className="col-4">
              <strong>Gastados</strong>
            </div>
          </div>

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
                className="row g-2 mt-1"
              >
                <div className="col-4 d-flex align-items-center">
                  Nivel {level}
                </div>

                <div className="col-4">
                  {formatValue(slot.total)}
                </div>

                <div className="col-4">
                  {formatValue(slot.expended)}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4">
          <h5>
            Hechizos del personaje
          </h5>

          {characterSpells.length === 0 && (
            <p className="text-muted">
              No hay hechizos registrados.
            </p>
          )}

          {preparedSpells.length > 0 && (
            <div className="mt-3">
              <h6>Preparados</h6>

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
                          catalogSpell={
                            catalogSpell
                          }
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
            <div className="mt-4">
              <h6>No preparados</h6>

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
                          catalogSpell={
                            catalogSpell
                          }
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

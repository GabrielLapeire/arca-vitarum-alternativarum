/* RASGOS Y COMPETENCIAS */
import { formatValue } from '../dndUtils'

function DndFeaturesView({
  data
}) {
  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Rasgos y competencias
      </div>

      <div className="card-body p-4">
        <div className="row g-4">

          <div className="col-lg-6">
            <h6 className="rpg-dnd-detail-title mb-3">
              Rasgos de clase
            </h6>

            {data.classFeatures?.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {data.classFeatures.map(
                  feature => (
                    <div
                      key={feature.id}
                      className="rpg-dnd-list-item"
                    >
                      <strong>
                        {formatValue(feature.name)}
                      </strong>

                      <div className="small mt-1">
                        {formatValue(feature.description)}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-muted">
                —
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <h6 className="rpg-dnd-detail-title mb-3">
              Rasgos de especie
            </h6>

            {data.speciesTraits?.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {data.speciesTraits.map(
                  trait => (
                    <div
                      key={trait.id}
                      className="rpg-dnd-list-item"
                    >
                      <strong>
                        {formatValue(trait.name)}
                      </strong>

                      <div className="small mt-1">
                        {formatValue(trait.description)}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-muted">
                —
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <h6 className="rpg-dnd-detail-title mb-3">
              Dotes
            </h6>

            {data.feats?.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {data.feats.map(feat => (
                  <div
                    key={feat.id}
                    className="rpg-dnd-list-item"
                  >
                    <strong>
                      {formatValue(feat.name)}
                    </strong>

                    <div className="small mt-1">
                      {formatValue(feat.description)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted">
                —
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <h6 className="rpg-dnd-detail-title mb-3">
              Entrenamiento y competencias
            </h6>

            <div className="d-flex flex-column gap-2">

              <div className="rpg-dnd-list-item">
                <span className="rpg-dnd-value-label">
                  Armaduras
                </span>

                <div>
                  {formatValue(data.armorTraining)}
                </div>
              </div>

              <div className="rpg-dnd-list-item">
                <span className="rpg-dnd-value-label">
                  Armas
                </span>

                <div>
                  {formatValue(data.weaponProficiencies)}
                </div>
              </div>

              <div className="rpg-dnd-list-item">
                <span className="rpg-dnd-value-label">
                  Herramientas
                </span>

                <div>
                  {formatValue(data.toolProficiencies)}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DndFeaturesView

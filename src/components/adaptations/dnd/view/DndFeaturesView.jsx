/* RASGOS Y COMPETENCIAS */
function DndFeaturesView({
  data,
  formatValue
}) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>
          Rasgos y competencias
        </strong>
      </div>

      <div className="card-body">
        <div className="row g-3">

          <div className="col-md-6">
            <strong>
              Rasgos de clase
            </strong>

            {data.classFeatures?.length > 0 ? (
              <div className="mt-2 d-flex flex-column gap-2">
                {data.classFeatures.map(feature => (
                  <div
                    key={feature.id}
                    className="border rounded p-2"
                  >
                    <strong>
                      {formatValue(feature.name)}
                    </strong>

                    <div className="mt-1">
                      {formatValue(feature.description)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted mt-2">
                —
              </div>
            )}
          </div>

          <div className="col-md-6">
            <strong>
              Rasgos de especie
            </strong>

            {data.speciesTraits?.length > 0 ? (
              <div className="mt-2 d-flex flex-column gap-2">
                {data.speciesTraits.map(trait => (
                  <div
                    key={trait.id}
                    className="border rounded p-2"
                  >
                    <strong>
                      {formatValue(trait.name)}
                    </strong>

                    <div className="mt-1">
                      {formatValue(trait.description)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted mt-2">
                —
              </div>
            )}
          </div>

          <div className="col-md-6">
            <strong>
              Dotes
            </strong>

            {data.feats?.length > 0 ? (
              <div className="mt-2 d-flex flex-column gap-2">
                {data.feats.map(feat => (
                  <div
                    key={feat.id}
                    className="border rounded p-2"
                  >
                    <strong>
                      {formatValue(feat.name)}
                    </strong>

                    <div className="mt-1">
                      {formatValue(feat.description)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted mt-2">
                —
              </div>
            )}
          </div>

          <div className="col-md-6">
            <strong>
              Entrenamiento con armaduras
            </strong>

            <div className="mt-2">
              {formatValue(
                data.armorTraining
              )}
            </div>
          </div>

          <div className="col-md-6">
            <strong>
              Competencias con armas
            </strong>

            <div className="mt-2">
              {formatValue(
                data.weaponProficiencies
              )}
            </div>
          </div>

          <div className="col-md-6">
            <strong>
              Competencias con herramientas
            </strong>

            <div className="mt-2">
              {formatValue(
                data.toolProficiencies
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndFeaturesView

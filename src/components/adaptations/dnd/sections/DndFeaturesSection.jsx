/* RASGOS Y COMPETENCIAS */
function DndFeaturesSection({
  data,
  updateField,
  updateListItem,
  addListItem,
  deleteListItem
}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Rasgos y competencias</strong>
      </div>

      <div className="card-body">

        {/* RASGOS DE CLASE */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              Rasgos de clase
            </h6>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => addListItem('classFeatures')}
            >
              Agregar rasgo
            </button>
          </div>

          {(!data.classFeatures ||
            data.classFeatures.length === 0) && (
              <p className="text-muted mb-0">
                No hay rasgos de clase cargados.
              </p>
            )}

          <div className="d-flex flex-column gap-3">
            {(data.classFeatures || []).map(feature => (
              <div
                key={feature.id}
                className="border rounded p-3"
              >
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del rasgo"
                      value={feature.name}
                      onChange={(e) =>
                        updateListItem(
                          'classFeatures',
                          feature.id,
                          { name: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-7">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Descripción"
                      value={feature.description}
                      onChange={(e) =>
                        updateListItem(
                          'classFeatures',
                          feature.id,
                          { description: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-1 d-flex align-items-start">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteListItem(
                          'classFeatures',
                          feature.id
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RASGOS DE ESPECIE */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              Rasgos de especie
            </h6>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => addListItem('speciesTraits')}
            >
              Agregar rasgo
            </button>
          </div>

          {(!data.speciesTraits ||
            data.speciesTraits.length === 0) && (
              <p className="text-muted mb-0">
                No hay rasgos de especie cargados.
              </p>
            )}

          <div className="d-flex flex-column gap-3">
            {(data.speciesTraits || []).map(trait => (
              <div
                key={trait.id}
                className="border rounded p-3"
              >
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del rasgo"
                      value={trait.name}
                      onChange={(e) =>
                        updateListItem(
                          'speciesTraits',
                          trait.id,
                          { name: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-7">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Descripción"
                      value={trait.description}
                      onChange={(e) =>
                        updateListItem(
                          'speciesTraits',
                          trait.id,
                          { description: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-1 d-flex align-items-start">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteListItem(
                          'speciesTraits',
                          trait.id
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTES */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              Dotes
            </h6>

            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => addListItem('feats')}
            >
              Agregar dote
            </button>
          </div>

          {(!data.feats ||
            data.feats.length === 0) && (
              <p className="text-muted mb-0">
                No hay dotes cargados.
              </p>
            )}

          <div className="d-flex flex-column gap-3">
            {(data.feats || []).map(feat => (
              <div
                key={feat.id}
                className="border rounded p-3"
              >
                <div className="row g-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del dote"
                      value={feat.name}
                      onChange={(e) =>
                        updateListItem(
                          'feats',
                          feat.id,
                          { name: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-7">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Descripción"
                      value={feat.description}
                      onChange={(e) =>
                        updateListItem(
                          'feats',
                          feat.id,
                          { description: e.target.value }
                        )
                      }
                    />
                  </div>

                  <div className="col-md-1 d-flex align-items-start">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteListItem(
                          'feats',
                          feat.id
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPETENCIAS */}
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">
              Entrenamiento con armaduras
            </label>

            <textarea
              className="form-control"
              rows="3"
              value={data.armorTraining || ''}
              onChange={(e) =>
                updateField(
                  'armorTraining',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Competencias con armas
            </label>

            <textarea
              className="form-control"
              rows="3"
              value={data.weaponProficiencies || ''}
              onChange={(e) =>
                updateField(
                  'weaponProficiencies',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Competencias con herramientas
            </label>

            <textarea
              className="form-control"
              rows="3"
              value={data.toolProficiencies || ''}
              onChange={(e) =>
                updateField(
                  'toolProficiencies',
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DndFeaturesSection

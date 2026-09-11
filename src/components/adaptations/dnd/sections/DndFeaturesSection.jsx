/* RASGOS Y COMPETENCIAS */
import DndFeatureList from './DndFeatureList'
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

        <DndFeatureList
          title="Rasgos de clase"
          addLabel="Agregar rasgo"
          emptyMessage="No hay rasgos de clase cargados."
          field="classFeatures"
          items={data.classFeatures || []}
          updateListItem={updateListItem}
          addListItem={addListItem}
          deleteListItem={deleteListItem}
        />

        <DndFeatureList
          title="Rasgos de especie"
          addLabel="Agregar rasgo"
          emptyMessage="No hay rasgos de especie cargados."
          field="speciesTraits"
          items={data.speciesTraits || []}
          updateListItem={updateListItem}
          addListItem={addListItem}
          deleteListItem={deleteListItem}
        />

        <DndFeatureList
          title="Dotes"
          addLabel="Agregar dote"
          emptyMessage="No hay dotes cargados."
          field="feats"
          items={data.feats || []}
          updateListItem={updateListItem}
          addListItem={addListItem}
          deleteListItem={deleteListItem}
        />

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

/* INFORMACIÓN BÁSICA */
import { handleIntegerInput } from '../dndInputUtils'

function DndBasicInfoSection({
  data,
  updateField
}) {
  function updateIntegerField(field, event, options) {
    handleIntegerInput(
      event,
      value => updateField(field, value),
      options
    )
  }

  return (
    <div className="card rpg-card mb-4">
      <div className="card-header">
        Información básica
      </div>

      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label
              htmlFor="dnd-class-name"
              className="form-label"
            >
              Clase
            </label>

            <input
              id="dnd-class-name"
              name="className"
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Ej.: Guerrero"
              value={data.className || ''}
              onChange={e =>
                updateField(
                  'className',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="dnd-subclass"
              className="form-label"
            >
              Subclase
            </label>

            <input
              id="dnd-subclass"
              name="subclass"
              type="text"
              autoComplete="off"
              className="form-control"
              value={data.subclass || ''}
              onChange={e =>
                updateField(
                  'subclass',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <label
              htmlFor="dnd-level"
              className="form-label"
            >
              Nivel
            </label>

            <input
              id="dnd-level"
              name="level"
              type="number"
              min="1"
              max="20"
              step="1"
              className="form-control"
              value={data.level ?? ''}
              onChange={e =>
                updateIntegerField(
                  'level',
                  e,
                  { min: 1, max: 20 }
                )
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <label
              htmlFor="dnd-experience"
              className="form-label"
            >
              Experiencia
            </label>

            <input
              id="dnd-experience"
              name="experience"
              type="number"
              min="0"
              step="1"
              className="form-control"
              value={data.experience ?? ''}
              onChange={e =>
                updateIntegerField(
                  'experience',
                  e,
                  { min: 0 }
                )
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <label
              htmlFor="dnd-background"
              className="form-label"
            >
              Trasfondo
            </label>

            <input
              id="dnd-background"
              name="background"
              type="text"
              className="form-control"
              value={data.background || ''}
              onChange={e =>
                updateField(
                  'background',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-6 col-md-3">
            <label
              htmlFor="dnd-species"
              className="form-label"
            >
              Especie
            </label>

            <input
              id="dnd-species"
              name="species"
              type="text"
              className="form-control"
              value={data.species || ''}
              onChange={e =>
                updateField(
                  'species',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-md-4">
            <label
              htmlFor="dnd-alignment"
              className="form-label"
            >
              Alineamiento
            </label>

            <input
              id="dnd-alignment"
              name="alignment"
              type="text"
              className="form-control"
              placeholder="Ej.: Neutral bueno"
              value={data.alignment || ''}
              onChange={e =>
                updateField(
                  'alignment',
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-12">
            <label
              htmlFor="dnd-languages"
              className="form-label"
            >
              Idiomas
            </label>

            <input
              id="dnd-languages"
              name="languages"
              type="text"
              className="form-control"
              placeholder="Ej.: Común, Elfo, Dracónico"
              value={data.languages || ''}
              onChange={e =>
                updateField(
                  'languages',
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

export default DndBasicInfoSection

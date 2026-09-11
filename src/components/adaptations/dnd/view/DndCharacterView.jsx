import {
  ABILITIES,
  SKILLS
} from '../dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  getProficiencyBonus,
  getPassivePerception
} from '../dndUtils'
import {
  getSpeciesData
} from '../dndSpecies'
import DndBasicInfoView from './DndBasicInfoView'
import DndAbilitiesView from './DndAbilitiesView'
import DndProficienciesView from './DndProficienciesView'
import DndCombatView from './DndCombatView'
import DndFeaturesView from './DndFeaturesView'
import DndCharacterInfoView from './DndCharacterInfoView'
import DndEquipmentView from './DndEquipmentView'

function formatValue(value) {
  if (
    value === '' ||
    value === null ||
    value === undefined
  ) {
    return '—'
  }

  return value
}

function DndCharacterView({
  data = {}
}) {

  const proficiencyBonus =
    getProficiencyBonus(data.level)

  const abilities = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [
        ability.id,
        ''
      ])
    ),
    ...(data.abilities || {})
  }

  const savingThrows = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [
        ability.id,
        false
      ])
    ),
    ...(data.savingThrows || {})
  }

  const skills = {
    ...Object.fromEntries(
      SKILLS.map(skill => [
        skill.id,
        false
      ])
    ),
    ...(data.skills || {})
  }

  const speciesData =
    getSpeciesData(data.species)

  const calculatedInitiative =
    getAbilityModifier(
      abilities.dexterity
    )

  const calculatedPassivePerception =
    getPassivePerception(
      SKILLS,
      abilities,
      skills,
      proficiencyBonus
    )

  const effectiveInitiative =
    data.combat?.initiative ||
    (
      calculatedInitiative === ''
        ? ''
        : formatModifier(calculatedInitiative)
    )

  const effectiveSpeed =
    data.combat?.speed ||
    (
      speciesData?.speed
        ? `${speciesData.speed} pies`
        : ''
    )

  const effectiveSize =
    data.combat?.size ||
    speciesData?.size ||
    ''

  const effectivePassivePerception =
    data.combat?.passivePerception ||
    (
      calculatedPassivePerception === ''
        ? ''
        : calculatedPassivePerception
    )

  return (
    <>
      <DndBasicInfoView
        data={data}
        formatValue={formatValue}
      />

      {/* RECURSOS */}

      <div className="card mb-3">
        <div className="card-header">
          <strong>Recursos</strong>
        </div>

        <div className="card-body">
          <strong>Inspiración heroica</strong>

          <div>
            {data.heroicInspiration ? 'Sí' : 'No'}
          </div>
        </div>
      </div>

      <DndAbilitiesView
        abilities={abilities}
        getAbilityModifier={getAbilityModifier}
        formatValue={formatValue}
        formatModifier={formatModifier}
      />

      <DndProficienciesView
        abilities={abilities}
        savingThrows={savingThrows}
        skills={skills}
        proficiencyBonus={proficiencyBonus}
        formatModifier={formatModifier}
      />

      <DndCombatView
        data={data}
        effectiveInitiative={effectiveInitiative}
        effectiveSpeed={effectiveSpeed}
        effectiveSize={effectiveSize}
        effectivePassivePerception={effectivePassivePerception}
        formatValue={formatValue}
      />

      <DndFeaturesView
        data={data}
        formatValue={formatValue}
      />

      <DndCharacterInfoView
        data={data}
        formatValue={formatValue}
      />

      <DndEquipmentView
        data={data}
        formatValue={formatValue}
      />

      {/* NOTAS */}

      <div className="card">
        <div className="card-header">
          <strong>Notas</strong>
        </div>

        <div className="card-body">
          <p className="mb-0">
            {formatValue(data.notes)}
          </p>
        </div>
      </div>
    </>
  )
}

export default DndCharacterView

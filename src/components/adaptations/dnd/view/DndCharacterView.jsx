/* vista de adaptacion de DnD */
import { useState } from 'react'
import {
  ABILITIES,
  SKILLS
} from '../dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  getProficiencyBonus,
  getPassivePerception,
  formatValue,
  hasMagicData
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
import DndNavigationSheet from '../DndNavigationSheet'
import DndSpellView from '../spells/DndSpellView'

function DndCharacterView({
  characterName,
  data = {}
}) {

  const [currentPage, setCurrentPage] = useState('character')

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

  const hasMagic = hasMagicData(data)

  return (
    <>
      {currentPage === 'character' && (
        <>
          <DndBasicInfoView
            characterName={characterName}
            data={data}
          />

          <div className="card rpg-card mb-4">
            <div className="card-header">
              Recursos
            </div>

            <div className="card-body p-4">
              <span className="rpg-dnd-value-label">
                Inspiración heroica
              </span>

              <div className="rpg-dnd-value">
                {data.heroicInspiration
                  ? 'Sí'
                  : 'No'}
              </div>
            </div>
          </div>

          <DndAbilitiesView
            abilities={abilities}
          />

          <DndProficienciesView
            abilities={abilities}
            savingThrows={savingThrows}
            skills={skills}
            proficiencyBonus={proficiencyBonus}
          />

          <DndCombatView
            data={data}
            effectiveInitiative={effectiveInitiative}
            effectiveSpeed={effectiveSpeed}
            effectiveSize={effectiveSize}
            effectivePassivePerception={effectivePassivePerception}
          />

          <DndFeaturesView
            data={data}
          />

          <DndCharacterInfoView
            data={data}
          />

          <DndEquipmentView
            data={data}
          />

          <div className="card rpg-card">
            <div className="card-header">
              Notas
            </div>

            <div className="card-body p-4">
              <p className="mb-0">
                {formatValue(data.notes)}
              </p>
            </div>
          </div>

          {hasMagic && (
            <DndNavigationSheet
              currentPage={currentPage}
              onChangePage={setCurrentPage}
            />
          )}
        </>
      )}

      {currentPage === 'spells' && (
        <>
          <DndSpellView
            data={data}
          />

          <DndNavigationSheet
            currentPage={currentPage}
            onChangePage={setCurrentPage}
          />
        </>
      )}
    </>
  )
}

export default DndCharacterView

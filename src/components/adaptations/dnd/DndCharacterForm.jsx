/* Yo muestro y gestiono los datos específicos de una ficha de D&D 2024. */
import {
  ABILITIES,
  SKILLS
} from './dndConstants'
import {
  getAbilityModifier,
  formatModifier,
  getProficiencyBonus,
  getSavingThrowModifier,
  getSkillModifier,
  getPassivePerception
} from './dndUtils'
import {
  getSpeciesData
} from './dndSpecies'
import DndBasicInfoSection from './sections/DndBasicInfoSection'
import DndAbilitiesSection from './sections/DndAbilitiesSection'
import DndProficienciesSection from './sections/DndProficienciesSection'
import DndCombatSection from './sections/DndCombatSection'
import DndResourcesSection from './sections/DndResourcesSection'
import DndFeaturesSection from './sections/DndFeaturesSection'
import DndCharacterInfoSection from './sections/DndCharacterInfoSection'
import DndEquipmentSection from './sections/DndEquipmentSection'
import DndNotesSection from './sections/DndNotesSection'

function DndCharacterForm({
  data = {},
  setData
}) {
  const abilities = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [ability.id, ''])
    ),
    ...(data.abilities || {})
  }

  const savingThrows = {
    ...Object.fromEntries(
      ABILITIES.map(ability => [ability.id, false])
    ),
    ...(data.savingThrows || {})
  }

  const skills = {
    ...Object.fromEntries(
      SKILLS.map(skill => [skill.id, false])
    ),
    ...(data.skills || {})
  }

  const combat = {
    armorClass: '',
    shield: '',
    currentHitPoints: '',
    maxHitPoints: '',
    temporaryHitPoints: '',
    hitDice: '',
    hitDiceSpent: '',
    initiative: '',
    speed: '',
    size: '',
    passivePerception: '',
    deathSavesSuccesses: 0,
    deathSavesFailures: 0,
    ...(data.combat || {})
  }

  const level = data.level
  const proficiencyBonus = getProficiencyBonus(level)
  const speciesData = getSpeciesData(
    data.species
  )
  const calculatedSpeed =
    speciesData?.speed ?? ''
  const calculatedSize =
    speciesData?.size ?? ''

  function updateField(field, value) {
    setData(previousData => ({
      ...previousData,
      [field]: value
    }))
  }

  function updateAbility(ability, value) {
    setData(previousData => ({
      ...previousData,
      abilities: {
        ...(previousData.abilities || {}),
        [ability]: value
      }
    }))
  }

  function updateSavingThrow(ability, value) {
    setData(previousData => ({
      ...previousData,
      savingThrows: {
        ...(previousData.savingThrows || {}),
        [ability]: value
      }
    }))
  }

  function updateSkill(skill, value) {
    setData(previousData => ({
      ...previousData,
      skills: {
        ...(previousData.skills || {}),
        [skill]: value
      }
    }))
  }

  function updateCombat(field, value) {
    setData(previousData => ({
      ...previousData,
      combat: {
        ...(previousData.combat || {}),
        [field]: value
      }
    }))
  }

  function updateListItem(field, id, changes) {
    setData(previousData => ({
      ...previousData,
      [field]: (previousData[field] || []).map(item =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    }))
  }

  function addListItem(field) {
    setData(previousData => ({
      ...previousData,
      [field]: [
        ...(previousData[field] || []),
        {
          id: crypto.randomUUID(),
          name: '',
          description: ''
        }
      ]
    }))
  }

  function deleteListItem(field, id) {
    setData(previousData => ({
      ...previousData,
      [field]: (previousData[field] || []).filter(
        item => item.id !== id
      )
    }))
  }

  function updateEquipmentItem(id, changes) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: (previousData.equipment?.items || []).map(item =>
          item.id === id
            ? { ...item, ...changes }
            : item
        )
      }
    }))
  }

  function addEquipmentItem() {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: [
          ...(previousData.equipment?.items || []),
          {
            id: crypto.randomUUID(),
            name: '',
            quantity: 1,
            equipped: false,
            description: ''
          }
        ]
      }
    }))
  }

  function deleteEquipmentItem(id) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        items: (previousData.equipment?.items || []).filter(
          item => item.id !== id
        ),
        attunedItems: (
          previousData.equipment?.attunedItems || []
        ).filter(
          itemId => itemId !== id
        )
      }
    }))
  }

  function toggleAttunement(id) {
    setData(previousData => {
      const currentAttunedItems =
        previousData.equipment?.attunedItems || []

      const isAttuned =
        currentAttunedItems.includes(id)

      if (isAttuned) {
        return {
          ...previousData,
          equipment: {
            ...(previousData.equipment || {}),
            attunedItems:
              currentAttunedItems.filter(
                itemId => itemId !== id
              )
          }
        }
      }

      if (currentAttunedItems.length >= 3) {
        return previousData
      }

      return {
        ...previousData,
        equipment: {
          ...(previousData.equipment || {}),
          attunedItems: [
            ...currentAttunedItems,
            id
          ]
        }
      }
    })
  }

  function updateCurrency(currency, value) {
    setData(previousData => ({
      ...previousData,
      equipment: {
        ...(previousData.equipment || {}),
        currency: {
          ...(previousData.equipment?.currency || {}),
          [currency]: value
        }
      }
    }))
  }

  function updateAttack(id, changes) {
    setData(previousData => ({
      ...previousData,
      attacks: (previousData.attacks || []).map(attack =>
        attack.id === id
          ? { ...attack, ...changes }
          : attack
      )
    }))
  }

  function addAttack() {
    setData(previousData => ({
      ...previousData,
      attacks: [
        ...(previousData.attacks || []),
        {
          id: crypto.randomUUID(),
          name: '',
          attackBonus: '',
          damage: ''
        }
      ]
    }))
  }

  function deleteAttack(id) {
    setData(previousData => ({
      ...previousData,
      attacks: (previousData.attacks || []).filter(
        attack => attack.id !== id
      )
    }))
  }

  const passivePerception = getPassivePerception(
    SKILLS,
    abilities,
    skills,
    proficiencyBonus
  )

  return (
    <div className="card border-primary mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="card-title mb-1">
              D&D 2024
            </h4>

            <p className="text-muted mb-0">
              Datos de la ficha
            </p>
          </div>

          <span className="badge text-bg-primary">
            D&D 2024
          </span>
        </div>

        <DndBasicInfoSection
          data={data}
          updateField={updateField}
        />

        <DndAbilitiesSection
          abilities={abilities}
          updateAbility={updateAbility}
        />

        <DndProficienciesSection
          abilities={abilities}
          savingThrows={savingThrows}
          skills={skills}
          proficiencyBonus={proficiencyBonus}
          updateSavingThrow={updateSavingThrow}
          updateSkill={updateSkill}
        />

        <DndCombatSection
          combat={combat}
          abilities={abilities}
          calculatedSpeed={calculatedSpeed}
          calculatedSize={calculatedSize}
          passivePerception={passivePerception}
          attacks={data.attacks || []}
          updateCombat={updateCombat}
          updateAttack={updateAttack}
          addAttack={addAttack}
          deleteAttack={deleteAttack}
        />

        <DndResourcesSection
          heroicInspiration={data.heroicInspiration}
          updateField={updateField}
        />

        <DndFeaturesSection
          data={data}
          updateField={updateField}
          updateListItem={updateListItem}
          addListItem={addListItem}
          deleteListItem={deleteListItem}
        />

        <DndCharacterInfoSection
          data={data}
          updateField={updateField}
        />

        <DndEquipmentSection
          equipment={data.equipment}
          addEquipmentItem={addEquipmentItem}
          updateEquipmentItem={updateEquipmentItem}
          deleteEquipmentItem={deleteEquipmentItem}
          toggleAttunement={toggleAttunement}
          updateCurrency={updateCurrency}
        />

        <DndNotesSection
          notes={data.notes}
          updateField={updateField}
        />
      </div>
    </div>
  )
}

export default DndCharacterForm
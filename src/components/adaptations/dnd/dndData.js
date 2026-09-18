/* Yo creo la estructura de datos inicial de una ficha de D&D 2024. */
import {
  ABILITIES,
  SKILLS
} from './dndConstants'
export function createEmptyDndData() {
  return {
    className: '',
    subclass: '',
    level: '',
    experience: '',

    background: '',
    species: '',
    alignment: '',
    languages: '',

    abilities: Object.fromEntries(
      ABILITIES.map(ability => [
        ability.id,
        ''
      ])
    ),

    savingThrows: Object.fromEntries(
      ABILITIES.map(ability => [
        ability.id,
        false
      ])
    ),

    skills: Object.fromEntries(
      SKILLS.map(skill => [
        skill.id,
        false
      ])
    ),

    combat: {
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
      deathSavesFailures: 0
    },

    attacks: [],

    heroicInspiration: false,

    classFeatures: [],
    speciesTraits: [],
    feats: [],

    armorTraining: '',
    weaponProficiencies: '',
    toolProficiencies: '',

    equipment: {
      items: [],
      attunedItems: [],
      currency: {
        cp: 0,
        sp: 0,
        ep: 0,
        gp: 0,
        pp: 0
      }
    },

    appearance: '',
    personality: '',
    backstory: '',
    notes: '',

    spellcasting: {
      ability: '',
      modifier: '',
      saveDC: '',
      attackBonus: ''
    },

    spells: [],

    spellSlots: {
      1: { total: '', expended: '' },
      2: { total: '', expended: '' },
      3: { total: '', expended: '' },
      4: { total: '', expended: '' },
      5: { total: '', expended: '' },
      6: { total: '', expended: '' },
      7: { total: '', expended: '' },
      8: { total: '', expended: '' },
      9: { total: '', expended: '' }
    }
  }
}

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
      1: { total: 0, expended: 0 },
      2: { total: 0, expended: 0 },
      3: { total: 0, expended: 0 },
      4: { total: 0, expended: 0 },
      5: { total: 0, expended: 0 },
      6: { total: 0, expended: 0 },
      7: { total: 0, expended: 0 },
      8: { total: 0, expended: 0 },
      9: { total: 0, expended: 0 }
    }
  }
}

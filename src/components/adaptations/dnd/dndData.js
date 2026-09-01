/* Yo creo la estructura de datos inicial de una ficha de D&D 2024. */

import {
  ABILITIES,
  SKILLS
} from './dndConstants'

export function createEmptyDndData() {
  return {
    playerName: '',
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
    notes: ''
  }
}
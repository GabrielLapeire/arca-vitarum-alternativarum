import { ABILITIES } from './dndConstants'

export const DND_SPELL_SCHOOLS = {
  abjuration: 'Abjuración',
  conjuration: 'Conjuración',
  divination: 'Adivinación',
  enchantment: 'Encantamiento',
  evocation: 'Evocación',
  illusion: 'Ilusión',
  necromancy: 'Nigromancia',
  transmutation: 'Transmutación'
}

export const DND_DAMAGE_TYPES = {
  acid: 'Ácido',
  bludgeoning: 'Contundente',
  cold: 'Frío',
  fire: 'Fuego',
  force: 'Fuerza',
  lightning: 'Relámpago',
  necrotic: 'Necrótico',
  piercing: 'Perforante',
  poison: 'Veneno',
  psychic: 'Psíquico',
  radiant: 'Radiante',
  slashing: 'Cortante',
  thunder: 'Trueno'
}

export const DND_AREA_TYPES = {
  cone: 'Cono',
  cube: 'Cubo',
  cylinder: 'Cilindro',
  line: 'Línea',
  sphere: 'Esfera'
}

export const DND_TARGET_TYPES = {
  creature: 'Criatura',
  object: 'Objeto',
  point: 'Punto'
}

export const DND_CASTING_TIMES = {
  action: 'Acción',
  'bonus-action': 'Acción adicional',
  reaction: 'Reacción'
}

export function getDndAbilityName(abilityId) {
  return (
    ABILITIES.find(
      ability => ability.id === abilityId
    )?.name ||
    abilityId ||
    ''
  )
}

export function getDndSpellSchoolName(schoolKey) {
  return (
    DND_SPELL_SCHOOLS[schoolKey] ||
    schoolKey ||
    ''
  )
}

export function getDndDamageTypeName(damageType) {
  return (
    DND_DAMAGE_TYPES[damageType] ||
    damageType ||
    ''
  )
}

export function getDndDamageTypeNames(damageTypes) {
  if (!Array.isArray(damageTypes)) {
    return []
  }

  return damageTypes.map(
    getDndDamageTypeName
  )
}

export function getDndAreaTypeName(areaType) {
  return (
    DND_AREA_TYPES[areaType] ||
    areaType ||
    ''
  )
}

export function getDndTargetTypeName(targetType) {
  return (
    DND_TARGET_TYPES[targetType] ||
    targetType ||
    ''
  )
}

export function getDndCastingTimeName(castingTime) {
  return (
    DND_CASTING_TIMES[castingTime] ||
    castingTime ||
    ''
  )
}

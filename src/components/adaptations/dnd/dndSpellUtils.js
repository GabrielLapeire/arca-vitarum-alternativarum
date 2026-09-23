/* Yo hago manejo los hechizos de D&D */
export function normalizeDndSpell(spell) {
  return {
    key: spell.key,
    name: spell.name,
    level: spell.level,

    school: spell.school
      ? {
          key: spell.school.key,
          name: spell.school.name
        }
      : null,

    classes: Array.isArray(spell.classes)
      ? spell.classes.map(classInfo => ({
          key: classInfo.key,
          name: classInfo.name
        }))
      : [],

    castingTime: spell.casting_time ?? '',
    reactionCondition: spell.reaction_condition ?? '',

    range: {
      value: spell.range ?? null,
      text: spell.range_text ?? ''
    },

    duration: spell.duration ?? '',

    concentration: Boolean(spell.concentration),
    ritual: Boolean(spell.ritual),

    components: {
      verbal: Boolean(spell.verbal),
      somatic: Boolean(spell.somatic),
      material: Boolean(spell.material),
      materialDescription:
        spell.material_specified ?? '',
      materialCost:
        spell.material_cost ?? null,
      materialConsumed:
        Boolean(spell.material_consumed)
    },

    target: {
      type: spell.target_type ?? '',
      count: spell.target_count ?? null
    },

    attackRoll: Boolean(spell.attack_roll),

    savingThrowAbility:
      spell.saving_throw_ability ?? '',

    damage: {
      roll: spell.damage_roll ?? '',
      types: Array.isArray(spell.damage_types)
        ? spell.damage_types
        : []
    },

    area: {
      type: spell.shape_type ?? '',
      size: spell.shape_size ?? null
    },

    description: spell.desc ?? '',
    higherLevel: spell.higher_level ?? '',

    castingOptions:
      Array.isArray(spell.casting_options)
        ? spell.casting_options.map(option => ({
            type: option.type ?? '',
            damageRoll:
              option.damage_roll ?? '',
            targetCount:
              option.target_count ?? null,
            duration:
              option.duration ?? null,
            range:
              option.range ?? null,
            concentration:
              option.concentration ?? null,
            shapeSize:
              option.shape_size ?? null,
            description:
              option.desc ?? ''
          }))
        : []
  }
}

export function normalizeDndSpells(spells) {
  if (!Array.isArray(spells)) {
    return []
  }

  return spells.map(normalizeDndSpell)
}

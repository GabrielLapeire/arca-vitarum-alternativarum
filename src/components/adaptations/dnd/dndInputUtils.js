/* Yo valido las entradas numéricas de D&D. */

export function handleIntegerInput(
  event,
  onValidValue,
  {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    allowNegative = false,
    allowLeadingPlus = false,
    allowIncompleteSign = false
  } = {}
) {
  const input = event.currentTarget

  // Evito aceptar entradas numéricas incompletas o inválidas.
  if (
    input.type === 'number' &&
    input.validity?.badInput
  ) {
    return
  }

  const value = input.value

  // Los campos vacíos están permitidos.
  if (value === '') {
    onValidValue('')
    return
  }

  // Permito escribir temporalmente un signo en campos de texto.
  if (
    allowIncompleteSign &&
    (
      (allowNegative && value === '-') ||
      (allowLeadingPlus && value === '+')
    )
  ) {
    onValidValue(value)
    return
  }

  let pattern = /^\d+$/

  if (allowNegative && allowLeadingPlus) {
    pattern = /^[+-]?\d+$/
  } else if (allowNegative) {
    pattern = /^-?\d+$/
  } else if (allowLeadingPlus) {
    pattern = /^\+?\d+$/
  }

  if (!pattern.test(value)) {
    return
  }

  const number = Number(value)

  if (
    !Number.isSafeInteger(number) ||
    number < min ||
    number > max
  ) {
    return
  }

  onValidValue(value)
}

export function clearIncompleteInteger(
  event,
  onValidValue
) {
  const value = event.currentTarget.value

  if (value === '-' || value === '+') {
    onValidValue('')
  }
}

const API_BASE_URL = 'https://api.open5e.com/v2'

export async function getDndSpells() {
  const spells = []
  let nextUrl = `${API_BASE_URL}/spells/?document__key=srd-2024&limit=50`

  while (nextUrl) {
    const response = await fetch(nextUrl)

    if (!response.ok) {
      throw new Error(`Error al obtener conjuros: ${response.status}`)
    }

    const data = await response.json()

    spells.push(...data.results)

    nextUrl = data.next
  }

  return spells
}

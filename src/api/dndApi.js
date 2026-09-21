const API_BASE_URL = 'https://api.open5e.com/v2'

export async function getDndSpells() {
  const response = await fetch(
    `${API_BASE_URL}/spells/?document__key=srd-2024&limit=5`
  )

  if (!response.ok) {
    throw new Error(`Error al obtener conjuros: ${response.status}`)
  }

  return response.json()
}
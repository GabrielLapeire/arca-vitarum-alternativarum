/* Navegación entre las páginas de la ficha de D&D */
function DndNavigationSheet({
  currentPage,
  onChangePage
}) {
  return (
    <nav
      className="rpg-dnd-navigation"
      aria-label="Navegación de la ficha"
    >
      {currentPage === 'spells' && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            onChangePage('character')
          }
        >
          ← Volver a la ficha
        </button>
      )}

      {currentPage === 'character' && (
        <button
          type="button"
          className="btn btn-primary ms-auto"
          onClick={() =>
            onChangePage('spells')
          }
        >
          Ver magia →
        </button>
      )}
    </nav>
  )
}

export default DndNavigationSheet

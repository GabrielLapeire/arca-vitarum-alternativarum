/* Navegación entre las páginas de la ficha de D&D */
function DndNavigationSheet({
  currentPage,
  onChangePage
}) {
  return (
    <nav
      className="d-flex justify-content-between align-items-center mt-3"
      aria-label="Navegación de la ficha"
    >
      {currentPage === 'spells' ? (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            onChangePage('character')
          }
        >
          ← Volver a la ficha
        </button>
      ) : (
        <div />
      )}

      {currentPage === 'character' ? (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            onChangePage('spells')
          }
        >
          Ver magia →
        </button>
      ) : (
        <div />
      )}
    </nav>
  )
}

export default DndNavigationSheet

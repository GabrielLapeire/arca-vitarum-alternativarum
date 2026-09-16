function DndNavigationSheet({
  currentPage,
  onChangePage
}) {
  return (
    <>
      {currentPage === 'character' && (
        <button
          type="button"
          onClick={() => onChangePage('spells')}
        >
          Magia →
        </button>
      )}

      {currentPage === 'spells' && (
        <button
          type="button"
          onClick={() => onChangePage('character')}
        >
          ← Volver a la ficha
        </button>
      )}
    </>
  )
}

export default DndNavigationSheet

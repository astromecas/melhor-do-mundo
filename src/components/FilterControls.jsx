import React from 'react';

export function FilterControls({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  categories,
  sortBy,
  onSortChange,
  totalResults,
  totalCandidates,
}) {
  return (
    <div className="brutal-filter-deck">
      <div className="filter-search-sort-row">
        {/* Campo de Busca Estilizado */}
        <div className="brutal-search-container">
          <span className="search-symbol">🔍</span>
          <input
            type="text"
            className="brutal-search-input"
            placeholder="Pesquisar por atleta, clube, esporte ou país..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-cross"
              onClick={() => onSearchChange('')}
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Seletor de Ordenação */}
        <div className="brutal-sort-container">
          <label htmlFor="sort-select" className="sort-tag-label">ORDENAR POR:</label>
          <select
            id="sort-select"
            className="brutal-select-dropdown"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="votos-desc">🔥 Mais Votados</option>
            <option value="votos-asc">📉 Menos Votados</option>
            <option value="nome-asc">🔤 Nome (A a Z)</option>
          </select>
        </div>
      </div>

      {/* Abas de Categorias / Modalidades */}
      <div className="brutal-categories-row">
        <span className="categories-badge-label">FILTRAR ESPORTE:</span>
        <div className="categories-pill-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`brutal-category-tab ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'tab-is-active' : ''}`}
              onClick={() => onCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="deck-counter-badge">
          {totalResults} de {totalCandidates} atletas
        </div>
      </div>
    </div>
  );
}

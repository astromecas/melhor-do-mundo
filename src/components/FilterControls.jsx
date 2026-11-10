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
    <div className="filter-controls-container">
      <div className="filter-top-row">
        {/* Barra de Busca */}
        <div className="search-bar-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar atleta, modalidade, clube ou país..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              title="Limpar pesquisa"
            >
              ✕
            </button>
          )}
        </div>

        {/* Ordenação */}
        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">Ordenar:</label>
          <select
            id="sort-select"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="votos-desc">🔥 Mais votados</option>
            <option value="votos-asc">📉 Menos votados</option>
            <option value="nome-asc">🔤 Nome (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Categorias por Modalidade */}
      <div className="categories-pill-row">
        <span className="categories-title">Modalidades:</span>
        <div className="categories-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'is-active' : ''}`}
              onClick={() => onCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="results-counter-bar">
        <span>Exibindo <strong>{totalResults}</strong> de <strong>{totalCandidates}</strong> atletas indicados</span>
      </div>
    </div>
  );
}


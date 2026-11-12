import React from 'react';

export function Navbar({ onOpenModal, onResetVotes, totalVotes, onRefresh }) {
  return (
    <>
      {/* Ticker de Faixa Amarela no Topo */}
      <div className="brutal-ticker-strip">
        <div className="ticker-inner">
          <span>⚡ APURAÇÃO AO VIVO // VOTAÇÃO POPULAR 2026</span>
          <span className="ticker-dot">●</span>
          <span>QUEM É O MAIOR ATLETA DO MUNDO?</span>
          <span className="ticker-dot">●</span>
          <span>COMPUTE SEU VOTO AGORA</span>
          <span className="ticker-dot">●</span>
          <span>TOTAL DE VOTOS: {totalVotes.toLocaleString('pt-BR')}</span>
          <span className="ticker-dot">●</span>
          <span>EDIÇÃO SUPREMA DE ESPORTES</span>
        </div>
      </div>

      <header className="brutal-nav-container">
        <div className="brutal-nav-wrapper">
          <div className="brutal-logo-badge">
            <span className="logo-symbol">🏆</span>
            <div className="logo-text-group">
              <span className="logo-super">PRÊMIO OFICIAL</span>
              <span className="logo-main">MELHOR DO MUNDO</span>
            </div>
            <span className="logo-pill-year">'26</span>
          </div>

          <div className="brutal-nav-controls">
            <div className="stat-pill-box">
              <span className="pill-dot" />
              <span className="pill-text"><strong>{totalVotes.toLocaleString('pt-BR')}</strong> VOTOS REGISTRADOS</span>
            </div>

            <button
              type="button"
              className="brutal-btn btn-secondary"
              onClick={onRefresh}
              title="Recarregar apuração"
            >
              🔄 Atualizar
            </button>

            <button
              type="button"
              className="brutal-btn btn-danger"
              onClick={onResetVotes}
              title="Zerar todos os votos"
            >
              ⚠️ Zerar Placar
            </button>

            <button
              type="button"
              className="brutal-btn btn-action"
              onClick={onOpenModal}
            >
              ➕ Indicar Atleta
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

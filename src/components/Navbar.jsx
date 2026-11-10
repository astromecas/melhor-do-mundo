import React from 'react';

export function Navbar({ onOpenModal, onResetVotes, totalVotes, onRefresh }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-group">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34" />
              <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
            </svg>
          </div>
          <div>
            <div className="brand-title">MELHOR DO MUNDO</div>
            <div className="brand-tagline">Global Sports Excellence Awards</div>
          </div>
        </div>

        <div className="header-meta">
          <div className="live-status-pill">
            <span className="live-pulse" />
            <span>Votação Oficial Aberta</span>
          </div>
          <div className="tally-pill">
            <span className="tally-label">Votos computados:</span>
            <span className="tally-count">{totalVotes.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="action-btn action-btn-secondary"
            onClick={onRefresh}
            title="Atualizar dados da premiação"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span className="btn-text">Atualizar</span>
          </button>

          <button
            type="button"
            className="action-btn action-btn-danger"
            onClick={onResetVotes}
            title="Reiniciar todos os votos"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span className="btn-text">Zerar Placar</span>
          </button>

          <button
            type="button"
            className="action-btn action-btn-primary"
            onClick={onOpenModal}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Novo Indicado</span>
          </button>
        </div>
      </div>
    </header>
  );
}


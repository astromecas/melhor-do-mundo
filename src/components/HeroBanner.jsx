import React from 'react';

export function HeroBanner({ leader, stats, onVote, votingId }) {
  const percentage = stats.totalVotos > 0 && leader
    ? ((leader.votos / stats.totalVotos) * 100).toFixed(1)
    : 0;

  return (
    <section className="hero-showcase">
      <div className="hero-glow-layer" />
      <div className="hero-content-grid">
        <div className="hero-narrative">
          <div className="hero-season-badge">
            <span className="badge-sparkle">✦</span>
            <span>Edição 2026 • Troféu Supremo</span>
          </div>

          <h1 className="hero-headline">
            QUEM É O MAIOR <br />
            <span className="text-gradient-cyan">DO ESPORTE MUNDIAL?</span>
          </h1>

          <p className="hero-description">
            Consagre o atleta que marcou época nesta temporada. Vote em seu favorito,
            adicione novos concorrentes e acompanhe as oscilações da apuração em tempo real.
          </p>

          <div className="hero-metrics-strip">
            <div className="metric-chip">
              <div className="metric-chip-value">{stats.totalVotos}</div>
              <div className="metric-chip-label">Votos Registrados</div>
            </div>
            <div className="metric-chip-divider" />
            <div className="metric-chip">
              <div className="metric-chip-value">{stats.totalCandidatos}</div>
              <div className="metric-chip-label">Atletas Concorrendo</div>
            </div>
            <div className="metric-chip-divider" />
            <div className="metric-chip">
              <div className="metric-chip-value text-gold">{stats.lider}</div>
              <div className="metric-chip-label">Líder Atual</div>
            </div>
          </div>
        </div>

        {/* Card de Destaque / Spotlight do Líder */}
        <div className="hero-spotlight">
          {leader ? (
            <div className="spotlight-card">
              <div className="spotlight-crown">
                <span className="crown-icon">👑</span>
                <span className="spotlight-tag">LÍDER DA VOTAÇÃO</span>
              </div>

              <div className="spotlight-body">
                <div className="spotlight-avatar-frame">
                  {leader.foto ? (
                    <img
                      src={leader.foto}
                      alt={leader.nome}
                      className="spotlight-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="spotlight-fallback-avatar"
                    style={{ display: leader.foto ? 'none' : 'flex' }}
                  >
                    {leader.nome.substring(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="spotlight-info">
                  <span className="spotlight-sport">{leader.esporte}</span>
                  <h3 className="spotlight-name">{leader.nome}</h3>
                  <p className="spotlight-team">{leader.clube} • {leader.pais}</p>

                  <div className="spotlight-score">
                    <div className="score-number-group">
                      <span className="score-big">{leader.votos}</span>
                      <span className="score-sub">votos ({percentage}%)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`spotlight-vote-btn ${votingId === leader.id ? 'is-voting' : ''}`}
                    onClick={() => onVote(leader.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vote-btn-icon">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Votar no Líder</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="spotlight-empty-card">
              <div className="empty-trophy">🏆</div>
              <h3>Nenhum voto computado ainda</h3>
              <p>Escolha um dos atletas abaixo para abrir a apuração e definir o primeiro líder!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


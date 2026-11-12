import React from 'react';

export function HeroBanner({ leader, stats, onVote, votingId }) {
  const percentage = stats.totalVotos > 0 && leader
    ? ((leader.votos / stats.totalVotos) * 100).toFixed(1)
    : 0;

  return (
    <section className="brutal-hero-poster">
      <div className="hero-left-column">
        <div className="hero-badge-tag">
          <span className="badge-star">★</span>
          <span>ELEIÇÃO GLOBAL DE ATLETAS • TEMPORADA 2026</span>
        </div>

        <h1 className="hero-giant-headline">
          QUEM DOMINA <br />
          <span className="highlight-tag">O TOPO DO</span> MUNDO?
        </h1>

        <p className="hero-lead-paragraph">
          Chegou a hora de decidir. Os atletas mais extraordinários da terra reunidos
          em uma apuração transparente e imediata. Escolha o seu favorito e acompanhe a liderança.
        </p>

        {/* Caixas de Métricas estilo Carimbo */}
        <div className="hero-stats-row">
          <div className="metric-box bg-yellow">
            <span className="metric-num">{stats.totalVotos.toLocaleString('pt-BR')}</span>
            <span className="metric-lbl">Total de Votos</span>
          </div>

          <div className="metric-box bg-cyan">
            <span className="metric-num">{stats.totalCandidatos}</span>
            <span className="metric-lbl">Candidatos</span>
          </div>

          <div className="metric-box bg-pink">
            <span className="metric-num text-truncate" title={stats.lider}>{stats.lider}</span>
            <span className="metric-lbl">Líder Atual</span>
          </div>
        </div>
      </div>

      {/* Card Destaque / MVP Spotlight Card */}
      <div className="hero-right-column">
        {leader && leader.votos > 0 ? (
          <div className="mvp-trading-card">
            <div className="mvp-tape-top">★ CARD DE OURO // LÍDER ATUAL ★</div>
            
            <div className="mvp-card-body">
              <div className="mvp-rank-circle">#1</div>
              
              <div className="mvp-image-frame">
                {leader.foto ? (
                  <img
                    src={leader.foto}
                    alt={leader.nome}
                    className="mvp-athlete-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className="mvp-avatar-fallback"
                  style={{ display: leader.foto ? 'none' : 'flex' }}
                >
                  {leader.nome.substring(0, 2).toUpperCase()}
                </div>
                <span className="mvp-sport-tag">{leader.esporte}</span>
              </div>

              <div className="mvp-info">
                <span className="mvp-sub-tag">{leader.clube} • {leader.pais}</span>
                <h3 className="mvp-name">{leader.nome}</h3>

                <div className="mvp-vote-bar-wrap">
                  <div className="mvp-vote-numbers">
                    <span className="mvp-count"><strong>{leader.votos}</strong> votos</span>
                    <span className="mvp-pct">{percentage}%</span>
                  </div>
                  <div className="mvp-progress-track">
                    <div className="mvp-progress-fill" style={{ width: `${Math.max(Number(percentage), 8)}%` }} />
                  </div>
                </div>

                <button
                  type="button"
                  className={`mvp-vote-action-btn ${votingId === leader.id ? 'btn-pressed' : ''}`}
                  onClick={() => onVote(leader.id)}
                >
                  ⚡ Votar no Líder (+1)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mvp-card-empty">
            <div className="empty-big-emoji">🗳️</div>
            <h3 className="empty-mvp-title">Ainda não há líder definido</h3>
            <p className="empty-mvp-sub">
              Vote em qualquer atleta abaixo para iniciar a apuração e colocar o primeiro competidor no topo!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

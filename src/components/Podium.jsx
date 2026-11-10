import React from 'react';

export function Podium({ podiumList, totalVotes, onVote, votingId }) {
  if (!podiumList || podiumList.length < 2) {
    return null;
  }

  const first = podiumList[0];
  const second = podiumList[1];
  const third = podiumList[2] || null;

  // Se nenhum tiver votos ainda, não precisa mostrar o pódio
  if (first.votos === 0 && second.votos === 0) {
    return null;
  }

  const getPercent = (votos) => {
    if (!totalVotes || totalVotes === 0) return '0%';
    return `${((votos / totalVotes) * 100).toFixed(1)}%`;
  };

  return (
    <section className="podium-section">
      <div className="section-title-wrap text-center">
        <span className="section-kicker">QUADRO DE HONRA</span>
        <h2 className="section-heading">O PÓDIO DA TEMPORADA</h2>
        <p className="section-subheading">Os três maiores pontuadores da premiação até este momento</p>
      </div>

      <div className="podium-stage">
        {/* 2º Lugar - Prata */}
        <div className="podium-column podium-silver">
          <div className="podium-athlete-card">
            <div className="medal-badge medal-silver">2º</div>
            <div className="podium-avatar-wrapper">
              {second.foto ? (
                <img
                  src={second.foto}
                  alt={second.nome}
                  className="podium-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className="podium-avatar-fallback"
                style={{ display: second.foto ? 'none' : 'flex' }}
              >
                {second.nome.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="podium-athlete-name">{second.nome}</div>
            <div className="podium-athlete-sport">{second.esporte}</div>
            <div className="podium-votes-tag">
              <strong>{second.votos}</strong> votos ({getPercent(second.votos)})
            </div>
            <button
              type="button"
              className={`podium-quick-vote-btn ${votingId === second.id ? 'is-voting' : ''}`}
              onClick={() => onVote(second.id)}
            >
              +1 Voto
            </button>
          </div>
          <div className="podium-pillar pillar-silver">
            <span className="pillar-rank">2</span>
            <span className="pillar-label">PRATA</span>
          </div>
        </div>

        {/* 1º Lugar - Ouro */}
        <div className="podium-column podium-gold">
          <div className="podium-athlete-card">
            <div className="podium-crown-floating">👑</div>
            <div className="medal-badge medal-gold">1º</div>
            <div className="podium-avatar-wrapper gold-ring">
              {first.foto ? (
                <img
                  src={first.foto}
                  alt={first.nome}
                  className="podium-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className="podium-avatar-fallback"
                style={{ display: first.foto ? 'none' : 'flex' }}
              >
                {first.nome.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="podium-athlete-name font-bold">{first.nome}</div>
            <div className="podium-athlete-sport">{first.esporte} • {first.clube}</div>
            <div className="podium-votes-tag gold-tag">
              <strong>{first.votos}</strong> votos ({getPercent(first.votos)})
            </div>
            <button
              type="button"
              className={`podium-quick-vote-btn btn-gold-vote ${votingId === first.id ? 'is-voting' : ''}`}
              onClick={() => onVote(first.id)}
            >
              +1 Voto
            </button>
          </div>
          <div className="podium-pillar pillar-gold">
            <span className="pillar-rank">1</span>
            <span className="pillar-label">CAMPEÃO</span>
          </div>
        </div>

        {/* 3º Lugar - Bronze */}
        {third && (
          <div className="podium-column podium-bronze">
            <div className="podium-athlete-card">
              <div className="medal-badge medal-bronze">3º</div>
              <div className="podium-avatar-wrapper">
                {third.foto ? (
                  <img
                    src={third.foto}
                    alt={third.nome}
                    className="podium-avatar-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className="podium-avatar-fallback"
                  style={{ display: third.foto ? 'none' : 'flex' }}
                >
                  {third.nome.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="podium-athlete-name">{third.nome}</div>
              <div className="podium-athlete-sport">{third.esporte}</div>
              <div className="podium-votes-tag">
                <strong>{third.votos}</strong> votos ({getPercent(third.votos)})
              </div>
              <button
                type="button"
                className={`podium-quick-vote-btn ${votingId === third.id ? 'is-voting' : ''}`}
                onClick={() => onVote(third.id)}
              >
                +1 Voto
              </button>
            </div>
            <div className="podium-pillar pillar-bronze">
              <span className="pillar-rank">3</span>
              <span className="pillar-label">BRONZE</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


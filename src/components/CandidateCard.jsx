import React from 'react';

export function CandidateCard({
  candidate,
  index,
  totalVotes,
  onVote,
  onDelete,
  isVoting,
}) {
  const percentage = totalVotes > 0
    ? ((candidate.votos / totalVotes) * 100).toFixed(1)
    : 0;

  const isLeader = index === 0 && candidate.votos > 0;
  const rankNumber = index + 1;

  return (
    <article className={`trading-card-item ${isLeader ? 'is-golden-leader' : ''} ${isVoting ? 'card-bounce-vote' : ''}`}>
      {/* Faixa Superior do Card */}
      <div className="card-ribbon-bar">
        <div className={`card-rank-badge ${rankNumber <= 3 ? `rank-top-${rankNumber}` : 'rank-standard'}`}>
          {isLeader && <span className="crown-mini">👑</span>}
          <span>#{rankNumber}</span>
        </div>

        <div className="card-badges-right">
          <span className="card-country-stamp">
            📍 {candidate.pais}
          </span>
          <button
            type="button"
            className="card-delete-cross"
            onClick={() => onDelete(candidate.id, candidate.nome)}
            title="Remover indicado"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Moldura de Foto */}
      <div className="card-photo-box">
        {candidate.foto ? (
          <img
            src={candidate.foto}
            alt={candidate.nome}
            className="card-photo-content"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div
          className="card-photo-fallback"
          style={{ display: candidate.foto ? 'none' : 'flex' }}
        >
          {candidate.nome.substring(0, 2).toUpperCase()}
        </div>

        <div className="card-sport-sticker">
          {candidate.esporte}
        </div>
      </div>

      {/* Informações do Atleta */}
      <div className="card-body-content">
        <h3 className="card-athlete-title" title={candidate.nome}>
          {candidate.nome}
        </h3>

        <div className="card-club-tag">
          <span className="club-icon">🛡️</span>
          <span>{candidate.clube}</span>
        </div>

        {/* Placar de Votos com Barra Estilizada */}
        <div className="card-tally-box">
          <div className="tally-line">
            <span className="tally-count-bold">
              {candidate.votos.toLocaleString('pt-BR')} <small>{candidate.votos === 1 ? 'voto' : 'votos'}</small>
            </span>
            <span className="tally-pct-badge">{percentage}%</span>
          </div>

          <div className="tally-bar-frame">
            <div
              className={`tally-bar-fill ${isLeader ? 'fill-yellow-stripes' : 'fill-cyan-stripes'}`}
              style={{ width: `${Math.max(Number(percentage), 4)}%` }}
            />
          </div>
        </div>

        {/* Botão de Votação Neo-Brutalist */}
        <button
          type="button"
          className={`card-vote-trigger-btn ${isVoting ? 'btn-voting-active' : ''}`}
          onClick={() => onVote(candidate.id)}
        >
          {isVoting ? 'COMPUTANDO VOTO...' : '🗳️ VOTAR NESTE ATLETA'}
        </button>
      </div>
    </article>
  );
}

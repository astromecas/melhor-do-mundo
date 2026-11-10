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

  const getRankBadgeClass = () => {
    if (index === 0 && candidate.votos > 0) return 'rank-top-1';
    if (index === 1 && candidate.votos > 0) return 'rank-top-2';
    if (index === 2 && candidate.votos > 0) return 'rank-top-3';
    return 'rank-standard';
  };

  return (
    <article className={`athlete-card ${isLeader ? 'athlete-card-leader' : ''} ${isVoting ? 'card-voting-pulse' : ''}`}>
      {/* Cabeçalho do Card com Posição, País e Botão de Deletar */}
      <div className="card-top-bar">
        <div className={`rank-indicator ${getRankBadgeClass()}`}>
          {isLeader && <span className="rank-crown">👑</span>}
          <span>#{rankNumber}</span>
        </div>

        <div className="card-top-right">
          <span className="country-badge" title={`País: ${candidate.pais}`}>
            <span className="country-icon">📍</span>
            <span>{candidate.pais}</span>
          </span>

          <button
            type="button"
            className="delete-athlete-btn"
            onClick={() => onDelete(candidate.id, candidate.nome)}
            title="Remover este candidato"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-icon">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Frame de Imagem do Atleta */}
      <div className="athlete-photo-container">
        {candidate.foto ? (
          <img
            src={candidate.foto}
            alt={candidate.nome}
            className="athlete-photo-img"
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
          className="athlete-fallback-avatar"
          style={{ display: candidate.foto ? 'none' : 'flex' }}
        >
          {candidate.nome.substring(0, 2).toUpperCase()}
        </div>

        <span className="sport-tag-pill">{candidate.esporte}</span>
      </div>

      {/* Dados do Atleta */}
      <div className="athlete-identity">
        <h3 className="athlete-name" title={candidate.nome}>{candidate.nome}</h3>
        <p className="athlete-club">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="club-shield-icon">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{candidate.clube}</span>
        </p>
      </div>

      {/* Estatísticas de Votos e Barra de Progresso */}
      <div className="vote-metrics-panel">
        <div className="vote-count-row">
          <div className="vote-score-display">
            <span className="vote-highlight-num">{candidate.votos.toLocaleString('pt-BR')}</span>
            <span className="vote-word-label">{candidate.votos === 1 ? 'voto' : 'votos'}</span>
          </div>
          <span className="vote-ratio-pill">{percentage}%</span>
        </div>

        <div className="progress-track">
          <div
            className={`progress-fill-bar ${isLeader ? 'fill-gold' : 'fill-cyan'}`}
            style={{ width: `${Math.max(Number(percentage), 3)}%` }}
          />
        </div>
      </div>

      {/* Botão de Votação */}
      <button
        type="button"
        className={`cast-vote-btn ${isVoting ? 'btn-active-voted' : ''}`}
        onClick={() => onVote(candidate.id)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vote-icon">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
        <span>{isVoting ? 'Computando...' : 'Votar no Atleta'}</span>
      </button>
    </article>
  );
}


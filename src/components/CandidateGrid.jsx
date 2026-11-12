import React from 'react';
import { CandidateCard } from './CandidateCard';

export function CandidateGrid({
  candidates,
  loading,
  totalVotes,
  onVote,
  onDelete,
  votingId,
  onOpenAddModal,
  searchQuery,
}) {
  if (loading) {
    return (
      <div className="cards-masonry-grid">
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <div key={key} className="skeleton-brutal-card">
            <div className="skel-header" />
            <div className="skel-img" />
            <div className="skel-txt" />
            <div className="skel-bar" />
            <div className="skel-btn" />
          </div>
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="empty-deck-notice">
        <div className="empty-deck-icon">🃏</div>
        <h3 className="empty-deck-heading">
          {searchQuery ? `Nenhum atleta encontrado para "${searchQuery}"` : 'Coleção de atletas vazia'}
        </h3>
        <p className="empty-deck-text">
          {searchQuery
            ? 'Tente ajustar os termos da pesquisa ou selecione outra modalidade no filtro acima.'
            : 'Adicione os competidores ao troféu para abrir a rodada de votos da temporada!'}
        </p>
        <button
          type="button"
          className="empty-deck-cta-btn"
          onClick={onOpenAddModal}
        >
          ➕ Adicionar Primeiro Atleta
        </button>
      </div>
    );
  }

  return (
    <div className="cards-masonry-grid">
      {candidates.map((item, index) => (
        <CandidateCard
          key={item.id}
          candidate={item}
          index={index}
          totalVotes={totalVotes}
          onVote={onVote}
          onDelete={onDelete}
          isVoting={votingId === item.id}
        />
      ))}
    </div>
  );
}

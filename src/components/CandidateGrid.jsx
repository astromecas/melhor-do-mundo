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
      <div className="athletes-grid">
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <div key={key} className="skeleton-card">
            <div className="skeleton-top" />
            <div className="skeleton-avatar" />
            <div className="skeleton-title" />
            <div className="skeleton-sub" />
            <div className="skeleton-bar" />
            <div className="skeleton-btn" />
          </div>
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="empty-results-box">
        <div className="empty-results-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon-svg">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-results-title">
          {searchQuery ? 'Nenhum atleta encontrado para sua busca' : 'Nenhum indicado cadastrado'}
        </h3>
        <p className="empty-results-desc">
          {searchQuery
            ? `Não encontramos resultados para "${searchQuery}". Tente usar outros termos ou selecione outra modalidade.`
            : 'A lista de concorrentes ao troféu está vazia. Adicione o primeiro atleta para abrir a apuração!'}
        </p>
        <button
          type="button"
          className="empty-action-btn"
          onClick={onOpenAddModal}
        >
          + Cadastrar Atleta
        </button>
      </div>
    );
  }

  return (
    <div className="athletes-grid">
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


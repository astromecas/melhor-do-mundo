import React from 'react';
import { useVotingSystem } from './hooks/useVotingSystem';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterControls } from './components/FilterControls';
import { CandidateGrid } from './components/CandidateGrid';
import { AddCandidateModal } from './components/AddCandidateModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  const {
    candidates,
    filteredCandidates,
    leaderCandidate,
    stats,
    loading,
    votingId,
    isModalOpen,
    setIsModalOpen,
    toasts,
    removeToast,
    handleVote,
    handleCreate,
    handleDelete,
    handleReset,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    availableCategories,
    sortBy,
    setSortBy,
    reloadData,
  } = useVotingSystem();

  return (
    <div className="brutal-app-root">
      {/* Sistema de Toasts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Navegação com Ticker */}
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onResetVotes={handleReset}
        totalVotes={stats.totalVotos}
        onRefresh={() => reloadData(false)}
      />

      {/* Conteúdo Central */}
      <main className="brutal-main-container">
        {/* Hero Pôster com Card Dourado do Líder */}
        <HeroBanner
          leader={leaderCandidate}
          stats={stats}
          onVote={handleVote}
          votingId={votingId}
        />

        {/* Seção Principal de Cartas & Votação */}
        <section className="brutal-deck-section" id="candidatos-secao">
          <div className="deck-section-title-bar">
            <div>
              <span className="deck-sub-tag">COLEÇÃO OFICIAL 2026</span>
              <h2 className="deck-main-headline">Quadro de Atletas</h2>
            </div>
            <button
              type="button"
              className="deck-fast-add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              ➕ Adicionar Atleta
            </button>
          </div>

          {/* Filtros e Pesquisa */}
          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
            categories={availableCategories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredCandidates.length}
            totalCandidates={candidates.length}
          />

          {/* Grade de Cards Colecionáveis */}
          <CandidateGrid
            candidates={filteredCandidates}
            loading={loading}
            totalVotes={stats.totalVotos}
            onVote={handleVote}
            onDelete={handleDelete}
            votingId={votingId}
            onOpenAddModal={() => setIsModalOpen(true)}
            searchQuery={searchQuery}
          />
        </section>
      </main>

      {/* Rodapé */}
      <Footer />

      {/* Modal de Cadastro */}
      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}

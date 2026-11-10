import React from 'react';
import { useVotingSystem } from './hooks/useVotingSystem';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { Podium } from './components/Podium';
import { FilterControls } from './components/FilterControls';
import { CandidateGrid } from './components/CandidateGrid';
import { AddCandidateModal } from './components/AddCandidateModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  const {
    candidates,
    filteredCandidates,
    podiumList,
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
    <div className="awards-app-root">
      {/* Sistema de Notificações Toast */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Barra de Navegação Superior */}
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onResetVotes={handleReset}
        totalVotes={stats.totalVotos}
        onRefresh={() => reloadData(false)}
      />

      {/* Conteúdo Principal */}
      <main className="main-content-wrapper">
        {/* Banner Hero com Spotlight do Líder */}
        <HeroBanner
          leader={leaderCandidate}
          stats={stats}
          onVote={handleVote}
          votingId={votingId}
        />

        {/* Pódio dos 3 Primeiros Colocados */}
        <Podium
          podiumList={podiumList}
          totalVotes={stats.totalVotos}
          onVote={handleVote}
          votingId={votingId}
        />

        {/* Seção Principal de Votação */}
        <section className="voting-section" id="candidatos-secao">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">APURAÇÃO AO VIVO</span>
              <h2 className="section-main-heading">Candidatos ao Troféu</h2>
            </div>
            <button
              type="button"
              className="quick-add-link-btn"
              onClick={() => setIsModalOpen(true)}
            >
              + Adicionar Novo
            </button>
          </div>

          {/* Filtros e Busca */}
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

          {/* Grade de Atletas */}
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

      {/* Rodapé da Aplicação */}
      <Footer />

      {/* Modal de Cadastro de Atleta */}
      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}

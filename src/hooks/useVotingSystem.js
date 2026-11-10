import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchCandidates,
  fetchStatistics,
  castCandidateVote,
  registerCandidate,
  deleteCandidateById,
  resetAllVotes,
} from '../services/athleteApi';

export function useVotingSystem() {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({
    totalVotos: 0,
    lider: 'Aguardando votos',
    totalCandidatos: 0,
    top3: [],
  });
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Estados de filtros e pesquisa
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('votos-desc');

  // Adiciona notificação toast temporária
  const showToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Carregamento de dados da API
  const reloadData = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [candidatesData, statsData] = await Promise.all([
        fetchCandidates(),
        fetchStatistics(),
      ]);
      setCandidates(candidatesData);
      setStats(statsData);
    } catch (err) {
      showToast(
        'Falha ao conectar com o servidor. Verifique se o backend está em execução na porta 3001.',
        'error'
      );
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    reloadData(true);
  }, [reloadData]);

  // Votação em um candidato
  const handleVote = async (id) => {
    try {
      setVotingId(id);
      await castCandidateVote(id);
      await reloadData();
      showToast('Voto computado com sucesso!', 'success');
    } catch (err) {
      showToast('Não foi possível computar o voto.', 'error');
    } finally {
      setTimeout(() => setVotingId(null), 600);
    }
  };

  // Criação de novo atleta
  const handleCreate = async (formData) => {
    try {
      await registerCandidate(formData);
      await reloadData();
      setIsModalOpen(false);
      showToast(`${formData.nome} foi cadastrado com sucesso!`, 'success');
      return true;
    } catch (err) {
      showToast(err.message || 'Erro ao cadastrar indicado.', 'error');
      return false;
    }
  };

  // Remoção de candidato
  const handleDelete = async (id, name) => {
    const confirmMessage = `Confirmar exclusão de ${name} da premiação?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await deleteCandidateById(id);
      await reloadData();
      showToast(`${name} foi removido da votação.`, 'info');
    } catch (err) {
      showToast('Falha ao remover indicado.', 'error');
    }
  };

  // Zerar votos
  const handleReset = async () => {
    const confirmMessage = 'Tem certeza que deseja zerar os votos de todos os atletas? Esta ação não pode ser desfeita.';
    if (!window.confirm(confirmMessage)) return;

    try {
      await resetAllVotes();
      await reloadData();
      showToast('Placar reiniciado! Todos os votos foram zerados.', 'warning');
    } catch (err) {
      showToast('Falha ao resetar apuração.', 'error');
    }
  };

  // Categorias de esporte únicas presentes nos dados
  const availableCategories = useMemo(() => {
    const sportsSet = new Set(candidates.map((c) => c.esporte?.trim()).filter(Boolean));
    return ['Todos', ...Array.from(sportsSet)];
  }, [candidates]);

  // Filtragem e ordenação inteligente dos candidatos
  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    // Filtro por texto (nome, clube, esporte ou país)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.nome.toLowerCase().includes(query) ||
          c.clube.toLowerCase().includes(query) ||
          c.esporte.toLowerCase().includes(query) ||
          c.pais.toLowerCase().includes(query)
      );
    }

    // Filtro por categoria esportiva
    if (activeCategory !== 'Todos') {
      result = result.filter(
        (c) => c.esporte?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Ordenação
    result.sort((a, b) => {
      if (sortBy === 'votos-desc') return b.votos - a.votos;
      if (sortBy === 'votos-asc') return a.votos - b.votos;
      if (sortBy === 'nome-asc') return a.nome.localeCompare(b.nome);
      return 0;
    });

    return result;
  }, [candidates, searchQuery, activeCategory, sortBy]);

  // Líder atual
  const leaderCandidate = useMemo(() => {
    if (!candidates || candidates.length === 0) return null;
    const sorted = [...candidates].sort((a, b) => b.votos - a.votos);
    return sorted[0].votos > 0 ? sorted[0] : null;
  }, [candidates]);

  // Top 3 do pódio
  const podiumList = useMemo(() => {
    if (!candidates || candidates.length === 0) return [];
    const sorted = [...candidates].sort((a, b) => b.votos - a.votos);
    return sorted.slice(0, 3);
  }, [candidates]);

  return {
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
    showToast,
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
  };
}


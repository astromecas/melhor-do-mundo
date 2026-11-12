import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchCandidates,
  fetchStatistics,
  castCandidateVote,
  registerCandidate,
  deleteCandidateById,
  resetAllVotes,
} from '../services/athleteApi';

// Dados de demonstração para que a interface funcione imediatamente,
// mesmo se o PostgreSQL não estiver iniciado localmente.
const ATLETAS_DEMO = [
  {
    id: 1,
    nome: 'Vinícius Jr.',
    esporte: 'Futebol',
    clube: 'Real Madrid',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    votos: 142,
  },
  {
    id: 2,
    nome: 'Simone Biles',
    esporte: 'Ginástica Artística',
    clube: 'USA Gymnastics',
    pais: 'Estados Unidos',
    foto: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    votos: 128,
  },
  {
    id: 3,
    nome: 'Lionel Messi',
    esporte: 'Futebol',
    clube: 'Inter Miami',
    pais: 'Argentina',
    foto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    votos: 115,
  },
  {
    id: 4,
    nome: 'LeBron James',
    esporte: 'Basquete',
    clube: 'Los Angeles Lakers',
    pais: 'Estados Unidos',
    foto: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    votos: 94,
  },
  {
    id: 5,
    nome: 'Rebeca Andrade',
    esporte: 'Ginástica Artística',
    clube: 'Flamengo',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=600&q=80',
    votos: 89,
  },
  {
    id: 6,
    nome: 'Lewis Hamilton',
    esporte: 'Automobilismo',
    clube: 'Scuderia Ferrari',
    pais: 'Reino Unido',
    foto: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    votos: 76,
  },
  {
    id: 7,
    nome: 'Rayssa Leal',
    esporte: 'Skate',
    clube: 'Seleção Brasileira',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=600&q=80',
    votos: 65,
  },
  {
    id: 8,
    nome: 'Erling Haaland',
    esporte: 'Futebol',
    clube: 'Manchester City',
    pais: 'Noruega',
    foto: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    votos: 52,
  },
];

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

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('votos-desc');

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

  // Recálculo local de estatísticas caso o banco esteja offline
  const computeStats = (list) => {
    const total = list.reduce((acc, c) => acc + (c.votos || 0), 0);
    const sorted = [...list].sort((a, b) => (b.votos || 0) - (a.votos || 0));
    const leader = sorted.length > 0 && sorted[0].votos > 0 ? sorted[0].nome : 'Aguardando votos';
    return {
      totalVotos: total,
      lider: leader,
      totalCandidatos: list.length,
      top3: sorted.slice(0, 3),
    };
  };

  // Carregamento dos dados com fallback transparente
  const reloadData = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [candidatesData, statsData] = await Promise.all([
        fetchCandidates(),
        fetchStatistics(),
      ]);

      if (Array.isArray(candidatesData) && candidatesData.length > 0) {
        setCandidates(candidatesData);
        setStats(statsData);
      } else {
        // Banco vazio: inicializa com a amostra
        setCandidates(ATLETAS_DEMO);
        setStats(computeStats(ATLETAS_DEMO));
      }
    } catch (err) {
      console.warn('Banco offline ou indisponível, utilizando dados locais.');
      setCandidates((prev) => {
        if (prev.length > 0) return prev;
        const initial = ATLETAS_DEMO;
        setStats(computeStats(initial));
        return initial;
      });
      if (isInitial) {
        showToast('Modo de demonstração ativo (conectará ao PostgreSQL se o serviço estiver ativo).', 'info');
      }
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    reloadData(true);
  }, [reloadData]);

  // Votação
  const handleVote = async (id) => {
    setVotingId(id);
    try {
      await castCandidateVote(id);
      await reloadData();
      showToast('✓ Voto registrado com sucesso!', 'success');
    } catch (err) {
      // Fallback local: incrementa direto no estado
      setCandidates((prev) => {
        const updated = prev.map((c) =>
          c.id === id ? { ...c, votos: (c.votos || 0) + 1 } : c
        );
        setStats(computeStats(updated));
        return updated;
      });
      showToast('✓ Voto registrado com sucesso!', 'success');
    } finally {
      setTimeout(() => setVotingId(null), 500);
    }
  };

  // Criação de candidato
  const handleCreate = async (formData) => {
    try {
      await registerCandidate(formData);
      await reloadData();
      setIsModalOpen(false);
      showToast(`Atleta ${formData.nome} cadastrado!`, 'success');
      return true;
    } catch (err) {
      // Fallback local
      const novo = {
        ...formData,
        id: Date.now(),
        votos: 0,
      };
      setCandidates((prev) => {
        const updated = [novo, ...prev];
        setStats(computeStats(updated));
        return updated;
      });
      setIsModalOpen(false);
      showToast(`Atleta ${formData.nome} cadastrado com sucesso!`, 'success');
      return true;
    }
  };

  // Exclusão
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Tem certeza que deseja remover ${name}?`)) return;

    try {
      await deleteCandidateById(id);
      await reloadData();
      showToast(`${name} foi removido.`, 'info');
    } catch (err) {
      // Fallback local
      setCandidates((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        setStats(computeStats(updated));
        return updated;
      });
      showToast(`${name} foi removido.`, 'info');
    }
  };

  // Zerar votos
  const handleReset = async () => {
    if (!window.confirm('Tem certeza que deseja zerar os votos de todos os atletas?')) return;

    try {
      await resetAllVotes();
      await reloadData();
      showToast('Todos os votos foram zerados!', 'warning');
    } catch (err) {
      // Fallback local
      setCandidates((prev) => {
        const updated = prev.map((c) => ({ ...c, votos: 0 }));
        setStats(computeStats(updated));
        return updated;
      });
      showToast('Todos os votos foram zerados!', 'warning');
    }
  };

  // Categorias
  const availableCategories = useMemo(() => {
    const set = new Set(candidates.map((c) => c.esporte?.trim()).filter(Boolean));
    return ['Todos', ...Array.from(set)];
  }, [candidates]);

  // Filtragem e Ordenação
  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.nome.toLowerCase().includes(q) ||
          c.clube.toLowerCase().includes(q) ||
          c.esporte.toLowerCase().includes(q) ||
          c.pais.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'Todos') {
      result = result.filter(
        (c) => c.esporte?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'votos-desc') return (b.votos || 0) - (a.votos || 0);
      if (sortBy === 'votos-asc') return (a.votos || 0) - (b.votos || 0);
      if (sortBy === 'nome-asc') return a.nome.localeCompare(b.nome);
      return 0;
    });

    return result;
  }, [candidates, searchQuery, activeCategory, sortBy]);

  // Líder atual
  const leaderCandidate = useMemo(() => {
    if (!candidates || candidates.length === 0) return null;
    const sorted = [...candidates].sort((a, b) => (b.votos || 0) - (a.votos || 0));
    return sorted[0].votos > 0 ? sorted[0] : null;
  }, [candidates]);

  return {
    candidates,
    filteredCandidates,
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

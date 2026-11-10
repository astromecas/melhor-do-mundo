/**
 * Serviço de comunicação HTTP com a API da premiação
 */

const BASE_URL = 'http://localhost:3001/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || `Falha na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}

// Busca a lista de todos os atletas indicados
export function fetchCandidates() {
  return request('/candidatos');
}

// Busca os dados estatísticos globais (total de votos, líder, etc.)
export function fetchStatistics() {
  return request('/stats');
}

// Registra um novo voto para o atleta
export function castCandidateVote(id) {
  return request(`/candidatos/${id}/votar`, {
    method: 'PATCH',
  });
}

// Cadastra um novo indicado
export function registerCandidate(payload) {
  return request('/candidatos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Exclui um indicado pelo ID
export function deleteCandidateById(id) {
  return request(`/candidatos/${id}`, {
    method: 'DELETE',
  });
}

// Reinicia a contagem de todos os votos
export function resetAllVotes() {
  return request('/candidatos/zerar-votos', {
    method: 'POST',
  });
}


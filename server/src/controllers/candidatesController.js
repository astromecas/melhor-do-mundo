const prisma = require('../database/client');

/**
 * Controller responsável pelo gerenciamento de atletas concorrentes ao prêmio
 */

// Lista todos os candidatos, suportando filtros opcionais por query parameters
async function listAllCandidates(req, res) {
  try {
    const { busca, esporte, ordem } = req.query;

    // Construção dinâmica de filtros de consulta
    const whereConditions = {};

    if (esporte && esporte.trim().toLowerCase() !== 'todos') {
      whereConditions.esporte = {
        equals: esporte.trim(),
        mode: 'insensitive',
      };
    }

    if (busca && busca.trim()) {
      const termo = busca.trim();
      whereConditions.OR = [
        { nome: { contains: termo, mode: 'insensitive' } },
        { clube: { contains: termo, mode: 'insensitive' } },
        { pais: { contains: termo, mode: 'insensitive' } },
        { esporte: { contains: termo, mode: 'insensitive' } },
      ];
    }

    // Configuração de ordenação
    let orderByConfig = { votos: 'desc' };
    if (ordem === 'votos-asc') {
      orderByConfig = { votos: 'asc' };
    } else if (ordem === 'nome-asc') {
      orderByConfig = { nome: 'asc' };
    }

    const candidatos = await prisma.candidato.findMany({
      where: whereConditions,
      orderBy: orderByConfig,
    });

    return res.status(200).json(candidatos);
  } catch (err) {
    console.error('Falha ao listar candidatos:', err);
    return res.status(500).json({ error: 'Erro ao carregar a lista de atletas.' });
  }
}

// Retorna detalhes de um candidato específico pelo ID
async function getCandidateById(req, res) {
  const candidateId = parseInt(req.params.id, 10);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'O identificador deve ser um número inteiro válido.' });
  }

  try {
    const candidato = await prisma.candidato.findUnique({
      where: { id: candidateId },
    });

    if (!candidato) {
      return res.status(404).json({ error: 'Candidato não localizado na base de dados.' });
    }

    return res.status(200).json(candidato);
  } catch (err) {
    console.error(`Erro ao consultar atleta ID ${candidateId}:`, err);
    return res.status(500).json({ error: 'Erro ao consultar candidato.' });
  }
}

// Cria um novo atleta após validação do payload
async function createCandidate(req, res) {
  const dados = req.sanitizedCandidate || req.body;

  try {
    const novoAtleta = await prisma.candidato.create({
      data: {
        nome: dados.nome,
        esporte: dados.esporte,
        clube: dados.clube,
        pais: dados.pais,
        foto: dados.foto || null,
        votos: 0,
      },
    });

    return res.status(201).json(novoAtleta);
  } catch (err) {
    console.error('Falha na inserção do atleta:', err);
    return res.status(500).json({ error: 'Não foi possível cadastrar o candidato.' });
  }
}

// Incrementa a contagem de votos do atleta selecionado
async function registerVote(req, res) {
  const candidateId = parseInt(req.params.id, 10);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'ID inválido para registro de voto.' });
  }

  try {
    const atualizado = await prisma.candidato.update({
      where: { id: candidateId },
      data: {
        votos: { increment: 1 },
      },
    });

    return res.status(200).json(atualizado);
  } catch (err) {
    // Código P2025 do Prisma: registro não encontrado
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Atleta não encontrado para receber voto.' });
    }

    console.error(`Falha ao registrar voto para ID ${candidateId}:`, err);
    return res.status(500).json({ error: 'Erro ao computar voto.' });
  }
}

// Exclui um atleta do sistema
async function deleteCandidate(req, res) {
  const candidateId = parseInt(req.params.id, 10);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'ID inválido para exclusão.' });
  }

  try {
    await prisma.candidato.delete({
      where: { id: candidateId },
    });

    return res.status(200).json({
      message: 'Candidato excluído com sucesso.',
      id: candidateId,
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Atleta não encontrado para remoção.' });
    }

    console.error(`Erro ao remover atleta ${candidateId}:`, err);
    return res.status(500).json({ error: 'Erro ao deletar candidato.' });
  }
}

// Reinicia o placar zerando todos os votos da premiação
async function resetVotes(req, res) {
  try {
    const resultado = await prisma.candidato.updateMany({
      data: { votos: 0 },
    });

    return res.status(200).json({
      message: 'Todos os votos foram zerados com sucesso.',
      afetados: resultado.count,
    });
  } catch (err) {
    console.error('Falha ao zerar votos da premiação:', err);
    return res.status(500).json({ error: 'Erro ao reiniciar contagem de votos.' });
  }
}

module.exports = {
  listAllCandidates,
  getCandidateById,
  createCandidate,
  registerVote,
  deleteCandidate,
  resetVotes,
};

const prisma = require('../database/client');

/**
 * Controller responsável pelas operações com candidatos da premiação
 */

// Recupera a lista completa de candidatos ordenados por número de votos
async function listAllCandidates(req, res) {
  try {
    const list = await prisma.candidato.findMany({
      orderBy: {
        votos: 'desc',
      },
    });
    return res.status(200).json(list);
  } catch (err) {
    console.error('Erro na consulta de candidatos:', err);
    return res.status(500).json({ error: 'Não foi possível carregar a lista de indicados.' });
  }
}

// Busca detalhes de um único candidato pelo identificador numérico
async function getCandidateById(req, res) {
  const candidateId = Number(req.params.id);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'Identificador do candidato inválido.' });
  }

  try {
    const record = await prisma.candidato.findUnique({
      where: { id: candidateId },
    });

    if (!record) {
      return res.status(404).json({ error: 'Indicado não encontrado no sistema.' });
    }

    return res.status(200).json(record);
  } catch (err) {
    console.error(`Erro ao consultar candidato ${candidateId}:`, err);
    return res.status(500).json({ error: 'Falha ao buscar os detalhes do candidato.' });
  }
}

// Cadastra um novo candidato para a premiação
async function createCandidate(req, res) {
  const { nome, esporte, clube, pais, foto } = req.body;

  if (!nome || !esporte || !clube || !pais) {
    return res.status(400).json({
      error: 'Parâmetros obrigatórios ausentes. Informe: nome, esporte, clube e país.',
    });
  }

  try {
    const novoCandidato = await prisma.candidato.create({
      data: {
        nome: String(nome).trim(),
        esporte: String(esporte).trim(),
        clube: String(clube).trim(),
        pais: String(pais).trim(),
        foto: foto && String(foto).trim().length > 0 ? String(foto).trim() : null,
        votos: 0,
      },
    });

    return res.status(201).json(novoCandidato);
  } catch (err) {
    console.error('Erro ao cadastrar indicado:', err);
    return res.status(500).json({ error: 'Falha interna ao criar novo candidato.' });
  }
}

// Incrementa a contagem de votos do candidato especificado
async function registerVote(req, res) {
  const candidateId = Number(req.params.id);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'ID do candidato precisa ser um número válido.' });
  }

  try {
    const atualizado = await prisma.candidato.update({
      where: { id: candidateId },
      data: {
        votos: {
          increment: 1,
        },
      },
    });

    return res.status(200).json(atualizado);
  } catch (err) {
    console.error(`Erro ao registrar voto para o ID ${candidateId}:`, err);
    return res.status(500).json({ error: 'Falha ao computar voto do atleta.' });
  }
}

// Remove um candidato do banco de dados
async function deleteCandidate(req, res) {
  const candidateId = Number(req.params.id);

  if (isNaN(candidateId)) {
    return res.status(400).json({ error: 'ID inválido para remoção.' });
  }

  try {
    await prisma.candidato.delete({
      where: { id: candidateId },
    });

    return res.status(200).json({
      message: 'Candidato desclassificado e removido com sucesso.',
      id: candidateId,
    });
  } catch (err) {
    console.error(`Erro ao deletar candidato ${candidateId}:`, err);
    return res.status(500).json({ error: 'Falha ao remover candidato do sistema.' });
  }
}

// Zera o placar de votos de todos os candidatos
async function resetVotes(req, res) {
  try {
    const resultado = await prisma.candidato.updateMany({
      data: { votos: 0 },
    });

    return res.status(200).json({
      message: 'A apuração foi reiniciada. Todos os votos estão zerados.',
      afetados: resultado.count,
    });
  } catch (err) {
    console.error('Erro ao zerar contagem de votos:', err);
    return res.status(500).json({ error: 'Erro ao zerar os votos da premiação.' });
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


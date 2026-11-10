const prisma = require('../database/client');

/**
 * Controller responsável pelas métricas estatísticas da premiação
 */
async function getAwardStats(req, res) {
  try {
    const todosCandidatos = await prisma.candidato.findMany({
      orderBy: { votos: 'desc' },
      select: {
        id: true,
        nome: true,
        esporte: true,
        votos: true,
        clube: true,
        foto: true,
      },
    });

    const totalVotos = todosCandidatos.reduce((soma, item) => soma + item.votos, 0);
    const totalCandidatos = todosCandidatos.length;
    const atletaLider = totalCandidatos > 0 && todosCandidatos[0].votos > 0 ? todosCandidatos[0] : null;

    return res.status(200).json({
      totalVotos,
      lider: atletaLider ? atletaLider.nome : 'Aguardando votos',
      totalCandidatos,
      top3: todosCandidatos.slice(0, 3),
    });
  } catch (err) {
    console.error('Erro ao compilar estatísticas de votação:', err);
    return res.status(500).json({ error: 'Falha ao processar métricas de apuração.' });
  }
}

module.exports = {
  getAwardStats,
};


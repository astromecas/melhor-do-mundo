const prisma = require('../database/client');

/**
 * Controller responsável pela compilação estatística da premiação
 */
async function getAwardStats(req, res) {
  try {
    // Agregação de dados gerais no banco de dados via Prisma
    const [agregados, liderRecord, top3List, modalidades] = await Promise.all([
      prisma.candidato.aggregate({
        _sum: { votos: true },
        _count: { id: true },
        _avg: { votos: true },
      }),
      prisma.candidato.findFirst({
        where: { votos: { gt: 0 } },
        orderBy: { votos: 'desc' },
        select: { id: true, nome: true, votos: true, esporte: true, clube: true },
      }),
      prisma.candidato.findMany({
        take: 3,
        orderBy: { votos: 'desc' },
        select: {
          id: true,
          nome: true,
          esporte: true,
          clube: true,
          pais: true,
          foto: true,
          votos: true,
        },
      }),
      prisma.candidato.groupBy({
        by: ['esporte'],
        _count: { id: true },
        _sum: { votos: true },
        orderBy: { _count: { id: 'desc' } },
      }),
    ]);

    const totalVotos = agregados._sum.votos || 0;
    const totalCandidatos = agregados._count.id || 0;
    const mediaVotos = agregados._avg.votos ? Number(agregados._avg.votos.toFixed(1)) : 0;

    return res.status(200).json({
      // Campos originais esperados pela proposta do projeto:
      totalVotos,
      lider: liderRecord ? liderRecord.nome : 'Aguardando votos',
      totalCandidatos,
      top3: top3List,
      
      // Métricas complementares enriquecidas:
      mediaVotos,
      modalidades: modalidades.map((m) => ({
        esporte: m.esporte,
        totalAtletas: m._count.id,
        votosRecebidos: m._sum.votos || 0,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Erro ao compilar métricas estatísticas:', err);
    return res.status(500).json({ error: 'Falha ao processar estatísticas de votação.' });
  }
}

module.exports = {
  getAwardStats,
};

/**
 * Script de inicialização da base de dados (Seed)
 * Popula a tabela de candidatos com atletas de destaque mundial em diversas modalidades.
 */

const prisma = require('../src/database/client');

const indicadosIniciais = [
  {
    nome: 'Vinícius Jr.',
    esporte: 'Futebol',
    clube: 'Real Madrid',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    votos: 142,
  },
  {
    nome: 'Simone Biles',
    esporte: 'Ginástica Artística',
    clube: 'World Champions Centre',
    pais: 'Estados Unidos',
    foto: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    votos: 128,
  },
  {
    nome: 'Lionel Messi',
    esporte: 'Futebol',
    clube: 'Inter Miami',
    pais: 'Argentina',
    foto: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    votos: 115,
  },
  {
    nome: 'LeBron James',
    esporte: 'Basquete',
    clube: 'Los Angeles Lakers',
    pais: 'Estados Unidos',
    foto: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
    votos: 94,
  },
  {
    nome: 'Rebeca Andrade',
    esporte: 'Ginástica Artística',
    clube: 'Flamengo',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=600&q=80',
    votos: 89,
  },
  {
    nome: 'Lewis Hamilton',
    esporte: 'Automobilismo',
    clube: 'Scuderia Ferrari',
    pais: 'Reino Unido',
    foto: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    votos: 76,
  },
  {
    nome: 'Rayssa Leal',
    esporte: 'Skate',
    clube: 'Seleção Brasileira',
    pais: 'Brasil',
    foto: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=600&q=80',
    votos: 65,
  },
  {
    nome: 'Erling Haaland',
    esporte: 'Futebol',
    clube: 'Manchester City',
    pais: 'Noruega',
    foto: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80',
    votos: 52,
  },
];

async function executarCargaInicial() {
  console.log('🔄 Iniciando carga e limpeza do banco de dados...');

  // Limpeza de registros prévios
  const deletados = await prisma.candidato.deleteMany();
  console.log(`🧹 Registros anteriores removidos: ${deletados.count}`);

  // Inserção em lote dos atletas de destaque
  for (const atleta of indicadosIniciais) {
    await prisma.candidato.create({
      data: atleta,
    });
    console.log(`⭐ Atleta cadastrado: ${atleta.nome} (${atleta.esporte})`);
  }

  console.log(`✨ Seed concluído com sucesso! ${indicadosIniciais.length} indicados disponíveis.`);
}

executarCargaInicial()
  .catch((erro) => {
    console.error('❌ Falha crítica ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

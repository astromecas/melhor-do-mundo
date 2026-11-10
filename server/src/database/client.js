/**
 * Configuração e inicialização do cliente Prisma
 * Permite conexão com banco PostgreSQL para gerenciamento de votos e candidatos
 */

let PrismaClient;

try {
  // Tenta carregar do pacote padrão instalado
  ({ PrismaClient } = require('@prisma/client'));
} catch (error) {
  // Fallback para o client gerado customizado caso necessário
  try {
    ({ PrismaClient } = require('../../server/generated/prisma'));
  } catch (innerError) {
    console.error('Falha ao inicializar o Prisma Client:', innerError);
  }
}

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

module.exports = prisma;


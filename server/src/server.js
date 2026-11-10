const express = require('express');
const cors = require('cors');

const candidatesRouter = require('./routes/candidatesRouter');
const statsRouter = require('./routes/statsRouter');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de Middlewares Globais
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de auditoria simples para desenvolvimento
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Endpoint de verificação de integridade (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Global Sports Awards API',
  });
});

// Vinculação dos Roteadores da API
app.use('/api/candidatos', candidatesRouter);
app.use('/api/stats', statsRouter);

// Tratamento de rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Recurso não encontrado na API do Melhor do Mundo.',
    path: req.originalUrl,
  });
});

// Middleware centralizado de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Falha inesperada capturada:', err.stack);
  res.status(500).json({
    error: 'Ocorreu uma instabilidade interna no servidor.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Inicialização do servidor HTTP
app.listen(PORT, () => {
  console.log('='.repeat(55));
  console.log(`⚡ SERVIDOR DE VOTAÇÃO ATIVO: http://localhost:${PORT}`);
  console.log(`🎯 API Candidatos: http://localhost:${PORT}/api/candidatos`);
  console.log(`📈 API Estatísticas: http://localhost:${PORT}/api/stats`);
  console.log('='.repeat(55));
});

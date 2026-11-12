/**
 * Middleware para auditoria e medição de latência de requisições HTTP
 */

function requestLogger(req, res, next) {
  const startTime = Date.now();
  const timeString = new Date().toLocaleTimeString('pt-BR');

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 400 ? '❌' : '✓';

    console.log(
      `[${timeString}] ${statusColor} ${req.method} ${req.originalUrl} -> ${statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = requestLogger;

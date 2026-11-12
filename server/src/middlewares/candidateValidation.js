/**
 * Middleware de validação e higienização para operações com candidatos
 */

function validateCandidatePayload(req, res, next) {
  const { nome, esporte, clube, pais, foto } = req.body;
  const errors = [];

  // Validação do Nome
  if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
    errors.push('O campo "nome" é obrigatório e deve conter ao menos 2 caracteres.');
  }

  // Validação do Esporte / Modalidade
  if (!esporte || typeof esporte !== 'string' || esporte.trim().length < 2) {
    errors.push('O campo "esporte" é obrigatório.');
  }

  // Validação do Clube
  if (!clube || typeof clube !== 'string' || clube.trim().length === 0) {
    errors.push('O campo "clube" é obrigatório.');
  }

  // Validação do País
  if (!pais || typeof pais !== 'string' || pais.trim().length === 0) {
    errors.push('O campo "pais" é obrigatório.');
  }

  // Validação de URL da Foto (opcional, mas se informada deve ser válida)
  if (foto && typeof foto === 'string' && foto.trim().length > 0) {
    const trimmedFoto = foto.trim();
    const isValidUrl = trimmedFoto.startsWith('http://') || trimmedFoto.startsWith('https://');
    if (!isValidUrl) {
      errors.push('O campo "foto" deve ser uma URL válida iniciada com http:// ou https://.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Falha na validação dos dados do candidato.',
      detalhes: errors,
    });
  }

  // Sanitização e normalização dos dados limpos
  req.sanitizedCandidate = {
    nome: nome.trim(),
    esporte: esporte.trim(),
    clube: clube.trim(),
    pais: pais.trim(),
    foto: foto && foto.trim().length > 0 ? foto.trim() : null,
  };

  next();
}

module.exports = {
  validateCandidatePayload,
};


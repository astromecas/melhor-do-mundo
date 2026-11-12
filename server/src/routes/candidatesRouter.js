const { Router } = require('express');
const {
  listAllCandidates,
  getCandidateById,
  createCandidate,
  registerVote,
  deleteCandidate,
  resetVotes,
} = require('../controllers/candidatesController');
const { validateCandidatePayload } = require('../middlewares/candidateValidation');

const router = Router();

// Endpoints REST de Candidatos
router.get('/', listAllCandidates);
router.post('/zerar-votos', resetVotes);
router.get('/:id', getCandidateById);
router.post('/', validateCandidatePayload, createCandidate);
router.patch('/:id/votar', registerVote);
router.delete('/:id', deleteCandidate);

module.exports = router;

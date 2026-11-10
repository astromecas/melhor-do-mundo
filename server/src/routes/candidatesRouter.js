const { Router } = require('express');
const {
  listAllCandidates,
  getCandidateById,
  createCandidate,
  registerVote,
  deleteCandidate,
  resetVotes,
} = require('../controllers/candidatesController');

const router = Router();

// Endpoints da API de Candidatos
router.get('/', listAllCandidates);
router.post('/zerar-votos', resetVotes);
router.get('/:id', getCandidateById);
router.post('/', createCandidate);
router.patch('/:id/votar', registerVote);
router.delete('/:id', deleteCandidate);

module.exports = router;


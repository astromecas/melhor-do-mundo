const { Router } = require('express');
const { getAwardStats } = require('../controllers/statsController');

const router = Router();

// Endpoint de métricas da premiação
router.get('/', getAwardStats);

module.exports = router;


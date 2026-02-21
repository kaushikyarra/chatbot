const express = require('express');
const router = express.Router();
const { handleQuery } = require('../controllers/aiController');

// POST /api/ai/query
router.post('/query', handleQuery);

module.exports = router;

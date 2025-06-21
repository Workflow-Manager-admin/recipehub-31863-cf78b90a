const express = require('express');
const healthController = require('../controllers/health');
const apiRouter = require('./api');

const router = express.Router();

// Health check endpoint
router.get('/', healthController.check.bind(healthController));
// Mount main API at /api
router.use('/api', apiRouter);

module.exports = router;

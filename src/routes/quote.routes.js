const express = require('express');
const router = express.Router();
const {
  submitQuoteRequest,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
  getQuoteStats
} = require('../controllers/quote.controller');
const { quoteValidationRules, validate } = require('../validators/quote.validator');
const { quoteFormLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post(
  '/',
  quoteFormLimiter,
  quoteValidationRules(),
  validate,
  submitQuoteRequest
);

// Admin routes (add authentication middleware in production)
router.get('/', getAllQuotes);
router.get('/stats', getQuoteStats);
router.get('/:id', getQuoteById);
router.patch('/:id/status', updateQuoteStatus);
router.delete('/:id', deleteQuote);

module.exports = router;
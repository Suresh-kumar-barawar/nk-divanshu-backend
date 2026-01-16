const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
  getSubmissionStats
} = require('../controllers/contact.controller');
const { contactValidationRules, validate } = require('../validators/contact.validator');
const { contactFormLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post(
  '/',
  contactFormLimiter,
  contactValidationRules(),
  validate,
  submitContactForm
);

// Admin routes (add authentication middleware in production)
router.get('/', getAllSubmissions);
router.get('/stats', getSubmissionStats);
router.get('/:id', getSubmissionById);
router.patch('/:id/status', updateSubmissionStatus);
router.delete('/:id', deleteSubmission);

module.exports = router;
const { body, validationResult } = require('express-validator');

const contactValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s\-'\.]+$/).withMessage('Name can only contain letters, spaces, hyphens, apostrophes, and periods'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please enter a valid email address')
      .normalizeEmail()
      .isLength({ max: 255 }).withMessage('Email cannot exceed 255 characters'),
    
    body('phone')
      .optional({ checkFalsy: true })
      .trim()
      .matches(/^[0-9+\-\s()]*$/).withMessage('Please enter a valid phone number')
      .isLength({ max: 20 }).withMessage('Phone number cannot exceed 20 characters'),
    
    body('subject')
      .trim()
      .notEmpty().withMessage('Subject is required')
      .isIn(['Consultation', 'Project', 'Partnership', 'Other']).withMessage('Invalid subject selection'),
    
    body('message')
      .trim()
      .notEmpty().withMessage('Message is required')
      .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
      .escape() // Sanitize to prevent XSS
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  contactValidationRules,
  validate
};
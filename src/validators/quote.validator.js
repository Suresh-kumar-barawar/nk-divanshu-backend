const { body, validationResult } = require('express-validator');

const quoteValidationRules = () => {
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
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[0-9+\-\s()]*$/).withMessage('Invalid phone number format')
      .isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10 and 20 characters'),
    
    body('package')
      .trim()
      .notEmpty().withMessage('Package selection is required')
      .isIn(['Silver', 'Gold', 'Platinum', 'Custom Package']).withMessage('Invalid package selection'),
    
    body('area')
      .notEmpty().withMessage('Construction area is required')
      .isInt({ min: 100, max: 100000 }).withMessage('Area must be between 100 and 100,000 sq.ft'),
    
    body('message')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
      .escape()
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
  quoteValidationRules,
  validate
};
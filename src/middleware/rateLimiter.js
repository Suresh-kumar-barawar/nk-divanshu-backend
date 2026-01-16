const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Strict limiter for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour per IP
  message: {
    success: false,
    message: 'Too many form submissions. Please try again later.'
  },
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    console.log(`⚠️  Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'You have submitted too many forms. Please wait before submitting again.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Strict limiter for quote requests
const quoteFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 quote requests per hour per IP
  message: {
    success: false,
    message: 'Too many quote requests. Please try again later.'
  },
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    console.log(`⚠️  Quote rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'You have submitted too many quote requests. Please wait before submitting again.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

module.exports = {
  apiLimiter,
  contactFormLimiter,
  quoteFormLimiter
};
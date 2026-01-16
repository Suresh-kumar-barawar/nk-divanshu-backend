const QuoteRequest = require('../models/QuoteRequest');
const logger = require('../utils/logger');

// @desc    Submit quote request
// @route   POST /api/quote
// @access  Public
const submitQuoteRequest = async (req, res, next) => {
  try {
    const { name, email, phone, package: pkg, area, message } = req.body;

    // Get IP address and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    // Calculate estimated cost
    const estimatedCost = QuoteRequest.calculateCost(pkg, area);

    // Create new quote request
    const quoteRequest = await QuoteRequest.create({
      name,
      email,
      phone,
      package: pkg,
      area,
      message,
      estimatedCost,  // Add the calculated cost
      ipAddress,
      userAgent
    });

    logger.success(`New quote request: ${email} - ${pkg} - ${area} sq.ft - ₹${estimatedCost.toLocaleString('en-IN')}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in NK Divanshu Builders! Your quote request has been submitted. We will contact you soon with a detailed quotation.',
      data: {
        id: quoteRequest._id,
        name: quoteRequest.name,
        email: quoteRequest.email,
        package: quoteRequest.package,
        area: quoteRequest.area,
        estimatedCost: quoteRequest.estimatedCost,
        submittedAt: quoteRequest.createdAt
      }
    });

  } catch (error) {
    logger.error('Error submitting quote request:', error);
    next(error);
  }
};

// @desc    Get all quote requests (Admin)
// @route   GET /api/quote
// @access  Private
const getAllQuotes = async (req, res, next) => {
  try {
    const { status, package: pkg, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (pkg) query.package = pkg;
    
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const quotes = await QuoteRequest.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await QuoteRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: quotes
    });

  } catch (error) {
    logger.error('Error fetching quotes:', error);
    next(error);
  }
};

// @desc    Get single quote request by ID
// @route   GET /api/quote/:id
// @access  Private
const getQuoteById = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });

  } catch (error) {
    logger.error('Error fetching quote:', error);
    next(error);
  }
};

// @desc    Update quote status
// @route   PATCH /api/quote/:id/status
// @access  Private
const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const quote = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found'
      });
    }

    logger.info(`Quote ${req.params.id} status updated to ${status}`);

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: quote
    });

  } catch (error) {
    logger.error('Error updating quote status:', error);
    next(error);
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quote/:id
// @access  Private
const deleteQuote = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found'
      });
    }

    logger.info(`Quote ${req.params.id} deleted`);

    res.status(200).json({
      success: true,
      message: 'Quote request deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting quote:', error);
    next(error);
  }
};

// @desc    Get quote statistics
// @route   GET /api/quote/stats
// @access  Private
const getQuoteStats = async (req, res, next) => {
  try {
    const totalQuotes = await QuoteRequest.countDocuments();
    
    const byPackage = await QuoteRequest.aggregate([
      {
        $group: {
          _id: '$package',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' },
          totalValue: { $sum: '$estimatedCost' }
        }
      }
    ]);
    
    const byStatus = await QuoteRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentQuotes = await QuoteRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email package area estimatedCost createdAt');

    res.status(200).json({
      success: true,
      data: {
        total: totalQuotes,
        byPackage,
        byStatus,
        recent: recentQuotes
      }
    });

  } catch (error) {
    logger.error('Error fetching quote stats:', error);
    next(error);
  }
};

module.exports = {
  submitQuoteRequest,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
  getQuoteStats
};
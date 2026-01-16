const ContactSubmission = require('../models/ContactSubmission');
const logger = require('../utils/logger');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Get IP address and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    // Create new submission
    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress,
      userAgent,
      status: 'new'
    });

    logger.success(`New contact submission from ${email} - ${name}`);

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting NK Divanshu Builders! Your message has been submitted successfully. We will contact you shortly.',
      data: {
        id: submission._id,
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        submittedAt: submission.createdAt
      }
    });

  } catch (error) {
    logger.error('Error submitting contact form:', error);
    next(error);
  }
};

// @desc    Get all contact submissions (Admin)
// @route   GET /api/contact
// @access  Private (implement auth if needed)
const getAllSubmissions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const submissions = await ContactSubmission.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await ContactSubmission.countDocuments(query);

    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: submissions
    });

  } catch (error) {
    logger.error('Error fetching submissions:', error);
    next(error);
  }
};

// @desc    Get single submission by ID
// @route   GET /api/contact/:id
// @access  Private
const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });

  } catch (error) {
    logger.error('Error fetching submission:', error);
    next(error);
  }
};

// @desc    Update submission status
// @route   PATCH /api/contact/:id/status
// @access  Private
const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    logger.info(`Submission ${req.params.id} status updated to ${status}`);

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: submission
    });

  } catch (error) {
    logger.error('Error updating submission status:', error);
    next(error);
  }
};

// @desc    Delete submission
// @route   DELETE /api/contact/:id
// @access  Private
const deleteSubmission = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    logger.info(`Submission ${req.params.id} deleted`);

    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting submission:', error);
    next(error);
  }
};

// @desc    Get submission statistics
// @route   GET /api/contact/stats
// @access  Private
const getSubmissionStats = async (req, res, next) => {
  try {
    const stats = await ContactSubmission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await ContactSubmission.countDocuments();
    const subjectStats = await ContactSubmission.aggregate([
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats,
        bySubject: subjectStats
      }
    });

  } catch (error) {
    logger.error('Error fetching stats:', error);
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  deleteSubmission,
  getSubmissionStats
};
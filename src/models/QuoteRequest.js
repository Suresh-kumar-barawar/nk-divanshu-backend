const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]*$/, 'Please enter a valid phone number']
    },
    package: {
      type: String,
      required: [true, 'Package selection is required'],
      enum: ['Silver', 'Gold', 'Platinum', 'Custom Package'],
      default: 'Silver'
    },
    area: {
      type: Number,
      required: [true, 'Construction area is required'],
      min: [100, 'Area must be at least 100 sq.ft'],
      max: [100000, 'Area cannot exceed 100,000 sq.ft']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    estimatedCost: {
      type: Number
    },
    status: {
      type: String,
      enum: ['pending', 'quoted', 'accepted', 'rejected', 'archived'],
      default: 'pending'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: 'quote_requests'
  }
);

// Indexes for performance
quoteRequestSchema.index({ email: 1 });
quoteRequestSchema.index({ package: 1 });
quoteRequestSchema.index({ status: 1 });
quoteRequestSchema.index({ createdAt: -1 });

// Virtual for quote summary
quoteRequestSchema.virtual('quoteSummary').get(function() {
  return `${this.name} - ${this.package} - ${this.area} sq.ft - ₹${this.estimatedCost?.toLocaleString('en-IN') || 'TBD'}`;
});

// Static method to calculate estimated cost
quoteRequestSchema.statics.calculateCost = function(packageType, area) {
  const rates = {
    'Silver': 1599,
    'Gold': 1999,
    'Platinum': 2700,
    'Custom Package': 2000
  };
  
  return rates[packageType] * area;
};

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);

module.exports = QuoteRequest;
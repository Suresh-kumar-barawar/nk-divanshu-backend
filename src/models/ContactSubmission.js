const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema(
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
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9+\-\s()]*$/, 'Please enter a valid phone number']
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: ['Consultation', 'Project', 'Partnership', 'Other'],
      default: 'Other'
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'archived'],
      default: 'new'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    source: {
      type: String,
      default: 'website'
    }
  },
  {
    timestamps: true,
    collection: 'contact_submissions'
  }
);

// Indexes for better query performance
contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ status: 1 });
contactSubmissionSchema.index({ createdAt: -1 });
contactSubmissionSchema.index({ subject: 1, status: 1 });

// Virtual for full contact info
contactSubmissionSchema.virtual('contactInfo').get(function() {
  return `${this.name} (${this.email}) - ${this.subject}`;
});

// Method to mark as read
contactSubmissionSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Static method to get submissions by status
contactSubmissionSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

module.exports = ContactSubmission;
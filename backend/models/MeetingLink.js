import mongoose from 'mongoose';

const meetingLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
meetingLinkSchema.index({ isActive: 1 });
meetingLinkSchema.index({ createdAt: -1 });

export default mongoose.model('MeetingLink', meetingLinkSchema); 
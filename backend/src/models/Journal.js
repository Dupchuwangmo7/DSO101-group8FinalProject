/**
 * Journal Model
 * Stores private journal entries for users
 * Each entry is private to the user
 */

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: 100
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    maxlength: 10000
  },
  mood: {
    type: String,
    enum: ['terrible', 'bad', 'okay', 'good', 'excellent'],
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
journalSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Journal', journalSchema);

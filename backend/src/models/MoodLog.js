/**
 * Mood Log Model
 * Tracks user mood entries for analytics
 * Helps users understand their mental health patterns
 */

const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    enum: ['terrible', 'bad', 'okay', 'good', 'excellent'],
    required: [true, 'Please provide a mood']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  note: {
    type: String,
    maxlength: 500
  },
  triggers: {
    type: [String],
    default: []
  },
  activities: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient mood tracking queries
moodLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('MoodLog', moodLogSchema);

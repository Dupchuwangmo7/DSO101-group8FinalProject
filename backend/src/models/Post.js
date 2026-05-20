/**
 * Post Model
 * Defines schema for anonymous community posts
 * Users can share experiences anonymously
 */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: 100
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    maxlength: 5000
  },
  category: {
    type: String,
    enum: ['anxiety', 'depression', 'stress', 'motivation', 'general'],
    default: 'general'
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'flagged', 'removed'],
    default: 'active'
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

// Index for faster queries
postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ author: 1 });

module.exports = mongoose.model('Post', postSchema);

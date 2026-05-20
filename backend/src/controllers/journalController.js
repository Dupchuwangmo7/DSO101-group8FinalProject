/**
 * Journal Controller
 * Handles private journal entry operations
 */

const Journal = require('../models/Journal');

// Create journal entry
exports.createJournal = async (req, res, next) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.validatedData;

    const journal = await Journal.create({
      user: req.user.userId,
      title,
      content,
      mood,
      tags: tags || [],
      isPrivate: isPrivate !== undefined ? isPrivate : true
    });

    res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      journal
    });
  } catch (error) {
    next(error);
  }
};

// Get user's journal entries
exports.getJournals = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const journals = await Journal.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Journal.countDocuments({ user: req.user.userId });

    res.status(200).json({
      success: true,
      journals,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single journal entry
exports.getJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    if (journal.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this entry'
      });
    }

    res.status(200).json({
      success: true,
      journal
    });
  } catch (error) {
    next(error);
  }
};

// Update journal entry
exports.updateJournal = async (req, res, next) => {
  try {
    let journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    if (journal.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this entry'
      });
    }

    journal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Journal entry updated successfully',
      journal
    });
  } catch (error) {
    next(error);
  }
};

// Delete journal entry
exports.deleteJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    if (journal.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this entry'
      });
    }

    await Journal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

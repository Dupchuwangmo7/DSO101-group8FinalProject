/**
 * Mood Tracker Controller
 * Handles mood logging and analytics
 */

const MoodLog = require('../models/MoodLog');

// Add mood entry
exports.addMood = async (req, res, next) => {
  try {
    const { mood, intensity, note, triggers, activities } = req.validatedData;

    const moodLog = await MoodLog.create({
      user: req.user.userId,
      mood,
      intensity,
      note,
      triggers: triggers || [],
      activities: activities || []
    });

    res.status(201).json({
      success: true,
      message: 'Mood logged successfully',
      moodLog
    });
  } catch (error) {
    next(error);
  }
};

// Get mood history
exports.getMoodHistory = async (req, res, next) => {
  try {
    const { days = 7, page = 1, limit = 10 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const moodLogs = await MoodLog.find({
      user: req.user.userId,
      createdAt: { $gte: startDate }
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MoodLog.countDocuments({
      user: req.user.userId,
      createdAt: { $gte: startDate }
    });

    res.status(200).json({
      success: true,
      moodLogs,
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

// Get mood statistics
exports.getMoodStats = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await MoodLog.aggregate([
      {
        $match: {
          user: req.user.userId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    next(error);
  }
};

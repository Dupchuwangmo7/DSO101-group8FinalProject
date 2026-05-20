/**
 * Admin Controller
 * Handles administrative functions like user management and moderation
 */

const User = require('../models/User');
const Post = require('../models/Post');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
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

// Delete post (admin only)
exports.deletePostAdmin = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted by admin'
    });
  } catch (error) {
    next(error);
  }
};

// Flag post for review
exports.flagPost = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: 'flagged' },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post flagged for review',
      post
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments({ status: 'active' });
    const flaggedPosts = await Post.countDocuments({ status: 'flagged' });
    
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPosts,
        flaggedPosts,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Input Validation Middleware
 * Validates incoming request data using Joi
 * Security: Prevents invalid data from reaching controllers
 */

const Joi = require('joi');

// Validation schemas
const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  createPost: Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(5000).required(),
    category: Joi.string().valid('anxiety', 'depression', 'stress', 'motivation', 'general'),
    isAnonymous: Joi.boolean()
  }),

  addMood: Joi.object({
    mood: Joi.string().valid('terrible', 'bad', 'okay', 'good', 'excellent').required(),
    intensity: Joi.number().min(1).max(10).required(),
    note: Joi.string().max(500),
    triggers: Joi.array().items(Joi.string()),
    activities: Joi.array().items(Joi.string())
  }),

  createJournal: Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(10000).required(),
    mood: Joi.string().valid('terrible', 'bad', 'okay', 'good', 'excellent').required(),
    tags: Joi.array().items(Joi.string()).default([]),
    isPrivate: Joi.boolean().default(true)
  })
};

// Validation middleware factory
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(400).json({ message: 'Invalid validation schema' });
    }

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: messages 
      });
    }

    req.validatedData = value;
    next();
  };
};

module.exports = { validate };

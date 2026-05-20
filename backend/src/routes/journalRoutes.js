/**
 * Journal Routes
 * Defines endpoints for private journal entries
 */

const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const { verifyToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// All journal routes are protected
router.post('/', verifyToken, validate('createJournal'), journalController.createJournal);
router.get('/', verifyToken, journalController.getJournals);
router.get('/:id', verifyToken, journalController.getJournal);
router.put('/:id', verifyToken, journalController.updateJournal);
router.delete('/:id', verifyToken, journalController.deleteJournal);

module.exports = router;

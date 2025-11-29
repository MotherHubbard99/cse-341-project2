const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const testConnection = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const collections = await db.listCollections().toArray();
    res.json({ connected: true, collections });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
};

// GET all contacts
router.get('/', contactController.getAll);

// GET single contact by ID
router.get('/:id', contactController.getSingle);

// POST create contact
router.post('/', isAuthenticated, contactController.createContact);

// PUT update contact
router.put('/:id', isAuthenticated, contactController.updateContact);

// DELETE contact
router.delete('/:id', isAuthenticated, contactController.deleteContact);

router.get('/test-connection', testConnection);


module.exports = router;
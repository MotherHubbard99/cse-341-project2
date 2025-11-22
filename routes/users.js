const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

// GET all users
router.get('/', usersController.getAll);

// GET single user by ID
router.get('/:id', usersController.getSingle);

// POST create user
router.post('/', validation.saveContact, usersController.createUser);

// PUT update user
router.put('/:id', validation.saveContact, usersController.updateUser);

// DELETE user
router.delete('/:id', usersController.deleteUser);

const testConnection = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const collections = await db.listCollections().toArray();
    res.json({ connected: true, collections });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
};

router.get('/test-connection', testConnection);


module.exports = router;
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

module.exports = router;
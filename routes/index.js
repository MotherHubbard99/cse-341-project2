const express = require('express');
const router = express.Router();

// Users routes
const usersRoutes = require('./users');
router.use('/users', usersRoutes);

// Contact routes
const contactRoutes = require('./contact');
router.use('/contact', contactRoutes);

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
router.get('/', (req, res) => {
  res.send("This is the start to CSE-341: Project 2");
});

module.exports = router;
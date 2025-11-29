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
const passport = require('passport');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
router.get('/', (req, res) => {
  res.send("This is the start to CSE-341: Project 2");
});

// login route
router.get('/login', passport.authenticate('github'), (req, res) => { });
//logout route
router.get('/logout', function(req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    //clear the session completely
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});


module.exports = router;
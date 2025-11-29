require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/index');
const db = require('./data/database');

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
//app.use('/', routes);

app 
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
  //This is the basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  // allow passport to use "express-sessions"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*'}))
  .use("/", require("./routes/index.js"));

  //log values before initializing passport strategies
  console.log("Client ID:", process.env.GITHUB_CLIENT_ID);
  console.log("Client Secret:", process.env.GITHUB_CLIENT_SECRET);
  console.log("Callback URL:", process.env.GITHUB_CALLBACK_URL);

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // In a real application, you would save the user info to your database here
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

//add endpoints for auth
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')
});

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });
  
// Error handling
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Initialize DB and start server
db.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Server running on http://localhost:${port}`);
    });
  }
});
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');
const db = require('./data/database');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/', routes);

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
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable guard-for-in */
const express = require('express');
const app = express();
const db = require('./components/db');
var cors = require('cors');

require('log-timestamp')(function() {
  return '[' + new Date().toISOString() + '] %s';
});

const apiRoutes = require('./routes/api');
const momentonRoutes = require('./routes/momenton');
const rootRoutes = require('./routes/root');

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);
app.use('/momenton', momentonRoutes);
app.use(rootRoutes);

db.connect().then(() => {
  db.initializeDatabase();
});

module.exports = app;

const chalk = require('./chalk.config');
const compression = require('compression');
const { resolve } = require('path');
const ip = require('ip');
const express = require('express');

// Init App
const app = express();
const publicPath = '/';
const outputPath = resolve(process.cwd(), 'build');

// compression middleware compresses your server responses which makes them smaller (applies also to assets).
app.use(compression());
app.use(publicPath, express.static(outputPath));

app.get('/', (req, res) => {
  const url = `http://${req.hostname}:3010/home`;
  console.log(chalk.chalkProcessing('Request redirected to /home'));
  return res.redirect(301, url);
});

app.get('/home', (req, res) => {
  return res.sendFile(resolve(outputPath, 'index.html'));
});

// Start your app.
app.listen('3010', async err => {
  if (err) {
    console.log(chalk.chalkError(err));
  } else {
    console.log(
      chalk.chalkSuccess(
        `Momenton Client application started listening on \n` +
          `localhost: http://localhost:3010/home \n` +
          `LAN: http://${ip.address()}:3010/home \n`
      )
    );
  }
});

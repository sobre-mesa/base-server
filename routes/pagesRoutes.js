const express = require('express');

const pagesRouter = express.Router();

var path = require('path');

pagesRouter
  .route('/index').get((req, res) => res.sendFile(path.resolve(`${__dirname}/../public/index.html`)))

module.exports = pagesRouter;


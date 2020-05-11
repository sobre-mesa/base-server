const express = require('express');
const morgan = require('morgan');

const pagesRouter = require('./routes/pagesRoutes.js');
const plannerRouter = require('./routes/plannerRoutes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', pagesRouter, plannerRouter);
app.use(express.static(`${__dirname}/public`))

module.exports = app;

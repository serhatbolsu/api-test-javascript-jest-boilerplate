'use strict';

const express = require('express');
const vegetable = require('./routes/vegetable.js');

const app = express();
app.use(express.json());
app.use('/vegetables', vegetable);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Test Vegetable Server started on ${PORT}!`));

module.exports = app;

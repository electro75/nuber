const mongoose = require('mongoose');
const express = require('express');
const app = express();

const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nuber');

app.use(express.json());         // app.use call should always be called before routes call.
routes(app);                     // body-parser middleware is now inbuilt in express.

module.exports = app;
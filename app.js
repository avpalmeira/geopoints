const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GeoController = require('./app/controllers/GeoController');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/geobatches', GeoController.getBatches);

app.get('/geobatches/:id', GeoController.getLocationsByBatch);

app.post('/importdata', GeoController.importLocationBatch);

module.exports = app;


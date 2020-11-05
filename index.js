const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const getCsv = require('get-csv');

const { GeoLocation, GeoLocationBatch } = require('./app/models');

GeoLocationBatch.hasMany(GeoLocation, {
  foreignKey: 'geoLocationBatchId'
});
GeoLocation.belongsTo(GeoLocationBatch);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/geobatches', async (req, res) => {
  const allBatches = await GeoLocationBatch.findAll();
  const response = [];

  allBatches.forEach((batch, index) => {
    response[index] = {
      id: batch.dataValues.id,
      name: batch.dataValues.name,
      filePath: batch.dataValues.filePath,
    };
  });
  res.send(response);
});

app.get('/geobatches/:id', async (req, res) => {
  const batchId = req.params.id;
  res.send(batchId);
});

app.post('/importdata', async (req, res) => {
  // todo: check if path is valid
  const filePath = req.body.filePath;
  const name = req.body.name;

  const newBatch = { name, filePath };
  const newLocationBatch = await GeoLocationBatch.create( newBatch );

  // read data inside csv file
  // todo: move to separate method
  getCsv(filePath).then(rows => {
    rows.forEach(async (point) => {
      console.log(point);
      // save data to database
      await newLocationBatch.createGeoLocation({
        geoLocation: {
          type: 'Point',
          coordinates: [point['Latitude'], point['Longitude']],
        }
      });
    });
  });
  res.send(newLocationBatch);
});

const server = http.Server(app);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


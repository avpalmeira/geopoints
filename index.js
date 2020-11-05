const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const neatCsv = require('neat-csv');
const fs = require('fs');

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

app.post('/import-data', async (req, res) => {
  // todo: check if path is valid
  const filePath = req.body.filePath;
  const name = req.body.name;

  const newBatch = { name, filePath };
  const newLocationBatch = await GeoLocationBatch.create( newBatch );

  // read data inside csv file
  // todo: move to separate method
  await fs.readFile(filePath, async (err, content) => {
    if (err) {
      console.error(err);
      return;
    }
    neatCsv(content).then((data) => {
      data.forEach(async (point) => {
        // save data to database
        await newLocationBatch.createGeoLocation({
          geoLocation: {
            type: 'Point',
            coordinates: [point['Latitude'], point['Longitude']],
          }
        });
      });
    });
  });

  res.send(newLocationBatch);
});

const server = http.Server(app);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});


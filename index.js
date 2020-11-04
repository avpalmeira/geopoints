const express = require('express');
const bodyParser = require('body-parser');

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

// just for testing
const runCreateBatch = async () => {
  const newBatch = { name: 'Testing New Batch', filePath: '/path/to/file.csv' };
  const NewLocationBatch = await GeoLocationBatch.create( newBatch );
  console.log("New Batch created!");
  const point1 = { type: 'Point', coordinates: [100.0, 0.0] };
  const point2 = { type: 'Point', coordinates: [105.0, 0.0] };
  await NewLocationBatch.createGeoLocation({ geoLocation: point1} );
  console.log("Point 1 created inside batch!");
  await NewLocationBatch.createGeoLocation({ geoLocation: point2} );
  console.log("Point 2 created inside batch!");
  console.log("Number of points in batch:");
  console.log(await NewLocationBatch.countGeoLocations());
}

runCreateBatch();

// app.listen(3000);


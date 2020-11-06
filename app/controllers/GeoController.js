const getCsv = require('get-csv');
const { GeoLocation, GeoLocationBatch } = require('../models');

GeoLocationBatch.hasMany(GeoLocation, {
  foreignKey: 'geoLocationBatchId'
});

class GeoController {

  async getBatches(req, res) {
    const allBatches = await GeoLocationBatch.findAll();
    const response = [];

    if (allBatches !== []) {
      allBatches.forEach((batch, index) => {
        response[index] = {
          id: batch.dataValues.id,
          name: batch.dataValues.name,
          filePath: batch.dataValues.filePath,
        };
      });
    }
    res.send(response);
  }

  async getLocationsByBatch(req, res) {
    const batchId = req.params.id;
    const geoBatch = await GeoLocationBatch.findByPk(batchId);
    const response = [];

    if (geoBatch != null) {
      const geoLocations = await geoBatch.getGeoLocations();

      if (geoLocations !== []) {
        geoLocations.forEach((geoLocation, index) => {
          response[index] = {
            coordinates: geoLocation.dataValues.geoLocation.coordinates,
          };
        });
      }
    }
    res.send(response);
  }

  async importLocationBatch(req, res) {
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
  }
}

module.exports = new GeoController();


const GeoLocationBatch = require('./GeoLocationBatch');

module.exports = (sequelize, DataTypes) => {
  const GeoLocation = sequelize.define('GeoLocation', {
    geoLocation: DataTypes.GEOMETRY('POINT'),
  });

  return GeoLocation;
}

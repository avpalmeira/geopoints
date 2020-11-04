const GeoLocation = require('./GeoLocation');

module.exports = (sequelize, DataTypes) => {
  const GeoLocationBatch = sequelize.define('GeoLocationBatch', {
    name: DataTypes.STRING,
    filePath: DataTypes.STRING,
  });

  return GeoLocationBatch;
}

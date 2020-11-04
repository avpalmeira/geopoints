module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GeoLocations', [{
      geoLocation: Sequelize.fn('ST_GeomFromText', 'POINT(39.807222 -76.984722)'),
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('GeoLocations', null, {});
  }
};

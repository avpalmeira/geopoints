module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('GeoLocationBatches', [{
      name: 'Demo Geo Location Batch',
      filePath: 'example.com/geo-locations/batch1'
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('GeoLocationBatches', null, {});
  }
};

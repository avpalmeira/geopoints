module.exports = {
  up: (queryInterface, DataTypes) => {
     return queryInterface.createTable('GeoLocations', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: DataTypes.INTEGER,
       },
       geoLocation: {
         allowNull: false,
         type: DataTypes.GEOMETRY('POINT'),
       },
     });
  },

  down: (queryInterface) => {
     return queryInterface.dropTable('GeoLocations');
  }
};

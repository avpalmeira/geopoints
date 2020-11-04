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
       createdAt: {
         allowNull: false,
         type: DataTypes.DATE,
       },
       updatedAt: {
         allowNull: false,
         type: DataTypes.DATE,
       },
       geoLocationBatchId: {
         allowNull: true,
         type: DataTypes.INTEGER,
         references: {
           model: {
             tableName: 'GeoLocationBatches',
           },
           key: 'id',
         },
       },
     });
  },

  down: (queryInterface) => {
     return queryInterface.dropTable('GeoLocations');
  }
};

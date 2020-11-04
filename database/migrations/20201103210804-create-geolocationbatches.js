module.exports = {
  up: (queryInterface, DataTypes) => {
     return queryInterface.createTable('GeoLocationBatches', {
       id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: DataTypes.INTEGER,
       },
       name: {
         allowNull: false,
         type: DataTypes.STRING,
       },
       filePath: {
         allowNull: false,
         type: DataTypes.STRING,
         unique: true,
       },
			 createdAt: {
				 allowNull: false,
				 type: DataTypes.DATE,
			 },
			 updatedAt: {
				 allowNull: false,
				 type: DataTypes.DATE,
			 },
     });
  },

  down: (queryInterface) => {
     return queryInterface.dropTable('GeoLocationBatches');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true, // Si deseas que el campo sea opcional
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'imageUrl');
  }
};

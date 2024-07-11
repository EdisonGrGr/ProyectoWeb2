'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true, // o false dependiendo de tus requisitos
      references: {
        model: 'Categories', // nombre de la tabla de categorías
        key: 'id' // nombre de la clave primaria en la tabla de categorías
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // o 'CASCADE' o 'RESTRICT' dependiendo de tus requisitos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'categoryId');
  }
};



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

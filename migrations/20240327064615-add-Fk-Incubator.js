'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Startups', 'IncubatorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Incubators',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Startups', 'IncubatorId');
  }
};

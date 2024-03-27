'use strict';
const fs = require('fs').promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data =  JSON.parse(await fs.readFile('./data/incubator.json', 'utf-8'))
    data = data.map(el => {
      delete el.id  
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Incubators', data)
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Incubators', null);
  }
};
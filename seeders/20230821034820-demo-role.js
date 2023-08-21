'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     await queryInterface.bulkInsert('People', [{
       name: 'John Doe',
       isBetaMember: false
     }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

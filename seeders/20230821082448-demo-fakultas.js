'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fakultas', [{
      name: 'FK',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'FILKOM',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FEB',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FIA',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FH',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'FMIPA',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'FP',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'FPIK',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'FTP',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fakultas', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

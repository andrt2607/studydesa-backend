'use strict';
const bcrypt = require('bcrypt')
const {v4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10)
    const adminId = await queryInterface.rawSelect('Roles', {
      where: {
        name: 'admin'
      }
    }, ['id'])
    
    console.log('ini id admin di seed user admin', adminId)
    
    await queryInterface.bulkInsert('Users', [{
        //  name: 'SuperAdmin',
         username: 'admin',
         uuid_mhs: v4(),
         email: 'admin@mail.com',
         password: bcrypt.hashSync('123', salt),
         phone: '08123456789',
         role_id: adminId,
         createdAt: new Date(),
         updatedAt: new Date(),
      }], {});
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

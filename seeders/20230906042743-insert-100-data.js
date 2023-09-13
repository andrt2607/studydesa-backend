'use strict';
const bcrypt = require('bcrypt')
const {v4} = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10)
    const idRoleUser = await queryInterface.rawSelect('Roles', {
      where: {
        name: 'user'
      }
    }, ['id'])
    
    const data = []
    // console.log('ini id admin di seed user admin', adminId)
    for (let i = 1; i <= 100; i++) {
      data.push({
        //  name: 'SuperAdmin',
         username: `seeder${i}`,
         uuid_mhs: v4(),
         email: 'seeder@mail.com',
         password: bcrypt.hashSync('123', salt),
         phone: '08123456789',
         role_id: idRoleUser,
         createdAt: new Date(),
         updatedAt: new Date(),
      })
      
    }
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

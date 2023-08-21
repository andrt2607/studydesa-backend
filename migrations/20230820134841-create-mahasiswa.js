"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Mahasiswas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid_mhs: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      birthday_date: {
        type: Sequelize.DATE,
      },
      fakultas_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Fakultas",
          key: "id",
        },
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Mahasiswas");
  },
};

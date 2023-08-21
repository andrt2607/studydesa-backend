"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Desas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      problem: {
        type: Sequelize.STRING,
      },
      lat_des: {
        type: Sequelize.STRING,
      },
      long_des: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      contact_person: {
        type: Sequelize.STRING,
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Mahasiswas",
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
    await queryInterface.dropTable("Desas");
  },
};

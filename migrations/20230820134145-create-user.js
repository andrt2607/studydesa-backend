"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
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
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6]
        }
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: true,
          len: [12]
        }
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
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
    await queryInterface.dropTable("Users");
  },
};

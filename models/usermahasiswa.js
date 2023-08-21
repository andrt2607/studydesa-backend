"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserMahasiswa.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      UserMahasiswa.belongsTo(models.Mahasiswa, {
        foreignKey: "mahasiswa_id",
        targetKey: "id",
      });
    }
  }
  UserMahasiswa.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      mahasiswa_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserMahasiswa",
    }
  );
  return UserMahasiswa;
};

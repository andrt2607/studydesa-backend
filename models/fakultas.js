"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fakultas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fakultas.hasMany(models.Mahasiswa, { foreignKey: "fakultas_id" });
    }
  }
  Fakultas.init(
    {
      name: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Fakultas",
    }
  );
  return Fakultas;
};

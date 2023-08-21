"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Desa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Desa.belongsTo(models.Mahasiswa, {
        foreignKey: "mahasiswa_id",
        targetKey: "id",
      });
    }
  }
  Desa.init(
    {
      name: DataTypes.STRING,
      uid: DataTypes.UUID,
      problem: DataTypes.STRING,
      lat_des: DataTypes.STRING,
      long_des: DataTypes.STRING,
      photo: DataTypes.STRING,
      contact_person: DataTypes.STRING,
      mahasiswa_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Desa",
    }
  );
  return Desa;
};

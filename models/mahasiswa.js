"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswa.hasMany(models.UserMahasiswa, { foreignKey: "mahasiswa_id" });
      Mahasiswa.belongsTo(models.Fakultas, {
        foreignKey: "fakultas_id",
        targetKey: "id",
      });
      
      Mahasiswa.hasMany(models.Desa, { foreignKey: "mahasiswa_id" });
    }
  }
  Mahasiswa.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      uuid_mhs: DataTypes.UUID,
      birthday_date: DataTypes.DATE,
      fakultas_id: DataTypes.INTEGER,
      
    },
    {
      sequelize,
      modelName: "Mahasiswa",
    }
  );
  return Mahasiswa;
};

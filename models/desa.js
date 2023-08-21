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
      lat_des: {
        type: DataTypes.STRING,
      },
      long_des: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      contact_person: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
          len: [12]
        }
      },
      mahasiswa_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Desa",
    }
  );
  return Desa;
};

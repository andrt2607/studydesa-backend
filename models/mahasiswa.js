const { db } = require("../databases/mysql");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Mahasiswa extends Model {}

Mahasiswa.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      // defaultValue: Sequelize.INTE,
      allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthday_date: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    fakultas_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "mahasiswa",
    tableName: "mahasiswa",
    timestamps: true,
  }
);

Mahasiswa.sync().then(
  (res) => console.log("success make table mahasiswa")
).catch(
  (err) => console.log("failed make table mahasiswa : ", err)
)

module.exports = { Mahasiswa };

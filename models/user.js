const { db } = require("../databases/mysql");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      // defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [12],
      },
    },
  },
  {
    sequelize: db,
    modelName: "user",
    tableName: "user",
    timestamps: true,
  }
);

User.sync().then(
  (res) => console.log("success make table user")
).catch(
  (err) => console.log("failed make table user : ", err)
)

module.exports = { User };

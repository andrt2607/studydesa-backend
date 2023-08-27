"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserMahasiswa, { foreignKey: "user_id" });
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: "id",
      });
    }
  }
  User.init(
    {
      id: 
      {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      uuid_mhs: DataTypes.UUID,
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5,6]
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10,12]
        }
      },
      role_id: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
          console.log("ini password yg di bcrypt : ", user.password);
          if (!user.role_id) {
            const roleUser = await sequelize.models.Role.findOne({
              where: { name: "user" },
            });
            user.role_id = roleUser.id;
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.CheckPassword = async (requestPassword, dbPassword) => {
    return await bcrypt.compareSync(requestPassword, dbPassword);
  };
  return User;
};

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
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      uid_mhs: DataTypes.UUID,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
          console.log("ini password yg di bcrypt : ", user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.CheckPassword = async (requestPassword, dbPassword) => {
    return await bcrypt.compare(requestPassword, dbPassword);
  };
  return User;
};

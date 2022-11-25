const Sequelize = require("sequelize");
const db = require("../config/db");

class User extends Sequelize.Model {}

User.init(
  {
    username: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    favoritos: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
  },
  { sequelize: db, modelname: "users" }
);

module.exports = User;

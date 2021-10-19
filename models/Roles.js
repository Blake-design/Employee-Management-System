const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Roles extends Model {}

Roles.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.STRING,
    },
    dept_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Roles",
  }
);

module.exports = Roles;

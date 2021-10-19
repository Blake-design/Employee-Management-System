const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employees extends Model {}

Employees.init(
  {
    em_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    em_role_id: {
      type: DataTypes.STRING,
    },
    manager: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Employees",
  }
);

module.exports = Employees;

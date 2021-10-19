const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Departments extends Model {}

Departments.init(
  {
    dept_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dept_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Departments",
  }
);

module.exports = Departments;

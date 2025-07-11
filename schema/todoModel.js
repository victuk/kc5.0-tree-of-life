const sequelize = require("./connect");
const {DataTypes} = require("sequelize");

const todoModel = sequelize.define(
    "Todos",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = todoModel;
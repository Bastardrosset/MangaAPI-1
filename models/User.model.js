const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const { v4: uuidv4 } = require('uuid');

class User extends Model{}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['0', '1', '2']]
        },
        defaultValue: '0'
    }
}, {
    sequelize,
    modelName: "table_users"
})

module.exports = User;
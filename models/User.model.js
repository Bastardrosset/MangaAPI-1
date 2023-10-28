const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class User extends Model{}

User.init({
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
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // role: {
    //     type: DataTypes.ENUM('user', 'admin', 'administrateur'),
    //     allowNull: false,
    //     defaultValue: 'user' // Set a default value if needed
    // }
}, {
    sequelize,
    modelName: "user"
})

module.exports = User;
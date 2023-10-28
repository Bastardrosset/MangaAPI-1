const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("manga-db", 'user', 'pass', {
    dialect: 'sqlite',
    host: './db.sqlite'
})

module.exports = sequelize;
const { Sequelize }  = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: './chamadas.db'
})

module.exports = sequelize

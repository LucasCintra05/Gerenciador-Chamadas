const sequelize = require('../config/database')
const { DataTypes } = require('sequelize')

const Chamados = sequelize.define( 'Chamados', {
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    prioridade:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = Chamados
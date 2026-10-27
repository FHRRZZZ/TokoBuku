const { DataTypes } = require("sequelize");
const { sequalize } = require('../config/db');

const Supliers = sequalize.define('Suplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    number_phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Supliers',
    timeStamps: true,
})

module.exports = Supliers;
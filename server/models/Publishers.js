const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Publishers = sequelize.define('Publisher', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    }
},{
    tableName: 'publishers',
    timestamps: true,
});

module.exports = Publishers;
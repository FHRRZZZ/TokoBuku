const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Orders = require("./Orders");

const Payments = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM('bank_transfer','Qris'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
        defaultValue: 'pending',
        allowNull: false
    }},{
    tableName: 'Payments',
    timestamps: true,
});

Orders.hasMany(Payments, { foreignKey: 'orderId' });
Payments.belongsTo(Orders, { foreignKey: 'orderId', as: 'order' });

module.exports = Payments;
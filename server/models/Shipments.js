const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Orders = require("./Orders");

const Shipments = sequelize.define('Shipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kurir: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    trackingNumber: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending','packed','shipped', 'delivered', 'returned'),
        defaultValue: 'pending',
        allowNull: false
    },
    shippedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Shipments',
    timestamps: true
});

Orders.hasMany(Shipments, { foreignKey: 'orderId' });
Shipments.belongsTo(Orders, { foreignKey: 'orderId', as: 'order' });

module.exports = Shipments;
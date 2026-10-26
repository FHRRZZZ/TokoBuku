const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Carts = require("./Carts");

const Orders = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
    }
},{
    tableName: 'Orders',
    timestamps: true,
});

Carts.hasMany(Orders, { foreignKey: 'cartId' });
Orders.belongsTo(Carts, { foreignKey: 'cartId', as: 'cart' });

module.exports = Orders;

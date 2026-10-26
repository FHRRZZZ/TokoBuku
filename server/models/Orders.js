const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Orders = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    shippingName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    shippingPhone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
    }
},{
    tableName: 'Orders',
    timestamps: true,
});

User.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Orders;

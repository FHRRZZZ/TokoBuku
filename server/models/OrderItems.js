const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Books = require("./Books");
const Orders = require("./Orders");

const OrderItems = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookTitle: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: function() {
            return this.quantity * this.unitPrice;
        }
    }
}, {
    tableName: 'OrderItems',
    timestamps: true
});

Books.hasMany(OrderItems, { foreignKey: 'bookId' });
OrderItems.belongsTo(Books, { foreignKey: 'bookId', as: 'book' });
Orders.hasMany(OrderItems, { foreignKey: 'orderId' });
OrderItems.belongsTo(Orders, { foreignKey: 'orderId', as: 'order' });

module.exports = OrderItems;
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Carts = require("./Carts");
const Books = require("./Books");

const CartItems = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'CartItems',
    timestamps: true
});

Carts.hasMany(CartItems, { foreignKey: 'cartId' });
CartItems.belongsTo(Carts, { foreignKey: 'cartId', as: 'cart' });
Books.hasMany(CartItems, { foreignKey: 'bookId' });
CartItems.belongsTo(Books, { foreignKey: 'bookId', as: 'book' });

module.exports = CartItems;
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Books = require("./Books");

const StockMovements = sequelize.define('StockMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movementType: {
        type: DataTypes.ENUM('purchase in', 'sale out', 'adjustment in', 'adjustment out', 'return in', 'return out'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stockBefore: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stockAfter: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'StockMovements',
    timestamps: true
});

Books.hasMany(StockMovements, { foreignKey: 'bookId' });
StockMovements.belongsTo(Books, { foreignKey: 'bookId', as: 'book' });

module.exports = StockMovements;
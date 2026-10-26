const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Purchases = require("./Purchases");
const Books = require("./Books");

const PurchaseItems = sequelize.define('PurchaseItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchaseId: {
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
    },
    unitCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: function() {
            return this.quantity * this.unitCost;
    }
    }
}, {
    tableName: 'PurchaseItems',
    timestamps: true
});

Purchases.hasMany(PurchaseItems, { foreignKey: 'purchaseId' });
PurchaseItems.belongsTo(Purchases, { foreignKey: 'purchaseId', as: 'purchase' });

Books.hasMany(PurchaseItems, { foreignKey: 'bookId' });
PurchaseItems.belongsTo(Books, { foreignKey: 'bookId', as: 'book' });

module.exports = PurchaseItems;
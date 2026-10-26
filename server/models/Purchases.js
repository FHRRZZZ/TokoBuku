const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Suppliers = require("./Suppliers");

const Purchases = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'ordered','received', 'cancelled'),
        defaultValue: 'draft',
        allowNull: false
    }

},{
    tableName: 'Purchases',
    timestamps: true,
});

Suppliers.hasMany(Purchases, { foreignKey: 'supplierId' });
Purchases.belongsTo(Suppliers, { foreignKey: 'supplierId', as: 'supplier' });

module.exports = Purchases;

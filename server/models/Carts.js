const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Books = require("./Books");

const Carts = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'Carts',
    timestamps: true,}
);

User.hasMany(Carts, { foreignKey: 'userId' });
Carts.belongsTo(User, {foreignKey: 'userId', as: 'user'});

module.exports = Carts;
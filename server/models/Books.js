const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Categories = require("./Categories");
const Publishers = require("./Publishers");

const Books = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publisherId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    isbn: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    cover_image: {
        type: DataTypes.JSON,
        allowNull: false
    },
    publication_year:{
        type: DataTypes.STRING(4),
        allowNull: false
    }
},{
    tableName: 'Books',
    timestamps: true,
})

Categories.hasMany(Books, { foreignKey: 'categoryId' });
Books.belongsTo(Categories, {foreignKey: 'categoryId', as: 'category'});
Publishers.hasMany(Books, { foreignKey: 'publisherId' });
Books.belongsTo(Publishers, {foreignKey: 'publisherId', as: 'publisher'});

module.exports = Books;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //categoryId  (relacion uno a muchos ver archivo index carpeta models)
    
});

module.exports = Product;
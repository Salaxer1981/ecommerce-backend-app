const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
   timestamps:false // Esta linea no permite que se agregen la fecha de creacion del POST
});

module.exports = Category;
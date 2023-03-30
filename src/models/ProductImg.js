const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');


const ProductImg = sequelize.define('productImg', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //ProductId
  }, {
    timestamps: false
  });
  
  module.exports = ProductImg;

// const ProductImg = sequelize.define('productImg', {
//     url: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     filename: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

// }, {
//     timestamps: false
// });

// module.exports = ProductImg;
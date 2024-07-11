

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, 
});

module.exports = Category;

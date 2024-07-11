const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Category = require('./category');
const Product = require('./product')(sequelize, Sequelize);
const { Cart, CartItem } = require('./cart')(sequelize, Sequelize);


Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });


Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

const db = {
    Sequelize,
    sequelize,
    Category,
    Product,
    Cart,
    CartItem,
};

module.exports = db;

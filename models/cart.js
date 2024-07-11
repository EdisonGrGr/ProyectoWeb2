const { DataTypes } = require('sequelize');
const Product = require('./product'); 

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
    });

    const CartItem = sequelize.define('CartItem', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });

    
    Cart.belongsToMany(sequelize.models.Product, { through: CartItem });
    sequelize.models.Product.belongsToMany(Cart, { through: CartItem });

    return { Cart, CartItem };
};

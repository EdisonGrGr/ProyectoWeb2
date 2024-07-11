const { Cart, CartItem, Product } = require('../models');


exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        let cart = await Cart.findOne({ where: { id: 1 } });

        if (!cart) {
            cart = await Cart.create({ id: 1 });
        }

        let cartItem = await CartItem.findOne({
            where: { CartId: cart.id, ProductId: productId }
        });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({ CartId: cart.id, ProductId: productId });
        }

        res.redirect('/');
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error al agregar al carrito');
    }
};


exports.viewCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { id: 1 },
            include: [{
                model: Product,
                through: { model: CartItem },
                attributes: ['id', 'name', 'price', 'description']
            }]
        });

        if (!cart) {
            return res.render('cart/index', { products: [] });
        }

        res.render('cart/index', { products: cart.Products });
    } catch (error) {
        console.error('Error al ver el carrito:', error);
        res.status(500).send('Error al ver el carrito');
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ where: { id: 1 } });

        if (cart) {
            const cartItem = await CartItem.findOne({
                where: { CartId: cart.id, ProductId: productId }
            });

            if (cartItem) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    await cartItem.save();
                } else {
                    await cartItem.destroy();
                }
            }
        }

        res.redirect('/cart');
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).send('Error al eliminar del carrito');
    }
};

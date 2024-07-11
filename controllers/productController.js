

const Product = require('../models').Product; 
const Category = require('../models').Category;


exports.newProductForm = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('products/create', { categories });
    } catch (err) {
        console.error('Error mostrando formulario de creación:', err);
        res.status(500).send('Error mostrando formulario de creación');
    }
};


exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl, categoryId } = req.body;

        
        const newProduct = await Product.create({ name, price, description, imageUrl, categoryId });

        
        res.redirect('/products');
    } catch (err) {
        console.error('Error creando producto:', err);
        
        res.status(500).send(`Error creando producto: ${err.message}`);
    }
};


exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: Category 
        });
        res.render('products/index', { products });
    } catch (err) {
        console.error('Error al listar productos:', err);
        res.status(500).send('Error al listar productos');
    }
};


exports.editProductForm = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId, { include: Category });
      const categories = await Category.findAll();
      res.render('products/edit', { product, categories });
  } catch (err) {
      console.error('Error mostrando formulario de edición:', err);
      res.status(500).send('Error mostrando formulario de edición');
  }
};


exports.updateProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const { name, price, description, imageUrl, categoryId } = req.body;

      await Product.update({ name, price, description, imageUrl, categoryId }, {
          where: { id: productId }
      });

      res.redirect('/products');
  } catch (err) {
      console.error('Error actualizando producto:', err);
      res.status(500).send('Error actualizando producto');
  }
};


exports.deleteProduct = async (req, res) => {
  try {
      const productId = req.params.id;

      await Product.destroy({
          where: { id: productId }
      });

      res.redirect('/products');
  } catch (err) {
      console.error('Error eliminando producto:', err);
      res.status(500).send('Error eliminando producto');
  }
};



exports.showProductList = async (req, res) => {
  try {
      const products = await Product.findAll();
      res.render('index', { products });
  } catch (err) {
      console.error('Error al listar productos:', err);
      res.status(500).send('Error al obtener los productos');
  }
};


module.exports = exports;

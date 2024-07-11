

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/products/new', productController.newProductForm);


router.post('/products', productController.createProduct);


router.get('/products', productController.listProducts);


router.get('/products/:id/edit', productController.editProductForm);
router.post('/products/:id/update', productController.updateProduct);
router.post('/products/:id/delete', productController.deleteProduct);

router.get('/', productController.showProductList);

module.exports = router;

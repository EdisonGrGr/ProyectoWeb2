const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/categories', categoryController.listCategories);


router.get('/categories/:id/edit', categoryController.editCategoryForm);


router.post('/categories/:id', categoryController.updateCategory);


router.post('/categories/:id/delete', categoryController.deleteCategory);


router.get('/categories/new', categoryController.newCategoryForm);


router.post('/categories', categoryController.createCategory);

module.exports = router;
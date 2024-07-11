

const Category = require('../models/category');

exports.editCategoryForm = async (req, res) => {
  try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      res.render('categories/edit', { category });
  } catch (err) {
      console.error('Error mostrando formulario de edición:', err);
      res.status(500).send('Error mostrando formulario de edición');
  }
};


exports.listCategories = async (req, res) => {
  try {
      
      const categories = await Category.findAll();
      res.render('categories/index', { categories });
  } catch (err) {
      console.error('Error al listar categorías:', err);
      res.status(500).send('Error al listar categorías');
  }
};




exports.newCategoryForm = async (req, res) => {
  res.render('categories/new'); 
};
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        
        await Category.create({ name });

        
        res.redirect('/categories');
    } catch (err) {
        console.error('Error creando categoría:', err);
        res.status(500).send('Error creando categoría');
    }
};



exports.updateCategory = async (req, res) => {
  try {
      const categoryId = req.params.id;
      const { name } = req.body;

      await Category.update({ name }, {
          where: { id: categoryId }
      });

      res.redirect('/categories');
  } catch (err) {
      console.error('Error actualizando categoría:', err);
      res.status(500).send('Error actualizando categoría');
  }
};


exports.deleteCategory = async (req, res) => {
  try {
      const categoryId = req.params.id;

      await Category.destroy({
          where: { id: categoryId }
      });

      res.redirect('/categories');
  } catch (err) {
      console.error('Error eliminando categoría:', err);
      res.status(500).send('Error eliminando categoría');
  }
};

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model:Product}]
    });
    if (!categoryData) {
      return res.status(404).json({ message: 'The category does not exist' });
    }
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return res.status(400).json({ message: 'wrong object format' });
    }
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(req.body, { where: { id: req.params.id } });
    if (!update) {
      return res.status(404).json({ message: 'The category does not exist' });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
    if(!deletedCategory) {
      return res.status(404).json({message: 'Category does not exist'});
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;

const { validationResult } = require('express-validator');
const db = require('./../../models/index');

/**
 * List all ticket categories.
 * @returns {Array} An array of ticket categories.
 * @author Balaji Parimelazhagan
 */
exports.listAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get details of a specific category by ID.
 * @param {number} id - The ID of the category to retrieve.
 * @returns {Object} The category data.
 * @author Balaji Parimelazhagan
 */
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Create a new ticket category.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.createCategory = async (req, res) => {
  console.log('createCategory');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;
  try {
    const newCategory = await db.Category.create({
      name,
      description,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update the details of an existing category.
 * @param {number} id - The ID of the category to update.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { name } = req.body;
  try {
    const category = await db.Category.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Delete a category.
 * @param {number} id - The ID of the category to delete.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

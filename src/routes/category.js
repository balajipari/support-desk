const express = require('express');
const { check } = require('express-validator');
const validate = require('./../middlewares/validate');

// Import your "categories" controller here
const categoriesController = require('./../controllers/category/index');

const router = express.Router();

/**
 * Route to list all ticket categories.
 * @returns {Array} An array of ticket categories.
 * @author Balaji Parimelazhagan
 */
router.route('').get(categoriesController.listAllCategories);

/**
 * Route to get details of a specific category by ID.
 * @param {number} id - The ID of the category to retrieve.
 * @returns {Object} The category data.
 * @author Balaji Parimelazhagan
 */
router.route('/:id').get(categoriesController.getCategoryById);

/**
 * Route to create a new ticket category.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router
  .route('/create')
  .post(
    [check('name').not().isEmpty()],
    validate,
    categoriesController.createCategory
  );

/**
 * Route to update the details of an existing category.
 * @param {number} id - The ID of the category to update.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router.route('/update/:id').patch(
  [
    check('name').not().isEmpty(),
    // Add any other validation rules for category update
  ],
  validate,
  categoriesController.updateCategory
);

/**
 * Route to delete a category.
 * @param {number} id - The ID of the category to delete.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router.route('/delete/:id').delete(categoriesController.deleteCategory);

module.exports = router;

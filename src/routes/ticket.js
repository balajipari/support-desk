const express = require('express');
const { check } = require('express-validator');
const validate = require('./../middlewares/validate');

// Import your "tickets" controller here
const ticketsController = require('./../controllers/ticket/index');

const router = express.Router();

/**
 * Route to list all support tickets.
 * @returns {Array} An array of support tickets.
 * @author Balaji Parimelazhagan
 */
router.route('').get(ticketsController.listAllTickets);

/**
 * Route to get details of a specific support ticket by ID.
 * @param {number} id - The ID of the support ticket to retrieve.
 * @returns {Object} The support ticket data.
 * @author Balaji Parimelazhagan
 */
router.route('/:id').get(ticketsController.getTicketById);

/**
 * Route to create a new support ticket.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router
  .route('/create')
  .post(
    [
      check('title').not().isEmpty(),
      check('description').not().isEmpty(),
      check('category').not().isEmpty(),
      check('priority').not().isEmpty(),
    ],
    validate,
    ticketsController.createTicket
  );

/**
 * Route to update the details of an existing support ticket.
 * @param {number} id - The ID of the support ticket to update.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router
  .route('/update/:id')
  .patch(
    [
      check('title').not().isEmpty(),
      check('description').not().isEmpty(),
      check('category').not().isEmpty(),
      check('priority').not().isEmpty(),
    ],
    validate,
    ticketsController.updateTicket
  );

/**
 * Route to assign a support ticket to a specific support agent.
 * @param {number} id - The ID of the support ticket to assign.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router.route('/assign/:id').post(
  [check('assignedTo').not().isEmpty()], // You may want to validate the assigned agent
  validate,
  ticketsController.assignTicket
);

/**
 * Route to close a support ticket.
 * @param {number} id - The ID of the support ticket to close.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
router.route('/close/:id').post(ticketsController.closeTicket);

module.exports = router;

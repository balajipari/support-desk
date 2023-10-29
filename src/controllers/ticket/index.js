const { validationResult } = require('express-validator');
const db = require('./../../models/index');

/**
 * List all support tickets.
 * @returns {Array} An array of support tickets.
 * @author Balaji Parimelazhagan
 */
exports.listAllTickets = async (req, res) => {
  try {
    const tickets = await db.Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get details of a specific support ticket by ID.
 * @param {number} id - The ID of the support ticket to retrieve.
 * @returns {Object} The support ticket data.
 * @author Balaji Parimelazhagan
 */
exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await db.Ticket.findByPk(id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(200).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Validate the existence of a category
 * @returns {boolean} Ttrue if valid category and false if invalid category.
 * @author Balaji Parimelazhagan
 */
const validateCategory = async (categoryId) => {
  try {
    const existingCategory = await db.Category.findByPk(categoryId);
    if (!existingCategory) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Create a new support ticket.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.createTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { title, description, category, assignee, priority } = req.body;

  // Validate that the specified category exists
  const isCategoryValid = await validateCategory(category);
  if (!isCategoryValid) {
    return res.status(200).json({ message: 'Category not found' });
  }

  try {
    const newTicket = await db.Ticket.create({
      title,
      description,
      categoryId: category,
      priority,
      assignee,
      status: 'Open',
    });
    res.status(201).json(newTicket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update the details of an existing support ticket.
 * @param {number} id - The ID of the support ticket to update.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { title, description, category, priority } = req.body;

  // Validate that the specified category exists
  const isCategoryValid = await validateCategory(category);
  console.log('isCategoryValid', isCategoryValid, category);
  if (!isCategoryValid) {
    return res.status(200).json({ message: 'Category not found' });
  }

  try {
    const ticket = await db.Ticket.findByPk(id);
    if (ticket) {
      ticket.title = title;
      ticket.description = description;
      ticket.categoryId = category;
      ticket.priority = priority;
      await ticket.save();
      res.status(200).json(ticket);
    } else {
      res.status(200).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Assign a support ticket to a specific support agent.
 * @param {number} id - The ID of the support ticket to assign.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.assignTicket = async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;
  try {
    const ticket = await db.Ticket.findByPk(id);
    if (ticket) {
      ticket.assignedTo = assignedTo;
      await ticket.save();
      res.status(200).json({ message: 'Ticket assigned successfully' });
    } else {
      res.status(200).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Close a support ticket.
 * @param {number} id - The ID of the support ticket to close.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response from the API.
 * @author Balaji Parimelazhagan
 */
exports.closeTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await db.Ticket.findByPk(id);
    if (ticket) {
      ticket.status = 'Closed';
      await ticket.save();
      res.status(200).json({ message: 'Ticket closed successfully' });
    } else {
      res.status(200).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

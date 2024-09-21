const express = require('express');
const router = express.Router();
const { createTableAssignment, getTableAssignmentById, getAllTableAssignments, getTableUsers, updateTableAssignmentById, deleteTableAssignmentById } = require('../controllers/assignmentController');

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.post('/', createTableAssignment);
router.get('/:id', getTableAssignmentById);
router.get('/', getAllTableAssignments);
router.get('/table/:table_no', getTableUsers);
router.get('/table/:table_no/:role', getTableUsers);
router.put('/:id', updateTableAssignmentById);
router.delete('/:id', deleteTableAssignmentById);

module.exports = router;
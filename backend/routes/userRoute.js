const express = require('express');
const router = express.Router();
const { getUser, getUserByToken, getUsersByRole, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.get('/:id', getUser);
router.get('/token/:token', getUserByToken);
router.get('/role/:role', getUsersByRole);
router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

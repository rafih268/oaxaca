const express = require('express')
const router = express.Router()
const { getMenuItems, setMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController')

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.route('/:category').get(getMenuItems)
router.route('/').post(setMenuItem)
router.route('/:id').put(updateMenuItem).delete(deleteMenuItem)

module.exports = router
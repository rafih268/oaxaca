const express = require('express')
const router = express.Router()
const {
  createOrder,
  addToOrder,
  viewOrder,
  toggleOrderStatus,
  deleteOrder,
  deleteOrderedItem,
} = require('../controllers/orderController')

/**
 * This file matches all the CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.post('/', createOrder)
router.put('/:id', addToOrder)
router.get('/:id', viewOrder)
router.put('/toggleStatus/:id', toggleOrderStatus)
router.delete('/:id', deleteOrder)
router.delete('/:order_id/:item_id', deleteOrderedItem)

module.exports = router

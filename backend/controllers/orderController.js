const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

/**
 * Importing the Order and OrderItem model from the schema.
 * Imported models are used to interact with the database.
 */
const { Order, OrderItem } = new PrismaClient()

/**
 * This function checks if an order exists in the database.
 * @param {string} order_id
 * @returns {boolean}
 */
const orderExists = async (order_id) => {
  const order = await Order.findUnique({
    where: { order_no: Number(order_id) },
  })

  return !order ? false : true
}

/**
 * This function creates a new order in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const createOrder = async (req, res) => {
  const newOrder = await Order.create({
    data: {
      table_no: req.body.table_no,
      ordered_items: {},
    },
  })

  res.status(200).json(newOrder)
}

/**
 * This function adds a menu item to an existing order.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const addToOrder = async (req, res) => {
  const { name, price } = req.body
  if (!(await orderExists(req.params.id))) {
    return res.status(400).json({
      error: `Order with id ${req.params.id} does not exist`,
    })
  }
  const addOrderItem = await Order.update({
    where: { order_no: Number(req.params.id) },
    data: {
      ordered_items: {
        create: [
          {
            item_name: name,
            price: price,
          },
        ],
      },
    },
  })
  res.status(200).json({ message: 'Success' })
}

/**
 * This function retrieves the menu items added to an existing order.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const viewOrder = async (req, res) => {
  if (!(await orderExists(req.params.id))) {
    return res.status(400).json({
      error: `Order with id ${req.params.id} does not exist`,
    })
  }
  const items = await OrderItem.findMany({
    where: { order_id: Number(req.params.id) },
  })

  res.status(200).json(items)
}

/**
 * This function toggles the completed status of an existing order.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const toggleOrderStatus = async (req, res) => {
  if (!(await orderExists(req.params.id))) {
    return res.status(400).json({
      error: `Order with id ${req.params.id} does not exist`,
    })
  }

  const getOrder = await Order.findUnique({
    where: { order_no: Number(req.params.id) },
  })

  const changeStatus = await Order.update({
    where: { order_no: Number(req.params.id) },
    data: {
      completed: !getOrder.completed,
    },
  })

  res.status(200).json(changeStatus)
}

/**
 * This function deletes an existing order from the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteOrder = async (req, res) => {
  if (!(await orderExists(req.params.id))) {
    return res.status(400).json({
      error: `Order with id ${req.params.id} does not exist`,
    })
  }

  const removeItems = await OrderItem.deleteMany({
    where: { order_id: Number(req.params.id) },
  })

  const removeOrder = await Order.delete({
    where: { order_no: Number(req.params.id) },
  })

  res.status(200).json(removeOrder)
}

/**
 * This function removes a menu item within an existing order.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteOrderedItem = async (req, res) => {
  if (!(await orderExists(req.params.order_id))) {
    return res.status(400).json({
      error: `Order with id ${req.params.order_id} does not exist`,
    })
  }

  const removeItem = await OrderItem.delete({
    where: { id: Number(req.params.item_id) },
  })

  res.status(200).json(removeItem)
}

module.exports = {
  createOrder,
  addToOrder,
  viewOrder,
  toggleOrderStatus,
  deleteOrder,
  deleteOrderedItem,
}

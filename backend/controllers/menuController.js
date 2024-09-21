const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

/**
 * Importing the MenuItem model from the schema.
 * Imported model is used to interact with the database.
 */
const { MenuItem } = new PrismaClient()

/**
 * This function retrieves the dishes available in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getMenuItems = asyncHandler(async (req, res) => {
  const { category } = req.params

  const items = await MenuItem.findMany({
    where: {
      category: category.toUpperCase(),
    },
  })
  res.status(200).json(items)
})

/**
 * This function creates a new menu item in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const setMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.create({
    data: req.body,
  })

  res.status(200).json(item)
})

/**
 * This function updates fields of any existing item in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const updateMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params

  const item = await MenuItem.findUnique({
    where: { id: Number(id) },
  })

  if (!item) {
    res.status(400)
    throw new Error(`Item with ID ${id} does not exist`)
  }

  const newItem = await MenuItem.update({
    where: { id: Number(id) },
    data: req.body,
  })

  res.status(200).json(newItem)
})

/**
 * This function deletes an existing menu item within the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params

  const item = await MenuItem.findUnique({
    where: { id: Number(id) },
  })

  if (!item) {
    res.status(400)
    throw new Error(`Item with ID ${id} does not exist`)
  }

  const removedItem = await MenuItem.delete({
    where: {
      id: Number(id),
    },
  })

  res.status(200).json(removedItem)
})

module.exports = {
  getMenuItems,
  setMenuItem,
  updateMenuItem,
  deleteMenuItem,
}

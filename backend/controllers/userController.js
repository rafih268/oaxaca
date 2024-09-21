const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

/**
 * Importing the user model from the schema.
 * Imported model is used to interact with the database.
 */
const { user } = new PrismaClient();

/**
 * This function retrieves the data of an existing user through their user id.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id); // id stored as integer in db
  const userData = await user.findUnique({ where: { id: userId } });
  if (!userData) {
    res.status(404).json({ success: false, message: 'User with this ID not found' });
  }
  res.status(200).json({ success: true, data: userData });
};

/**
 * This function retrieves the data of an existing user through the web token provided.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getUserByToken = async (req, res) => {
  const { token } = req.params;
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userData = await user.findUnique({ where: { id: userId } });
  if (!userData) {
    res.status(404).json({ success: false, message: 'Token is invalid' });
  }
  res.status(200).json({ success: true, data: userData });
};

/**
 * This function retrieves all users that currently exist in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getAllUsers = async (req, res) => {
  const allUsers = await user.findMany();
  res.status(200).json({ success: true, data: allUsers });
};

/**
 * This function retrieves users based on their role.
 * The role is referring to a customer, waiter, kitchen_staff or manager.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getUsersByRole = async (req, res) => {
  const { role } = req.params;
  const userRole = role.toUpperCase();
  const usersWithRole = await user.findMany({ where: { role: userRole } });
  res.status(200).json({ success: true, data: usersWithRole });
};

/**
 * This function creates a new user with the credentials provided.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.code === 'P2002') { // P2002 is the error code for unique constraint violation
      res.status(400).json({ success: false, message: 'Email address already exists' });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
    }
  }
};

/**
 * This function updates the credentials of an existing user.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const { name, email, password, role } = req.body;
  const updatedUser = await user.update({
    where: { id: userId },
    data: {
      name,
      email,
      password,
      role,
    },
  });
  res.status(200).json({ success: true, data: updatedUser });
};

/**
 * This function deletes an existing user from the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  await user.delete({ where: { id: userId } });
  res.status(200).json({ success: true, data: {} });
};

module.exports = {
  getUser,
  getUserByToken,
  getUsersByRole,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

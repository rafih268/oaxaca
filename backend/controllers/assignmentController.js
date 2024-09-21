const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

/**
 * Imports table_assignment model from the schema.
 * Imported model is used to interact with the database.
 */
const { table_assignment } = new PrismaClient();

/**
 * This function retrieves the data of an assigned table.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getTableAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await table_assignment.findUnique({ where: { id: parseInt(id) } });
    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Table assignment not found' });
    }
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to GET the table assignment' });
  }
};

/**
 * This function retrieves the data of all assigned tables.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getAllTableAssignments = async (req, res) => {
  try {
    const assignments = await table_assignment.findMany();
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to GET the table assignments' });
  }
};

/**
 * This function creates a new table assignment.
 * Assigns an existing user to a table.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const createTableAssignment = async (req, res) => {
  const { user_id, table_no } = req.body;
  try {
    const assignment = await table_assignment.create({ 
      data: { 
        table_no: parseInt(table_no),
        user: {
          connect: { id: parseInt(user_id) },
        },
      } 
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create the table assignment' });
  }
};

/**
 * This function updates an existing table assignment.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const updateTableAssignmentById = async (req, res) => {
  const { id } = req.params;
  const { user_id, table_no } = req.body;
  try {
    const assignment = await table_assignment.update({
      where: { id: parseInt(id) },
      data: { user_id, table_no },
    });
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to update the table assignment' });
  }
};

/**
 * This function deletes an existing table assignment.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteTableAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    await table_assignment.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ success: true, message: 'Table assignment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to DELETE the table assignment' });
  }
};

/**
 * This function retrieves all users that have been assigned to a given table.
 * Roles can also be filtered to only view a group of users assigned.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getTableUsers = async (req, res) => {
  const { table_no, role } = req.params;
  let users;
  try {
    if(role){
      users = await table_assignment.findMany({
        where: { 
          table_no: parseInt(table_no),
          user: {
            role: role.toUpperCase(),
          },
        },
        include: { user: true },
      });
    } else {
      users = await table_assignment.findMany({
        where: { table_no: parseInt(table_no) },
        include: { user: true },
      });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to GET the table users' });
  }
};


module.exports = {
  getTableAssignmentById,
  getAllTableAssignments,
  createTableAssignment,
  updateTableAssignmentById,
  deleteTableAssignmentById,
  getTableUsers,
};
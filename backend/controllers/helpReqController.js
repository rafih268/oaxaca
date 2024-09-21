const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

/**
 * Importing the help_request model from the schema.
 * Imported model is used to interact with the database.
 */
const { help_request } = new PrismaClient();

/**
 * This function creates a new help request from a user.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const createHelpRequest = async (req, res) => {
  const { user_id } = req.params;
  const { created_at, resolved } = req.body;
  const newHelpRequest = await help_request.create({
    data: {
      user: { connect: { id: parseInt(user_id) } },
      created_at,
      resolved,
    },
  });
  res.status(201).json({ success: true, data: newHelpRequest });
};

/**
 * This function retrieves a unique help_request from the database.
 * The help_request is identified using the request id.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getHelpRequest = async (req, res) => {
  const { id } = req.params;
  const helpRequestId = parseInt(id);
  const helpRequestData = await help_request.findUnique({
    where: { id: helpRequestId },
    include: { user: true },
  });

  if (!helpRequestData) {
    return res.status(404).json({ 
      success: false, 
      data: {id: helpRequestId},
      error: "Help request with this id does not exist" 
      });
  }

  res.status(200).json({ success: true, data: helpRequestData });
};

/**
 * This function retrieves all help_requests made from specific user.
 * The user is identified through the user id.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getHelpRequestsByUser = async (req, res) => {
  const { user_id } = req.params;
  const userId = parseInt(user_id);
  const helpRequestsByUser = await help_request.findMany({
    where: { user_id: userId },
    include: { user: true },
  });
  res.status(200).json({ success: true, data: helpRequestsByUser });
};

/**
 * This function retrieves all help_requests in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getAllHelpRequests = async (req, res) => {
  const allHelpRequests = await help_request.findMany({
    include: { user: true },
  });
  res.status(200).json({ success: true, data: allHelpRequests });
};

/**
 * This function retrieves all help_requests by their resolved status.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const getResolved = async (req, res) => {
  const { resolved } = req.params;
  // default to true if no query param is provided
  const boolResolved = resolved === 'false' ? false : true;

  const allHelpRequests = await help_request.findMany({
    where: { resolved: boolResolved },
    include: { user: true },
  });
  res.status(200).json({ success: true, data: allHelpRequests });
};

/**
 * This function updates an existing help_request in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const updateHelpRequest = async (req, res) => {
  const { id } = req.params;
  const helpRequestId = parseInt(id);
  const { created_at, resolved, user_id } = req.body;
  const updatedHelpRequest = await help_request.update({
    where: { id: helpRequestId },
    data: {
      created_at,
      resolved,
      user: { connect: { id: parseInt(user_id) } },
    },
    include: { user: true },
  });
  res.status(200).json({ success: true, data: updatedHelpRequest });
};

/**
 * This function toggles the resolved status of a help request.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const toggleResolved = async (req, res) => {
    const { id } = req.params;
    const helpRequestId = parseInt(id);
  
    const helpRequest = await help_request.findUnique({
      where: { id: helpRequestId }
    });
  
    if (!helpRequest) {
      return res.status(404).json({ 
        success: false, 
        data: {id: helpRequestId},
        error: "Help request with this id does not exist" 
        });
    }
  
    // Toggle resolved field
    const updatedRequest = await help_request.update({
      where: { id: helpRequestId },
      data: { resolved: !helpRequest.resolved }
    });

    res.status(200).json({ success: true, data: updatedRequest });
};

/**
 * This function deletes an existing help request in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const deleteHelpRequest = async (req, res) => {
  const { id } = req.params;
  const helpRequestId = parseInt(id);
  await help_request.delete({ where: { id: helpRequestId } });
  res.status(200).json({ success: true, data: {} });
};

module.exports = {
    createHelpRequest,
    getHelpRequest,
    getAllHelpRequests,
    getHelpRequestsByUser,
    getResolved,
    updateHelpRequest,
    toggleResolved,
    deleteHelpRequest,
};

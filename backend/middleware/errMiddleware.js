/**
 * Middleware function to handle an error and return a user friendly message.
 * @param {*} err Error that needs to be handled.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 * @param {*} next Next middleware function to be run.
 */
const errorHandler = (err, req, res, next) => {
  const currentStatus = res.statusCode ? res.statusCode : 500

  res.status(currentStatus).json({
    error: err.message,
    stack: err.stack,
  })
}

module.exports = errorHandler

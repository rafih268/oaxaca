/**
 * Middleware function to verify if a user has authorization to access a certain page.
 * Checks if role of the user exists in the permissions array.
 * @param {*} permissions Array of user roles that have access permission.
 */
const authPage = async (permissions) => {
  return async (req, res, next) => {
    const { role } = req.body.role

    if (permissions.includes(role)) {
      next()
    } else {
      res.status(403)
      throw new Error('Unauthorized')
    }
  }
}

module.exports = authPage

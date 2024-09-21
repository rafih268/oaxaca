const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')

/**
 * Importing the user model from the schema.
 * Imported model is used to interact with the database.
 */
const { user } = new PrismaClient()

/**
 * This function registers a new user with the data given in the request body.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'CUSTOMER' } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add missing fields')
  }

  const userExists = await user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  const newUser = await user.create({
    data: {
      name,
      email,
      password: hashedPass,
      role,
    },
  })

  if (newUser) {
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

/**
 * This function logs in an existing user.
 * Matches the given credentials against the data in the database.
 * @param {*} req Request data from the client.
 * @param {*} res Response data from the server.
 */
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userExists = await user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  const verifyPass = await bcrypt.compare(password, userExists.password)

  if (!verifyPass) {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  res.status(200).json({
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
    role: userExists.role,
    token: generateToken(userExists.id),
  })
})

/**
 * This function generates a token for a user with a given id.
 * @param {number} id 
 * @returns {string}  Returns a JSON web token.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  userRegister,
  userLogin,
  generateToken,
}

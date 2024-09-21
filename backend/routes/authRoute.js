const express = require('express')
const router = express.Router()
const { userRegister, userLogin } = require('../controllers/authController')

/**
 * This file assigns CRUD operations to their corresponding endpoints.
 * The router object is used to handle HTTP requests through the HTTP methods it provides.
 */

router.post('/register', userRegister)
router.post('/login', userLogin)

module.exports = router
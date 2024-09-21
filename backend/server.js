const express = require('express')
const dotenv = require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const errorHandler = require('./middleware/errMiddleware')
const port = process.env.PORT || 5000

/**
 * This file is the entrypoint for running the server.
 */

const app = express()

// Setting up Cross-origin resource sharing
const cors = require('cors');
allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('This origin is not allowed by CORS.'));
      }
    },
};
app.use(cors(corsOptions));

// Enabling to retrieve data from the request body.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setting up the routing for the various endpoints.
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/menus', require('./routes/menuRoute'))
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/order_list', require('./routes/order_list'))
app.use('/api/order', require('./routes/orderRoute'))
app.use('/api/help_request', require('./routes/helpReqRoute'))
app.use('/api/payment', require('./routes/cardRoute'))
app.use('/api/table_assignment', require('./routes/assignmentRoute'))

// Using the error middleware to handle any errors.
app.use(errorHandler)

// Listens for a connection made in the specified port.
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
